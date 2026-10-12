import { Injectable, signal } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { SimulationResult } from '../models/result.model';

const MOCK_RESULTS: SimulationResult[] = [
  {
    id: 'res-1',
    userId: '1',
    simulationId: 'sim-1',
    date: new Date('2026-10-08T14:30:00'),
    globalScore: 88,
    badge: 'or',
    scores: [
      { label: 'Clarté du Discours', score: 92, maxScore: 100, icon: 'record_voice_over' },
      { label: 'Gestion du Stress', score: 85, maxScore: 100, icon: 'self_improvement' },
      { label: 'Posture & Regard', score: 86, maxScore: 100, icon: 'videocam' },
      { label: 'Pertinence Technique', score: 89, maxScore: 100, icon: 'psychology' }
    ],
    aiAnalysis: {
      langage: { score: 92, level: 'excellent', feedback: 'Vocabulaire professionnel fluide, zéro répétition parasite.' },
      posture: { score: 86, level: 'bon', feedback: 'Regard ancré vers la caméra, geste naturel des mains.' },
      stress: { score: 85, level: 'bon', feedback: 'BPM moyen 72, pauses bien rythmées.' },
      clarte: { score: 89, level: 'excellent', feedback: 'Syntaxes structurées avec introduction, arguments et synthèse.' }
    },
    suggestions: [
      'Prenez 2 secondes de silence réflexif avant d\'aborder des questions à forte technicité.',
      'Valorisez davantage l\'impact quantitatif de vos contributions passées.'
    ]
  },
  {
    id: 'res-2',
    userId: '1',
    simulationId: 'sim-3',
    date: new Date('2026-09-25T10:15:00'),
    globalScore: 74,
    badge: 'argent',
    scores: [
      { label: 'Clarté du Discours', score: 78, maxScore: 100, icon: 'record_voice_over' },
      { label: 'Gestion du Stress', score: 70, maxScore: 100, icon: 'self_improvement' },
      { label: 'Posture & Regard', score: 72, maxScore: 100, icon: 'videocam' },
      { label: 'Pertinence Technique', score: 76, maxScore: 100, icon: 'psychology' }
    ],
    aiAnalysis: {
      langage: { score: 78, level: 'bon', feedback: 'Bonnes explications avec quelques hésitations sur les questions RH.' },
      posture: { score: 72, level: 'moyen', feedback: 'Mouvements fréquents des yeux hors du champ.' },
      stress: { score: 70, level: 'moyen', feedback: 'Léger débit accéléré lors de la mise en situation.' },
      clarte: { score: 76, level: 'bon', feedback: 'Réponses complètes mais légèrement longues.' }
    },
    suggestions: [
      'Entraînez-vous avec un minuteur pour condenser vos pitchs de présentation.'
    ]
  }
];

@Injectable({ providedIn: 'root' })
export class ResultsService {
  private localResults: SimulationResult[] = [];

  private _lastResult = signal<SimulationResult | null>(null);
  public readonly lastResult = this._lastResult.asReadonly();

  getUserResults(userId: string = '1'): Observable<SimulationResult[]> {
    return of([...this.localResults, ...MOCK_RESULTS]).pipe(delay(350));
  }

  getResultById(id: string): Observable<SimulationResult | undefined> {
    const allResults = [...this.localResults, ...MOCK_RESULTS];
    const res = allResults.find(r => r.id === id) || allResults[0];
    return of(res).pipe(delay(300));
  }

  addResult(result: SimulationResult): void {
    this.localResults.unshift(result);
    this._lastResult.set(result);
  }
}
