import { HttpService } from '@nestjs/axios';
import { RedditSearchResponse } from '../dto/reddit-search.response.dto';
export declare class RedditService {
    private readonly httpService;
    private readonly logger;
    constructor(httpService: HttpService);
    search(keyword: string): Promise<RedditSearchResponse>;
}
//# sourceMappingURL=reddit.service.d.ts.map