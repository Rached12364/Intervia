import { Component, inject, signal, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { BtnComponent } from '../../shared/components/btn/btn.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { LogoComponent } from '../../shared/components/logo/logo.component';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    NavbarComponent,
    BtnComponent,
    IconComponent,
    LogoComponent
  ],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.scss'
})
export class ConnexionComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  @ViewChild('emailInput') emailInputRef?: ElementRef<HTMLInputElement>;
  @ViewChild('passwordInput') passwordInputRef?: ElementRef<HTMLInputElement>;

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  selectedRole = signal<'candidat' | 'admin' | null>(null);
  showPassword = signal<boolean>(false);
  capsLockOn = signal<boolean>(false);
  rememberEmail = signal<boolean>(false);
  failedAttempts = signal<number>(0);
  loading = signal<boolean>(false);
  successMessage = signal<string>('');
  globalError = signal<string>('');
  emailError = signal<string>('');
  passwordError = signal<string>('');
  resetSuccess = signal<boolean>(false);

  ngOnInit(): void {
    // 1. Détection de retour depuis la réinitialisation de mot de passe
    const resetParam = this.route.snapshot.queryParamMap.get('reset');
    if (resetParam === 'success') {
      this.resetSuccess.set(true);
    }

    // 2. Récupération de l'email mémorisé si existant
    try {
      const savedEmail = localStorage.getItem('intervia_remembered_email');
      if (savedEmail) {
        this.loginForm.patchValue({ email: savedEmail });
        this.rememberEmail.set(true);
      }
    } catch {
      // Ignore if localStorage unavailable
    }
  }

  selectRole(role: 'candidat' | 'admin'): void {
    this.selectedRole.set(role);
    this.globalError.set('');
    this.emailError.set('');
    this.passwordError.set('');

    if (role === 'candidat') {
      this.loginForm.patchValue({
        email: 'mohamed@intervia.tn',
        password: 'demo123'
      });
    } else {
      this.loginForm.patchValue({
        email: 'admin@intervia.tn',
        password: 'demo123'
      });
    }
  }

  loginImmediately(role: 'candidat' | 'admin', event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.loading.set(true);
    setTimeout(() => {
      if (role === 'candidat') {
        this.authService.loginAsDemoCandidate();
        this.router.navigate(['/dashboard']);
      } else {
        this.authService.loginAsDemoAdmin();
        this.router.navigate(['/admin']);
      }
    }, 400);
  }

  validateEmailOnBlur(): void {
    const emailVal = this.loginForm.get('email')?.value?.trim();
    if (!emailVal) {
      this.emailError.set('Ajoutez votre adresse e-mail pour continuer.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailVal)) {
      this.emailError.set('Cette adresse e-mail semble incomplète. Exemple : prenom@exemple.com');
      return;
    }
    this.emailError.set('');
  }

  validatePasswordOnBlur(): void {
    const pwd = this.loginForm.get('password')?.value;
    if (!pwd) {
      this.passwordError.set('Ajoutez votre mot de passe pour continuer.');
      return;
    }
    this.passwordError.set('');
  }

  checkCapsLock(event: KeyboardEvent): void {
    if (event.getModifierState) {
      this.capsLockOn.set(event.getModifierState('CapsLock'));
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword.update(v => !v);
  }

  toggleRememberEmail(): void {
    this.rememberEmail.update(v => !v);
  }

  canSubmit(): boolean {
    const email = this.loginForm.get('email')?.value?.trim();
    const password = this.loginForm.get('password')?.value;
    return !!email && !!password;
  }

  onSubmit(): void {
    if (this.loading()) return;

    this.globalError.set('');
    const email = this.loginForm.get('email')?.value?.trim();
    const password = this.loginForm.get('password')?.value;

    // Validation des champs
    if (!email) {
      this.emailError.set('Ajoutez votre adresse e-mail pour continuer.');
      this.emailInputRef?.nativeElement.focus();
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      this.emailError.set('Cette adresse e-mail semble incomplète. Exemple : prenom@exemple.com');
      this.emailInputRef?.nativeElement.focus();
      return;
    }

    if (!password) {
      this.passwordError.set('Ajoutez votre mot de passe pour continuer.');
      this.passwordInputRef?.nativeElement.focus();
      return;
    }

    this.emailError.set('');
    this.passwordError.set('');
    this.loading.set(true);

    // Mémorisation de l'email
    try {
      if (this.rememberEmail()) {
        localStorage.setItem('intervia_remembered_email', email);
      } else {
        localStorage.removeItem('intervia_remembered_email');
      }
    } catch {
      // Ignore
    }

    this.authService.login({ email, password }).subscribe({
      next: (user) => {
        this.loading.set(false);
        this.successMessage.set('Connexion réussie. Redirection en cours…');
        setTimeout(() => {
          if (user.role === 'admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/dashboard']);
          }
        }, 500);
      },
      error: () => {
        this.loading.set(false);
        this.failedAttempts.update(n => n + 1);
        this.globalError.set('Adresse e-mail ou mot de passe incorrect. Vérifiez-les et réessayez.');
        this.emailInputRef?.nativeElement.focus();
      }
    });
  }
}
