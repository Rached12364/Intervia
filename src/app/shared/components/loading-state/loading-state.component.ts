import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-state',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="loading">
      <div class="loading__spinner"></div>
      <p class="loading__message">{{ message }}</p>
    </div>
  `,
  styles: [`
    .loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: var(--space-4xl) var(--space-lg);
      gap: var(--space-md);
      animation: fadeIn var(--transition-base) both;
    }

    .loading__spinner {
      width: 40px;
      height: 40px;
      border: 3px solid var(--color-border-light);
      border-top-color: var(--color-primary);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    .loading__message {
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `]
})
export class LoadingStateComponent {
  @Input() message = 'Chargement en cours...';
}
