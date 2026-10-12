import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

export interface StepDef {
  label: string;
  icon?: string;
}

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [CommonModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="stepper" role="navigation" aria-label="Étapes du formulaire">
      @for (step of steps; track step.label; let i = $index) {
        <div class="stepper__step"
             [class.stepper__step--completed]="i < currentStep"
             [class.stepper__step--active]="i === currentStep"
             [class.stepper__step--pending]="i > currentStep">
          <div class="stepper__indicator">
            @if (i < currentStep) {
              <app-icon name="check" aria-hidden="true" />
            } @else {
              <span>{{ i + 1 }}</span>
            }
          </div>
          <span class="stepper__label">{{ step.label }}</span>
        </div>
        @if (i < steps.length - 1) {
          <div class="stepper__connector" [class.stepper__connector--active]="i < currentStep"></div>
        }
      }
    </div>
  `,
  styleUrl: './stepper.component.scss'
})
export class StepperComponent {
  @Input() steps: StepDef[] = [];
  @Input() currentStep = 0;
}
