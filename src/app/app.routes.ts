import { Routes } from '@angular/router';
import { candidateGuard } from './core/guards/candidate.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'connexion',
    pathMatch: 'full'
  },
  {
    path: 'inscription',
    loadComponent: () => import('./features/inscription/inscription.component')
      .then(m => m.InscriptionComponent)
  },
  {
    path: 'connexion',
    loadComponent: () => import('./features/connexion/connexion.component')
      .then(m => m.ConnexionComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component')
      .then(m => m.DashboardComponent),
    canActivate: [candidateGuard]
  },
  {
    path: 'simulation-rh',
    loadComponent: () => import('./features/simulation-rh/simulation-rh.component')
      .then(m => m.SimulationRhComponent),
    canActivate: [candidateGuard]
  },
  {
    path: 'qcm',
    loadComponent: () => import('./features/qcm/qcm.component')
      .then(m => m.QcmComponent),
    canActivate: [candidateGuard]
  },
  {
    path: 'test-technique',
    loadComponent: () => import('./features/test-technique/test-technique.component')
      .then(m => m.TestTechniqueComponent),
    canActivate: [candidateGuard]
  },
  {
    path: 'resultats',
    loadComponent: () => import('./features/resultats/resultats.component')
      .then(m => m.ResultatsComponent),
    canActivate: [candidateGuard]
  },
  {
    path: 'offres',
    loadComponent: () => import('./features/offres/offres.component')
      .then(m => m.OffresComponent),
    canActivate: [candidateGuard]
  },
  {
    path: 'profil',
    loadComponent: () => import('./features/profil/profil.component')
      .then(m => m.ProfilComponent),
    canActivate: [candidateGuard]
  },
  {
    path: 'preparation',
    loadComponent: () => import('./features/preparation/preparation.component')
      .then(m => m.PreparationComponent),
    canActivate: [candidateGuard]
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadComponent: () => import('./features/admin/admin-layout/admin-layout.component')
      .then(m => m.AdminLayoutComponent),
    loadChildren: () => import('./features/admin/admin.routes')
      .then(m => m.ADMIN_ROUTES)
  },
  {
    path: '**',
    redirectTo: 'connexion'
  }
];
