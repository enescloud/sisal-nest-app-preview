import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { firstValueFrom, catchError } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { RedditResponse } from '../interfaces/reddit.interface';
import {
  RedditSearchResponse,
  SubRedditResponse,
} from '../dto/reddit-search.response.dto';

@Injectable()
export class RedditService {
  private readonly logger = new Logger(RedditService.name);

  constructor(private readonly httpService: HttpService) {}

  /**
   * The function searches for the top posts in a specific subreddit on Reddit, calculates the total
   * number of images found in those posts, and returns the results.
   * @param {string} keyword - The `keyword` parameter is a string that represents the subreddit name.
   * It is used to search for the top posts in that specific subreddit on Reddit.
   * @returns The function `search` returns a Promise that resolves to a `RedditSearchResponse` object.
   */
  async search(keyword: string): Promise<RedditSearchResponse> {
    /* The code is making an HTTP GET request to the Reddit API to search for the top posts in a
    specific subreddit. */
    const result = await firstValueFrom(
      this.httpService
        .get<RedditResponse>(`https://www.reddit.com/r/${keyword}/top.json`, {
          headers: {},
        })
        .pipe(
          catchError((error) => {
            this.logger.error(
              `Searching for ${keyword} from Reddit API ended with error: `,
              error,
            );
            throw new Error(`An error happened!`);
          }),
        ),
    ).then((response) => response.data);

    if (!result) {
      this.logger.error(`Could not get results from the Reddit API`);
      throw new ServiceUnavailableException(
        'Could not get results from the Reddit API',
      );
    }

    if (result.data.children.length === 0) {
      this.logger.log(`No SubReddit found from Reddit API for ${keyword}`);
      throw new NotFoundException('No SubReddit found');
    }

    /* The code is calculating the total number of images found in the top posts of a specific
    subreddit. */
    const numberOfTotalImages = result.data.children.reduce(
      (total, subreddit) => {
        const imageCount = subreddit.data.preview?.images.length || 0;
        return total + imageCount;
      },
      0,
    );

    if (numberOfTotalImages === 0) {
      this.logger.log(
        `No images found on SubReddits from Reddit API for ${keyword}`,
      );
      throw new NotFoundException('No images found on SubReddits');
    }

    return new RedditSearchResponse({
      subreddits: result.data.children.map((subreddit) => {
        return new SubRedditResponse({
          title: subreddit.data.title,
          imageUrl: subreddit.data.url,
        });
      }),
      numberOfImages: numberOfTotalImages,
    });
  }
}
