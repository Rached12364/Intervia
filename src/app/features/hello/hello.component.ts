import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  OnInit,
  OnDestroy,
  HostListener,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { SommaireModalComponent } from './components/sommaire-modal.component';
import { DemoDrawerComponent } from './components/demo-drawer.component';
import { LIVRE_PAGES, LivrePageDefinition } from './models/livre-page.model';
import { AudioAmbientService } from './services/audio-ambient.service';

// Standalone Pages
import { Page1SasComponent } from './pages/page1-sas.component';
import { PageCaseSimpleComponent } from './pages/page-case-simple.component';
import { Page3RegardComponent } from './pages/page3-regard.component';
import { Page11TriompheComponent } from './pages/page11-triomphe.component';
import { Page12AppelComponent } from './pages/page12-appel.component';

@Component({
  selector: 'app-hello',
  standalone: true,
  imports: [
    CommonModule,
    LogoComponent,
    IconComponent,
    SommaireModalComponent,
    DemoDrawerComponent,
    Page1SasComponent,
    PageCaseSimpleComponent,
    Page3RegardComponent,
    Page11TriompheComponent,
    Page12AppelComponent
  ],
  templateUrl: './hello.component.html',
  styleUrl: './hello.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HelloComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  readonly audioService = inject(AudioAmbientService);

  readonly pages = LIVRE_PAGES;
  readonly currentPage = signal<number>(1);
  readonly showSommaire = signal<boolean>(false);
  readonly showDemoDrawer = signal<boolean>(false);
  readonly reducedMotion = signal<boolean>(false);

  readonly currentPageDef = computed<LivrePageDefinition>(() => {
    const pageNum = this.currentPage();
    return this.pages.find(p => p.pageNumber === pageNum) || this.pages[0];
  });

  readonly isFirstPage = computed(() => this.currentPage() === 1);
  readonly isLastPage = computed(() => this.currentPage() === this.pages.length);

  // Annonce accessible
  readonly liveAnnouncement = computed(() => {
    const def = this.currentPageDef();
    return `Page ${def.pageNumber} sur ${this.pages.length} : ${def.chapterTitle} - ${def.pageTitle}`;
  });

  ngOnInit(): void {
    // Check system prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia) {
      const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      this.reducedMotion.set(motionQuery.matches);
    }

    // Hash sync
    this.readHash();
    window.addEventListener('popstate', this.onPopState);
  }

  ngOnDestroy(): void {
    window.removeEventListener('popstate', this.onPopState);
    this.audioService.stop();
  }

  private onPopState = (): void => {
    this.readHash();
  };

  private readHash(): void {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash;
    if (!hash) {
      this.goToPage(1, false);
      return;
    }
    const found = this.pages.find(p => p.hash === hash);
    if (found) {
      this.currentPage.set(found.pageNumber);
      this.focusPageTitle();
    } else {
      this.goToPage(1, false);
    }
  }

  goToPage(pageNum: number, updateHash = true): void {
    const target = Math.min(this.pages.length, Math.max(1, pageNum));
    this.currentPage.set(target);

    const def = this.pages.find(p => p.pageNumber === target);
    if (def && updateHash && typeof window !== 'undefined') {
      window.history.pushState(null, '', def.hash);
    }

    this.focusPageTitle();
  }

  nextPage(): void {
    if (!this.isLastPage()) {
      this.goToPage(this.currentPage() + 1);
    }
  }

  prevPage(): void {
    if (!this.isFirstPage()) {
      this.goToPage(this.currentPage() - 1);
    }
  }

  toggleSommaire(): void {
    this.showSommaire.update(v => !v);
  }

  toggleDemoDrawer(): void {
    this.showDemoDrawer.update(v => !v);
  }

  toggleReducedMotion(): void {
    this.reducedMotion.update(v => !v);
  }

  private focusPageTitle(): void {
    setTimeout(() => {
      const heading = document.querySelector('article h2, article h1') as HTMLElement;
      if (heading) {
        heading.setAttribute('tabindex', '-1');
        heading.focus();
      }
    }, 50);
  }

  @HostListener('window:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    // If modal or drawer is open, let Escape close it
    if (event.key === 'Escape') {
      if (this.showSommaire()) {
        this.showSommaire.set(false);
        event.preventDefault();
        return;
      }
      if (this.showDemoDrawer()) {
        this.showDemoDrawer.set(false);
        event.preventDefault();
        return;
      }
      // Open sommaire with Escape if neither is open
      this.showSommaire.set(true);
      event.preventDefault();
      return;
    }

    // Ignore if focus is in an input, textarea or button that is not container
    const activeEl = document.activeElement;
    const tagName = activeEl?.tagName.toLowerCase();
    const isControl = tagName === 'input' || tagName === 'textarea' || tagName === 'select';
    if (isControl) return;

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.nextPage();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.prevPage();
    } else if (event.key === ' ' || event.key === 'Enter') {
      // Space or Enter on non-interactive area advances
      if (tagName !== 'button' && tagName !== 'a') {
        event.preventDefault();
        this.nextPage();
      }
    }
  }
}
