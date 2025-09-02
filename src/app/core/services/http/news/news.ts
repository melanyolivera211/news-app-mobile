import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment as env } from '@env/environment';

import { News as NewsModel } from '@models/news.model';

import { IQuery } from '@interfaces/query.interface';

@Injectable({
  providedIn: 'root',
})
export class News implements IQuery<NewsModel> {
  private readonly url: string = env.newsapi.baseUrl;
  private category: string = 'general';

  public constructor(private readonly http: HttpClient) {}

  public async findAll(): Promise<HttpResponse<NewsModel>> {
    try {
      return (await lastValueFrom(
        this.http.get(`${this.url}/v2/top-headlines`, {
          observe: 'response',
          params: {
            pageSize: 100,
            sortBy: 'publishedAt',
            category: this.category,
          },
        })
      )) as unknown as HttpResponse<NewsModel>;
    } catch (e: any) {
      throw e as HttpErrorResponse;
    }
  }

  public setCategory(category: string) {
    this.category = category;
  }
}
