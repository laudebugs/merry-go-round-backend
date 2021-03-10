import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Bid } from "../../database/db";
import { BidType } from "../schema";

@InputType({ description: "A Bid Input" })
export class BidInput {
  @Field({ nullable: true })
  _id?: number;

  @Field()
  productId: number;

  @Field()
  tickets: number;

  @Field()
  user: String;
}
@Resolver((of) => BidType)
export default class BidResolver {
  @Query((returns) => [BidType])
  async getBids(): Promise<BidType[]> {
    TODO: "FIXME - I shouldn't be any";
    let bids: BidType[] | any = await Bid.find();
    return bids;
  }
  @Mutation((returns) => BidType)
  async makeBid(@Arg("bid") bid: BidInput): Promise<BidType> {
    let newBid: BidType | any = new Bid({
      productId: bid.productId,
      tickets: bid.tickets,
      user: bid.user,
    });
    newBid.save();
    return newBid;
  }
  /* changes the amount on a bid */
  @Mutation((returns) => BidType)
  async changeBid(@Arg("bid") bid: BidInput): Promise<BidType> {
    let thisBid: BidType | any = await Bid.findById(bid._id);
    thisBid.tickets = bid.tickets;
    return thisBid;
  }

  "Deletes a bid that a user made";
  @Mutation((returns) => BidType)
  async deleteBid(bid: BidType): Promise<BidType> {
    let thisBid: BidType | any = await Bid.findById(bid._id);
    thisBid.tickets = bid.tickets;
    // remove the bid
    TODO: "Check that all references to the bid have been removed";
    Bid.remove(thisBid);
    return thisBid;
  }
}
