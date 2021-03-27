"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.BidInput = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const type_graphql_1 = require("type-graphql");
const db_1 = require("../../database/db");
const schema_1 = require("../schema");
let BidArgs = class BidArgs extends schema_1.BidType {
};
BidArgs = __decorate([
    type_graphql_1.ArgsType()
], BidArgs);
let BidInput = class BidInput {
};
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], BidInput.prototype, "_id", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], BidInput.prototype, "productId", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], BidInput.prototype, "tickets", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], BidInput.prototype, "user", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], BidInput.prototype, "submitted", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], BidInput.prototype, "prev_value", void 0);
BidInput = __decorate([
    type_graphql_1.InputType({ description: "A Bid Input" })
], BidInput);
exports.BidInput = BidInput;
let BidResolver = class BidResolver {
    getBids() {
        return __awaiter(this, void 0, void 0, function* () {
            TODO: "FIXME - I shouldn't be any";
            let bids = yield db_1.Bid.find();
            return bids;
        });
    }
    getUserBids(username) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield db_1.User.findOne({ username: username });
            let bids = Promise.all(user.bids.map((bidId) => __awaiter(this, void 0, void 0, function* () {
                let bid = yield db_1.Bid.findById(mongoose_1.default.Types.ObjectId(bidId));
                return bid;
            })));
            return bids;
        });
    }
    getProductBids(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            let product = yield db_1.Product.findById(mongoose_1.default.Types.ObjectId(productId));
            let bids = yield Promise.all(product.bids.map((bidId) => __awaiter(this, void 0, void 0, function* () {
                let bid = yield db_1.Bid.findById(mongoose_1.default.Types.ObjectId(bidId));
                return bid;
            })));
            return bids.filter((bid) => !!bid);
        });
    }
    makeBid(bid, publish) {
        return __awaiter(this, void 0, void 0, function* () {
            let currBid;
            let product = yield db_1.Product.findById(mongoose_1.default.Types.ObjectId(bid.productId));
            let user = yield db_1.User.findOne({ username: bid.user });
            if (user.tickets - (bid.prev_value - bid.tickets) < 0)
                return null;
            // new ServerError(
            //     "low_balance",
            //     "Ticket balance less than you need to make this bid."
            //   );
            if (bid._id == "-1") {
                currBid = new db_1.Bid({
                    productId: bid.productId,
                    tickets: bid.tickets,
                    user: bid.user,
                    prev_value: 0,
                    submitted: bid.tickets,
                });
                product.bids.push(currBid._id);
                user.bids.push(currBid._id);
                yield product.save();
            }
            else {
                currBid = yield db_1.Bid.findById(mongoose_1.default.Types.ObjectId(bid._id));
            }
            TODO: "Ensure the user doesn't bid more than the tickets they have";
            user.tickets += bid.submitted - bid.tickets;
            yield user.save();
            currBid.prev_value = currBid.tickets;
            currBid.submitted = currBid.tickets;
            currBid.tickets = bid.tickets;
            yield currBid.save();
            // publish the bid
            yield publish(currBid);
            // return the bid
            return currBid;
        });
    }
    changeBid(bid) {
        return __awaiter(this, void 0, void 0, function* () {
            let thisBid = yield db_1.Bid.findById(bid._id);
            let thisUser = db_1.User.find({ username: bid.user });
            thisUser.tickets += thisBid.tickets - bid.tickets;
            thisBid.tickets = bid.tickets;
            thisBid.save();
            thisUser.save();
            return thisBid;
        });
    }
    deleteBid(bid) {
        return __awaiter(this, void 0, void 0, function* () {
            let thisBid = yield db_1.Bid.findById(mongoose_1.default.Types.ObjectId(bid._id));
            let thisUser = yield db_1.User.find({ username: bid.user });
            // Add the tickets to the user
            thisUser.ticket += thisBid.tickets;
            // Remove the bids from the list of the user's bids
            thisUser.bids = thisUser.bids.filter((id) => id !== bid._id);
            // Save the User
            yield thisUser.save();
            // remove the bid - and all references to the bid
            db_1.Bid.remove(thisBid);
            return thisUser;
        });
    }
    bidAdded(bidPayload, args) {
        // console.log(bidPayload);
        // @ts-ignore
        const bid = bidPayload._doc;
        return [bid];
    }
};
__decorate([
    type_graphql_1.Authorized(),
    type_graphql_1.Query((returns) => [schema_1.BidType], { description: "Returns all bids" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BidResolver.prototype, "getBids", null);
__decorate([
    type_graphql_1.Authorized(),
    type_graphql_1.Query((returns) => [schema_1.BidType], {
        description: "Get a particular user's bids",
    }),
    __param(0, type_graphql_1.Arg("username")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BidResolver.prototype, "getUserBids", null);
__decorate([
    type_graphql_1.Authorized(["ADMIN"]),
    type_graphql_1.Query((returns) => [schema_1.BidType], {
        description: "Returns all the bids of a certain product",
    }),
    __param(0, type_graphql_1.Arg("productId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BidResolver.prototype, "getProductBids", null);
__decorate([
    type_graphql_1.Authorized(),
    type_graphql_1.Mutation((returns) => schema_1.BidType, {
        description: "Makes a bid for a user",
        nullable: true,
    }),
    __param(0, type_graphql_1.Arg("bid")),
    __param(1, type_graphql_1.PubSub("BID_ADDED")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BidInput, Function]),
    __metadata("design:returntype", Promise)
], BidResolver.prototype, "makeBid", null);
__decorate([
    type_graphql_1.Authorized(),
    type_graphql_1.Mutation((returns) => schema_1.BidType, {
        description: "changes the amount on a bid",
    }),
    __param(0, type_graphql_1.Arg("bid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BidInput]),
    __metadata("design:returntype", Promise)
], BidResolver.prototype, "changeBid", null);
__decorate([
    type_graphql_1.Authorized(),
    type_graphql_1.Mutation((returns) => schema_1.BidType, {
        description: "Deletes a bid that a user made",
    }),
    __param(0, type_graphql_1.Arg("bid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BidInput]),
    __metadata("design:returntype", Promise)
], BidResolver.prototype, "deleteBid", null);
__decorate([
    type_graphql_1.Subscription((returns) => [schema_1.BidType], {
        topics: ["BID_ADDED"],
        nullable: true,
    }),
    __param(0, type_graphql_1.Root()), __param(1, type_graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [schema_1.BidType, BidArgs]),
    __metadata("design:returntype", Array)
], BidResolver.prototype, "bidAdded", null);
BidResolver = __decorate([
    type_graphql_1.Resolver((of) => schema_1.BidType)
], BidResolver);
exports.default = BidResolver;
