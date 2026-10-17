import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  inject,
  OnInit,
  ElementRef,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { LogoComponent } from '../../shared/components/logo/logo.component';
import { BtnComponent } from '../../shared/components/btn/btn.component';
import { PasswordResetService } from '../../core/services/password-reset.service';

@Component({
  selector: 'app-reinitialisation',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NavbarComponent,
    IconComponent,
    LogoComponent,
    BtnComponent
  ],
  templateUrl: './reinitialisation.component.html',
  styleUrl: './reinitialisation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReinitialisationComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private passwordResetService = inject(PasswordResetService);

  @ViewChild('passwordInput') passwordInputElement?: ElementRef<HTMLInputElement>;
  @ViewChild('confirmInput') confirmInputElement?: ElementRef<HTMLInputElement>;

  email = signal<string>('mohamed@intervia.tn');
  isExpired = signal<boolean>(false);
  loading = signal<boolean>(false);
  errorMessage = signal<string>('');

  showPassword = signal<boolean>(false);
  showConfirmPassword = signal<boolean>(false);

  form = this.fb.group({
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]]
  });

  // Critères de mot de passe évalués en direct
  passwordValue = signal<string>('');
  confirmPasswordValue = signal<string>('');

  hasMinLength = computed(() => this.passwordValue().length >= 8);
  hasUppercase = computed(() => /[A-Z]/.test(this.passwordValue()));
  hasNumber = computed(() => /[0-9]/.test(this.passwordValue()));

  allCriteriaMet = computed(() =>
    this.hasMinLength() && this.hasUppercase() && this.hasNumber()
  );

  passwordsMatch = computed(() => {
    const p = this.passwordValue();
    const cp = this.confirmPasswordValue();
    if (!cp) return true; // pas encore saisi
    return p === cp;
  });

  canSubmit = computed(() =>
    this.allCriteriaMet() &&
    this.confirmPasswordValue().length > 0 &&
    this.passwordsMatch() &&
    !this.loading()
  );

  ngOnInit(): void {
    // Vérifier les paramètres d'URL (email et éventuelle expiration forcée)
    const queryParams = this.route.snapshot.queryParams;
    if (queryParams['email']) {
      this.email.set(queryParams['email']);
    } else {
      this.email.set(this.passwordResetService.getLastEmail());
    }

    if (queryParams['expire'] === '1') {
      this.isExpired.set(true);
    }

    // Écouter les changements des champs pour les signaux
    this.form.get('password')?.valueChanges.subscribe(val => {
      this.passwordValue.set(val || '');
    });

    this.form.get('confirmPassword')?.valueChanges.subscribe(val => {
      this.confirmPasswordValue.set(val || '');
    });

    // Mettre le focus sur le champ mot de passe si le lien n'est pas expiré
    if (!this.isExpired()) {
      setTimeout(() => {
        if (this.passwordInputElement) {
          this.passwordInputElement.nativeElement.focus();
        }
      }, 100);
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword.update(v => !v);
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword.update(v => !v);
  }

  onSubmit(): void {
    if (!this.allCriteriaMet()) {
      this.errorMessage.set('Veuillez remplir tous les critères de sécurité ci-dessous.');
      if (this.passwordInputElement) {
        this.passwordInputElement.nativeElement.focus();
      }
      return;
    }

    if (!this.passwordsMatch() || !this.confirmPasswordValue()) {
      this.errorMessage.set('Les deux mots de passe ne correspondent pas.');
      if (this.confirmInputElement) {
        this.confirmInputElement.nativeElement.focus();
      }
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');

    this.passwordResetService
      .resetPassword(this.passwordValue(), this.email())
      .subscribe({
        next: () => {
          // Redirection vers /connexion avec le paramètre de succès
          this.router.navigate(['/connexion'], {
            queryParams: { reset: 'success' }
          });
        },
        error: () => {
          this.loading.set(false);
          this.errorMessage.set('Une erreur inattendue est survenue. Veuillez réessayer.');
        }
      });
  }
}
