import { Component, EventEmitter, Input, Output, signal, OnDestroy, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-page3-regard',
  standalone: true,
  imports: [CommonModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page-polaroid-stage">
      <header class="polaroid-header">
        <span class="polaroid-chapter">CHAPITRE 1 · L'ORAGE MENTAL</span>
        <h2 class="polaroid-title" id="page-title" tabindex="-1">Le Piège de l'Anxiété</h2>
      </header>

      <div class="polaroid-main">
        <!-- Cadre Polaroïd incliné de 3° -->
        <div class="livre-polaroid polaroid-frame">
          <div class="polaroid-img-wrapper">
            <img
              src="assets/livre/case-4-visage.jpg"
              alt="Gros plan sur le visage anxieux de Mohamed en entretien."
              width="350"
              height="350"
              loading="lazy"
              (error)="imgError = true"
              class="polaroid-img" />

            @if (imgError) {
              <div class="livre-fallback-img">
                <app-icon name="error_outline" [size]="20" aria-hidden="true" />
                <span>[ Gros plan sur le visage anxieux de Mohamed ]</span>
              </div>
            }
          </div>
          <span class="polaroid-caption">Mohamed Ben Ali · Peur de la paralysie</span>
        </div>

        <!-- Zone d'action "Briser la paralysie" -->
        <div class="paralysie-box">
          <div class="livre-cartouche">
            <span>« NOUS AVONS RETENU UN AUTRE <span class="accent-rose">PROFIL</span>. »</span>
          </div>

          <p class="paralysie-desc">
            Le trac coupe le souffle. Pour avancer vers le calme, brisez la paralysie mentale.
          </p>

          @if (!broken()) {
            <div class="hold-action-area">
              <button
                type="button"
                class="livre-btn livre-btn--primary hold-btn"
                [class.hold-btn--active]="isHolding()"
                (mousedown)="startHolding()"
                (mouseup)="stopHolding()"
                (mouseleave)="stopHolding()"
                (touchstart)="startHolding()"
                (touchend)="stopHolding()"
                (click)="onSimpleClick()"
                aria-label="Maintenir ou cliquer pour briser la paralysie">
                <!-- Jauge de progression circulaire ou linéaire -->
                <span class="hold-progress" [style.width.%]="progress()"></span>
                <span class="hold-text">
                  <app-icon name="lock_open" [size]="18" aria-hidden="true" />
                  <span>{{ isHolding() || isAutoFilling ? 'Brise la paralysie... ' + progress() + '%' : 'Maintenir pour briser la paralysie' }}</span>
                </span>
              </button>

              <div class="hold-shortcuts">
                <span>Alternative : Maintien de la touche <strong>Espace</strong> ou un simple clic (remplissage 3s)</span>
              </div>
            </div>
          } @else {
            <div class="broken-success-badge animate-fade-in" role="status" aria-live="polite">
              <app-icon name="check_circle" [size]="24" aria-hidden="true" />
              <div class="success-text">
                <strong>Bien. On respire.</strong>
                <p>La barrière mentale s'efface. Vous pouvez passer à l'étape suivante.</p>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-polaroid-stage {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding: 12px 20px;
      box-sizing: border-box;
    }

    .polaroid-header {
      text-align: center;
    }

    .polaroid-chapter {
      font-family: var(--font-cartouche);
      font-weight: 800;
      font-size: 0.6875rem;
      letter-spacing: 0.1em;
      color: var(--livre-rose-text);
      display: block;
    }

    .polaroid-title {
      font-family: var(--font-title);
      font-size: clamp(1.125rem, 2.5vw, 1.5rem);
      margin: 2px 0 0 0;
      color: var(--livre-ink);
    }

    .polaroid-main {
      flex: 1;
      width: 100%;
      max-width: 820px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 32px;
      min-height: 0;

      @media (max-width: 768px) {
        flex-direction: column;
        gap: 16px;
      }
    }

    .polaroid-frame {
      max-width: 280px;
      width: 100%;
      flex-shrink: 0;
      animation: polaroidDrop 450ms cubic-bezier(0.16, 1, 0.3, 1) both;

      @media (max-width: 768px) {
        max-width: 180px;
      }
    }

    .polaroid-img-wrapper {
      width: 100%;
      aspect-ratio: 1 / 1;
      background: #121212;
      overflow: hidden;
      border: 1px solid #121212;
    }

    .polaroid-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      animation: imgMangaReveal 550ms cubic-bezier(0.16, 1, 0.3, 1) both;
    }

    .polaroid-caption {
      font-family: var(--font-cartouche);
      font-size: 0.6875rem;
      font-weight: 800;
      text-transform: uppercase;
      color: var(--livre-ink);
      display: block;
      margin-top: 8px;
      text-align: center;
    }

    .paralysie-box {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
      animation: paralysieSlideIn 450ms cubic-bezier(0.16, 1, 0.3, 1) 150ms both;
    }

    .paralysie-desc {
      font-size: 0.875rem;
      color: var(--livre-ink-secondary);
      line-height: 1.4;
      margin: 0;
    }

    .hold-action-area {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .hold-btn {
      position: relative;
      overflow: hidden;
      width: 100%;
      max-width: 380px;
      padding: 12px 20px;
      font-size: 0.8125rem;

      &--active {
        border-color: var(--livre-rose-text);
      }
    }

    .hold-progress {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      background: var(--livre-rose-text);
      opacity: 0.35;
      transition: width 30ms linear;
      pointer-events: none;
    }

    .hold-text {
      position: relative;
      z-index: 2;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .hold-shortcuts {
      font-size: 0.6875rem;
      color: var(--livre-ink-secondary);
      font-style: italic;
    }

    .broken-success-badge {
      background: #E8F5ED;
      border: 2px solid var(--livre-ink);
      box-shadow: 4px 4px 0 var(--livre-ink);
      padding: 14px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      gap: 12px;
      color: var(--livre-ink);
      width: 100%;
      max-width: 380px;

      strong {
        font-family: var(--font-title);
        font-size: 1.125rem;
        display: block;
        color: #1E7A4A;
      }

      p {
        margin: 2px 0 0 0;
        font-size: 0.75rem;
        color: #121212;
      }
    }

    @keyframes polaroidDrop {
      from {
        opacity: 0;
        transform: translateY(-12px) rotate(0deg);
      }
      to {
        opacity: 1;
        transform: translateY(0) rotate(-2.5deg);
      }
    }

    @keyframes imgMangaReveal {
      0% {
        opacity: 0;
        transform: scale(1.06);
        filter: contrast(1.2) brightness(0.96);
      }
      70% {
        opacity: 0.95;
        filter: contrast(1.05) brightness(1.01);
      }
      100% {
        opacity: 1;
        transform: scale(1);
        filter: contrast(1) brightness(1);
      }
    }

    @keyframes paralysieSlideIn {
      from {
        opacity: 0;
        transform: translateX(12px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      *, :host {
        animation: none !important;
        transition: none !important;
      }
    }
  `]
})
export class Page3RegardComponent implements OnDestroy {
  @Input() reducedMotion = false;
  @Output() advance = new EventEmitter<void>();

  imgError = false;
  broken = signal<boolean>(false);
  progress = signal<number>(0);
  isHolding = signal<boolean>(false);
  isAutoFilling = false;

  private holdInterval?: number;

  @HostListener('window:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (this.broken()) return;
    if (event.code === 'Space' && !this.isHolding()) {
      event.preventDefault();
      this.startHolding();
    }
  }

  @HostListener('window:keyup', ['$event'])
  onKeyup(event: KeyboardEvent): void {
    if (event.code === 'Space' && this.isHolding()) {
      event.preventDefault();
      this.stopHolding();
    }
  }

  startHolding(): void {
    if (this.broken()) return;
    this.isHolding.set(true);
    this.clearTimer();

    const duration = this.reducedMotion ? 500 : 2500;
    const intervalTime = 25;
    const step = (100 / (duration / intervalTime));

    this.holdInterval = window.setInterval(() => {
      this.progress.update(p => {
        const next = p + step;
        if (next >= 100) {
          this.triggerBreak();
          return 100;
        }
        return next;
      });
    }, intervalTime);
  }

  stopHolding(): void {
    if (this.broken() || this.isAutoFilling) return;
    this.isHolding.set(false);
    this.clearTimer();
    this.progress.set(0);
  }

  onSimpleClick(): void {
    if (this.broken()) return;
    // Alternative : clic simple remplit en 3s automatiquement
    this.isAutoFilling = true;
    this.clearTimer();

    const duration = 3000;
    const intervalTime = 30;
    const step = (100 / (duration / intervalTime));

    this.holdInterval = window.setInterval(() => {
      this.progress.update(p => {
        const next = p + step;
        if (next >= 100) {
          this.triggerBreak();
          return 100;
        }
        return next;
      });
    }, intervalTime);
  }

  private triggerBreak(): void {
    this.clearTimer();
    this.isHolding.set(false);
    this.isAutoFilling = false;
    this.broken.set(true);
  }

  private clearTimer(): void {
    if (this.holdInterval) {
      clearInterval(this.holdInterval);
      this.holdInterval = undefined;
    }
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }
}
