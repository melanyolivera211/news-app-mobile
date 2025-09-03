import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Loader as LoaderService } from '@shared/services/loader/loader';
import { Toast as ToastService } from '@shared/services/toast/toast';
import { User as UserService } from '@core/services/storage/user/user';

import { Credential } from '@models/credential.model';
import { User } from '@models/user.model';
import { EncryptProvider } from '@core/services/storage/user/encrypt';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;

  public constructor(
    private fb: FormBuilder,
    private loaderService: LoaderService,
    private toastService: ToastService,
    private userService: UserService,
    private router: Router,
    private encryptProvider: EncryptProvider 
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false],
    });
  }

  public ngOnInit() {}

  public onSubmit(): void {
  if (this.loginForm.valid) {
    this.loaderService.show();

    setTimeout(() => {
      const formValue = this.loginForm.value;
      const cred: Credential = {
        email: formValue.email,
        password: formValue.password,
      };

      const user: User | null = this.userService.get();

      if (user) {
        const isEmailValid = cred.email === user.email;
        const isPasswordValid = this.encryptProvider.compare(cred.password, user.password);

        if (isEmailValid && isPasswordValid) {
          this.router.navigate(['/home']);
        } else {
          this.toastService.showError('Wrong Credentials');
        }
      }

      this.loaderService.hide();
    }, 1000);
  } else {
    this.markFormGroupTouched();
    this.toastService.showError('Please fill all required fields correctly');
  }
}

  public navigateToRegister(): void {
    this.router.navigate(['/register']);
  }

  public navigateToForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach((key) => {
      this.loginForm.get(key)?.markAsTouched();
    });
  }

  public hasError(controlName: string, errorName: string): boolean {
    const control = this.loginForm.get(controlName);
    return control ? control.hasError(errorName) && control.touched : false;
  }
}
