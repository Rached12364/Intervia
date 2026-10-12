import { Injectable, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, delay, throwError } from 'rxjs';
import { User, LoginCredentials } from '../models/user.model';

const DEMO_USERS: User[] = [
  {
    id: '1',
    firstName: 'Yassine',
    lastName: 'Ben Ali',
    email: 'yassine@intervia.tn',
    phone: '+216 55 123 456',
    domain: 'Développement Web',
    profileType: 'emploi',
    role: 'candidat',
    createdAt: new Date('2024-09-01')
  },
  {
    id: '2',
    firstName: 'Admin',
    lastName: 'IntervIA',
    email: 'admin@intervia.tn',
    phone: '+216 71 000 000',
    domain: 'Administration',
    profileType: 'emploi',
    role: 'admin',
    createdAt: new Date('2024-01-01')
  }
];

@Injectable({ providedIn: 'root' })
export class AuthService {
  private router = inject(Router);
  private currentUser = signal<User | null>(null);
  
  readonly user = this.currentUser.asReadonly();
  readonly isAuthenticated = computed(() => this.currentUser() !== null);
  readonly isAdmin = computed(() => this.currentUser()?.role === 'admin');
  readonly userName = computed(() => {
    const u = this.currentUser();
    return u ? `${u.firstName} ${u.lastName}` : '';
  });

  login(credentials: LoginCredentials): Observable<User> {
    const user = DEMO_USERS.find(u => u.email === credentials.email);
    if (user && credentials.password === 'demo123') {
      this.currentUser.set(user);
      return of(user).pipe(delay(600));
    }
    return throwError(() => new Error('Email ou mot de passe incorrect')).pipe(delay(600));
  }

  logout(): void {
    this.currentUser.set(null);
    this.router.navigate(['/connexion']);
  }

  private registrationDraft: any = null;

  saveRegistrationDraft(data: any): void {
    this.registrationDraft = { ...(this.registrationDraft || {}), ...data };
  }

  getRegistrationDraft(): any {
    return this.registrationDraft;
  }

  clearRegistrationDraft(): void {
    this.registrationDraft = null;
  }

  register(data: any): Observable<User> {
    const newUser: User = {
      id: Date.now().toString(),
      firstName: data.firstName || 'Candidat',
      lastName: data.lastName || 'IntervIA',
      email: data.email,
      phone: data.phone || '+216 ',
      domain: data.domain || 'Développement Web',
      profileType: data.profileType || 'stage',
      role: 'candidat',
      createdAt: new Date()
    };
    this.currentUser.set(newUser);
    this.clearRegistrationDraft();
    return of(newUser).pipe(delay(600));
  }

  loginAsDemoCandidate(): void {
    this.currentUser.set(DEMO_USERS[0]);
  }

  loginAsDemoAdmin(): void {
    this.currentUser.set(DEMO_USERS[1]);
  }

  updateProfile(data: Partial<User>): void {
    const current = this.currentUser();
    if (current) {
      this.currentUser.set({ ...current, ...data });
    }
  }

  getSession(): User | null {
    return this.currentUser();
  }
}
