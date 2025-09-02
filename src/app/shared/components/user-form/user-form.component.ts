import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Loader as LoaderService } from '@shared/services/loader/loader';
import { Toast as ToastService } from '@shared/services/toast/toast';

import { User as UserService } from '@core/services/user/user';

import { User } from '@models/user.model';
import { Country } from '@models/country.model';

import { v4 as uuidv4 } from 'uuid';

@Component({

	selector: 'app-user-form',
	templateUrl: './user-form.component.html',
	styleUrls: ['./user-form.component.scss'],
	standalone: false

}) export class UserFormComponent implements OnInit {

	@Input() user: User | null = null;
	@Input() countries: Country[] = [];
	@Output() onSubmit = new EventEmitter<User>();
	@Output() onCancel = new EventEmitter<void>();

	public userForm: FormGroup;

	public constructor(

		private fb: FormBuilder,
		private loaderService: LoaderService,
		private toastService: ToastService

	) {

		this.userForm = this.fb.group({

			name: ['', [Validators.required, Validators.minLength(2)]],
			surname: ['', [Validators.required, Validators.minLength(2)]],
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]],
			country: ['', Validators.required]

		});


	}

	public ngOnInit() {

		if (this.user){

			this.userForm.patchValue({

				name: this.user.name,
				surname: this.user.surname,
				email: this.user.email,
				country: this.user.country.id

			});

		}

	}

	public onSubmitForm(): void {

		if (this.userForm.valid) {

			setTimeout(() => {

				//this.loaderService.show();

				const formValue = this.userForm.value;
				const selectedCountry = this.countries.find(c => c.id === formValue.country);
				
				if (!selectedCountry) {
					this.toastService.showError('Please select a valid country');
					this.loaderService.hide();
					return;
				}

				const userData: User = {

					id: this.user?.id || uuidv4(),
					name: formValue.name,
					surname: formValue.surname,
					email: formValue.email,
					password: formValue.password,
					country: selectedCountry

				};

				this.onSubmit.emit(userData);
				//this.loaderService.hide();
				
				this.toastService.showConfirmation(
					this.user ? 'User updated successfully!' : 'User created successfully!'
				);

			}, 1000);

		} else {

			this.markFormGroupTouched();
			this.toastService.showError('Please fill all required fields correctly');

		}

	}

	public onCancelForm(): void {
		this.onCancel.emit();
	}

	private markFormGroupTouched(): void {
		Object.keys(this.userForm.controls).forEach(key => {
			this.userForm.get(key)?.markAsTouched();
		});
	}

	public hasError(controlName: string, errorName: string): boolean {
		const control = this.userForm.get(controlName);
		return control ? control.hasError(errorName) && control.touched : false;
	}

	public isRequired(controlName: string): boolean {
		const control = this.userForm.get(controlName);
		return control ? control.hasValidator(Validators.required) : false;
	}

}