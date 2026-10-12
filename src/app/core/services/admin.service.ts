import { Injectable, signal } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'candidat' | 'admin';
  profileType: 'stage' | 'emploi';
  simulationsCount: number;
  averageScore: number;
  active: boolean;
  registeredDate: string;
}

export interface AdminContentItem {
  id: string;
  title: string;
  type: 'question' | 'offre';
  author: string;
  category: string;
  status: 'en_attente' | 'valide' | 'rejete';
  submittedDate: string;
}

export interface AdminAiConfig {
  goldThreshold: number;
  silverThreshold: number;
  bronzeThreshold: number;
  clarityWeight: number;
  stressWeight: number;
  postureWeight: number;
  technicalWeight: number;
  aiFeedbackModel: string;
}

@Injectable({ providedIn: 'root' })
export class AdminService {
  private users = signal<AdminUser[]>([
    {
      id: 'usr-1',
      name: 'Yassine Ben Ali',
      email: 'yassine@intervia.tn',
      role: 'candidat',
      profileType: 'emploi',
      simulationsCount: 4,
      averageScore: 88,
      active: true,
      registeredDate: '01/09/2026'
    },
    {
      id: 'usr-2',
      name: 'Sarra Trabelsi',
      email: 'sarra.trabelsi@gmail.com',
      role: 'candidat',
      profileType: 'stage',
      simulationsCount: 2,
      averageScore: 78,
      active: true,
      registeredDate: '15/09/2026'
    },
    {
      id: 'usr-3',
      name: 'Mehdi Gharbi',
      email: 'mehdi.gharbi@yahoo.fr',
      role: 'candidat',
      profileType: 'emploi',
      simulationsCount: 6,
      averageScore: 92,
      active: true,
      registeredDate: '20/08/2026'
    },
    {
      id: 'usr-4',
      name: 'Amina Jaziri',
      email: 'amina.j@outlook.com',
      role: 'candidat',
      profileType: 'stage',
      simulationsCount: 1,
      averageScore: 65,
      active: false,
      registeredDate: '02/10/2026'
    }
  ]);

  private contentItems = signal<AdminContentItem[]>([
    {
      id: 'cnt-1',
      title: 'Question Soft Skills : Gestion d\'un échec de déploiement',
      type: 'question',
      author: 'Comité RH IntervIA',
      category: 'Résilience & Communication',
      status: 'en_attente',
      submittedDate: '08/10/2026'
    },
    {
      id: 'cnt-2',
      title: 'Offre Stage PFE Développeur Angular Fullstack',
      type: 'offre',
      author: 'TechVision Tunis',
      category: 'Développement Web',
      status: 'en_attente',
      submittedDate: '09/10/2026'
    },
    {
      id: 'cnt-3',
      title: 'Question Technique : Programmation réactive et fuites mémoire',
      type: 'question',
      author: 'Lead Architecte',
      category: 'Angular / RxJS',
      status: 'valide',
      submittedDate: '05/10/2026'
    }
  ]);

  private aiConfig = signal<AdminAiConfig>({
    goldThreshold: 85,
    silverThreshold: 70,
    bronzeThreshold: 50,
    clarityWeight: 30,
    stressWeight: 20,
    postureWeight: 20,
    technicalWeight: 30,
    aiFeedbackModel: 'Gemini 1.5 Pro Recruiter v2'
  });

  getUsers(): Observable<AdminUser[]> {
    return of(this.users()).pipe(delay(250));
  }

  toggleUserStatus(userId: string): Observable<boolean> {
    const updated = this.users().map(u => u.id === userId ? { ...u, active: !u.active } : u);
    this.users.set(updated);
    return of(true).pipe(delay(200));
  }

  getContentItems(): Observable<AdminContentItem[]> {
    return of(this.contentItems()).pipe(delay(250));
  }

  updateContentStatus(id: string, status: 'valide' | 'rejete'): Observable<boolean> {
    const updated = this.contentItems().map(item => item.id === id ? { ...item, status } : item);
    this.contentItems.set(updated);
    return of(true).pipe(delay(200));
  }

  getAiConfig(): Observable<AdminAiConfig> {
    return of(this.aiConfig()).pipe(delay(200));
  }

  updateAiConfig(config: AdminAiConfig): Observable<boolean> {
    this.aiConfig.set(config);
    return of(true).pipe(delay(300));
  }
}
