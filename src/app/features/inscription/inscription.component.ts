import { Component, inject, signal, computed, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FormFieldComponent } from '../../shared/components/form-field/form-field.component';
import { BtnComponent } from '../../shared/components/btn/btn.component';
import { StepperComponent, StepDef } from '../../shared/components/stepper/stepper.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { LogoComponent } from '../../shared/components/logo/logo.component';

// Custom password confirmation validator
export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;
  if (!password || !confirmPassword) return null;
  return password === confirmPassword ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    NavbarComponent,
    FormFieldComponent,
    BtnComponent,
    StepperComponent,
    IconComponent,
    LogoComponent
  ],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.scss'
})
export class InscriptionComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  @ViewChild('stepContainer') stepContainer?: ElementRef<HTMLElement>;

  // Selection method: 'cv' | 'linkedin' | 'manual'
  selectedMethod = signal<'cv' | 'linkedin' | 'manual'>('cv');
  uploadedFile = signal<File | null>(null);
  fileError = signal<string>('');
  isDragOver = signal<boolean>(false);
  termsAccepted = signal<boolean>(false);

  // Stepper & Multi-step form
  stepIndex = signal<number>(0); // 0: Étape 1, 1: Étape 2, 2: Étape 3
  showPassword = signal<boolean>(false);
  showConfirmPassword = signal<boolean>(false);
  isLinkedInConnected = signal<boolean>(false);
  isRegistered = signal<boolean>(false);
  loading = signal<boolean>(false);

  // Skills chips
  skillsList = signal<string[]>(['Angular', 'TypeScript']);
  newSkillInput = signal<string>('');
  suggestedSkills = [
    'Angular', 'TypeScript', 'JavaScript', 'Python', 'SQL',
    'Java', 'Spring Boot', 'Docker', 'Git', 'Communication',
    'Travail d\'équipe', 'Résolution de problèmes'
  ];

  citySuggestions = ['Tunis', 'Sfax', 'Sousse', 'Ariana', 'Monastir', 'Bizerte', 'Nabeul', 'Autre'];

  manualSteps: StepDef[] = [
    { label: 'Votre compte' },
    { label: 'Votre parcours' },
    { label: 'Votre objectif' }
  ];

  // Step 1 Form
  step1Form: FormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/(?=.*[A-Z])(?=.*\d)/)
    ]],
    confirmPassword: ['', [Validators.required]],
    profileType: ['stage', [Validators.required]] // 'stage' ou 'emploi'
  }, { validators: passwordMatchValidator });

  // Step 2 Form
  step2Form: FormGroup = this.fb.group({
    educationLevel: ['Cycle ingénieur', [Validators.required]],
    institution: ['', [Validators.required, Validators.minLength(2)]],
    domain: ['Développement web', [Validators.required]],
    city: ['Tunis', [Validators.required]],
    experience: ['Stage(s)', [Validators.required]]
  });

  // Step 3 Form
  step3Form: FormGroup = this.fb.group({
    targetRole: ['Développeur web', [Validators.required, Validators.minLength(2)]],
    internshipDuration: ['6 mois'],
    contractType: ['CDI'],
    availability: ['', [Validators.required]],
    linkedInUrl: ['', [Validators.pattern(/^(https?:\/\/)?([\w]+\.)?linkedin\.com\/.+/i)]]
  });

  reassuranceText = computed(() => {
    switch (this.selectedMethod()) {
      case 'linkedin':
        return 'Nous ne récupérons que les informations que vous autorisez. Vous pourrez tout vérifier avant de continuer.';
      case 'manual':
        return 'Vous restez maître de vos informations. Vous pourrez les modifier à tout moment.';
      case 'cv':
      default:
        return 'Vous pourrez vérifier chaque information. Votre CV reste privé et n\'est jamais publié sans votre accord.';
    }
  });

  // Password strength evaluation
  passwordStrength = computed(() => {
    const pwd = this.step1Form.get('password')?.value || '';
    if (!pwd) return { score: 0, label: 'Vide', color: '#E5E7EB' };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/\d/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd) || pwd.length >= 12) score++;

    switch (score) {
      case 1:
        return { score: 1, label: 'Faible', color: '#EF4444' };
      case 2:
        return { score: 2, label: 'Moyen', color: '#F59E0B' };
      case 3:
        return { score: 3, label: 'Bon', color: '#10B981' };
      case 4:
      default:
        return { score: 4, label: 'Très fort', color: '#059669' };
    }
  });

  // What is missing in current step
  missingInStep1 = computed(() => {
    const f = this.step1Form;
    if (f.get('firstName')?.invalid) return 'votre prénom';
    if (f.get('lastName')?.invalid) return 'votre nom';
    if (f.get('email')?.invalid) return 'une adresse e-mail valide';
    if (f.get('password')?.invalid) return 'un mot de passe valide (8 car., 1 majuscule, 1 chiffre)';
    if (f.get('confirmPassword')?.invalid || f.hasError('passwordMismatch')) return 'la confirmation identique du mot de passe';
    if (f.get('profileType')?.invalid) return 'votre choix (stage ou emploi)';
    return null;
  });

  missingInStep2 = computed(() => {
    const f = this.step2Form;
    if (f.get('educationLevel')?.invalid) return 'votre niveau d\'études';
    if (f.get('institution')?.invalid) return 'votre établissement';
    if (f.get('domain')?.invalid) return 'votre domaine';
    if (f.get('city')?.invalid) return 'votre ville';
    if (f.get('experience')?.invalid) return 'votre niveau d\'expérience';
    return null;
  });

  missingInStep3 = computed(() => {
    const f = this.step3Form;
    if (f.get('targetRole')?.invalid) return 'le poste visé';
    if (f.get('availability')?.invalid) return 'votre date de disponibilité';
    if (!this.termsAccepted()) return 'l\'acceptation des conditions';
    return null;
  });

  ngOnInit(): void {
    // Restore draft from AuthService if present
    const draft = this.authService.getRegistrationDraft();
    if (draft) {
      if (draft.step1) this.step1Form.patchValue(draft.step1);
      if (draft.step2) this.step2Form.patchValue(draft.step2);
      if (draft.step3) this.step3Form.patchValue(draft.step3);
      if (draft.skills) this.skillsList.set(draft.skills);
      if (draft.termsAccepted !== undefined) this.termsAccepted.set(draft.termsAccepted);
      if (draft.method) this.selectedMethod.set(draft.method);
    }

    // Default availability date to today or next month
    if (!this.step3Form.get('availability')?.value) {
      const today = new Date().toISOString().split('T')[0];
      this.step3Form.patchValue({ availability: today });
    }
  }

  selectMethod(method: 'cv' | 'linkedin' | 'manual'): void {
    this.selectedMethod.set(method);
    this.fileError.set('');
    this.saveDraft();
  }

  saveDraft(): void {
    this.authService.saveRegistrationDraft({
      method: this.selectedMethod(),
      step1: this.step1Form.value,
      step2: this.step2Form.value,
      step3: this.step3Form.value,
      skills: this.skillsList(),
      termsAccepted: this.termsAccepted()
    });
  }

  // Stepper navigation
  goToStep(index: number): void {
    if (index < this.stepIndex()) {
      this.stepIndex.set(index);
      this.focusStepHeader();
      return;
    }
    if (this.stepIndex() === 0 && !this.step1Form.valid) {
      this.step1Form.markAllAsTouched();
      return;
    }
    if (this.stepIndex() === 1 && !this.step2Form.valid) {
      this.step2Form.markAllAsTouched();
      return;
    }
    this.stepIndex.set(index);
    this.saveDraft();
    this.focusStepHeader();
  }

  nextManualStep(): void {
    if (this.stepIndex() === 0) {
      if (!this.step1Form.valid) {
        this.step1Form.markAllAsTouched();
        return;
      }
      this.stepIndex.set(1);
    } else if (this.stepIndex() === 1) {
      if (!this.step2Form.valid) {
        this.step2Form.markAllAsTouched();
        return;
      }
      this.stepIndex.set(2);
    }
    this.saveDraft();
    this.focusStepHeader();
  }

  prevManualStep(): void {
    if (this.stepIndex() > 0) {
      this.stepIndex.set(this.stepIndex() - 1);
      this.saveDraft();
      this.focusStepHeader();
    }
  }

  private focusStepHeader(): void {
    setTimeout(() => {
      this.stepContainer?.nativeElement.focus();
    }, 100);
  }

  // Skills chips management
  addSkill(skillName: string): void {
    const trimmed = skillName.trim();
    if (trimmed && !this.skillsList().includes(trimmed)) {
      this.skillsList.update(list => [...list, trimmed]);
      this.newSkillInput.set('');
      this.saveDraft();
    }
  }

  removeSkill(skillToRemove: string): void {
    this.skillsList.update(list => list.filter(s => s !== skillToRemove));
    this.saveDraft();
  }

  onSkillKeyDown(event: KeyboardEvent, value: string): void {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      this.addSkill(value);
    }
  }

  // LinkedIn simulated connection
  simulateLinkedIn(): void {
    this.loading.set(true);
    setTimeout(() => {
      this.loading.set(false);
      this.isLinkedInConnected.set(true);
      // Pre-fill profile
      this.step1Form.patchValue({
        firstName: 'Yassine',
        lastName: 'Ben Salem',
        email: 'yassine.bensalem@linkedin-demo.tn',
        password: 'Password123!',
        confirmPassword: 'Password123!',
        profileType: 'emploi'
      });
      this.step2Form.patchValue({
        educationLevel: 'Cycle ingénieur',
        institution: 'INSAT Tunis',
        domain: 'Développement web',
        city: 'Tunis',
        experience: '1 à 3 ans'
      });
      this.step3Form.patchValue({
        targetRole: 'Ingénieur Études et Développement Angular',
        contractType: 'CDI',
        linkedInUrl: 'https://linkedin.com/in/yassine-bensalem'
      });
      this.skillsList.set(['Angular', 'TypeScript', 'Node.js', 'RxJS', 'Git']);
      this.saveDraft();
    }, 700);
  }

  // File handling for CV
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(true);
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(false);
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      this.handleFile(event.dataTransfer.files[0]);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFile(input.files[0]);
    }
  }

  private handleFile(file: File): void {
    this.fileError.set('');
    if (file.type !== 'application/pdf') {
      this.fileError.set('Veuillez importer un fichier au format PDF.');
      return;
    }
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      this.fileError.set('Le fichier ne doit pas dépasser 5 Mo.');
      return;
    }
    this.uploadedFile.set(file);
    // Auto fill step 1 & 2 basics from CV
    this.step1Form.patchValue({
      firstName: 'Yassine',
      lastName: 'Ben Salem',
      email: 'yassine.bensalem@etudiant.tn'
    });
    this.saveDraft();
  }

  removeFile(): void {
    this.uploadedFile.set(null);
    this.fileError.set('');
    this.saveDraft();
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Ko';
    const k = 1024;
    const sizes = ['Octets', 'Ko', 'Mo', 'Go'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  canSubmit(): boolean {
    if (!this.termsAccepted()) return false;
    const method = this.selectedMethod();
    if (method === 'cv') {
      return this.uploadedFile() !== null;
    }
    if (method === 'linkedin') {
      return this.isLinkedInConnected();
    }
    if (method === 'manual') {
      return this.step1Form.valid && this.step2Form.valid && this.step3Form.valid;
    }
    return false;
  }

  submitRegistration(): void {
    if (!this.canSubmit()) return;
    this.loading.set(true);

    const formData = {
      ...this.step1Form.value,
      ...this.step2Form.value,
      ...this.step3Form.value,
      skills: this.skillsList()
    };

    this.authService.register(formData).subscribe({
      next: () => {
        this.loading.set(false);
        this.isRegistered.set(true);
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 2200);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }
}
