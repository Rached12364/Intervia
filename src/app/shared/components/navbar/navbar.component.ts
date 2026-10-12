import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { IconComponent } from '../icon/icon.component';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent, LogoComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="navbar" role="navigation" aria-label="Navigation principale">
      <div class="navbar__inner">
        <a class="navbar__logo" routerLink="/dashboard" id="nav-logo">
          <app-logo variant="full" theme="dark" [size]="28" />
        </a>

        @if (auth.isAuthenticated()) {
          <ul class="navbar__links">
            <li>
              <a class="navbar__link" routerLink="/dashboard" routerLinkActive="navbar__link--active" id="nav-dashboard">
                <app-icon name="dashboard" aria-hidden="true" />
                <span>Tableau de bord</span>
              </a>
            </li>
            <li>
              <a class="navbar__link" routerLink="/preparation" routerLinkActive="navbar__link--active" id="nav-preparation">
                <app-icon name="auto_awesome" aria-hidden="true" />
                <span>Préparer une offre</span>
              </a>
            </li>
            <li>
              <a class="navbar__link" routerLink="/simulation-rh" routerLinkActive="navbar__link--active" id="nav-simulation">
                <app-icon name="videocam" aria-hidden="true" />
                <span>Simulation RH</span>
              </a>
            </li>
            <li>
              <a class="navbar__link" routerLink="/qcm" routerLinkActive="navbar__link--active" id="nav-qcm">
                <app-icon name="quiz" aria-hidden="true" />
                <span>QCM</span>
              </a>
            </li>
            <li>
              <a class="navbar__link" routerLink="/test-technique" routerLinkActive="navbar__link--active" id="nav-test">
                <app-icon name="code" aria-hidden="true" />
                <span>Test technique</span>
              </a>
            </li>
            <li>
              <a class="navbar__link" routerLink="/offres" routerLinkActive="navbar__link--active" id="nav-offres">
                <app-icon name="work" aria-hidden="true" />
                <span>Offres</span>
              </a>
            </li>
            <li>
              <a class="navbar__link" routerLink="/resultats" routerLinkActive="navbar__link--active" id="nav-resultats">
                <app-icon name="bar_chart" aria-hidden="true" />
                <span>Résultats</span>
              </a>
            </li>
          </ul>

          <div class="navbar__user">
            <a class="navbar__user-btn" routerLink="/profil" id="nav-profil">
              <div class="navbar__avatar">
                {{ auth.userName().charAt(0) }}
              </div>
              <span class="navbar__user-name">{{ auth.userName() }}</span>
            </a>
            <button class="navbar__logout" (click)="logout()" title="Se déconnecter" id="nav-logout">
              <app-icon name="logout" aria-hidden="true" />
            </button>
          </div>
        } @else {
          <div class="navbar__auth">
            <a class="navbar__link" routerLink="/connexion" routerLinkActive="navbar__link--active" id="nav-connexion">
              Se connecter
            </a>
            <a class="navbar__cta" routerLink="/inscription" id="nav-inscription">
              S'inscrire
            </a>
          </div>
        }
      </div>
    </nav>
  `,
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  auth = inject(AuthService);

  logout(): void {
    this.auth.logout();
  }
}
