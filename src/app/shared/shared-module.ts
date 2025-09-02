import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LoaderComponent } from './components/loader/loader.component';
import { ToastComponent } from './components/toast/toast.component';
import { ButtonComponent } from './components/button/button.component';
import { CardComponent } from './components/card/card.component';
import { HeaderComponent } from './components/header/header.component';
import { InputComponent } from './components/input/input.component';
import { LinkComponent } from './components/link/link.component';
import { ListComponent } from './components/list/list.component';
import { ModalComponent } from './components/modal/modal.component';
import { PrincipalNewsComponent } from './components/principal-news/principal-news.component';
import { SelectComponent } from './components/select/select.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { UserFormComponent } from './components/user-form/user-form.component';

import { Loader } from './services/loader/loader';
import { Toast } from './services/toast/toast';

@NgModule({
	declarations: [
	
		LoaderComponent,
		ToastComponent,
		ButtonComponent,
		CardComponent,
		HeaderComponent,
		InputComponent,
		LinkComponent,
		ListComponent,
		ModalComponent,
		PrincipalNewsComponent,
		SelectComponent,
		SideBarComponent,
		UserFormComponent

	],
	imports: [

		CommonModule,
		FormsModule,
		IonicModule.forRoot(),
		ReactiveFormsModule,
		RouterModule

	], exports: [

		CommonModule,
		FormsModule,
		IonicModule,
		ReactiveFormsModule,
		RouterModule,
		LoaderComponent,
		ToastComponent,
		ButtonComponent,
		CardComponent,
		HeaderComponent,
		InputComponent,
		LinkComponent,
		ListComponent,
		ModalComponent,
		PrincipalNewsComponent,
		SelectComponent,
		SideBarComponent,
		UserFormComponent

	], providers: [Loader, Toast]

})
export class SharedModule { }
