import { Field, ObjectType } from "type-graphql";
@ObjectType()
export default class BidType {
  @Field()
  _id: String;

  @Field()
  productId: String;

  @Field()
  tickets: Number;

  @Field()
  user: String;

  @Field()
  submitted: Boolean;
}
