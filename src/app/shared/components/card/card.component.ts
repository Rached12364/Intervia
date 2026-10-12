import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card"
         [class.card--elevated]="elevated"
         [class.card--clickable]="clickable"
         [class.card--compact]="padding === 'compact'"
         [class.card--flush]="padding === 'flush'">
      <ng-content></ng-content>
    </div>
  `,
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() elevated = false;
  @Input() clickable = false;
  @Input() padding: 'default' | 'compact' | 'flush' = 'default';
}
