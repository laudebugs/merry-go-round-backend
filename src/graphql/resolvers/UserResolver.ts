import { Mutation, Query, Resolver } from "type-graphql";
import { User } from "../../database/db";
import { UserType } from "../schema";
import { Role } from "../schema/UserType";
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

@Resolver((of) => UserType)
export default class resolvers {
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

  @Mutation((returns) => String, { nullable: true })
  //@ts-ignore
  signin(credentials: Credentials): String {
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/signin?error=true",
    });
  }

  @Mutation((returns) => String, { nullable: true })
  //@ts-ignore
  signup(user: UserType): String {
    //TODO: "Sign up and send JWT"

    let newUser = new User({
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      roles: [Role[2]],
      award: [],
      bids: [],
    });
    newUser.save();

    // TODO: Return JWT

    // Return the JWT
    return "";
  }

  @Mutation((returns) => String, { nullable: true })
  //TODO: "Sign up and send JWT"
  signout(jwt: String) {
    // Deauthorize the JWT
    return "";
  }
}

export interface Credentials {
  username: string;
  password: string;
}
