import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="main-layout">
      <app-navbar></app-navbar>
      <main class="main-layout__content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {}
