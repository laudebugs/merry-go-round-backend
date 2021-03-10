import { Field, ObjectType } from "type-graphql";
import { BidType } from "./";

@ObjectType()
export default class UserType {
  @Field()
  _id?: number;

  @Field()
  username: String;

  @Field()
  firstname: String;

  @Field()
  lastname: String;

  // @Field()
  // roles: [Role];

  @Field((type) => [BidType])
  bids: [BidType];

  @Field()
  tickets: Number;

  @Field((type) => Number)
  award: Number;

  @Field()
  currentToken: String;
}
export enum Role {
  "ADMIN" = 1,
  "MODERATOR",
  "NORMAL",
}
