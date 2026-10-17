import {
  Component,
  ChangeDetectionStrategy,
  signal,
  inject,
  OnDestroy,
  ElementRef,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { BtnComponent } from '../../shared/components/btn/btn.component';
import { PasswordResetService } from '../../core/services/password-reset.service';

@Component({
  selector: 'app-mot-de-passe-oublie',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NavbarComponent,
    IconComponent,
    LogoComponent,
    BtnComponent
  ],
  templateUrl: './mot-de-passe-oublie.component.html',
  styleUrl: './mot-de-passe-oublie.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MotDePasseOublieComponent implements OnDestroy {
  private router = inject(Router);
  private passwordResetService = inject(PasswordResetService);

  @ViewChild('emailInput') emailInputElement?: ElementRef<HTMLInputElement>;
  @ViewChild('confirmHeading') confirmHeadingElement?: ElementRef<HTMLElement>;

  // État de l'écran : 'request' (saisie de l'e-mail) ou 'confirmation' (lien envoyé)
  step = signal<'request' | 'confirmation'>('request');

  email = signal<string>('mohamed@intervia.tn');
  emailError = signal<string>('');
  loading = signal<boolean>(false);
  resendSuccess = signal<boolean>(false);

  // Compte à rebours de 30 secondes pour le renvoi
  resendCountdown = signal<number>(30);
  private timerId: any = null;

  ngOnDestroy(): void {
    this.stopCountdown();
  }

  validateEmail(): boolean {
    const val = (this.email() || '').trim();
    if (!val) {
      this.emailError.set('Ajoutez votre adresse e-mail pour continuer.');
      return false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(val)) {
      this.emailError.set('Cette adresse e-mail semble incomplète. Exemple : prenom@exemple.com');
      return false;
    }
    this.emailError.set('');
    return true;
  }

  validateEmailOnBlur(): void {
    if (this.email().trim()) {
      this.validateEmail();
    }
  }

  onSubmit(): void {
    if (!this.validateEmail()) {
      if (this.emailInputElement) {
        this.emailInputElement.nativeElement.focus();
      }
      return;
    }

    this.loading.set(true);
    this.emailError.set('');

    this.passwordResetService.requestReset(this.email()).subscribe({
      next: () => {
        this.loading.set(false);
        this.step.set('confirmation');
        this.startCountdown();
        setTimeout(() => {
          if (this.confirmHeadingElement) {
            this.confirmHeadingElement.nativeElement.focus();
          }
        }, 50);
      },
      error: () => {
        this.loading.set(false);
        this.emailError.set('Une erreur temporaire est survenue. Veuillez réessayer.');
      }
    });
  }

  startCountdown(): void {
    this.stopCountdown();
    this.resendCountdown.set(30);
    this.timerId = setInterval(() => {
      const current = this.resendCountdown();
      if (current <= 1) {
        this.resendCountdown.set(0);
        this.stopCountdown();
      } else {
        this.resendCountdown.set(current - 1);
      }
    }, 1000);
  }

  stopCountdown(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  resendLink(): void {
    if (this.resendCountdown() > 0) return;

    this.loading.set(true);
    this.passwordResetService.requestReset(this.email()).subscribe({
      next: () => {
        this.loading.set(false);
        this.resendSuccess.set(true);
        this.startCountdown();
        setTimeout(() => this.resendSuccess.set(false), 4000);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }

  backToInput(): void {
    this.stopCountdown();
    this.step.set('request');
    setTimeout(() => {
      if (this.emailInputElement) {
        this.emailInputElement.nativeElement.focus();
      }
    }, 50);
  }

  openDemoLink(): void {
    this.router.navigate(['/reinitialisation'], {
      queryParams: { email: this.email() }
    });
  }
}
