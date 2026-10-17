import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { LogoComponent } from '../../../shared/components/logo/logo.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, RouterLinkActive, LogoComponent, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="admin-shell">
      <!-- Topbar Minimaliste Spécifique à l'Administration -->
      <header class="admin-topbar" role="banner">
        <div class="admin-topbar__inner">
          <div class="admin-topbar__left">
            <a routerLink="/admin" class="admin-topbar__logo" title="IntervIA - Espace Administration">
              <app-logo variant="full" theme="dark" [size]="52" loading="eager" />
            </a>
            <div class="admin-topbar__badge">
              <app-icon name="admin_panel_settings" [size]="16" aria-hidden="true" />
              <span>Administration</span>
            </div>
          </div>

          <div class="admin-topbar__right">
            <div class="admin-topbar__user">
              <div class="admin-topbar__avatar">A</div>
              <span class="admin-topbar__username">{{ authService.userName() || 'Administrateur' }}</span>
            </div>
            <button
              type="button"
              class="admin-topbar__logout-btn"
              (click)="logout()"
              title="Se déconnecter de l'administration"
              aria-label="Se déconnecter">
              <app-icon name="logout" [size]="18" aria-hidden="true" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </header>

      <!-- Layout Corps : Sidebar + Contenu Routé -->
      <div class="admin-body">
        <aside class="admin-sidebar" aria-label="Menu principal administration">
          <nav class="admin-sidebar__nav">
            <a routerLink="/admin" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" class="admin-sidebar__item">
              <app-icon name="dashboard" [size]="20" aria-hidden="true" />
              <span>Supervision</span>
            </a>
            <a routerLink="/admin/utilisateurs" routerLinkActive="active" class="admin-sidebar__item">
              <app-icon name="people" [size]="20" aria-hidden="true" />
              <span>Utilisateurs</span>
            </a>
            <a routerLink="/admin/simulations" routerLinkActive="active" class="admin-sidebar__item">
              <app-icon name="videocam" [size]="20" aria-hidden="true" />
              <span>Simulations</span>
            </a>
            <a routerLink="/admin/contenu" routerLinkActive="active" class="admin-sidebar__item">
              <app-icon name="fact_check" [size]="20" aria-hidden="true" />
              <span>Validation Contenu</span>
            </a>
            <a routerLink="/admin/config-ia" routerLinkActive="active" class="admin-sidebar__item">
              <app-icon name="tune" [size]="20" aria-hidden="true" />
              <span>Configuration IA</span>
            </a>
          </nav>
        </aside>

        <main class="admin-main" role="main">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {
  authService = inject(AuthService);

  logout(): void {
    this.authService.logout();
  }
}
