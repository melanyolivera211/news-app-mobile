import { HttpResponse } from '@angular/common/http';

export interface IQuery<T> {
  findAll(): Promise<HttpResponse<T>>;
}
