import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../shared/components/icon/icon.component';

export interface GalleryCaseItem {
  id: number;
  image: string;
  cartoucheHtml: string;
  desc: string;
  alt: string;
}

@Component({
  selector: 'app-page-galerie-storyboard',
  standalone: true,
  imports: [CommonModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="galerie-container" aria-labelledby="galerie-title">
      <header class="galerie-header">
        <span class="manga-cartouche">LE PARCOURS DE MOHAMED · 3×3</span>
        <h2 id="galerie-title" class="manga-title">L'Histoire Complète en Neuf Tableaux</h2>
        <p class="galerie-desc">
          De l'angoisse des premières candidatures jusqu'à la signature de son offre de stage : 
          cliquez sur n'importe quelle case pour zoomer sur son cartouche.
        </p>
      </header>

      <!-- Grille 3x3 fidèle au storyboard -->
      <div class="manga-grid-3x3" role="region" aria-label="Planche 9 cases de Mohamed">
        @for (item of cases; track item.id) {
          <div
            class="manga-cell"
            [class.selected]="selectedCase()?.id === item.id"
            tabindex="0"
            role="button"
            [attr.aria-label]="'Case ' + item.id + ' : ' + item.desc"
            (click)="selectCase(item)"
            (keydown.enter)="selectCase(item)">
            <div class="cell-frame">
              <img
                [src]="item.image"
                [alt]="item.alt"
                width="382"
                height="218"
                loading="lazy"
                class="cell-img" />
              <span class="cell-num">{{ item.id }}</span>
            </div>
            <div class="cell-cartouche" [innerHTML]="item.cartoucheHtml"></div>
          </div>
        }
      </div>

      <!-- Détail zoomé au bas de l'écran si sélectionné -->
      @if (selectedCase(); as sel) {
        <aside class="zoom-banner" aria-live="polite">
          <span class="zoom-badge">TABLEAU {{ sel.id }}</span>
          <div class="zoom-cartouche" [innerHTML]="sel.cartoucheHtml"></div>
          <span class="zoom-desc">{{ sel.desc }}</span>
        </aside>
      }
    </article>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    .galerie-container {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      max-width: 1060px;
      margin: 0 auto;
      padding: clamp(0.4rem, 1.5vh, 1rem) 1rem;
      box-sizing: border-box;
      user-select: none;
    }

    .galerie-header {
      text-align: center;
      margin-bottom: clamp(0.35rem, 1vh, 0.65rem);

      .manga-cartouche {
        display: inline-block;
        font-family: var(--font-display, 'Archivo', sans-serif);
        font-size: 0.68rem;
        font-weight: 800;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        background: var(--livre-cartouche-bg, #FAF8F4);
        border: 2px solid var(--livre-encre, #121212);
        color: var(--livre-encre, #121212);
        padding: 0.2rem 0.6rem;
        box-shadow: 2px 2px 0 var(--livre-encre, #121212);
        margin-bottom: 0.25rem;
      }

      .manga-title {
        font-family: var(--font-title, 'Playfair Display', serif);
        font-size: clamp(1.2rem, 2.4vw, 1.7rem);
        color: var(--livre-encre, #121212);
        margin: 0 0 0.25rem;
        letter-spacing: -0.02em;
        line-height: 1.15;
      }

      .galerie-desc {
        font-family: var(--font-body, 'Inter', sans-serif);
        font-size: clamp(0.76rem, 1.2vw, 0.85rem);
        color: var(--livre-secondaire, #3A3A3A);
        max-width: 640px;
        margin: 0 auto;
        line-height: 1.3;
      }
    }

    .manga-grid-3x3 {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(3, 1fr);
      gap: clamp(6px, 1.2vh, 10px);
      flex: 1;
      min-height: 0;
      max-height: clamp(340px, 58vh, 500px);
      background: var(--livre-cartouche-bg, #FAF8F4);
      border: 3px double var(--livre-encre, #121212);
      box-shadow: 5px 5px 0 var(--livre-encre, #121212);
      padding: clamp(6px, 1.2vh, 10px);
    }

    .manga-cell {
      display: flex;
      flex-direction: column;
      border: 1.5px solid var(--livre-encre, #121212);
      background: #EFEBE4;
      overflow: hidden;
      cursor: pointer;
      position: relative;
      transition: transform 0.15s ease, box-shadow 0.15s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 3px 3px 0 var(--livre-encre, #121212);
      }

      &:focus-visible {
        outline: 3px solid #A63A60 !important;
        outline-offset: 1px;
      }

      &.selected {
        border-color: #A63A60;
        box-shadow: 3px 3px 0 #A63A60;
      }
    }

    .cell-frame {
      position: relative;
      flex: 1;
      min-height: 0;
      overflow: hidden;
      background: #EFEBE4;

      .cell-img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        display: block;
      }

      .cell-num {
        position: absolute;
        top: 3px;
        left: 4px;
        font-family: var(--font-display, 'Archivo', sans-serif);
        font-size: 0.65rem;
        font-weight: 900;
        background: rgba(18, 18, 18, 0.85);
        color: #EFEBE4;
        padding: 1px 4px;
        border-radius: 2px;
        line-height: 1;
      }
    }

    .cell-cartouche {
      background: #FAF8F4;
      border-top: 1.5px solid var(--livre-encre, #121212);
      padding: 2px 6px;
      font-family: var(--font-display, 'Archivo', sans-serif);
      font-size: clamp(0.55rem, 0.9vw, 0.68rem);
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.02em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: var(--livre-encre, #121212);

      ::ng-deep .accent-rose {
        color: #A63A60 !important;
      }
    }

    .zoom-banner {
      margin-top: 0.4rem;
      background: #FAF8F4;
      border: 2px solid var(--livre-encre, #121212);
      box-shadow: 2px 2px 0 var(--livre-encre, #121212);
      padding: 0.35rem 0.75rem;
      display: flex;
      align-items: center;
      gap: 0.65rem;

      .zoom-badge {
        font-family: var(--font-display, 'Archivo', sans-serif);
        font-size: 0.68rem;
        font-weight: 800;
        background: var(--livre-encre, #121212);
        color: #EFEBE4;
        padding: 0.15rem 0.4rem;
        border-radius: 2px;
      }

      .zoom-cartouche {
        font-family: var(--font-display, 'Archivo', sans-serif);
        font-size: 0.76rem;
        font-weight: 800;
        text-transform: uppercase;
        color: var(--livre-encre, #121212);

        ::ng-deep .accent-rose {
          color: #A63A60 !important;
        }
      }

      .zoom-desc {
        font-family: var(--font-body, 'Inter', sans-serif);
        font-size: 0.75rem;
        color: var(--livre-secondaire, #3A3A3A);
        margin-left: auto;
      }
    }
  `]
})
export class PageGalerieStoryboardComponent {
  readonly cases: GalleryCaseItem[] = [
    {
      id: 1,
      image: 'assets/livre/case-1.jpg',
      cartoucheHtml: 'CANDIDATURE APRÈS <span class="accent-rose">CANDIDATURE</span>.',
      desc: 'Nuits de code et accumulation de candidatures sans réponse.',
      alt: 'Mohamed seul à son bureau la nuit.'
    },
    {
      id: 2,
      image: 'assets/livre/case-2.jpg',
      cartoucheHtml: 'ENFIN : UN <span class="accent-rose">ENTRETIEN</span>.',
      desc: 'Lueur d’espoir : première convocation reçue sur son smartphone.',
      alt: 'Mohamed souriant devant son téléphone.'
    },
    {
      id: 3,
      image: 'assets/livre/case-3.jpg',
      cartoucheHtml: 'DES PAGES, DES NOTES… ET AUCUN <span class="accent-rose">RETOUR</span>.',
      desc: 'Surcharge mentale et révisions solitaires anxiogènes.',
      alt: 'Mohamed plongé dans ses notes et ses CVs.'
    },
    {
      id: 4,
      image: 'assets/livre/case-4.jpg',
      cartoucheHtml: 'LES <span class="accent-rose">MOTS</span> S\'ÉCHAPPENT.',
      desc: 'Tension paralysante face aux recruteurs en entretien.',
      alt: 'Mohamed assis tendu face aux deux recruteurs.'
    },
    {
      id: 5,
      image: 'assets/livre/case-5.jpg',
      cartoucheHtml: '« NOUS AVONS RETENU UN AUTRE <span class="accent-rose">PROFIL</span>. »',
      desc: 'Déception digne sous la pluie après un refus.',
      alt: 'Mohamed dehors sous la pluie lisant son message.'
    },
    {
      id: 6,
      image: 'assets/livre/case-6.jpg',
      cartoucheHtml: 'ET SI ON S\'<span class="accent-rose">ENTRAÎNAIT</span> AVANT ?',
      desc: 'Déclic : découverte d’une préparation guidée et bienveillante.',
      alt: 'Mohamed devant l’affiche violette urbaine.'
    },
    {
      id: 7,
      image: 'assets/livre/case-7.jpg',
      cartoucheHtml: 'UNE <span class="accent-rose">QUESTION</span> À LA FOIS.',
      desc: 'Dojo IA : simulations interactives dans le calme matinal.',
      alt: 'Mohamed face à l’avatar IA recruteur sur son PC.'
    },
    {
      id: 8,
      image: 'assets/livre/case-8.jpg',
      cartoucheHtml: 'CETTE FOIS, LES MOTS SONT <span class="accent-rose">LÀ</span>.',
      desc: 'Assurance retrouvée : échange confiant et structuré avec le jury.',
      alt: 'Mohamed répondant calmement et avec le sourire.'
    },
    {
      id: 9,
      image: 'assets/livre/case-9.jpg',
      cartoucheHtml: 'VOTRE POTENTIEL, PAS VOTRE <span class="accent-rose">STRESS</span>.',
      desc: 'Victoire : signature de l’offre de stage PFE décrochée.',
      alt: 'Mohamed signant son offre validée avec le recruteur.'
    }
  ];

  readonly selectedCase = signal<GalleryCaseItem | null>(this.cases[5]);

  selectCase(item: GalleryCaseItem): void {
    this.selectedCase.set(item);
  }
}
