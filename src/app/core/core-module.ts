import { NgModule } from '@angular/core';

import {
  provideHttpClient,
  withInterceptorsFromDi,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';

import { NewsInterceptor } from './interceptors/news/news.interceptor';

import { News } from './services/http/news/news';
import { IsoCountry } from './services/http/iso-country/iso-country';

import { User } from './services/storage/user/user';
import { Category } from './services/storage/category/category';

import { UserGuard } from './guards/user/user.guard';

@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    News,
    User,
    UserGuard,
    IsoCountry,
    Category,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NewsInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
