import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class ServerError extends Error {
  @Field()
  errorCode: String;

  @Field()
  errorMessage: string;
  constructor(errorCode: string, errorMessage: string) {
    super(errorMessage);
    this.errorCode = errorCode;
    this.errorMessage = errorMessage;
  }
}
