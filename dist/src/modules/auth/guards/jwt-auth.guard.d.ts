import { ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CurrentUser } from '../types/types';
declare const JwtAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class JwtAuthGuard extends JwtAuthGuard_base {
    private readonly logger;
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
    handleRequest(err: any, user: CurrentUser, info: any): any;
}
export {};
//# sourceMappingURL=jwt-auth.guard.d.ts.map