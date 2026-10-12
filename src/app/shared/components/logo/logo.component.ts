import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="app-logo"
      [class.app-logo--symbol-only]="variant === 'symbol'"
      [class.app-logo--theme-light]="theme === 'light'"
      [class.app-logo--theme-dark]="theme === 'dark'">
      <img
        src="assets/logo.jpg"
        alt="IntervIA"
        [width]="size"
        [height]="size"
        [style.width.px]="size"
        [style.height.px]="size"
        class="app-logo__img"
        loading="eager" />

      @if (variant === 'full') {
        <span class="app-logo__text">
          <span class="app-logo__brand">Interv</span><span class="app-logo__accent">IA</span>
        </span>
      }
    </div>
  `,
  styles: [`
    :host {
      display: inline-flex;
      align-items: center;
      line-height: 1;
    }

    .app-logo {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      user-select: none;
      text-decoration: none;

      &__img {
        display: block;
        flex-shrink: 0;
        object-fit: contain;
        border-radius: 6px;
        mix-blend-mode: multiply;
        transition: transform var(--transition-fast, 150ms ease);
      }

      &__text {
        font-family: var(--font-family, 'Inter', sans-serif);
        font-size: 1.25rem;
        font-weight: 700;
        letter-spacing: -0.02em;
        display: inline-flex;
        align-items: baseline;
      }

      &--theme-dark {
        .app-logo__brand {
          color: #1F2937;
        }
        .app-logo__accent {
          color: var(--color-primary, #6B2D3C);
        }
      }

      &--theme-light {
        .app-logo__brand {
          color: #FFFFFF;
        }
        .app-logo__accent {
          color: #FCE7F3;
        }
      }
    }
  `]
})
export class LogoComponent {
  @Input() variant: 'full' | 'symbol' = 'full';
  @Input() theme: 'light' | 'dark' = 'dark';
  @Input() size = 28;
}
