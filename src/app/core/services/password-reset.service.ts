import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface ResetTokenVerification {
  valid: boolean;
  reason?: string;
  email?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {
  private lastResetEmail = signal<string>('mohamed@intervia.tn');

  readonly resetEmail = this.lastResetEmail.asReadonly();

  requestReset(email: string): Observable<boolean> {
    const trimmed = (email || '').trim().toLowerCase();
    this.lastResetEmail.set(trimmed);
    try {
      localStorage.setItem('intervia_last_reset_email', trimmed);
    } catch {
      // ignore storage error in restricted env
    }
    return of(true).pipe(delay(600));
  }

  getLastEmail(): string {
    if (this.lastResetEmail()) {
      return this.lastResetEmail();
    }
    try {
      return localStorage.getItem('intervia_last_reset_email') || 'mohamed@intervia.tn';
    } catch {
      return 'mohamed@intervia.tn';
    }
  }

  verifyToken(forceExpire = false): Observable<ResetTokenVerification> {
    if (forceExpire) {
      return of({
        valid: false,
        reason: 'Ce lien a expiré pour des raisons de sécurité. Les liens ne sont valables que 15 minutes.'
      }).pipe(delay(200));
    }

    return of({
      valid: true,
      email: this.getLastEmail()
    }).pipe(delay(200));
  }

  resetPassword(newPassword: string, email?: string): Observable<boolean> {
    if (email) {
      this.lastResetEmail.set(email);
    }
    // Simulation du temps réseau d'enregistrement sécurisé
    return of(true).pipe(delay(700));
  }
}
