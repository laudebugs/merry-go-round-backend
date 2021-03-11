import {
  Arg,
  Authorized,
  Field,
  InputType,
  Mutation,
  Resolver,
} from "type-graphql";
import { authenticateUser, generateToken } from "../../database/authentication";
import { User } from "../../database/db";
import { Role, UserType } from "../schema";
import { Error } from "../schema/Error";

@InputType({ description: "A User Input" })
export class UserInput {
  @Field({ nullable: true })
  _id?: number;

  @Field()
  username: String;

  @Field()
  email: String;

  @Field()
  firstname: String;

  @Field()
  lastname: String;

  @Field()
  password: String;

  @Authorized(["SUPER"])
  @Field((type) => Role, { nullable: true })
  roles?: [Role];
}

@InputType({ description: "Credentials of a user" })
export class Credentials {
  @Field()
  username: string;
  @Field()
  password: string;
}

@Resolver((of) => UserType)
export default class UserResolver {
  /**
   * The Sign in mutation - signs in a user
   * And returns a JWt
   * @param credentials
   * @return token | null -> valid | invalid
   */
  @Mutation((returns) => String, { nullable: true })
  //@ts-ignore
  async signin(@Arg("credentials") credentials: Credentials) {
    let token: string | Error = await authenticateUser(
      credentials.username,
      credentials.password
    );
    return token;
  }

  /**
   *
   * @param user
   */
  @Mutation()
  //@ts-ignore
  async signup(@Arg("user") user: UserInput): String | null {
    //TODO: "Sign up and send JWT"
    let newUser: UserType | any = new User({
      username: user.username,
      password: user.password,
      roles: user.roles,
      email: user.email,
    });
    // returns a JWT that can then be used to verify a user
    await newUser.save();
    let token: string = await generateToken(user.username, user.roles);
    return token;
  }
  @Authorized()
  @Mutation((returns) => String, { nullable: true })
  //TODO: "Sign up and send JWT"
  signout(jwt: String) {
    // Deauthorize the JWT

    return "";
  }
}
