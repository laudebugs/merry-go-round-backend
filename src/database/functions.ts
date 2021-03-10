import { User } from "./db";

export const getAuthenticatedUser = async (token: String) => {
  let user = await User.find({ currentToken: token });
  return user;
};
