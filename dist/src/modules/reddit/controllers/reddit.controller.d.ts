import { RedditService } from '../services/reddit.service';
import { RedditSearchResponse } from '../dto/reddit-search.response.dto';
export declare class RedditController {
    private readonly redditService;
    constructor(redditService: RedditService);
    search(string: string): Promise<RedditSearchResponse>;
}
//# sourceMappingURL=reddit.controller.d.ts.map