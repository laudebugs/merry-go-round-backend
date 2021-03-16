import bcrypt from "bcrypt";
import emailValidator from "email-validator";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const SALT_ROUNDS = 16;
require("dotenv").config("../../");
//@ts-ignore
const dbconf: String = process.env.MONGO_DB;

//@ts-ignore
mongoose.connect(dbconf, {
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
      validator: emailValidator.validate,
      message: (props) => `${props.value} is not a valid email address`,
    },
  },
  tickets: Number,
  // @ts-ignore
  bids: [{ type: Schema.ObjectId, ref: "Bid" }],
  // @ts-ignore

  award: { type: Schema.ObjectId, ref: "Award" },
  roles: [String],
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

UserSchema.pre("save", async function preSave(next) {
  const user = this;
  if (!user.isModified("password")) return next();
  try {
    // @ts-ignore
    const hash = await bcrypt.hash(user.password, SALT_ROUNDS);
    // @ts-ignore

    user.password = hash;
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods.comparePassword = async function comparePassword(candidate) {
  //@ts-ignore
  return bcrypt.compare(candidate, this.password);
};

BidSchema.pre("remove", async function preRemove(next) {
  const bid: typeof Bid | any = this;
  const product: typeof Product | any = await Product.findById(
    mongoose.Types.ObjectId(bid.productId)
  );
  product.bids = product.bids.filter((bidId) => bidId !== bid._id);

  await product.save();
});
const User = mongoose.model("User", UserSchema);
const Bid = mongoose.model("Bid", BidSchema);
const Product = mongoose.model("Product", ProductSchema);
export { User, Bid, Product };
