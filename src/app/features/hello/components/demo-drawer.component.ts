import { Component, EventEmitter, Output, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-demo-drawer',
  standalone: true,
  imports: [CommonModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div 
      class="demo-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-title"
      (click)="close.emit()">
      <div 
        class="demo-card"
        (click)="$event.stopPropagation()">
        
        <header class="demo-header">
          <div>
            <span class="demo-tag">SHOWCASE INTERACTIF</span>
            <h2 id="demo-title" class="demo-title">Mode Démo IntervIA</h2>
            <p class="demo-subtitle">
              Accédez directement aux espaces protégés de l'application.
            </p>
          </div>
          <button 
            type="button" 
            class="demo-close-btn"
            (click)="close.emit()" 
            aria-label="Fermer le mode démo">
            <app-icon name="check" [size]="18" aria-hidden="true" />
            <span>Fermer</span>
          </button>
        </header>

        <!-- État de connexion en cours si actif -->
        @if (connecting()) {
          <div class="connecting-banner" role="status" aria-live="polite">
            <span class="connecting-dot"></span>
            <strong>Connexion en cours…</strong>
            <span>Préparation de la session de démonstration</span>
          </div>
        }

        <div class="demo-grid">
          <!-- Carte 1 : Profil Candidat Mohamed -->
          <div class="demo-box">
            <div class="box-header">
              <span class="box-badge">CANDIDAT</span>
              <h3 class="box-title">Mohamed Ben Ali</h3>
              <p class="box-desc">Étudiant en quête de stage PFE · Profil complet</p>
            </div>

            <div class="box-actions">
              <button 
                type="button" 
                class="demo-action-btn"
                [disabled]="connecting()"
                (click)="loginAsCandidate('/dashboard')">
                <app-icon name="dashboard" [size]="18" aria-hidden="true" />
                <span>Tableau de bord</span>
              </button>

              <button 
                type="button" 
                class="demo-action-btn"
                [disabled]="connecting()"
                (click)="loginAsCandidate('/simulation-rh')">
                <app-icon name="videocam" [size]="18" aria-hidden="true" />
                <span>Simulateur RH Vidéo</span>
              </button>

              <button 
                type="button" 
                class="demo-action-btn"
                [disabled]="connecting()"
                (click)="loginAsCandidate('/offres')">
                <app-icon name="work" [size]="18" aria-hidden="true" />
                <span>Catalogue des Offres</span>
              </button>
            </div>
          </div>

          <!-- Carte 2 : Profil Administrateur -->
          <div class="demo-box demo-box--admin">
            <div class="box-header">
              <span class="box-badge box-badge--admin">ADMINISTRATION</span>
              <h3 class="box-title">Panneau Superviseur</h3>
              <p class="box-desc">Gestion des questions, candidats et statistiques IA</p>
            </div>

            <div class="box-actions">
              <button 
                type="button" 
                class="demo-action-btn demo-action-btn--admin"
                [disabled]="connecting()"
                (click)="loginAsAdmin('/admin')">
                <app-icon name="admin_panel_settings" [size]="18" aria-hidden="true" />
                <span>Espace Administrateur (/admin)</span>
              </button>
            </div>
          </div>
        </div>

        <footer class="demo-footer">
          <span class="demo-note">Comptes de test : mohamed&#64;intervia.tn / admin&#64;intervia.tn</span>
        </footer>
      </div>
    </div>
  `,
  styles: [`
    .demo-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(18, 18, 18, 0.7);
      backdrop-filter: blur(4px);
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
    }

    .demo-card {
      background: #FAF8F4;
      border: 3px solid #121212;
      box-shadow: 8px 8px 0 #121212;
      width: 100%;
      max-width: 680px;
      max-height: 85dvh;
      overflow-y: auto;
      border-radius: 6px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      position: relative;
    }

    .demo-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      border-bottom: 2px solid #121212;
      padding-bottom: 14px;
    }

    .demo-tag {
      font-family: 'Archivo', sans-serif;
      font-weight: 800;
      font-size: 0.6875rem;
      letter-spacing: 0.1em;
      color: #A63A60;
    }

    .demo-title {
      font-family: 'Playfair Display', serif;
      font-size: 1.5rem;
      color: #121212;
      margin: 4px 0 2px 0;
    }

    .demo-subtitle {
      font-size: 0.8125rem;
      color: #3A3A3A;
      margin: 0;
    }

    .demo-close-btn {
      background: #EFEBE4;
      border: 2px solid #121212;
      font-family: 'Archivo', sans-serif;
      font-weight: 800;
      font-size: 0.75rem;
      text-transform: uppercase;
      padding: 6px 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      box-shadow: 2px 2px 0 #121212;

      &:hover {
        transform: translate(-1px, -1px);
        box-shadow: 3px 3px 0 #121212;
      }
    }

    .connecting-banner {
      background: #A63A60;
      color: #FAF8F4;
      padding: 10px 16px;
      border: 2px solid #121212;
      border-radius: 4px;
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 0.8125rem;
    }

    .connecting-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #FAF8F4;
      animation: pulse 1s infinite alternate;
    }

    @keyframes pulse {
      from { opacity: 0.4; transform: scale(0.8); }
      to { opacity: 1; transform: scale(1.1); }
    }

    .demo-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 16px;
    }

    .demo-box {
      background: #EFEBE4;
      border: 2px solid #121212;
      padding: 16px;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 14px;
      box-shadow: 4px 4px 0 #121212;

      &--admin {
        background: #FAF3F6;
      }
    }

    .box-badge {
      font-family: 'Archivo', sans-serif;
      font-weight: 800;
      font-size: 0.625rem;
      letter-spacing: 0.08em;
      background: #121212;
      color: #EFEBE4;
      padding: 2px 6px;
      border-radius: 2px;
      display: inline-block;
      margin-bottom: 6px;

      &--admin {
        background: #A63A60;
      }
    }

    .box-title {
      font-family: 'Playfair Display', serif;
      font-size: 1.125rem;
      color: #121212;
      margin: 0;
    }

    .box-desc {
      font-size: 0.75rem;
      color: #3A3A3A;
      margin: 4px 0 0 0;
    }

    .box-actions {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .demo-action-btn {
      background: #FAF8F4;
      border: 2px solid #121212;
      font-family: 'Archivo', sans-serif;
      font-weight: 800;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      padding: 10px 14px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      color: #121212;
      box-shadow: 2px 2px 0 #121212;
      transition: all 120ms ease;

      &:hover:not(:disabled) {
        background: #121212;
        color: #EFEBE4;
        transform: translate(-1px, -1px);
        box-shadow: 3px 3px 0 #121212;
      }

      &--admin {
        border-color: #A63A60;
        &:hover:not(:disabled) {
          background: #A63A60;
          color: #FAF8F4;
        }
      }
    }

    .demo-footer {
      border-top: 1px solid rgba(18, 18, 18, 0.2);
      padding-top: 10px;
      text-align: center;
    }

    .demo-note {
      font-family: monospace;
      font-size: 0.6875rem;
      color: #3A3A3A;
    }
  `]
})
export class DemoDrawerComponent {
  @Output() close = new EventEmitter<void>();

  private authService = inject(AuthService);
  private router = inject(Router);

  connecting = signal<boolean>(false);

  loginAsCandidate(targetRoute: string): void {
    this.connecting.set(true);
    this.authService.login({ email: 'mohamed@intervia.tn', password: 'password123' }).subscribe({
      next: () => {
        setTimeout(() => {
          this.connecting.set(false);
          this.close.emit();
          this.router.navigateByUrl(targetRoute);
        }, 500);
      },
      error: () => {
        this.connecting.set(false);
      }
    });
  }

  loginAsAdmin(targetRoute: string): void {
    this.connecting.set(true);
    this.authService.login({ email: 'admin@intervia.tn', password: 'password123' }).subscribe({
      next: () => {
        setTimeout(() => {
          this.connecting.set(false);
          this.close.emit();
          this.router.navigateByUrl(targetRoute);
        }, 500);
      },
      error: () => {
        this.connecting.set(false);
      }
    });
  }
}
