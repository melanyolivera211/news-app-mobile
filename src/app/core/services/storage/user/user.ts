import { Injectable } from '@angular/core';
import { User as UserModel } from '@models/user.model';

@Injectable({
  providedIn: 'root',
})
export class User {
  public constructor() {}

  public get(): UserModel | null {
    try {
      const userString: string | null = localStorage.getItem('user');

      if (!userString) return null;

      return JSON.parse(userString) as UserModel;
    } catch (e) {
      throw e;
    }
  }

  public set(user: UserModel): void {
    const userString: string = JSON.stringify(user);

    localStorage.setItem('user', userString);
  }

  public remove(): void {
    localStorage.removeItem('user');
  }
}
