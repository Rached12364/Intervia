import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FormFieldComponent } from '../../shared/components/form-field/form-field.component';
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
    FormFieldComponent,
    BtnComponent,
    IconComponent,
    LogoComponent
  ],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.scss'
})
export class ConnexionComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    email: ['yassine@intervia.tn', [Validators.required, Validators.email]],
    password: ['demo123', [Validators.required, Validators.minLength(6)]]
  });

  loading = signal(false);
  errorMessage = signal('');

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');

    const credentials = this.loginForm.value;
    this.authService.login(credentials).subscribe({
      next: (user) => {
        this.loading.set(false);
        if (user.role === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err) => {
        this.loading.set(false);
        this.errorMessage.set(err.message || 'Email ou mot de passe incorrect.');
      }
    });
  }

  loginAsDemoCandidate(): void {
    this.authService.loginAsDemoCandidate();
    this.router.navigate(['/dashboard']);
  }

  loginAsDemoAdmin(): void {
    this.authService.loginAsDemoAdmin();
    this.router.navigate(['/admin']);
  }
}
