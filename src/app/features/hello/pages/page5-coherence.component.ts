import { Component, EventEmitter, Input, Output, signal, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-page5-coherence',
  standalone: true,
  imports: [CommonModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page-coherence">
      <header class="coherence-header">
        <span class="coherence-chapter">CHAPITRE 2 · DU STRESS AU CALME</span>
        <h2 class="coherence-title" id="page-title" tabindex="-1">Régulation Physiologique</h2>
      </header>

      <div class="coherence-content">
        <!-- Volet 1 : Curseur Mon stress avant un entretien (10 à 0) -->
        <div class="stress-panel">
          <div class="livre-cartouche">
            <span>NIVEAU DE <span class="accent">TENSION</span></span>
          </div>

          <p class="panel-desc">
            Ajustez votre niveau de stress ressenti pour calibrer le ton de l'entretien.
          </p>

          <div class="slider-box" role="group" aria-labelledby="slider-desc">
            <span id="slider-desc" class="sr-only">Mon stress avant un entretien de 10 à 0</span>
            <div class="slider-meta">
              <span class="slider-status">{{ getStressLabel() }}</span>
              <span class="slider-value font-mono">{{ stressLevel() }}/10</span>
            </div>

            <div 
              class="slider-track"
              role="slider"
              tabindex="0"
              aria-label="Mon stress avant un entretien"
              aria-valuemin="0"
              aria-valuemax="10"
              [attr.aria-valuenow]="stressLevel()"
              (keydown)="onSliderKeydown($event)">
              <div 
                class="slider-fill" 
                [style.width.%]="stressLevel() * 10"
                [class.slider-fill--calm]="stressLevel() <= 3"
                [class.slider-fill--med]="stressLevel() > 3 && stressLevel() <= 7"
                [class.slider-fill--high]="stressLevel() > 7">
              </div>
              <div 
                class="slider-thumb" 
                [style.left.%]="stressLevel() * 10">
              </div>
            </div>

            <div class="slider-ticks">
              <span>0 (Sérénité)</span>
              <span>5 (Doutes)</span>
              <span>10 (Panique)</span>
            </div>

            <!-- Contrôles boutons +/- pour accessibilité tactile -->
            <div class="slider-quick-btns">
              <button 
                type="button" 
                class="quick-btn" 
                (click)="adjustStress(-1)" 
                [disabled]="stressLevel() <= 0"
                aria-label="Diminuer le stress">
                - Diminuer (-1)
              </button>
              <button 
                type="button" 
                class="quick-btn" 
                (click)="adjustStress(1)" 
                [disabled]="stressLevel() >= 10"
                aria-label="Augmenter le stress">
                + Augmenter (+1)
              </button>
            </div>
          </div>
        </div>

        <!-- Volet 2 : Cercle de cohérence cardiaque 10s -->
        <div class="breathing-panel">
          <div class="livre-cartouche">
            <span>SOUFFLE <span class="accent">GUIDÉ</span></span>
          </div>

          <p class="panel-desc">
            10 secondes de cohérence cardiaque : 4s inspiration, 2s blocage, 4s expiration.
          </p>

          <div class="breathing-circle-stage">
            <div 
              class="breathing-circle"
              [class.breathing-circle--inspire]="breathPhase() === 'inspire'"
              [class.breathing-circle--hold]="breathPhase() === 'hold'"
              [class.breathing-circle--expire]="breathPhase() === 'expire'"
              [class.breathing-circle--done]="breathPhase() === 'done'">
              
              <div class="breathing-inner">
                @if (breathPhase() === 'idle') {
                  <span class="breathing-prompt">Prêt ?</span>
                } @else if (breathPhase() === 'inspire') {
                  <span class="breathing-prompt breathing-prompt--active">Inspirez</span>
                  <span class="breathing-sec">{{ breathTime() }}s</span>
                } @else if (breathPhase() === 'hold') {
                  <span class="breathing-prompt breathing-prompt--active">Bloquez</span>
                  <span class="breathing-sec">{{ breathTime() }}s</span>
                } @else if (breathPhase() === 'expire') {
                  <span class="breathing-prompt breathing-prompt--active">Soufflez</span>
                  <span class="breathing-sec">{{ breathTime() }}s</span>
                } @else {
                  <app-icon name="check" [size]="24" aria-hidden="true" />
                  <span class="breathing-prompt">Apaisé</span>
                }
              </div>
            </div>
          </div>

          <div class="breathing-actions">
            @if (breathPhase() === 'idle' || breathPhase() === 'done') {
              <button 
                type="button" 
                class="livre-btn livre-btn--primary"
                (click)="startBreathing()">
                <span>{{ breathPhase() === 'done' ? 'Refaire la respiration' : 'Respirer 10 secondes' }}</span>
              </button>
            } @else {
              <button 
                type="button" 
                class="livre-btn"
                (click)="stopBreathing()">
                <span>Arrêter l'exercice</span>
              </button>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-coherence {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding: 12px 20px;
      box-sizing: border-box;
    }

    .coherence-header {
      text-align: center;
    }

    .coherence-chapter {
      font-family: var(--font-cartouche);
      font-weight: 800;
      font-size: 0.6875rem;
      letter-spacing: 0.1em;
      color: var(--livre-rose-text);
      display: block;
    }

    .coherence-title {
      font-family: var(--font-title);
      font-size: clamp(1.125rem, 2.5vw, 1.5rem);
      margin: 2px 0 0 0;
      color: var(--livre-ink);
    }

    .coherence-content {
      flex: 1;
      width: 100%;
      max-width: 860px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      align-items: center;
      min-height: 0;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 16px;
        overflow-y: auto;
      }
    }

    .stress-panel, .breathing-panel {
      background: #FAF8F4;
      border: 2px solid var(--livre-ink);
      box-shadow: 4px 4px 0 var(--livre-ink);
      padding: 16px;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      height: 100%;
      box-sizing: border-box;
      justify-content: space-between;
    }

    .panel-desc {
      font-size: 0.8125rem;
      color: var(--livre-ink-secondary);
      margin: 0;
      line-height: 1.35;
    }

    .slider-box {
      background: var(--livre-bg);
      border: 2px solid var(--livre-ink);
      padding: 12px;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .slider-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .slider-status {
      font-family: var(--font-cartouche);
      font-size: 0.75rem;
      font-weight: 800;
      color: var(--livre-rose-text);
      text-transform: uppercase;
    }

    .slider-value {
      font-size: 0.875rem;
      font-weight: 800;
      color: var(--livre-ink);
    }

    .slider-track {
      height: 12px;
      background: #FFFFFF;
      border: 2px solid var(--livre-ink);
      position: relative;
      cursor: pointer;
      border-radius: 2px;
    }

    .slider-fill {
      height: 100%;
      background: var(--livre-ink);
      transition: width 100ms ease;

      &--calm {
        background: #10b981;
      }
      &--med {
        background: #f59e0b;
      }
      &--high {
        background: #A63A60;
      }
    }

    .slider-thumb {
      width: 18px;
      height: 22px;
      background: var(--livre-bg);
      border: 2px solid var(--livre-ink);
      box-shadow: 2px 2px 0 var(--livre-ink);
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
    }

    .slider-ticks {
      display: flex;
      justify-content: space-between;
      font-size: 0.625rem;
      color: var(--livre-ink-secondary);
      font-family: monospace;
    }

    .slider-quick-btns {
      display: flex;
      gap: 8px;
      justify-content: space-between;
      margin-top: 4px;
    }

    .quick-btn {
      flex: 1;
      background: #FFFFFF;
      border: 1px solid var(--livre-ink);
      font-family: var(--font-cartouche);
      font-weight: 700;
      font-size: 0.6875rem;
      padding: 4px 6px;
      cursor: pointer;

      &:hover:not(:disabled) {
        background: var(--livre-ink);
        color: #FFFFFF;
      }
      &:disabled {
        opacity: 0.4;
      }
    }

    // Cercle respiratoire
    .breathing-circle-stage {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px 0;
    }

    .breathing-circle {
      width: 130px;
      height: 130px;
      border-radius: 50%;
      border: 3px solid var(--livre-ink);
      background: var(--livre-bg);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 1s ease-in-out, border-color 1s ease-in-out, background 1s ease-in-out;
      box-shadow: 4px 4px 0 var(--livre-ink);

      &--inspire {
        transform: scale(1.15);
        border-color: var(--livre-rose-text);
        background: rgba(166, 58, 96, 0.1);
      }

      &--hold {
        transform: scale(1.15);
        border-color: #3b82f6;
      }

      &--expire {
        transform: scale(0.88);
        border-color: var(--livre-ink);
      }

      &--done {
        transform: scale(1);
        border-color: #10b981;
        background: rgba(16, 185, 129, 0.1);
      }
    }

    .breathing-inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    .breathing-prompt {
      font-family: var(--font-cartouche);
      font-weight: 800;
      font-size: 0.8125rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;

      &--active {
        color: var(--livre-rose-text);
      }
    }

    .breathing-sec {
      font-family: monospace;
      font-size: 1.25rem;
      font-weight: 800;
      color: var(--livre-ink);
    }

    .breathing-actions {
      display: flex;
      justify-content: center;
    }
  `]
})
export class Page5CoherenceComponent implements OnDestroy {
  @Input() reducedMotion = false;
  @Output() advance = new EventEmitter<void>();

  stressLevel = signal<number>(8);
  breathPhase = signal<'idle' | 'inspire' | 'hold' | 'expire' | 'done'>('idle');
  breathTime = signal<number>(10);

  private breathTimer?: number;

  adjustStress(delta: number): void {
    this.stressLevel.update(s => Math.min(10, Math.max(0, s + delta)));
  }

  onSliderKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      event.preventDefault();
      this.adjustStress(1);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      event.preventDefault();
      this.adjustStress(-1);
    }
  }

  getStressLabel(): string {
    const s = this.stressLevel();
    if (s <= 3) return 'Calme & Maîtrise';
    if (s <= 7) return 'Tension Modérée';
    return 'Pic d\'Anxiété';
  }

  startBreathing(): void {
    this.stopBreathing();
    this.breathTime.set(10);
    this.breathPhase.set('inspire');

    this.breathTimer = window.setInterval(() => {
      this.breathTime.update(t => {
        const next = t - 1;
        if (next > 6) {
          this.breathPhase.set('inspire');
        } else if (next > 4) {
          this.breathPhase.set('hold');
        } else if (next > 0) {
          this.breathPhase.set('expire');
        } else {
          this.breathPhase.set('done');
          this.clearBreathTimer();
          // Abaisse automatiquement le niveau de stress
          this.stressLevel.set(2);
          return 0;
        }
        return next;
      });
    }, 1000);
  }

  stopBreathing(): void {
    this.clearBreathTimer();
    this.breathPhase.set('idle');
    this.breathTime.set(10);
  }

  private clearBreathTimer(): void {
    if (this.breathTimer) {
      clearInterval(this.breathTimer);
      this.breathTimer = undefined;
    }
  }

  ngOnDestroy(): void {
    this.clearBreathTimer();
  }
}
