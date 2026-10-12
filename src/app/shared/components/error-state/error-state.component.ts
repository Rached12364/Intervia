import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnComponent } from '../btn/btn.component';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-error-state',
  standalone: true,
  imports: [CommonModule, BtnComponent, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="error-state">
      <app-icon name="cloud_off" class="error-state__icon" aria-hidden="true" />
      <h3 class="error-state__title">Oups, quelque chose n'a pas fonctionné</h3>
      <p class="error-state__message">{{ message }}</p>
      <app-btn variant="secondary" icon="refresh" (onClick)="onRetry.emit()">
        Réessayer
      </app-btn>
    </div>
  `,
  styles: [`
    .error-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: var(--space-4xl) var(--space-lg);
      gap: var(--space-md);
      text-align: center;
      animation: fadeIn var(--transition-slow) both;
    }

    .error-state__icon {
      font-size: 48px;
      color: var(--color-error);
    }

    .error-state__title {
      font-size: var(--font-size-h2);
      font-weight: var(--font-weight-semibold);
      color: var(--color-text);
    }

    .error-state__message {
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
export class ErrorStateComponent {
  @Input() message = 'Pas de panique, ça arrive même aux meilleurs. Vérifie ta connexion et réessaie.';
  @Output() onRetry = new EventEmitter<void>();
}
