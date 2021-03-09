import { Field, ObjectType } from "type-graphql";
@ObjectType()
export default class BidType {
  @Field()
  productId: number;

  @Field()
  tickets: number;

  @Field()
  user: String;
}
