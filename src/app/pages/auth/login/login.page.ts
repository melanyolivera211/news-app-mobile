import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Loader as LoaderService } from '@shared/services/loader/loader';
import { Toast as ToastService } from '@shared/services/toast/toast';
import { User as UserService } from '@core/services/user/user';

import { Credential } from '@models/credential.model';
import { User } from '@models/user.model';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
	standalone: false
})
export class LoginPage implements OnInit {
	public loginForm: FormGroup;
	public showPassword: boolean = false;

	public constructor(
		private fb: FormBuilder,
		private loaderService: LoaderService,
		private toastService: ToastService,
		private userService: UserService,
		private router: Router
	) {
		this.loginForm = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]],
			rememberMe: [false]
		});
	}

	public ngOnInit() {
		// Check if there are saved credentials
		const savedCredentials = localStorage.getItem('rememberedCredentials');
		if (savedCredentials) {
			const credentials = JSON.parse(savedCredentials);
			this.loginForm.patchValue({
				email: credentials.email,
				password: credentials.password,
				rememberMe: true
			});
		}
	}

	public onSubmit(): void {
		if (this.loginForm.valid) {
			this.loaderService.show();
			
			const formValue = this.loginForm.value;
			const cred: Credential = {
				email: formValue.email,
				password: formValue.password
			};

			const user: User | null = this.userService.get();

			if (user){

				if (cred.email==user.email && cred.password==user.password){

					this.router.navigate(['/home']);

				}else{

					this.toastService.showError('Wrong Credentials');

				}

			}
		} else {
			this.markFormGroupTouched();
			this.toastService.showError('Please fill all required fields correctly');
		}
	}

	public togglePasswordVisibility(): void {
		this.showPassword = !this.showPassword;
	}

	public navigateToRegister(): void {
		this.router.navigate(['/register']);
	}

	public navigateToForgotPassword(): void {
		this.router.navigate(['/forgot-password']);
	}

	private markFormGroupTouched(): void {
		Object.keys(this.loginForm.controls).forEach(key => {
			this.loginForm.get(key)?.markAsTouched();
		});
	}

	public hasError(controlName: string, errorName: string): boolean {
		const control = this.loginForm.get(controlName);
		return control ? control.hasError(errorName) && control.touched : false;
	}
}