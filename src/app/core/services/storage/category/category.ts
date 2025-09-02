import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Category {
  private _currentCategory: BehaviorSubject<string> =
    new BehaviorSubject<string>('general');
  public currentCategory$: Observable<string> =
    this._currentCategory.asObservable();

  public constructor() {}

  public change(category: string): void {
    this._currentCategory.next(category);
  }
}
