/* eslint-disable max-classes-per-file */
import { ApiProperty } from '@nestjs/swagger';

export class SubRedditResponse {
  constructor(partial: Partial<SubRedditResponse>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  title!: string;

  @ApiProperty()
  imageUrl!: string;
}

export class RedditSearchResponse {
  constructor(partial: Partial<RedditSearchResponse>) {
    Object.assign(this, partial);
  }

  @ApiProperty({
    type: () => SubRedditResponse,
    isArray: true,
  })
  subreddits!: SubRedditResponse[];

  @ApiProperty()
  numberOfImages!: number;
}
