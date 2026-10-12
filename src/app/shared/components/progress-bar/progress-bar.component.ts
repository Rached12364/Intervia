import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="progress">
      @if (label) {
        <div class="progress__header">
          <span class="progress__label">{{ label }}</span>
          <span class="progress__count">{{ current }} sur {{ total }}</span>
        </div>
      }
      <div class="progress__track" [attr.aria-valuenow]="current" [attr.aria-valuemax]="total" role="progressbar">
        <div class="progress__fill" [style.width.%]="percentage"></div>
      </div>
    </div>
  `,
  styleUrl: './progress-bar.component.scss'
})
export class ProgressBarComponent {
  @Input() current = 0;
  @Input() total = 1;
  @Input() label = '';

  get percentage(): number {
    return this.total > 0 ? Math.round((this.current / this.total) * 100) : 0;
  }
}
