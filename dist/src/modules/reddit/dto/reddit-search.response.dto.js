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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedditSearchResponse = exports.SubRedditResponse = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
class SubRedditResponse {
    constructor(partial) {
        Object.assign(this, partial);
    }
    title;
    imageUrl;
    static _OPENAPI_METADATA_FACTORY() {
        return { title: { required: true, type: () => String }, imageUrl: { required: true, type: () => String } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SubRedditResponse.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SubRedditResponse.prototype, "imageUrl", void 0);
exports.SubRedditResponse = SubRedditResponse;
class RedditSearchResponse {
    constructor(partial) {
        Object.assign(this, partial);
    }
    subreddits;
    numberOfImages;
    static _OPENAPI_METADATA_FACTORY() {
        return { subreddits: { required: true, type: () => [require("./reddit-search.response.dto").SubRedditResponse] }, numberOfImages: { required: true, type: () => Number } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => SubRedditResponse,
        isArray: true,
    }),
    __metadata("design:type", Array)
], RedditSearchResponse.prototype, "subreddits", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RedditSearchResponse.prototype, "numberOfImages", void 0);
exports.RedditSearchResponse = RedditSearchResponse;
//# sourceMappingURL=reddit-search.response.dto.js.map