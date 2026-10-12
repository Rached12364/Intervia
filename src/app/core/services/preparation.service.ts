import { Injectable, signal } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import {
  PreparationPlan,
  PreparationLevel,
  ModuleProgress
} from '../models/preparation.model';
import { JobOffer } from '../models/offer.model';
import { QcmQuestion, TechQuestion } from '../models/question.model';
import { SimulationQuestion } from '../models/simulation.model';
import { EXTENDED_QCM_BANK, GENERAL_QCM_POOL } from '../data/qcm-bank.data';
import { TECH_EXERCISES_BANK } from '../data/tech-exercises.data';

const SKILLS_DICTIONARY: Record<string, string[]> = {
  'Angular': ['angular', 'rxjs', 'signals', 'ngrx'],
  'TypeScript': ['typescript', 'ts'],
  'React': ['react', 'nextjs', 'redux'],
  'Python': ['python', 'django', 'fastapi', 'flask'],
  'Node.js': ['node', 'nodejs', 'express', 'nest', 'nestjs'],
  'SQL': ['sql', 'postgresql', 'postgres', 'mysql', 'database', 'bdd', 'donnees'],
  'Docker': ['docker', 'conteneur', 'kubernetes', 'ci/cd', 'devops'],
  'Git': ['git', 'github', 'gitlab']
};

const DEFAULT_SAMPLE_OFFER = `Nous recrutons un(e) Développeur(se) Frontend Angular chez InnovTech Tunis pour un stage PFE ou un premier emploi en CDI.
Au sein de notre équipe Agile Scrum, vous participerez au développement d'applications web réactives et modulaires.

Vos missions :
- Concevoir et implémenter des composants web modernes avec Angular 17 et TypeScript.
- Collaborer avec l'équipe UI/UX et intégrer des maquettes responsives.
- Participer aux revues de code, aux rituels agiles et assurer les tests unitaires.
- Échanger avec les équipes backend sur les API REST et bases de données SQL.

Profil recherché :
- Étudiant(e) en dernière année d'école d'ingénieur ou jeune diplômé(e) en informatique.
- Solides compétences en JavaScript / TypeScript, Angular, HTML/SCSS et Git.
- Sens de la communication, esprit d'équipe et curiosité technique.
- Environnement technique : Angular, TypeScript, Node.js, SQL, Docker, Git.`;

@Injectable({
  providedIn: 'root'
})
export class PreparationService {
  private _preparations = signal<PreparationPlan[]>([]);
  public readonly preparations = this._preparations.asReadonly();

  private _currentPreparation = signal<PreparationPlan | null>(null);
  public readonly currentPreparation = this._currentPreparation.asReadonly();

  constructor() {
    // Generate a default demo preparation if desired or keep empty
  }

  getSampleOffer(): string {
    return DEFAULT_SAMPLE_OFFER;
  }

  getPreparationById(id: string): PreparationPlan | undefined {
    return this._preparations().find(p => p.id === id);
  }

  setCurrentPreparation(plan: PreparationPlan | null): void {
    this._currentPreparation.set(plan);
  }

  /**
   * Analysis step that takes raw input and generates a complete PreparationPlan
   */
  generatePreparationPlan(params: {
    sourceType: 'pasted' | 'platform' | 'manual';
    rawText?: string;
    offer?: JobOffer;
    manualData?: {
      title: string;
      company: string;
      type: 'stage' | 'emploi';
      skills: string[];
      level: PreparationLevel;
    };
  }): PreparationPlan {
    const id = 'prep-' + Date.now();
    let offerTitle = 'Développeur Web';
    let companyName = 'Entreprise partenaire';
    let offerType: 'stage' | 'emploi' = 'emploi';
    let contractType = 'CDI';
    let detectedLevel: PreparationLevel = 'intermediaire';
    let detectedSkills: string[] = [];
    let rawText = params.rawText || '';

    if (params.sourceType === 'platform' && params.offer) {
      const o = params.offer;
      offerTitle = o.title;
      companyName = o.company;
      offerType = o.type;
      contractType = o.contract;
      detectedSkills = [...o.skills];
      detectedLevel = this.detectLevel(o.title + ' ' + o.description);
    } else if (params.sourceType === 'manual' && params.manualData) {
      const m = params.manualData;
      offerTitle = m.title.trim() || offerTitle;
      companyName = m.company.trim() || companyName;
      offerType = m.type;
      contractType = m.type === 'stage' ? 'Stage PFE' : 'CDI';
      detectedLevel = m.level;
      detectedSkills = m.skills.length > 0 ? m.skills : ['Angular', 'TypeScript', 'Git'];
    } else {
      // Pasted text extraction
      const extracted = this.extractDetailsFromText(rawText);
      offerTitle = extracted.title;
      companyName = extracted.company;
      offerType = extracted.type;
      contractType = extracted.contract;
      detectedLevel = extracted.level;
      detectedSkills = extracted.skills;
    }

    // Ensure we have up to 5 key skills
    if (detectedSkills.length === 0) {
      detectedSkills = ['Angular', 'TypeScript', 'Git', 'SQL', 'Travail d\'équipe'];
    } else if (detectedSkills.length > 5) {
      detectedSkills = detectedSkills.slice(0, 5);
    }

    const rhQuestions = this.generateRhQuestions(offerTitle, companyName, offerType, detectedSkills, detectedLevel);
    const qcmQuestions = this.generateQcmQuestions(detectedSkills);
    const techExercise = this.generateTechExercise(detectedSkills, detectedLevel);

    const plan: PreparationPlan = {
      id,
      createdAt: new Date(),
      sourceType: params.sourceType,
      offerTitle,
      companyName,
      offerType,
      contractType,
      detectedLevel,
      detectedSkills,
      rawText,
      linkedOffer: params.offer,
      rhModule: {
        title: 'Entretien RH ciblé',
        description: `6 questions axées sur votre motivation pour ${companyName} et vos compétences clés.`,
        durationMinutes: 15,
        themes: [
          'Motivation pour l\'entreprise',
          'Méthode STAR en situation réelle',
          `Pratique de ${detectedSkills[0] || 'la technique'}`,
          'Esprit d\'équipe et collaboration'
        ],
        questions: rhQuestions,
        progress: { status: 'a-faire' }
      },
      qcmModule: {
        title: 'QCM de validation technique',
        description: '10 questions ciblées sur vos technologies et bonnes pratiques logicielles.',
        durationMinutes: 10,
        domains: detectedSkills.slice(0, 3),
        questions: qcmQuestions,
        progress: { status: 'a-faire' }
      },
      techModule: {
        title: 'Défi de code appliqué',
        description: `Exercice pratique de développement adapté au niveau ${detectedLevel}.`,
        language: techExercise.starterCode['python'] ? 'Python' : 'JavaScript',
        difficulty: detectedLevel === 'debutant' ? 'facile' : detectedLevel === 'avance' ? 'difficile' : 'moyen',
        durationMinutes: techExercise.timeLimit,
        exercise: techExercise,
        progress: { status: 'a-faire' }
      },
      isCompleted: false
    };

    // Store in history
    this._preparations.update(list => [plan, ...list]);
    this._currentPreparation.set(plan);

    return plan;
  }

  /**
   * Update skills and regenerate modules for the current plan
   */
  updateSkillsAndRegenerate(planId: string, newSkills: string[]): PreparationPlan | null {
    const plan = this.getPreparationById(planId);
    if (!plan) return null;

    const trimmedSkills = newSkills.slice(0, 5);
    const rhQuestions = this.generateRhQuestions(
      plan.offerTitle,
      plan.companyName,
      plan.offerType,
      trimmedSkills,
      plan.detectedLevel
    );
    const qcmQuestions = this.generateQcmQuestions(trimmedSkills);
    const techExercise = this.generateTechExercise(trimmedSkills, plan.detectedLevel);

    const updated: PreparationPlan = {
      ...plan,
      detectedSkills: trimmedSkills,
      rhModule: {
        ...plan.rhModule,
        themes: [
          'Motivation pour l\'entreprise',
          'Méthode STAR en situation réelle',
          `Pratique de ${trimmedSkills[0] || 'la technique'}`,
          'Esprit d\'équipe'
        ],
        questions: rhQuestions
      },
      qcmModule: {
        ...plan.qcmModule,
        domains: trimmedSkills.slice(0, 3),
        questions: qcmQuestions
      },
      techModule: {
        ...plan.techModule,
        language: techExercise.starterCode['python'] ? 'Python' : 'JavaScript',
        durationMinutes: techExercise.timeLimit,
        exercise: techExercise
      }
    };

    this._preparations.update(list => list.map(p => p.id === planId ? updated : p));
    if (this._currentPreparation()?.id === planId) {
      this._currentPreparation.set(updated);
    }
    return updated;
  }

  /**
   * Update individual module score & progress
   */
  updateModuleScore(planId: string, moduleType: 'rh' | 'qcm' | 'tech', score: number): PreparationPlan | null {
    const plan = this.getPreparationById(planId);
    if (!plan) return null;

    const progress: ModuleProgress = {
      status: 'termine',
      score,
      completedAt: new Date()
    };

    let rh = { ...plan.rhModule };
    let qcm = { ...plan.qcmModule };
    let tech = { ...plan.techModule };

    if (moduleType === 'rh') rh.progress = progress;
    if (moduleType === 'qcm') qcm.progress = progress;
    if (moduleType === 'tech') tech.progress = progress;

    // Check completion & compute overall score
    const scores: number[] = [];
    if (rh.progress.score !== undefined) scores.push(rh.progress.score);
    if (qcm.progress.score !== undefined) scores.push(qcm.progress.score);
    if (tech.progress.score !== undefined) scores.push(tech.progress.score);

    const isCompleted = scores.length === 3;
    const overallScore = scores.length > 0
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : undefined;

    const updated: PreparationPlan = {
      ...plan,
      rhModule: rh,
      qcmModule: qcm,
      techModule: tech,
      overallScore,
      isCompleted
    };

    this._preparations.update(list => list.map(p => p.id === planId ? updated : p));
    if (this._currentPreparation()?.id === planId) {
      this._currentPreparation.set(updated);
    }
    return updated;
  }

  // --- Internal Rule-based Analysis ---

  private normalizeText(text: string): string {
    return text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  private extractDetailsFromText(rawText: string): {
    title: string;
    company: string;
    type: 'stage' | 'emploi';
    contract: string;
    level: PreparationLevel;
    skills: string[];
  } {
    const normalized = this.normalizeText(rawText);

    // Offer Type
    const isStage = /stage|pfe|stagiaire|fin d'etude/i.test(rawText);
    const offerType: 'stage' | 'emploi' = isStage ? 'stage' : 'emploi';
    const contract = isStage ? 'Stage PFE' : 'CDI';

    // Level detection
    const level = this.detectLevel(rawText);

    // Skills detection
    const skills: string[] = [];
    for (const [skillName, keywords] of Object.entries(SKILLS_DICTIONARY)) {
      const matched = keywords.some(kw => {
        const regex = new RegExp(`\\b${kw}\\b`, 'i');
        return regex.test(normalized);
      });
      if (matched && !skills.includes(skillName)) {
        skills.push(skillName);
      }
    }

    // Additional common keywords
    if (/scrum|agile/i.test(normalized) && !skills.includes('Agilité Scrum')) {
      skills.push('Agilité Scrum');
    }
    if (/communication|equipe/i.test(normalized) && !skills.includes('Travail d\'équipe')) {
      skills.push('Travail d\'équipe');
    }

    // Title heuristic
    let title = 'Développeur Web';
    const titleMatch = rawText.match(/(?:poste|titre|recrute|recherche)\s*:?\s*([^\n\r,.;]{4,40})/i);
    if (titleMatch && titleMatch[1]) {
      title = titleMatch[1].trim();
    } else {
      const firstLine = rawText.split('\n')[0]?.trim();
      if (firstLine && firstLine.length < 50 && firstLine.length > 5) {
        title = firstLine;
      }
    }

    // Company heuristic
    let company = 'Entreprise partenaire';
    const compMatch = rawText.match(/(?:chez|pour|entreprise|societe)\s*:?\s*([A-Za-z0-9\s-]{3,30})/i);
    if (compMatch && compMatch[1]) {
      company = compMatch[1].trim();
    }

    return {
      title,
      company,
      type: offerType,
      contract,
      level,
      skills: skills.slice(0, 5)
    };
  }

  private detectLevel(text: string): PreparationLevel {
    const norm = this.normalizeText(text);
    if (/senior|confirme|lead|5 ans|expert|architecte/i.test(norm)) {
      return 'avance';
    }
    if (/stage|pfe|junior|debutant|premiere experience|etudiant/i.test(norm)) {
      return 'debutant';
    }
    return 'intermediaire';
  }

  private generateRhQuestions(
    title: string,
    company: string,
    type: 'stage' | 'emploi',
    skills: string[],
    level: PreparationLevel
  ): SimulationQuestion[] {
    const mainSkill = skills[0] || 'vos compétences techniques';
    const secondSkill = skills[1] || 'le travail d\'équipe';

    return [
      {
        id: 'prep-rh-1',
        text: `Présentez-vous brièvement et expliquez ce qui attire particulièrement votre attention dans cette offre de ${title} chez ${company}.`,
        duration: 120,
        category: 'presentation',
        tips: `Insistez sur la cohérence entre votre parcours et les besoins de ${company}. Restez clair et synthétique.`
      },
      {
        id: 'prep-rh-2',
        text: `Comment avez-vous développé votre expérience sur ${mainSkill}, et sur quel projet marquant l'avez-vous mise en pratique ?`,
        duration: 90,
        category: 'technique',
        tips: 'Décrivez concrètement votre rôle, l\'architecture ou le composant développé, et le résultat obtenu.'
      },
      {
        id: 'prep-rh-3',
        text: `Racontez une situation où vous avez fait face à une difficulté technique ou un imprévu d'équipe. Comment avez-vous réagi ?`,
        duration: 120,
        category: 'situation',
        tips: 'Appliquez la méthode STAR : Situation, Tâche, Action personnelle et Résultat concret.'
      },
      {
        id: 'prep-rh-4',
        text: `Chez ${company}, nous accordons une grande importance à ${secondSkill}. Comment collaborez-vous au quotidien avec vos pairs ?`,
        duration: 90,
        category: 'soft-skill',
        tips: 'Mentionnez la communication constructive, les revues de code bienveillantes et l\'entraide.'
      },
      {
        id: 'prep-rh-5',
        text: type === 'stage'
          ? `Quels sont les objectifs clés que vous aimeriez accomplir durant votre stage PFE au sein de notre équipe ?`
          : `Comment envisagez-vous votre progression et vos responsabilités professionnelles d'ici 2 à 3 ans ?`,
        duration: 90,
        category: 'motivation',
        tips: 'Montrez votre curiosité, votre envie d\'apprendre et votre projection positive dans l\'entreprise.'
      },
      {
        id: 'prep-rh-6',
        text: `Avez-vous des questions pour nous sur le poste, l'organisation de l'équipe ou les projets en cours ?`,
        duration: 60,
        category: 'motivation',
        tips: 'Poser 1 ou 2 questions pertinentes démontre votre intérêt réel pour la vie de l\'équipe.'
      }
    ];
  }

  private generateQcmQuestions(skills: string[]): QcmQuestion[] {
    const selected: QcmQuestion[] = [];
    const usedIds = new Set<string>();

    // 1. Gather questions matching detected skills
    for (const skill of skills) {
      const bank = EXTENDED_QCM_BANK[skill];
      if (bank && bank.length > 0) {
        for (const q of bank) {
          if (!usedIds.has(q.id) && selected.length < 8) {
            selected.push(q);
            usedIds.add(q.id);
          }
        }
      }
    }

    // 2. Fill the remaining spots up to 10 with general & soft-skills questions
    for (const genQ of GENERAL_QCM_POOL) {
      if (selected.length >= 10) break;
      if (!usedIds.has(genQ.id)) {
        selected.push(genQ);
        usedIds.add(genQ.id);
      }
    }

    // 3. Fallback if still under 10
    if (selected.length < 10) {
      for (const skillList of Object.values(EXTENDED_QCM_BANK)) {
        for (const q of skillList) {
          if (selected.length >= 10) break;
          if (!usedIds.has(q.id)) {
            selected.push(q);
            usedIds.add(q.id);
          }
        }
      }
    }

    return selected.slice(0, 10);
  }

  private generateTechExercise(skills: string[], level: PreparationLevel): TechQuestion {
    // Determine language preferred: Python if detected, else JavaScript
    const hasPython = skills.some(s => s.toLowerCase().includes('python'));
    const langKey = hasPython ? 'Python' : 'JavaScript';
    const exercise = TECH_EXERCISES_BANK[langKey]?.[level] || TECH_EXERCISES_BANK['JavaScript']['intermediaire'];

    return exercise;
  }
}
