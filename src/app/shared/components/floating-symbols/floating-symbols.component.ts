import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ElementRef,
  ViewChild,
  OnInit,
  AfterViewInit,
  OnDestroy,
  NgZone,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent, IconName } from '../icon/icon.component';

export interface FloatingSymbolDef {
  id: number;
  icon: IconName | string;
  isLogoSymbol?: boolean;
  label: string;
  size: number;
  baseOpacity: number;
  depth: number; // 0 (loin/lent) à 1 (proche/rapide)
  // États physiques
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetVx: number;
  targetVy: number;
  rotation: number;
  vRot: number;
  scale: number;
  baseScale: number;
  bursting: boolean;
  burstTimer?: any;
}

export interface FloatingLabel {
  id: number;
  text: string;
  x: number;
  y: number;
}

@Component({
  selector: 'app-floating-symbols',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './floating-symbols.component.html',
  styleUrl: './floating-symbols.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FloatingSymbolsComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() stressLevel = 8;
  @Input() reducedMotion = false;
  @Input() isPlaying = true;
  @Input() isBreathingActive = false;

  @ViewChild('container') containerRef?: ElementRef<HTMLElement>;

  symbols = signal<FloatingSymbolDef[]>([]);
  activeLabels = signal<FloatingLabel[]>([]);

  private animFrameId: number | null = null;
  private width = 1200;
  private height = 700;
  private mouseX = -1000;
  private mouseY = -1000;
  private resizeObserver?: ResizeObserver;
  private intersectionObserver?: IntersectionObserver;
  private isVisibleInViewport = true;
  private symbolElements: HTMLElement[] = [];

  constructor(private ngZone: NgZone, private hostEl: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    this.initSymbolsList();
  }

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;

    this.updateContainerDimensions();

    // IntersectionObserver pour pause automatique si hors écran
    if (typeof IntersectionObserver !== 'undefined') {
      this.intersectionObserver = new IntersectionObserver(([entry]) => {
        this.isVisibleInViewport = entry.isIntersecting;
        if (!entry.isIntersecting) {
          this.stopLoop();
        } else if (this.shouldAnimate()) {
          this.startLoop();
        }
      }, { threshold: 0.05 });
      this.intersectionObserver.observe(this.hostEl.nativeElement);
    }

    // ResizeObserver pour adapter le nombre de symboles et les bornes
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        const prevWidth = this.width;
        this.updateContainerDimensions();
        if ((prevWidth < 1024 && this.width >= 1024) || (prevWidth >= 1024 && this.width < 1024)) {
          this.initSymbolsList();
        }
      });
      this.resizeObserver.observe(this.hostEl.nativeElement);
    }

    // Écouteur de visibilité de l'onglet
    document.addEventListener('visibilitychange', this.onVisibilityChange);

    // Initialiser les éléments DOM et démarrer la boucle hors de la zone Angular
    setTimeout(() => {
      this.cacheSymbolElements();
      if (this.shouldAnimate()) {
        this.startLoop();
      }
    }, 50);
  }

  ngOnDestroy(): void {
    this.stopLoop();
    document.removeEventListener('visibilitychange', this.onVisibilityChange);
    this.resizeObserver?.disconnect();
    this.intersectionObserver?.disconnect();
  }

  private onVisibilityChange = (): void => {
    if (document.visibilityState === 'hidden') {
      this.stopLoop();
    } else if (this.shouldAnimate()) {
      this.startLoop();
    }
  };

  private shouldAnimate(): boolean {
    return (
      this.isPlaying &&
      !this.reducedMotion &&
      this.isVisibleInViewport &&
      (typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    );
  }

  private updateContainerDimensions(): void {
    if (this.containerRef?.nativeElement) {
      const rect = this.containerRef.nativeElement.getBoundingClientRect();
      this.width = rect.width || window.innerWidth || 1200;
      this.height = rect.height || window.innerHeight || 700;
    }
  }

  private initSymbolsList(): void {
    const isNarrow = typeof window !== 'undefined' && window.innerWidth < 1024;
    const count = isNarrow ? 8 : 16;

    const allDefs: Omit<FloatingSymbolDef, 'id' | 'x' | 'y' | 'vx' | 'vy' | 'targetVx' | 'targetVy' | 'rotation' | 'vRot' | 'scale' | 'baseScale' | 'bursting'>[] = [
      { icon: 'logo_symbol', isLogoSymbol: true, label: 'IntervIA', size: 48, baseOpacity: 0.32, depth: 0.9 },
      { icon: 'cv_check', label: 'CV certifié', size: 40, baseOpacity: 0.28, depth: 0.75 },
      { icon: 'chat_bubble', label: 'Entretien RH', size: 36, baseOpacity: 0.24, depth: 0.6 },
      { icon: 'videocam', label: 'Simulation vidéo', size: 44, baseOpacity: 0.30, depth: 0.8 },
      { icon: 'mic', label: 'Analyse vocale', size: 32, baseOpacity: 0.20, depth: 0.5 },
      { icon: 'code', label: 'Test technique', size: 42, baseOpacity: 0.29, depth: 0.78 },
      { icon: 'badge', label: 'Badge d\'aptitude', size: 38, baseOpacity: 0.25, depth: 0.65 },
      { icon: 'work', label: 'Offres partenaires', size: 40, baseOpacity: 0.26, depth: 0.7 },
      { icon: 'school', label: 'Stage PFE & Emploi', size: 36, baseOpacity: 0.22, depth: 0.55 },
      { icon: 'score_bars', label: 'Score & Évolution', size: 34, baseOpacity: 0.21, depth: 0.52 },
      { icon: 'lightbulb', label: 'Pistes bienveillantes', size: 36, baseOpacity: 0.23, depth: 0.58 },
      { icon: 'timer', label: 'Gestion du temps', size: 32, baseOpacity: 0.18, depth: 0.45 },
      { icon: 'sparkles', label: 'Intelligence Artificielle', size: 38, baseOpacity: 0.28, depth: 0.72 },
      { icon: 'chip', label: 'Algorithme d\'analyse', size: 34, baseOpacity: 0.20, depth: 0.48 },
      { icon: 'network_nodes', label: 'Compétences connectées', size: 36, baseOpacity: 0.24, depth: 0.62 },
      { icon: 'circuit_brain', label: 'Diagnostic personnalisé', size: 44, baseOpacity: 0.31, depth: 0.85 },
      { icon: 'audio_wave', label: 'Débit & Clarté', size: 32, baseOpacity: 0.19, depth: 0.46 },
      { icon: 'robot', label: 'Coach virtuel', size: 36, baseOpacity: 0.22, depth: 0.54 }
    ];

    const selected = allDefs.slice(0, count);

    const generated: FloatingSymbolDef[] = selected.map((item, idx) => {
      // Répartition harmonieuse sur l'espace
      const col = idx % 4;
      const row = Math.floor(idx / 4);
      const baseX = (col / 4) * this.width + (Math.random() * 0.15 * this.width);
      const baseY = (row / (count / 4)) * this.height + (Math.random() * 0.15 * this.height);

      const vx = (Math.random() - 0.5) * 0.4;
      const vy = (Math.random() - 0.5) * 0.4;

      return {
        ...item,
        id: idx,
        x: Math.max(20, Math.min(this.width - 60, baseX)),
        y: Math.max(20, Math.min(this.height - 60, baseY)),
        vx,
        vy,
        targetVx: vx,
        targetVy: vy,
        rotation: (Math.random() - 0.5) * 30,
        vRot: (Math.random() - 0.5) * 0.15,
        scale: 1,
        baseScale: 1,
        bursting: false
      };
    });

    this.symbols.set(generated);
  }

  private cacheSymbolElements(): void {
    if (!this.containerRef?.nativeElement) return;
    const els = this.containerRef.nativeElement.querySelectorAll<HTMLElement>('.floating-symbol');
    this.symbolElements = Array.from(els);
  }

  // -------------------------------------------------------------
  // BOUCLE RAF HORS ZONE ANGULAR (OPTIMISATION MAXIMALE)
  // -------------------------------------------------------------
  private startLoop(): void {
    if (this.animFrameId !== null) return;

    this.ngZone.runOutsideAngular(() => {
      const step = () => {
        this.updatePhysics();
        this.animFrameId = requestAnimationFrame(step);
      };
      this.animFrameId = requestAnimationFrame(step);
    });
  }

  private stopLoop(): void {
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
  }

  private updatePhysics(): void {
    if (!this.shouldAnimate()) return;

    const syms = this.symbols();
    if (!syms.length || !this.symbolElements.length) return;

    // Facteur de vitesse selon le niveau de stress (de 0.4x à 1.5x)
    let speedMult = 0.4 + (this.stressLevel / 10) * 1.1;

    // En mode respiration, vitesse ralentie à 0.2x
    if (this.isBreathingActive) {
      speedMult = 0.2;
    }

    const centerX = this.width / 2;
    const centerY = this.height / 2;
    // Zone centrale où se trouve le titre et les cartes à éviter
    const centerAvoidRadiusX = 280;
    const centerAvoidRadiusY = 220;

    const elements = this.symbolElements;

    for (let i = 0; i < syms.length; i++) {
      const s = syms[i];
      const el = elements[i];
      if (!el || s.bursting) continue;

      // 1. Dérive aléatoire douce
      if (Math.random() < 0.015) {
        s.targetVx = (Math.random() - 0.5) * 0.5;
        s.targetVy = (Math.random() - 0.5) * 0.5;
      }
      s.vx += (s.targetVx - s.vx) * 0.02;
      s.vy += (s.targetVy - s.vy) * 0.02;

      // 2. Évitement de la souris (< 120 px)
      const dxMouse = s.x - this.mouseX;
      const dyMouse = s.y - this.mouseY;
      const distMouseSq = dxMouse * dxMouse + dyMouse * dyMouse;
      const mouseRadius = 120;
      if (distMouseSq < mouseRadius * mouseRadius && distMouseSq > 1) {
        const dist = Math.sqrt(distMouseSq);
        const force = (1 - dist / mouseRadius) * 1.2;
        s.x += (dxMouse / dist) * force * 3;
        s.y += (dyMouse / dist) * force * 3;
      }

      // 3. Évitement doux de la zone centrale
      const dxCenter = s.x - centerX;
      const dyCenter = s.y - centerY;
      if (
        Math.abs(dxCenter) < centerAvoidRadiusX &&
        Math.abs(dyCenter) < centerAvoidRadiusY
      ) {
        s.vx += (dxCenter > 0 ? 0.04 : -0.04);
        s.vy += (dyCenter > 0 ? 0.04 : -0.04);
      }

      // 4. Déplacement
      s.x += s.vx * (0.8 + s.depth * 0.4) * speedMult;
      s.y += s.vy * (0.8 + s.depth * 0.4) * speedMult;
      s.rotation += s.vRot * speedMult;

      // 5. Wrap aux bords
      const pad = 40;
      if (s.x < -pad) s.x = this.width + pad - 10;
      else if (s.x > this.width + pad) s.x = -pad + 10;
      if (s.y < -pad) s.y = this.height + pad - 10;
      else if (s.y > this.height + pad) s.y = -pad + 10;

      // 6. Rendu direct transform: translate3d
      el.style.transform = `translate3d(${s.x.toFixed(1)}px, ${s.y.toFixed(1)}px, 0) rotate(${s.rotation.toFixed(1)}deg) scale(${s.scale})`;
    }
  }

  // -------------------------------------------------------------
  // GESTION SOURIS & INTERACTION CLIC
  // -------------------------------------------------------------
  onMouseMove(e: MouseEvent): void {
    if (!this.containerRef?.nativeElement) return;
    const rect = this.containerRef.nativeElement.getBoundingClientRect();
    this.mouseX = e.clientX - rect.left;
    this.mouseY = e.clientY - rect.top;
  }

  onMouseLeave(): void {
    this.mouseX = -1000;
    this.mouseY = -1000;
  }

  onSymbolClick(symbol: FloatingSymbolDef, event: MouseEvent): void {
    event.stopPropagation();
    if (symbol.bursting) return;

    // Déclencher l'éclatement doux
    symbol.bursting = true;
    symbol.scale = 0;

    // Afficher l'étiquette pendant 1.5s
    const labelId = Date.now() + Math.random();
    const newLabel: FloatingLabel = {
      id: labelId,
      text: symbol.label,
      x: symbol.x,
      y: Math.max(30, symbol.y - 20)
    };

    this.activeLabels.update(list => [...list, newLabel]);

    setTimeout(() => {
      this.activeLabels.update(list => list.filter(l => l.id !== labelId));
    }, 1500);

    // Retour progressif du symbole après 3 secondes
    setTimeout(() => {
      symbol.bursting = false;
      symbol.scale = symbol.baseScale;
    }, 3000);
  }
}
