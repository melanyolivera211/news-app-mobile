import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Element } from '@models/element.model';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
  standalone: false,
})
export class SelectComponent<T extends Element>
  implements ControlValueAccessor
{
  @Input() label: string = '';
  @Input() placeholder: string = 'Select an option';
  @Input() multiple: boolean = false;
  @Input() options: T[] = [];
  @Input() interface: 'action-sheet' | 'alert' | 'popover' = 'action-sheet';
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() errorMessage: string = '';
  @Input() icon: string = '';
  @Input() compareWith: (o1: any, o2: any) => boolean = this.defaultCompareWith;

  @Output() selectionChange = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<any>();
  @Output() onDismiss = new EventEmitter<any>();

  value: any = this.multiple ? [] : null;
  hasError: boolean = false;
  touched: boolean = false;

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  trackByFn(index: number, element: T): string {
    return element.id;
  }

  defaultCompareWith(o1: any, o2: any): boolean {
    return o1 === o2;
  }

  onSelectionChange(event: any): void {
    this.value = event.detail.value;
    this.onChange(this.value);
    this.markAsTouched();
    this.selectionChange.emit(this.value);
    this.validateSelection();
  }

  onDismissEvent(event: any): void {
    this.markAsTouched();
    this.onDismiss.emit(event);
  }

  onCancelEvent(event: any): void {
    this.markAsTouched();
    this.onCancel.emit(event);
  }

  private markAsTouched(): void {
    if (!this.touched) {
      this.touched = true;
      this.onTouched();
      this.validateSelection();
    }
  }

  validateSelection(): void {

    const isEmpty = this.multiple
      ? !this.value || this.value.length === 0
      : !this.value;
    this.hasError = this.required && isEmpty && this.touched;
  }

  getSelectedItems(): T[] {
    if (!this.multiple || !this.value || !Array.isArray(this.value)) {
      return [];
    }

    return this.options.filter((element) => this.value.includes(element.id));
  }

  deselectItem(item: T): void {
    if (this.multiple && Array.isArray(this.value)) {
      this.value = this.value.filter((id: string) => id !== item.id);
      this.onChange(this.value);
      this.markAsTouched();
      this.selectionChange.emit(this.value);
      this.validateSelection();
    }
  }

  writeValue(value: any): void {
    this.value = value;
    this.validateSelection();
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  clearSelection(): void {
    this.value = this.multiple ? [] : null;
    this.onChange(this.value);
    this.markAsTouched();
    this.selectionChange.emit(this.value);
    this.validateSelection();
  }
}
