import { Field, ObjectType } from "type-graphql";
@ObjectType()
export default class BidType {
  @Field()
  _id: Number;

  @Field()
  productId: Number;

  @Field()
  tickets: Number;

  @Field()
  user: String;
}
