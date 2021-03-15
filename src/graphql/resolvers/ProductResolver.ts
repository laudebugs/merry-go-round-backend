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
import { Product } from "../../database/db";
import { ProductType } from "../schema";

@InputType({ description: "A Product Input" })
export class ProductInput {
  @Field()
  name: String;

  @Field({ nullable: true })
  id?: Number;

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

    await pubSub.publish("PRODUCT", newProduct);
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
    let product: typeof Product | any = await Product.findById(
      mongoose.Types.ObjectId(productId)
    );
    product.awardee = username;
    await product.save();
    return product;
  }

  @Subscription({
    topics: "PRODUCT",
  })
  productAdded(
    @Root() productPayload: ProductType,
    @Args() args: ProductArgs
  ): ProductType {
    console.log(productPayload);
    console.log(args);
    return { ...productPayload };
  }
}
