import { Component, inject, OnInit, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { BtnComponent } from '../../shared/components/btn/btn.component';
import { IaAvatarComponent } from '../../shared/components/ia-avatar/ia-avatar.component';
import { CvAnalysisService } from '../../core/services/cv-analysis.service';
import { OffersService } from '../../core/services/offers.service';
import { JobOffer } from '../../core/models/offer.model';
import {
  CvAnalysisResult,
  CvRecommendation,
  CvAnalysisType
} from '../../core/models/cv-analysis.model';

@Component({
  selector: 'app-ameliorer-cv',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NavbarComponent,
    IconComponent,
    BtnComponent,
    IaAvatarComponent
  ],
  templateUrl: './ameliorer-cv.component.html',
  styleUrl: './ameliorer-cv.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AmeliorerCvComponent implements OnInit {
  private cvAnalysisService = inject(CvAnalysisService);
  private offersService = inject(OffersService);

  // Wizard step: 1 = Contenu, 2 = Analyse (waiting), 3 = Diagnostic, 4 = Version corrigée
  currentStep = signal<1 | 2 | 3 | 4>(1);

  // Type: 'cv' | 'linkedin'
  docType = signal<CvAnalysisType>('cv');

  // Input methods for CV: 'upload' | 'paste' | 'demo'
  cvInputMethod = signal<'upload' | 'paste' | 'demo'>('upload');

  // CV data
  pastedCvText = signal<string>('');
  uploadedFile = signal<File | null>(null);
  isDragOver = signal<boolean>(false);
  fileError = signal<string>('');

  // LinkedIn data
  linkedinUrl = signal<string>('');
  linkedinTitle = signal<string>('');
  linkedinAbout = signal<string>('');
  linkedinExperiences = signal<string>('');

  // Target role / Offer
  targetRole = signal<string>('');
  selectedOfferId = signal<string>('');
  availableOffers = signal<JobOffer[]>([]);

  // Errors / validation
  globalError = signal<string>('');

  // Step 2 analysis progress
  analysisProgressStep = signal<number>(0); // 0, 1, 2, 3

  // Step 3 & 4 data
  analysisResult = signal<CvAnalysisResult | null>(null);
  currentTone = signal<'sobre' | 'dynamique'>('sobre');
  editableProposedText = signal<string>('');
  editableLinkedInTitle = signal<string>('');
  editableLinkedInAbout = signal<string>('');
  editableLinkedInExperiences = signal<string>('');

  // UI helpers
  copySuccess = signal<boolean>(false);
  saveSuccess = signal<boolean>(false);
  showSavedDrawer = signal<boolean>(false);

  // Computed properties
  readonly cvCharCount = computed(() => this.pastedCvText().trim().length);

  readonly canSubmit = computed(() => {
    if (this.docType() === 'cv') {
      return this.cvCharCount() >= 300;
    } else {
      return this.linkedinAbout().trim().length > 30 || this.linkedinExperiences().trim().length > 30;
    }
  });

  readonly submitHelpText = computed(() => {
    if (this.docType() === 'cv') {
      if (this.cvCharCount() === 0) {
        return 'Importez un fichier, collez votre CV ou utilisez l\'exemple de démonstration pour commencer.';
      }
      if (this.cvCharCount() < 300) {
        return `Votre CV est un peu court pour une analyse utile (${this.cvCharCount()} / 300 caractères requis). Ajoutez quelques lignes.`;
      }
      return 'Votre contenu est prêt à être analysé.';
    } else {
      if (!this.linkedinAbout().trim() && !this.linkedinExperiences().trim()) {
        return 'Ajoutez au moins la section À propos ou Expériences pour lancer l\'analyse.';
      }
      return 'Votre profil LinkedIn est prêt à être analysé.';
    }
  });

  readonly missingPlaceholders = computed(() => {
    const text = this.docType() === 'linkedin'
      ? `${this.editableLinkedInAbout()} ${this.editableLinkedInExperiences()}`
      : this.editableProposedText();

    const matches = text.match(/\[(ajoutez|précisez|indiquez)[^\]]+\]/gi) || [];
    return Array.from(new Set(matches));
  });

  readonly savedAnalysesList = computed(() => this.cvAnalysisService.savedAnalyses());

  ngOnInit(): void {
    this.offersService.getOffers().subscribe(offers => {
      this.availableOffers.set(offers);
    });
  }

  // --- Step 1 Interactions ---
  setDocType(type: CvAnalysisType): void {
    this.docType.set(type);
    this.globalError.set('');
    this.fileError.set('');
  }

  setCvInputMethod(method: 'upload' | 'paste' | 'demo'): void {
    this.cvInputMethod.set(method);
    this.fileError.set('');
    if (method === 'demo') {
      this.loadDemoCv();
    }
  }

  loadDemoCv(): void {
    const demo = this.cvAnalysisService.getDemoCv();
    this.pastedCvText.set(demo);
    this.targetRole.set('Développeur Frontend Angular');
    this.fileError.set('');
    this.globalError.set('');
  }

  loadDemoLinkedIn(): void {
    const demo = this.cvAnalysisService.getDemoLinkedIn();
    this.linkedinTitle.set(demo.title);
    this.linkedinAbout.set(demo.about);
    this.linkedinExperiences.set(demo.experiences);
    this.targetRole.set('Développeur Frontend Angular');
    this.globalError.set('');
  }

  onOfferSelect(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const offerId = target.value;
    this.selectedOfferId.set(offerId);

    if (offerId) {
      const offer = this.availableOffers().find(o => o.id === offerId);
      if (offer) {
        this.targetRole.set(offer.title);
      }
    }
  }

  // Drag & drop / file selection
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

  onFileInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFile(input.files[0]);
    }
  }

  handleFile(file: File): void {
    this.fileError.set('');
    this.globalError.set('');

    const ext = file.name.split('.').pop()?.toLowerCase();
    const allowed = ['pdf', 'docx', 'txt'];

    if (!ext || !allowed.includes(ext)) {
      this.fileError.set('Ce format n\'est pas pris en charge. Utilisez un PDF, un DOCX ou un TXT.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      this.fileError.set('Ce fichier dépasse 5 Mo. Essayez avec une version plus légère.');
      return;
    }

    if (ext === 'txt') {
      const reader = new FileReader();
      reader.onload = () => {
        const content = (reader.result as string) || '';
        this.pastedCvText.set(content);
        this.uploadedFile.set(file);
        if (content.length < 300) {
          this.fileError.set('Votre CV est un peu court pour une analyse utile. Ajoutez quelques lignes.');
        }
      };
      reader.onerror = () => {
        this.fileError.set('Nous n\'arrivons pas à lire le texte de ce fichier. Essayez de coller le contenu de votre CV à la place.');
      };
      reader.readAsText(file);
    } else if (ext === 'pdf') {
      // PDF handling: attempt dynamic pdfjs-dist import, or show graceful fallback
      this.tryReadPdfOrFallback(file);
    } else if (ext === 'docx') {
      // DOCX handling: propose paste with clear guidance
      this.fileError.set('Extraction automatique de DOCX non prise en charge sur ce navigateur. Essayez de coller le texte directement dans l\'onglet "Coller mon CV".');
      this.cvInputMethod.set('paste');
    }
  }

  private tryReadPdfOrFallback(file: File): void {
    // Attempt dynamic import if available, else display user-friendly prompt
    try {
      // Dynamic import to avoid loading heavy pdf bundle initially
      import('pdfjs-dist' as string).then(
        () => {
          // If library is loaded, could parse pages
          this.fileError.set('Nous n\'arrivons pas à lire le texte de ce fichier. Essayez de coller le contenu de votre CV à la place.');
        },
        () => {
          this.fileError.set('Nous n\'arrivons pas à lire le texte de ce fichier. Essayez de coller le contenu de votre CV à la place.');
        }
      );
    } catch {
      this.fileError.set('Nous n\'arrivons pas à lire le texte de ce fichier. Essayez de coller le contenu de votre CV à la place.');
    }
  }

  removeUploadedFile(): void {
    this.uploadedFile.set(null);
    this.pastedCvText.set('');
    this.fileError.set('');
  }

  formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' octets';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' Ko';
    return (bytes / (1024 * 1024)).toFixed(1) + ' Mo';
  }

  // --- Step 2: Triggering Analysis ---
  startAnalysis(): void {
    this.globalError.set('');

    const isLinkedIn = this.docType() === 'linkedin';
    const textToCheck = isLinkedIn
      ? `${this.linkedinTitle()}\n${this.linkedinAbout()}\n${this.linkedinExperiences()}`
      : this.pastedCvText();

    // Check minimum length
    if (!isLinkedIn && textToCheck.trim().length < 300) {
      this.globalError.set('Votre CV est un peu court pour une analyse utile. Ajoutez quelques lignes.');
      return;
    }

    if (isLinkedIn && !this.linkedinAbout().trim() && !this.linkedinExperiences().trim()) {
      this.globalError.set('Ajoutez au moins la section À propos ou Expériences pour lancer l\'analyse.');
      return;
    }

    // Heuristic section check
    const lower = textToCheck.toLowerCase();
    const hasAnySection = lower.includes('expérience') || lower.includes('stage') ||
      lower.includes('formation') || lower.includes('compétence') ||
      lower.includes('projet') || lower.includes('études') ||
      lower.includes('diplôme') || lower.includes('profil') || isLinkedIn;

    if (!hasAnySection) {
      this.globalError.set('Nous n\'avons pas reconnu de sections. Ajoutez des titres comme Expériences ou Formation.');
      return;
    }

    // Switch to Step 2 (waiting screen)
    this.currentStep.set(2);
    this.analysisProgressStep.set(0);

    // Sequence progress checks
    setTimeout(() => {
      this.analysisProgressStep.set(1); // Lecture de votre document
    }, 800);

    setTimeout(() => {
      this.analysisProgressStep.set(2); // Repérage des sections
    }, 1800);

    setTimeout(() => {
      this.analysisProgressStep.set(3); // Évaluation et recommandations
    }, 2800);

    setTimeout(() => {
      // Execute analysis
      const selectedOffer = this.availableOffers().find(o => o.id === this.selectedOfferId());
      this.cvAnalysisService.analyzeCv({
        type: this.docType(),
        rawText: this.pastedCvText(),
        linkedin: isLinkedIn ? {
          title: this.linkedinTitle(),
          about: this.linkedinAbout(),
          experiences: this.linkedinExperiences()
        } : undefined,
        targetRole: this.targetRole(),
        targetOfferTitle: selectedOffer?.title,
        targetOfferSkills: selectedOffer?.skills
      }).subscribe(result => {
        this.analysisResult.set(result);
        this.currentTone.set(result.tone);

        if (isLinkedIn && result.correctedContent.linkedin) {
          this.editableLinkedInTitle.set(result.correctedContent.linkedin.title);
          this.editableLinkedInAbout.set(result.correctedContent.linkedin.about);
          this.editableLinkedInExperiences.set(result.correctedContent.linkedin.experiences);
        } else if (result.correctedContent.rawText) {
          this.editableProposedText.set(result.correctedContent.rawText);
        }

        // Advance to Step 3
        this.currentStep.set(3);
      });
    }, 3400);
  }

  // --- Step 3 Interactions ---
  toggleRecommendation(rec: CvRecommendation): void {
    const res = this.analysisResult();
    if (!res) return;

    const updatedRecs = res.recommendations.map(r => {
      if (r.id === rec.id) {
        return { ...r, applied: !r.applied };
      }
      return r;
    });

    const updated = this.cvAnalysisService.updateCorrectedVersion(res, this.currentTone(), updatedRecs);
    this.analysisResult.set(updated);

    if (this.docType() === 'linkedin' && updated.correctedContent.linkedin) {
      this.editableLinkedInTitle.set(updated.correctedContent.linkedin.title);
      this.editableLinkedInAbout.set(updated.correctedContent.linkedin.about);
      this.editableLinkedInExperiences.set(updated.correctedContent.linkedin.experiences);
    } else if (updated.correctedContent.rawText) {
      this.editableProposedText.set(updated.correctedContent.rawText);
    }
  }

  goToStep(step: 1 | 2 | 3 | 4): void {
    this.currentStep.set(step);
  }

  // --- Step 4 Interactions ---
  setTone(tone: 'sobre' | 'dynamique'): void {
    if (this.currentTone() === tone) return;
    this.currentTone.set(tone);

    const res = this.analysisResult();
    if (!res) return;

    const updated = this.cvAnalysisService.updateCorrectedVersion(res, tone, res.recommendations);
    this.analysisResult.set(updated);

    if (this.docType() === 'linkedin' && updated.correctedContent.linkedin) {
      this.editableLinkedInTitle.set(updated.correctedContent.linkedin.title);
      this.editableLinkedInAbout.set(updated.correctedContent.linkedin.about);
      this.editableLinkedInExperiences.set(updated.correctedContent.linkedin.experiences);
    } else if (updated.correctedContent.rawText) {
      this.editableProposedText.set(updated.correctedContent.rawText);
    }
  }

  copyProposedText(): void {
    let textToCopy = '';
    if (this.docType() === 'linkedin') {
      textToCopy = `TITRE LINKEDIN :\n${this.editableLinkedInTitle()}\n\nÀ PROPOS :\n${this.editableLinkedInAbout()}\n\nEXPÉRIENCES :\n${this.editableLinkedInExperiences()}`;
    } else {
      textToCopy = this.editableProposedText();
    }

    navigator.clipboard.writeText(textToCopy).then(() => {
      this.copySuccess.set(true);
      setTimeout(() => this.copySuccess.set(false), 2500);
    });
  }

  copyLinkedInSection(section: 'title' | 'about' | 'experiences'): void {
    let text = '';
    if (section === 'title') text = this.editableLinkedInTitle();
    else if (section === 'about') text = this.editableLinkedInAbout();
    else if (section === 'experiences') text = this.editableLinkedInExperiences();

    navigator.clipboard.writeText(text).then(() => {
      this.copySuccess.set(true);
      setTimeout(() => this.copySuccess.set(false), 2000);
    });
  }

  downloadTxt(): void {
    let content = '';
    let filename = 'mon-cv-ameliore.txt';

    if (this.docType() === 'linkedin') {
      content = `PROFIL LINKEDIN AMÉLIORÉ — INTERVIA\nDate : ${new Date().toLocaleDateString('fr-FR')}\n\n=== TITRE ===\n${this.editableLinkedInTitle()}\n\n=== À PROPOS ===\n${this.editableLinkedInAbout()}\n\n=== EXPÉRIENCES ===\n${this.editableLinkedInExperiences()}\n\n---\nProposition générée par une analyse simulée : relisez chaque ligne avant de l'utiliser.`;
      filename = 'mon-profil-linkedin.txt';
    } else {
      content = `${this.editableProposedText()}\n\n---\nProposition générée par une analyse simulée : relisez chaque ligne avant de l'utiliser.`;
    }

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  printPdf(): void {
    window.print();
  }

  saveToMyAnalyses(): void {
    const res = this.analysisResult();
    if (!res) return;

    // Update with latest manual edits before saving
    const toSave: CvAnalysisResult = {
      ...res,
      tone: this.currentTone(),
      correctedContent: {
        rawText: this.docType() === 'cv' ? this.editableProposedText() : undefined,
        linkedin: this.docType() === 'linkedin' ? {
          title: this.editableLinkedInTitle(),
          about: this.editableLinkedInAbout(),
          experiences: this.editableLinkedInExperiences()
        } : undefined,
        missingPlaceholders: this.missingPlaceholders()
      }
    };

    this.cvAnalysisService.saveAnalysis(toSave);
    this.saveSuccess.set(true);
    setTimeout(() => this.saveSuccess.set(false), 2500);
  }

  loadSavedAnalysis(analysis: CvAnalysisResult): void {
    this.analysisResult.set(analysis);
    this.docType.set(analysis.type);
    this.currentTone.set(analysis.tone);

    if (analysis.type === 'linkedin' && analysis.correctedContent.linkedin) {
      this.editableLinkedInTitle.set(analysis.correctedContent.linkedin.title);
      this.editableLinkedInAbout.set(analysis.correctedContent.linkedin.about);
      this.editableLinkedInExperiences.set(analysis.correctedContent.linkedin.experiences);
      if (analysis.originalContent.linkedin) {
        this.linkedinTitle.set(analysis.originalContent.linkedin.title);
        this.linkedinAbout.set(analysis.originalContent.linkedin.about);
        this.linkedinExperiences.set(analysis.originalContent.linkedin.experiences);
      }
    } else if (analysis.correctedContent.rawText) {
      this.editableProposedText.set(analysis.correctedContent.rawText);
      if (analysis.originalContent.rawText) {
        this.pastedCvText.set(analysis.originalContent.rawText);
      }
    }

    this.showSavedDrawer.set(false);
    this.currentStep.set(3);
  }

  deleteSavedAnalysis(id: string, event: Event): void {
    event.stopPropagation();
    this.cvAnalysisService.deleteAnalysis(id);
  }

  restartWizard(): void {
    this.currentStep.set(1);
    this.analysisResult.set(null);
    this.pastedCvText.set('');
    this.uploadedFile.set(null);
    this.linkedinTitle.set('');
    this.linkedinAbout.set('');
    this.linkedinExperiences.set('');
    this.fileError.set('');
    this.globalError.set('');
  }
}
