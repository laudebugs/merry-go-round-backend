import mongoose from "mongoose";
import {
  Arg,
  Args,
  ArgsType,
  Field,
  InputType,
  Mutation,
  Publisher,
  PubSub,
  PubSubEngine,
  Query,
  Resolver,
  Root,
  Subscription,
} from "type-graphql";
import { Bid, Product, User } from "../../database/db";
import { BidType, ProductType } from "../schema";

@InputType({ description: "A Product Input" })
export class ProductInput {
  @Field()
  name: String;

  @Field({ nullable: true })
  id?: string;

  @Field()
  description?: String;

  @Field()
  photo?: String;

  @Field()
  owner?: String;
}

@ArgsType()
class ProductArgs extends ProductType {}

@Resolver((of) => ProductType)
export default class ProductResolver {
  // @Authorized()
  @Query((returns) => [ProductType], {
    description: "Gets all the products in the database",
  })
  async getProducts(): Promise<ProductType[]> {
    let products: ProductType[] | any = await Product.find();
    return products;
  }

  // @Authorized(["ADMIN"])
  @Mutation((returns) => ProductType, {
    description: "Adds a product to the database",
  })
  async addProduct(
    @Arg("product") product: ProductInput,
    @PubSub() pubSub: PubSubEngine,
    @PubSub("PRODUCT") publish: Publisher<ProductType>
  ): Promise<ProductType> {
    TODO: "Why use any here?";
    let newProduct: ProductType | any = new Product({
      name: product.name,
      description: product.description,
      awardee: null,
      photo: product.photo,
      bids: [],
      owner: product.owner,
    });
    await newProduct.save();

    // await pubSub.publish("PRODUCT", newProduct);
    await publish(newProduct);
    return newProduct;
  }

  @Mutation((returns) => ProductType, {
    description: "Awards a product to a certain user",
  })
  async award(
    @Arg("productId", { nullable: true }) productId?: string,
    @Arg("username", { nullable: true }) username?: string
  ): Promise<ProductType> {
    let product: ProductType | any = await Product.findById(
      mongoose.Types.ObjectId(productId)
    );
    product.awardee = username;
    console.log(product);
    await product.save();
    return product;
  }

  @Query((returns) => [BidType])
  async getAllBids() {
    const allBids = await Bid.find();

    return allBids;
  }

  @Query((returns) => Number, {
    nullable: false,
    description: "Get the number of likes of a product",
  })
  async getNumberOfLikes(@Arg("productId") productId: string): Promise<number> {
    try {
      let product: ProductType | any = await Product.findById(
        mongoose.Types.ObjectId(productId)
      );

      if (!product.likes) product.likes = 0;

      // await product.save();

      return product.likes;
    } catch (error) {
      console.log("ici");
      console.log(error.message);
      return 0;
    }
  }
  @Mutation((returns) => Number)
  async likeProduct(
    @Arg("username") username: string,
    @Arg("productId") productId: string,
    @Arg("liked") liked: Boolean
  ): Promise<number> {
    let product: ProductType | any = await Product.findById(
      mongoose.Types.ObjectId(productId)
    );
    let user: typeof User | any = await User.findOne({ username: username });
    product.likes += liked ? 1 : -1;
    if (liked) {
      user.likedProducts.push(product._id);
    } else {
      let index = user.likedProducts.indexOf(productId);
      user.likedProducts.splice(index, 1);
    }

    await user.save();
    await product.save();

    return product.likes;
  }
  @Subscription({
    topics: "PRODUCT",
  })
  productAdded(
    @Root() productPayload: ProductType,
    @Args() args: ProductArgs
  ): ProductType {
    console.log(productPayload);

    //@ts-ignore
    return { ...productPayload._doc };
  }
}
