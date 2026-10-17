import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  inject,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { BtnComponent } from '../../shared/components/btn/btn.component';
import { AuthService } from '../../core/services/auth.service';
import { HeroBackgroundComponent } from './hero-background/hero-background.component';

export interface SkillItem {
  id: string;
  label: string;
  category: 'tech' | 'soft';
}

export interface InterviewAnalysisPill {
  id: number;
  label: string;
  value: string;
  icon: string;
  tip: string;
}

@Component({
  selector: 'app-hello',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NavbarComponent,
    IconComponent,
    LogoComponent,
    BtnComponent,
    HeroBackgroundComponent
  ],
  templateUrl: './hello.component.html',
  styleUrl: './hello.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HelloComponent implements OnInit, AfterViewInit, OnDestroy {
  private router = inject(Router);
  private authService = inject(AuthService);

  @ViewChild('cardsGroup') cardsGroupRef?: ElementRef<HTMLElement>;
  @ViewChild('sliderTrack') sliderTrackRef?: ElementRef<HTMLElement>;
  @ViewChild('miniInterviewSection') miniInterviewSectionRef?: ElementRef<HTMLElement>;

  // -------------------------------------------------------------
  // ACCESSIBILITÉ & PRÉFÉRENCES (MÉMORISÉES)
  // -------------------------------------------------------------
  reducedMotion = signal<boolean>(false);
  isHeroBackgroundPlaying = signal<boolean>(true);

  // -------------------------------------------------------------
  // SECTION 1 : HÉROS & CURSEUR DE STRESS
  // -------------------------------------------------------------
  stressLevel = signal<number>(8); // De 10 (très stressé) à 0 (zen)
  isBreathingActive = signal<boolean>(false);
  breathingSecondsLeft = signal<number>(10);
  breathingPhase = signal<'inspire' | 'hold' | 'expire'>('inspire');
  private breathingTimer: any = null;

  // Sélection profil : 'stage' | 'emploi' | null
  selectedChoice = signal<'stage' | 'emploi' | null>(null);
  validationError = signal<string>('');
  isDemoLoading = signal<boolean>(false);

  // Formule de titre réactive selon le niveau de stress
  heroTitle = computed(() => {
    const s = this.stressLevel();
    if (s >= 7) return 'Le stress, on le connaît.';
    if (s >= 4) return 'On respire.';
    return 'Votre potentiel, pas votre stress.';
  });

  // -------------------------------------------------------------
  // SECTION 2 : L'IA VOUS ÉCOUTE (PASTILLES ROTATIVES)
  // -------------------------------------------------------------
  activePillIndex = signal<number>(0);
  isPillsPaused = signal<boolean>(false);
  private pillsTimer: any = null;

  readonly analysisPills: InterviewAnalysisPill[] = [
    {
      id: 0,
      label: 'Contact visuel',
      value: '88 % · Naturel et posé',
      icon: 'visibility',
      tip: 'Regard constant vers l\'interlocuteur sans fixité'
    },
    {
      id: 1,
      label: 'Débit vocal',
      value: '135 mots/min · Idéal',
      icon: 'graphic_eq',
      tip: 'Rythme posé permettant une compréhension immédiate'
    },
    {
      id: 2,
      label: 'Clarté des réponses',
      value: 'Méthode STAR détectée',
      icon: 'psychology',
      tip: 'Situation, Tâche, Action, Résultat bien articulés'
    },
    {
      id: 3,
      label: 'Posture & Présence',
      value: 'Droite et ouverte',
      icon: 'self_improvement',
      tip: 'Épaules détendues et gestuelle d\'ouverture'
    }
  ];

  // -------------------------------------------------------------
  // SECTION 3 : VOTRE PARCOURS EN UN CLIC (12 COMPÉTENCES)
  // -------------------------------------------------------------
  readonly availableSkills: SkillItem[] = [
    { id: 'angular', label: 'Angular', category: 'tech' },
    { id: 'typescript', label: 'TypeScript', category: 'tech' },
    { id: 'sql', label: 'SQL', category: 'tech' },
    { id: 'python', label: 'Python', category: 'tech' },
    { id: 'git', label: 'Git', category: 'tech' },
    { id: 'figma', label: 'Figma', category: 'tech' },
    { id: 'communication', label: 'Communication', category: 'soft' },
    { id: 'teamwork', label: 'Travail d\'équipe', category: 'soft' },
    { id: 'problem-solving', label: 'Résolution de problèmes', category: 'soft' },
    { id: 'docker', label: 'Docker', category: 'tech' },
    { id: 'nodejs', label: 'Node.js', category: 'tech' },
    { id: 'stress-mgmt', label: 'Gestion du stress', category: 'soft' }
  ];

  selectedSkills = signal<string[]>(['angular', 'typescript', 'communication']);

  selectedSkillsCount = computed(() => this.selectedSkills().length);

  // Calculs dynamiques du parcours selon les compétences sélectionnées
  rhQuestionsCount = computed(() => Math.max(3, 3 + Math.floor(this.selectedSkills().length * 0.5)));
  qcmQuestionsCount = computed(() => Math.max(5, 5 + this.selectedSkills().length * 2));
  techTasksCount = computed(() => Math.max(1, Math.min(4, Math.floor(this.selectedSkills().length * 0.4) + 1)));

  // -------------------------------------------------------------
  // SECTION 4 : MINI-ENTRETIEN DE 30 SECONDES (SIMULÉ)
  // -------------------------------------------------------------
  miniStep = signal<'select' | 'recording' | 'results'>('select');
  selectedQuestionId = signal<number | null>(null);
  miniTimerLeft = signal<number>(30);
  miniInterviewError = signal<string>('');
  private miniTimer: any = null;

  readonly interviewQuestions = [
    {
      id: 1,
      title: 'Parlez-moi d\'un projet dont vous êtes particulièrement fier.',
      category: 'Parcours & Réalisations'
    },
    {
      id: 2,
      title: 'Comment réagissez-vous face à un imprévu ou un blocage technique ?',
      category: 'Résolution & Sang-froid'
    },
    {
      id: 3,
      title: 'Qu\'est-ce qui vous motive le plus dans cette opportunité ?',
      category: 'Motivation & Alignement'
    }
  ];

  // -------------------------------------------------------------
  // SECTION 5 : DU CV AU OUI (OBSERVER DÉFILEMENT)
  // -------------------------------------------------------------
  activeTimelineStep = signal<number>(1);
  private observer?: IntersectionObserver;

  // -------------------------------------------------------------
  // CYCLE DE VIE
  // -------------------------------------------------------------
  ngOnInit(): void {
    // Récupérer la préférence mémorisée de réduction d'animation
    try {
      const saved = localStorage.getItem('intervia_reduced_motion');
      if (saved !== null) {
        this.reducedMotion.set(saved === 'true');
      } else if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        this.reducedMotion.set(true);
      }
    } catch {
      // Ignorer si localStorage restreint
    }

    // Lancer la rotation automatique des pastilles d'analyse IA
    this.startPillsRotation();
  }

  ngAfterViewInit(): void {
    this.setupTimelineObserver();
  }

  ngOnDestroy(): void {
    this.stopBreathing();
    this.stopPillsRotation();
    this.stopMiniTimer();
    this.observer?.disconnect();
  }

  // -------------------------------------------------------------
  // MÉTHODES SECTION 1 : HÉROS & STRESS
  // -------------------------------------------------------------
  toggleReducedMotion(): void {
    const nextVal = !this.reducedMotion();
    this.reducedMotion.set(nextVal);
    try {
      localStorage.setItem('intervia_reduced_motion', String(nextVal));
    } catch {
      // ignore
    }
  }

  toggleHeroBackground(): void {
    this.isHeroBackgroundPlaying.update(v => !v);
  }

  setStress(val: number): void {
    const clamped = Math.max(0, Math.min(10, val));
    this.stressLevel.set(clamped);
  }

  onSliderKeydown(event: KeyboardEvent): void {
    const current = this.stressLevel();
    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      event.preventDefault();
      this.setStress(current + 1);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      event.preventDefault();
      this.setStress(current - 1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      this.setStress(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      this.setStress(10);
    }
  }

  getStressText(): string {
    const val = this.stressLevel();
    if (val >= 8) return `Niveau ${val} sur 10 : Forte appréhension`;
    if (val >= 6) return `Niveau ${val} sur 10 : Tension perceptible`;
    if (val >= 4) return `Niveau ${val} sur 10 : Respiration calme`;
    return `Niveau ${val} sur 10 : Confiance et clarté`;
  }

  startBreathingExercise(): void {
    if (this.isBreathingActive()) {
      this.stopBreathing();
      return;
    }

    this.isBreathingActive.set(true);
    this.breathingSecondsLeft.set(10);
    this.breathingPhase.set('inspire');

    this.breathingTimer = setInterval(() => {
      const remaining = this.breathingSecondsLeft() - 1;
      this.breathingSecondsLeft.set(remaining);

      // Phasing 4s inspire, 2s hold, 4s expire
      if (remaining > 6) {
        this.breathingPhase.set('inspire');
      } else if (remaining > 4) {
        this.breathingPhase.set('hold');
      } else {
        this.breathingPhase.set('expire');
      }

      // Baisser le curseur de stress progressivement vers 2
      const currentStress = this.stressLevel();
      if (currentStress > 2) {
        this.setStress(currentStress - 1);
      }

      if (remaining <= 0) {
        this.stopBreathing();
        this.setStress(2);
      }
    }, 1000);
  }

  stopBreathing(): void {
    if (this.breathingTimer) {
      clearInterval(this.breathingTimer);
      this.breathingTimer = null;
    }
    this.isBreathingActive.set(false);
  }

  selectChoice(choice: 'stage' | 'emploi'): void {
    this.selectedChoice.set(choice);
    this.validationError.set('');
  }

  onCardsKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      this.selectChoice('emploi');
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      this.selectChoice('stage');
    }
  }

  startPreparation(): void {
    const choice = this.selectedChoice();
    if (!choice) {
      this.validationError.set("Choisissez d'abord stage ou emploi : cela prend une seconde.");
      this.cardsGroupRef?.nativeElement.focus();
      return;
    }

    this.router.navigate(['/inscription'], {
      queryParams: { profil: choice }
    });
  }

  loginWithDemo(): void {
    this.isDemoLoading.set(true);
    setTimeout(() => {
      this.authService.loginAsDemoCandidate();
      this.router.navigate(['/dashboard']);
    }, 600);
  }

  // -------------------------------------------------------------
  // MÉTHODES SECTION 2 : PASTILLES IA
  // -------------------------------------------------------------
  startPillsRotation(): void {
    this.stopPillsRotation();
    this.pillsTimer = setInterval(() => {
      if (!this.isPillsPaused() && !this.reducedMotion()) {
        const next = (this.activePillIndex() + 1) % this.analysisPills.length;
        this.activePillIndex.set(next);
      }
    }, 3200);
  }

  stopPillsRotation(): void {
    if (this.pillsTimer) {
      clearInterval(this.pillsTimer);
      this.pillsTimer = null;
    }
  }

  pausePills(): void {
    this.isPillsPaused.set(true);
  }

  resumePills(): void {
    this.isPillsPaused.set(false);
  }

  selectPill(idx: number): void {
    this.activePillIndex.set(idx);
    this.pausePills();
  }

  // -------------------------------------------------------------
  // MÉTHODES SECTION 3 : COMPÉTENCES
  // -------------------------------------------------------------
  isSkillSelected(id: string): boolean {
    return this.selectedSkills().includes(id);
  }

  toggleSkill(id: string): void {
    const current = this.selectedSkills();
    if (current.includes(id)) {
      if (current.length > 1) {
        this.selectedSkills.set(current.filter(s => s !== id));
      }
    } else {
      this.selectedSkills.set([...current, id]);
    }
  }

  prepareSelectedTrack(): void {
    const choice = this.selectedChoice() || 'stage';
    this.router.navigate(['/inscription'], {
      queryParams: { profil: choice }
    });
  }

  // -------------------------------------------------------------
  // MÉTHODES SECTION 4 : MINI-ENTRETIEN 30S
  // -------------------------------------------------------------
  selectQuestion(id: number): void {
    this.selectedQuestionId.set(id);
    this.miniInterviewError.set('');
  }

  startMiniInterview(): void {
    if (!this.selectedQuestionId()) {
      this.miniInterviewError.set("Choisissez d'abord une question pour commencer.");
      return;
    }

    this.miniInterviewError.set('');
    this.miniStep.set('recording');
    this.miniTimerLeft.set(30);

    this.stopMiniTimer();
    this.miniTimer = setInterval(() => {
      const left = this.miniTimerLeft() - 1;
      this.miniTimerLeft.set(left);
      if (left <= 0) {
        this.finishMiniInterview();
      }
    }, 1000);
  }

  finishMiniInterview(): void {
    this.stopMiniTimer();
    this.miniStep.set('results');
  }

  skipMiniInterview(): void {
    this.stopMiniTimer();
    this.miniStep.set('results');
  }

  resetMiniInterview(): void {
    this.stopMiniTimer();
    this.miniStep.set('select');
    this.selectedQuestionId.set(null);
    this.miniInterviewError.set('');
  }

  stopMiniTimer(): void {
    if (this.miniTimer) {
      clearInterval(this.miniTimer);
      this.miniTimer = null;
    }
  }

  // -------------------------------------------------------------
  // MÉTHODES SECTION 5 : TIMELINE OBSERVATION
  // -------------------------------------------------------------
  private setupTimelineObserver(): void {
    if (typeof IntersectionObserver === 'undefined') return;

    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px',
      threshold: 0.4
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const stepNum = Number(entry.target.getAttribute('data-step') || '1');
          if (stepNum > this.activeTimelineStep()) {
            this.activeTimelineStep.set(stepNum);
          }
        }
      });
    }, options);

    const stepElements = document.querySelectorAll('.timeline-step');
    stepElements.forEach(el => this.observer?.observe(el));
  }
}
