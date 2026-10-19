import { Component, inject, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { LogoComponent } from '../../shared/components/logo/logo.component';

@Component({
  selector: 'app-simulation-placeholder',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent, LogoComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="simu-page theme-livre" role="main">
      <div class="simu-container">
        <!-- Topbar minimaliste -->
        <header class="simu-header">
          <a routerLink="/" class="back-link" aria-label="Retour au prologue">
            <app-icon name="arrow_back" [size]="18" aria-hidden="true" />
            <span>Prologue</span>
          </a>
          <app-logo variant="full" [size]="24" />
        </header>

        <!-- Carte néo-brutaliste -->
        <div class="simu-card">
          <span class="simu-badge">ESPACE ENTRAÎNEMENT</span>

          <div class="simu-icon-hero">
            <span class="simu-emoji">{{ isPfe() ? '🎓' : '💼' }}</span>
          </div>

          <h1 class="simu-title">
            {{ isPfe() ? 'Entretien PFE / Stage' : 'Entretien Emploi' }}
          </h1>

          <p class="simu-subtitle">
            {{ isPfe()
              ? 'Prépare la soutenance et l’entretien pour décrocher ton stage de fin d’études.'
              : 'Prépare ton entretien d’embauche pour un poste en CDI ou CDD.' }}
          </p>

          <div class="simu-details">
            <div class="detail-item">
              <span class="detail-label">Type d’exercice</span>
              <strong class="detail-val">{{ isPfe() ? 'PFE / Stage de fin d’études' : 'Emploi / Poste qualifié' }}</strong>
            </div>
            <div class="detail-item">
              <span class="detail-label">Paramètre URL</span>
              <code class="detail-code">?type={{ simuType() }}</code>
            </div>
            <div class="detail-item">
              <span class="detail-label">Statut du module</span>
              <span class="detail-status">Prêt pour la simulation IA</span>
            </div>
          </div>

          <!-- Actions -->
          <div class="simu-actions">
            <a routerLink="/simulation-rh" class="livre-btn livre-btn--primary">
              <span>Lancer l’entraînement IA</span>
              <app-icon name="arrow_forward" [size]="18" aria-hidden="true" />
            </a>
            <a routerLink="/" class="livre-btn livre-btn--secondary">
              <span>Revenir au prologue</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  `,
  styles: [`
    .simu-page {
      min-height: 100dvh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      box-sizing: border-box;
      background: var(--livre-bg, #EFEBE4);
      color: var(--livre-ink, #121212);
    }

    .simu-container {
      width: 100%;
      max-width: 580px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .simu-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 4px;
    }

    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      color: var(--livre-ink);
      text-decoration: none;
      font-family: var(--font-cartouche, 'Archivo', sans-serif);
      font-weight: 700;
      font-size: 0.8125rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;

      &:hover {
        color: var(--livre-rose-text, #A63A60);
      }
    }

    .simu-card {
      background: var(--livre-cartouche-bg, #FAF8F4);
      border: 3px solid var(--livre-ink, #121212);
      box-shadow: 6px 6px 0 var(--livre-ink, #121212);
      border-radius: 6px;
      padding: 36px 28px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
    }

    .simu-badge {
      font-family: var(--font-cartouche, 'Archivo', sans-serif);
      font-weight: 800;
      font-size: 0.6875rem;
      letter-spacing: 0.12em;
      color: var(--livre-rose-text, #A63A60);
      border: 1px solid var(--livre-rose-text, #A63A60);
      padding: 3px 10px;
      border-radius: 2px;
    }

    .simu-icon-hero {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: #FFFFFF;
      border: 2px solid var(--livre-ink, #121212);
      box-shadow: 3px 3px 0 var(--livre-ink, #121212);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .simu-emoji {
      font-size: 1.8rem;
    }

    .simu-title {
      font-family: var(--font-title, 'Playfair Display', serif);
      font-size: clamp(1.75rem, 3.5vw, 2.25rem);
      margin: 0;
      line-height: 1.2;
    }

    .simu-subtitle {
      font-family: var(--font-body, 'Inter', sans-serif);
      font-size: 0.9375rem;
      color: var(--livre-ink-secondary, #3A3A3A);
      margin: 0;
      max-width: 440px;
    }

    .simu-details {
      width: 100%;
      background: #FFFFFF;
      border: 2px solid var(--livre-ink, #121212);
      box-shadow: 3px 3px 0 var(--livre-ink, #121212);
      padding: 16px;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      text-align: left;
      box-sizing: border-box;
    }

    .detail-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.8125rem;
      border-bottom: 1px dashed rgba(18, 18, 18, 0.15);
      padding-bottom: 6px;

      &:last-child {
        border-bottom: none;
        padding-bottom: 0;
      }
    }

    .detail-label {
      color: var(--livre-ink-secondary, #3A3A3A);
    }

    .detail-val {
      color: var(--livre-ink, #121212);
    }

    .detail-code {
      font-family: monospace;
      background: #EFEBE4;
      padding: 2px 6px;
      border-radius: 3px;
      border: 1px solid rgba(18, 18, 18, 0.2);
    }

    .detail-status {
      color: #1B5E20;
      font-weight: 700;
    }

    .simu-actions {
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 100%;
      margin-top: 8px;

      @media (min-width: 480px) {
        flex-direction: row;
        justify-content: center;
      }
    }

    .livre-btn {
      text-decoration: none;
      min-height: 44px;
      padding: 10px 20px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-family: var(--font-cartouche, 'Archivo', sans-serif);
      font-weight: 800;
      font-size: 0.8125rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border: 2px solid var(--livre-ink, #121212);
      border-radius: 4px;
      box-shadow: 4px 4px 0 var(--livre-ink, #121212);
      transition: transform 120ms ease, box-shadow 120ms ease;

      &:hover {
        transform: translate(2px, 2px);
        box-shadow: 2px 2px 0 var(--livre-ink, #121212);
      }

      &--primary {
        background: var(--livre-ink, #121212);
        color: #FAF8F4;
      }

      &--secondary {
        background: var(--livre-cartouche-bg, #FAF8F4);
        color: var(--livre-ink, #121212);
      }
    }
  `]
})
export class SimulationPlaceholderComponent {
  private readonly route = inject(ActivatedRoute);

  readonly simuType = computed(() => {
    return this.route.snapshot.queryParamMap.get('type') || 'emploi';
  });

  readonly isPfe = computed(() => this.simuType() === 'pfe');
}
