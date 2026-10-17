export type CvAnalysisType = 'cv' | 'linkedin';

export type RecommendationPriority = 'haute' | 'moyenne' | 'basse';

export interface CvRecommendation {
  id: string;
  priority: RecommendationPriority;
  title: string;
  constat: string;
  importance: string;
  beforeExample?: string;
  afterExample?: string;
  applied: boolean;
  section?: string;
}

export interface CvAnalysisCriteria {
  structure: number;
  contenu: number;
  chiffres: number;
  motsCles: number;
  lisibilite: number;
}

export interface CvAnalysisResult {
  id: string;
  date: Date;
  type: CvAnalysisType;
  title: string;
  targetRole?: string;
  targetOfferTitle?: string;
  globalScore: number;
  scoreExplanation: string;
  criteria: CvAnalysisCriteria;
  detectedSections: string[];
  hasEmail: boolean;
  hasPhone: boolean;
  hasLinkedIn: boolean;
  hasActionVerbs: boolean;
  hasNumbers: boolean;
  buzzwordsFound: string[];
  strengths: string[];
  recommendations: CvRecommendation[];
  encouragingQuote: string;
  originalContent: {
    rawText?: string;
    linkedin?: {
      title: string;
      about: string;
      experiences: string;
    };
  };
  tone: 'sobre' | 'dynamique';
  correctedContent: {
    rawText?: string;
    linkedin?: {
      title: string;
      about: string;
      experiences: string;
    };
    missingPlaceholders: string[];
  };
}
