import { Field, ObjectType } from "type-graphql";
import { BidType, ProductType } from "./";
@ObjectType()
export default class UserType {
  @Field()
  username: String;

  @Field()
  firstname: String;

  @Field()
  lastname: String;

  @Field((type) => [Role])
  roles: [Role];

  @Field((type) => [BidType])
  bids: [BidType];

  @Field()
  tickets: Number;

  @Field((type) => ProductType)
  award: ProductType;
}
export enum Role {
  "ADMIN" = 1,
  "MODERATOR",
  "NORMAL",
}
