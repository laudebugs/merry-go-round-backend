import { Authorized, Field, ObjectType } from "type-graphql";
import { Role } from "./";

@ObjectType()
export default class UserType {
  @Field()
  _id?: String;

  @Field()
  username: String;

  @Field((type) => [String])
  bids: [String];

  @Field()
  email?: String;

  @Field()
  tickets: Number;

  @Field((type) => Number)
  award: Number;

  @Field()
  avatar?: Number;

  @Authorized(["SUPER"])
  @Field((type) => Role, { nullable: true })
  roles?: [Role];
}
