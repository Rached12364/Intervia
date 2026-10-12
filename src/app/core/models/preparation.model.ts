import { QcmQuestion, TechQuestion } from './question.model';
import { SimulationQuestion } from './simulation.model';
import { JobOffer } from './offer.model';

export type PreparationLevel = 'debutant' | 'intermediaire' | 'avance';
export type PreparationModuleStatus = 'a-faire' | 'en-cours' | 'termine';

export interface ModuleProgress {
  status: PreparationModuleStatus;
  score?: number;
  completedAt?: Date;
}

export interface PreparationPlan {
  id: string;
  createdAt: Date;
  sourceType: 'pasted' | 'platform' | 'manual';
  offerTitle: string;
  companyName: string;
  offerType: 'stage' | 'emploi';
  contractType?: string;
  detectedLevel: PreparationLevel;
  detectedSkills: string[];
  rawText?: string;
  linkedOffer?: JobOffer;

  // Custom generated modules
  rhModule: {
    title: string;
    description: string;
    durationMinutes: number;
    themes: string[];
    questions: SimulationQuestion[];
    progress: ModuleProgress;
  };

  qcmModule: {
    title: string;
    description: string;
    durationMinutes: number;
    domains: string[];
    questions: QcmQuestion[];
    progress: ModuleProgress;
  };

  techModule: {
    title: string;
    description: string;
    language: string;
    difficulty: 'facile' | 'moyen' | 'difficile';
    durationMinutes: number;
    exercise: TechQuestion;
    progress: ModuleProgress;
  };

  overallScore?: number;
  isCompleted: boolean;
}
