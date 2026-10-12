import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BtnComponent } from '../../components/btn/btn.component';
import { ProgressBarComponent } from '../../components/progress-bar/progress-bar.component';

@Component({
  selector: 'app-focus-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, BtnComponent, ProgressBarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="focus-layout">
      <header class="focus-layout__header">
        <div class="focus-layout__left">
          <span class="focus-layout__logo">IntervIA</span>
          <span class="focus-layout__divider"></span>
          <span class="focus-layout__title">{{ title }}</span>
        </div>
        <div class="focus-layout__center">
          @if (showProgress) {
            <app-progress-bar
              [current]="progressCurrent"
              [total]="progressTotal">
            </app-progress-bar>
          }
        </div>
        <div class="focus-layout__right">
          <app-btn variant="ghost" size="sm" icon="close" (onClick)="onQuit.emit()">
            Quitter
          </app-btn>
        </div>
      </header>
      <main class="focus-layout__content">
        <ng-content></ng-content>
      </main>
    </div>
  `,
  styleUrl: './focus-layout.component.scss'
})
export class FocusLayoutComponent {
  @Input() title = '';
  @Input() showProgress = false;
  @Input() progressCurrent = 0;
  @Input() progressTotal = 1;
  @Output() onQuit = new EventEmitter<void>();
}
