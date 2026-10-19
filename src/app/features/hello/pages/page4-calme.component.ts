import { Component, EventEmitter, Input, Output, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../shared/components/icon/icon.component';

export interface MangaCalmeStep {
  stepNum: number;
  image: string;
  alt: string;
  cartoucheHtml: string;
  bulle: string;
}

@Component({
  selector: 'app-page4-calme',
  standalone: true,
  imports: [CommonModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page-manga-plate" (click)="handleStepClick()">
      <header class="plate-header">
        <span class="plate-chapter">CHAPITRE 2 · DU STRESS AU CALME</span>
        <h2 class="plate-title" id="page-title" tabindex="-1">La Clarté du Matin</h2>
      </header>

      <div class="plate-stage">
        <div class="plate-frame livre-case" [class.step-fade-zoom]="!reducedMotion">
          <img
            [src]="currentStepItem().image"
            [alt]="currentStepItem().alt"
            width="382"
            height="218"
            loading="lazy"
            (error)="imgError = true"
            class="plate-img" />

          @if (imgError) {
            <div class="livre-fallback-img">
              <app-icon name="error_outline" [size]="24" aria-hidden="true" />
              <span>[ {{ currentStepItem().alt }} ]</span>
            </div>
          }

          <!-- Cartouche d'encre narratif (Étape active) -->
          <div 
            class="plate-cartouche livre-cartouche"
            [class.step-fade-zoom]="!reducedMotion"
            [innerHTML]="currentStepItem().cartoucheHtml">
          </div>

          <!-- Bulle de dialogue apaisée -->
          @if (currentStepItem().bulle) {
            <div 
              class="plate-speech livre-speech"
              [class.step-fade-zoom]="!reducedMotion">
              <p>{{ currentStepItem().bulle }}</p>
            </div>
          }
        </div>
      </div>

      <!-- Indicateur d'étape séquentielle dans la page -->
      <div class="plate-stepper" aria-label="Progression de la séquence">
        @for (item of sequence; track item.stepNum) {
          <span
            class="step-dot"
            [class.active]="step() === item.stepNum"
            [class.passed]="step() > item.stepNum">
          </span>
        }
      </div>

      <div class="plate-hint">
        <span>Cliquez sur l'image ({{ step() }}/3) ou utilisez Suivant pour continuer</span>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: flex;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
    }

    .page-manga-plate {
      width: 100%;
      max-width: 900px;
      height: 100%;
      max-height: 100dvh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: clamp(0.5rem, 2vh, 1.25rem) clamp(1rem, 2vw, 2rem);
      box-sizing: border-box;
      user-select: none;
      cursor: pointer;
    }

    .plate-header {
      text-align: center;
      margin-bottom: clamp(0.4rem, 1.2vh, 0.8rem);
    }

    .plate-chapter {
      display: inline-block;
      font-family: var(--font-display, 'Archivo', sans-serif);
      font-weight: 800;
      font-size: 0.6875rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--livre-rose-text, #A63A60);
      margin-bottom: 0.25rem;
    }

    .plate-title {
      font-family: var(--font-title, 'Playfair Display', serif);
      font-size: clamp(1.25rem, 2.8vw, 1.9rem);
      font-weight: 700;
      margin: 0;
      color: var(--livre-ink, #121212);
      outline: none;
      line-height: 1.15;
    }

    .plate-stage {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
      min-height: 0;
      margin-bottom: clamp(0.35rem, 1vh, 0.65rem);
    }

    .plate-frame {
      position: relative;
      width: 100%;
      max-width: 760px;
      max-height: clamp(240px, 48vh, 420px);
      aspect-ratio: 16 / 9;
      background: var(--livre-cartouche-bg, #FAF8F4);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      border: 3px double var(--livre-encre, #121212);
      box-shadow: 6px 6px 0 var(--livre-encre, #121212);
    }

    .plate-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      background: #EFEBE4;
      display: block;
    }

    .plate-cartouche {
      position: absolute;
      top: 14px;
      left: 14px;
      max-width: 85%;
      z-index: 2;
      background: var(--livre-cartouche-bg, #FAF8F4);
      border: 2px solid var(--livre-encre, #121212);
      box-shadow: 2px 2px 0 var(--livre-encre, #121212);
      padding: 0.35rem 0.75rem;
      font-family: var(--font-display, 'Archivo', sans-serif);
      font-weight: 800;
      font-size: clamp(0.72rem, 1.2vw, 0.85rem);
      text-transform: uppercase;
      letter-spacing: 0.05em;

      ::ng-deep .accent-rose {
        color: #A63A60 !important;
      }
    }

    .plate-speech {
      position: absolute;
      bottom: 14px;
      right: 14px;
      max-width: 75%;
      z-index: 2;
      background: #FFF;
      border: 2px solid var(--livre-encre, #121212);
      border-radius: 12px;
      box-shadow: 3px 3px 0 var(--livre-encre, #121212);
      padding: 0.4rem 0.85rem;

      p {
        margin: 0;
        font-family: var(--font-body, 'Inter', sans-serif);
        font-size: clamp(0.8rem, 1.25vw, 0.92rem);
        font-style: italic;
        color: var(--livre-encre, #121212);
        line-height: 1.35;
      }
    }

    .plate-stepper {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
      margin-bottom: 0.3rem;

      .step-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        border: 1.5px solid var(--livre-encre, #121212);
        background: transparent;
        transition: transform 0.15s ease, background 0.15s ease;

        &.passed {
          background: var(--livre-secondaire, #3A3A3A);
        }

        &.active {
          transform: scale(1.3);
          background: #A63A60;
          border-color: #A63A60;
        }
      }
    }

    .plate-hint {
      text-align: center;
      font-family: var(--font-body, 'Inter', sans-serif);
      font-size: 0.6875rem;
      color: var(--livre-ink-secondary, #737373);
    }

    .step-fade-zoom {
      animation: mangaReveal 220ms ease-out forwards;
    }

    @keyframes mangaReveal {
      from {
        opacity: 0;
        transform: scale(0.96);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
  `]
})
export class Page4CalmeComponent {
  @Input() reducedMotion = false;
  @Output() stepComplete = new EventEmitter<void>();

  imgError = false;
  readonly step = signal<number>(1);

  // Mapping:
  // Step 1: Case 6 (L'affiche bleue/violette "ET SI ON S'ENTRAÎNAIT AVANT ?")
  // Step 2: Case 7 (Le dojo IA / Mohamed devant son écran "UNE QUESTION À LA FOIS.")
  // Step 3: Case 8 (Mohamed face aux recruteurs avec le sourire "CETTE FOIS, LES MOTS SONT LÀ.")
  readonly sequence: MangaCalmeStep[] = [
    {
      stepNum: 1,
      image: 'assets/livre/case-6.jpg',
      alt: 'Mohamed s’arrêtant avec curiosité devant une affiche au dégradé violet profond.',
      cartoucheHtml: 'ET SI ON S\'<span class="accent-rose">ENTRAÎNAIT</span> AVANT ?',
      bulle: '« Une méthode guidée sans jugement pour reprendre confiance. »'
    },
    {
      stepNum: 2,
      image: 'assets/livre/case-7.jpg',
      alt: 'Mohamed apaisé devant l’avatar IA souriant dans la douce lumière du matin.',
      cartoucheHtml: 'UNE <span class="accent-rose">QUESTION</span> À LA FOIS.',
      bulle: '« Le trac se dissout dès que la structure prend le relais. »'
    },
    {
      stepNum: 3,
      image: 'assets/livre/case-8.jpg',
      alt: 'Mohamed détendu face aux mêmes recruteurs attentifs et souriants.',
      cartoucheHtml: 'CETTE FOIS, LES MOTS SONT <span class="accent-rose">LÀ</span>.',
      bulle: '« Je réponds avec fluidité, posément, sans aucune précipitation. »'
    }
  ];

  currentStepItem(): MangaCalmeStep {
    const s = this.step();
    return this.sequence.find(i => i.stepNum === s) || this.sequence[0];
  }

  handleStepClick(): void {
    if (this.step() < this.sequence.length) {
      this.imgError = false;
      this.step.update(v => v + 1);
    } else {
      this.stepComplete.emit();
    }
  }
}
