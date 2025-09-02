import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpResponse } from '@angular/common/http';

import { Loader as LoaderService } from '@shared/services/loader/loader';
import { Toast as ToastService } from '@shared/services/toast/toast';

import { User as UserService } from '@core/services/storage/user/user';
import { IsoCountry as IsoCountryService } from '@core/services/http/iso-country/iso-country';

import { User } from '@models/user.model';
import { CountriesNow } from '@models/countries-now.model';
import { Country, castCountryFromIso } from '@models/country.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  public countries: Country[] = [];

  public constructor(
    private userService: UserService,
    private isoCountryService: IsoCountryService,
    private toastService: ToastService,
    private loaderService: LoaderService,
    private router: Router
  ) {}

  public async ngOnInit(): Promise<void> {
    try {
      const countryResponse: HttpResponse<CountriesNow> =
        await this.isoCountryService.findAll();

      const countries: CountriesNow | null = countryResponse.body;

      if (countries) {
        this.countries = castCountryFromIso(countries.data);
      } else {
        throw new Error('Unnable to fetch data');
      }
    } catch (e: any) {
      this.toastService.showError(e.message);
    }
  }

  public onUserSubmit(user: User): void {
    this.userService.set(user);

    this.router.navigate(['/home']);
  }

  public navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
