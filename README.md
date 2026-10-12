# IntervIA — Plateforme IA de Préparation aux Entretiens de Recrutement

**IntervIA** est une application web desktop-first conçue pour accompagner les candidats (étudiants en quête de stage et professionnels en recherche d'emploi) dans leur préparation aux entretiens d'embauche grâce à une suite d'outils interactifs alimentés par l'IA : simulation vidéo avec diagnostic multimodal (langage, posture, stress, clarté), quiz QCM ciblés, tests techniques de code avec console d'exécution intégrée, et mise en relation directe avec les offres de nos entreprises partenaires.

L'expérience utilisateur a été spécialement pensée pour les personnes anxieuses ou présentant des traits TDAH : une seule action principale par écran, feedbacks immédiats et bienveillants, réduction de la charge cognitive, et progression constamment visible.

---

## 🚀 Installation & Lancement Rapide

### Prérequis
- **Node.js** (v18+ ou v20+)
- **NPM** (v9+)
- **Angular CLI** (v17+)

### Commandes
```bash
# Cloner le projet ou se positionner dans le dossier
cd intervia

# Installer les dépendances
npm install

# Démarrer le serveur de développement local
ng serve
```

L'application sera accessible sur [http://localhost:4200/](http://localhost:4200/).

---

## 👥 Comptes de Démonstration (Accès Rapide)

Des boutons de **connexion en 1-clic** sont directement disponibles sur la page de connexion (`/connexion`) :

| Rôle | Email | Mot de passe | Accès & Profil |
| :--- | :--- | :--- | :--- |
| **Candidat (Yassine)** | `yassine@intervia.tn` | `demo123` | Accès Tableau de bord, Simulations RH, QCM, Tests de code, Offres, Profil |
| **Administrateur** | `admin@intervia.tn` | `demo123` | Accès au Back-Office d'administration (`/admin`), supervision des scores, modération et configuration IA |

---

## 🧭 Architecture & Parcours de l'Application

1. **`/connexion`** : Authentification fluide avec validation en temps réel et accès rapide 1-clic Démo.
2. **`/inscription`** : Tunnel d'onboarding en étapes (Stage vs Emploi, domaine, CV et LinkedIn simulés).
3. **`/dashboard`** : Tableau de bord candidat avec anneaux de progression SVG, score global dynamique, offre du jour recommandée selon le profil (stage/emploi), et hub d'entraînement rapide.
4. **`/simulation-rh`** : Entretien vidéo assisté par IA. Phase 1 : diagnostic matériel complet (caméra, micro, connexion, navigateur) avec aperçu vidéo en direct et repli automatique en mode texte si caméra absente. Phase 2 : questions rythmées par minuteur auto-réinitialisable, ondes audio et astuces IA.
5. **`/qcm`** : Quiz fondamentaux par domaine (Angular, TypeScript, Performance, Soft Skills) avec feedback immédiat et explication pédagogique.
6. **`/test-technique`** : Exercice algorithmique en situation réelle avec éditeur de code typé et console de tests unitaires intégrée.
7. **`/resultats`** : Synthèse d'évaluation post-simulation avec grand score badge (Or, Argent, Bronze), barres de compétences, diagnostic IA sur 4 piliers (Langage, Posture, Stress, Clarté), plan d'actions concrètes et historique d'évolution.
8. **`/offres`** : Catalogue d'opportunités avec filtres avancés (type stage/emploi, contrat, score requis) et vérification d'éligibilité selon le score candidat.
9. **`/profil`** : Gestion des informations personnelles, modification de l'objectif (stage vs emploi) et téléchargement simulé du certificat d'aptitude.
10. **`/admin`** : Espace d'administration protégé (`adminGuard`) avec supervision globale, gestion et activation des comptes candidats, gestion des modules de simulation, modération de contenu et configuration des seuils IA.

---

## 🎨 Choix Techniques & Design System

- **Framework :** Angular 17+ (Architecture 100% Standalone Components, Signals réactifs, Control Flow `@if` / `@for`).
- **Styling :** SCSS modulaire sans frameworks CSS tiers intrusifs, respect strict des tokens CSS custom properties (`--color-primary: #6B2D3C`, `--color-bg: #FBF7F4`, typographie Inter, ombres douces et transitions fluides).
- **Accessibilité (A11y) :** Navigation clavier intégrale (`role`, `tabindex="0"`, touches `Entrée` / `Espace`), focus visibles, balises ARIA, et contrastes vérifiés conformes WCAG AA.
- **Gestion d'état :** Services Angular injectables avec `Signals` pour une réactivité optimale et des détections de changements ciblées.

---

## 💡 Nouvelle Fonctionnalité : "Préparer une offre" (`/preparation`)

La fonctionnalité **"Préparer une offre"** permet à tout candidat de soumettre une offre d'emploi ou de stage (texte collé libre, sélection d'une offre partenaire ou saisie manuelle) pour obtenir instantanément un parcours de préparation sur mesure en trois volets :
1. **Entretien RH ciblé** (6 questions personnalisées avec l'intitulé du poste, le nom de l'entreprise et la compétence clé).
2. **QCM de validation** (10 questions de quiz ciblées sur les technologies requises et les bonnes pratiques logicielles).
3. **Défi de code appliqué** (exercice technique adapté au langage et au niveau détecté : débutant, intermédiaire ou avancé).

### Fonctionnement de la génération simulée vs API IA réelle

Dans cette version front-end autonome (sans backend requis) :
- **Moteur de règles heuristiques :** Le service [`PreparationService`](file:///src/app/core/services/preparation.service.ts) analyse le texte de l'offre (insensible à la casse et aux accents) pour extraire l'intitulé, l'entreprise, le type d'offre (stage PFE vs emploi) et jusqu'à 5 compétences clés.
- **Détection de niveau :** Détection automatique (`debutant`, `intermediaire`, `avance`) selon les termes détectés (*senior*, *stage*, *junior*, etc.).
- **Génération dynamique des modules :** Les questions RH injectent les informations contextuelles via des templates paramétrés ; le QCM sélectionne 10 questions parmi la banque étendue [`EXTENDED_QCM_BANK`](file:///src/app/core/data/qcm-bank.data.ts) et la réserve générale [`GENERAL_QCM_POOL`](file:///src/app/core/data/qcm-bank.data.ts) ; le défi technique est extrait de [`TECH_EXERCISES_BANK`](file:///src/app/core/data/tech-exercises.data.ts).
- **Remplacement par une API IA en production :** Pour connecter un grand modèle de langage réel (ex. Gemini Pro via backend NestJS/FastAPI), il suffit de remplacer la méthode `generatePreparationPlan()` par un appel HTTP `POST /api/ai/analyze-offer` retournant le même contrat d'interface [`PreparationPlan`](file:///src/app/core/models/preparation.model.ts).

---

## ⚠️ Limites Connues

- Les analyses vidéo multimodales (détection de regard, BPM cardiaque, reconnaissance vocale) sont simulées via des algorithmes mock intelligents intégrés dans les services Angular (`SimulationService`, `ResultsService`).
- L'analyse d'offre et la génération du parcours personnalisé sont opérées côté frontend par le moteur de règles réactif de `PreparationService`.
- L'import de CV et l'exportation du certificat PDF sont simulés côté frontend avec retours visuels interactifs et notifications claires.
