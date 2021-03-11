"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthenticatedUser = exports.verifyToken = exports.generateToken = exports.authenticateUser = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../../database/db");
require("dotenv").config("../../");
/**
 * A function to authenticate a user
 * @param username
 * @param password
 * @returns null if a user can't be authenticated, the username and token if otherwise
 */
const authenticateUser = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Verify the Use
        const user = yield db_1.User.findOne({
            username: username,
        }).exec();
        if (!user) {
            return null;
        }
        const passwordOK = yield user.comparePassword(password);
        if (!passwordOK) {
            return null;
        }
        const token = jsonwebtoken_1.default.sign({ username: username, password: password }, process.env.JWT_SECRET);
        return { token, username };
    }
    catch (error) {
        throw new apollo_server_express_1.AuthenticationError("Authentication token is invalid, please log in");
    }
});
exports.authenticateUser = authenticateUser;
const generateToken = (username, password) => {
    const token = jsonwebtoken_1.default.sign({ username: username, password: password }, process.env.JWT_SECRET);
    return { token, username };
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_TOKEN);
        console.log(decoded);
        return decoded;
    }
    catch (e) {
        throw new apollo_server_express_1.AuthenticationError("Authentication token is invalid, please log in");
    }
};
exports.verifyToken = verifyToken;
const getAuthenticatedUser = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        let user = yield db_1.User.find({ username: decoded.username });
        return user;
    }
    catch (error) {
        console.log(error.message);
        return null;
    }
});
exports.getAuthenticatedUser = getAuthenticatedUser;
//# sourceMappingURL=authentication.js.map