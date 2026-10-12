import { Component, ElementRef, inject, OnDestroy, OnInit, ViewChild, signal, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SimulationService } from '../../core/services/simulation.service';
import { PreparationService } from '../../core/services/preparation.service';
import { FocusLayoutComponent } from '../../shared/layouts/focus-layout/focus-layout.component';
import { BtnComponent } from '../../shared/components/btn/btn.component';
import { TimerComponent } from '../../shared/components/timer/timer.component';
import { SimulationQuestion } from '../../core/models/simulation.model';
import { IconComponent } from '../../shared/components/icon/icon.component';

@Component({
  selector: 'app-simulation-rh',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FocusLayoutComponent,
    BtnComponent,
    TimerComponent,
    IconComponent
  ],
  templateUrl: './simulation-rh.component.html',
  styleUrl: './simulation-rh.component.scss'
})
export class SimulationRhComponent implements OnInit, OnDestroy {
  private simService = inject(SimulationService);
  private prepService = inject(PreparationService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  prepPlanId = signal<string | null>(null);

  private _videoPreview?: ElementRef<HTMLVideoElement>;
  private _videoPlayer?: ElementRef<HTMLVideoElement>;

  @ViewChild('videoPreview') set videoPreview(el: ElementRef<HTMLVideoElement> | undefined) {
    this._videoPreview = el;
    if (el?.nativeElement && this.mediaStream) {
      el.nativeElement.srcObject = this.mediaStream;
    }
  }
  get videoPreview(): ElementRef<HTMLVideoElement> | undefined {
    return this._videoPreview;
  }

  @ViewChild('videoPlayer') set videoPlayer(el: ElementRef<HTMLVideoElement> | undefined) {
    this._videoPlayer = el;
    if (el?.nativeElement && this.mediaStream) {
      el.nativeElement.srcObject = this.mediaStream;
    }
  }
  get videoPlayer(): ElementRef<HTMLVideoElement> | undefined {
    return this._videoPlayer;
  }

  // Flow phase: 'check' | 'interview'
  phase = signal<'check' | 'interview'>('check');

  // Media status
  cameraGranted = signal(false);
  micGranted = signal(false);
  fallbackTextMode = signal(false);
  mediaStream: MediaStream | null = null;

  // Connectivity checks (simulated)
  connectionOk = signal(true);
  browserOk = signal(true);

  // Questions state
  questions = signal<SimulationQuestion[]>([]);
  currentIndex = signal(0);
  timerResetKey = signal(0);
  currentTextAnswer = '';
  submitting = signal(false);
  showTips = signal(false);

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const prepId = params['prep'];
      if (prepId) {
        this.prepPlanId.set(prepId);
        const plan = this.prepService.getPreparationById(prepId);
        if (plan && plan.rhModule?.questions?.length > 0) {
          this.questions.set(plan.rhModule.questions);
          this.requestMediaPermissions();
          this.checkBrowserAndConnection();
          return;
        }
      }

      this.simService.getQuestionsForSimulation('sim-1').subscribe(qs => {
        this.questions.set(qs);
      });
      this.requestMediaPermissions();
      this.checkBrowserAndConnection();
    });
  }

  ngOnDestroy(): void {
    this.stopMediaStream();
  }

  private checkBrowserAndConnection(): void {
    const ua = navigator.userAgent;
    this.browserOk.set(
      ua.includes('Chrome') || ua.includes('Firefox') || ua.includes('Safari') || ua.includes('Edge')
    );
    this.connectionOk.set(navigator.onLine);
  }

  requestMediaPermissions(): void {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          this.mediaStream = stream;
          this.cameraGranted.set(true);
          this.micGranted.set(true);
          if (this._videoPreview?.nativeElement) {
            this._videoPreview.nativeElement.srcObject = stream;
          }
        })
        .catch(() => {
          this.cameraGranted.set(false);
          this.micGranted.set(false);
        });
    } else {
      this.fallbackTextMode.set(true);
    }
  }

  enableTextMode(): void {
    this.fallbackTextMode.set(true);
    this.startInterview();
  }

  startInterview(): void {
    // If camera not granted, auto-switch to text mode
    if (!this.cameraGranted()) {
      this.fallbackTextMode.set(true);
    }
    this.phase.set('interview');
    if (!this.fallbackTextMode() && this.mediaStream && this._videoPlayer?.nativeElement) {
      this._videoPlayer.nativeElement.srcObject = this.mediaStream;
    }
  }

  toggleTips(): void {
    this.showTips.set(!this.showTips());
  }

  nextQuestion(): void {
    if (this.currentIndex() < this.questions().length - 1) {
      this.currentIndex.set(this.currentIndex() + 1);
      this.timerResetKey.set(this.timerResetKey() + 1);
      this.currentTextAnswer = '';
      this.showTips.set(false);
    } else {
      this.finishSimulation();
    }
  }

  finishSimulation(): void {
    this.submitting.set(true);
    this.simService.submitSimulation('sim-1', []).subscribe(res => {
      this.stopMediaStream();
      this.submitting.set(false);

      const pId = this.prepPlanId();
      if (pId) {
        this.prepService.updateModuleScore(pId, 'rh', res.globalScore);
        this.router.navigate(['/preparation'], { queryParams: { planId: pId } });
      } else {
        this.router.navigate(['/resultats']);
      }
    });
  }

  quitSimulation(): void {
    this.stopMediaStream();
    const pId = this.prepPlanId();
    if (pId) {
      this.router.navigate(['/preparation'], { queryParams: { planId: pId } });
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  private stopMediaStream(): void {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
      this.mediaStream = null;
    }
  }
}
