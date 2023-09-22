import { PageMetaParameters } from './page-meta-params.dto';
export declare class PageMeta {
    readonly page: number;
    readonly take: number;
    readonly itemCount: number;
    readonly pageCount: number;
    readonly hasPreviousPage: boolean;
    readonly hasNextPage: boolean;
    constructor({ pageOptionsInput, itemCount }: PageMetaParameters);
}
//# sourceMappingURL=page-meta.dto.d.ts.map