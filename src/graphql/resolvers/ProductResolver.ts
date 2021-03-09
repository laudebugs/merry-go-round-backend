import { Mutation, Query, Resolver } from "type-graphql";
import { Bid } from "../../database/db";
import { BidType } from "../schema";
@Resolver((of) => BidType)
export default class ProductResolvers {
  @Query((returns) => [BidType])
  async getBids(): Promise<BidType[]> {
    TODO: "FIXME - I shouldn't be any";
    let bids: BidType[] | any = await Bid.find();
    return bids;
  }
  @Mutation((returns) => BidType)
  async makeBid(bid: BidType): Promise<BidType> {
    let newBid = new Bid({
      productId: bid.productId,
      tickets: bid.tickets,
      user: bid.user,
    });
  }
}
