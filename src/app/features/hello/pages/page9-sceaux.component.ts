import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent, IconName } from '../../../shared/components/icon/icon.component';

export interface SceauItem {
  id: number;
  roman: string;
  theme: string;
  icon: IconName;
  secret: string;
  detail: string;
}

@Component({
  selector: 'app-page9-sceaux',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <article class="p9-container" aria-labelledby="p9-title">
      <header class="p9-header">
        <span class="manga-cartouche">CHAPITRE 3 · LE DOJO IA</span>
        <h2 id="p9-title" class="manga-title">Les six sceaux du recruteur</h2>
        <p class="p9-desc">
          L'entretien d'embauche n'est pas un interrogatoire : c'est un échange d'égal à égal. 
          Brisez chaque sceau pour révéler les 6 règles d'or qui désamorcent l'anxiété.
        </p>
      </header>

      <!-- Barre de progression des sceaux -->
      <div class="progress-banner" aria-live="polite">
        <div class="progress-left">
          <span class="count-badge">{{ brokenCount() }} sur 6 sceaux brisés</span>
          <span class="progress-status">
            @if (brokenCount() === 6) {
              ✦ Les six sagesses sont déverrouillées !
            } @else {
              Cliquez ou appuyez sur Entrée sur un sceau pour le briser.
            }
          </span>
        </div>
        <div class="progress-bar-track" aria-hidden="true">
          <div class="progress-fill" [style.width.%]="(brokenCount() / 6) * 100"></div>
        </div>
      </div>

      <!-- Grille des 6 cartes/sceaux -->
      <div class="sceaux-grid">
        @for (sceau of sceaux; track sceau.id) {
          <button
            type="button"
            class="sceau-card manga-case"
            [class.broken]="isBroken(sceau.id)"
            [attr.aria-pressed]="isBroken(sceau.id)"
            (click)="toggleSceau(sceau.id)">
            <!-- Face cachee : Sceau intact style cire / manga -->
            @if (!isBroken(sceau.id)) {
              <div class="seal-intact">
                <div class="seal-emblem">
                  <span class="seal-roman">{{ sceau.roman }}</span>
                  <div class="seal-icon">
                    <app-icon [name]="sceau.icon" [size]="22"></app-icon>
                  </div>
                </div>
                <div class="seal-meta">
                  <span class="seal-theme">{{ sceau.theme }}</span>
                  <span class="seal-action">Toucher pour briser</span>
                </div>
              </div>
            } @else {
              <!-- Face revelee : Conseil liberateur -->
              <div class="seal-revealed">
                <div class="revealed-header">
                  <span class="revealed-num">{{ sceau.roman }} · {{ sceau.theme }}</span>
                  <app-icon name="check" [size]="16"></app-icon>
                </div>
                <h3 class="revealed-secret">{{ sceau.secret }}</h3>
                <p class="revealed-detail">{{ sceau.detail }}</p>
              </div>
            }
          </button>
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

    .p9-container {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      max-width: 1060px;
      margin: 0 auto;
      padding: clamp(0.5rem, 2vh, 1.4rem) 1.25rem;
      box-sizing: border-box;
    }

    .p9-header {
      text-align: center;
      margin-bottom: clamp(0.5rem, 1.8vh, 1rem);

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

      .p9-desc {
        font-family: var(--font-body);
        font-size: clamp(0.82rem, 1.35vw, 0.92rem);
        color: var(--livre-secondaire);
        max-width: 660px;
        margin: 0 auto;
        line-height: 1.35;
      }
    }

    .progress-banner {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
      background: var(--livre-cartouche-bg);
      border: 2px solid var(--livre-encre);
      box-shadow: 2px 2px 0 var(--livre-encre);
      padding: clamp(0.4rem, 1vh, 0.6rem) 0.9rem;
      margin-bottom: clamp(0.6rem, 1.8vh, 1rem);

      .progress-left {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .count-badge {
          font-family: var(--font-display);
          font-size: 0.78rem;
          font-weight: 800;
          color: var(--livre-rose-texte);
        }

        .progress-status {
          font-family: var(--font-body);
          font-size: 0.74rem;
          color: var(--livre-secondaire);
        }
      }

      .progress-bar-track {
        width: 100%;
        height: 6px;
        background: #E4DCD3;
        border: 1px solid var(--livre-encre);
        border-radius: 3px;
        overflow: hidden;

        .progress-fill {
          height: 100%;
          background: var(--livre-rose-texte);
          transition: width 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
      }
    }

    .sceaux-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: clamp(0.55rem, 1.5vh, 0.9rem);

      @media (max-width: 820px) {
        grid-template-columns: repeat(2, 1fr);
      }

      @media (max-width: 520px) {
        grid-template-columns: 1fr;
      }
    }

    .sceau-card {
      min-height: clamp(100px, 15vh, 130px);
      background: var(--livre-cartouche-bg);
      border: 2px solid var(--livre-encre);
      box-shadow: 3px 3px 0 var(--livre-encre);
      padding: clamp(0.65rem, 1.4vh, 0.95rem);
      cursor: pointer;
      text-align: left;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      transition: transform 0.15s ease, box-shadow 0.15s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 4px 4px 0 var(--livre-encre);
      }

      &:focus-visible {
        outline: 3px solid var(--livre-rose-texte);
        outline-offset: 2px;
      }

      &.broken {
        background: #FFF;
        border-color: var(--livre-rose-texte);
        box-shadow: 3px 3px 0 var(--livre-rose-texte);
      }
    }

    .seal-intact {
      display: flex;
      align-items: center;
      gap: 0.75rem;

      .seal-emblem {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        border: 2px dashed var(--livre-encre);
        background: #FDF9F3;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;

        .seal-roman {
          font-family: var(--font-display);
          font-size: 0.65rem;
          font-weight: 900;
          line-height: 1;
        }

        .seal-icon {
          display: flex;
          color: var(--livre-encre);
        }
      }

      .seal-meta {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;

        .seal-theme {
          font-family: var(--font-display);
          font-size: 0.84rem;
          font-weight: 800;
          color: var(--livre-encre);
        }

        .seal-action {
          font-family: var(--font-body);
          font-size: 0.72rem;
          color: var(--livre-rose-texte);
          font-weight: 600;
        }
      }
    }

    .seal-revealed {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;

      .revealed-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: var(--livre-rose-texte);

        .revealed-num {
          font-family: var(--font-display);
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.06em;
        }
      }

      .revealed-secret {
        font-family: var(--font-display);
        font-size: clamp(0.85rem, 1.35vw, 0.95rem);
        font-weight: 800;
        color: var(--livre-encre);
        margin: 0;
        line-height: 1.25;
      }

      .revealed-detail {
        font-family: var(--font-body);
        font-size: clamp(0.72rem, 1.2vw, 0.78rem);
        line-height: 1.3;
        color: var(--livre-secondaire);
        margin: 0;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Page9SceauxComponent {
  readonly sceaux: SceauItem[] = [
    {
      id: 1,
      roman: 'I',
      theme: 'Le Silence',
      icon: 'self_improvement',
      secret: 'Le silence n\'est pas un vide',
      detail: 'Prendre 3 secondes pour réfléchir montre de la maturité et structure votre pensée.'
    },
    {
      id: 2,
      roman: 'II',
      theme: 'L\'Honnêteté',
      icon: 'lightbulb',
      secret: '« Je ne sais pas, mais… »',
      detail: 'Admettre une limite tout en expliquant comment vous chercheriez la réponse valorise votre curiosité.'
    },
    {
      id: 3,
      roman: 'III',
      theme: 'La Réciprocité',
      icon: 'handshake',
      secret: 'Vous recrutez aussi l\'entreprise',
      detail: 'Un entretien est une alliance mutuelle. Posez des questions sur l\'équipe et la culture.'
    },
    {
      id: 4,
      roman: 'IV',
      theme: 'Le Concret',
      icon: 'fact_check',
      secret: 'La méthode STAR apaise le mental',
      detail: 'Situation, Tâche, Action, Résultat : un canevas infaillible pour ne jamais perdre le fil.'
    },
    {
      id: 5,
      roman: 'V',
      theme: 'L\'Échec utile',
      icon: 'trending_up',
      secret: 'Parlez de vos erreurs avec fierté',
      detail: 'Un recruteur cherche un candidat capable d\'apprendre de ses bugs et de s\'adapter.'
    },
    {
      id: 6,
      roman: 'VI',
      theme: 'La Posture',
      icon: 'shield',
      secret: 'Le trac est une énergie motrice',
      detail: 'L\'adrénaline prouve que ce projet compte pour vous. Canalisez-la dans votre enthousiasme.'
    }
  ];

  readonly brokenIds = signal<Set<number>>(new Set([1, 2]));

  readonly brokenCount = computed(() => this.brokenIds().size);

  isBroken(id: number): boolean {
    return this.brokenIds().has(id);
  }

  toggleSceau(id: number): void {
    const current = new Set(this.brokenIds());
    if (current.has(id)) {
      current.delete(id);
    } else {
      current.add(id);
    }
    this.brokenIds.set(current);
  }
}
