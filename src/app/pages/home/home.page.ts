import { Component } from '@angular/core';
import { Loader } from '@shared/services/loader/loader';

@Component({

	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
	standalone: false,

}) export class HomePage {

	constructor(private loaderService: Loader) {

		//this.loadingService.show();

	}

}
