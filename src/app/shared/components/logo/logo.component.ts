import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <img
      [src]="imgSrc"
      alt="IntervIA"
      [width]="imgWidth"
      [height]="size"
      [style.width.px]="imgWidth"
      [style.height.px]="size"
      class="app-logo__img"
      [loading]="loading" />
  `,
  styles: [`
    :host {
      display: inline-flex;
      align-items: center;
      line-height: 1;
    }

    .app-logo__img {
      display: block;
      flex-shrink: 0;
      object-fit: contain;
      transition: transform var(--transition-fast, 150ms ease);
    }
  `]
})
export class LogoComponent {
  /** 'full' (symbole + texte intervIA) ou 'symbol' (cercle seul) */
  @Input() variant: 'full' | 'symbol' = 'full';
  /** Conservé pour compatibilité */
  @Input() theme: 'light' | 'dark' = 'dark';
  /** Hauteur en pixels (la largeur est calculée automatiquement selon le ratio) */
  @Input() size = 52;
  /** Priorité de chargement */
  @Input() loading: 'eager' | 'lazy' = 'lazy';

  get imgSrc(): string {
    return this.variant === 'symbol' ? 'assets/logo-symbol.png' : 'assets/logo.png';
  }

  get imgWidth(): number {
    if (this.variant === 'symbol') {
      return Math.round(this.size * 1.0);
    }
    // Ratio du logo complet recadré : 549 x 214 ≈ 2.565
    return Math.round(this.size * 2.565);
  }
}
