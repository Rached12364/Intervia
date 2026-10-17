import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ResultsService } from '../../core/services/results.service';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { ScoreBadgeComponent } from '../../shared/components/score-badge/score-badge.component';
import { BtnComponent } from '../../shared/components/btn/btn.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { IaAvatarComponent } from '../../shared/components/ia-avatar/ia-avatar.component';
import { SimulationResult } from '../../core/models/result.model';

@Component({
  selector: 'app-resultats',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NavbarComponent,
    ScoreBadgeComponent,
    BtnComponent,
    IconComponent,
    IaAvatarComponent
  ],
  templateUrl: './resultats.component.html',
  styleUrl: './resultats.component.scss'
})
export class ResultatsComponent implements OnInit {
  private resultsService = inject(ResultsService);
  private router = inject(Router);

  currentResult = signal<SimulationResult | null>(null);
  allResults = signal<SimulationResult[]>([]);
  loading = signal(true);

  ngOnInit(): void {
    this.loadResults();
  }

  loadResults(): void {
    this.resultsService.getUserResults().subscribe(results => {
      this.allResults.set(results);
      // Requirement 4: display the last submitted simulation result if present, otherwise first historical result
      const last = this.resultsService.lastResult();
      if (last) {
        this.currentResult.set(last);
      } else if (results.length > 0) {
        this.currentResult.set(results[0]);
      }
      this.loading.set(false);
    });
  }

  selectResult(res: SimulationResult): void {
    this.currentResult.set(res);
  }

  retrySimulation(): void {
    this.router.navigate(['/simulation-rh']);
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
