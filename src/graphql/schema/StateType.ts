import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class StateType {
  @Field()
  active: Boolean;

  @Field()
  startTime: Date;

  @Field()
  endTime: Date;
}
