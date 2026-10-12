import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AdminService, AdminUser } from '../../../core/services/admin.service';
import { BtnComponent } from '../../../shared/components/btn/btn.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    BtnComponent,
    IconComponent
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  private adminService = inject(AdminService);

  usersCount = signal(148);
  activeSimulationsCount = signal(32);
  averageGlobalScore = signal(81);
  validatedCandidatesCount = signal(96);

  recentUsers = signal<AdminUser[]>([]);

  ngOnInit(): void {
    this.adminService.getUsers().subscribe(users => {
      this.recentUsers.set(users.slice(0, 4));
    });
  }
}
