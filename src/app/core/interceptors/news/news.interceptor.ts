import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from '@env/environment';

@Injectable()
export class NewsInterceptor implements HttpInterceptor {
  public constructor() {}

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const cloned = request.clone({
      setHeaders: {
        Authorization: `${env.newsapi.api_key}`,
      },
    });

    return next.handle(cloned);
  }
}
