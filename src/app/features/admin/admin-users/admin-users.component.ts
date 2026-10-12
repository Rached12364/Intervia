import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AdminService, AdminUser } from '../../../core/services/admin.service';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { BtnComponent } from '../../../shared/components/btn/btn.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterLinkActive,
    BtnComponent,
    IconComponent
  ],
  templateUrl: './admin-users.component.html',
  styleUrl: '../admin-dashboard/admin-dashboard.component.scss'
})
export class AdminUsersComponent implements OnInit {
  private adminService = inject(AdminService);

  users = signal<AdminUser[]>([]);
  searchQuery = signal<string>('');
  currentPage = signal<number>(1);
  pageSize = 5;

  filteredUsers = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    if (!q) return this.users();
    return this.users().filter(u =>
      u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  });

  ngOnInit(): void {
    this.adminService.getUsers().subscribe(users => {
      this.users.set(users);
    });
  }

  toggleStatus(user: AdminUser): void {
    this.adminService.toggleUserStatus(user.id).subscribe(() => {
      const updated = this.users().map(u =>
        u.id === user.id ? { ...u, active: !u.active } : u
      );
      this.users.set(updated);
    });
  }
}
