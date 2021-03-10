import { Field, ObjectType } from "type-graphql";
@ObjectType()
export default class BidType {
  @Field()
  _id: number;

  @Field()
  productId: number;

  @Field()
  tickets: number;

  @Field()
  user: String;
}
