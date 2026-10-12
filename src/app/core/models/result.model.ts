export interface SimulationResult {
  id: string;
  userId: string;
  simulationId: string;
  date: Date;
  globalScore: number; // 0 - 100
  scores: ScoreDetail[];
  aiAnalysis: AiAnalysis;
  badge?: 'bronze' | 'argent' | 'or';
  suggestions: string[];
}

export interface ScoreDetail {
  label: string;
  score: number;
  maxScore: number;
  icon: string;
}

export interface AiAnalysis {
  langage: AiMetric;
  posture: AiMetric;
  stress: AiMetric;
  clarte: AiMetric;
}

export interface AiMetric {
  score: number; // 0 - 100
  level: 'faible' | 'moyen' | 'bon' | 'excellent';
  feedback: string;
}
