import { Field, ObjectType } from "type-graphql";
import { BidType, UserType } from "./";
@ObjectType()
export default class ProductType {
  @Field()
  _id: number;

  @Field()
  name: String;

  @Field()
  id: Number;

  @Field((type) => UserType)
  awardee: UserType;

  @Field((type) => [BidType])
  bids: [BidType];

  @Field()
  description: String;

  @Field()
  photo: String;
}
