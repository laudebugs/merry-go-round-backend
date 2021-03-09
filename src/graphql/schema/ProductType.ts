import { Field, ObjectType } from "type-graphql";
import { BidType, UserType } from "./";
@ObjectType()
export default class ProductType {
  @Field()
  name: String;

  @Field()
  id: Number;

  @Field((type) => UserType)
  awardee: UserType;

  @Field((type) => [BidType])
  bids: [BidType];
}
