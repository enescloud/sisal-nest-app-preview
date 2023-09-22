import { Controller, Get, Query } from '@nestjs/common';
import { UserType } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '../../auth/decorators/auth.decorator';
import { RedditService } from '../services/reddit.service';
import { RedditSearchResponse } from '../dto/reddit-search.response.dto';

@ApiTags('reddit')
@Controller({
  version: '1',
  path: 'reddit',
})
export class RedditController {
  constructor(private readonly redditService: RedditService) {}

  @Get()
  @Auth({
    userType: [UserType.admin],
  })
  async search(@Query('search') string: string): Promise<RedditSearchResponse> {
    return this.redditService.search(string);
  }
}
