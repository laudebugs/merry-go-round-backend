import mongoose from "mongoose";
import {
  Arg,
  Args,
  Authorized,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
  Root,
  Subscription,
  ArgsType,
  PubSub,
  Publisher,
} from "type-graphql";
import { Bid, Product, User } from "../../database/db";
import { BidType, ProductType, UserType } from "../schema";

@ArgsType()
class BidArgs extends BidType {}

@InputType({ description: "A Bid Input" })
export class BidInput {
  @Field({ nullable: true })
  _id?: string;

  @Field()
  productId: string;

  @Field()
  tickets: number;

  @Field()
  user: String;

  @Field()
  submitted: number;
}

@Resolver((of) => BidType)
export default class BidResolver {
  @Authorized()
  @Query((returns) => [BidType], { description: "Returns all bids" })
  async getBids(): Promise<BidType[]> {
    TODO: "FIXME - I shouldn't be any";
    let bids: BidType[] | any = await Bid.find();
    return bids;
  }

  @Authorized()
  @Query((returns) => [BidType], {
    description: "Get a particular user's bids",
  })
  async getUserBids(username: string): Promise<BidType[]> {
    let user: UserType | any = await User.find({ username: username });
    let bids = Promise.all<BidType>(
      user.bids.map(async (bidId) => {
        let bid = await Bid.findById(mongoose.Types.ObjectId(bidId));
        return bid;
      })
    );
    return bids;
  }

  @Authorized(["ADMIN"])
  @Query((returns) => [BidType], {
    description: "Returns all the bids of a certain product",
  })
  async getProductBids(productId: string): Promise<BidType[]> {
    let product: ProductType | any = await Product.findById(
      mongoose.Types.ObjectId(productId)
    );
    let bids = Promise.all<BidType>(
      product.bids.map(async (bidId) => {
        let bid = await Bid.findById(mongoose.Types.ObjectId(bidId));
        return bid;
      })
    );
    return bids;
  }
  @Authorized()
  @Mutation((returns) => BidType, { description: "Makes a bid for a user" })
  async makeBid(
    @Arg("bid") bid: BidInput,
    @PubSub("BID_ADDED") publish: Publisher<BidType>
  ): Promise<BidType> {
    let newBid: BidType | any = new Bid({
      productId: bid.productId,
      tickets: bid.tickets,
      user: bid.user,
    });

    let product: typeof Product | any = await Product.findById(
      mongoose.Types.ObjectId(bid.productId)
    );

    product.bids.push(newBid._id);

    let user: typeof User | any = await User.findOne({ username: bid.user });
    user.tickets = 5;
    await product.save();
    await newBid.save();
    await user.save();
    newBid.submitted = newBid.tickets;

    // publish the bid
    await publish(newBid);

    // return the bid
    return newBid;
  }

  @Authorized()
  @Mutation((returns) => BidType, {
    description: "changes the amount on a bid",
  })
  async changeBid(@Arg("bid") bid: BidInput): Promise<BidType> {
    let thisBid: BidType | any = await Bid.findById(bid._id);

    let thisUser: typeof User | any = User.find({ username: bid.user });
    thisUser.tickets += thisBid.tickets - bid.tickets;

    thisBid.tickets = bid.tickets;
    thisBid.save();
    thisUser.save();
    return thisBid;
  }

  @Authorized()
  @Mutation((returns) => BidType, {
    description: "Deletes a bid that a user made",
  })
  async deleteBid(@Arg("bid") bid: BidInput): Promise<UserType> {
    let thisBid: BidType | any = await Bid.findById(
      mongoose.Types.ObjectId(bid._id)
    );
    let thisUser: UserType | any = await User.find({ username: bid.user });

    // Add the tickets to the user
    thisUser.ticket += thisBid.tickets;
    // Remove the bids from the list of the user's bids
    thisUser.bids = thisUser.bids.filter((id) => id !== bid._id);

    // Save the User
    await thisUser.save();

    // remove the bid - and all references to the bid
    Bid.remove(thisBid);
    return thisUser;
  }

  @Subscription((returns) => [BidType], {
    topics: ["BID_ADDED"],
    nullable: true,
  })
  bidAdded(@Root() bidPayload: BidType, @Args() args: BidArgs): [BidType] {
    // console.log(bidPayload);
    // @ts-ignore
    const bid = bidPayload._doc;
    return [bid];
  }
}
