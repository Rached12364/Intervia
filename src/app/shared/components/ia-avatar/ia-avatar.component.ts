import { Component, Input, ChangeDetectionStrategy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type IaAvatarState = 'idle' | 'speaking' | 'listening' | 'thinking' | 'au repos' | 'parle' | 'écoute' | 'réfléchit';
export type IaAvatarSize = 's' | 'm' | 'l';

@Component({
  selector: 'app-ia-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ia-avatar.component.html',
  styleUrl: './ia-avatar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IaAvatarComponent {
  @Input() state: IaAvatarState = 'idle';
  @Input() size: IaAvatarSize = 'm';
  @Input() decorative = true;

  // Normalisation de l'état pour les classes CSS
  readonly normalizedState = computed(() => {
    const s = this.state;
    if (s === 'parle' || s === 'speaking') return 'speaking';
    if (s === 'écoute' || s === 'listening') return 'listening';
    if (s === 'réfléchit' || s === 'thinking') return 'thinking';
    return 'idle';
  });

  // Label accessible pour lecteurs d'écran si non décoratif
  readonly accessibleStateLabel = computed(() => {
    switch (this.normalizedState()) {
      case 'speaking':
        return 'Recruteuse IA en train de parler';
      case 'listening':
        return 'Recruteuse IA attentive à votre réponse';
      case 'thinking':
        return 'Recruteuse IA en cours de réflexion et d\'analyse';
      default:
        return 'Recruteuse IA';
    }
  });
}
