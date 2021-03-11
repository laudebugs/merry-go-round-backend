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
    __metadata("design:type", Number)
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
let ProductResolver = class ProductResolver {
    // @Authorized()
    getProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            let products = yield db_1.Product.find();
            return products;
        });
    }
    addProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            TODO: "Why use any here?";
            let newProduct = new db_1.Product({
                name: product.name,
                description: product.description,
                awardee: null,
                photo: product.photo,
                bids: [],
                owner: product.owner,
            });
            yield newProduct.save();
            return newProduct;
        });
    }
    award(productId, username) {
        return __awaiter(this, void 0, void 0, function* () {
            let product = yield db_1.Product.findById(mongoose_1.default.Types.ObjectId(productId));
            product.awardee = username;
            yield product.save();
            return product;
        });
    }
};
__decorate([
    type_graphql_1.Query((returns) => [schema_1.ProductType]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "getProducts", null);
__decorate([
    type_graphql_1.Authorized(["ADMIN"]),
    type_graphql_1.Mutation((returns) => schema_1.ProductType),
    __param(0, type_graphql_1.Arg("product")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ProductInput]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "addProduct", null);
__decorate([
    type_graphql_1.Mutation((returns) => schema_1.ProductType),
    __param(0, type_graphql_1.Arg("productId", { nullable: true })),
    __param(1, type_graphql_1.Arg("username", { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "award", null);
ProductResolver = __decorate([
    type_graphql_1.Resolver((of) => schema_1.ProductType)
], ProductResolver);
exports.default = ProductResolver;
//# sourceMappingURL=ProductResolver.js.map