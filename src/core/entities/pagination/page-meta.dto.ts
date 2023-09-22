import { ApiProperty } from '@nestjs/swagger';

import { PageMetaParameters } from './page-meta-params.dto';

export class PageMeta {
  @ApiProperty()
  readonly page: number;

  @ApiProperty()
  readonly take: number;

  @ApiProperty()
  readonly itemCount: number;

  @ApiProperty()
  readonly pageCount: number;

  @ApiProperty()
  readonly hasPreviousPage: boolean;

  @ApiProperty()
  readonly hasNextPage: boolean;

  constructor({ pageOptionsInput, itemCount }: PageMetaParameters) {
    this.page = pageOptionsInput.page;
    this.take = pageOptionsInput.take;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.take);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }
}
