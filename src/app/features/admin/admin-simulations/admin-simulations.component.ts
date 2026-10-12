import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SimulationService } from '../../../core/services/simulation.service';
import { Simulation } from '../../../core/models/simulation.model';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { BtnComponent } from '../../../shared/components/btn/btn.component';
import { IconComponent } from '../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-admin-simulations',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    BtnComponent,
    IconComponent
  ],
  templateUrl: './admin-simulations.component.html',
  styleUrl: '../admin-dashboard/admin-dashboard.component.scss'
})
export class AdminSimulationsComponent implements OnInit {
  private simService = inject(SimulationService);

  simulations = signal<Simulation[]>([]);
  feedbackMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.simService.getSimulations().subscribe(sims => {
      this.simulations.set(sims);
    });
  }

  addSimulation(): void {
    const newSim: Simulation = {
      id: 'sim-' + Date.now(),
      title: 'Simulation Cybersécurité & Réseaux',
      description: 'Mise en situation gestion d\'incident et politique de sécurité.',
      totalQuestions: 4,
      estimatedDuration: 15,
      difficulty: 'intermediaire',
      status: 'a-faire'
    };
    this.simulations.set([...this.simulations(), newSim]);
    this.feedbackMessage.set('Nouvelle simulation ajoutée au catalogue !');
    setTimeout(() => this.feedbackMessage.set(null), 3000);
  }
}
