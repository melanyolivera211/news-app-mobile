// input.component.ts
import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  standalone: false,
})
export class InputComponent implements ControlValueAccessor, Validator {
  @Input() type: 'text' | 'email' | 'password' | 'number' | 'tel' = 'text';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() icon: string = '';
  @Input() clearable: boolean = false;
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() lines: 'full' | 'inset' | 'none' = 'full';
  @Input() labelPosition: 'fixed' | 'stacked' | 'floating' = 'stacked';
  @Input() errorMessage: string = '';
  @Input() pattern: string = '';
  @Input() minLength: number = 0;
  @Input() maxLength: number = Infinity;

  @Output() valueChange = new EventEmitter<string>();
  @Output() inputBlur = new EventEmitter<void>();
  @Output() inputFocus = new EventEmitter<void>();

  value: string = '';
  hasError: boolean = false;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  onInputChange(event: any) {
    this.value = event.detail.value;
    this.onChange(this.value);
    this.valueChange.emit(this.value);
    this.validateInput();
  }

  onInputBlur() {
    this.onTouched();
    this.inputBlur.emit();
    this.validateInput();
  }

  onInputFocus() {
    this.inputFocus.emit();
  }

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.validateControl(control.value);
  }

  private validateInput() {
    this.hasError = this.validateControl(this.value) !== null;
  }

  private validateControl(value: string): ValidationErrors | null {
    if (this.required && (!value || value.trim() === '')) {
      return { required: true };
    }

    if (value && this.pattern) {
      const regex = new RegExp(this.pattern);
      if (!regex.test(value)) {
        return { pattern: true };
      }
    }

    if (value && this.minLength > 0 && value.length < this.minLength) {
      return { minlength: true };
    }

    if (value && this.maxLength < Infinity && value.length > this.maxLength) {
      return { maxlength: true };
    }

    return null;
  }
}
