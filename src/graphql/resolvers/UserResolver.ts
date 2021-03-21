import {
  Arg,
  Authorized,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import {
  authenticateUser,
  generateToken,
  resetPassword,
} from "../../database/authentication";
import { User } from "../../database/db";
import { sendResetEmail } from "../../mail/passwordReset";
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
  password: String;

  @Field()
  avatar: Number;

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
   * Returns a user based on a username
   * @param username
   * @returns
   */
  @Query((returns) => UserType, {
    nullable: true,
    description: "Returns a user based on a user's username",
  })
  //@ts-ignore
  async getUser(@Arg("username") username: String): UserType {
    let user: UserType | any = await User.findOne({ username: username });
    return user;
  }
  /**
   * The Sign in mutation - signs in a user
   * And returns a JWt
   * @param credentials
   * @return token | null -> valid | invalid
   */
  @Mutation((returns) => String, {
    nullable: true,
    description: "Signs in a user",
  })
  //@ts-ignore
  async signin(@Arg("credentials") credentials: Credentials) {
    console.log(credentials);
    let token: string | Error = await authenticateUser(
      credentials.username,
      credentials.password
    );
    console.log(token);
    return token;
  }

  /**
   *
   * @param user
   */
  @Mutation({ description: "Signs up a user" })
  //@ts-ignore
  async signup(@Arg("user") user: UserInput): String | null {
    //TODO: "Sign up and send JWT"
    let newUser: UserType | any = new User({
      username: user.username,
      password: user.password,
      email: user.email,
      tickets: 5,
      roles: [],
      avatar: user.avatar,
    });
    // returns a JWT that can then be used to verify a user
    await newUser.save();
    let token: string = generateToken(user.username, user.roles);
    return token;
  }
  @Authorized()
  @Mutation((returns) => String, {
    nullable: true,
    description: "Signs out a user",
  })
  //TODO: "Sign up and send JWT"
  signout(jwt: String) {
    // Deauthorize the JWT

    return "";
  }

  @Mutation((returns) => Boolean, {
    nullable: true,
    description: "Requests a new password",
  })
  async resetPassword(@Arg("email") email: String) {
    // Search for the account with the email
    let [username, password] = await resetPassword(email);
    if (!username) {
      return null;
    }
    await sendResetEmail(email, username, password);

    return true;
    // Set the new password
  }
}
