export interface QcmOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QcmQuestion {
  id: string;
  text: string;
  options: QcmOption[];
  explanation: string;
  category: string;
  difficulty: 'facile' | 'moyen' | 'difficile';
  timeLimit: number; // seconds
}

export interface TechQuestion {
  id: string;
  title: string;
  description: string;
  starterCode: Record<string, string>; // language -> code
  expectedOutput: string;
  testCases: TechTestCase[];
  difficulty: 'facile' | 'moyen' | 'difficile';
  timeLimit: number; // minutes
}

export interface TechTestCase {
  id: string;
  input: string;
  expectedOutput: string;
  label: string;
  passed?: boolean;
}
