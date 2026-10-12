import { Component, Input, ChangeDetectionStrategy, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-score-badge',
  standalone: true,
  imports: [CommonModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="badge" [class]="'badge badge--' + level">
      <app-icon [name]="badgeIcon" class="badge__icon" aria-hidden="true" />
      <span class="badge__score">{{ score }}</span>
      <span class="badge__label">{{ badgeLabel }}</span>
    </div>
  `,
  styleUrl: './score-badge.component.scss'
})
export class ScoreBadgeComponent {
  @Input() score = 0;
  @Input() level: 'bronze' | 'argent' | 'or' | 'none' = 'none';

  get badgeIcon(): string {
    switch (this.level) {
      case 'or': return 'emoji_events';
      case 'argent': return 'workspace_premium';
      case 'bronze': return 'military_tech';
      default: return 'stars';
    }
  }

  get badgeLabel(): string {
    switch (this.level) {
      case 'or': return 'Or';
      case 'argent': return 'Argent';
      case 'bronze': return 'Bronze';
      default: return 'Score';
    }
  }
}
