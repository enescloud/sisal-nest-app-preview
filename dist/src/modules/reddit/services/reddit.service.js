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
var RedditService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedditService = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const axios_1 = require("@nestjs/axios");
const reddit_search_response_dto_1 = require("../dto/reddit-search.response.dto");
let RedditService = RedditService_1 = class RedditService {
    httpService;
    logger = new common_1.Logger(RedditService_1.name);
    constructor(httpService) {
        this.httpService = httpService;
    }
    async search(keyword) {
        const result = await (0, rxjs_1.firstValueFrom)(this.httpService
            .get(`https://www.reddit.com/r/${keyword}/top.json`, {
            headers: {},
        })
            .pipe((0, rxjs_1.catchError)((error) => {
            this.logger.error(`Searching for ${keyword} from Reddit API ended with error: `, error);
            throw new Error(`An error happened!`);
        }))).then((response) => response.data);
        if (!result) {
            this.logger.error(`Could not get results from the Reddit API`);
            throw new common_1.ServiceUnavailableException('Could not get results from the Reddit API');
        }
        if (result.data.children.length === 0) {
            this.logger.log(`No SubReddit found from Reddit API for ${keyword}`);
            throw new common_1.NotFoundException('No SubReddit found');
        }
        const numberOfTotalImages = result.data.children.reduce((total, subreddit) => {
            const imageCount = subreddit.data.preview?.images.length || 0;
            return total + imageCount;
        }, 0);
        if (numberOfTotalImages === 0) {
            this.logger.log(`No images found on SubReddits from Reddit API for ${keyword}`);
            throw new common_1.NotFoundException('No images found on SubReddits');
        }
        return new reddit_search_response_dto_1.RedditSearchResponse({
            subreddits: result.data.children.map((subreddit) => {
                return new reddit_search_response_dto_1.SubRedditResponse({
                    title: subreddit.data.title,
                    imageUrl: subreddit.data.url,
                });
            }),
            numberOfImages: numberOfTotalImages,
        });
    }
};
RedditService = RedditService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], RedditService);
exports.RedditService = RedditService;
//# sourceMappingURL=reddit.service.js.map