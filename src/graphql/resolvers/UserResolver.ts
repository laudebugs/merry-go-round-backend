import {
  Arg,
  Args,
  ArgsType,
  Authorized,
  Field,
  InputType,
  Mutation,
  Publisher,
  PubSub,
  Query,
  Resolver,
  Root,
  Subscription,
} from "type-graphql";
import {
  authenticateUser,
  generateToken,
  genPassword,
  resetPassword,
} from "../../database/authentication";
import { User } from "../../database/db";
import { sendResetEmail, sendWelcomeEmail } from "../../mail/templates";
import { Role, UserType } from "../schema";
import { Error } from "../schema/Error";

@ArgsType()
class UserArgs extends UserType {}

@InputType({ description: "A User Input" })
export class UserInput {
  @Field({ nullable: true })
  _id?: number;

  @Field()
  username: String;

  @Field()
  email: String;

  @Field()
  avatar: Number;

  @Authorized(["SUPER"])
  @Field((type) => Role, { nullable: true })
  roles?: [Role];
}

@InputType({ description: "Credentials of a user" })
export class Credentials {
  @Field()
  email: string;
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
  async getUser(@Arg("email") email: String): UserType {
    let user: UserType | any = await User.findOne({ email: email });
    console.log(user);
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
    let token: string | Error = await authenticateUser(
      credentials.email,
      credentials.password
    );
    return token;
  }

  /**
   *
   * @param user
   */
  @Mutation((returns) => String, { description: "Signs up a user" })
  //@ts-ignore
  async signup(
    @Arg("user") user: UserInput,
    @PubSub("NEW_USER") publish: Publisher<UserType>
  ): Promise<String> {
    //TODO: "Sign up and send JWT"

    const password = await genPassword(user.email);
    let newUser: UserType | any = new User({
      username: user.username,
      email: user.email,
      password: password,
      tickets: 5,
      roles: [],
      avatar: user.avatar,
      totalTickets: 5,
    });

    // Send the welcome email
    await sendWelcomeEmail(user.email, user.username, password);
    // returns a JWT that can then be used to verify a user
    await newUser.save();

    await publish(newUser);
    let token: string = generateToken(user.username, user.email, []);
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

  @Query((returns) => [UserType])
  async getAllUsers(): Promise<UserType[]> {
    let users: UserType | any = await User.find();
    return users;
  }
  @Authorized("ADMIN")
  @Subscription((returns) => [UserType], {
    topics: ["NEW_USER"],
    nullable: true,
  })
  newUser(@Root() userPayload: UserType, @Args() args: UserArgs): [UserType] {
    // @ts-ignore
    const user = userPayload._doc;
    return user;
  }
}
