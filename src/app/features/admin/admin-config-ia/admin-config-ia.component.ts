import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AdminService, AdminAiConfig } from '../../../core/services/admin.service';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { BtnComponent } from '../../../shared/components/btn/btn.component';
import { FormFieldComponent } from '../../../shared/components/form-field/form-field.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-admin-config-ia',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    BtnComponent,
    FormFieldComponent,
    IconComponent
  ],
  templateUrl: './admin-config-ia.component.html',
  styleUrl: '../admin-dashboard/admin-dashboard.component.scss'
})
export class AdminConfigIaComponent implements OnInit {
  private adminService = inject(AdminService);
  private fb = inject(FormBuilder);

  configForm!: FormGroup;
  feedbackMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.configForm = this.fb.group({
      goldThreshold: [85],
      silverThreshold: [70],
      bronzeThreshold: [50],
      clarityWeight: [30],
      stressWeight: [20],
      postureWeight: [20],
      technicalWeight: [30],
      aiFeedbackModel: ['Gemini 1.5 Pro Recruiter v2']
    });

    this.adminService.getAiConfig().subscribe(cfg => {
      this.configForm.patchValue(cfg);
    });
  }

  saveConfig(): void {
    this.adminService.updateAiConfig(this.configForm.value).subscribe(() => {
      this.feedbackMessage.set('Paramètres de scoring IA mis à jour avec succès !');
      setTimeout(() => this.feedbackMessage.set(null), 3500);
    });
  }
}
