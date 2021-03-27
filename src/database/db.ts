import bcrypt from "bcrypt";
import emailValidator from "email-validator";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const SALT_ROUNDS = 16;
const config =
  process.env.MONGO_DB || require("dotenv").config("../../").parsed.MONGO_DB;

mongoose.connect(config, {
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
    lowercase: true,
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
  totalTickets: Number,
  // @ts-ignore
  bids: [{ type: Schema.ObjectId, ref: "Bid" }],
  // @ts-ignore
  likedProducts: [{ type: Schema.ObjectId, ref: "Product" }],
  // @ts-ignore
  award: { type: Schema.ObjectId, ref: "Award" },
  roles: [String],
  avatar: {
    required: true,
    type: Number,
  },
});

const StateSchema = new Schema({
  active: { type: Boolean, default: false },
  startTime: { type: Date, default: Date.now() },
  endTime: { type: Date, default: Date.now() },
});
const ProductSchema = new Schema({
  name: String,
  awardee: String,
  description: String,
  photo: String,
  owner: String,
  // @ts-ignore
  bids: [{ type: Schema.ObjectId, ref: "Bid" }],
  likes: Number,
});
const BidSchema = new Schema({
  productId: String,
  tickets: Number,
  // @ts-ignore

  user: String,
  submitted: Number,
  prev_value: Number,
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
const State = mongoose.model("State", StateSchema);

export { User, Bid, Product, State };
