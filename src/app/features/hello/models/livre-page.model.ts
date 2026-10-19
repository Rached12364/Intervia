export interface LivrePageDefinition {
  pageNumber: number;
  hash: string;
  chapterNumber: number;
  chapterTitle: string;
  pageTitle: string;
  shortDesc: string;
  caseImage?: string;
  cartoucheHtml?: string;
  bulle?: string;
}

export const LIVRE_PAGES: LivrePageDefinition[] = [
  {
    pageNumber: 1,
    hash: '#/sas',
    chapterNumber: 0,
    chapterTitle: 'Sas d\'entrée',
    pageTitle: 'Sas de décompression',
    shortDesc: 'Respirez, puis entrez.',
  },
  {
    pageNumber: 2,
    hash: '#/chapitre-1/page-2',
    chapterNumber: 1,
    chapterTitle: 'L\'orage mental',
    pageTitle: 'Nuits de code',
    shortDesc: 'Candidature après candidature.',
    caseImage: 'assets/livre/case-1.jpg',
    cartoucheHtml: 'CANDIDATURE APRÈS <span class="accent-rose">CANDIDATURE</span>.',
    bulle: '« Combien de formulaires avant qu’on remarque mon profil ? »'
  },
  {
    pageNumber: 3,
    hash: '#/chapitre-1/page-3',
    chapterNumber: 1,
    chapterTitle: 'L\'orage mental',
    pageTitle: 'L\'espoir d\'un message',
    shortDesc: 'Enfin : un entretien.',
    caseImage: 'assets/livre/case-2.jpg',
    cartoucheHtml: 'ENFIN : UN <span class="accent-rose">ENTRETIEN</span>.',
    bulle: '« Entretien technique confirmé pour jeudi prochain. »'
  },
  {
    pageNumber: 4,
    hash: '#/chapitre-1/page-4',
    chapterNumber: 1,
    chapterTitle: 'L\'orage mental',
    pageTitle: 'La surcharge cognitive',
    shortDesc: 'Des pages, des notes… et aucun retour.',
    caseImage: 'assets/livre/case-3.jpg',
    cartoucheHtml: 'DES PAGES, DES NOTES… ET AUCUN <span class="accent-rose">RETOUR</span>.',
    bulle: '« Tout est là dans ma tête… mais comment l’expliquer clairement ? »'
  },
  {
    pageNumber: 5,
    hash: '#/chapitre-1/page-5',
    chapterNumber: 1,
    chapterTitle: 'L\'orage mental',
    pageTitle: 'Face aux recruteurs',
    shortDesc: 'Les mots s\'échappent.',
    caseImage: 'assets/livre/case-4.jpg',
    cartoucheHtml: 'LES <span class="accent-rose">MOTS</span> S\'ÉCHAPPENT.',
    bulle: '« Le silence s’installe. Je perds le fil de mes explications. »'
  },
  {
    pageNumber: 6,
    hash: '#/chapitre-1/page-6',
    chapterNumber: 1,
    chapterTitle: 'L\'orage mental',
    pageTitle: 'Le regard anxieux',
    shortDesc: 'Briser la paralysie face à l\'évaluation.',
    // Utilise le composant Page3RegardComponent avec polaroid et case-4-visage.jpg
  },
  {
    pageNumber: 7,
    hash: '#/chapitre-1/page-7',
    chapterNumber: 1,
    chapterTitle: 'L\'orage mental',
    pageTitle: 'La déception sous la pluie',
    shortDesc: '« Nous avons retenu un autre profil. »',
    caseImage: 'assets/livre/case-5.jpg',
    cartoucheHtml: '« NOUS AVONS RETENU UN AUTRE <span class="accent-rose">PROFIL</span>. »',
    bulle: '« Encore un refus… Mais je ne veux pas abandonner. »'
  },
  {
    pageNumber: 8,
    hash: '#/chapitre-2/page-8',
    chapterNumber: 2,
    chapterTitle: 'Du stress au calme',
    pageTitle: 'Le déclic',
    shortDesc: 'Et si on s\'entraînait avant ?',
    caseImage: 'assets/livre/case-6.jpg',
    cartoucheHtml: 'ET SI ON S\'<span class="accent-rose">ENTRAÎNAIT</span> AVANT ?',
    bulle: '« Une méthode guidée sans jugement pour reprendre confiance. »'
  },
  {
    pageNumber: 9,
    hash: '#/chapitre-2/page-9',
    chapterNumber: 2,
    chapterTitle: 'Du stress au calme',
    pageTitle: 'Le Dojo IA',
    shortDesc: 'Une question à la fois.',
    caseImage: 'assets/livre/case-7.jpg',
    cartoucheHtml: 'UNE <span class="accent-rose">QUESTION</span> À LA FOIS.',
    bulle: '« Le trac se dissout dès que la structure prend le relais. »'
  },
  {
    pageNumber: 10,
    hash: '#/chapitre-2/page-10',
    chapterNumber: 2,
    chapterTitle: 'Du stress au calme',
    pageTitle: 'L\'assurance retrouvée',
    shortDesc: 'Cette fois, les mots sont là.',
    caseImage: 'assets/livre/case-8.jpg',
    cartoucheHtml: 'CETTE FOIS, LES MOTS SONT <span class="accent-rose">LÀ</span>.',
    bulle: '« Je réponds avec fluidité, posément, sans aucune précipitation. »'
  },
  {
    pageNumber: 11,
    hash: '#/mode-emploi/1',
    chapterNumber: 3,
    chapterTitle: 'Mode d\'emploi',
    pageTitle: 'Coller l\'offre',
    shortDesc: '',
  },
  {
    pageNumber: 12,
    hash: '#/mode-emploi/2',
    chapterNumber: 3,
    chapterTitle: 'Mode d\'emploi',
    pageTitle: 'Le parcours sur mesure',
    shortDesc: '',
  },
  {
    pageNumber: 13,
    hash: '#/mode-emploi/3',
    chapterNumber: 3,
    chapterTitle: 'Mode d\'emploi',
    pageTitle: 'Une étape à la fois',
    shortDesc: '',
  },
  {
    pageNumber: 14,
    hash: '#/mode-emploi/4',
    chapterNumber: 3,
    chapterTitle: 'Mode d\'emploi',
    pageTitle: 'Un retour concret',
    shortDesc: '',
  },
  {
    pageNumber: 15,
    hash: '#/mode-emploi/5',
    chapterNumber: 3,
    chapterTitle: 'Mode d\'emploi',
    pageTitle: 'Le CV amélioré',
    shortDesc: '',
  },
  {
    pageNumber: 16,
    hash: '#/mode-emploi/6',
    chapterNumber: 3,
    chapterTitle: 'Mode d\'emploi',
    pageTitle: 'Le profil LinkedIn',
    shortDesc: '',
  },
  {
    pageNumber: 17,
    hash: '#/chapitre-3/page-11',
    chapterNumber: 4,
    chapterTitle: 'La restitution',
    pageTitle: 'Le triomphe de Mohamed',
    shortDesc: 'Votre potentiel, pas votre stress.',
    // Utilise Page11TriompheComponent avec case-9.jpg + badge d'or
  },
  {
    pageNumber: 18,
    hash: '#/chapitre-4/page-12',
    chapterNumber: 5,
    chapterTitle: 'L\'épilogue',
    pageTitle: 'Commencer ma préparation',
    shortDesc: 'Choix stage ou emploi et accès à l\'inscription.',
    // Utilise Page12AppelComponent
  },
];
