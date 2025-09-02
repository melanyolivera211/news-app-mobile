import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Toast as ToastService } from '@shared/services/toast/toast';
import { Toast } from '@models/toast.model';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  standalone: false,
})
export class ToastComponent implements OnInit {
  public toast: Toast | null = null;
  public visible = false;

  public constructor(private toastService: ToastService) {}

  public ngOnInit(): void {
    this.toastService.toastSubject$.subscribe((toast) => {
      if (toast) {
        this.toast = toast;
        this.visible = true;
      } else {
        this.visible = false;

        setTimeout(() => {
          if (!this.visible) {
            this.toast = null;
          }
        }, 300);
      }
    });
  }

  public dismiss(): void {
    this.toastService.dismiss();
  }

  public getToastIcon(typo: Toast['typo']): string {
    switch (typo) {
      case 'error':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      case 'confirmation':
        return '✅';
      default:
        return 'ℹ️';
    }
  }

  public getToastClass(typo: Toast['typo']): string {
    switch (typo) {
      case 'error':
        return 'toast-error';
      case 'info':
        return 'toast-info';
      case 'confirmation':
        return 'toast-confirmation';
      default:
        return 'toast-info';
    }
  }
}
