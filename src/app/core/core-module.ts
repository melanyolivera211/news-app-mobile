import { NgModule } from '@angular/core';

import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NewsInterceptor } from './interceptors/news/news.interceptor';

import { News } from './services/news/news';
import { User } from './services/user/user';

import { UserGuard } from './guards/user/user.guard';

@NgModule({
	declarations: [],
	imports: [], exports: [], providers: [

		provideHttpClient(withInterceptorsFromDi()), News, User, UserGuard, {

			provide: HTTP_INTERCEPTORS,
			useClass: NewsInterceptor,
			multi: true

		}

	]
})
export class CoreModule { }
