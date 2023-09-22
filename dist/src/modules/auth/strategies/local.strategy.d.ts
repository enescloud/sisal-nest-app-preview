import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';
import { CurrentUser } from '../types/types';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(email: string, password: string): Promise<CurrentUser>;
}
export {};
//# sourceMappingURL=local.strategy.d.ts.map