import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="timer" [class.timer--warning]="remainingSeconds <= warningThreshold" [class.timer--danger]="remainingSeconds <= dangerThreshold">
      <app-icon name="timer" class="timer__icon" aria-hidden="true" />
      <span class="timer__value">{{ displayTime }}</span>
    </div>
  `,
  styleUrl: './timer.component.scss'
})
export class TimerComponent implements OnInit, OnDestroy, OnChanges {
  @Input() seconds = 60;
  @Input() resetKey: number | string = 0;
  @Input() autoStart = true;
  @Input() warningThreshold = 30;
  @Input() dangerThreshold = 10;
  @Output() onTimeout = new EventEmitter<void>();
  @Output() onTick = new EventEmitter<number>();

  remainingSeconds = 0;
  private intervalId: any;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.remainingSeconds = this.seconds;
    if (this.autoStart) {
      this.start();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const secondsChanged = changes['seconds'] && !changes['seconds'].isFirstChange();
    const resetKeyChanged = changes['resetKey'] && !changes['resetKey'].isFirstChange();

    if (secondsChanged || resetKeyChanged) {
      this.stop();
      this.remainingSeconds = this.seconds;
      this.cdr.markForCheck();
      if (this.autoStart) {
        this.start();
      }
    }
  }

  ngOnDestroy(): void {
    this.stop();
  }

  start(): void {
    this.intervalId = setInterval(() => {
      this.remainingSeconds--;
      this.onTick.emit(this.remainingSeconds);
      this.cdr.markForCheck();

      if (this.remainingSeconds <= 0) {
        this.stop();
        this.onTimeout.emit();
      }
    }, 1000);
  }

  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  reset(): void {
    this.stop();
    this.remainingSeconds = this.seconds;
    this.cdr.markForCheck();
  }

  get displayTime(): string {
    const min = Math.floor(this.remainingSeconds / 60);
    const sec = this.remainingSeconds % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  }
}
