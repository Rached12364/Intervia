import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../shared/components/icon/icon.component';

export interface CvPillar {
  name: string;
  before: number;
  after: number;
  unit: string;
  hint: string;
}

@Component({
  selector: 'app-page10-cv',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <article class="p10-container" aria-labelledby="p10-title">
      <header class="p10-header">
        <span class="manga-cartouche">CHAPITRE 4 · LA RESTITUTION</span>
        <h2 id="p10-title" class="manga-title">Diagnostic CV avant & après IA</h2>
        <p class="p10-desc">
          Comment Mohamed est passé d'un CV invisible aux yeux des recruteurs à un profil percutant 
          qui décroche 3 entretiens sur 4.
        </p>
      </header>

      <!-- Badge officiel de simulation -->
      <div class="simulation-tag-banner" aria-label="Étiquette de statut">
        <span class="tag-label">Exemple simulé : 42 → 88</span>
        <span class="tag-desc">Optimisation ATS & clarté humaine en 3 étapes clés</span>
      </div>

      <div class="p10-comparison manga-case">
        <!-- Colonne AVANT -->
        <div class="cv-column before-col">
          <div class="col-header">
            <span class="state-badge before-badge">AVANT L’ANALYSE</span>
            <div class="big-score score-red">
              <span class="score-val">42</span>
              <span class="score-total">/100</span>
            </div>
            <span class="score-sub">CV sous-estimé · Bloqué aux filtres</span>
          </div>

          <div class="flaws-list">
            <div class="flaw-item">
              <app-icon name="error_outline" [size]="14"></app-icon>
              <span>Aucun résultat chiffré sur les projets PFE</span>
            </div>
            <div class="flaw-item">
              <app-icon name="error_outline" [size]="14"></app-icon>
              <span>Mots-clés TypeScript & Angular manquants</span>
            </div>
            <div class="flaw-item">
              <app-icon name="error_outline" [size]="14"></app-icon>
              <span>Mise en page complexe rejetée par les ATS</span>
            </div>
          </div>
        </div>

        <!-- Flèche de transformation centrale -->
        <div class="transform-divider" aria-hidden="true">
          <div class="arrow-circle">
            <app-icon name="arrow_forward" [size]="20"></app-icon>
          </div>
          <span class="transform-label">OPTIMISATION IA</span>
        </div>

        <!-- Colonne APRÈS -->
        <div class="cv-column after-col">
          <div class="col-header">
            <span class="state-badge after-badge">APRÈS INTERVIA</span>
            <div class="big-score score-green">
              <span class="score-val">88</span>
              <span class="score-total">/100</span>
            </div>
            <span class="score-sub">Profil d'élite · 3 entretiens décrochés</span>
          </div>

          <div class="strengths-list">
            <div class="strength-item">
              <app-icon name="check_circle" [size]="14"></app-icon>
              <span>Structure claire en 5 piliers validés</span>
            </div>
            <div class="strength-item">
              <app-icon name="check_circle" [size]="14"></app-icon>
              <span>Impact chiffré : +40 % perf, 12 k requêtes/j</span>
            </div>
            <div class="strength-item">
              <app-icon name="check_circle" [size]="14"></app-icon>
              <span>Alignement parfait avec l'offre PFE ciblée</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Jauges des 5 Piliers d'évaluation -->
      <div class="pillars-section" aria-label="Évaluation des 5 piliers">
        <div class="pillars-grid">
          @for (pillar of pillars; track pillar.name) {
            <div class="pillar-card">
              <div class="pillar-header">
                <span class="pillar-name">{{ pillar.name }}</span>
                <span class="pillar-delta">{{ pillar.before }} → <strong>{{ pillar.after }}</strong></span>
              </div>
              <div class="gauge-track" aria-hidden="true">
                <div class="gauge-before" [style.width.%]="pillar.before"></div>
                <div class="gauge-after" [style.width.%]="pillar.after"></div>
              </div>
              <span class="pillar-hint">{{ pillar.hint }}</span>
            </div>
          }
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

    .p10-container {
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

    .p10-header {
      text-align: center;
      margin-bottom: clamp(0.4rem, 1.5vh, 0.8rem);

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

      .p10-desc {
        font-family: var(--font-body);
        font-size: clamp(0.82rem, 1.35vw, 0.92rem);
        color: var(--livre-secondaire);
        max-width: 660px;
        margin: 0 auto;
        line-height: 1.35;
      }
    }

    .simulation-tag-banner {
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.8rem;
      background: var(--livre-cartouche-bg);
      border: 2px solid var(--livre-encre);
      box-shadow: 2px 2px 0 var(--livre-encre);
      padding: 0.35rem 0.8rem;
      margin: 0 auto clamp(0.5rem, 1.5vh, 0.8rem);
      max-width: 580px;
      width: 100%;

      .tag-label {
        font-family: var(--font-display);
        font-size: 0.78rem;
        font-weight: 800;
        background: var(--livre-encre);
        color: var(--livre-papier);
        padding: 0.15rem 0.5rem;
        border-radius: 3px;
        letter-spacing: 0.05em;
      }

      .tag-desc {
        font-family: var(--font-body);
        font-size: 0.76rem;
        color: var(--livre-secondaire);
      }
    }

    .p10-comparison {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      gap: clamp(0.8rem, 2vw, 1.5rem);
      background: var(--livre-cartouche-bg);
      border: 3px double var(--livre-encre);
      box-shadow: 5px 5px 0 var(--livre-encre);
      padding: clamp(0.75rem, 1.8vh, 1.2rem);
      align-items: center;

      @media (max-width: 760px) {
        grid-template-columns: 1fr;
        gap: 0.8rem;
      }
    }

    .cv-column {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
      background: #FFF;
      border: 2px solid var(--livre-encre);
      padding: clamp(0.7rem, 1.6vh, 1rem);

      .col-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        border-bottom: 1.5px solid rgba(18, 18, 18, 0.15);
        padding-bottom: 0.5rem;

        .state-badge {
          font-family: var(--font-display);
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          padding: 0.15rem 0.5rem;
          border-radius: 999px;
          margin-bottom: 0.3rem;

          &.before-badge {
            background: #FEE2E2;
            color: #991B1B;
            border: 1px solid #991B1B;
          }

          &.after-badge {
            background: #DCFCE7;
            color: #166534;
            border: 1px solid #166534;
          }
        }

        .big-score {
          display: flex;
          align-items: baseline;
          line-height: 1;

          .score-val {
            font-family: var(--font-display);
            font-size: clamp(2rem, 4vw, 2.8rem);
            font-weight: 900;
          }

          .score-total {
            font-family: var(--font-body);
            font-size: 0.9rem;
            color: var(--livre-secondaire);
            margin-left: 0.15rem;
          }

          &.score-red .score-val {
            color: #B91C1C;
          }

          &.score-green .score-val {
            color: #15803D;
          }
        }

        .score-sub {
          font-family: var(--font-body);
          font-size: 0.72rem;
          color: var(--livre-secondaire);
          margin-top: 0.2rem;
        }
      }

      .flaws-list, .strengths-list {
        display: flex;
        flex-direction: column;
        gap: 0.35rem;

        .flaw-item, .strength-item {
          display: flex;
          align-items: flex-start;
          gap: 0.4rem;
          font-family: var(--font-body);
          font-size: 0.76rem;
          line-height: 1.3;
        }

        .flaw-item {
          color: #7F1D1D;
        }

        .strength-item {
          color: #14532D;
        }
      }
    }

    .transform-divider {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.3rem;

      @media (max-width: 760px) {
        flex-direction: row;
        justify-content: center;
      }

      .arrow-circle {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: var(--livre-encre);
        color: var(--livre-papier);
        border: 2px solid var(--livre-encre);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 2px 2px 0 var(--livre-rose-texte);
      }

      .transform-label {
        font-family: var(--font-display);
        font-size: 0.64rem;
        font-weight: 800;
        letter-spacing: 0.08em;
        color: var(--livre-rose-texte);
      }
    }

    .pillars-section {
      margin-top: clamp(0.5rem, 1.5vh, 0.8rem);

      .pillars-grid {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 0.5rem;

        @media (max-width: 820px) {
          grid-template-columns: repeat(3, 1fr);
        }

        @media (max-width: 520px) {
          grid-template-columns: 1fr;
        }
      }

      .pillar-card {
        background: var(--livre-papier);
        border: 1.5px solid var(--livre-encre);
        box-shadow: 2px 2px 0 var(--livre-encre);
        padding: 0.45rem 0.6rem;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;

        .pillar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .pillar-name {
            font-family: var(--font-display);
            font-size: 0.72rem;
            font-weight: 800;
            color: var(--livre-encre);
          }

          .pillar-delta {
            font-family: var(--font-body);
            font-size: 0.7rem;
            color: var(--livre-secondaire);

            strong {
              color: #15803D;
            }
          }
        }

        .gauge-track {
          width: 100%;
          height: 6px;
          background: #E5E0D8;
          border: 1px solid var(--livre-encre);
          border-radius: 3px;
          position: relative;
          overflow: hidden;

          .gauge-before {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            background: #EF4444;
            opacity: 0.4;
          }

          .gauge-after {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            background: #16A34A;
            transition: width 0.3s ease;
          }
        }

        .pillar-hint {
          font-family: var(--font-body);
          font-size: 0.64rem;
          color: var(--livre-secondaire);
        }
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Page10CvComponent {
  readonly pillars: CvPillar[] = [
    { name: 'Structure', before: 50, after: 92, unit: '%', hint: 'Lisibilité ATS validée' },
    { name: 'Contenu', before: 45, after: 88, unit: '%', hint: 'Vocabulaire ciblé' },
    { name: 'Chiffres', before: 20, after: 85, unit: '%', hint: 'Métriques d’impact' },
    { name: 'Mots-clés', before: 40, after: 90, unit: '%', hint: 'Angular & TS scorés' },
    { name: 'Impact RH', before: 55, after: 86, unit: '%', hint: 'Accroche claire' }
  ];
}
