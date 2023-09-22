import { INestApplication, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AppConfigService } from '@core/config';
export declare class PrismaService extends PrismaClient implements OnModuleInit {
    constructor(configService: AppConfigService);
    onModuleInit(): Promise<void>;
    enableShutdownHooks(app: INestApplication): void;
}
//# sourceMappingURL=prisma.service.d.ts.map