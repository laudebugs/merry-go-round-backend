import jwt from "jsonwebtoken";
import { Error } from "../graphql/schema/Error";
import { User } from "./db";

require("dotenv").config("../../");

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

    if (!user) {
      return null;
    }

    const passwordOK = await user.comparePassword(password);
    if (!passwordOK) {
      return null;
    }

    const token = generateToken(username, user.roles);

    return token;
  } catch (error) {
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
      // A token that expires in 1 day
      iat: 1516234022,
    },
    process.env.JWT_SECRET
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
