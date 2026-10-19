import {
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
  computed,
  ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { AudioAmbientService } from '../services/audio-ambient.service';

@Component({
  selector: 'app-page1-sas',
  standalone: true,
  imports: [CommonModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page-sas" (click)="onBackgroundClick()">
      <div
        class="page-sas__content"
        [class.reduced-motion]="reducedMotion"
        (click)="$event.stopPropagation()"
        role="region"
        aria-label="Prologue - IntervIA">

        <!-- 1. Kicker Manga (0 - 0.6s) -->
        <div class="anim-step step-badge">
          <span class="page-sas__kicker">VOL.01 · PROLOGUE</span>
        </div>

        <!-- 2. Titre animé lettre par lettre (0.6 - 1.2s) -->
        <h1 class="page-sas__title anim-step step-title" id="page-title" tabindex="-1">
          <span class="word-interv">
            <span class="char char-1">I</span><span class="char char-2">n</span><span class="char char-3">t</span><span class="char char-4">e</span><span class="char char-5">r</span><span class="char char-6">v</span>
          </span>
          <span class="word-ia text-rose">
            <span class="char char-7">I</span><span class="char char-8">A</span>
          </span>
        </h1>

        <p class="page-sas__subtitle anim-step step-subtitle">
          Du stress au calme · L'odyssée interactive
        </p>

        <!-- 3. Citation souffle & ligne Mohamed (1.2 - 2.0s) -->
        <div class="page-sas__quote-box anim-step step-quote">
          <p class="page-sas__invitation">
            « Respirez, puis entrez. »
          </p>
          <span class="page-sas__author">
            L'histoire de Mohamed Ben Ali face à l'entretien de stage PFE
          </span>
        </div>

        <!-- 4. Section Entraînement & Deux Boutons (2.0 - 2.8s) -->
        <div class="page-sas__training-section anim-step step-training">
          <span class="page-sas__training-label">Choisis ton entraînement</span>

          <div class="page-sas__buttons-grid">
            <!-- Bouton 1 : Entretien Emploi -->
            <button
              type="button"
              class="btn-training btn-training--emploi anim-step step-btn-1"
              (click)="navigateToSimulation('emploi')"
              aria-label="Commencer l'entraînement Entretien Emploi - Poste, CDI, CDD">
              <div class="btn-training__icon-box" aria-hidden="true">
                <span class="btn-emoji">💼</span>
              </div>
              <div class="btn-training__text-col">
                <span class="btn-training__title">ENTRETIEN EMPLOI</span>
                <span class="btn-training__sub">Poste, CDI, CDD</span>
              </div>
            </button>

            <!-- Bouton 2 : Entretien PFE / Stage -->
            <button
              type="button"
              class="btn-training btn-training--pfe anim-step step-btn-2"
              (click)="navigateToSimulation('pfe')"
              aria-label="Commencer l'entraînement Entretien PFE ou Stage - Projet de fin d'études">
              <div class="btn-training__icon-box" aria-hidden="true">
                <span class="btn-emoji">🎓</span>
              </div>
              <div class="btn-training__text-col">
                <span class="btn-training__title">ENTRETIEN PFE / STAGE</span>
                <span class="btn-training__sub">Projet de fin d'études</span>
              </div>
            </button>
          </div>
        </div>

        <!-- 5. Hiérarchie secondaire & tertiaire : Histoire & Son d'ambiance -->
        <div class="page-sas__footer-actions anim-step step-footer">
          <!-- Lien discret vers l'histoire (Page 2) -->
          <button
            type="button"
            class="story-link-btn"
            (click)="startStory.emit(); advance.emit()"
            aria-label="Lire l'histoire de Mohamed Ben Ali">
            <span>Lire l'histoire de Mohamed</span>
            <app-icon name="arrow_forward" [size]="16" aria-hidden="true" />
          </button>

          <!-- Son d'ambiance binaural -->
          <div class="audio-control-bar">
            <button
              type="button"
              class="audio-toggle-btn"
              [class.audio-toggle-btn--on]="audioService.isPlaying()"
              (click)="audioService.toggleSound()"
              [attr.aria-pressed]="audioService.isPlaying()"
              aria-label="Activer ou couper le son d'ambiance binaural">
              <app-icon [name]="audioService.isPlaying() ? 'volume_up' : 'volume_off'" [size]="15" aria-hidden="true" />
              <span>{{ audioButtonLabel() }}</span>
            </button>

            @if (audioService.isPlaying()) {
              <div class="volume-box">
                <button
                  type="button"
                  class="mute-btn"
                  (click)="audioService.toggleMute()"
                  [title]="audioService.isMuted() ? 'Rétablir le son' : 'Couper le son'"
                  aria-label="Rétablir ou couper le son">
                  <app-icon [name]="audioService.isMuted() ? 'volume_off' : 'volume_up'" [size]="15" aria-hidden="true" />
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  [value]="audioService.volume()"
                  (input)="onVolumeChange($event)"
                  aria-label="Volume du son d'ambiance"
                  class="volume-slider" />
              </div>
            }
          </div>
        </div>

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

    .page-sas {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: clamp(12px, 2.5vh, 24px) 16px;
      box-sizing: border-box;
      cursor: default;
    }

    /* Carte centrale Néo-brutaliste */
    .page-sas__content {
      max-width: 620px;
      width: 100%;
      background: var(--livre-cartouche-bg, #FAF8F4);
      border: 3px solid var(--livre-ink, #121212);
      box-shadow: 6px 6px 0 var(--livre-ink, #121212);
      border-radius: 6px;
      padding: clamp(20px, 3.5vh, 32px) clamp(16px, 3.5vw, 32px);
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: clamp(10px, 1.8vh, 16px);
      box-sizing: border-box;
      animation: cardEntrance 600ms cubic-bezier(0.16, 1, 0.3, 1) both;
    }

    /* =========================================================================
       ANIMATIONS DU STORYBOARD (0 -> 2.8s)
       ========================================================================= */

    @keyframes cardEntrance {
      0% {
        opacity: 0;
        transform: translateY(18px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* 0 - 0.6s : Badge Prologue */
    .step-badge {
      animation: badgePop 500ms cubic-bezier(0.16, 1, 0.3, 1) 200ms both;
    }

    @keyframes badgePop {
      0% {
        opacity: 0;
        transform: scale(0.85);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }

    /* 0.6 - 1.2s : Titre lettre par lettre */
    .step-title .char {
      display: inline-block;
      opacity: 0;
      transform: translateY(10px);
      animation: letterReveal 300ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    .char-1 { animation-delay: 550ms; }
    .char-2 { animation-delay: 610ms; }
    .char-3 { animation-delay: 670ms; }
    .char-4 { animation-delay: 730ms; }
    .char-5 { animation-delay: 790ms; }
    .char-6 { animation-delay: 850ms; }
    .char-7 { animation-delay: 960ms; }  /* 'I' de IA */
    .char-8 { animation-delay: 1040ms; } /* 'A' de IA */

    @keyframes letterReveal {
      0% {
        opacity: 0;
        transform: translateY(8px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .step-subtitle {
      animation: fadeInSimple 400ms ease-out 1080ms both;
    }

    /* 1.2 - 2.0s : Effet de souffle sur la citation */
    .step-quote {
      animation: breathReveal 800ms cubic-bezier(0.16, 1, 0.3, 1) 1200ms both;
    }

    @keyframes breathReveal {
      0% {
        opacity: 0;
        filter: blur(8px);
        transform: scale(0.96);
      }
      60% {
        opacity: 0.85;
        filter: blur(2px);
      }
      100% {
        opacity: 1;
        filter: blur(0);
        transform: scale(1);
      }
    }

    /* 2.0 - 2.8s : Boutons d'entraînement */
    .step-training {
      animation: fadeInSimple 400ms ease-out 1900ms both;
    }

    .step-btn-1 {
      animation: buttonEntrance 500ms cubic-bezier(0.16, 1, 0.3, 1) 2050ms both;
    }

    .step-btn-2 {
      animation: buttonEntrance 500ms cubic-bezier(0.16, 1, 0.3, 1) 2200ms both;
    }

    .step-footer {
      animation: fadeInSimple 450ms ease-out 2450ms both;
    }

    @keyframes buttonEntrance {
      0% {
        opacity: 0;
        transform: translateY(12px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeInSimple {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }

    /* =========================================================================
       MODE SANS ANIMATION (prefers-reduced-motion ou toggle utilisateur)
       ========================================================================= */

    .page-sas__content.reduced-motion,
    .page-sas__content.reduced-motion * {
      animation: none !important;
      transition: none !important;
      opacity: 1 !important;
      transform: none !important;
      filter: none !important;
    }

    @media (prefers-reduced-motion: reduce) {
      .page-sas__content,
      .page-sas__content * {
        animation: none !important;
        transition: none !important;
        opacity: 1 !important;
        transform: none !important;
        filter: none !important;
      }
    }

    /* =========================================================================
       TYPOGRAPHIE & ÉLÉMENTS DE MISE EN PAGE
       ========================================================================= */

    .page-sas__kicker {
      display: inline-block;
      font-family: var(--font-cartouche, 'Archivo', sans-serif);
      font-weight: 800;
      font-size: 0.6875rem;
      letter-spacing: 0.12em;
      color: var(--livre-rose-text, #A63A60);
      border: 1px solid var(--livre-rose-text, #A63A60);
      background: rgba(166, 58, 96, 0.06);
      padding: 3px 10px;
      border-radius: 2px;
      text-transform: uppercase;
    }

    .page-sas__title {
      font-family: var(--font-title, 'Playfair Display', Georgia, serif);
      font-size: clamp(2.3rem, 5vw, 3.4rem);
      font-weight: 700;
      margin: 0;
      line-height: 1.1;
      letter-spacing: -0.01em;

      .word-interv {
        color: var(--livre-ink, #121212);
      }

      .text-rose {
        color: var(--livre-rose-text, #A63A60);
        margin-left: 1px;
      }
    }

    .page-sas__subtitle {
      font-family: var(--font-body, 'Inter', sans-serif);
      font-size: clamp(0.85rem, 1.8vw, 0.95rem);
      color: var(--livre-ink-secondary, #3A3A3A);
      margin: 0;
      font-weight: 500;
    }

    .page-sas__quote-box {
      border-top: 1px dashed rgba(18, 18, 18, 0.25);
      border-bottom: 1px dashed rgba(18, 18, 18, 0.25);
      padding: clamp(8px, 1.5vh, 12px) 10px;
      width: 100%;
      box-sizing: border-box;
    }

    .page-sas__invitation {
      font-family: var(--font-title, 'Playfair Display', serif);
      font-style: italic;
      font-size: clamp(1.1rem, 2.3vw, 1.3rem);
      color: var(--livre-ink, #121212);
      margin: 0 0 4px 0;
    }

    .page-sas__author {
      display: block;
      font-family: var(--font-body, 'Inter', sans-serif);
      font-size: 0.75rem;
      color: var(--livre-ink-secondary, #3A3A3A);
    }

    /* Section Entraînement */
    .page-sas__training-section {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }

    .page-sas__training-label {
      font-family: var(--font-cartouche, 'Archivo', sans-serif);
      font-weight: 800;
      font-size: 0.6875rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--livre-ink-secondary, #3A3A3A);
    }

    /* Grille des boutons : côte à côte sur PC, empilés sur mobile */
    .page-sas__buttons-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      width: 100%;

      @media (max-width: 580px) {
        grid-template-columns: 1fr;
        gap: 10px;
      }
    }

    /* Style Néo-brutaliste des boutons */
    .btn-training {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 14px;
      border: 2px solid var(--livre-ink, #121212);
      border-radius: 4px;
      box-shadow: 4px 4px 0 var(--livre-ink, #121212);
      cursor: pointer;
      text-align: left;
      text-decoration: none;
      box-sizing: border-box;
      min-height: 58px;
      transition: transform 120ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 120ms cubic-bezier(0.16, 1, 0.3, 1);

      /* Effet pressé vers son ombre au survol */
      &:hover:not(:disabled) {
        transform: translate(2px, 2px);
        box-shadow: 2px 2px 0 var(--livre-ink, #121212);
      }

      &:active:not(:disabled) {
        transform: translate(4px, 4px);
        box-shadow: 0 0 0 var(--livre-ink, #121212);
      }

      &:focus-visible {
        outline: 3px solid var(--livre-rose-text, #A63A60) !important;
        outline-offset: 3px !important;
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      /* Bouton 1 : Noir plein */
      &--emploi {
        background: var(--livre-ink, #121212);
        color: #FAF8F4;

        .btn-training__title {
          color: #FAF8F4;
        }

        .btn-training__sub {
          color: #D1CDCD;
        }

        .btn-training__icon-box {
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.25);
        }
      }

      /* Bouton 2 : Fond crème, bordure noire */
      &--pfe {
        background: var(--livre-cartouche-bg, #FAF8F4);
        color: var(--livre-ink, #121212);

        .btn-training__title {
          color: var(--livre-ink, #121212);
        }

        .btn-training__sub {
          color: var(--livre-ink-secondary, #3A3A3A);
        }

        .btn-training__icon-box {
          background: #FFFFFF;
          border: 1px solid var(--livre-ink, #121212);
        }
      }
    }

    .btn-training__icon-box {
      width: 38px;
      height: 38px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .btn-emoji {
      font-size: 1.25rem;
      line-height: 1;
    }

    .btn-training__text-col {
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: 0;
    }

    .btn-training__title {
      font-family: var(--font-cartouche, 'Archivo', sans-serif);
      font-weight: 800;
      font-size: 0.8125rem;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      line-height: 1.2;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .btn-training__sub {
      font-family: var(--font-body, 'Inter', sans-serif);
      font-size: 0.6875rem;
      font-weight: 500;
      line-height: 1.2;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* Actions secondaires & tertiaires */
    .page-sas__footer-actions {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      width: 100%;
      margin-top: 4px;
    }

    .story-link-btn {
      background: transparent;
      border: none;
      color: var(--livre-ink, #121212);
      font-family: var(--font-cartouche, 'Archivo', sans-serif);
      font-weight: 700;
      font-size: 0.8125rem;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      cursor: pointer;
      text-decoration: underline;
      text-underline-offset: 3px;
      border-radius: 3px;
      transition: color 120ms ease, transform 120ms ease;

      &:hover {
        color: var(--livre-rose-text, #A63A60);
        transform: translateX(2px);
      }

      &:focus-visible {
        outline: 2px solid var(--livre-rose-text, #A63A60) !important;
        outline-offset: 2px !important;
      }
    }

    .audio-control-bar {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      justify-content: center;
    }

    .audio-toggle-btn {
      background: transparent;
      border: 1px solid rgba(18, 18, 18, 0.4);
      font-family: var(--font-cartouche, 'Archivo', sans-serif);
      font-weight: 700;
      font-size: 0.6875rem;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      padding: 4px 10px;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      cursor: pointer;
      border-radius: 2px;
      color: var(--livre-ink-secondary, #3A3A3A);
      transition: all 120ms ease;

      &:hover {
        border-color: var(--livre-ink, #121212);
        color: var(--livre-ink, #121212);
      }

      &--on {
        background: var(--livre-rose-text, #A63A60);
        color: #FAF8F4;
        border-color: var(--livre-rose-text, #A63A60);

        &:hover {
          background: #87284A;
          color: #FAF8F4;
        }
      }

      &:focus-visible {
        outline: 2px solid var(--livre-rose-text, #A63A60) !important;
        outline-offset: 2px !important;
      }
    }

    .volume-box {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .mute-btn {
      background: transparent;
      border: 1px solid var(--livre-ink, #121212);
      padding: 2px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 2px;

      &:focus-visible {
        outline: 2px solid var(--livre-rose-text, #A63A60) !important;
      }
    }

    .volume-slider {
      width: 60px;
      height: 4px;
      accent-color: var(--livre-rose-text, #A63A60);
      cursor: pointer;
    }
  `]
})
export class Page1SasComponent {
  @Input() reducedMotion = false;
  @Output() advance = new EventEmitter<void>();
  @Output() startStory = new EventEmitter<void>();

  private readonly router = inject(Router);
  readonly audioService = inject(AudioAmbientService);

  readonly audioButtonLabel = computed(() => {
    return this.audioService.isPlaying() ? 'Son d\'ambiance actif' : 'Activer le son d\'ambiance';
  });

  navigateToSimulation(type: 'emploi' | 'pfe'): void {
    this.router.navigate(['/simulation'], {
      queryParams: { type }
    });
  }

  onBackgroundClick(): void {
    // Si l'utilisateur clique sur le fond en dehors de la carte, on n'avance pas brutalement
  }

  onVolumeChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.audioService.setVolume(parseFloat(target.value));
  }
}
