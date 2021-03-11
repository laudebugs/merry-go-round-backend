import {
  Arg,
  Authorized,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { authenticateUser, generateToken } from "../../database/authentication";
import { User } from "../../database/db";
import { Role, UserType } from "../schema";

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
      roles: user.roles,
      email: user.email,
    });
    // returns a JWT that can then be used to verify a user
    return newUser.save().then(() => {
      return generateToken(user.username, user.password).token;
    });
  }
  @Authorized()
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
