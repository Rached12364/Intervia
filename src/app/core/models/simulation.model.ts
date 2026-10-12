export interface SimulationQuestion {
  id: string;
  text: string;
  duration: number; // seconds
  category: 'presentation' | 'motivation' | 'technique' | 'situation' | 'soft-skill';
  tips?: string;
}

export interface Simulation {
  id: string;
  title: string;
  description: string;
  totalQuestions: number;
  estimatedDuration: number; // minutes
  difficulty: 'debutant' | 'intermediaire' | 'avance';
  status: 'a-faire' | 'en-cours' | 'terminee';
  scheduledAt?: Date;
}
