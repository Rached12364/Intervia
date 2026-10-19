import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-page-case-simple',
  standalone: true,
  imports: [CommonModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="page-single-case" (click)="advance.emit()" role="region" [attr.aria-label]="title">
      <!-- En-tête sobre -->
      <header class="single-header">
        <span class="single-chapter">{{ chapter }}</span>
        <h2 class="single-title" tabindex="-1">{{ title }}</h2>
      </header>

      <!-- Case Manga avec texte superposé sur l'image -->
      <div class="single-stage">
        <div class="single-frame livre-case" [class.reduced-motion]="reducedMotion">
          <img
            [src]="imageSrc"
            [alt]="altText"
            width="382"
            height="218"
            loading="eager"
            (error)="imgError = true"
            class="single-img" />

          @if (imgError) {
            <div class="livre-fallback-img">
              <span class="fallback-alt">{{ altText }}</span>
            </div>
          }

          <!-- Cartouche narratif superposé en haut à gauche -->
          <div class="single-cartouche livre-cartouche" [innerHTML]="cartoucheHtml"></div>

          <!-- Bulle de dialogue superposée en bas à droite -->
          @if (bulleText) {
            <div class="single-speech livre-speech">
              <p>{{ bulleText }}</p>
            </div>
          }
        </div>
      </div>

      <!-- Indication d'interaction discrète -->
      <div class="single-hint">
        <span>Cliquez ou appuyez sur Suivant (&rarr;) pour continuer</span>
      </div>
    </article>
  `,
  styles: [`
    :host {
      display: flex;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
    }

    .page-single-case {
      width: 100%;
      max-width: 920px;
      height: 100%;
      max-height: 100dvh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: clamp(0.4rem, 1.6vh, 1.2rem) clamp(1rem, 2vw, 2rem);
      box-sizing: border-box;
      user-select: none;
      cursor: pointer;
    }

    .single-header {
      text-align: center;
      margin-bottom: clamp(0.3rem, 1vh, 0.6rem);
      animation: headerDrop 350ms cubic-bezier(0.16, 1, 0.3, 1) both;
    }

    .single-chapter {
      display: inline-block;
      font-family: var(--font-display, 'Archivo', sans-serif);
      font-weight: 800;
      font-size: 0.6875rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--livre-rose-text, #A63A60);
      margin-bottom: 0.2rem;
    }

    .single-title {
      font-family: var(--font-title, 'Playfair Display', serif);
      font-size: clamp(1.25rem, 2.6vw, 1.9rem);
      font-weight: 700;
      margin: 0;
      color: var(--livre-ink, #121212);
      outline: none;
      line-height: 1.15;
    }

    .single-stage {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 1;
      min-height: 0;
      margin-bottom: clamp(0.3rem, 0.8vh, 0.5rem);
    }

    .single-frame {
      position: relative;
      width: 100%;
      max-width: 820px;
      max-height: clamp(280px, 58vh, 500px);
      aspect-ratio: 16 / 9;
      background: #EFEBE4;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      border: 3px double var(--livre-encre, #121212);
      box-shadow: 6px 6px 0 var(--livre-encre, #121212);
      animation: plateEntrance 400ms cubic-bezier(0.16, 1, 0.3, 1) both;
      transition: transform 200ms ease, box-shadow 200ms ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 8px 8px 0 var(--livre-encre, #121212);
      }
    }

    .single-frame.reduced-motion {
      animation: none !important;
      transition: none !important;

      * {
        animation: none !important;
        transition: none !important;
      }
    }

    .single-img {
      width: 100%;
      height: 100%;
      object-fit: cover; object-position: center;
      display: block;
      animation: imgMangaReveal 550ms cubic-bezier(0.16, 1, 0.3, 1) both;
    }

    .single-cartouche {
      position: absolute;
      top: 12px;
      left: 12px;
      max-width: 80%;
      z-index: 2;
      background: rgba(250, 248, 244, 0.92);
      border: 2px solid var(--livre-encre, #121212);
      box-shadow: 2px 2px 0 var(--livre-encre, #121212);
      padding: 0.3rem 0.7rem;
      font-family: var(--font-display, 'Archivo', sans-serif);
      font-weight: 800;
      font-size: clamp(0.7rem, 1.15vw, 0.84rem);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--livre-encre, #121212);
      animation: cartoucheSlideIn 420ms cubic-bezier(0.16, 1, 0.3, 1) 140ms both;

      ::ng-deep .accent-rose {
        color: #A63A60 !important;
      }
    }

    .single-speech {
      position: absolute;
      bottom: 12px;
      right: 12px;
      max-width: 72%;
      z-index: 2;
      background: rgba(255, 255, 255, 0.94);
      border: 2px solid var(--livre-encre, #121212);
      border-radius: 12px;
      box-shadow: 3px 3px 0 var(--livre-encre, #121212);
      padding: 0.35rem 0.8rem;
      animation: bubblePopIn 450ms cubic-bezier(0.16, 1, 0.3, 1) 260ms both;

      p {
        margin: 0;
        font-family: var(--font-body, 'Inter', sans-serif);
        font-size: clamp(0.78rem, 1.15vw, 0.9rem);
        font-style: italic;
        color: var(--livre-encre, #121212);
        line-height: 1.35;
      }
    }

    .single-hint {
      text-align: center;
      font-family: var(--font-body, 'Inter', sans-serif);
      font-size: 0.7rem;
      color: var(--livre-ink-secondary, #737373);
      animation: fadeInSlow 500ms ease 380ms both;
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
        box-shadow: 0 0 0 var(--livre-encre, #121212);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
        box-shadow: 6px 6px 0 var(--livre-encre, #121212);
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

    @keyframes bubblePopIn {
      0% {
        opacity: 0;
        transform: translateY(8px) scale(0.95);
      }
      70% {
        transform: translateY(-2px) scale(1.01);
      }
      100% {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    @keyframes fadeInSlow {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `]
})
export class PageCaseSimpleComponent {
  @Input({ required: true }) chapter!: string;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) imageSrc!: string;
  @Input({ required: true }) altText!: string;
  @Input({ required: true }) cartoucheHtml!: string;
  @Input() bulleText?: string;
  @Input() reducedMotion = false;

  @Output() advance = new EventEmitter<void>();

  imgError = false;
}


