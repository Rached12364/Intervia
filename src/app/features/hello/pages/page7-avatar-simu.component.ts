import { Component, ChangeDetectionStrategy, signal, computed, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IaAvatarComponent, IaAvatarState } from '../../../shared/components/ia-avatar/ia-avatar.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';

export type SimuPhase = 'intro' | 'question' | 'recording' | 'feedback';

@Component({
  selector: 'app-page7-avatar-simu',
  standalone: true,
  imports: [CommonModule, IaAvatarComponent, IconComponent],
  template: `
    <article class="p7-container" aria-labelledby="p7-title">
      <header class="p7-header">
        <span class="manga-cartouche">CHAPITRE 3 · LE DOJO IA</span>
        <h2 id="p7-title" class="manga-title">L’IA vous écoute sans jugement</h2>
        <p class="p7-desc">
          Testez une mini-simulation express de 30 secondes en conditions réelles.
          Aucun micro requis : l'analyse pédagogique simule une réponse modèle.
        </p>
      </header>

      <div class="p7-stage manga-case">
        <!-- Zone Avatar IA -->
        <div class="avatar-column">
          <div class="avatar-frame">
            <app-ia-avatar
              [state]="avatarState()"
              size="l"
              [decorative]="false">
            </app-ia-avatar>
          </div>
          <div class="state-pill">
            <span class="pulse-dot" [class]="avatarState()"></span>
            <span class="state-label">{{ stateLabel() }}</span>
          </div>

          <!-- Sélecteur d'état manuel pour tester l'avatar -->
          <div class="state-buttons" role="group" aria-label="États de l'avatar">
            <button
              type="button"
              class="mini-btn"
              [class.active]="avatarState() === 'idle'"
              (click)="setManualState('idle')">Repos</button>
            <button
              type="button"
              class="mini-btn"
              [class.active]="avatarState() === 'speaking'"
              (click)="setManualState('speaking')">Parle</button>
            <button
              type="button"
              class="mini-btn"
              [class.active]="avatarState() === 'listening'"
              (click)="setManualState('listening')">Écoute</button>
            <button
              type="button"
              class="mini-btn"
              [class.active]="avatarState() === 'thinking'"
              (click)="setManualState('thinking')">Réfléchit</button>
          </div>
        </div>

        <!-- Zone Dialogue & Simulation 30s -->
        <div class="interaction-column">
          <!-- Phase 1: Intro / Prêt à lancer -->
          @if (phase() === 'intro') {
            <div class="speech-bubble">
              <span class="bubble-tag">RECRUTEUSE IA · INTERVIA</span>
              <p class="speech-text">
                « Bonjour Mohamed. Présentez-moi brièvement un défi technique que vous avez résolu 
                sur Angular ou TypeScript lors de vos projets récents. »
              </p>
            </div>

            <div class="action-box">
              <button
                type="button"
                class="simu-start-btn"
                (click)="startSimulation()">
                <app-icon name="videocam" [size]="20"></app-icon>
                <span>Lancer la mini-simulation (30 s)</span>
              </button>
              <span class="simu-footnote">Mode express sans activation de micro réel</span>
            </div>
          }

          <!-- Phase 2: En cours de simulation 30s -->
          @if (phase() === 'recording') {
            <div class="simu-live-card" aria-live="polite">
              <div class="live-header">
                <span class="rec-badge">
                  <span class="rec-dot"></span> ENREGISTREMENT SIMULÉ
                </span>
                <span class="timer-display">{{ formatSeconds(secondsRemaining()) }}</span>
              </div>

              <div class="live-prompt">
                <p class="live-question">
                  « Parlez posément. Décrivez le problème, votre analyse, puis la solution retenue. »
                </p>
                <div class="audio-waves" aria-hidden="true">
                  <span class="wave-bar w1"></span>
                  <span class="wave-bar w2"></span>
                  <span class="wave-bar w3"></span>
                  <span class="wave-bar w4"></span>
                  <span class="wave-bar w5"></span>
                  <span class="wave-bar w6"></span>
                  <span class="wave-bar w7"></span>
                </div>
              </div>

              <!-- 4 pastilles d'analyse en direct -->
              <div class="telemetry-grid">
                <div class="telemetry-pill">
                  <app-icon name="videocam" [size]="14"></app-icon>
                  <span>Regard caméra : <strong>Composé</strong></span>
                </div>
                <div class="telemetry-pill">
                  <app-icon name="schedule" [size]="14"></app-icon>
                  <span>Débit : <strong>128 mots/min</strong></span>
                </div>
                <div class="telemetry-pill">
                  <app-icon name="check_circle" [size]="14"></app-icon>
                  <span>Clarté : <strong>Méthode STAR</strong></span>
                </div>
                <div class="telemetry-pill">
                  <app-icon name="self_improvement" [size]="14"></app-icon>
                  <span>Posture : <strong>Stable</strong></span>
                </div>
              </div>

              <div class="live-actions">
                <button
                  type="button"
                  class="finish-early-btn"
                  (click)="finishSimulation()">
                  Terminer et voir la restitution
                </button>
              </div>
            </div>
          }

          <!-- Phase 3: Restitution immédiate -->
          @if (phase() === 'feedback') {
            <div class="feedback-card" aria-live="polite">
              <div class="feedback-header">
                <span class="score-pill">SCORE EXPRESS : 85 / 100</span>
                <span class="status-success">
                  <app-icon name="check_circle" [size]="16"></app-icon> Analyse positive
                </span>
              </div>

              <div class="feedback-points">
                <div class="point-item success">
                  <app-icon name="check" [size]="16"></app-icon>
                  <div>
                    <strong>Structure claire :</strong> Vous avez contextualisé le bug de rendu avant de parler du refactoring Signals.
                  </div>
                </div>
                <div class="point-item tip">
                  <app-icon name="lightbulb" [size]="16"></app-icon>
                  <div>
                    <strong>Conseil apaisant :</strong> Prenez 2 secondes d'inspiration avant de répondre, votre débit s'en trouvera naturellement posé.
                  </div>
                </div>
              </div>

              <div class="feedback-actions">
                <button
                  type="button"
                  class="retry-btn"
                  (click)="resetSimulation()">
                  Refaire l'exercice
                </button>
              </div>
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

    .p7-container {
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

    .p7-header {
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

      .p7-desc {
        font-family: var(--font-body);
        font-size: clamp(0.85rem, 1.4vw, 0.95rem);
        color: var(--livre-secondaire);
        max-width: 660px;
        margin: 0 auto;
        line-height: 1.35;
      }
    }

    .p7-stage {
      display: grid;
      grid-template-columns: 260px 1fr;
      gap: clamp(1rem, 2.5vw, 2rem);
      background: var(--livre-cartouche-bg);
      border: 3px double var(--livre-encre);
      box-shadow: 5px 5px 0 var(--livre-encre);
      padding: clamp(1rem, 2.2vh, 1.6rem);
      align-items: center;

      @media (max-width: 820px) {
        grid-template-columns: 1fr;
        gap: 1rem;
      }
    }

    .avatar-column {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.6rem;
      padding-right: 1rem;
      border-right: 2px solid rgba(18, 18, 18, 0.15);

      @media (max-width: 820px) {
        border-right: none;
        border-bottom: 2px solid rgba(18, 18, 18, 0.15);
        padding-right: 0;
        padding-bottom: 0.8rem;
      }

      .avatar-frame {
        width: 130px;
        height: 130px;
        border-radius: 50%;
        border: 3px solid var(--livre-encre);
        box-shadow: 3px 3px 0 var(--livre-encre);
        background: #FFF;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }

      .state-pill {
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        font-family: var(--font-body);
        font-size: 0.76rem;
        font-weight: 700;
        color: var(--livre-encre);
        background: #FFF;
        border: 1.5px solid var(--livre-encre);
        padding: 0.2rem 0.65rem;
        border-radius: 999px;

        .pulse-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #737373;

          &.speaking {
            background: var(--livre-rose-texte);
            animation: pulse-ring 1.2s infinite;
          }
          &.listening {
            background: #2563EB;
          }
          &.thinking {
            background: #D97706;
            animation: pulse-ring 1s infinite;
          }
        }
      }

      .state-buttons {
        display: flex;
        gap: 0.25rem;
        flex-wrap: wrap;
        justify-content: center;
        margin-top: 0.2rem;

        .mini-btn {
          font-family: var(--font-body);
          font-size: 0.68rem;
          font-weight: 600;
          background: var(--livre-papier);
          border: 1px solid var(--livre-encre);
          color: var(--livre-encre);
          padding: 0.2rem 0.45rem;
          cursor: pointer;
          border-radius: 3px;

          &.active {
            background: var(--livre-encre);
            color: #FFF;
          }
        }
      }
    }

    .interaction-column {
      display: flex;
      flex-direction: column;
      gap: 0.9rem;
    }

    .speech-bubble {
      background: #FFF;
      border: 2px solid var(--livre-encre);
      box-shadow: 3px 3px 0 var(--livre-encre);
      border-radius: 14px;
      padding: clamp(0.85rem, 1.8vh, 1.3rem);
      position: relative;

      .bubble-tag {
        display: block;
        font-family: var(--font-display);
        font-size: 0.68rem;
        font-weight: 800;
        letter-spacing: 0.08em;
        color: var(--livre-rose-texte);
        margin-bottom: 0.35rem;
      }

      .speech-text {
        font-family: var(--font-body);
        font-size: clamp(0.92rem, 1.5vw, 1.05rem);
        line-height: 1.45;
        color: var(--livre-encre);
        margin: 0;
        font-style: italic;
      }
    }

    .action-box {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      align-items: flex-start;

      .simu-start-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.6rem;
        font-family: var(--font-display);
        font-size: clamp(0.88rem, 1.4vw, 1rem);
        font-weight: 800;
        background: var(--livre-encre);
        color: var(--livre-papier);
        border: 2px solid var(--livre-encre);
        padding: 0.75rem 1.4rem;
        cursor: pointer;
        box-shadow: 4px 4px 0 var(--livre-rose-texte);
        transition: transform 0.15s ease, box-shadow 0.15s ease;

        &:hover {
          transform: translate(-2px, -2px);
          box-shadow: 6px 6px 0 var(--livre-rose-texte);
        }

        &:focus-visible {
          outline: 3px solid var(--livre-rose-texte);
          outline-offset: 2px;
        }
      }

      .simu-footnote {
        font-family: var(--font-body);
        font-size: 0.72rem;
        color: var(--livre-secondaire);
      }
    }

    .simu-live-card {
      background: #FFF;
      border: 2px solid var(--livre-encre);
      box-shadow: 3px 3px 0 var(--livre-encre);
      padding: clamp(0.75rem, 1.5vh, 1.1rem);
      display: flex;
      flex-direction: column;
      gap: 0.8rem;

      .live-header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .rec-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-display);
          font-size: 0.74rem;
          font-weight: 800;
          color: #DC2626;

          .rec-dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #DC2626;
            animation: pulse-ring 1s infinite;
          }
        }

        .timer-display {
          font-family: var(--font-display);
          font-size: 1.15rem;
          font-weight: 900;
          color: var(--livre-encre);
        }
      }

      .live-prompt {
        .live-question {
          font-family: var(--font-body);
          font-size: 0.9rem;
          color: var(--livre-encre);
          margin: 0 0 0.5rem;
        }

        .audio-waves {
          display: flex;
          align-items: center;
          gap: 4px;
          height: 28px;

          .wave-bar {
            width: 4px;
            background: var(--livre-encre);
            border-radius: 2px;
            animation: wave-bounce 1.2s ease-in-out infinite alternate;

            &.w1 { height: 10px; animation-delay: 0.1s; }
            &.w2 { height: 22px; animation-delay: 0.3s; }
            &.w3 { height: 16px; animation-delay: 0.2s; }
            &.w4 { height: 26px; animation-delay: 0.4s; }
            &.w5 { height: 18px; animation-delay: 0.15s; }
            &.w6 { height: 24px; animation-delay: 0.35s; }
            &.w7 { height: 12px; animation-delay: 0.25s; }
          }
        }
      }

      .telemetry-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
        gap: 0.4rem;

        .telemetry-pill {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-body);
          font-size: 0.74rem;
          background: var(--livre-papier);
          border: 1px solid var(--livre-encre);
          padding: 0.35rem 0.5rem;
          color: var(--livre-encre);
        }
      }

      .live-actions {
        display: flex;
        justify-content: flex-end;

        .finish-early-btn {
          font-family: var(--font-body);
          font-size: 0.8rem;
          font-weight: 700;
          background: var(--livre-papier);
          border: 1.5px solid var(--livre-encre);
          padding: 0.4rem 0.85rem;
          cursor: pointer;
          color: var(--livre-encre);

          &:hover {
            background: var(--livre-encre);
            color: #FFF;
          }
        }
      }
    }

    .feedback-card {
      background: #FFF;
      border: 2px solid var(--livre-encre);
      box-shadow: 3px 3px 0 var(--livre-encre);
      padding: clamp(0.75rem, 1.5vh, 1.1rem);
      display: flex;
      flex-direction: column;
      gap: 0.8rem;

      .feedback-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 2px solid var(--livre-encre);
        padding-bottom: 0.4rem;

        .score-pill {
          font-family: var(--font-display);
          font-size: 0.82rem;
          font-weight: 800;
          color: var(--livre-rose-texte);
        }

        .status-success {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-family: var(--font-body);
          font-size: 0.76rem;
          font-weight: 700;
          color: #1F6A3F;
        }
      }

      .feedback-points {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        .point-item {
          display: flex;
          gap: 0.5rem;
          font-family: var(--font-body);
          font-size: 0.84rem;
          line-height: 1.35;
          padding: 0.45rem 0.6rem;
          border: 1px solid var(--livre-encre);

          &.success {
            background: #F0FDF4;
            color: #14532D;
          }

          &.tip {
            background: #FEF3C7;
            color: #78350F;
          }
        }
      }

      .feedback-actions {
        display: flex;
        justify-content: flex-end;

        .retry-btn {
          font-family: var(--font-body);
          font-size: 0.78rem;
          font-weight: 700;
          background: var(--livre-papier);
          border: 1.5px solid var(--livre-encre);
          padding: 0.35rem 0.75rem;
          cursor: pointer;
        }
      }
    }

    @keyframes pulse-ring {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(1.15); }
    }

    @keyframes wave-bounce {
      0% { height: 6px; }
      100% { height: 26px; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Page7AvatarSimuComponent implements OnDestroy {
  readonly phase = signal<SimuPhase>('intro');
  readonly avatarState = signal<IaAvatarState>('speaking');
  readonly secondsRemaining = signal<number>(30);

  private timerInterval: any = null;

  readonly stateLabel = computed(() => {
    switch (this.avatarState()) {
      case 'speaking': return 'L’avatar parle';
      case 'listening': return 'L’avatar vous écoute';
      case 'thinking': return 'Analyse en cours…';
      default: return 'En attente';
    }
  });

  setManualState(s: IaAvatarState): void {
    this.avatarState.set(s);
  }

  startSimulation(): void {
    this.phase.set('recording');
    this.avatarState.set('listening');
    this.secondsRemaining.set(30);

    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      const cur = this.secondsRemaining();
      if (cur <= 1) {
        this.finishSimulation();
      } else {
        this.secondsRemaining.set(cur - 1);
        if (cur === 20) {
          this.avatarState.set('listening');
        } else if (cur === 5) {
          this.avatarState.set('thinking');
        }
      }
    }, 1000);
  }

  finishSimulation(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    this.phase.set('feedback');
    this.avatarState.set('speaking');
  }

  resetSimulation(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    this.phase.set('intro');
    this.avatarState.set('speaking');
  }

  formatSeconds(sec: number): string {
    const s = sec < 10 ? `0${sec}` : `${sec}`;
    return `00:${s}`;
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }
}
