import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Guard pour les routes publiques réservées aux visiteurs non connectés (/, /connexion, /mot-de-passe-oublie, etc.) :
 * - Si connecté en tant qu'admin -> redirection vers /admin
 * - Si connecté en tant que candidat -> redirection vers /dashboard
 * - Si non connecté -> accès autorisé
 */
export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    if (authService.isAdmin()) {
      router.navigate(['/admin']);
    } else {
      router.navigate(['/dashboard']);
    }
    return false;
  }

  return true;
};
