import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { TechQuestion } from '../models/question.model';

const MOCK_TECH_TESTS: TechQuestion[] = [
  {
    id: 'tech-1',
    title: 'Formatage et Validation de code d\'entretien',
    description: `Écrivez une fonction \`formatInterviewCode(code: string): string\` qui :
1. Supprime tous les caractères non-alphanumériques.
2. Convertit la chaîne en majuscules.
3. Insère un tiret '-' tous les 4 caractères.

Exemple : "intervia 2026 dev" => "INTE-RVIA-2026-DEV"`,
    starterCode: {
      typescript: `function formatInterviewCode(code: string): string {
  const clean = code.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
  return clean.match(/.{1,4}/g)?.join('-') || '';
}

console.log(formatInterviewCode("intervia 2026 dev"));`
    },
    expectedOutput: 'INTE-RVIA-2026-DEV',
    difficulty: 'facile',
    timeLimit: 15,
    testCases: [
      { id: 'tc-1', input: '"intervia 2026 dev"', expectedOutput: 'INTE-RVIA-2026-DEV', label: 'Espaces et minuscules' },
      { id: 'tc-2', input: '"abc!1234def"', expectedOutput: 'ABC1-234D-EF', label: 'Symboles spéciaux' },
      { id: 'tc-3', input: '""', expectedOutput: '""', label: 'Chaîne vide' }
    ]
  },
  {
    id: 'tech-2',
    title: 'Calculateur d\'Adéquation de Compétences (Skill Match)',
    description: `Écrivez une fonction \`calculateMatch(required: string[], candidate: string[]): number\` qui :
1. Compare en minuscules les compétences requises et celles du candidat.
2. Calcule le pourcentage de correspondance (arrondi à l'entier).
3. Retourne 0 si l'une des listes est vide.

Exemple : required = ["Angular", "TypeScript", "RxJS"], candidate = ["angular", "rxjs", "css"] => 67`,
    starterCode: {
      typescript: `function calculateMatch(required: string[], candidate: string[]): number {
  if (!required.length || !candidate.length) return 0;
  const candSet = new Set(candidate.map(s => s.toLowerCase()));
  const matches = required.filter(r => candSet.has(r.toLowerCase())).length;
  return Math.round((matches / required.length) * 100);
}

console.log(calculateMatch(["Angular", "TypeScript", "RxJS"], ["angular", "rxjs", "css"]));`
    },
    expectedOutput: '67',
    difficulty: 'moyen',
    timeLimit: 20,
    testCases: [
      { id: 'tc-1', input: '["Angular", "TypeScript"], ["angular", "typescript"]', expectedOutput: '100', label: 'Correspondance exacte 100%' },
      { id: 'tc-2', input: '["Angular", "RxJS", "CSS"], ["java"]', expectedOutput: '0', label: 'Aucune correspondance' },
      { id: 'tc-3', input: '[], ["angular"]', expectedOutput: '0', label: 'Liste requise vide' }
    ]
  },
  {
    id: 'tech-3',
    title: 'Détection de Chevauchement d\'Horaires de Simulation',
    description: `Écrivez une fonction \`hasOverlap(slots: {start: number, end: number}[]): boolean\` qui :
1. Vérifie si au moins deux créneaux d'entretien se chevauchent dans la même journée.
2. Un créneau de 9h-10h et 10h-11h NE se chevauchent PAS.

Exemple : [{start: 9, end: 10.5}, {start: 10, end: 11}] => true`,
    starterCode: {
      typescript: `function hasOverlap(slots: {start: number, end: number}[]): boolean {
  const sorted = [...slots].sort((a, b) => a.start - b.start);
  for (let i = 0; i < sorted.length - 1; i++) {
    if (sorted[i].end > sorted[i + 1].start) {
      return true;
    }
  }
  return false;
}

console.log(hasOverlap([{start: 9, end: 10.5}, {start: 10, end: 11}]));`
    },
    expectedOutput: 'true',
    difficulty: 'difficile',
    timeLimit: 25,
    testCases: [
      { id: 'tc-1', input: '[{start: 9, end: 10.5}, {start: 10, end: 11}]', expectedOutput: 'true', label: 'Chevauchement partiel' },
      { id: 'tc-2', input: '[{start: 9, end: 10}, {start: 10, end: 11}]', expectedOutput: 'false', label: 'Créneaux contigus sans chevauchement' },
      { id: 'tc-3', input: '[{start: 14, end: 15}]', expectedOutput: 'false', label: 'Créneau unique' }
    ]
  }
];

@Injectable({ providedIn: 'root' })
export class TechTestService {
  getTechTests(): Observable<TechQuestion[]> {
    return of(MOCK_TECH_TESTS).pipe(delay(300));
  }

  getTechTestById(id: string): Observable<TechQuestion> {
    const test = MOCK_TECH_TESTS.find(t => t.id === id) || MOCK_TECH_TESTS[0];
    return of(test).pipe(delay(300));
  }

  runTests(testId: string, userCode: string): Observable<{ success: boolean; logs: string[]; passedCount: number; totalCount: number }> {
    const test = MOCK_TECH_TESTS.find(t => t.id === testId) || MOCK_TECH_TESTS[0];
    const totalCount = test.testCases.length;
    const logs: string[] = [
      `> Analyse du code source pour "${test.title}"...`,
      `> Environnement d'exécution TypeScript v5.3 Sandbox d'IntervIA`
    ];

    // Evaluate syntax and validity
    if (!userCode.trim() || userCode.includes('// Votre code ici')) {
      logs.push('✗ Erreur de syntaxe : La fonction n\'a pas encore été implémentée.');
      return of({ success: false, logs, passedCount: 0, totalCount }).pipe(delay(600));
    }

    // Determine pass status based on logic check
    let passedCount = totalCount;
    if (testId === 'tech-1' && (!userCode.includes('replace') || !userCode.includes('toUpperCase'))) {
      passedCount = 1;
    } else if (testId === 'tech-2' && !userCode.includes('filter') && !userCode.includes('Set')) {
      passedCount = 1;
    }

    test.testCases.forEach((tc, idx) => {
      if (idx < passedCount) {
        logs.push(`[PASS] Test ${idx + 1} (${tc.label}) : Réussi [Entrée : ${tc.input} => Sortie : ${tc.expectedOutput}]`);
      } else {
        logs.push(`[FAIL] Test ${idx + 1} (${tc.label}) : Échec [Sortie inattendue]`);
      }
    });

    const success = passedCount === totalCount;
    if (success) {
      logs.push(`[SUCCÈS] Tous les ${totalCount} tests ont réussi avec succès ! Code validé.`);
    } else {
      logs.push(`[CONSEIL IA] Relisez l'énoncé et vérifiez le traitement des cas limites.`);
    }

    return of({ success, logs, passedCount, totalCount }).pipe(delay(800));
  }
}
