import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../shared/components/icon/icon.component';

export interface SkillItem {
  id: string;
  name: string;
  category: 'tech' | 'methodo' | 'humain';
  questionsCount: number;
  durationMinutes: number;
}

@Component({
  selector: 'app-page6-competences',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <article class="p6-container" aria-labelledby="p6-title">
      <header class="p6-header">
        <span class="manga-cartouche">CHAPITRE 2 · DU STRESS AU CALME</span>
        <h2 id="p6-title" class="manga-title">Votre parcours en un clic</h2>
        <p class="p6-desc">
          Composez votre profil cible. Chaque compétence affine en temps réel les questions de simulation 
          et le temps estimé de votre préparation.
        </p>
      </header>

      <div class="p6-content">
        <!-- Nuage des 12 compétences -->
        <fieldset class="p6-cloud" aria-label="Sélection des 12 compétences cibles">
          <legend class="sr-only">Sélectionnez les compétences à inclure dans votre préparation</legend>
          <div class="skills-grid">
            @for (skill of skills; track skill.id) {
              <button
                type="button"
                class="skill-pill"
                [class.selected]="isSelected(skill.id)"
                [attr.aria-pressed]="isSelected(skill.id)"
                (click)="toggleSkill(skill.id)">
                <span class="skill-indicator" aria-hidden="true">
                  @if (isSelected(skill.id)) {
                    <app-icon name="check" [size]="14"></app-icon>
                  } @else {
                    <span class="dot"></span>
                  }
                </span>
                <span class="skill-name">{{ skill.name }}</span>
                <span class="skill-meta">+{{ skill.questionsCount }}q</span>
              </button>
            }
          </div>
        </fieldset>

        <!-- Bilan en direct & dynamique -->
        <aside class="p6-summary" aria-live="polite">
          <div class="summary-card manga-case">
            <div class="summary-top">
              <span class="summary-tag">ESTIMATION SUR MESURE</span>
              <span class="summary-count">{{ selectedIds().size }} / 12 sélectionnées</span>
            </div>

            <div class="stats-row">
              <div class="stat-box">
                <span class="stat-number">{{ totalQuestions() }}</span>
                <span class="stat-label">Questions adaptées</span>
              </div>
              <div class="stat-sep" aria-hidden="true"></div>
              <div class="stat-box">
                <span class="stat-number">{{ totalDuration() }} min</span>
                <span class="stat-label">Durée recommandée</span>
              </div>
            </div>

            <!-- Jauge d'équilibre -->
            <div class="balance-bar" aria-hidden="true">
              <div class="bar-fill" [style.width.%]="(selectedIds().size / 12) * 100"></div>
            </div>

            <div class="summary-feedback">
              @if (selectedIds().size === 0) {
                <p class="feedback-text neutral">
                  Cliquez sur vos compétences clés pour calibrer la simulation selon votre profil.
                </p>
              } @else if (selectedIds().size < 4) {
                <p class="feedback-text">
                  <strong>Bon début :</strong> Un socle initial ciblé pour un premier entraînement sans pression.
                </p>
              } @else if (selectedIds().size < 8) {
                <p class="feedback-text highlight">
                  <strong>Profil équilibré :</strong> Couverture idéale pour un entretien technique et comportemental.
                </p>
              } @else {
                <p class="feedback-text complete">
                  <strong>Entraînement complet :</strong> Préparation approfondie digne d'un profil junior à confirmé.
                </p>
              }
            </div>

            <div class="summary-hint">
              <app-icon name="lightbulb" [size]="14"></app-icon>
              <span>Aucun doublon : les questions transversales sont automatiquement dédupliquées.</span>
            </div>
          </div>
        </aside>
      </div>
    </article>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    .p6-container {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      max-width: 1060px;
      margin: 0 auto;
      padding: clamp(0.5rem, 2vh, 1.5rem) 1.25rem;
      box-sizing: border-box;
    }

    .p6-header {
      text-align: center;
      margin-bottom: clamp(0.75rem, 2.5vh, 1.5rem);

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
        margin-bottom: 0.4rem;
      }

      .manga-title {
        font-family: var(--font-title);
        font-size: clamp(1.4rem, 3.2vw, 2.2rem);
        color: var(--livre-encre);
        margin: 0 0 0.4rem;
        letter-spacing: -0.02em;
        line-height: 1.15;
      }

      .p6-desc {
        font-family: var(--font-body);
        font-size: clamp(0.85rem, 1.4vw, 0.95rem);
        color: var(--livre-secondaire);
        max-width: 640px;
        margin: 0 auto;
        line-height: 1.4;
      }
    }

    .p6-content {
      display: grid;
      grid-template-columns: 1.25fr 0.95fr;
      gap: clamp(1rem, 3vw, 2rem);
      align-items: center;

      @media (max-width: 820px) {
        grid-template-columns: 1fr;
        gap: 1rem;
      }
    }

    .p6-cloud {
      border: none;
      padding: 0;
      margin: 0;

      .skills-grid {
        display: flex;
        flex-wrap: wrap;
        gap: clamp(0.4rem, 1.2vh, 0.65rem);
        justify-content: flex-start;
      }
    }

    .skill-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      background: var(--livre-papier);
      border: 2px solid var(--livre-encre);
      color: var(--livre-encre);
      font-family: var(--font-body);
      font-size: clamp(0.8rem, 1.3vw, 0.92rem);
      font-weight: 600;
      padding: clamp(0.35rem, 1vh, 0.55rem) clamp(0.6rem, 1.5vw, 0.85rem);
      border-radius: 999px;
      cursor: pointer;
      box-shadow: 2px 2px 0 var(--livre-encre);
      transition: transform 0.15s ease, background 0.15s ease, box-shadow 0.15s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 3px 3px 0 var(--livre-encre);
        background: #FDFCF9;
      }

      &:focus-visible {
        outline: 3px solid var(--livre-rose-texte);
        outline-offset: 2px;
      }

      .skill-indicator {
        width: 18px;
        height: 18px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        border: 1.5px solid var(--livre-encre);
        background: transparent;

        .dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--livre-secondaire);
        }
      }

      .skill-meta {
        font-family: var(--font-display);
        font-size: 0.7rem;
        font-weight: 800;
        color: var(--livre-secondaire);
        opacity: 0.8;
      }

      &.selected {
        background: var(--livre-encre);
        color: var(--livre-papier);
        box-shadow: 3px 3px 0 var(--livre-rose-texte);
        transform: translateY(-1px);

        .skill-indicator {
          border-color: var(--livre-papier);
          background: var(--livre-rose-texte);
          color: #FFF;
        }

        .skill-meta {
          color: var(--livre-rose-deco);
          opacity: 1;
        }
      }
    }

    .summary-card {
      background: var(--livre-cartouche-bg);
      border: 3px double var(--livre-encre);
      box-shadow: 4px 4px 0 var(--livre-encre);
      padding: clamp(0.85rem, 2vh, 1.4rem);
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
    }

    .summary-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid var(--livre-encre);
      padding-bottom: 0.45rem;

      .summary-tag {
        font-family: var(--font-display);
        font-size: 0.7rem;
        font-weight: 800;
        letter-spacing: 0.08em;
        color: var(--livre-rose-texte);
      }

      .summary-count {
        font-family: var(--font-body);
        font-size: 0.78rem;
        font-weight: 700;
        color: var(--livre-secondaire);
      }
    }

    .stats-row {
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: 0.3rem 0;

      .stat-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;

        .stat-number {
          font-family: var(--font-display);
          font-size: clamp(1.6rem, 3.5vw, 2.3rem);
          font-weight: 900;
          color: var(--livre-encre);
          line-height: 1;
        }

        .stat-label {
          font-family: var(--font-body);
          font-size: 0.78rem;
          color: var(--livre-secondaire);
          margin-top: 0.25rem;
        }
      }

      .stat-sep {
        width: 2px;
        height: 38px;
        background: var(--livre-encre);
        opacity: 0.3;
      }
    }

    .balance-bar {
      width: 100%;
      height: 8px;
      background: #E4DCD3;
      border: 1.5px solid var(--livre-encre);
      border-radius: 4px;
      overflow: hidden;

      .bar-fill {
        height: 100%;
        background: var(--livre-rose-texte);
        transition: width 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      }
    }

    .summary-feedback {
      min-height: 44px;
      display: flex;
      align-items: center;

      .feedback-text {
        font-family: var(--font-body);
        font-size: 0.85rem;
        line-height: 1.35;
        margin: 0;
        color: var(--livre-encre);

        &.neutral {
          color: var(--livre-secondaire);
          font-style: italic;
        }

        &.highlight strong {
          color: var(--livre-rose-texte);
        }

        &.complete strong {
          color: #1F6A3F;
        }
      }
    }

    .summary-hint {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      font-family: var(--font-body);
      font-size: 0.72rem;
      color: var(--livre-secondaire);
      border-top: 1px dashed rgba(18, 18, 18, 0.25);
      padding-top: 0.5rem;
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Page6CompetencesComponent {
  readonly skills: SkillItem[] = [
    { id: 'angular', name: 'Angular 17', category: 'tech', questionsCount: 5, durationMinutes: 12 },
    { id: 'ts', name: 'TypeScript', category: 'tech', questionsCount: 4, durationMinutes: 10 },
    { id: 'rxjs', name: 'RxJS', category: 'tech', questionsCount: 3, durationMinutes: 8 },
    { id: 'signals', name: 'Signals', category: 'tech', questionsCount: 3, durationMinutes: 7 },
    { id: 'node', name: 'Node.js', category: 'tech', questionsCount: 4, durationMinutes: 10 },
    { id: 'git', name: 'Git & GitHub', category: 'tech', questionsCount: 3, durationMinutes: 6 },
    { id: 'cicd', name: 'CI/CD', category: 'tech', questionsCount: 2, durationMinutes: 5 },
    { id: 'clean', name: 'Clean Arch', category: 'methodo', questionsCount: 3, durationMinutes: 8 },
    { id: 'scrum', name: 'Scrum / Agile', category: 'methodo', questionsCount: 2, durationMinutes: 5 },
    { id: 'a11y', name: 'Accessibilité', category: 'methodo', questionsCount: 3, durationMinutes: 7 },
    { id: 'com', name: 'Communication', category: 'humain', questionsCount: 4, durationMinutes: 8 },
    { id: 'stress', name: 'Gestion du stress', category: 'humain', questionsCount: 3, durationMinutes: 6 }
  ];

  // Default selection: Mohamed's starter pack (Angular, TS, Signals, Communication)
  readonly selectedIds = signal<Set<string>>(new Set(['angular', 'ts', 'signals', 'com']));

  // Compute total questions with cross-domain deduplication (avoids naive double-counting)
  readonly totalQuestions = computed(() => {
    const ids = this.selectedIds();
    if (ids.size === 0) return 0;
    let sum = 0;
    for (const skill of this.skills) {
      if (ids.has(skill.id)) {
        sum += skill.questionsCount;
      }
    }
    // Deduplication factor: 1 question saved every 3 skills selected due to intersection
    const dedup = Math.floor(ids.size / 3);
    return Math.max(1, sum - dedup);
  });

  readonly totalDuration = computed(() => {
    const ids = this.selectedIds();
    if (ids.size === 0) return 0;
    let sum = 0;
    for (const skill of this.skills) {
      if (ids.has(skill.id)) {
        sum += skill.durationMinutes;
      }
    }
    const dedup = Math.floor(ids.size / 2) * 2;
    return Math.max(5, sum - dedup);
  });

  isSelected(id: string): boolean {
    return this.selectedIds().has(id);
  }

  toggleSkill(id: string): void {
    const current = new Set(this.selectedIds());
    if (current.has(id)) {
      current.delete(id);
    } else {
      current.add(id);
    }
    this.selectedIds.set(current);
  }
}
