import { Authorized, Field, ObjectType } from "type-graphql";
import { BidType, Role } from "./";

@ObjectType()
export default class UserType {
  @Field()
  _id?: number;

  @Field()
  username: String;

  @Field((type) => [BidType])
  bids: [BidType];

  @Field()
  tickets: Number;

  @Field((type) => Number)
  award: Number;

  @Authorized(["SUPER"])
  @Field((type) => Role, { nullable: true })
  roles?: [Role];
}
