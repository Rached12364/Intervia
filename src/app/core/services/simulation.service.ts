import { Injectable, signal, inject } from '@angular/core';
import { Observable, of, delay, tap } from 'rxjs';
import { Simulation, SimulationQuestion } from '../models/simulation.model';
import { SimulationResult, AiAnalysis } from '../models/result.model';
import { ResultsService } from './results.service';

const MOCK_SIMULATIONS: Simulation[] = [
  {
    id: 'sim-1',
    title: 'Entretien RH Général & Préparation Soft Skills',
    description: 'Mise en situation standard avec recruteur senior. Validation de vos capacités de communication, motivation et esprit d\'équipe.',
    totalQuestions: 5,
    estimatedDuration: 15,
    difficulty: 'intermediaire',
    status: 'a-faire'
  },
  {
    id: 'sim-2',
    title: 'Entretien Technique Frontend & Architecture Web',
    description: 'Évaluation approfondie de vos connaissances Angular, RxJS, state management et bonnes pratiques de code.',
    totalQuestions: 4,
    estimatedDuration: 20,
    difficulty: 'avance',
    status: 'a-faire'
  },
  {
    id: 'sim-3',
    title: 'Premier Entretien - Fit Culturel & Motivations',
    description: 'Idéal pour les étudiants et jeunes diplômés. Travaillez votre pitch de présentation et la gestion du stress.',
    totalQuestions: 4,
    estimatedDuration: 12,
    difficulty: 'debutant',
    status: 'terminee'
  }
];

const MOCK_QUESTIONS: Record<string, SimulationQuestion[]> = {
  'sim-1': [
    {
      id: 'q1',
      text: 'Pouvez-vous vous présenter brièvement et résumer votre parcours professionnel ?',
      duration: 120,
      category: 'presentation',
      tips: 'Mettez en avant vos accomplissements clés et votre passion pour le domaine en 2 minutes max.'
    },
    {
      id: 'q2',
      text: 'Pourquoi souhaitez-vous rejoindre notre entreprise et qu\'est-ce qui vous motive dans ce poste ?',
      duration: 90,
      category: 'motivation',
      tips: 'Liez vos valeurs aux projets de l\'entreprise. Montrez que vous vous êtes renseigné.'
    },
    {
      id: 'q3',
      text: 'Racontez-moi une situation où vous avez fait face à un désaccord technique au sein de votre équipe. Comment l\'avez-vous résolu ?',
      duration: 120,
      category: 'situation',
      tips: 'Utilisez la méthode STAR (Situation, Tâche, Action, Résultat). Rester factuel et axé solution.'
    },
    {
      id: 'q4',
      text: 'Comment gérez-vous la pression et les échéances serrées en fin de sprint ?',
      duration: 90,
      category: 'soft-skill',
      tips: 'Parlez de priorisation, communication transparente et gestion du temps.'
    },
    {
      id: 'q5',
      text: 'Où vous voyez-vous professionnellement dans 3 à 5 ans ?',
      duration: 90,
      category: 'motivation',
      tips: 'Montrez votre ambition d\'apprentissage continu et d\'évolution managériale ou d\'expertise.'
    }
  ],
  'sim-2': [
    {
      id: 'q2-1',
      text: 'Expliquez la différence entre ChangeDetectionStrategy.Default et OnPush dans Angular.',
      duration: 120,
      category: 'technique',
      tips: 'Mentionnez l\'immuabilité des objets, les Signals et le découplage des vérifications DOM.'
    },
    {
      id: 'q2-2',
      text: 'Comment évitez-vous les fuites de mémoire (memory leaks) avec RxJS ?',
      duration: 90,
      category: 'technique',
      tips: 'Parlez de takeUntilDestroyed, async pipe, et la désinscription explicite.'
    },
    {
      id: 'q2-3',
      text: 'Comment structures-tu les modules/standalone components dans une application d\'envergure ?',
      duration: 120,
      category: 'technique',
      tips: 'Expliquez le Core, Shared, Features et le Lazy Loading.'
    }
  ]
};

@Injectable({ providedIn: 'root' })
export class SimulationService {
  private resultsService = inject(ResultsService);
  private simulations = signal<Simulation[]>(MOCK_SIMULATIONS);

  getSimulations(): Observable<Simulation[]> {
    return of(this.simulations()).pipe(delay(400));
  }

  getSimulationById(id: string): Observable<Simulation | undefined> {
    const sim = this.simulations().find(s => s.id === id) || this.simulations()[0];
    return of(sim).pipe(delay(300));
  }

  getQuestionsForSimulation(simId: string): Observable<SimulationQuestion[]> {
    const questions = MOCK_QUESTIONS[simId] || MOCK_QUESTIONS['sim-1'];
    return of(questions).pipe(delay(400));
  }

  submitSimulation(simId: string, answers: any[]): Observable<SimulationResult> {
    let globalScore = 88;
    let badge: 'or' | 'argent' | 'bronze' = 'or';
    let aiAnalysis: AiAnalysis = {
      langage: { score: 92, level: 'excellent', feedback: 'Vocabulaire professionnel fluide, zéro répétition parasite.' },
      posture: { score: 86, level: 'bon', feedback: 'Regard maintenu vers la caméra, posture droite.' },
      stress: { score: 85, level: 'bon', feedback: 'Rythme cardiaque estimé stable (74 bpm), ton chaleureux.' },
      clarte: { score: 89, level: 'excellent', feedback: 'Arguments clairs et structurés avec méthode STAR.' }
    };
    let suggestions = [
      'Prenez une pause réflexive de 2 secondes avant d\'aborder les questions complexes.',
      'Enrichissez vos exemples avec des métriques quantitatives (ex: +30% de perf).'
    ];

    if (simId === 'sim-2') {
      globalScore = 94;
      badge = 'or';
      aiAnalysis = {
        langage: { score: 96, level: 'excellent', feedback: 'Maîtrise remarquable du vocabulaire technique Angular & Web.' },
        posture: { score: 90, level: 'excellent', feedback: 'Attitude très engagée et dynamique.' },
        stress: { score: 92, level: 'excellent', feedback: 'Gestion du temps parfaite sur chaque question.' },
        clarte: { score: 98, level: 'excellent', feedback: 'Explications concises avec schémas mentaux impeccables.' }
      };
      suggestions = [
        'Excellente prestation ! Pensez à mentionner votre expérience sur les tests d\'intégration end-to-end (Cypress/Playwright).'
      ];
    } else if (simId === 'sim-3') {
      globalScore = 72;
      badge = 'argent';
      aiAnalysis = {
        langage: { score: 76, level: 'bon', feedback: 'Expression globale correcte, quelques hésitations sur les soft skills.' },
        posture: { score: 70, level: 'moyen', feedback: 'Regard parfois orienté vers le bas au lieu de l\'objectif.' },
        stress: { score: 68, level: 'moyen', feedback: 'Débit de parole légèrement trop rapide en début de session.' },
        clarte: { score: 74, level: 'bon', feedback: 'Réponses complètes mais nécessitant plus de synthèse.' }
      };
      suggestions = [
        'Entraînez-vous avec notre minuteur intégré pour stabiliser votre temps de réponse.',
        'Fixez directement l\'objectif de votre webcam pour renforcer l\'impact de votre regard.'
      ];
    }

    const mockResult: SimulationResult = {
      id: 'res-' + Date.now(),
      userId: '1',
      simulationId: simId,
      date: new Date(),
      globalScore,
      badge,
      scores: [
        { label: 'Clarté du Discours', score: aiAnalysis.clarte.score, maxScore: 100, icon: 'record_voice_over' },
        { label: 'Gestion du Stress', score: aiAnalysis.stress.score, maxScore: 100, icon: 'self_improvement' },
        { label: 'Posture & Regard', score: aiAnalysis.posture.score, maxScore: 100, icon: 'videocam' },
        { label: 'Pertinence Technique', score: aiAnalysis.langage.score, maxScore: 100, icon: 'psychology' }
      ],
      aiAnalysis,
      suggestions
    };
    return of(mockResult).pipe(delay(1200), tap(result => this.resultsService.addResult(result)));
  }
}
