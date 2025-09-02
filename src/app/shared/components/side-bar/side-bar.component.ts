import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Category as CategoryService } from '@core/services/storage/category/category';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
  standalone: false,
})
export class SideBarComponent {
  @Input() set isOpen(value: boolean) {
    this._isOpen = value;
    if (value) {
      document.querySelector('ion-menu')?.open();
    } else {
      document.querySelector('ion-menu')?.close();
    }
  }

  private _isOpen = false;

  @Output() public close = new EventEmitter<void>();
  @Output() public logout = new EventEmitter<void>();

  public categories = [
    'General',
    'Business',
    'Entertainment',
    'Health',
    'Science',
    'Sports',
    'Technology',
  ];

  public constructor(private categoryService: CategoryService) {}

  get isOpen(): boolean {
    return this._isOpen;
  }

  public onClose() {
    this.close.emit();
  }

  public onLogout() {
    this.logout.emit();
    this.onClose();
  }

  public onCategorySelected(category: string) {
    this.categoryService.change(category);

    this.onClose();
  }
}
