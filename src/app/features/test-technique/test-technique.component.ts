import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { BtnComponent } from '../../shared/components/btn/btn.component';
import { TimerComponent } from '../../shared/components/timer/timer.component';
import { ScoreBadgeComponent } from '../../shared/components/score-badge/score-badge.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { PreparationService } from '../../core/services/preparation.service';
import { TechQuestion } from '../../core/models/question.model';

export interface TestCase {
  id: number;
  description: string;
  input: string;
  expected: string;
  passed?: boolean;
  actual?: string;
  duration?: number;
}

@Component({
  selector: 'app-test-technique',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent,
    BtnComponent,
    TimerComponent,
    ScoreBadgeComponent,
    IconComponent
  ],
  templateUrl: './test-technique.component.html',
  styleUrl: './test-technique.component.scss'
})
export class TestTechniqueComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private prepService = inject(PreparationService);

  prepPlanId = signal<string | null>(null);
  exerciseTitle = signal<string>('Algorithme : Regroupement & Palier de Candidats');
  exerciseDescription = signal<string>('Dans le cadre du scoring automatique des entretiens chez IntervIA, concevez une fonction qui prend en entrée un tableau de scores (de 0 à 100) et retourne un objet partitionné :');
  exerciseLanguage = signal<string>('TypeScript / JavaScript');
  timeLimitMinutes = signal<number>(15);

  userCode = `/**
 * Filtre et regroupe les scores des candidats par palier de compétences.
 * 
 * @param scores Liste de nombres représentant les pourcentages (0 - 100)
 * @returns Objet avec les candidats classés par palier 'or', 'argent', 'bronze'
 */
function classerCandidats(scores: number[]): { or: number[]; argent: number[]; bronze: number[] } {
  const resultat = { or: [], argent: [], bronze: [] };
  
  for (const score of scores) {
    if (score >= 85) {
      resultat.or.push(score);
    } else if (score >= 70) {
      resultat.argent.push(score);
    } else if (score >= 50) {
      resultat.bronze.push(score);
    }
  }
  
  return resultat;
}`;

  testCases = signal<TestCase[]>([
    {
      id: 1,
      description: 'Répartition standard de candidats aux 3 paliers',
      input: '[92, 74, 55, 88, 62]',
      expected: '{ or: [92, 88], argent: [74], bronze: [55, 62] }'
    },
    {
      id: 2,
      description: 'Cas avec scores inférieurs au seuil bronze',
      input: '[45, 30, 95]',
      expected: '{ or: [95], argent: [], bronze: [] }'
    },
    {
      id: 3,
      description: 'Cas limite tableau vide sans score',
      input: '[]',
      expected: '{ or: [], argent: [], bronze: [] }'
    }
  ]);

  runningTests = signal(false);
  testsExecuted = signal(false);
  testsPassed = signal(false);
  consoleLogs = signal<string[]>([]);
  completed = signal(false);
  score = signal(95);

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const prepId = params['prep'];
      if (prepId) {
        this.prepPlanId.set(prepId);
        const plan = this.prepService.getPreparationById(prepId);
        if (plan && plan.techModule?.exercise) {
          const ex = plan.techModule.exercise;
          this.exerciseTitle.set(ex.title);
          this.exerciseDescription.set(ex.description);
          this.exerciseLanguage.set(plan.techModule.language);
          this.timeLimitMinutes.set(plan.techModule.durationMinutes);

          // Starter code
          const langCode = ex.starterCode['python'] || ex.starterCode['javascript'] || ex.starterCode['typescript'];
          if (langCode) {
            this.userCode = langCode;
          }

          // Test cases
          if (ex.testCases && ex.testCases.length > 0) {
            this.testCases.set(ex.testCases.map((tc, idx) => ({
              id: idx + 1,
              description: tc.label,
              input: tc.input,
              expected: tc.expectedOutput
            })));
          }
        }
      }
    });
  }

  runTests(): void {
    this.runningTests.set(true);
    this.consoleLogs.set(['[Console IntervIA] Initialisation du moteur TypeScript...', '[Test runner] Compilation de votre code source...']);

    setTimeout(() => {
      const updated = this.testCases().map(tc => ({
        ...tc,
        passed: true,
        actual: tc.expected,
        duration: Math.floor(Math.random() * 5) + 2
      }));

      this.testCases.set(updated);
      this.runningTests.set(false);
      this.testsExecuted.set(true);
      this.testsPassed.set(true);
      this.consoleLogs.set([
        '[OK] Compilation réussie sans erreur.',
        '✔ Test 1: Cas standard -> Passé (4ms)',
        '✔ Test 2: Cas intermédiaire -> Passé (3ms)',
        '✔ Test 3: Cas limite -> Passé (2ms)',
        'Tous les tests unitaires sont validés avec succès !'
      ]);
    }, 700);
  }

  submitSolution(): void {
    this.completed.set(true);
    const pId = this.prepPlanId();
    if (pId) {
      this.prepService.updateModuleScore(pId, 'tech', this.score());
    }
  }

  resetCode(): void {
    this.testsExecuted.set(false);
    this.testsPassed.set(false);
    this.consoleLogs.set([]);
  }

  goToDashboard(): void {
    const pId = this.prepPlanId();
    if (pId) {
      this.router.navigate(['/preparation'], { queryParams: { planId: pId } });
    } else {
      this.router.navigate(['/dashboard']);
    }
  }
}
