export declare class SubRedditResponse {
    constructor(partial: Partial<SubRedditResponse>);
    title: string;
    imageUrl: string;
}
export declare class RedditSearchResponse {
    constructor(partial: Partial<RedditSearchResponse>);
    subreddits: SubRedditResponse[];
    numberOfImages: number;
}
//# sourceMappingURL=reddit-search.response.dto.d.ts.map