export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  domain: string;
  profileType: 'stage' | 'emploi';
  role: 'candidat' | 'admin';
  avatarUrl?: string;
  linkedIn?: string;
  cvFileName?: string;
  createdAt: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  domain: string;
  profileType: 'stage' | 'emploi';
}
