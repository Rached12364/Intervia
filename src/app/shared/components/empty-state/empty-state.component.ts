import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnComponent } from '../btn/btn.component';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule, BtnComponent, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="empty">
      <app-icon [name]="icon" class="empty__icon" aria-hidden="true" />
      <h3 class="empty__title">{{ title }}</h3>
      <p class="empty__description">{{ description }}</p>
      @if (actionLabel) {
        <app-btn variant="secondary" (onClick)="onAction.emit()">
          {{ actionLabel }}
        </app-btn>
      }
    </div>
  `,
  styles: [`
    .empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: var(--space-4xl) var(--space-lg);
      gap: var(--space-md);
      text-align: center;
      animation: fadeIn var(--transition-slow) both;
    }

    .empty__icon {
      font-size: 48px;
      color: var(--color-border);
    }

    .empty__title {
      font-size: var(--font-size-h2);
      font-weight: var(--font-weight-semibold);
      color: var(--color-text);
    }

    .empty__description {
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
      max-width: 400px;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `]
})
export class EmptyStateComponent {
  @Input() icon = 'inbox';
  @Input() title = 'Aucun contenu';
  @Input() description = '';
  @Input() actionLabel = '';
  @Output() onAction = new EventEmitter<void>();
}
