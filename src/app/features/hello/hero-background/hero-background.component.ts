import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  signal,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../shared/components/icon/icon.component';
import { FloatingSymbolsComponent } from '../../../shared/components/floating-symbols/floating-symbols.component';

@Component({
  selector: 'app-hero-background',
  standalone: true,
  imports: [CommonModule, IconComponent, FloatingSymbolsComponent],
  templateUrl: './hero-background.component.html',
  styleUrl: './hero-background.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroBackgroundComponent implements OnInit, OnDestroy {
  @Input() stressLevel = 8;
  @Input() reducedMotion = false;
  @Input() isPlaying = true;
  @Input() isBreathingActive = false;
  @Output() togglePlay = new EventEmitter<void>();

  @ViewChild('videoEl') videoElement?: ElementRef<HTMLVideoElement>;

  videoAvailable = signal<boolean>(false);
  videoErrorOccurred = signal<boolean>(false);

  ngOnInit(): void {
    // Vérifier les contraintes de performance & accessibilité
    const isNarrow = typeof window !== 'undefined' && window.innerWidth < 768;
    const isSaveData = typeof navigator !== 'undefined' && (navigator as any).connection?.saveData === true;
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isNarrow || isSaveData || prefersReducedMotion) {
      this.isPlaying = false;
    }
  }

  ngOnDestroy(): void {
    // Nettoyage éventuel
  }

  onVideoCanPlay(): void {
    this.videoAvailable.set(true);
    this.videoErrorOccurred.set(false);
  }

  onVideoError(): void {
    // Repli immédiat et transparent sur le maillage CSS animé
    this.videoAvailable.set(false);
    this.videoErrorOccurred.set(true);
  }

  onToggle(): void {
    this.togglePlay.emit();
    if (this.videoElement?.nativeElement) {
      const vid = this.videoElement.nativeElement;
      if (this.isPlaying) {
        vid.pause();
      } else {
        vid.play().catch(() => {});
      }
    }
  }
}
