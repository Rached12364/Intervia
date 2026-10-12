import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (authService.isAdmin()) {
    return true;
  }
  
  // Redirection bienveillante pour les candidats
  router.navigate(['/dashboard'], { queryParams: { error: 'unauthorized_admin' } });
  return false;
};
