import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '../services/auth.service';
import { CurrentUser } from '../types/types';

/* The LocalStrategy class is a Passport strategy that validates a user's email and password using the
AuthService. */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  async validate(email: string, password: string): Promise<CurrentUser> {
    return this.authService.validateUser(email, password);
  }
}
