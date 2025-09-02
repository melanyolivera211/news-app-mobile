import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Toast as ToastModel } from '@models/toast.model';

@Injectable({

	providedIn: 'root'

}) export class Toast {

	private _toastSubject: BehaviorSubject<ToastModel | null> = new BehaviorSubject<ToastModel | null>(null);
	public toastSubject$: Observable<ToastModel | null> = this._toastSubject.asObservable();

	private currentTimeout: any = null;

	public constructor(){}

	public showError(message: string, duration: number = 5000): void {

		this.showToast({ message, typo: 'error', duration });

	}

	public showInfo(message: string, duration: number = 3000): void {

		this.showToast({ message, typo: 'info', duration });

	}

	public showConfirmation(message: string, duration: number = 3000): void {

		this.showToast({ message, typo: 'confirmation', duration });

	}

	private showToast(toast: ToastModel): void {

		if (this.currentTimeout) {

			clearTimeout(this.currentTimeout);
			this.currentTimeout = null;

		}

		this._toastSubject.next(toast);

		if (toast.duration && toast.duration > 0) {

			this.currentTimeout = setTimeout(() => {

				this.dismiss();

			}, toast.duration);

		}

	}

	public dismiss(): void {

		if (this.currentTimeout) {

			clearTimeout(this.currentTimeout);
			this.currentTimeout = null;

		}

		this._toastSubject.next(null);

	}

}