import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { User as UserService } from '@core/services/user/user';
import { User } from '@models/user.model';

@Injectable({
	providedIn: 'root'
}) export class UserGuard {

	public constructor(

		private userService: UserService, private router: Router

	) {}

	public canActivate(): boolean {

		return this.userService.get() ? true : false;

	}

}