/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

import { CurrentUser } from '../types/types';

@Injectable()

/* The JwtAuthGuard class is a custom authentication guard that extends the AuthGuard class and handles
JWT authentication logic. */
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

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
        throw new UnauthorizedException('jwt-expired');
      }

      if (err) {
        this.logger.error(`Error in JwtAuthGuard: `, err);
      }
      throw err || new ForbiddenException();
    }
    return user;
  }
}
