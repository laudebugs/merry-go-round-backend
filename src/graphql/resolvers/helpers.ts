import { AuthenticationError } from "apollo-server-express";
import jwt from "jsonwebtoken";
import { User } from "../../database/db";

const dotenv = require("dotenv");
dotenv.config();

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
export const generateToken = (username, password) => {
  const token = jwt.sign(
    { username: username, password: password },
    process.env.JWT_SECRET
  );
  return { token, username };
};
export const verifyToken = (token) => {
  try {
    const { username } = jwt.verify(token, process.env.JWT_TOKEN);
    return { username, token };
  } catch (e) {
    throw new AuthenticationError(
      "Authentication token is invalid, please log in"
    );
  }
};
