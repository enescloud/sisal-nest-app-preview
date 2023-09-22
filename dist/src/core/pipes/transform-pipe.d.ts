import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class ParseJsonPipe implements PipeTransform<string, Record<string, any>> {
    private readonly logger;
    transform(value: string, metadata: ArgumentMetadata): any;
}
//# sourceMappingURL=transform-pipe.d.ts.map