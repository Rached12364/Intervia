import { Injectable, signal } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import {
  CvAnalysisResult,
  CvRecommendation,
  CvAnalysisCriteria,
  CvAnalysisType
} from '../models/cv-analysis.model';

export const DEMO_CV_MOHAMED = `Mohamed Ben Ali
mohamed@intervia.tn | +216 20 123 456 | Tunis, Tunisie
linkedin.com/in/mohamed-ben-ali-tn | github.com/mohamed-ba

RÉSUMÉ PROFESSIONNEL
Étudiant motivé et sérieux en dernière année de cycle ingénieur logiciel. Passionné par les technologies du web moderne, je recherche un stage PFE ou un premier emploi en développement frontend Angular et technologies cloud.

FORMATION
2021 – 2024 : Cycle d'Ingénieur en Informatique et Réseaux
Institut National des Sciences Appliquées et de Technologie (INSAT), Tunis
2019 – 2021 : Classes Préparatoires aux Études d'Ingénieurs (Math-Physique)
IPEST, La Marsa

EXPÉRIENCES
Juillet 2023 – Septembre 2023 : Stagiaire Développeur Frontend
TechTunisia Solutions, Tunis
- Participation au développement de l'interface d'administration en Angular.
- Création de composants réutilisables et intégration de maquettes Figma.
- Travail en équipe avec la méthode Scrum et utilisation de Git pour le versioning.

Février 2023 – Mai 2023 : Projet Académique de Synthèse
INSAT, Tunis
- Développement d'une plateforme de réservation d'équipements sportifs avec Angular et NestJS.
- Mise en œuvre d'une authentification JWT et de requêtes HTTP réactives avec RxJS.
- Rédaction de la documentation technique et des tests.

COMPÉTENCES
- Langages & Frameworks : TypeScript, JavaScript (ES6+), Angular 17, HTML5/SCSS, Node.js, Python
- Outils & Pratiques : Git, GitHub, Docker, Méthodologie Agile / Scrum, Figma, REST API, SQL
- Langues : Arabe (langue maternelle), Français (bilingue / C1), Anglais (courant / B2)

PROJETS PERSONNELS
- IntervIA Companion : Application web d'aide à la préparation d'entretien d'embauche réalisée avec Angular et TypeScript.`;

export const DEMO_LINKEDIN_MOHAMED = {
  title: 'Étudiant Ingénieur Logiciel @ INSAT | Développeur Frontend Angular & TypeScript | À la recherche d\'un Stage PFE',
  about: 'Étudiant motivé et sérieux en dernière année d\'ingénierie logicielle à l\'INSAT Tunis, je conçois des applications web modernes, performantes et centrées sur l\'utilisateur avec Angular et l\'écosystème TypeScript. Curieux, impliqué et passionné par les architectures réactives (RxJS, Signals), je recherche activement un stage de fin d\'études (PFE) ou un premier emploi à compter de février 2025.',
  experiences: 'Stagiaire Développeur Frontend — TechTunisia Solutions (Juillet 2023 – Septembre 2023)\n- Participation au développement d\'un tableau de bord d\'administration sous Angular 16.\n- Création de composants réutilisables et intégration de maquettes Figma.\n- Collaboration au sein d\'une équipe de 5 développeurs en méthodologie Agile Scrum.'
};

@Injectable({
  providedIn: 'root'
})
export class CvAnalysisService {
  private _savedAnalyses = signal<CvAnalysisResult[]>([]);
  public readonly savedAnalyses = this._savedAnalyses.asReadonly();

  constructor() {
    this.initDefaultSavedAnalyses();
  }

  private initDefaultSavedAnalyses(): void {
    // Optionally pre-populate or load from localStorage
    try {
      const stored = localStorage.getItem('intervia_cv_analyses');
      if (stored) {
        const parsed = JSON.parse(stored);
        this._savedAnalyses.set(parsed);
        return;
      }
    } catch {
      // ignore
    }
  }

  public getDemoCv(): string {
    return DEMO_CV_MOHAMED;
  }

  public getDemoLinkedIn(): { title: string; about: string; experiences: string } {
    return { ...DEMO_LINKEDIN_MOHAMED };
  }

  public saveAnalysis(analysis: CvAnalysisResult): void {
    const list = this._savedAnalyses().filter(a => a.id !== analysis.id);
    const updated = [analysis, ...list];
    this._savedAnalyses.set(updated);
    try {
      localStorage.setItem('intervia_cv_analyses', JSON.stringify(updated));
    } catch {
      // ignore
    }
  }

  public deleteAnalysis(id: string): void {
    const updated = this._savedAnalyses().filter(a => a.id !== id);
    this._savedAnalyses.set(updated);
    try {
      localStorage.setItem('intervia_cv_analyses', JSON.stringify(updated));
    } catch {
      // ignore
    }
  }

  public getAnalysisById(id: string): CvAnalysisResult | undefined {
    return this._savedAnalyses().find(a => a.id === id);
  }

  /**
   * Run simulated AI analysis based on transparent rules
   */
  public analyzeCv(params: {
    type: CvAnalysisType;
    rawText?: string;
    linkedin?: { title: string; about: string; experiences: string };
    targetRole?: string;
    targetOfferTitle?: string;
    targetOfferSkills?: string[];
  }): Observable<CvAnalysisResult> {
    const result = this.computeAnalysis(params);
    // Simulate short network/AI delay (handled visually by step 2 wizard)
    return of(result).pipe(delay(200));
  }

  private computeAnalysis(params: {
    type: CvAnalysisType;
    rawText?: string;
    linkedin?: { title: string; about: string; experiences: string };
    targetRole?: string;
    targetOfferTitle?: string;
    targetOfferSkills?: string[];
  }): CvAnalysisResult {
    const isLinkedIn = params.type === 'linkedin';
    const textToAnalyze = isLinkedIn
      ? `${params.linkedin?.title || ''}\n${params.linkedin?.about || ''}\n${params.linkedin?.experiences || ''}`
      : params.rawText || '';

    const lower = textToAnalyze.toLowerCase();

    // 1. Sections detection
    const detectedSections: string[] = [];
    if (lower.includes('mohamed') || lower.includes('@') || lower.includes('+216') || lower.includes('tunis') || lower.includes('coordonnées') || lower.includes('contact')) {
      detectedSections.push('Coordonnées');
    }
    if (lower.includes('résumé') || lower.includes('profil') || lower.includes('à propos') || lower.includes('sommaire') || isLinkedIn) {
      detectedSections.push('Résumé');
    }
    if (lower.includes('expérience') || lower.includes('stage') || lower.includes('emploi') || lower.includes('parcours')) {
      detectedSections.push('Expériences');
    }
    if (lower.includes('formation') || lower.includes('insat') || lower.includes('diplôme') || lower.includes('études') || lower.includes('ingénieur')) {
      detectedSections.push('Formation');
    }
    if (lower.includes('compétence') || lower.includes('technologies') || lower.includes('langages') || lower.includes('outils')) {
      detectedSections.push('Compétences');
    }
    if (lower.includes('projet') || lower.includes('projets')) {
      detectedSections.push('Projets');
    }
    if (lower.includes('langue') || lower.includes('français') || lower.includes('anglais') || lower.includes('arabe')) {
      detectedSections.push('Langues');
    }

    // Contact detection
    const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(textToAnalyze);
    const hasPhone = /(\+216|\b[0-9]{2}[\s.-]?[0-9]{3}[\s.-]?[0-9]{3}\b)/.test(textToAnalyze);
    const hasLinkedIn = /linkedin\.com\/in\/[a-zA-Z0-9_-]+/.test(textToAnalyze) || isLinkedIn;

    // Buzzwords check
    const buzzwordsList = ['motivé', 'sérieux', 'dynamique', 'rigoureux', 'passionné', 'autonome'];
    const buzzwordsFound = buzzwordsList.filter(b => lower.includes(b));

    // Numbers & Percentages check
    const hasNumbers = /\d+%|\d+\s*(ans|mois|utilisateurs|composants|clients|personnes|projets|requêtes|modules)/i.test(textToAnalyze) || /\b(202[0-9]|\d{1,3}%)\b/.test(textToAnalyze);
    const numbersCount = (textToAnalyze.match(/\d+%/g) || []).length + (textToAnalyze.match(/\b\d+\s+(composants|utilisateurs|clients|jours|heures|développeurs|modules)\b/gi) || []).length;

    // Action verbs check
    const actionVerbsList = ['développé', 'conçu', 'créé', 'optimisé', 'piloté', 'mis en place', 'déployé', 'implémenté', 'structuré', 'amélioré', 'réalisé', 'analysé', 'intégré'];
    const hasActionVerbs = actionVerbsList.some(v => lower.includes(v));

    // Offer match
    const targetSkills = params.targetOfferSkills || ['Angular', 'TypeScript', 'Git', 'Agile'];
    const matchedSkills = targetSkills.filter(s => lower.includes(s.toLowerCase()));

    // Scoring heuristic
    let structureScore = Math.min(95, 45 + detectedSections.length * 8);
    let contenuScore = 70;
    if (textToAnalyze.length > 800) contenuScore += 15;
    if (hasActionVerbs) contenuScore += 10;

    let chiffresScore = Math.min(90, 40 + numbersCount * 20);
    if (numbersCount === 0) chiffresScore = 50;

    let motsClesScore = 75;
    if (matchedSkills.length >= 2) motsClesScore += 15;

    let lisibiliteScore = 85;
    if (buzzwordsFound.length > 2) lisibiliteScore -= 15;
    else if (buzzwordsFound.length > 0) lisibiliteScore -= 5;

    const criteria: CvAnalysisCriteria = {
      structure: Math.min(100, structureScore),
      contenu: Math.min(100, contenuScore),
      chiffres: Math.min(100, chiffresScore),
      motsCles: Math.min(100, motsClesScore),
      lisibilite: Math.min(100, lisibiliteScore)
    };

    const globalScore = Math.round(
      (criteria.structure * 0.25) +
      (criteria.contenu * 0.25) +
      (criteria.chiffres * 0.2) +
      (criteria.motsCles * 0.15) +
      (criteria.lisibilite * 0.15)
    );

    // Strengths
    const strengths: string[] = [];
    if (detectedSections.length >= 4) {
      strengths.push('Architecture claire avec ' + detectedSections.length + ' sections facilement identifiables par un recruteur.');
    }
    if (hasEmail && (hasPhone || hasLinkedIn)) {
      strengths.push('Coordonnées professionnelles directes et bien présentées.');
    }
    if (lower.includes('angular') && lower.includes('typescript')) {
      strengths.push('Positionnement technique cohérent et ciblé sur le développement web moderne.');
    }
    if (strengths.length < 2) {
      strengths.push('Présence d\'expériences et de projets concrets illustrant vos compétences.');
    }

    // Recommendations
    const recommendations: CvRecommendation[] = [];

    // Rec 1: High Priority - Buzzwords to factual accomplishments
    if (buzzwordsFound.length > 0) {
      const buzz = buzzwordsFound.join(', ');
      recommendations.push({
        id: 'rec-buzzwords',
        priority: 'haute',
        title: 'Remplacer les formules convenues par des faits concrets',
        constat: `Votre texte contient des adjectifs génériques (${buzz}) que les recruteurs lisent sur des centaines de candidatures sans pouvoir en mesurer la portée.`,
        importance: 'Un profil percutant démontre ses qualités par des résultats et des réalisations plutôt que par des déclarations d\'intention.',
        beforeExample: 'Étudiant motivé et sérieux en dernière année de cycle ingénieur logiciel.',
        afterExample: 'Futur ingénieur logiciel spécialisé en développement frontend Angular, axé sur les architectures réactives et la qualité de code.',
        applied: true,
        section: 'Résumé'
      });
    }

    // Rec 2: High Priority - Metrics / Quantitative achievements
    if (numbersCount < 2) {
      recommendations.push({
        id: 'rec-metrics',
        priority: 'haute',
        title: 'Chiffrer l\'impact et l\'envergure de vos projets',
        constat: 'Vos expériences décrivent vos tâches mais pas leur échelle ni leurs résultats mesurables.',
        importance: 'Les chiffres (taille d\'équipe, nombre de composants, gains de temps, volumétrie) rendent votre expérience tangible et mémorable.',
        beforeExample: 'Participation au développement de l\'interface d\'administration en Angular.',
        afterExample: 'Conception de 6 modules pour l\'interface d\'administration Angular [ajoutez un chiffre : +30 % de rapidité, 15 écrans...].',
        applied: true,
        section: 'Expériences'
      });
    }

    // Rec 3: Medium Priority - Action Verbs at line starts
    recommendations.push({
      id: 'rec-action-verbs',
      priority: 'moyenne',
      title: 'Démarrer chaque puce par un verbe d\'action fort',
      constat: 'Des tournures passives comme "Participation à" ou "Travail en équipe" diminuent l\'impression de responsabilité.',
      importance: 'Commencer par un verbe d\'action au participe passé ou à l\'infinitif dynamise la lecture et valorise votre rôle direct.',
      beforeExample: 'Travail en équipe avec la méthode Scrum et utilisation de Git pour le versioning.',
      afterExample: 'Collaboré au sein d\'une équipe Scrum de [précisez la taille : ex. 5 développeurs] et géré le cycle de vie du code sous Git.',
      applied: false,
      section: 'Expériences'
    });

    // Rec 4: Low Priority - Target role keywords alignment
    if (params.targetRole || params.targetOfferTitle) {
      const role = params.targetRole || params.targetOfferTitle;
      recommendations.push({
        id: 'rec-target-alignment',
        priority: 'basse',
        title: `Aligner le vocabulaire avec le poste visé : ${role}`,
        constat: `Mettre en avant les compétences requises par l'offre dès l'accroche de votre profil.`,
        importance: 'Les recruteurs effectuent une lecture rapide en diagonale : retrouver immédiatement les mots-clés du poste valide votre candidature.',
        beforeExample: 'Recherche un stage PFE ou un premier emploi.',
        afterExample: `Candidat au poste de ${role} — disponible pour un stage PFE avec convention immédiate.`,
        applied: false,
        section: 'Titre / Résumé'
      });
    }

    // Encouraging quote
    let encouragingQuote = 'Votre profil possède d\'excellentes bases techniques. En valorisant vos réalisations avec des faits précis, vous allez vous démarquer facilement.';
    if (globalScore >= 80) {
      encouragingQuote = 'Très bon profil ! Quelques ajustements de précision suffiront à faire ressortir tout votre potentiel lors des premiers tris des recruteurs.';
    }

    // Build initial corrected version
    const initialCorrected = this.generateCorrectedContent({
      isLinkedIn,
      originalText: textToAnalyze,
      originalLinkedIn: params.linkedin,
      recommendations,
      tone: 'sobre',
      targetRole: params.targetRole || params.targetOfferTitle
    });

    return {
      id: 'analysis-' + Date.now(),
      date: new Date(),
      type: params.type,
      title: isLinkedIn ? 'Analyse du profil LinkedIn' : 'Analyse de mon CV',
      targetRole: params.targetRole,
      targetOfferTitle: params.targetOfferTitle,
      globalScore,
      scoreExplanation: globalScore >= 80
        ? 'Profil très solide et bien structuré. Vos points forts ressortent nettement.'
        : 'Bonne base avec un réel potentiel technique à mettre en lumière avec des résultats précis.',
      criteria,
      detectedSections,
      hasEmail,
      hasPhone,
      hasLinkedIn,
      hasActionVerbs,
      hasNumbers,
      buzzwordsFound,
      strengths,
      recommendations,
      encouragingQuote,
      originalContent: {
        rawText: params.rawText,
        linkedin: params.linkedin
      },
      tone: 'sobre',
      correctedContent: initialCorrected
    };
  }

  /**
   * Generates corrected version strictly respecting rules:
   * - Never invent experiences, diplomas, companies, dates, or numbers.
   * - When information is missing, inserts explicit placeholder [ajoutez un chiffre : ...].
   * - Highlights diffs.
   * - Adapts to tone (sobre vs dynamique).
   */
  public generateCorrectedContent(params: {
    isLinkedIn: boolean;
    originalText?: string;
    originalLinkedIn?: { title: string; about: string; experiences: string };
    recommendations: CvRecommendation[];
    tone: 'sobre' | 'dynamique';
    targetRole?: string;
  }): {
    rawText?: string;
    linkedin?: { title: string; about: string; experiences: string };
    missingPlaceholders: string[];
  } {
    const isDynamique = params.tone === 'dynamique';
    const missingPlaceholders: string[] = [];

    const recBuzz = params.recommendations.find(r => r.id === 'rec-buzzwords')?.applied ?? true;
    const recMetrics = params.recommendations.find(r => r.id === 'rec-metrics')?.applied ?? true;
    const recActionVerbs = params.recommendations.find(r => r.id === 'rec-action-verbs')?.applied ?? false;
    const recTarget = params.recommendations.find(r => r.id === 'rec-target-alignment')?.applied ?? false;

    if (params.isLinkedIn) {
      const orig = params.originalLinkedIn || DEMO_LINKEDIN_MOHAMED;

      // Title
      let correctedTitle = orig.title;
      if (recTarget && params.targetRole) {
        correctedTitle = `${params.targetRole} | Étudiant Ingénieur Logiciel @ INSAT | Angular & TypeScript`;
      } else if (isDynamique) {
        correctedTitle = 'Futur Ingénieur Logiciel @ INSAT | Concepteur d\'Applications Web Réactives & Performantes (Angular, TypeScript)';
      }

      // About
      let correctedAbout = orig.about;
      if (recBuzz) {
        if (isDynamique) {
          correctedAbout = 'Futur ingénieur logiciel diplômé de l\'INSAT Tunis, je conçois et déploie des applications web fluides, modulaires et maintenables avec Angular 17 et l\'écosystème TypeScript.\n\nMes priorités sur chaque projet : architecture propre (Clean Architecture), réactivité maîtrisée (RxJS, Signals) et ergonomie soignée. Je prépare activement mon stage de fin d\'études (PFE) ou mon premier poste à partir de février 2025 pour contribuer au succès d\'une équipe ambitieuse.';
        } else {
          correctedAbout = 'Étudiant en dernière année d\'ingénierie logicielle à l\'INSAT Tunis. Je développe des applications web avec Angular et TypeScript, en appliquant les bonnes pratiques d\'architecture logicielle et de tests.\n\nÀ la recherche d\'un stage de fin d\'études (PFE) ou d\'un premier poste en développement frontend dès février 2025.';
        }
      }

      // Experiences
      let correctedExp = orig.experiences;
      if (recActionVerbs || recMetrics) {
        const placeholder1 = '[ajoutez un chiffre : +30 % de rapidité, 12 écrans…]';
        const placeholder2 = '[précisez la taille de l\'équipe : ex. 5 développeurs]';
        missingPlaceholders.push(placeholder1, placeholder2);

        if (isDynamique) {
          correctedExp = `Stagiaire Développeur Frontend — TechTunisia Solutions (Juillet 2023 – Septembre 2023)
- Conçu et déployé le nouveau tableau de bord d'administration sous Angular 16, apportant un gain de ${placeholder1}.
- Développé une bibliothèque de composants UI réutilisables respectant la charte graphique Figma.
- Piloté les intégrations quotidiennes au sein d'une équipe Agile Scrum de ${placeholder2}.`;
        } else {
          correctedExp = `Stagiaire Développeur Frontend — TechTunisia Solutions (Juillet 2023 – Septembre 2023)
- Développement de modules d'administration sous Angular 16 avec un gain estimé à ${placeholder1}.
- Intégration de composants réutilisables d'après les maquettes Figma.
- Collaboration au sein d'une équipe Scrum de ${placeholder2} et gestion des versions sous Git.`;
        }
      }

      return {
        linkedin: {
          title: correctedTitle,
          about: correctedAbout,
          experiences: correctedExp
        },
        missingPlaceholders
      };
    } else {
      // Standard CV
      const orig = params.originalText || DEMO_CV_MOHAMED;

      const placeholderMetric1 = '[ajoutez un chiffre : +30 %, 15 composants, 3 mois…]';
      const placeholderMetric2 = '[précisez le volume : ex. 200 utilisateurs, 10 requêtes/sec]';
      const placeholderTeam = '[précisez la taille de l\'équipe : ex. 5 personnes]';

      if (recMetrics) {
        missingPlaceholders.push(placeholderMetric1, placeholderMetric2);
      }
      if (recActionVerbs) {
        missingPlaceholders.push(placeholderTeam);
      }

      let summaryBlock = `RÉSUMÉ PROFESSIONNEL
Futur ingénieur logiciel diplômé de l'INSAT Tunis, spécialisé dans l'écosystème web moderne (Angular 17, TypeScript, architectures réactives). Rigoureux sur la qualité du code et les tests, je recherche un stage PFE ou un premier emploi orienté développement frontend et cloud.`;

      if (isDynamique) {
        summaryBlock = `RÉSUMÉ PROFESSIONNEL
Futur ingénieur logiciel à l'INSAT Tunis, passionné par la création d'expériences web performantes et accessibles (Angular 17, Signals, RxJS). Orienté impact et collaboration, je recherche un stage PFE ou un premier emploi pour concevoir des produits à forte valeur ajoutée.`;
      }

      let expBlock = `EXPÉRIENCES
Juillet 2023 – Septembre 2023 : Stagiaire Développeur Frontend
TechTunisia Solutions, Tunis
- Conçu et intégré l'interface d'administration en Angular 17, optimisant le parcours utilisateur ${recMetrics ? placeholderMetric1 : ''}.
- Développé un catalogue de composants réutilisables aligné sur les maquettes Figma.
- Collaboré quotidiennement au sein d'une équipe Agile Scrum de ${recActionVerbs ? placeholderTeam : '5 personnes'} avec intégration continue sous Git.

Février 2023 – Mai 2023 : Projet Académique de Synthèse
INSAT, Tunis
- Développé une plateforme web complète de réservation sportive en Angular et NestJS ${recMetrics ? placeholderMetric2 : ''}.
- Structuré l'authentification sécurisée par JWT et la gestion d'états réactifs avec RxJS.
- Rédigé la documentation technique d'architecture et automatisé la suite de tests unitaires.`;

      const correctedCvText = `Mohamed Ben Ali
mohamed@intervia.tn | +216 20 123 456 | Tunis, Tunisie
linkedin.com/in/mohamed-ben-ali-tn | github.com/mohamed-ba

${recBuzz ? summaryBlock : `RÉSUMÉ PROFESSIONNEL
Étudiant en dernière année de cycle ingénieur logiciel. Passionné par les technologies du web moderne, je recherche un stage PFE ou un premier emploi en développement frontend Angular et technologies cloud.`}

FORMATION
2021 – 2024 : Cycle d'Ingénieur en Informatique et Réseaux
Institut National des Sciences Appliquées et de Technologie (INSAT), Tunis
2019 – 2021 : Classes Préparatoires aux Études d'Ingénieurs (Math-Physique)
IPEST, La Marsa

${expBlock}

COMPÉTENCES
- Langages & Frameworks : TypeScript, JavaScript (ES6+), Angular 17, HTML5/SCSS, Node.js, Python
- Outils & Pratiques : Git, GitHub, Docker, Méthodologie Agile / Scrum, Figma, REST API, SQL
- Langues : Arabe (langue maternelle), Français (bilingue / C1), Anglais (courant / B2)

PROJETS PERSONNELS
- IntervIA Companion : Application web d'aide à la préparation d'entretien d'embauche réalisée avec Angular 17 et TypeScript.`;

      return {
        rawText: correctedCvText,
        missingPlaceholders
      };
    }
  }

  /**
   * Recompute corrected version upon tone change or suggestion checkbox toggle
   */
  public updateCorrectedVersion(
    analysis: CvAnalysisResult,
    tone: 'sobre' | 'dynamique',
    recommendations: CvRecommendation[]
  ): CvAnalysisResult {
    const isLinkedIn = analysis.type === 'linkedin';
    const updated = this.generateCorrectedContent({
      isLinkedIn,
      originalText: analysis.originalContent.rawText,
      originalLinkedIn: analysis.originalContent.linkedin,
      recommendations,
      tone,
      targetRole: analysis.targetRole || analysis.targetOfferTitle
    });

    return {
      ...analysis,
      tone,
      recommendations: [...recommendations],
      correctedContent: updated
    };
  }
}
