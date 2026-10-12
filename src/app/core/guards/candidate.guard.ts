import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Guard pour les routes réservées aux candidats :
 * - Si non connecté -> redirection vers /connexion
 * - Si connecté en tant qu'admin -> redirection vers /admin
 */
export const candidateGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    router.navigate(['/connexion']);
    return false;
  }

  if (authService.isAdmin()) {
    router.navigate(['/admin']);
    return false;
  }

  return true;
};
