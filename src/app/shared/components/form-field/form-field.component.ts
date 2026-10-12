import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [CommonModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="form-field" [class.form-field--error]="error" [class.form-field--required]="required">
      @if (label) {
        <label class="form-field__label">
          {{ label }}
          @if (required) {
            <span class="form-field__required" aria-hidden="true">*</span>
          }
        </label>
      }
      <div class="form-field__input">
        <ng-content></ng-content>
      </div>
      @if (error) {
        <p class="form-field__error" role="alert">
          <app-icon name="error_outline" aria-hidden="true" />
          {{ error }}
        </p>
      } @else if (hint) {
        <p class="form-field__hint">{{ hint }}</p>
      }
    </div>
  `,
  styleUrl: './form-field.component.scss'
})
export class FormFieldComponent {
  @Input() label = '';
  @Input() error = '';
  @Input() hint = '';
  @Input() required = false;
}
