import { ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CurrentUser } from '../types/types';
declare const JwtRefreshAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class JwtRefreshAuthGuard extends JwtRefreshAuthGuard_base {
    private readonly logger;
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
    handleRequest(err: any, user: CurrentUser, info: any): any;
}
export {};
//# sourceMappingURL=jwt-refresh-auth.guard.d.ts.map