import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { QcmQuestion } from '../models/question.model';

export interface QcmCategory {
  id: string;
  name: string;
  icon: string;
  count: number;
  description: string;
}

const MOCK_CATEGORIES: QcmCategory[] = [
  { id: 'angular', name: 'Angular 17 & RxJS', icon: 'integration_instructions', count: 5, description: 'Signals, Standalone, Routing, Control Flow' },
  { id: 'typescript', name: 'TypeScript & JavaScript', icon: 'code', count: 5, description: 'Generics, Promises, Closures, Types avancés' },
  { id: 'web-perf', name: 'Performance & SEO Web', icon: 'speed', count: 5, description: 'Core Web Vitals, SSR, Lazy Loading, Caching' },
  { id: 'soft-skills', name: 'Communication & RH', icon: 'groups', count: 5, description: 'Leadership, Gestion de conflit, Méthodes Agiles' }
];

const MOCK_QCM_QUESTIONS: Record<string, QcmQuestion[]> = {
  'angular': [
    {
      id: 'ang-1',
      text: 'Quelle est la nouvelle syntaxe recommandée dans Angular 17 pour les conditions dans le template ?',
      options: [
        { id: 'a', text: '@if (condition) { ... } @else { ... }', isCorrect: true },
        { id: 'b', text: '*ngIf="condition"', isCorrect: false },
        { id: 'c', text: '<ng-template [if]="condition">', isCorrect: false },
        { id: 'd', text: '#if (condition)', isCorrect: false }
      ],
      explanation: 'Angular 17 introduit le Control Flow natif avec la syntaxe @if, plus lisible et plus performante que la directive *ngIf.',
      category: 'Angular 17 & RxJS',
      difficulty: 'facile',
      timeLimit: 30
    },
    {
      id: 'ang-2',
      text: 'Quel est l\'avantage principal d\'un Signal par rapport à un BehaviorSubject dans Angular 17 ?',
      options: [
        { id: 'a', text: 'Mise à jour granulaire du DOM sans surcoût de détection globale des changements', isCorrect: true },
        { id: 'b', text: 'Obligation d\'utiliser Zone.js', isCorrect: false },
        { id: 'c', text: 'Impossibilité de lire la valeur de manière synchrone', isCorrect: false },
        { id: 'd', text: 'Un Signal ne peut contenir que des nombres', isCorrect: false }
      ],
      explanation: 'Les Signals permettent au moteur d\'Angular de savoir précisément quelle partie du DOM doit être mise à jour.',
      category: 'Angular 17 & RxJS',
      difficulty: 'moyen',
      timeLimit: 45
    },
    {
      id: 'ang-3',
      text: 'Quelle fonction d\'injection permet d\'exécuter du code lors de la destruction d\'un composant sans utiliser ngOnDestroy ?',
      options: [
        { id: 'a', text: 'inject(DestroyRef).onDestroy(...)', isCorrect: true },
        { id: 'b', text: 'inject(ElementRef).onClean(...)', isCorrect: false },
        { id: 'c', text: 'inject(ComponentRef).destroy()', isCorrect: false },
        { id: 'd', text: 'inject(ChangeDetectorRef).detach()', isCorrect: false }
      ],
      explanation: 'DestroyRef permet d\'enregistrer des callbacks de nettoyage dans n\'importe quelle fonction ou service sans implémenter OnDestroy.',
      category: 'Angular 17 & RxJS',
      difficulty: 'difficile',
      timeLimit: 45
    },
    {
      id: 'ang-4',
      text: 'Comment précharger un composant uniquement sur interaction de l\'utilisateur avec les Deferrable Views (@defer) ?',
      options: [
        { id: 'a', text: '@defer (on interaction) { <app-heavy /> }', isCorrect: true },
        { id: 'b', text: '@defer (when click) { <app-heavy /> }', isCorrect: false },
        { id: 'c', text: '@defer (load on user) { <app-heavy /> }', isCorrect: false },
        { id: 'd', text: '@defer (async) { <app-heavy /> }', isCorrect: false }
      ],
      explanation: 'Le déclencheur `on interaction` charge et affiche la vue différée au clic ou au focus sur un élément déclencheur.',
      category: 'Angular 17 & RxJS',
      difficulty: 'moyen',
      timeLimit: 40
    },
    {
      id: 'ang-5',
      text: 'Quel opérateur RxJS est le plus approprié pour annuler la requête HTTP précédente lorsqu\'une nouvelle recherche est saisie ?',
      options: [
        { id: 'a', text: 'switchMap', isCorrect: true },
        { id: 'b', text: 'mergeMap', isCorrect: false },
        { id: 'c', text: 'concatMap', isCorrect: false },
        { id: 'd', text: 'exhaustMap', isCorrect: false }
      ],
      explanation: 'switchMap désabonne et annule la souscription à l\'Observable précédent dès qu\'une nouvelle valeur est émise.',
      category: 'Angular 17 & RxJS',
      difficulty: 'facile',
      timeLimit: 30
    }
  ],
  'typescript': [
    {
      id: 'ts-1',
      text: 'Quel mot-clé TypeScript permet de créer un type qui extrait les propriétés d\'un type sans qu\'elles soient modifiables ?',
      options: [
        { id: 'a', text: 'Readonly<T>', isCorrect: true },
        { id: 'b', text: 'Immutable<T>', isCorrect: false },
        { id: 'c', text: 'Freeze<T>', isCorrect: false },
        { id: 'd', text: 'Const<T>', isCorrect: false }
      ],
      explanation: 'Le type générique utilitaire Readonly<T> transforme toutes les propriétés d\'un objet en propriétés en lecture seule.',
      category: 'TypeScript & JavaScript',
      difficulty: 'facile',
      timeLimit: 30
    },
    {
      id: 'ts-2',
      text: 'Quelle est la différence entre `unknown` et `any` en TypeScript ?',
      options: [
        { id: 'a', text: '`unknown` exige une vérification de type (type-checking) avant toute opération, contrairement à `any`', isCorrect: true },
        { id: 'b', text: '`unknown` accepte uniquement des chaînes de caractères', isCorrect: false },
        { id: 'c', text: '`any` est plus sécurisé que `unknown`', isCorrect: false },
        { id: 'd', text: 'Il n\'y a aucune différence', isCorrect: false }
      ],
      explanation: '`unknown` est le pendant type-safe de `any` : TypeScript empêche d\'effectuer des opérations sur une variable `unknown` sans avoir d\'abord restreint son type.',
      category: 'TypeScript & JavaScript',
      difficulty: 'moyen',
      timeLimit: 40
    },
    {
      id: 'ts-3',
      text: 'Que produit l\'expression `typeof keyof User` si `User` est une interface ?',
      options: [
        { id: 'a', text: 'Une erreur de syntaxe', isCorrect: true },
        { id: 'b', text: 'Un union type des clés', isCorrect: false },
        { id: 'c', text: 'Un objet avec les clés', isCorrect: false },
        { id: 'd', text: 'La chaîne "string"', isCorrect: false }
      ],
      explanation: '`keyof` s\'applique sur un type, alors que `typeof` s\'applique sur une valeur JavaScript. Les combiner ainsi déclenche une erreur de compilation.',
      category: 'TypeScript & JavaScript',
      difficulty: 'difficile',
      timeLimit: 45
    },
    {
      id: 'ts-4',
      text: 'Que retourne `[1, 2, 3].map(parseInt)` en JavaScript ?',
      options: [
        { id: 'a', text: '[1, NaN, NaN]', isCorrect: true },
        { id: 'b', text: '[1, 2, 3]', isCorrect: false },
        { id: 'c', text: '[NaN, NaN, NaN]', isCorrect: false },
        { id: 'd', text: '[1, 2, NaN]', isCorrect: false }
      ],
      explanation: '`map` passe 3 arguments (valeur, index, tableau) à `parseInt`. La base transmise devient donc 0, 1 et 2, produisant [1, NaN, NaN].',
      category: 'TypeScript & JavaScript',
      difficulty: 'difficile',
      timeLimit: 45
    },
    {
      id: 'ts-5',
      text: 'Comment déclarer une fonction générique qui garantit que l\'argument possède une propriété `length: number` ?',
      options: [
        { id: 'a', text: 'function count<T extends { length: number }>(arg: T): number', isCorrect: true },
        { id: 'b', text: 'function count<T: length>(arg: T): number', isCorrect: false },
        { id: 'c', text: 'function count<T implements HasLength>(arg: T): number', isCorrect: false },
        { id: 'd', text: 'function count<T where length>(arg: T): number', isCorrect: false }
      ],
      explanation: 'La clause `extends` permet d\'imposer une contrainte de structure sur le type générique T.',
      category: 'TypeScript & JavaScript',
      difficulty: 'moyen',
      timeLimit: 35
    }
  ],
  'web-perf': [
    {
      id: 'perf-1',
      text: 'Quelle métrique Core Web Vitals mesure le temps nécessaire pour charger l\'élément le plus volumineux de la page ?',
      options: [
        { id: 'a', text: 'LCP (Largest Contentful Paint)', isCorrect: true },
        { id: 'b', text: 'FID (First Input Delay)', isCorrect: false },
        { id: 'c', text: 'CLS (Cumulative Layout Shift)', isCorrect: false },
        { id: 'd', text: 'TTFB (Time to First Byte)', isCorrect: false }
      ],
      explanation: 'LCP mesure la vitesse de chargement perçue en identifiant le moment où le contenu principal de la page est affiché.',
      category: 'Performance & SEO Web',
      difficulty: 'facile',
      timeLimit: 30
    },
    {
      id: 'perf-2',
      text: 'Quel est l\'objectif principal du SSR (Server-Side Rendering) avec Angular Universal / SSR ?',
      options: [
        { id: 'a', text: 'Améliorer le SEO et le temps du premier affichage (First Contentful Paint)', isCorrect: true },
        { id: 'b', text: 'Remplacer totalement la base de données', isCorrect: false },
        { id: 'c', text: 'Réduire le temps de compilation TypeScript', isCorrect: false },
        { id: 'd', text: 'Rendre le code invisible dans le navigateur', isCorrect: false }
      ],
      explanation: 'Le SSR génère le HTML statique directement sur le serveur, permettant aux moteurs de recherche et aux utilisateurs d\'avoir le contenu immédiatement.',
      category: 'Performance & SEO Web',
      difficulty: 'moyen',
      timeLimit: 35
    },
    {
      id: 'perf-3',
      text: 'Comment éviter le saut de mise en page (Layout Shift) provoqué par des images dynamiques ?',
      options: [
        { id: 'a', text: 'Renseigner systématiquement les attributs width et height ou l\'aspect-ratio en CSS', isCorrect: true },
        { id: 'b', text: 'Convertir toutes les images en GIF', isCorrect: false },
        { id: 'c', text: 'Utiliser display: none jusqu\'au chargement', isCorrect: false },
        { id: 'd', text: 'Desactiver le cache navigateur', isCorrect: false }
      ],
      explanation: 'Indiquer les dimensions d\'image permet au navigateur de réserver l\'espace nécessaire avant le téléchargement du fichier.',
      category: 'Performance & SEO Web',
      difficulty: 'facile',
      timeLimit: 30
    },
    {
      id: 'perf-4',
      text: 'Quelle stratégie de mise en cache Service Worker est idéale pour les ressources statiques d\'une PWA ?',
      options: [
        { id: 'a', text: 'Cache First, falling back to Network', isCorrect: true },
        { id: 'b', text: 'Network Only', isCorrect: false },
        { id: 'c', text: 'Bypass Cache', isCorrect: false },
        { id: 'd', text: 'No-Store Policy', isCorrect: false }
      ],
      explanation: 'Cache First intercepte la requête et la sert depuis le cache local, accélérant l\'affichage et permettant le fonctionnement hors-ligne.',
      category: 'Performance & SEO Web',
      difficulty: 'moyen',
      timeLimit: 40
    },
    {
      id: 'perf-5',
      text: 'Quelle directive Angular optimise le chargement et le dimensionnement des images distantes ?',
      options: [
        { id: 'a', text: 'NgOptimizedImage (ngSrc)', isCorrect: true },
        { id: 'b', text: 'NgImageLoader', isCorrect: false },
        { id: 'c', text: 'NgFastImg', isCorrect: false },
        { id: 'd', text: 'NgPicture', isCorrect: false }
      ],
      explanation: 'NgOptimizedImage prévient les problèmes de performance (LCP/CLS) en imposant des dimensions et en gérant le preconnect/lazy loading.',
      category: 'Performance & SEO Web',
      difficulty: 'moyen',
      timeLimit: 35
    }
  ],
  'soft-skills': [
    {
      id: 'soft-1',
      text: 'Quelle méthode de réponse structurée est particulièrement recommandée pour les questions d\'entretien de type situationnel ?',
      options: [
        { id: 'a', text: 'La méthode STAR (Situation, Tâche, Action, Résultat)', isCorrect: true },
        { id: 'b', text: 'La méthode SWOT', isCorrect: false },
        { id: 'c', text: 'La règle des 5 Pourquoi', isCorrect: false },
        { id: 'd', text: 'La méthode Pomodoro', isCorrect: false }
      ],
      explanation: 'La méthode STAR structure vos réponses en posant le contexte (Situation), votre objectif (Tâche), les démarches entreprises (Action) et l\'impact mesurable (Résultat).',
      category: 'Communication & RH',
      difficulty: 'facile',
      timeLimit: 30
    },
    {
      id: 'soft-2',
      text: 'Lorsqu\'un recruteur vous demande de citer vos points faibles, quelle attitude est la plus professionnelle ?',
      options: [
        { id: 'a', text: 'Présenter un véritable axe d\'amélioration en expliquant les actions concrètes mises en place pour le surmonter', isCorrect: true },
        { id: 'b', text: 'Affirmer que l\'on n\'a aucun défaut', isCorrect: false },
        { id: 'c', text: 'Donner un faux défaut déguisé comme "je suis trop perfectionniste"', isCorrect: false },
        { id: 'd', text: 'Citer des manquements graves à la déontologie', isCorrect: false }
      ],
      explanation: 'Les recruteurs évaluent votre prise de recul et votre capacité d\'auto-amélioration proactive.',
      category: 'Communication & RH',
      difficulty: 'moyen',
      timeLimit: 40
    },
    {
      id: 'soft-3',
      text: 'En méthodologie Agile Scrum, quel est l\'objectif principal du Daily Standup ?',
      options: [
        { id: 'a', text: 'Synchroniser l\'équipe, partager l\'avancement et identifier les blocages en 15 min max', isCorrect: true },
        { id: 'b', text: 'Évaluer individuellement les développeurs', isCorrect: false },
        { id: 'c', text: 'Rédiger l\'intégralité des user stories', isCorrect: false },
        { id: 'd', text: 'Refaire l\'architecture de l\'application', isCorrect: false }
      ],
      explanation: 'Le Daily permet de faire le point rapide entre pairs pour aligner la journée de travail et éliminer les freins.',
      category: 'Communication & RH',
      difficulty: 'facile',
      timeLimit: 30
    },
    {
      id: 'soft-4',
      text: 'Comment réagir face à un changement soudain de priorités fonctionnelles au milieu d\'un sprint ?',
      options: [
        { id: 'a', text: 'Accueillir le besoin avec flexibilité et en discuter l\'impact avec le Product Owner', isCorrect: true },
        { id: 'b', text: 'Refuser catégoriquement de modifier quoi que ce soit', isCorrect: false },
        { id: 'c', text: 'Travailler le week-end sans en parler à personne', isCorrect: false },
        { id: 'd', text: 'Effacer tout le travail du sprint en cours', isCorrect: false }
      ],
      explanation: 'L\'agilité privilégie l\'adaptation au changement tout en négociant l\'ajustement du périmètre engagé.',
      category: 'Communication & RH',
      difficulty: 'moyen',
      timeLimit: 35
    },
    {
      id: 'soft-5',
      text: 'Quelle posture non-verbale véhicule de la confiance lors d\'un entretien vidéo ?',
      options: [
        { id: 'a', text: 'Regard dirigé vers la caméra, épaules ouvertes et voix posée', isCorrect: true },
        { id: 'b', text: 'Regarder fixement le deuxième écran en bas', isCorrect: false },
        { id: 'c', text: 'Parler très rapidement pour tout dire', isCorrect: false },
        { id: 'd', text: 'Garder les bras croisés et la tête baissée', isCorrect: false }
      ],
      explanation: 'Regarder la webcam simule un contact visuel direct avec le recruteur et renforce l\'engagement.',
      category: 'Communication & RH',
      difficulty: 'facile',
      timeLimit: 30
    }
  ]
};

@Injectable({ providedIn: 'root' })
export class QcmService {
  getCategories(): Observable<QcmCategory[]> {
    return of(MOCK_CATEGORIES).pipe(delay(300));
  }

  getQuestions(categoryId: string): Observable<QcmQuestion[]> {
    const questions = MOCK_QCM_QUESTIONS[categoryId] || MOCK_QCM_QUESTIONS['angular'];
    return of(questions).pipe(delay(400));
  }
}
