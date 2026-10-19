import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-page11-triomphe',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <article class="p11-container" aria-labelledby="p11-title">
      <header class="p11-header">
        <span class="manga-cartouche">CHAPITRE 4 · LA RESTITUTION</span>
        <h2 id="p11-title" class="manga-title">Le triomphe de la méthode</h2>
      </header>

      <div class="p11-stage">
        <div class="p11-frame">
          <!-- Illustration manga victoire complète -->
          <img
            src="assets/livre/case-9.jpg"
            alt="Mohamed souriant et signant son offre de stage PFE validée avec le recruteur."
            width="382"
            height="217"
            loading="eager"
            class="manga-img"
          />

          <!-- Cartouche narratif superposé en haut à gauche -->
          <div class="overlay-cartouche">
            <p class="narratif-text">
              VOTRE POTENTIEL, PAS VOTRE <span class="accent-rose">STRESS</span>.
            </p>
          </div>

          <!-- Badge d'or superposé en haut à droite -->
          <div class="overlay-badge" aria-label="Badge d'Or IntervIA : Stage PFE Validé">
            <div class="badge-ring" aria-hidden="true">
              <app-icon name="workspace_premium" [size]="18"></app-icon>
            </div>
            <div class="badge-texts">
              <span class="badge-grade">BADGE D'OR INTERVIA</span>
              <span class="badge-status">Stage PFE Validé</span>
            </div>
          </div>

          <!-- Bulle de dialogue superposée en bas -->
          <div class="overlay-speech">
            <p class="bubble-text">
              « Je ne suis plus paralysé face aux recruteurs. Je sais exactement ce que je vaux. »
            </p>
            <span class="bubble-author">— Mohamed Ben Ali, Étudiant en PFE</span>
          </div>
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

    .p11-container {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      max-width: 980px;
      margin: 0 auto;
      padding: clamp(0.5rem, 1.8vh, 1.25rem) 1.25rem;
      box-sizing: border-box;
    }

    .p11-header {
      text-align: center;
      margin-bottom: clamp(0.4rem, 1.2vh, 0.75rem);
      animation: headerDrop 350ms cubic-bezier(0.16, 1, 0.3, 1) both;

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
        margin-bottom: 0.3rem;
      }

      .manga-title {
        font-family: var(--font-title);
        font-size: clamp(1.4rem, 3vw, 2.1rem);
        color: var(--livre-encre);
        margin: 0;
        letter-spacing: -0.02em;
        line-height: 1.15;
      }
    }

    .p11-stage {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
      min-height: 0;
    }

    .p11-frame {
      position: relative;
      width: 100%;
      max-width: 820px;
      max-height: clamp(300px, 60vh, 520px);
      aspect-ratio: 16 / 9;
      background: #EFEBE4;
      border: 3px double var(--livre-encre);
      box-shadow: 6px 6px 0 var(--livre-encre);
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: plateEntrance 400ms cubic-bezier(0.16, 1, 0.3, 1) both;
      transition: transform 200ms ease, box-shadow 200ms ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 8px 8px 0 var(--livre-encre);
      }
    }

    .manga-img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: block;
      animation: imgMangaReveal 550ms cubic-bezier(0.16, 1, 0.3, 1) both;
    }

    .overlay-cartouche {
      position: absolute;
      top: 12px;
      left: 12px;
      max-width: 70%;
      z-index: 2;
      background: rgba(250, 248, 244, 0.92);
      border: 2px solid var(--livre-encre);
      box-shadow: 2px 2px 0 var(--livre-encre);
      padding: 0.3rem 0.7rem;
      animation: cartoucheSlideIn 420ms cubic-bezier(0.16, 1, 0.3, 1) 140ms both;

      .narratif-text {
        font-family: var(--font-display);
        font-size: clamp(0.72rem, 1.15vw, 0.86rem);
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        line-height: 1.25;
        color: var(--livre-encre);
        margin: 0;

        .accent-rose {
          color: #A63A60 !important;
        }
      }
    }

    .overlay-badge {
      position: absolute;
      top: 12px;
      right: 12px;
      z-index: 2;
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      background: rgba(255, 253, 245, 0.95);
      border: 1.5px solid #B45309;
      box-shadow: 2px 2px 0 #78350F;
      padding: 0.2rem 0.55rem;
      border-radius: 999px;
      animation: badgePopGleam 600ms cubic-bezier(0.16, 1, 0.3, 1) 250ms both;

      .badge-ring {
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background: #FEF3C7;
        color: #D97706;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #B45309;
      }

      .badge-texts {
        display: flex;
        flex-direction: column;

        .badge-grade {
          font-family: var(--font-display);
          font-size: 0.6rem;
          font-weight: 900;
          letter-spacing: 0.06em;
          color: #92400E;
          line-height: 1.1;
        }

        .badge-status {
          font-family: var(--font-body);
          font-size: 0.64rem;
          font-weight: 700;
          color: #15803D;
          line-height: 1.1;
        }
      }
    }

    .overlay-speech {
      position: absolute;
      bottom: 12px;
      left: 50%;
      transform: translateX(-50%);
      max-width: 85%;
      z-index: 2;
      background: rgba(255, 255, 255, 0.94);
      border: 2px solid var(--livre-encre);
      border-radius: 12px;
      box-shadow: 3px 3px 0 var(--livre-encre);
      padding: 0.4rem 0.9rem;
      text-align: center;
      animation: bubblePopIn 450ms cubic-bezier(0.16, 1, 0.3, 1) 280ms both;

      .bubble-text {
        font-family: var(--font-body);
        font-size: clamp(0.8rem, 1.2vw, 0.92rem);
        font-style: italic;
        color: var(--livre-encre);
        line-height: 1.35;
        margin: 0 0 0.15rem;
      }

      .bubble-author {
        display: block;
        font-family: var(--font-display);
        font-size: 0.68rem;
        font-weight: 800;
        color: var(--livre-secondaire);
      }
    }

    /* Keyframes d'apparition manga */
    @keyframes headerDrop {
      from {
        opacity: 0;
        transform: translateY(-8px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes plateEntrance {
      from {
        opacity: 0;
        transform: translateY(12px) scale(0.98);
        box-shadow: 0 0 0 var(--livre-encre);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
        box-shadow: 6px 6px 0 var(--livre-encre);
      }
    }

    @keyframes imgMangaReveal {
      0% {
        opacity: 0;
        transform: scale(1.04);
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

    @keyframes cartoucheSlideIn {
      from {
        opacity: 0;
        transform: translateX(-12px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes badgePopGleam {
      0% {
        opacity: 0;
        transform: scale(0.8);
      }
      60% {
        transform: scale(1.08);
        box-shadow: 0 0 12px rgba(245, 158, 11, 0.4);
      }
      100% {
        opacity: 1;
        transform: scale(1);
        box-shadow: 2px 2px 0 #78350F;
      }
    }

    @keyframes bubblePopIn {
      0% {
        opacity: 0;
        transform: translateX(-50%) translateY(8px) scale(0.95);
      }
      70% {
        transform: translateX(-50%) translateY(-2px) scale(1.01);
      }
      100% {
        opacity: 1;
        transform: translateX(-50%) translateY(0) scale(1);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      *, :host {
        animation: none !important;
        transition: none !important;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Page11TriompheComponent {
  // Reveal gold badge smoothly on entry
  readonly badgeRevealed = signal<boolean>(true);
}
