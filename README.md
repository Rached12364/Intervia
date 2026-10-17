# IntervIA — Plateforme IA de Préparation aux Entretiens de Recrutement

**IntervIA** est une application web desktop-first (1440 px) conçue pour accompagner les candidats (étudiants en quête de stage PFE et professionnels en recherche d'emploi) dans leur préparation aux entretiens d'embauche grâce à une suite d'outils interactifs alimentés par l'IA : simulation vidéo avec diagnostic multimodal (langage, posture, stress, clarté), quiz QCM ciblés, tests techniques de code avec console d'exécution intégrée, et mise en relation directe avec les offres de nos entreprises partenaires.

L'expérience utilisateur a été spécialement pensée pour les personnes anxieuses ou présentant des traits TDAH : une seule action principale par écran, messages bienveillants (jamais culpabilisants), feedbacks immédiats, réduction de la charge cognitive, et progression constamment visible.

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
npx ng serve --port 4200

# Compiler pour la production (0 erreur, 0 avertissement)
npx ng build
```

L'application est accessible sur [http://localhost:4200/](http://localhost:4200/).

---

## 👥 Comptes de Démonstration (Accès Rapide)

Des cartes de rôle interactives et des connexions en 1-clic sont directement disponibles sur la page de connexion (`/connexion`) et la page d'accueil (`/`) :

| Rôle | Email | Mot de passe | Accès & Profil |
| :--- | :--- | :--- | :--- |
| **Candidat (Mohamed)** | `mohamed@intervia.tn` | `demo123` | Accès Tableau de bord, Simulations RH, QCM, Tests de code, Offres, Profil |
| **Administrateur** | `admin@intervia.tn` | `demo123` | Accès au Back-Office d'administration (`/admin`), supervision des scores, modération et configuration IA |

---

## 🧭 Architecture & Routes de l'Application

Toutes les pages sont chargées à la demande (*lazy loading*) et intègrent leurs états de chargement, vide et erreur.

### Routes Publiques (protégées par `guestGuard` pour les utilisateurs connectés)
1. **`/` (Accueil Hello — Page interactive & accessible)** :
   - Interrupteur d'accessibilité « Réduire les animations » en haut de page (mémorisé, respectant aussi `prefers-reduced-motion`).
   - Héros « Du stress au calme » avec `<app-hero-background>` et `<app-floating-symbols>` : couche décorative interactive de symboles flottants (16 sur grand écran, 8 sur mobile, trait 1,5 px) dérivant doucement via `requestAnimationFrame` hors zone Angular, évitement de la souris, éclatement au clic avec étiquette éphémère (1,5 s), vitesse asservie au curseur de stress et ralentie en mode respiration.
   - Gestion vidéo (muted, loop, playsinline) avec repli automatique sur maillage de dégradés CSS animé et bouton pause/lecture (`aria-pressed`).
   - Jauge de stress interactive de 10 à 0 avec 3 formules de titre adaptées (« Le stress, on le connaît », « On respire », « Votre potentiel, pas votre stress ») et exercice guidé de respiration 10s.
   - Sélecteur de profil « Un stage (PFE) » vs « Un emploi » (`role="radiogroup"`, flèches) orientant vers `/inscription?profil=stage` ou `/inscription?profil=emploi`.
   - Section « L'IA vous écoute » : simulation vidéo avec 4 pastilles d'analyse rotatives (regard, débit, clarté, posture) se figeant au survol ou au focus.
   - Section « Votre parcours en un clic » : nuage de 12 compétences interactives avec calcul en temps réel des questions RH, QCM et tests techniques.
   - Section « Mini-entretien de 30 secondes » : test d'une question sans micro, onde sonore, minuteur et 4 cartes de restitution simulée.
   - Section « Du CV au oui » : 4 étapes apparaissant au défilement (`IntersectionObserver`) avec tracé progressif de la coche SVG du logo.
   - Appel final et réassurance sur la confidentialité locale.
2. **`/connexion`** : Page de connexion interactive.
   - 2 cartes de rôle préremplissant automatiquement les identifiants avec lien "Connexion immédiate".
   - Détection en temps réel de la touche Verr. Maj. (*Caps Lock*).
   - Affichage/masquage du mot de passe avec attributs `aria-pressed`.
   - Validation de l'e-mail à la sortie du champ (*blur*).
   - Case "Se souvenir de mon adresse e-mail" (mémorise uniquement l'e-mail via `localStorage`).
   - Assistance calme proposée automatiquement après 3 échecs consécutifs.
   - Prise en charge du bandeau de confirmation post-réinitialisation (`?reset=success`).
3. **`/inscription`** : Tunnel d'onboarding en étapes (Stage vs Emploi, domaine, import CV et synchronisation LinkedIn simulés).
4. **`/mot-de-passe-oublie`** : Écran en 2 étapes pour réinitialiser son mot de passe en toute sérénité.
   - Étape 1 : Saisie de l'adresse e-mail avec validation immédiate.
   - Étape 2 (Confirmation) : Rappel de l'e-mail en gras, compte à rebours de 30 secondes avant réexpédition, bouton "Ouvrir le lien de démonstration" menant directement à `/reinitialisation`, et lien pour corriger son adresse.
5. **`/reinitialisation`** : Définition sécurisée du nouveau mot de passe.
   - Rappel discret de l'e-mail concerné.
   - Liste de critères de sécurité qui se cochent en direct (8+ caractères, 1 majuscule, 1 chiffre).
   - Validation de confirmation de mot de passe.
   - Détection des liens expirés via le paramètre de simulation `?expire=1` avec carte d'erreur bienveillante.
   - Validation et redirection automatique vers `/connexion?reset=success`.

### Routes Candidat (protégées par `candidateGuard`)
6. **`/dashboard`** : Tableau de bord candidat ("Bonjour Mohamed") avec anneaux de progression SVG, score global dynamique, offre du jour recommandée, et hub d'entraînement rapide.
7. **`/simulation-rh`** : Entretien vidéo assisté par IA avec diagnostic matériel complet (caméra, micro, connexion, navigateur) et repli automatique textuel.
8. **`/qcm`** : Quiz fondamentaux par domaine (Angular, TypeScript, Performance, Soft Skills) avec feedbacks pédagogiques instantanés.
9. **`/test-technique`** : Exercice algorithmique en situation réelle avec éditeur de code typé et console de tests unitaires intégrée.
10. **`/resultats`** : Synthèse d'évaluation post-simulation avec grand score badge (Or, Argent, Bronze), barres de compétences et plan d'actions concrètes.
11. **`/offres`** : Catalogue d'opportunités avec filtres avancés (type stage/emploi, contrat, score requis) et vérification d'éligibilité.
12. **`/profil`** : Gestion des informations personnelles, choix du parcours (stage vs emploi) et initiales dynamiques ("M" pour Mohamed).
13. **`/preparation`** : Génération instantanée d'un parcours d'entraînement sur mesure à partir de toute offre d'emploi ou de stage collée.
14. **`/ameliorer-cv`** : Outil d'amélioration de CV ou de profil LinkedIn en 4 étapes guidées (candidat uniquement).
    - **Étape 1 — Contenu :** Choix CV ou LinkedIn. CV : 3 méthodes (import fichier PDF/DOCX/TXT jusqu'à 5 Mo, coller le texte, CV de démonstration Mohamed Ben Ali). LinkedIn : 3 champs (Titre, À propos, Expériences) + bouton « Connecter LinkedIn (démonstration) ». Champ optionnel « Poste visé » avec sélecteur « Adapter à une offre » relié à `OffersService`. Messages d'erreur bienveillants annoncés en `aria-live`.
    - **Étape 2 — Analyse IA :** Écran d'attente apaisant (~3,4 s) avec avatar IA en état « réfléchit » et 3 cases se cochant successivement. Mention « Analyse simulée dans cette démonstration » visible.
    - **Étape 3 — Diagnostic :** Note globale /100, phrase d'encouragement de l'avatar IA, 5 barres de critères (Structure, Contenu, Résultats chiffrés, Mots-clés, Lisibilité), sections détectées, points forts, recommandations priorisées (haute/moyenne/basse) avec constat + importance + exemple avant → après. Cases à cocher pour contrôler les suggestions appliquées à l'étape 4.
    - **Étape 4 — Version corrigée :** Disposition 2 colonnes (version actuelle vs version proposée modifiable), encadré « À compléter par vous (N) » listant les emplacements `[ajoutez un chiffre : …]`, sélecteur de tonalité (sobre / dynamique), copie intégrale, téléchargement .txt, impression / enregistrement PDF (feuille de style `@media print`), sauvegarde en mémoire dans « Mes analyses », reprise possible depuis le tiroir d'historique. Rappel permanent de l'analyse simulée.

### Route Administration (protégée par `adminGuard`)
14. **`/admin`** : Espace d'administration avec supervision globale, gestion des candidats, gestion des modules de simulation et configuration IA.

---

## 🎨 Design System & Accessibilité (A11y)

- **Palette officielle (tirée du logo) :**
  - Primaire : Indigo `#4B2E8F` (survol `#3A2373`)
  - Marine (titres et texte fort) : `#0B2150`
  - Violet accent (focus visible, liens) : `#8838B0`
  - Rose-corail (décoratif) : `#E05A7B`
  - Dégradé de marque : `linear-gradient(135deg, #0E2B63 0%, #53358F 50%, #8838B0 100%)`
  - Fond de page `#F6F4FB`, surface blanche `#FFFFFF`, bordure `#E4E0F0`, texte secondaire `#5A5878`
  - Teinte claire `#EFEAFA` (sélections, bandeaux d'information)
- **Accessibilité WCAG AA :**
  - Navigation intégrale au clavier (`Tab`, flèches directionnelles sur radiogroups et onglets, `Entrée`, `Espace`).
  - Focus visible systématique via contour violet 3 px (`outline: 3px solid var(--color-accent)`).
  - Régions `aria-live` pour annoncer les erreurs, alertes et états dynamiques.
  - Textes en français au vouvoiement, clairs et sans culpabilisation.
- **Composants d'interface :**
  - `<app-logo>` : Recadré à 549×214 px (version complète) et 215×214 px (symbole seul), dimensions explicites sans déformation.
  - `<app-icon>` : 100% SVG natif vectoriel sans police externe.

---

## ⚠️ Limites de la Démonstration & Choix Techniques

1. **Absence de backend e-mail en local :**
   - La réinitialisation de mot de passe est simulée via `PasswordResetService`.
   - L'écran de confirmation permet d'ouvrir immédiatement le lien de démonstration vers `/reinitialisation?email=...`.
   - Pour tester le comportement en cas de lien expiré, le paramètre `?expire=1` peut être ajouté à l'URL `/reinitialisation?expire=1`.
2. **Authentification locale :**
   - Les comptes de démonstration et sessions sont gérés en mémoire et `localStorage` sécurisé sans transmission réseau.
   - Les gardes de navigation `guestGuard`, `candidateGuard` et `adminGuard` assurent l'isolation stricte des espaces publics, candidat et administrateur.

3. **Analyse de CV et profil LinkedIn (`/ameliorer-cv`) — Analyse simulée :**
   - **Principe de simulation :** `CvAnalysisService` applique des règles explicites et transparentes sur le texte fourni par l'utilisateur. Il ne contacte aucune API d'IA réelle et ne lit jamais un profil LinkedIn en ligne.
   - **Règles appliquées :** détection de sections par mots-clés (coordonnées, résumé, expériences, formation, compétences, projets, langues), présence e-mail / téléphone / URL LinkedIn, densité de verbes d'action et de chiffres, formules convenues (« motivé », « sérieux »…), correspondance avec les compétences de l'offre sélectionnée.
   - **Limite absolue — aucune invention :** la version corrigée n'ajoute jamais d'expérience, diplôme, date, entreprise ou chiffre. Lorsqu'une information manque, un emplacement explicite `[ajoutez un chiffre : …]` est inséré et listé dans l'encadré « À compléter par vous ».
   - **Architecture cible (production) :** remplacer `analyzeCv()` par un appel à une API LLM (GPT-4, Gemini Pro, etc.) via un proxy backend Node.js / Python. L'interface du service et la logique de diff / export restent inchangées côté client.
   - **Confidentialité :** le texte du CV reste sur l'appareil pendant la démonstration. La mention « Proposition générée par une analyse simulée : relisez chaque ligne avant de l'utiliser. » est affichée en permanence à l'étape 4.
   - **Sauvegarde :** les analyses sont persistées dans `localStorage` sous la clé `intervia_cv_analyses`. L'utilisateur peut les rouvrir depuis le tiroir « Mes analyses ».
