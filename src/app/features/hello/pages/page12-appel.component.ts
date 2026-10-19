import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { IconComponent } from '../../../shared/components/icon/icon.component';

export type ProfilType = 'stage' | 'emploi';

@Component({
  selector: 'app-page12-appel',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  template: `
    <article class="p12-container" aria-labelledby="p12-title">
      <header class="p12-header">
        <span class="manga-cartouche">ÉPILOGUE · À VOUS DE JOUER</span>
        <h2 id="p12-title" class="manga-title">Votre tour est venu</h2>
        <p class="p12-desc">
          Rejoignez les étudiants et jeunes diplômés qui abordent leurs entretiens avec calme, structure et assurance.
        </p>
      </header>

      <div class="p12-card manga-case">
        <!-- Choix du profil stage vs emploi -->
        <div class="profil-section">
          <label class="section-label" id="profil-group-label">Quel est votre objectif prioritaire ?</label>
          <div class="profil-toggle" role="radiogroup" aria-labelledby="profil-group-label">
            <button
              type="button"
              class="profil-btn"
              role="radio"
              [attr.aria-checked]="selectedProfil() === 'stage'"
              [class.active]="selectedProfil() === 'stage'"
              (click)="selectProfil('stage')">
              <app-icon name="school" [size]="20"></app-icon>
              <div class="btn-text">
                <span class="btn-title">Stage PFE / Fin d'études</span>
                <span class="btn-sub">Entraînements ciblés PFE & premier emploi</span>
              </div>
              <span class="radio-indicator" aria-hidden="true">
                @if (selectedProfil() === 'stage') {
                  <span class="radio-dot"></span>
                }
              </span>
            </button>

            <button
              type="button"
              class="profil-btn"
              role="radio"
              [attr.aria-checked]="selectedProfil() === 'emploi'"
              [class.active]="selectedProfil() === 'emploi'"
              (click)="selectProfil('emploi')">
              <app-icon name="work" [size]="20"></app-icon>
              <div class="btn-text">
                <span class="btn-title">Premier Emploi / CDI</span>
                <span class="btn-sub">Simulations RH & techniques juniors confirmés</span>
              </div>
              <span class="radio-indicator" aria-hidden="true">
                @if (selectedProfil() === 'emploi') {
                  <span class="radio-dot"></span>
                }
              </span>
            </button>
          </div>
        </div>

        <!-- Appel à l'action principal -->
        <div class="cta-section">
          <button
            type="button"
            class="cta-main-btn"
            (click)="onCommencer()">
            <span>Commencer ma préparation</span>
            <app-icon name="arrow_forward" [size]="22"></app-icon>
          </button>
          <span class="cta-reassurance">
            <app-icon name="check_circle" [size]="14"></app-icon>
            Gratuit pour les étudiants · Sans carte bancaire · Confidentialité totale
          </span>
        </div>

        <!-- Déjà un compte -->
        <div class="login-footer">
          <span class="login-label">Vous possédez déjà un compte candidat ou recruteur ?</span>
          <a routerLink="/connexion" class="login-link">
            Se connecter directement
          </a>
        </div>
      </div>
    </article>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    .p12-container {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      max-width: 820px;
      margin: 0 auto;
      padding: clamp(0.5rem, 2vh, 1.4rem) 1.25rem;
      box-sizing: border-box;
    }

    .p12-header {
      text-align: center;
      margin-bottom: clamp(0.5rem, 1.8vh, 1.1rem);

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
        font-size: clamp(1.5rem, 3.5vw, 2.3rem);
        color: var(--livre-encre);
        margin: 0 0 0.35rem;
        letter-spacing: -0.02em;
        line-height: 1.15;
      }

      .p12-desc {
        font-family: var(--font-body);
        font-size: clamp(0.85rem, 1.4vw, 0.98rem);
        color: var(--livre-secondaire);
        max-width: 600px;
        margin: 0 auto;
        line-height: 1.35;
      }
    }

    .p12-card {
      background: var(--livre-cartouche-bg);
      border: 3px double var(--livre-encre);
      box-shadow: 6px 6px 0 var(--livre-encre);
      padding: clamp(1rem, 2.5vh, 1.8rem);
      display: flex;
      flex-direction: column;
      gap: 1.2rem;
    }

    .profil-section {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;

      .section-label {
        font-family: var(--font-display);
        font-size: 0.78rem;
        font-weight: 800;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--livre-encre);
      }

      .profil-toggle {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.8rem;

        @media (max-width: 620px) {
          grid-template-columns: 1fr;
        }
      }

      .profil-btn {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        background: var(--livre-papier);
        border: 2px solid var(--livre-encre);
        box-shadow: 2px 2px 0 var(--livre-encre);
        padding: clamp(0.65rem, 1.4vh, 0.9rem);
        cursor: pointer;
        text-align: left;
        transition: transform 0.15s ease, background 0.15s ease, box-shadow 0.15s ease;

        &:hover {
          transform: translateY(-2px);
          box-shadow: 4px 4px 0 var(--livre-encre);
          background: #FFF;
        }

        &:focus-visible {
          outline: 3px solid var(--livre-rose-texte);
          outline-offset: 2px;
        }

        &.active {
          border-color: var(--livre-encre);
          background: #FFF;
          box-shadow: 4px 4px 0 var(--livre-rose-texte);

          .radio-indicator {
            border-color: var(--livre-rose-texte);
          }

          .radio-dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: var(--livre-rose-texte);
          }
        }

        .btn-text {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.15rem;

          .btn-title {
            font-family: var(--font-display);
            font-size: 0.88rem;
            font-weight: 800;
            color: var(--livre-encre);
          }

          .btn-sub {
            font-family: var(--font-body);
            font-size: 0.72rem;
            color: var(--livre-secondaire);
          }
        }

        .radio-indicator {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid var(--livre-encre);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
      }
    }

    .cta-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.6rem;

      .cta-main-btn {
        width: 100%;
        max-width: 440px;
        height: 52px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        background: var(--livre-encre);
        color: var(--livre-papier);
        border: 2.5px solid var(--livre-encre);
        font-family: var(--font-display);
        font-size: clamp(0.95rem, 1.5vw, 1.08rem);
        font-weight: 800;
        cursor: pointer;
        box-shadow: 4px 4px 0 var(--livre-rose-texte);
        transition: transform 0.15s ease, box-shadow 0.15s ease;

        &:hover {
          transform: translate(-2px, -2px);
          box-shadow: 6px 6px 0 var(--livre-rose-texte);
        }

        &:focus-visible {
          outline: 3px solid var(--livre-rose-texte);
          outline-offset: 3px;
        }
      }

      .cta-reassurance {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        font-family: var(--font-body);
        font-size: 0.74rem;
        color: var(--livre-secondaire);
      }
    }

    .login-footer {
      border-top: 1.5px dashed rgba(18, 18, 18, 0.25);
      padding-top: 0.75rem;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      flex-wrap: wrap;

      .login-label {
        font-family: var(--font-body);
        font-size: 0.78rem;
        color: var(--livre-secondaire);
      }

      .login-link {
        font-family: var(--font-display);
        font-size: 0.78rem;
        font-weight: 800;
        color: var(--livre-rose-texte);
        text-decoration: underline;
        text-underline-offset: 3px;
        cursor: pointer;

        &:hover {
          color: var(--livre-encre);
        }

        &:focus-visible {
          outline: 3px solid var(--livre-rose-texte);
          outline-offset: 2px;
        }
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Page12AppelComponent {
  readonly selectedProfil = signal<ProfilType>('stage');

  constructor(private readonly router: Router) {}

  selectProfil(p: ProfilType): void {
    this.selectedProfil.set(p);
  }

  onCommencer(): void {
    this.router.navigate(['/inscription'], {
      queryParams: { profil: this.selectedProfil() }
    });
  }
}
