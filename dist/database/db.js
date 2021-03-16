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
exports.Product = exports.Bid = exports.User = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const email_validator_1 = __importDefault(require("email-validator"));
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const SALT_ROUNDS = 16;
// require("dotenv").config("../../").parsed;
//@ts-ignore
const dbconf = process.env.MONGO_DB;
//@ts-ignore
mongoose_1.default.connect(dbconf, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        index: { unique: true },
        minlength: 4,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        index: { unique: true },
        minlength: 6,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        index: { unique: true },
        validate: {
            validator: email_validator_1.default.validate,
            message: (props) => `${props.value} is not a valid email address`,
        },
    },
    tickets: Number,
    // @ts-ignore
    bids: [{ type: Schema.ObjectId, ref: "Bid" }],
    // @ts-ignore
    award: { type: Schema.ObjectId, ref: "Award" },
    roles: [String],
    avatar: Number,
});
const ProductSchema = new Schema({
    name: String,
    awardee: String,
    description: String,
    photo: String,
    owner: String,
    // @ts-ignore
    bids: [{ type: Schema.ObjectId, ref: "Bid" }],
});
const BidSchema = new Schema({
    productId: String,
    tickets: Number,
    // @ts-ignore
    user: String,
});
UserSchema.pre("save", function preSave(next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (!user.isModified("password"))
            return next();
        try {
            // @ts-ignore
            const hash = yield bcrypt_1.default.hash(user.password, SALT_ROUNDS);
            // @ts-ignore
            user.password = hash;
            return next();
        }
        catch (err) {
            return next(err);
        }
    });
});
UserSchema.methods.comparePassword = function comparePassword(candidate) {
    return __awaiter(this, void 0, void 0, function* () {
        //@ts-ignore
        return bcrypt_1.default.compare(candidate, this.password);
    });
};
BidSchema.pre("remove", function preRemove(next) {
    return __awaiter(this, void 0, void 0, function* () {
        const bid = this;
        const product = yield Product.findById(mongoose_1.default.Types.ObjectId(bid.productId));
        product.bids = product.bids.filter((bidId) => bidId !== bid._id);
        yield product.save();
    });
});
const User = mongoose_1.default.model("User", UserSchema);
exports.User = User;
const Bid = mongoose_1.default.model("Bid", BidSchema);
exports.Bid = Bid;
const Product = mongoose_1.default.model("Product", ProductSchema);
exports.Product = Product;
//# sourceMappingURL=db.js.map