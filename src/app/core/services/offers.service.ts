import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { JobOffer } from '../models/offer.model';

const MOCK_OFFERS: JobOffer[] = [
  {
    id: 'off-1',
    title: 'Développeur Fullstack Angular / Node.js Senior',
    company: 'TechVision Tunis',
    location: 'Tunis (Hybride)',
    domain: 'Développement Web',
    type: 'emploi',
    contract: 'CDI',
    requiredScore: 80,
    description: 'Nous recherchons un ingénieur Angular passionné par les bonnes pratiques et la performance web pour intégrer notre équipe produit.',
    skills: ['Angular 17', 'TypeScript', 'RxJS', 'Node.js', 'SCSS'],
    salary: '3 500 - 4 500 TND / mois',
    postedAt: new Date('2026-10-01')
  },
  {
    id: 'off-2',
    title: 'Ingénieur Frontend Angular Junior',
    company: 'InnovApp Sousse',
    location: 'Sousse',
    domain: 'Développement Web',
    type: 'emploi',
    contract: 'CDI',
    requiredScore: 70,
    description: 'Participez à la refonte de nos portails clients SaaS. Un accompagnement senior vous aidera à monter en compétences.',
    skills: ['Angular', 'HTML/SCSS', 'Git', 'REST API'],
    salary: '2 000 - 2 600 TND / mois',
    postedAt: new Date('2026-10-05')
  },
  {
    id: 'off-3',
    title: 'Stage PFE - Développeur UI/UX & Angular',
    company: 'SoftLabs Ariana',
    location: 'Ariana',
    domain: 'Développement Web',
    type: 'stage',
    contract: 'Stage',
    requiredScore: 65,
    description: 'Sujet de PFE : Conception et réalisation d\'une plateforme de micro-learning réactive.',
    skills: ['Angular', 'Figma', 'TypeScript'],
    salary: '800 TND / mois',
    postedAt: new Date('2026-10-07')
  }
];

@Injectable({ providedIn: 'root' })
export class OffersService {
  getOffers(): Observable<JobOffer[]> {
    return of(MOCK_OFFERS).pipe(delay(400));
  }

  applyToOffer(offerId: string): Observable<{ success: boolean; message: string }> {
    return of({
      success: true,
      message: 'Votre candidature accompagnée de vos résultats de simulation IntervIA a été transmise à l\'équipe recrutement !'
    }).pipe(delay(700));
  }
}
