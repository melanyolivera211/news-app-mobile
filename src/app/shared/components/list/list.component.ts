import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: false,
})
export class ListComponent {
  @Input() categories: string[] = [];
  @Output() categorySelected = new EventEmitter<string>();

  public selectCategory(category: string) {
    this.categorySelected.emit(category);
  }

  public getCategoryIcon(category: string): string {
    const categoryIcons: { [key: string]: string } = {
      business: 'business',
      entertainment: 'film',
      general: 'newspaper',
      health: 'medkit',
      science: 'flask',
      sports: 'basketball',
      technology: 'hardware-chip',
    };

    return categoryIcons[category.toLowerCase()] || 'help';
  }
}
