import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { ResultsService } from '../../core/services/results.service';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { BtnComponent } from '../../shared/components/btn/btn.component';
import { FormFieldComponent } from '../../shared/components/form-field/form-field.component';
import { ScoreBadgeComponent } from '../../shared/components/score-badge/score-badge.component';
import { SimulationResult } from '../../core/models/result.model';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NavbarComponent,
    BtnComponent,
    FormFieldComponent,
    ScoreBadgeComponent,
    IconComponent
  ],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})
export class ProfilComponent implements OnInit {
  authService = inject(AuthService);
  private resultsService = inject(ResultsService);
  private fb = inject(FormBuilder);

  profileForm!: FormGroup;
  history = signal<SimulationResult[]>([]);
  savedMessage = signal<string | null>(null);
  exportMessage = signal<string | null>(null);

  domains = [
    'Développement Web',
    'Développement Mobile',
    'Data Science & IA',
    'Cybersécurité',
    'DevOps & Cloud',
    'Marketing Digital'
  ];

  ngOnInit(): void {
    const user = this.authService.user() || {
      firstName: 'Mohamed',
      lastName: 'Ben Ali',
      email: 'mohamed@intervia.tn',
      phone: '+216 55 123 456',
      domain: 'Développement Web',
      profileType: 'emploi'
    };

    this.profileForm = this.fb.group({
      firstName: [user.firstName, Validators.required],
      lastName: [user.lastName, Validators.required],
      email: [user.email, [Validators.required, Validators.email]],
      phone: [user.phone || ''],
      domain: [user.domain, Validators.required],
      profileType: [user.profileType, Validators.required],
      skills: ['Angular 17, TypeScript, SCSS, RxJS, REST API']
    });

    this.resultsService.getUserResults().subscribe(results => {
      this.history.set(results);
    });
  }

  saveProfile(): void {
    if (this.profileForm.invalid) return;

    this.authService.updateProfile(this.profileForm.value);
    this.savedMessage.set('Vos informations de profil ont été mises à jour avec succès !');

    setTimeout(() => {
      this.savedMessage.set(null);
    }, 4000);
  }

  exportCertificate(): void {
    this.exportMessage.set('Certificat IntervIA généré avec succès ! Le téléchargement du PDF a débuté.');

    setTimeout(() => {
      this.exportMessage.set(null);
    }, 5000);
  }
}

