import { AppConfigModule } from '@core/config';
import {
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from '@nestjs/common';
import { PrismaModule } from '@core/services/prisma/prisma.module';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE, Reflector } from '@nestjs/core';
import { AllExceptionsFilter } from '@core/exception-filters';
import { LoggerMiddleware } from '@core/middlewares/logger.middleware';
import { ParseJsonPipe } from '@core/pipes/transform-pipe';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { RedditModule } from './modules/reddit/reddit.module';

@Module({
  imports: [
    PrismaModule,
    AppConfigModule,
    AuthModule,
    UserModule,
    RedditModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useFactory: (): ValidationPipe =>
        new ValidationPipe({
          transform: true,
          whitelist: true,
          forbidNonWhitelisted: true,
        }),
    },
    // For formatting exeptions
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    // For transforming string to object
    {
      provide: APP_PIPE,
      useFactory: (): ParseJsonPipe => new ParseJsonPipe(),
    },
    // For transforming objects to JSON
    {
      provide: APP_INTERCEPTOR,
      useFactory: (reflector: Reflector): ClassSerializerInterceptor =>
        new ClassSerializerInterceptor(reflector, {
          excludePrefixes: ['_'],
        }),
      inject: [Reflector],
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
