import { Test, TestingModule } from '@nestjs/testing';
import { RedditService } from './reddit.service';
import { AppModule } from '@app/module';
import { setupVersioning } from '@app/setup';
import { INestApplication } from '@nestjs/common';
import { isArray } from 'lodash';
import {
  RedditSearchResponse,
  SubRedditResponse,
} from '../dto/reddit-search.response.dto';

describe('RedditService', () => {
  let app: INestApplication;
  let service: RedditService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    setupVersioning(app);
    await app.init();

    service = app.get<RedditService>(RedditService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('search', () => {
    it('should get search results from Reddit API', async () => {
      const response = await service.search('apple');

      expect(response).toBeDefined();
      expect(response).toBeInstanceOf(RedditSearchResponse);
      expect(isArray(response.subreddits)).toBe(true);
      response.subreddits.forEach((item) => {
        expect(item).toBeInstanceOf(SubRedditResponse);
      });
      expect(response.numberOfImages).toBeGreaterThan(0);
    });
  });
});
