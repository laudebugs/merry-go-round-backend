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
exports.ProductInput = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const type_graphql_1 = require("type-graphql");
const db_1 = require("../../database/db");
const schema_1 = require("../schema");
let ProductInput = class ProductInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ProductInput.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], ProductInput.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ProductInput.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ProductInput.prototype, "photo", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ProductInput.prototype, "owner", void 0);
ProductInput = __decorate([
    type_graphql_1.InputType({ description: "A Product Input" })
], ProductInput);
exports.ProductInput = ProductInput;
let ProductArgs = class ProductArgs extends schema_1.ProductType {
};
ProductArgs = __decorate([
    type_graphql_1.ArgsType()
], ProductArgs);
let ProductResolver = class ProductResolver {
    // @Authorized()
    getProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            let products = yield db_1.Product.find();
            return products;
        });
    }
    // @Authorized(["ADMIN"])
    addProduct(product, pubSub, publish) {
        return __awaiter(this, void 0, void 0, function* () {
            TODO: "Why use any here?";
            let newProduct = new db_1.Product({
                name: product.name,
                description: product.description,
                awardee: null,
                photo: product.photo,
                bids: [],
                owner: product.owner,
                likes: 0,
            });
            yield newProduct.save();
            // await pubSub.publish("PRODUCT", newProduct);
            yield publish(newProduct);
            return newProduct;
        });
    }
    award(productId, username) {
        return __awaiter(this, void 0, void 0, function* () {
            let product = yield db_1.Product.findById(mongoose_1.default.Types.ObjectId(productId));
            product.awardee = username;
            console.log(product);
            yield product.save();
            return product;
        });
    }
    getAllBids() {
        return __awaiter(this, void 0, void 0, function* () {
            const allBids = yield db_1.Bid.find();
            return allBids;
        });
    }
    getNumberOfLikes(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let product = yield db_1.Product.findById(mongoose_1.default.Types.ObjectId(productId));
                if (!product.likes)
                    product.likes = 0;
                // await product.save();
                return product.likes;
            }
            catch (error) {
                console.log("ici");
                console.log(error.message);
                return 0;
            }
        });
    }
    likeProduct(username, productId, liked) {
        return __awaiter(this, void 0, void 0, function* () {
            let product = yield db_1.Product.findById(mongoose_1.default.Types.ObjectId(productId));
            let user = yield db_1.User.findOne({ username: username });
            product.likes += liked ? 1 : -1;
            if (liked) {
                user.likedProducts.push(product._id);
            }
            else {
                let index = user.likedProducts.indexOf(productId);
                user.likedProducts.splice(index, 1);
            }
            yield user.save();
            yield product.save();
            return product.likes;
        });
    }
    productAdded(productPayload, args) {
        console.log(productPayload);
        //@ts-ignore
        return Object.assign({}, productPayload._doc);
    }
};
__decorate([
    type_graphql_1.Query((returns) => [schema_1.ProductType], {
        description: "Gets all the products in the database",
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "getProducts", null);
__decorate([
    type_graphql_1.Mutation((returns) => schema_1.ProductType, {
        description: "Adds a product to the database",
    }),
    __param(0, type_graphql_1.Arg("product")),
    __param(1, type_graphql_1.PubSub()),
    __param(2, type_graphql_1.PubSub("PRODUCT")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ProductInput,
        type_graphql_1.PubSubEngine, Function]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "addProduct", null);
__decorate([
    type_graphql_1.Mutation((returns) => schema_1.ProductType, {
        description: "Awards a product to a certain user",
    }),
    __param(0, type_graphql_1.Arg("productId", { nullable: true })),
    __param(1, type_graphql_1.Arg("username", { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "award", null);
__decorate([
    type_graphql_1.Query((returns) => [schema_1.BidType]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "getAllBids", null);
__decorate([
    type_graphql_1.Query((returns) => Number, {
        nullable: false,
        description: "Get the number of likes of a product",
    }),
    __param(0, type_graphql_1.Arg("productId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "getNumberOfLikes", null);
__decorate([
    type_graphql_1.Mutation((returns) => Number),
    __param(0, type_graphql_1.Arg("username")),
    __param(1, type_graphql_1.Arg("productId")),
    __param(2, type_graphql_1.Arg("liked")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Boolean]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "likeProduct", null);
__decorate([
    type_graphql_1.Subscription({
        topics: "PRODUCT",
    }),
    __param(0, type_graphql_1.Root()),
    __param(1, type_graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [schema_1.ProductType,
        ProductArgs]),
    __metadata("design:returntype", schema_1.ProductType)
], ProductResolver.prototype, "productAdded", null);
ProductResolver = __decorate([
    type_graphql_1.Resolver((of) => schema_1.ProductType)
], ProductResolver);
exports.default = ProductResolver;
