import { AuthenticationError } from "apollo-server-express";
import jwt from "jsonwebtoken";
import { User } from "./db";

require("dotenv").config("../../");

/**
 * A function to authenticate a user
 * @param username
 * @param password
 * @returns null if a user can't be authenticated, the username and token if otherwise
 */

export const authenticateUser = async (username, password) => {
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

    const token = jwt.sign(
      { username: username, password: password },
      process.env.JWT_SECRET
    );

    return { token, username };
  } catch (error) {
    throw new AuthenticationError(
      "Authentication token is invalid, please log in"
    );
  }
};
/**
 * Generates a JWT Token
 * @param username
 * @param password
 */
export const generateToken = (username, password) => {
  const token = jwt.sign(
    { username: username, password: password },
    process.env.JWT_SECRET
  );
  return { token, username };
};

/**
 * Verifies if a token is valid, otherwise throws an error
 * @param token
 */
export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    console.log(decoded);
    return decoded;
  } catch (e) {
    throw new AuthenticationError(
      "Authentication token is invalid, please log in"
    );
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
