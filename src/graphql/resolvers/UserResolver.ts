import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../../database/db";
import { UserType } from "../schema";
import { authenticateUser, generateToken } from "./helpers";

@InputType({ description: "A User Input" })
export class UserInput {
  @Field({ nullable: true })
  _id?: number;

  @Field()
  username: String;

  @Field()
  firstname: String;

  @Field()
  lastname: String;

  @Field()
  password: String;
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
  @Query((returns) => String, { nullable: true })
  //@ts-ignore
  login(username): string {
    User.find({ username: username })
      .then((user) => {
        // TODO: Authenticate the user
        return user;
      })
      .catch((error) => {
        console.log(error.message);
        return null;
      });
  }

  /**
   *
   * @param credentials
   * @return token | null -> valid | invalid
   */
  @Mutation((returns) => String, { nullable: true })
  //@ts-ignore
  async signin(@Arg("credentials") credentials: Credentials) {
    let auth = await authenticateUser(
      credentials.username,
      credentials.password
    );
    return auth.token;
  }

  @Mutation()
  //@ts-ignore
  async signup(@Arg("user") user: UserInput): String | null {
    //TODO: "Sign up and send JWT"
    let newUser: UserType | any = new User({
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      password: user.password,
    });
    return newUser.save().then(() => {
      return generateToken(user.username, user.password).token;
    });
  }

  @Mutation((returns) => String, { nullable: true })
  //TODO: "Sign up and send JWT"
  signout(jwt: String) {
    // Deauthorize the JWT
    return "";
  }
}

function Admin() {
  throw new Error("Function not implemented.");
}
