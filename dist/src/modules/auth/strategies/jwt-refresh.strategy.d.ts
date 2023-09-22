import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { AppConfigService } from '@core/config';
import { JwtRefreshUser, JwtUser } from '../types/types';
declare const JwtRefreshStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtRefreshStrategy extends JwtRefreshStrategy_base {
    private configService;
    constructor(configService: AppConfigService);
    validate(req: Request, payload: JwtUser): JwtRefreshUser;
}
export {};
//# sourceMappingURL=jwt-refresh.strategy.d.ts.map