import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, lastValueFrom } from 'rxjs';
import { environment as env } from '@env/environment';

import { News as NewsModel } from '@models/news.model';

@Injectable({
  providedIn: 'root'
})
export class News {

	private readonly url: string = env.newsapi.baseUrl

	public constructor(private readonly http: HttpClient) {}

	public async findAll(): Promise<HttpResponse<NewsModel>> {

		try{

			return await lastValueFrom(this.http.get(`${this.url}/v2/everything`, {

				observe: 'response',
				params: {

					pageSize: 10,
					sortBy: 'publishedAt',
					q: 'recent'

				}

			})) as unknown as HttpResponse<NewsModel>;

		}catch(e: any){

			throw e as HttpErrorResponse;

		}

	}

}
