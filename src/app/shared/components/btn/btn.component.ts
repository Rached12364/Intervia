import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-btn',
  standalone: true,
  imports: [CommonModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      [class]="'btn btn--' + variant + ' btn--' + size"
      [class.btn--loading]="loading"
      [class.btn--full-width]="fullWidth"
      [disabled]="disabled || loading"
      [type]="type"
      (click)="onClick.emit($event)">
      @if (loading) {
        <span class="btn__spinner"></span>
      }
      @if (icon && !loading) {
        <app-icon [name]="icon" class="btn__icon" aria-hidden="true" />
      }
      <span class="btn__label"><ng-content></ng-content></span>
    </button>
  `,
  styleUrl: './btn.component.scss'
})
export class BtnComponent {
  @Input() variant: 'primary' | 'secondary' | 'ghost' | 'danger' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() icon = '';
  @Input() fullWidth = false;
  @Input() type: 'button' | 'submit' = 'button';
  @Output() onClick = new EventEmitter<Event>();
}
