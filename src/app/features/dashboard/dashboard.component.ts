import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { SimulationService } from '../../core/services/simulation.service';
import { OffersService } from '../../core/services/offers.service';
import { ResultsService } from '../../core/services/results.service';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { ScoreBadgeComponent } from '../../shared/components/score-badge/score-badge.component';
import { BtnComponent } from '../../shared/components/btn/btn.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { Simulation } from '../../core/models/simulation.model';
import { JobOffer } from '../../core/models/offer.model';
import { SimulationResult } from '../../core/models/result.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NavbarComponent,
    ScoreBadgeComponent,
    BtnComponent,
    IconComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  authService = inject(AuthService);
  private simService = inject(SimulationService);
  private offersService = inject(OffersService);
  private resultsService = inject(ResultsService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  userName = this.authService.userName;
  featuredSim = signal<Simulation | null>(null);
  recommendedOffers = signal<JobOffer[]>([]);
  latestResult = signal<SimulationResult | null>(null);
  averageGlobalScore = signal<number>(0);
  clarityScore = signal<number>(0);
  loading = signal(true);
  adminWarning = signal<boolean>(false);

  ngOnInit(): void {
    if (this.route.snapshot.queryParamMap.get('error') === 'unauthorized_admin') {
      this.adminWarning.set(true);
    }
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    this.simService.getSimulations().subscribe(sims => {
      this.featuredSim.set(sims[0] || null);
    });

    const userProfileType = this.authService.user()?.profileType;
    this.offersService.getOffers().subscribe(offers => {
      const filtered = userProfileType
        ? offers.filter(o => o.type === userProfileType)
        : offers;
      this.recommendedOffers.set(filtered.length > 0 ? filtered.slice(0, 3) : offers.slice(0, 3));
    });

    this.resultsService.getUserResults().subscribe(results => {
      if (results && results.length > 0) {
        this.latestResult.set(results[0]);
        const sum = results.reduce((acc, r) => acc + r.globalScore, 0);
        this.averageGlobalScore.set(Math.round(sum / results.length));
        const clarity = results[0].scores?.find(s => s.label.toLowerCase().includes('clarté'))?.score ||
                        results[0].aiAnalysis?.clarte?.score || 0;
        this.clarityScore.set(clarity);
      }
      this.loading.set(false);
    });
  }

  startSimulation(): void {
    this.router.navigate(['/simulation-rh']);
  }
}
