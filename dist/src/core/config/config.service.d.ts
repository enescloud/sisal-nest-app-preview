import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from './env.validation';
export declare class AppConfigService {
    private readonly configService;
    constructor(configService: ConfigService<EnvironmentVariables>);
    get STAGE(): string;
    get PORT(): number;
    get DATABASE_URL(): string;
    get<T>(key: keyof EnvironmentVariables): T;
    get isNeedSecrets(): boolean;
    static get isNeedEnv(): boolean;
}
//# sourceMappingURL=config.service.d.ts.map