"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
//@ts-ignore
const dbconf = process.env.MERRY_GO_ROUND_MONGO;
//@ts-ignore
mongoose_1.default.connect(dbconf, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});
const UserSchema = new Schema({
    name: {
        type: String,
    },
    email: {},
});
const User = mongoose_1.default.model("User", UserSchema);
exports.User = User;
//# sourceMappingURL=db.js.map