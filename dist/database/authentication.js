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
exports.genPassword = exports.resetPassword = exports.getAuthenticatedUser = exports.verifyToken = exports.generateToken = exports.authenticateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Error_1 = require("../graphql/schema/Error");
const db_1 = require("./db");
const passes_1 = require("./passes");
// let conf = require("dotenv").config("../../").parsed;
/**
 * A function to authenticate a user
 * @param email
 * @param password
 * @returns null if a user can't be authenticated, the email and token if otherwise
 */
const authenticateUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Verify the Use
        const user = yield db_1.User.findOne({
            email: email,
        }).exec();
        if (!user) {
            return null;
        }
        const passwordOK = yield user.comparePassword(password);
        if (!passwordOK) {
            console.log("wrong pass");
            return null;
        }
        const token = exports.generateToken(user.username, email, user.roles);
        return token;
    }
    catch (error) {
        console.log(error.message);
        return Error_1.Error["INCORRECT_PASSWORD"];
    }
});
exports.authenticateUser = authenticateUser;
/**
 * Generates a JWT Token
 * @param email
 * @param password
 */
const generateToken = (username, email, roles) => {
    const token = jsonwebtoken_1.default.sign({
        username: username,
        email: email,
        roles: roles,
        iat: Math.floor(Date.now()),
    }, process.env.JWT_SECRET, { expiresIn: "24h" });
    return token;
};
exports.generateToken = generateToken;
/**
 * Verifies if a token is valid, otherwise throws an error
 * @param token
 */
const verifyToken = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        return decoded;
    }
    catch (e) {
        return null;
    }
};
exports.verifyToken = verifyToken;
/**
 * Retrieves an authenticated user if a token is valid
 * @param token
 */
const getAuthenticatedUser = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        let user = yield db_1.User.find({ email: decoded.email });
        return user;
    }
    catch (error) {
        console.log(error.message);
        return null;
    }
});
exports.getAuthenticatedUser = getAuthenticatedUser;
const resetPassword = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield db_1.User.findOne({ email: email });
        let random = Math.floor(Math.random() * passes_1.passes.length);
        let randomPass = passes_1.passes[random];
        user.password = randomPass;
        yield user.save();
        return [user.email, randomPass];
    }
    catch (error) {
        console.log(error);
        return [null, null];
    }
});
exports.resetPassword = resetPassword;
const genPassword = (email) => __awaiter(void 0, void 0, void 0, function* () {
    let random = Math.floor(Math.random() * passes_1.passes.length);
    let randomPass = passes_1.passes[random];
    return randomPass;
});
exports.genPassword = genPassword;
