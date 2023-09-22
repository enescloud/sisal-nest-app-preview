import { Strategy } from 'passport-jwt';
import { AppConfigService } from '@core/config';
import { JwtUser } from '../types/types';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    constructor(configService: AppConfigService);
    validate(payload: JwtUser): JwtUser;
}
export {};
//# sourceMappingURL=jwt.strategy.d.ts.map