import { ApiProperty } from '@nestjs/swagger';

import { PageMeta } from './page-meta.dto';

export class PaginationResponse<T> {
  @ApiProperty({ type: [Object] })
  readonly data: T[];

  @ApiProperty({ type: () => PageMeta })
  readonly meta: PageMeta;

  constructor(data: T[], meta: PageMeta) {
    this.data = data;
    this.meta = meta;
  }
}
