import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

import { environment as env } from '@env/environment';

import { CountriesNow } from '@models/countries-now.model';
import { IQuery } from '@interfaces/query.interface';

@Injectable({
  providedIn: 'root',
})
export class IsoCountry implements IQuery<CountriesNow> {
  private readonly url: string = env.countriesnow.baseUrl;

  public constructor(private readonly http: HttpClient) {}

  public async findAll(): Promise<HttpResponse<CountriesNow>> {
    try {
      return (await lastValueFrom(
        this.http.get(`${this.url}/api/v0.1/countries/iso`, {
          observe: 'response',
        })
      )) as unknown as HttpResponse<CountriesNow>;
    } catch (e: any) {
      throw e as HttpErrorResponse;
    }
  }
}
