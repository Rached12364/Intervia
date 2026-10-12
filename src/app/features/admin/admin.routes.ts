import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./admin-dashboard/admin-dashboard.component')
      .then(m => m.AdminDashboardComponent)
  },
  {
    path: 'utilisateurs',
    loadComponent: () => import('./admin-users/admin-users.component')
      .then(m => m.AdminUsersComponent)
  },
  {
    path: 'simulations',
    loadComponent: () => import('./admin-simulations/admin-simulations.component')
      .then(m => m.AdminSimulationsComponent)
  },
  {
    path: 'contenu',
    loadComponent: () => import('./admin-content/admin-content.component')
      .then(m => m.AdminContentComponent)
  },
  {
    path: 'config-ia',
    loadComponent: () => import('./admin-config-ia/admin-config-ia.component')
      .then(m => m.AdminConfigIaComponent)
  }
];
