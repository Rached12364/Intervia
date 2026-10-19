import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../shared/components/icon/icon.component';

export interface QcmOption {
  id: string;
  label: string;
  isCorrect: boolean;
  explanation: string;
}

@Component({
  selector: 'app-page8-qcm',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <article class="p8-container" aria-labelledby="p8-title">
      <header class="p8-header">
        <span class="manga-cartouche">CHAPITRE 3 · LE DOJO IA</span>
        <h2 id="p8-title" class="manga-title">QCM Fondamentaux</h2>
        <p class="p8-desc">
          Testez vos réflexes en direct avec correction immédiate et explication pédagogique bienveillante.
        </p>
      </header>

      <div class="p8-card manga-case">
        <div class="qcm-header">
          <div class="qcm-tag">
            <app-icon name="quiz" [size]="16"></app-icon>
            <span>QUESTION TECHNIQUE · ANGULAR 17 & ARCHITECTURE</span>
          </div>
          <span class="difficulty-badge">Niveau Recommandé</span>
        </div>

        <div class="qcm-question">
          <p class="question-text">
            Quelle est la différence fondamentale entre les <code>Signals</code> et les <code>Observables RxJS</code> 
            dans une application Angular moderne ?
          </p>
        </div>

        <div class="qcm-options" role="radiogroup" aria-label="Options de réponse">
          @for (opt of options; track opt.id) {
            <button
              type="button"
              class="option-row"
              role="radio"
              [attr.aria-checked]="selectedOptionId() === opt.id"
              [class.selected]="selectedOptionId() === opt.id"
              [class.correct]="selectedOptionId() !== null && opt.isCorrect"
              [class.wrong]="selectedOptionId() === opt.id && !opt.isCorrect"
              (click)="selectOption(opt.id)">
              <span class="opt-key" aria-hidden="true">{{ opt.id }}</span>
              <span class="opt-label">{{ opt.label }}</span>
              <span class="opt-icon" aria-hidden="true">
                @if (selectedOptionId() !== null) {
                  @if (opt.isCorrect) {
                    <app-icon name="check_circle" [size]="18"></app-icon>
                  } @else if (selectedOptionId() === opt.id) {
                    <app-icon name="error_outline" [size]="18"></app-icon>
                  }
                }
              </span>
            </button>
          }
        </div>

        <!-- Explication pédagogique immédiate -->
        @if (selectedOption(); as sel) {
          <div
            class="qcm-feedback"
            [class.is-correct]="sel.isCorrect"
            [class.is-wrong]="!sel.isCorrect"
            aria-live="polite">
            <div class="feedback-title">
              @if (sel.isCorrect) {
                <app-icon name="check_circle" [size]="18"></app-icon>
                <span>Excellente réponse !</span>
              } @else {
                <app-icon name="lightbulb" [size]="18"></app-icon>
                <span>Point clé à retenir :</span>
              }
            </div>
            <p class="feedback-body">
              {{ sel.explanation }}
            </p>
          </div>
        }
      </div>
    </article>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    .p8-container {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      max-width: 900px;
      margin: 0 auto;
      padding: clamp(0.5rem, 2vh, 1.5rem) 1.25rem;
      box-sizing: border-box;
    }

    .p8-header {
      text-align: center;
      margin-bottom: clamp(0.6rem, 2vh, 1.2rem);

      .manga-cartouche {
        display: inline-block;
        font-family: var(--font-display);
        font-size: 0.72rem;
        font-weight: 800;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        background: var(--livre-cartouche-bg);
        border: 2px solid var(--livre-encre);
        color: var(--livre-encre);
        padding: 0.25rem 0.75rem;
        box-shadow: 2px 2px 0 var(--livre-encre);
        margin-bottom: 0.35rem;
      }

      .manga-title {
        font-family: var(--font-title);
        font-size: clamp(1.4rem, 3.2vw, 2.2rem);
        color: var(--livre-encre);
        margin: 0 0 0.35rem;
        letter-spacing: -0.02em;
        line-height: 1.15;
      }

      .p8-desc {
        font-family: var(--font-body);
        font-size: clamp(0.85rem, 1.4vw, 0.95rem);
        color: var(--livre-secondaire);
        max-width: 620px;
        margin: 0 auto;
        line-height: 1.35;
      }
    }

    .p8-card {
      background: var(--livre-cartouche-bg);
      border: 3px double var(--livre-encre);
      box-shadow: 5px 5px 0 var(--livre-encre);
      padding: clamp(1rem, 2.5vh, 1.7rem);
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .qcm-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid var(--livre-encre);
      padding-bottom: 0.5rem;

      .qcm-tag {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        font-family: var(--font-display);
        font-size: 0.72rem;
        font-weight: 800;
        letter-spacing: 0.08em;
        color: var(--livre-encre);
      }

      .difficulty-badge {
        font-family: var(--font-body);
        font-size: 0.74rem;
        font-weight: 700;
        background: var(--livre-encre);
        color: var(--livre-papier);
        padding: 0.2rem 0.6rem;
        border-radius: 999px;
      }
    }

    .qcm-question {
      .question-text {
        font-family: var(--font-body);
        font-size: clamp(0.95rem, 1.6vw, 1.12rem);
        font-weight: 600;
        line-height: 1.45;
        color: var(--livre-encre);
        margin: 0;

        code {
          font-family: monospace;
          background: #E8E2D8;
          border: 1px solid var(--livre-encre);
          padding: 0.1rem 0.35rem;
          font-size: 0.9em;
        }
      }
    }

    .qcm-options {
      display: flex;
      flex-direction: column;
      gap: 0.55rem;
    }

    .option-row {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      background: var(--livre-papier);
      border: 2px solid var(--livre-encre);
      box-shadow: 2px 2px 0 var(--livre-encre);
      padding: clamp(0.55rem, 1.2vh, 0.75rem) 0.9rem;
      text-align: left;
      cursor: pointer;
      font-family: var(--font-body);
      font-size: clamp(0.85rem, 1.35vw, 0.95rem);
      color: var(--livre-encre);
      transition: transform 0.15s ease, background 0.15s ease;

      &:hover {
        transform: translateY(-1px);
        background: #FFF;
      }

      &:focus-visible {
        outline: 3px solid var(--livre-rose-texte);
        outline-offset: 2px;
      }

      .opt-key {
        font-family: var(--font-display);
        font-weight: 800;
        font-size: 0.85rem;
        width: 24px;
        height: 24px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 1.5px solid var(--livre-encre);
        background: #FFF;
      }

      .opt-label {
        flex: 1;
        line-height: 1.35;
      }

      .opt-icon {
        width: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      &.correct {
        background: #DCFCE7;
        border-color: #15803D;
        color: #14532D;

        .opt-key {
          background: #15803D;
          color: #FFF;
          border-color: #15803D;
        }
      }

      &.wrong {
        background: #FEE2E2;
        border-color: #B91C1C;
        color: #7F1D1D;

        .opt-key {
          background: #B91C1C;
          color: #FFF;
          border-color: #B91C1C;
        }
      }
    }

    .qcm-feedback {
      border: 2px solid var(--livre-encre);
      padding: clamp(0.65rem, 1.4vh, 0.95rem);
      margin-top: 0.2rem;

      .feedback-title {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        font-family: var(--font-display);
        font-size: 0.82rem;
        font-weight: 800;
        letter-spacing: 0.05em;
        margin-bottom: 0.3rem;
      }

      .feedback-body {
        font-family: var(--font-body);
        font-size: clamp(0.82rem, 1.3vw, 0.88rem);
        line-height: 1.4;
        margin: 0;
      }

      &.is-correct {
        background: #F0FDF4;
        border-color: #166534;
        color: #14532D;
      }

      &.is-wrong {
        background: #FFFBEB;
        border-color: #B45309;
        color: #78350F;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Page8QcmComponent {
  readonly options: QcmOption[] = [
    {
      id: 'A',
      label: 'Les Signals sont synchrones et gèrent un état avec valeur courante garantie, tandis que RxJS modélise des flux d’événements asynchrones dans le temps.',
      isCorrect: true,
      explanation: 'Exactement. Un Signal garantit toujours une valeur synchrone et notifie le graphe de dépendance sans subscription manuelle. RxJS reste idéal pour les websockets, requêtes HTTP annulables et flux temporels.'
    },
    {
      id: 'B',
      label: 'Les Signals remplacent totalement RxJS dans Angular 17 et suppriment le besoin de programmation réactive.',
      isCorrect: false,
      explanation: 'Nuance essentielle : Signals et RxJS sont complémentaires. Angular fournit d\'ailleurs toSignal() et toObservable() pour faire le pont entre les deux mondes en toute harmonie.'
    },
    {
      id: 'C',
      label: 'Les Signals nécessitent une souscription explicite avec .subscribe() et une désinscription manuelle dans ngOnDestroy.',
      isCorrect: false,
      explanation: 'C’est l’inverse : les Signals se passent totalement de souscription manuelle. Ils s\'exécutent de façon synchrone et sont automatiquement nettoyés sans risque de fuite mémoire.'
    }
  ];

  readonly selectedOptionId = signal<string | null>(null);

  selectedOption(): QcmOption | null {
    const id = this.selectedOptionId();
    if (!id) return null;
    return this.options.find(o => o.id === id) || null;
  }

  selectOption(id: string): void {
    this.selectedOptionId.set(id);
  }
}
