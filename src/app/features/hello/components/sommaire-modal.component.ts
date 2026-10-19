import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { LIVRE_PAGES, LivrePageDefinition } from '../models/livre-page.model';

@Component({
  selector: 'app-sommaire-modal',
  standalone: true,
  imports: [CommonModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div 
      class="sommaire-backdrop" 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="sommaire-title"
      (click)="close.emit()">
      <div 
        class="sommaire-card" 
        (click)="$event.stopPropagation()">
        
        <header class="sommaire-header">
          <div>
            <span class="sommaire-tag">SOMMAIRE INTERACTIF</span>
            <h2 id="sommaire-title" class="sommaire-title">Les 4 Chapitres d'IntervIA</h2>
          </div>
          <button 
            type="button" 
            class="sommaire-close-btn"
            (click)="close.emit()" 
            aria-label="Fermer le sommaire">
            <app-icon name="check" [size]="18" aria-hidden="true" />
            <span>Fermer (Échap)</span>
          </button>
        </header>

        <div class="sommaire-chapters">
          <!-- Chapitre 1 -->
          <div class="chapter-block">
            <h3 class="chapter-title">Chapitre 1 : L'orage mental</h3>
            <ul class="chapter-list">
              @for (p of getPagesForChapter(1); track p.pageNumber) {
                <li>
                  <button 
                    type="button" 
                    class="page-link"
                    [class.page-link--active]="currentPage === p.pageNumber"
                    (click)="selectPage(p.pageNumber)">
                    <span class="page-num">P{{ p.pageNumber }}</span>
                    <span class="page-name">{{ p.pageTitle }}</span>
                  </button>
                </li>
              }
            </ul>
          </div>

          <!-- Chapitre 2 -->
          <div class="chapter-block">
            <h3 class="chapter-title">Chapitre 2 : Du stress au calme</h3>
            <ul class="chapter-list">
              @for (p of getPagesForChapter(2); track p.pageNumber) {
                <li>
                  <button 
                    type="button" 
                    class="page-link"
                    [class.page-link--active]="currentPage === p.pageNumber"
                    (click)="selectPage(p.pageNumber)">
                    <span class="page-num">P{{ p.pageNumber }}</span>
                    <span class="page-name">{{ p.pageTitle }}</span>
                  </button>
                </li>
              }
            </ul>
          </div>

          <!-- Chapitre 3 -->
          <div class="chapter-block">
            <h3 class="chapter-title">Chapitre 3 : La restitution</h3>
            <ul class="chapter-list">
              @for (p of getPagesForChapter(3); track p.pageNumber) {
                <li>
                  <button 
                    type="button" 
                    class="page-link"
                    [class.page-link--active]="currentPage === p.pageNumber"
                    (click)="selectPage(p.pageNumber)">
                    <span class="page-num">P{{ p.pageNumber }}</span>
                    <span class="page-name">{{ p.pageTitle }}</span>
                  </button>
                </li>
              }
            </ul>
          </div>

          <!-- Chapitre 4 -->
          <div class="chapter-block">
            <h3 class="chapter-title">Chapitre 4 : Épilogue</h3>
            <ul class="chapter-list">
              @for (p of getPagesForChapter(4); track p.pageNumber) {
                <li>
                  <button 
                    type="button" 
                    class="page-link"
                    [class.page-link--active]="currentPage === p.pageNumber"
                    (click)="selectPage(p.pageNumber)">
                    <span class="page-num">P{{ p.pageNumber }}</span>
                    <span class="page-name">{{ p.pageTitle }}</span>
                  </button>
                </li>
              }
            </ul>
          </div>
        </div>

        <footer class="sommaire-footer">
          <button 
            type="button" 
            class="skip-btn" 
            (click)="selectPage(18)">
            <span>Passer l'histoire (Accéder directement à l'inscription) →</span>
          </button>
        </footer>
      </div>
    </div>
  `,
  styles: [`
    .sommaire-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(18, 18, 18, 0.7);
      backdrop-filter: blur(4px);
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
    }

    .sommaire-card {
      background: #FAF8F4;
      border: 3px solid #121212;
      box-shadow: 8px 8px 0 #121212;
      width: 100%;
      max-width: 680px;
      max-height: 85dvh;
      overflow-y: auto;
      border-radius: 6px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      position: relative;
    }

    .sommaire-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      border-bottom: 2px solid #121212;
      padding-bottom: 14px;
    }

    .sommaire-tag {
      font-family: 'Archivo', sans-serif;
      font-weight: 800;
      font-size: 0.6875rem;
      letter-spacing: 0.1em;
      color: #A63A60;
    }

    .sommaire-title {
      font-family: 'Playfair Display', serif;
      font-size: 1.5rem;
      color: #121212;
      margin: 4px 0 0 0;
    }

    .sommaire-close-btn {
      background: #EFEBE4;
      border: 2px solid #121212;
      font-family: 'Archivo', sans-serif;
      font-weight: 800;
      font-size: 0.75rem;
      text-transform: uppercase;
      padding: 6px 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      box-shadow: 2px 2px 0 #121212;

      &:hover {
        transform: translate(-1px, -1px);
        box-shadow: 3px 3px 0 #121212;
      }
    }

    .sommaire-chapters {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 16px;
    }

    .chapter-block {
      background: #EFEBE4;
      border: 2px solid #121212;
      padding: 12px;
      border-radius: 4px;
    }

    .chapter-title {
      font-family: 'Archivo', sans-serif;
      font-weight: 800;
      font-size: 0.8125rem;
      text-transform: uppercase;
      color: #121212;
      margin: 0 0 8px 0;
      padding-bottom: 4px;
      border-bottom: 1px solid rgba(18, 18, 18, 0.2);
    }

    .chapter-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .page-link {
      width: 100%;
      text-align: left;
      background: transparent;
      border: 1px solid transparent;
      padding: 6px 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: 'Inter', sans-serif;
      font-size: 0.8125rem;
      color: #121212;
      border-radius: 3px;

      &:hover {
        background: #FAF8F4;
        border-color: #121212;
      }

      &--active {
        background: #121212;
        color: #EFEBE4;
        font-weight: 600;

        .page-num {
          color: #C97B96;
        }
      }
    }

    .page-num {
      font-family: 'Archivo', sans-serif;
      font-weight: 800;
      font-size: 0.6875rem;
      color: #A63A60;
    }

    .page-name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .sommaire-footer {
      border-top: 2px solid #121212;
      padding-top: 14px;
      display: flex;
      justify-content: flex-end;
    }

    .skip-btn {
      background: transparent;
      border: none;
      color: #A63A60;
      font-family: 'Archivo', sans-serif;
      font-weight: 800;
      font-size: 0.8125rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      cursor: pointer;
      text-decoration: underline;

      &:hover {
        color: #121212;
      }
    }
  `]
})
export class SommaireModalComponent {
  @Input() currentPage = 1;
  @Output() close = new EventEmitter<void>();
  @Output() goToPage = new EventEmitter<number>();

  pages = LIVRE_PAGES;

  getPagesForChapter(chapterNum: number): LivrePageDefinition[] {
    return this.pages.filter(p => p.chapterNumber === chapterNum);
  }

  selectPage(page: number): void {
    this.goToPage.emit(page);
    this.close.emit();
  }
}
