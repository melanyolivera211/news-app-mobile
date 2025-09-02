import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Loader as LoaderService } from '@shared/services/loader/loader';
import { Toast as ToastService } from '@shared/services/toast/toast';

import { User as UserService } from '@core/services/user/user';
 
import { User } from '@models/user.model';
import { Country } from '@models/country.model';

@Component({

	selector: 'app-register',
	templateUrl: './register.page.html',
	styleUrls: ['./register.page.scss'],
	standalone: false

}) export class RegisterPage implements OnInit {
	public countries: Country[] = [
		{ id: 'col', value: 'Colombia' },
		{ id: 'usa', value: 'United States' },
		{ id: 'can', value: 'Canada' },
		{ id: 'ukn', value: 'United Kingdom' },
		{ id: 'aus', value: 'Australia' },
		{ id: 'de', value: 'Germany' },
		{ id: 'fr', value: 'France' },
		{ id: 'es', value: 'Spain' },
		{ id: 'it', value: 'Italy' }
	];

	public constructor(
		private userService: UserService,
		private toastService: ToastService,
		private loaderService: LoaderService,
		private router: Router
	) {}

	public ngOnInit() {}

	public onUserSubmit(user: User): void {

		this.loaderService.show();

		this.userService.set(user);

		this.loaderService.hide();

		this.router.navigate(['/home']);

	}

	public onCancel(): void {

		this.router.navigate(['/']);

	}

	public navigateToLogin(): void {
		this.router.navigate(['/login']);
	}

}