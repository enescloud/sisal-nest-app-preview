/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

import { CurrentUser } from '../types/types';

/* The JwtRefreshAuthGuard class is an implementation of the AuthGuard class that handles
authentication using JWT refresh tokens. */
@Injectable()
export class JwtRefreshAuthGuard extends AuthGuard('jwt-refresh') {
  private readonly logger = new Logger(JwtRefreshAuthGuard.name);

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    return super.canActivate(context);
  }

  handleRequest(err: any, user: CurrentUser, info: any): any {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (info?.message === 'jwt expired') {
        throw new UnauthorizedException('refresh-jwt-expired');
      }

      if (err) {
        this.logger.error(`Error in JwtAuthGuard: `, err);
      }

      throw err || new UnauthorizedException();
    }
    return user;
  }
}
