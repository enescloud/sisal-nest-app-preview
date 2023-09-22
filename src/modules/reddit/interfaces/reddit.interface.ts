import { SubReddit } from './subreddit.interface';

export interface RedditResponse {
  kind: string;
  data: {
    after: string | null;
    dist: number;
    modhash: string;
    geo_filter: string;
    children: SubReddit[];
    before: string | null;
  };
}
