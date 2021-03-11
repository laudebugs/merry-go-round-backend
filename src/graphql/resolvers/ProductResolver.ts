import mongoose from "mongoose";
import {
  Arg,
  Authorized,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
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
  owner: String;
}

@Resolver((of) => ProductType)
export default class ProductResolver {
  @Authorized()
  @Query((returns) => [ProductType])
  async getProducts(): Promise<ProductType[]> {
    let products: ProductType[] | any = await Product.find();
    return products;
  }

  @Authorized(["ADMIN"])
  @Mutation((returns) => ProductType)
  async addProduct(
    @Arg("product") product: ProductInput
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
    return newProduct;
  }

  @Mutation((returns) => ProductType)
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
}
