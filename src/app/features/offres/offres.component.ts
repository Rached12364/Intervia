import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { OffersService } from '../../core/services/offers.service';
import { ResultsService } from '../../core/services/results.service';
import { AuthService } from '../../core/services/auth.service';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { BtnComponent } from '../../shared/components/btn/btn.component';
import { ScoreBadgeComponent } from '../../shared/components/score-badge/score-badge.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { JobOffer } from '../../core/models/offer.model';

@Component({
  selector: 'app-offres',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    NavbarComponent,
    BtnComponent,
    ScoreBadgeComponent,
    IconComponent
  ],
  templateUrl: './offres.component.html',
  styleUrl: './offres.component.scss'
})
export class OffresComponent implements OnInit {
  private offersService = inject(OffersService);
  private resultsService = inject(ResultsService);
  private authService = inject(AuthService);

  allOffers = signal<JobOffer[]>([]);
  candidateScore = signal<number>(88);
  loading = signal<boolean>(true);

  // Filters
  filterDomain = signal<string>('all');
  filterType = signal<string>('all');
  filterContract = signal<string>('all');
  filterScoreMax = signal<number>(100);

  // Application state
  appliedOfferIds = signal<Set<string>>(new Set());
  applyingId = signal<string | null>(null);
  feedbackMessage = signal<string | null>(null);

  filteredOffers = computed(() => {
    return this.allOffers().filter(offer => {
      if (this.filterDomain() !== 'all' && offer.domain !== this.filterDomain()) return false;
      if (this.filterType() !== 'all' && offer.type !== this.filterType()) return false;
      if (this.filterContract() !== 'all' && offer.contract !== this.filterContract()) return false;
      if (offer.requiredScore > this.filterScoreMax()) return false;
      return true;
    });
  });

  ngOnInit(): void {
    // Preselect candidate profile type if set
    const user = this.authService.user();
    if (user?.profileType) {
      this.filterType.set(user.profileType);
    }

    this.resultsService.getUserResults().subscribe(results => {
      if (results.length > 0) {
        this.candidateScore.set(results[0].globalScore);
      }
    });

    this.offersService.getOffers().subscribe(offers => {
      this.allOffers.set(offers);
      this.loading.set(false);
    });
  }

  apply(offer: JobOffer): void {
    if (this.candidateScore() < offer.requiredScore) return;

    this.applyingId.set(offer.id);
    this.offersService.applyToOffer(offer.id).subscribe(res => {
      this.applyingId.set(null);
      const updated = new Set(this.appliedOfferIds());
      updated.add(offer.id);
      this.appliedOfferIds.set(updated);
      this.feedbackMessage.set(res.message);

      setTimeout(() => {
        this.feedbackMessage.set(null);
      }, 5000);
    });
  }

  resetFilters(): void {
    this.filterDomain.set('all');
    this.filterType.set('all');
    this.filterContract.set('all');
    this.filterScoreMax.set(100);
  }
}
