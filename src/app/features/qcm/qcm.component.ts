import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { QcmService, QcmCategory } from '../../core/services/qcm.service';
import { PreparationService } from '../../core/services/preparation.service';
import { FocusLayoutComponent } from '../../shared/layouts/focus-layout/focus-layout.component';
import { BtnComponent } from '../../shared/components/btn/btn.component';
import { TimerComponent } from '../../shared/components/timer/timer.component';
import { ScoreBadgeComponent } from '../../shared/components/score-badge/score-badge.component';
import { QcmQuestion, QcmOption } from '../../core/models/question.model';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-qcm',
  standalone: true,
  imports: [
    CommonModule,
    FocusLayoutComponent,
    BtnComponent,
    TimerComponent,
    ScoreBadgeComponent,
    IconComponent
  ],
  templateUrl: './qcm.component.html',
  styleUrl: './qcm.component.scss'
})
export class QcmComponent implements OnInit {
  private qcmService = inject(QcmService);
  private prepService = inject(PreparationService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // Preparation integration
  prepPlanId = signal<string | null>(null);

  // States: 'category-select' | 'quiz' | 'summary'
  state = signal<'category-select' | 'quiz' | 'summary'>('category-select');
  categories = signal<QcmCategory[]>([]);
  selectedCategory = signal<QcmCategory | null>(null);

  questions = signal<QcmQuestion[]>([]);
  currentIndex = signal(0);
  selectedOptionId = signal<string | null>(null);
  timerResetKey = signal(0);

  // Map of questionId -> selectedOptionId
  userAnswers: Record<string, string> = {};
  scorePercentage = signal(0);
  badgeLevel = signal<'or' | 'argent' | 'bronze' | 'none'>('none');

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const prepId = params['prep'];
      if (prepId) {
        this.prepPlanId.set(prepId);
        const plan = this.prepService.getPreparationById(prepId);
        if (plan && plan.qcmModule?.questions?.length > 0) {
          this.selectedCategory.set({
            id: 'prep-custom',
            name: `Validation ${plan.offerTitle} (${plan.companyName})`,
            icon: 'auto_awesome',
            count: plan.qcmModule.questions.length,
            description: plan.qcmModule.description
          });
          this.questions.set(plan.qcmModule.questions);
          this.currentIndex.set(0);
          this.userAnswers = {};
          this.state.set('quiz');
          return;
        }
      }

      this.qcmService.getCategories().subscribe(cats => {
        this.categories.set(cats);
      });
    });
  }

  selectCategory(cat: QcmCategory): void {
    this.selectedCategory.set(cat);
    this.qcmService.getQuestions(cat.id).subscribe(qs => {
      this.questions.set(qs);
      this.currentIndex.set(0);
      this.userAnswers = {};
      this.state.set('quiz');
    });
  }

  selectOption(optionId: string): void {
    this.selectedOptionId.set(optionId);
  }

  confirmAnswer(): void {
    const currentQ = this.questions()[this.currentIndex()];
    if (currentQ && this.selectedOptionId()) {
      this.userAnswers[currentQ.id] = this.selectedOptionId()!;
    }

    if (this.currentIndex() < this.questions().length - 1) {
      this.currentIndex.set(this.currentIndex() + 1);
      this.selectedOptionId.set(null);
      this.timerResetKey.set(this.timerResetKey() + 1);
    } else {
      this.calculateResults();
    }
  }

  private calculateResults(): void {
    let correct = 0;
    const total = this.questions().length;

    this.questions().forEach(q => {
      const selectedId = this.userAnswers[q.id];
      const correctOption = q.options.find(o => o.isCorrect);
      if (selectedId && correctOption && selectedId === correctOption.id) {
        correct++;
      }
    });

    const score = Math.round((correct / total) * 100);
    this.scorePercentage.set(score);

    if (score >= 85) this.badgeLevel.set('or');
    else if (score >= 70) this.badgeLevel.set('argent');
    else if (score >= 50) this.badgeLevel.set('bronze');
    else this.badgeLevel.set('none');

    // If part of a preparation plan, update module score
    const pId = this.prepPlanId();
    if (pId) {
      this.prepService.updateModuleScore(pId, 'qcm', score);
    }

    this.state.set('summary');
  }

  isAnswerCorrect(q: QcmQuestion): boolean {
    const selectedId = this.userAnswers[q.id];
    const correctOpt = q.options.find(o => o.isCorrect);
    return !!(selectedId && correctOpt && selectedId === correctOpt.id);
  }

  getCorrectOptionText(q: QcmQuestion): string {
    const correctOpt = q.options.find(o => o.isCorrect);
    return correctOpt ? correctOpt.text : '';
  }

  resetQuiz(): void {
    if (this.prepPlanId()) {
      this.currentIndex.set(0);
      this.userAnswers = {};
      this.state.set('quiz');
    } else {
      this.state.set('category-select');
      this.selectedOptionId.set(null);
    }
  }

  quit(): void {
    const pId = this.prepPlanId();
    if (pId) {
      this.router.navigate(['/preparation'], { queryParams: { planId: pId } });
    } else {
      this.router.navigate(['/dashboard']);
    }
  }
}
