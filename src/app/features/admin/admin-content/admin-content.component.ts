import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AdminService, AdminContentItem } from '../../../core/services/admin.service';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { BtnComponent } from '../../../shared/components/btn/btn.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-admin-content',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    BtnComponent,
    IconComponent
  ],
  templateUrl: './admin-content.component.html',
  styleUrl: '../admin-dashboard/admin-dashboard.component.scss'
})
export class AdminContentComponent implements OnInit {
  private adminService = inject(AdminService);

  contentItems = signal<AdminContentItem[]>([]);
  feedbackMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.adminService.getContentItems().subscribe(items => {
      this.contentItems.set(items);
    });
  }

  approve(item: AdminContentItem): void {
    this.adminService.updateContentStatus(item.id, 'valide').subscribe(() => {
      const updated = this.contentItems().map(i => i.id === item.id ? { ...i, status: 'valide' as const } : i);
      this.contentItems.set(updated);
      this.feedbackMessage.set(`L'élément "${item.title}" a été validé et publié.`);
      setTimeout(() => this.feedbackMessage.set(null), 3500);
    });
  }

  reject(item: AdminContentItem): void {
    this.adminService.updateContentStatus(item.id, 'rejete').subscribe(() => {
      const updated = this.contentItems().map(i => i.id === item.id ? { ...i, status: 'rejete' as const } : i);
      this.contentItems.set(updated);
      this.feedbackMessage.set(`L'élément "${item.title}" a été rejeté.`);
      setTimeout(() => this.feedbackMessage.set(null), 3500);
    });
  }
}
