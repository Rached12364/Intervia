import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { BtnComponent } from '../../shared/components/btn/btn.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { PreparationService } from '../../core/services/preparation.service';
import { OffersService } from '../../core/services/offers.service';
import { PreparationPlan, PreparationLevel } from '../../core/models/preparation.model';
import { JobOffer } from '../../core/models/offer.model';

@Component({
  selector: 'app-preparation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NavbarComponent,
    BtnComponent,
    IconComponent
  ],
  templateUrl: './preparation.component.html',
  styleUrl: './preparation.component.scss'
})
export class PreparationComponent implements OnInit {
  private prepService = inject(PreparationService);
  private offersService = inject(OffersService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // Flow step: 1 = 'form', 2 = 'analyzing', 3 = 'roadmap'
  currentStep = signal<1 | 2 | 3>(1);

  // Form tab selection: 'pasted' | 'platform' | 'manual'
  activeTab = signal<'pasted' | 'platform' | 'manual'>('pasted');

  // Input fields
  pastedText = signal<string>('');
  selectedOfferId = signal<string>('');
  availableOffers = signal<JobOffer[]>([]);

  // Manual fields
  manualTitle = signal<string>('');
  manualCompany = signal<string>('');
  manualType = signal<'stage' | 'emploi'>('emploi');
  manualSkills = signal<string[]>(['Angular', 'TypeScript', 'Git']);
  manualSkillInput = signal<string>('');
  manualLevel = signal<PreparationLevel>('intermediaire');

  // Skill editing in step 3
  newSkillInput = signal<string>('');

  // Analysis Animation States (3 steps ~3s)
  analysisStepIndex = signal<number>(0);
  analysisProgressPercent = signal<number>(10);
  analysisStatusText = signal<string>('Lecture et structuration de l\'offre...');

  // Active Plan
  activePlan = signal<PreparationPlan | null>(null);

  // Validation messages
  errorMessage = signal<string>('');

  // Suggestions for skill chips
  suggestedSkills = ['Angular', 'TypeScript', 'React', 'Python', 'Node.js', 'SQL', 'Docker', 'Git', 'Agilité Scrum', 'Communication'];

  ngOnInit(): void {
    // Load offers for tab 2
    this.offersService.getOffers().subscribe(offers => {
      this.availableOffers.set(offers);
    });

    // Check query params if an offer or plan was passed
    this.route.queryParams.subscribe(params => {
      if (params['planId']) {
        const existing = this.prepService.getPreparationById(params['planId']);
        if (existing) {
          this.activePlan.set(existing);
          this.currentStep.set(3);
          return;
        }
      }
      if (params['offerId']) {
        this.activeTab.set('platform');
        this.selectedOfferId.set(params['offerId']);
      }
      // If service already has an active plan, show it
      const current = this.prepService.currentPreparation();
      if (current) {
        this.activePlan.set(current);
        this.currentStep.set(3);
      }
    });
  }

  setTab(tab: 'pasted' | 'platform' | 'manual'): void {
    this.activeTab.set(tab);
    this.errorMessage.set('');
  }

  useSampleOffer(): void {
    this.pastedText.set(this.prepService.getSampleOffer());
    this.errorMessage.set('');
  }

  // --- Manual Skills Management ---
  addManualSkill(): void {
    const s = this.manualSkillInput().trim();
    if (s && !this.manualSkills().includes(s)) {
      this.manualSkills.update(list => [...list, s]);
      this.manualSkillInput.set('');
    }
  }

  removeManualSkill(skill: string): void {
    this.manualSkills.update(list => list.filter(item => item !== skill));
  }

  addSuggestedSkill(skill: string): void {
    if (!this.manualSkills().includes(skill)) {
      this.manualSkills.update(list => [...list, skill]);
    }
  }

  // --- Start Analysis ---
  startAnalysis(): void {
    this.errorMessage.set('');

    if (this.activeTab() === 'pasted') {
      const text = this.pastedText().trim();
      if (text.length < 200) {
        this.errorMessage.set('Votre texte est un peu court : ajoutez quelques lignes (au moins 200 caractères) pour que l\'analyse soit utile.');
        return;
      }
    } else if (this.activeTab() === 'platform') {
      if (!this.selectedOfferId()) {
        this.errorMessage.set('Veuillez sélectionner une offre dans la liste pour continuer.');
        return;
      }
    } else if (this.activeTab() === 'manual') {
      if (!this.manualTitle().trim() || !this.manualCompany().trim()) {
        this.errorMessage.set('Veuillez renseigner l\'intitulé du poste et le nom de l\'entreprise.');
        return;
      }
    }

    // Begin calm analysis phase (~3s)
    this.currentStep.set(2);
    this.analysisStepIndex.set(0);
    this.analysisProgressPercent.set(15);
    this.analysisStatusText.set('Lecture attentive de l\'offre...');

    setTimeout(() => {
      this.analysisStepIndex.set(1);
      this.analysisProgressPercent.set(55);
      this.analysisStatusText.set('Repérage des compétences attendues...');
    }, 1000);

    setTimeout(() => {
      this.analysisStepIndex.set(2);
      this.analysisProgressPercent.set(88);
      this.analysisStatusText.set('Création de votre parcours sur mesure...');
    }, 2000);

    setTimeout(() => {
      this.analysisProgressPercent.set(100);
      this.completeAnalysis();
    }, 3000);
  }

  private completeAnalysis(): void {
    let plan: PreparationPlan;

    if (this.activeTab() === 'pasted') {
      plan = this.prepService.generatePreparationPlan({
        sourceType: 'pasted',
        rawText: this.pastedText()
      });
    } else if (this.activeTab() === 'platform') {
      const offer = this.availableOffers().find(o => o.id === this.selectedOfferId());
      plan = this.prepService.generatePreparationPlan({
        sourceType: 'platform',
        offer
      });
    } else {
      plan = this.prepService.generatePreparationPlan({
        sourceType: 'manual',
        manualData: {
          title: this.manualTitle(),
          company: this.manualCompany(),
          type: this.manualType(),
          skills: this.manualSkills(),
          level: this.manualLevel()
        }
      });
    }

    this.activePlan.set(plan);
    this.currentStep.set(3);
  }

  // --- Step 3 Actions ---
  removeSkillFromPlan(skill: string): void {
    const current = this.activePlan();
    if (!current) return;
    const updatedSkills = current.detectedSkills.filter(s => s !== skill);
    const updated = this.prepService.updateSkillsAndRegenerate(current.id, updatedSkills);
    if (updated) this.activePlan.set(updated);
  }

  addSkillToPlan(): void {
    const current = this.activePlan();
    const s = this.newSkillInput().trim();
    if (!current || !s) return;
    if (!current.detectedSkills.includes(s)) {
      const updatedSkills = [...current.detectedSkills, s].slice(0, 5);
      const updated = this.prepService.updateSkillsAndRegenerate(current.id, updatedSkills);
      if (updated) this.activePlan.set(updated);
    }
    this.newSkillInput.set('');
  }

  restartPreparation(): void {
    this.currentStep.set(1);
    this.errorMessage.set('');
  }

  // Navigation to modules
  launchRhModule(): void {
    const p = this.activePlan();
    if (p) {
      this.router.navigate(['/simulation-rh'], { queryParams: { prep: p.id } });
    }
  }

  launchQcmModule(): void {
    const p = this.activePlan();
    if (p) {
      this.router.navigate(['/qcm'], { queryParams: { prep: p.id } });
    }
  }

  launchTechModule(): void {
    const p = this.activePlan();
    if (p) {
      this.router.navigate(['/test-technique'], { queryParams: { prep: p.id } });
    }
  }

  // Progress summary
  getCompletedModulesCount(): number {
    const p = this.activePlan();
    if (!p) return 0;
    let count = 0;
    if (p.rhModule.progress.status === 'termine') count++;
    if (p.qcmModule.progress.status === 'termine') count++;
    if (p.techModule.progress.status === 'termine') count++;
    return count;
  }

  getGlobalAdvice(): string {
    const p = this.activePlan();
    if (!p || p.overallScore === undefined) return '';
    if (p.overallScore >= 85) {
      return 'Excellente préparation ! Vos réponses démontrent une solide maîtrise technique et une posture professionnelle sereine pour cette offre.';
    } else if (p.overallScore >= 70) {
      return 'Bonne préparation générale. Vous avez les acquis nécessaires : consolidez vos arguments sur vos réalisations pour vous démarquer lors de l\'entretien.';
    } else {
      return 'Un entraînement encourageant. Prenez le temps de relire les explications détaillées du QCM et de perfectionner votre pitch de présentation.';
    }
  }
}
