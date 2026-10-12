export interface JobOffer {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  domain: string;
  type: 'stage' | 'emploi';
  contract: 'CDI' | 'CDD' | 'Stage' | 'Alternance' | 'Freelance';
  requiredScore: number;
  description: string;
  skills: string[];
  salary?: string;
  postedAt: Date;
  deadline?: Date;
}
