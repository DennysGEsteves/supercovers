/* eslint-disable import/no-extraneous-dependencies */
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ArtistsModule } from 'apis/artist/artist-module';
import { VideosModule } from 'apis/video/video-module';
import envs from 'settings';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ExceptionHandler } from 'http/exceptions/exception-handler';
import { RequestMiddleware } from 'http/middlewares/request/request-middleware';
import { ResponseInterceptor } from 'http/interceptors/response/response-interceptor';
import { AdminModule } from 'apis/admin/admin-module';
import { AuthModule } from 'apis/auth/auth-module';
import { UsersModule } from 'apis/user/user-module';
import { HomeCategoriesModule } from 'apis/home-categories/home-categories-module';
import { PlaylistModule } from 'apis/playlist/playlist-module';
import { ContactUsModule } from 'apis/contact/contact-us-module';
import { SearchModule } from 'apis/search/search-module';
import { LoggerModule } from 'utils/logger';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [envs] }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'static'),
    }),
    LoggerModule,
    AuthModule,
    UsersModule,
    ArtistsModule,
    VideosModule,
    PlaylistModule,
    AdminModule,
    HomeCategoriesModule,
    ContactUsModule,
    SearchModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionHandler,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestMiddleware)
      .exclude('/contact-us/health', '/users/avatar/(.*)', '/users/me')
      .forRoutes('*');
  }
}
