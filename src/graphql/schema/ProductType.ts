import { Field, ObjectType } from "type-graphql";
import { UserType } from ".";
@ObjectType()
export default class ProductType {
  @Field()
  _id: String;

  @Field()
  name: String;

  @Field((type) => UserType)
  awardee: UserType;

  @Field((type) => [String])
  bids: [String];

  @Field()
  description: String;

  @Field()
  photo: String;

  @Field()
  owner: String;

  @Field()
  likes: Number;
}
