export class AuthConstants {
  static readonly accessTokenExpiresIn = 86400000; // 24 hours in milliseconds

  static readonly refreshTokenExpiresIn = 604800000; // 7 days in milliseconds

  static readonly resetPasswordTokenExpiresIn = 3600000; // 1 hour in milliseconds

  static readonly verifyEmailTokenExpiresIn = 3600000; // 1 hour in milliseconds
}
