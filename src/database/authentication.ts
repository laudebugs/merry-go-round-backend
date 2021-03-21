import jwt from "jsonwebtoken";
import { UserType } from "../graphql/schema";
import { Error } from "../graphql/schema/Error";
import { User } from "./db";
import { psalms } from "./passes";

// let conf = require("dotenv").config("../../").parsed;

/**
 * A function to authenticate a user
 * @param username
 * @param password
 * @returns null if a user can't be authenticated, the username and token if otherwise
 */

export const authenticateUser = async (
  username,
  password
): Promise<string | Error> => {
  try {
    // Verify the Use
    const user: typeof User | any = await User.findOne({
      username: username,
    }).exec();
    console.log(user);

    if (!user) {
      return null;
    }

    const passwordOK = await user.comparePassword(password);
    if (!passwordOK) {
      console.log("wrong pass");
      return null;
    }

    const token = generateToken(username, user.roles);

    return token;
  } catch (error) {
    console.log(error.message);
    return Error["INCORRECT_PASSWORD"];
  }
};

/**
 * Generates a JWT Token
 * @param username
 * @param password
 */
export const generateToken = (username, roles): string => {
  const token = jwt.sign(
    {
      username: username,
      roles: roles,
      iat: Math.floor(Date.now()),
    },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
  return token;
};

/**
 * Verifies if a token is valid, otherwise throws an error
 * @param token
 */
export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (e) {
    return null;
  }
};

/**
 * Retrieves an authenticated user if a token is valid
 * @param token
 */
export const getAuthenticatedUser = async (token: String) => {
  try {
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    let user = await User.find({ username: decoded.username });
    return user;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};
export const resetPassword = async (email: String) => {
  try {
    let user: UserType | any = await User.findOne({ email: email });

    let random = Math.floor(Math.random() * psalms.phrases.length);
    let randomPass = psalms.phrases[random];

    user.password = randomPass;

    await user.save();

    return [user.username, randomPass];
  } catch (error) {
    console.log(error);
    return [null, null];
  }
};
