import { QcmQuestion } from '../models/question.model';

export const EXTENDED_QCM_BANK: Record<string, QcmQuestion[]> = {
  // Angular
  'Angular': [
    {
      id: 'ext-ang-1',
      text: 'Dans Angular 17, que permet la fonction input() ?',
      options: [
        { id: 'a', text: 'Déclarer un input réactif basé sur un Signal sans décorateur @Input()', isCorrect: true },
        { id: 'b', text: 'Créer un élément de formulaire HTML', isCorrect: false },
        { id: 'c', text: 'Forcer la détection des changements manuellement', isCorrect: false },
        { id: 'd', text: 'Remplacer le module HttpClient', isCorrect: false }
      ],
      explanation: 'input() remplace avantageusement le décorateur @Input() par un Signal en lecture seule.',
      category: 'Angular',
      difficulty: 'moyen',
      timeLimit: 30
    },
    {
      id: 'ext-ang-2',
      text: 'Quel bloc du nouveau Control Flow remplace la directive *ngFor ?',
      options: [
        { id: 'a', text: '@for (item of items; track item.id)', isCorrect: true },
        { id: 'b', text: '@loop (items as item)', isCorrect: false },
        { id: 'c', text: '@each (item in items)', isCorrect: false },
        { id: 'd', text: '@repeat (item : items)', isCorrect: false }
      ],
      explanation: 'Le bloc @for est natif et exige un identifiant `track` pour optimiser le rendu DOM.',
      category: 'Angular',
      difficulty: 'facile',
      timeLimit: 30
    },
    {
      id: 'ext-ang-3',
      text: 'Que fait la fonction computed() dans le système de Signals d\'Angular ?',
      options: [
        { id: 'a', text: 'Calcule une valeur dérivée mémorisée qui se recalcule quand ses dépendances changent', isCorrect: true },
        { id: 'b', text: 'Exécute un effet de bord asynchrone', isCorrect: false },
        { id: 'c', text: 'Envoie une requête HTTP GET', isCorrect: false },
        { id: 'd', text: 'Modifie directement la valeur d\'un Signal', isCorrect: false }
      ],
      explanation: 'computed() crée un signal dérivé en lecture seule avec mémoïsation automatique.',
      category: 'Angular',
      difficulty: 'moyen',
      timeLimit: 30
    },
    {
      id: 'ext-ang-4',
      text: 'Quelle stratégie de détection des changements réduit au maximum les vérifications dans les composants ?',
      options: [
        { id: 'a', text: 'ChangeDetectionStrategy.OnPush', isCorrect: true },
        { id: 'b', text: 'ChangeDetectionStrategy.Default', isCorrect: false },
        { id: 'c', text: 'ChangeDetectionStrategy.Manual', isCorrect: false },
        { id: 'd', text: 'ChangeDetectionStrategy.Always', isCorrect: false }
      ],
      explanation: 'OnPush ne vérifie le composant que si un @Input change d\'identité, qu\'un signal est notifié ou qu\'un événement provient de sa vue.',
      category: 'Angular',
      difficulty: 'difficile',
      timeLimit: 40
    }
  ],

  // TypeScript
  'TypeScript': [
    {
      id: 'ext-ts-1',
      text: 'Que permet l\'opérateur `as const` en TypeScript ?',
      options: [
        { id: 'a', text: 'Verrouiller les valeurs et types littéraux d\'un objet ou tableau en lecture seule', isCorrect: true },
        { id: 'b', text: 'Déclarer une constante globale dans le navigateur', isCorrect: false },
        { id: 'c', text: 'Convertir n\'importe quelle chaîne en nombre', isCorrect: false },
        { id: 'd', text: 'Éviter toute transpilation vers JavaScript', isCorrect: false }
      ],
      explanation: '`as const` crée une assertion de type littérale et passe toutes les propriétés en readonly récursif.',
      category: 'TypeScript',
      difficulty: 'moyen',
      timeLimit: 30
    },
    {
      id: 'ext-ts-2',
      text: 'Quel type utilitaire permet de rendre toutes les propriétés d\'un type optionnelles ?',
      options: [
        { id: 'a', text: 'Partial<T>', isCorrect: true },
        { id: 'b', text: 'Required<T>', isCorrect: false },
        { id: 'c', text: 'Optional<T>', isCorrect: false },
        { id: 'd', text: 'Pick<T>', isCorrect: false }
      ],
      explanation: 'Partial<T> transforme chaque champ d\'un type en champ facultatif avec `?`.',
      category: 'TypeScript',
      difficulty: 'facile',
      timeLimit: 25
    },
    {
      id: 'ext-ts-3',
      text: 'Quelle est la différence essentielle entre une `interface` et un `type alias` ?',
      options: [
        { id: 'a', text: 'Une interface supporte la fusion de déclaration (declaration merging), contrairement à un type', isCorrect: true },
        { id: 'b', text: 'Les interfaces ne peuvent pas être implémentées par des classes', isCorrect: false },
        { id: 'c', text: 'Les types sont vérifiés uniquement à l\'exécution', isCorrect: false },
        { id: 'd', text: 'Il n\'y a aucune différence technique', isCorrect: false }
      ],
      explanation: 'Les interfaces peuvent être réouvertes et fusionnées par TypeScript, ce qui est très utile pour étendre des bibliothèques.',
      category: 'TypeScript',
      difficulty: 'difficile',
      timeLimit: 35
    },
    {
      id: 'ext-ts-4',
      text: 'Comment restreindre un type générique `<T>` pour qu\'il possède obligatoirement une propriété `id: string` ?',
      options: [
        { id: 'a', text: '<T extends { id: string }>', isCorrect: true },
        { id: 'b', text: '<T implements { id: string }>', isCorrect: false },
        { id: 'c', text: '<T : { id: string }>', isCorrect: false },
        { id: 'd', text: '<T with { id: string }>', isCorrect: false }
      ],
      explanation: 'La clause `extends` impose une contrainte de structure sur le paramètre générique.',
      category: 'TypeScript',
      difficulty: 'moyen',
      timeLimit: 30
    }
  ],

  // React
  'React': [
    {
      id: 'ext-react-1',
      text: 'Quel Hook React est conçu pour exécuter des effets secondaires après le rendu du composant ?',
      options: [
        { id: 'a', text: 'useEffect', isCorrect: true },
        { id: 'b', text: 'useState', isCorrect: false },
        { id: 'c', text: 'useMemo', isCorrect: false },
        { id: 'd', text: 'useCallback', isCorrect: false }
      ],
      explanation: 'useEffect permet de gérer les abonnements, timers et requêtes HTTP après affichage du DOM.',
      category: 'React',
      difficulty: 'facile',
      timeLimit: 25
    },
    {
      id: 'ext-react-2',
      text: 'Pourquoi ne faut-il jamais muter directement un état React (ex: state.push(item)) ?',
      options: [
        { id: 'a', text: 'React compare les références mémoires : la mutation directe empêche la détection et le re-render', isCorrect: true },
        { id: 'b', text: 'Le navigateur lance une exception synchrone', isCorrect: false },
        { id: 'c', text: 'Cela supprime automatiquement le composant du DOM', isCorrect: false },
        { id: 'd', text: 'JavaScript interdit la mutation d\'objets', isCorrect: false }
      ],
      explanation: 'L\'immutabilité garantit que la référence change, déclenchant ainsi l\'algorithme de réconciliation de React.',
      category: 'React',
      difficulty: 'moyen',
      timeLimit: 30
    },
    {
      id: 'ext-react-3',
      text: 'À quoi sert le Hook `useMemo` ?',
      options: [
        { id: 'a', text: 'Mémoriser le résultat d\'un calcul coûteux entre les rendus tant que ses dépendances ne changent pas', isCorrect: true },
        { id: 'b', text: 'Sauvegarder des données dans le localStorage', isCorrect: false },
        { id: 'c', text: 'Créer un composant asynchrone', isCorrect: false },
        { id: 'd', text: 'Remplacer Redux', isCorrect: false }
      ],
      explanation: 'useMemo mémorise une valeur calculée pour éviter des recalculs superflus lors des re-renders.',
      category: 'React',
      difficulty: 'moyen',
      timeLimit: 30
    },
    {
      id: 'ext-react-4',
      text: 'Dans React 18, qu\'est-ce que le mode Concurrent permet ?',
      options: [
        { id: 'a', text: 'Interrompre et prioriser des rendus pour garder l\'interface réactive aux actions de l\'utilisateur', isCorrect: true },
        { id: 'b', text: 'Exécuter du code sur plusieurs processeurs matériels', isCorrect: false },
        { id: 'c', text: 'Compiler React en WebAssembly', isCorrect: false },
        { id: 'd', text: 'Supprimer le Virtual DOM', isCorrect: false }
      ],
      explanation: 'Le moteur de rendu concurrent peut mettre en pause des tâches lourdes pour traiter immédiatement une frappe clavier.',
      category: 'React',
      difficulty: 'difficile',
      timeLimit: 40
    }
  ],

  // Python
  'Python': [
    {
      id: 'ext-py-1',
      text: 'Quelle est la différence majeure entre une liste et un tuple en Python ?',
      options: [
        { id: 'a', text: 'Une liste est mutable, tandis qu\'un tuple est immuable', isCorrect: true },
        { id: 'b', text: 'Un tuple ne peut contenir que des entiers', isCorrect: false },
        { id: 'c', text: 'Les listes sont écrites avec des parenthèses', isCorrect: false },
        { id: 'd', text: 'Les tuples sont toujours plus lents que les listes', isCorrect: false }
      ],
      explanation: 'Les tuples ne peuvent plus être modifiés après instanciation, ce qui les rend hachables et plus légers en mémoire.',
      category: 'Python',
      difficulty: 'facile',
      timeLimit: 25
    },
    {
      id: 'ext-py-2',
      text: 'Que produit le mot-clé `yield` dans une fonction Python ?',
      options: [
        { id: 'a', text: 'Transforme la fonction en générateur qui produit des valeurs à la demande sans tout charger en mémoire', isCorrect: true },
        { id: 'b', text: 'Arrête immédiatement l\'exécution du script', isCorrect: false },
        { id: 'c', text: 'Lance une exception personnalisée', isCorrect: false },
        { id: 'd', text: 'Force le Garbage Collector à s\'exécuter', isCorrect: false }
      ],
      explanation: '`yield` suspend l\'exécution de la fonction et renvoie une valeur au générateur, conservant l\'état local.',
      category: 'Python',
      difficulty: 'moyen',
      timeLimit: 30
    },
    {
      id: 'ext-py-3',
      text: 'Quel décorateur permet de définir une méthode statique qui ne reçoit ni `self` ni `cls` en paramètre ?',
      options: [
        { id: 'a', text: '@staticmethod', isCorrect: true },
        { id: 'b', text: '@classmethod', isCorrect: false },
        { id: 'c', text: '@property', isCorrect: false },
        { id: 'd', text: '@abstractmethod', isCorrect: false }
      ],
      explanation: '@staticmethod crée une fonction indépendante de l\'état d\'instance ou de classe.',
      category: 'Python',
      difficulty: 'facile',
      timeLimit: 25
    },
    {
      id: 'ext-py-4',
      text: 'En Python, que fait le gestionnaire de contexte (`with statement`) en cas d\'exception ?',
      options: [
        { id: 'a', text: 'Il appelle la méthode __exit__ pour fermer proprement les ressources même si une erreur survient', isCorrect: true },
        { id: 'b', text: 'Il ignore silencieusement l\'erreur', isCorrect: false },
        { id: 'c', text: 'Il relance le programme depuis le début', isCorrect: false },
        { id: 'd', text: 'Il désactive le typage dynamique', isCorrect: false }
      ],
      explanation: '__exit__ est garanti d\'être appelé, sécurisant la fermeture de fichiers, sockets ou verrous.',
      category: 'Python',
      difficulty: 'difficile',
      timeLimit: 35
    }
  ],

  // Node.js
  'Node.js': [
    {
      id: 'ext-node-1',
      text: 'Quel composant central de Node.js gère les entrées/sorties non bloquantes et les callbacks asynchrones ?',
      options: [
        { id: 'a', text: 'L\'Event Loop (Boucle d\'événements)', isCorrect: true },
        { id: 'b', text: 'Le compilateur JIT de V8 uniquement', isCorrect: false },
        { id: 'c', text: 'Le module Apache HTTP', isCorrect: false },
        { id: 'd', text: 'Le parseur JSON', isCorrect: false }
      ],
      explanation: 'L\'Event Loop orchestre l\'exécution du code synchrone et délègue les opérations I/O au système d\'exploitation (via libuv).',
      category: 'Node.js',
      difficulty: 'facile',
      timeLimit: 30
    },
    {
      id: 'ext-node-2',
      text: 'Pourquoi est-il risqué d\'exécuter des calculs CPU intensifs (ex: hashage bloquant) sur le thread principal de Node.js ?',
      options: [
        { id: 'a', text: 'Car Node.js est mono-thread pour l\'exécution JavaScript : cela gèle le serveur pour toutes les requêtes clientes', isCorrect: true },
        { id: 'b', text: 'Car la mémoire vive est immédiatement saturée', isCorrect: false },
        { id: 'c', text: 'Car les fichiers source sont corrompus', isCorrect: false },
        { id: 'd', text: 'Ce n\'est pas risqué, Node.js gère automatiquement le multi-coeur', isCorrect: false }
      ],
      explanation: 'Le thread principal doit rester libre pour répondre aux nouveaux événements de l\'Event Loop. Pour le calcul lourd, on utilise les Worker Threads.',
      category: 'Node.js',
      difficulty: 'moyen',
      timeLimit: 35
    },
    {
      id: 'ext-node-3',
      text: 'Quel middleware Express.js est indispensable pour parser les requêtes POST au format JSON ?',
      options: [
        { id: 'a', text: 'express.json()', isCorrect: true },
        { id: 'b', text: 'express.urlencoded() uniquement', isCorrect: false },
        { id: 'c', text: 'express.static()', isCorrect: false },
        { id: 'd', text: 'express.router()', isCorrect: false }
      ],
      explanation: 'express.json() décode le body JSON entrant et le place dans `req.body`.',
      category: 'Node.js',
      difficulty: 'facile',
      timeLimit: 25
    },
    {
      id: 'ext-node-4',
      text: 'Quelle est la différence entre `process.nextTick()` et `setImmediate()` en Node.js ?',
      options: [
        { id: 'a', text: '`process.nextTick` s\'exécute immédiatement avant le tour suivant de l\'Event Loop, avant les phases I/O', isCorrect: true },
        { id: 'b', text: '`setImmediate` est toujours plus prioritaire que `nextTick`', isCorrect: false },
        { id: 'c', text: 'Les deux fonctions sont des alias stricts de `setTimeout(0)`', isCorrect: false },
        { id: 'd', text: '`nextTick` s\'exécute uniquement dans les Workers', isCorrect: false }
      ],
      explanation: 'La file de micro-tâches de `process.nextTick` est vidée dès la fin de l\'opération courante, avant que l\'Event Loop ne poursuive.',
      category: 'Node.js',
      difficulty: 'difficile',
      timeLimit: 40
    }
  ],

  // SQL
  'SQL': [
    {
      id: 'ext-sql-1',
      text: 'Quelle clause SQL permet de filtrer les résultats d\'une fonction d\'agrégation (ex. COUNT > 5) ?',
      options: [
        { id: 'a', text: 'HAVING', isCorrect: true },
        { id: 'b', text: 'WHERE', isCorrect: false },
        { id: 'c', text: 'GROUP BY', isCorrect: false },
        { id: 'd', text: 'FILTER BY', isCorrect: false }
      ],
      explanation: 'WHERE filtre les lignes individuelles avant agrégation, tandis que HAVING filtre après le GROUP BY.',
      category: 'SQL',
      difficulty: 'facile',
      timeLimit: 25
    },
    {
      id: 'ext-sql-2',
      text: 'Que garantit le "I" dans les propriétés ACID d\'une base de données relationnelle ?',
      options: [
        { id: 'a', text: 'Isolation : les transactions concurrentes ne s\'interfèrent pas et produisent un état cohérent', isCorrect: true },
        { id: 'b', text: 'Intégrité : interdiction de supprimer une clé primaire', isCorrect: false },
        { id: 'c', text: 'Indexation : recherche en O(1)', isCorrect: false },
        { id: 'd', text: 'Immutabilité : données non modifiables', isCorrect: false }
      ],
      explanation: 'L\'isolation isole les effets d\'une transaction non validée vis-à-vis des autres transactions en cours.',
      category: 'SQL',
      difficulty: 'moyen',
      timeLimit: 30
    },
    {
      id: 'ext-sql-3',
      text: 'Quel type d\'index est le plus couramment utilisé par défaut pour les clés primaires dans PostgreSQL ou MySQL ?',
      options: [
        { id: 'a', text: 'B-Tree (Arbre B)', isCorrect: true },
        { id: 'b', text: 'Hash Index', isCorrect: false },
        { id: 'c', text: 'GiST Index', isCorrect: false },
        { id: 'd', text: 'Bitmap Index', isCorrect: false }
      ],
      explanation: 'Le B-Tree est très efficace pour les recherches exactes, les intervalles (`BETWEEN`) et les tris (`ORDER BY`).',
      category: 'SQL',
      difficulty: 'moyen',
      timeLimit: 30
    },
    {
      id: 'ext-sql-4',
      text: 'Quelle est la conséquence d\'une requête SQL effectuant un `FULL TABLE SCAN` sur une table de 10 millions de lignes ?',
      options: [
        { id: 'a', text: 'Temps de réponse très élevé et forte charge I/O disque car chaque bloc est lu séquentiellement', isCorrect: true },
        { id: 'b', text: 'Verrouillage permanent de la base de données', isCorrect: false },
        { id: 'c', text: 'Création automatique d\'un index invisible', isCorrect: false },
        { id: 'd', text: 'Aucun impact si la table est en mémoire cache', isCorrect: false }
      ],
      explanation: 'Un Full Table Scan lit l\'intégralité des données sur disque faute d\'index utilisable par le planificateur de requêtes.',
      category: 'SQL',
      difficulty: 'difficile',
      timeLimit: 35
    }
  ],

  // Docker
  'Docker': [
    {
      id: 'ext-doc-1',
      text: 'Dans un Dockerfile, quelle instruction permet d\'optimiser la taille de l\'image finale en compilant d\'abord dans une étape temporaire ?',
      options: [
        { id: 'a', text: 'Le Multi-stage build (ex: FROM node AS build ... FROM nginx)', isCorrect: true },
        { id: 'b', text: 'L\'instruction DOCKER_REDUCE', isCorrect: false },
        { id: 'c', text: 'Le flag --squash uniquement à la fin', isCorrect: false },
        { id: 'd', text: 'L\'utilisation de sudo dans le conteneur', isCorrect: false }
      ],
      explanation: 'Les builds multi-étapes permettent de copier uniquement les artefacts de production finaux dans une image propre et légère.',
      category: 'Docker',
      difficulty: 'moyen',
      timeLimit: 30
    },
    {
      id: 'ext-doc-2',
      text: 'Quelle commande permet de visualiser les conteneurs en cours d\'exécution ?',
      options: [
        { id: 'a', text: 'docker ps', isCorrect: true },
        { id: 'b', text: 'docker list', isCorrect: false },
        { id: 'c', text: 'docker show', isCorrect: false },
        { id: 'd', text: 'docker top-all', isCorrect: false }
      ],
      explanation: '`docker ps` affiche la liste des conteneurs actifs avec leurs identifiants, images et ports.',
      category: 'Docker',
      difficulty: 'facile',
      timeLimit: 20
    },
    {
      id: 'ext-doc-3',
      text: 'Pourquoi est-il déconseillé de faire tourner une application sous l\'utilisateur `root` dans un conteneur ?',
      options: [
        { id: 'a', text: 'Pour des raisons de sécurité : en cas d\'évasion du conteneur, l\'attaquant obtient les privilèges root sur l\'hôte', isCorrect: true },
        { id: 'b', text: 'Car Linux bloque les conteneurs root par défaut', isCorrect: false },
        { id: 'c', text: 'Car l\'image prend 2 fois plus de place', isCorrect: false },
        { id: 'd', text: 'Car le réseau ne fonctionne pas en root', isCorrect: false }
      ],
      explanation: 'Le principe de moindre privilège impose d\'utiliser une directive `USER node` ou `USER app` non privilégiée.',
      category: 'Docker',
      difficulty: 'moyen',
      timeLimit: 30
    },
    {
      id: 'ext-doc-4',
      text: 'À quoi sert un volume Docker (`docker volume`) ?',
      options: [
        { id: 'a', text: 'Persister les données en dehors du cycle de vie éphémère du conteneur', isCorrect: true },
        { id: 'b', text: 'Régler le son de la machine hôte', isCorrect: false },
        { id: 'c', text: 'Compresser les logs d\'application', isCorrect: false },
        { id: 'd', text: 'Accélérer la vitesse du CPU', isCorrect: false }
      ],
      explanation: 'Les volumes sont gérés par Docker et permettent de conserver des données (base de données, uploads) même après destruction du conteneur.',
      category: 'Docker',
      difficulty: 'facile',
      timeLimit: 25
    }
  ],

  // Git
  'Git': [
    {
      id: 'ext-git-1',
      text: 'Quelle commande Git permet d\'annuler les modifications locales non indexées sur un fichier spécifique ?',
      options: [
        { id: 'a', text: 'git restore <fichier>', isCorrect: true },
        { id: 'b', text: 'git remove <fichier>', isCorrect: false },
        { id: 'c', text: 'git reset --commit <fichier>', isCorrect: false },
        { id: 'd', text: 'git drop <fichier>', isCorrect: false }
      ],
      explanation: '`git restore <fichier>` rétablit l\'état du fichier de travail d\'après le dernier commit ou l\'index.',
      category: 'Git',
      difficulty: 'facile',
      timeLimit: 25
    },
    {
      id: 'ext-git-2',
      text: 'Quelle est la différence fondamentale entre `git merge` et `git rebase` ?',
      options: [
        { id: 'a', text: '`merge` conserve l\'historique d\'origine avec un commit de fusion, tandis que `rebase` réécrit l\'historique de façon linéaire', isCorrect: true },
        { id: 'b', text: '`rebase` supprime les commits définitivement sans fusionner', isCorrect: false },
        { id: 'c', text: '`merge` ne fonctionne que sur la branche main', isCorrect: false },
        { id: 'd', text: 'Il n\'y a aucune différence pratique', isCorrect: false }
      ],
      explanation: 'Rebase rejoue vos commits au-dessus de la branche cible pour produire un arbre Git linéaire et lisible.',
      category: 'Git',
      difficulty: 'moyen',
      timeLimit: 30
    },
    {
      id: 'ext-git-3',
      text: 'À quoi sert la commande `git stash` ?',
      options: [
        { id: 'a', text: 'Mettre temporairement de côté les modifications en cours pour retrouver un état de travail propre', isCorrect: true },
        { id: 'b', text: 'Supprimer définitivement la branche courante', isCorrect: false },
        { id: 'c', text: 'Publier les commits sur GitHub', isCorrect: false },
        { id: 'd', text: 'Créer un tag de version', isCorrect: false }
      ],
      explanation: '`git stash` stocke les modifications non commitées dans une pile pour vous permettre de changer de branche sans perdre votre travail.',
      category: 'Git',
      difficulty: 'facile',
      timeLimit: 25
    },
    {
      id: 'ext-git-4',
      text: 'Quelle commande permet de modifier le message du tout dernier commit sans en créer un nouveau ?',
      options: [
        { id: 'a', text: 'git commit --amend', isCorrect: true },
        { id: 'b', text: 'git commit --update', isCorrect: false },
        { id: 'c', text: 'git revert HEAD', isCorrect: false },
        { id: 'd', text: 'git reword', isCorrect: false }
      ],
      explanation: '`git commit --amend` combine les modifications indexées avec le dernier commit et permet de rééditer son message.',
      category: 'Git',
      difficulty: 'moyen',
      timeLimit: 25
    }
  ]
};

export const GENERAL_QCM_POOL: QcmQuestion[] = [
  {
    id: 'gen-1',
    text: 'Selon la méthodologie Agile Scrum, quel est l\'objectif principal du Daily Standup (mêlée quotidienne) ?',
    options: [
      { id: 'a', text: 'Synchroniser l\'équipe sur l\'avancement du sprint et lever les points de blocage en 15 minutes', isCorrect: true },
      { id: 'b', text: 'Faire un compte-rendu exhaustif à la direction générale', isCorrect: false },
      { id: 'c', text: 'Attribuer de nouvelles fonctionnalités aux développeurs', isCorrect: false },
      { id: 'd', text: 'Négocier les budgets du projet', isCorrect: false }
    ],
    explanation: 'Le Daily permet de faire le point rapidement sur ce qui a été fait, ce qui va être fait et les obstacles éventuels.',
    category: 'Méthodologie & Agilité',
    difficulty: 'facile',
    timeLimit: 30
  },
  {
    id: 'gen-2',
    text: 'Quelle est la première étape recommandée face à un bug complexe en production ?',
    options: [
      { id: 'a', text: 'Isoler le problème, reproduire le comportement anormal et analyser les logs avant de coder un correctif', isCorrect: true },
      { id: 'b', text: 'Redémarrer immédiatement tous les serveurs à l\'aveugle', isCorrect: false },
      { id: 'c', text: 'Accuser le développeur qui a fait le dernier commit', isCorrect: false },
      { id: 'd', text: 'Réécrire l\'application dans un autre langage', isCorrect: false }
    ],
    explanation: 'Une démarche méthodique de diagnostic et de reproduction évite les régressions et résout la cause racine.',
    category: 'Méthodologie & Agilité',
    difficulty: 'facile',
    timeLimit: 30
  },
  {
    id: 'gen-3',
    text: 'Que préconise le principe SOLID du "S" (Single Responsibility Principle) ?',
    options: [
      { id: 'a', text: 'Une classe ou un module ne doit avoir qu\'une seule et unique raison de changer', isCorrect: true },
      { id: 'b', text: 'Un fichier de code ne doit contenir qu\'une seule ligne', isCorrect: false },
      { id: 'c', text: 'Tous les projets doivent être gérés par une seule personne', isCorrect: false },
      { id: 'd', text: 'Une seule base de données par entreprise', isCorrect: false }
    ],
    explanation: 'La responsabilité unique garantit une haute cohésion et simplifie la maintenance et les tests.',
    category: 'Architecture & Bonnes Pratiques',
    difficulty: 'moyen',
    timeLimit: 30
  },
  {
    id: 'gen-4',
    text: 'Quelle attitude favorise un travail d\'équipe harmonieux lors d\'une revue de code (Code Review) ?',
    options: [
      { id: 'a', text: 'Faire des retours constructifs et bienveillants centrés sur le code, pas sur la personne', isCorrect: true },
      { id: 'b', text: 'Rejeter immédiatement toute pull request sans explications', isCorrect: false },
      { id: 'c', text: 'Valider systématiquement sans relire pour aller vite', isCorrect: false },
      { id: 'd', text: 'Imposer ses préférences stylistiques non documentées', isCorrect: false }
    ],
    explanation: 'La bienveillance et le partage de connaissances sont au cœur d\'une culture d\'ingénierie saine.',
    category: 'Communication & RH',
    difficulty: 'facile',
    timeLimit: 25
  },
  {
    id: 'gen-5',
    text: 'En quoi consiste l\'intégration continue (CI) ?',
    options: [
      { id: 'a', text: 'Automatiser la vérification, le linting et les tests du code à chaque modification poussée sur le dépôt', isCorrect: true },
      { id: 'b', text: 'Déployer manuellement un fichier zip sur un serveur FTP le week-end', isCorrect: false },
      { id: 'c', text: 'Travailler sans faire de commit pendant plusieurs mois', isCorrect: false },
      { id: 'd', text: 'Embaucher des développeurs en continu', isCorrect: false }
    ],
    explanation: 'La CI détecte les régressions au plus tôt dans le cycle de développement.',
    category: 'DevOps & Qualité',
    difficulty: 'facile',
    timeLimit: 30
  },
  {
    id: 'gen-6',
    text: 'Quelle méthode de communication structure efficacement une réponse à une question comportementale en entretien ?',
    options: [
      { id: 'a', text: 'La méthode STAR (Situation, Tâche, Action, Résultat)', isCorrect: true },
      { id: 'b', text: 'La méthode FIFO (First In, First Out)', isCorrect: false },
      { id: 'c', text: 'Le monologue ininterrompu', isCorrect: false },
      { id: 'd', text: 'La méthode CRUD', isCorrect: false }
    ],
    explanation: 'STAR permet d\'illustrer concrètement vos compétences avec un exemple clair et mesurable.',
    category: 'Communication & RH',
    difficulty: 'facile',
    timeLimit: 25
  },
  {
    id: 'gen-7',
    text: 'Qu\'est-ce qu\'une dette technique dans un projet logiciel ?',
    options: [
      { id: 'a', text: 'Le coût futur de refactoring induit par des choix de développement rapides ou des raccourcis pris aujourd\'hui', isCorrect: true },
      { id: 'b', text: 'Une facture d\'électricité impayée du centre de données', isCorrect: false },
      { id: 'c', text: 'Le salaire impayé d\'un freelance', isCorrect: false },
      { id: 'd', text: 'Un bug impossible à corriger', isCorrect: false }
    ],
    explanation: 'La dette technique doit être remboursée régulièrement par des refactorings pour éviter la dégradation du projet.',
    category: 'Architecture & Bonnes Pratiques',
    difficulty: 'moyen',
    timeLimit: 30
  },
  {
    id: 'gen-8',
    text: 'Comment réagir professionnellement face à une question d\'entretien technique dont vous ignorez la réponse ?',
    options: [
      { id: 'a', text: 'Reconnaître honnêtement que vous ne maîtrisez pas le point, tout en expliquant comment vous chercheriez la solution', isCorrect: true },
      { id: 'b', text: 'Inventer une fausse réponse avec assurance pour bluffer l\'interlocuteur', isCorrect: false },
      { id: 'c', text: 'Garder le silence total pendant plusieurs minutes', isCorrect: false },
      { id: 'd', text: 'Critiquer la pertinence de la question', isCorrect: false }
    ],
    explanation: 'L\'honnêteté intellectuelle et la capacité d\'apprentissage sont très valorisées par les recruteurs techniques.',
    category: 'Communication & RH',
    difficulty: 'facile',
    timeLimit: 30
  },
  {
    id: 'gen-9',
    text: 'Quel est l\'intérêt d\'écrire des tests unitaires automatisés ?',
    options: [
      { id: 'a', text: 'Garantir que chaque brique fonctionne isolément et prévenir les régressions lors des évolutions futures', isCorrect: true },
      { id: 'b', text: 'Remplacer totalement les tests utilisateurs', isCorrect: false },
      { id: 'c', text: 'Augmenter artificiellement le nombre de lignes de code', isCorrect: false },
      { id: 'd', text: 'Rendre le code plus difficile à comprendre', isCorrect: false }
    ],
    explanation: 'Les tests unitaires apportent la confiance nécessaire pour refactorer et livrer sereinement.',
    category: 'DevOps & Qualité',
    difficulty: 'facile',
    timeLimit: 25
  },
  {
    id: 'gen-10',
    text: 'Lorsqu\'un projet accuse un retard sur le planning, quelle est la meilleure pratique ?',
    options: [
      { id: 'a', text: 'Communiquer de manière transparente dès que le risque est identifié et proposer des arbitrages sur le périmètre', isCorrect: true },
      { id: 'b', text: 'Cacher le retard jusqu\'à la date de livraison finale', isCorrect: false },
      { id: 'c', text: 'Supprimer tous les tests et la documentation pour livrer à temps', isCorrect: false },
      { id: 'd', text: 'Ajouter dix développeurs sans les former la veille de la livraison', isCorrect: false }
    ],
    explanation: 'L\'anticipation et la négociation du scope (loi de Brooks) permettent de sécuriser la qualité et la confiance client.',
    category: 'Méthodologie & Agilité',
    difficulty: 'moyen',
    timeLimit: 30
  }
];
