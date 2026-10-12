import { TechQuestion } from '../models/question.model';

export const TECH_EXERCISES_BANK: Record<string, Record<'debutant' | 'intermediaire' | 'avance', TechQuestion>> = {
  'JavaScript': {
    'debutant': {
      id: 'tech-js-deb',
      title: 'Filtrer et formater des candidats',
      description: `Écrivez une fonction \`filtrerEtatsCandidats(candidats, scoreSeuil)\` qui prend en entrée une liste d'objets candidats (avec \`nom\` et \`score\`) et un seuil numérique. La fonction doit retourner un tableau contenant uniquement les noms des candidats ayant un score supérieur ou égal au seuil, triés par ordre alphabétique.`,
      starterCode: {
        'javascript': `/**
 * @param {Array<{nom: string, score: number}>} candidats
 * @param {number} scoreSeuil
 * @returns {Array<string>}
 */
function filtrerEtatsCandidats(candidats, scoreSeuil) {
  // Votre code ici
  return candidats
    .filter(c => c.score >= scoreSeuil)
    .map(c => c.nom)
    .sort();
}`
      },
      expectedOutput: '["Amira", "Yassine"]',
      difficulty: 'facile',
      timeLimit: 15,
      testCases: [
        {
          id: 'tc-1',
          label: 'Filtre avec candidats au-dessus du seuil',
          input: 'candidats=[{nom: "Yassine", score: 85}, {nom: "Sami", score: 45}, {nom: "Amira", score: 90}], seuil=70',
          expectedOutput: '["Amira", "Yassine"]'
        },
        {
          id: 'tc-2',
          label: 'Aucun candidat au-dessus du seuil',
          input: 'candidats=[{nom: "Sami", score: 40}], seuil=60',
          expectedOutput: '[]'
        }
      ]
    },
    'intermediaire': {
      id: 'tech-js-int',
      title: 'Classification et regroupement des scores par palier',
      description: `Créez une fonction \`classerCandidats(scores)\` qui regroupe les scores d'une promotion dans un objet à trois paliers : \`or\` (score >= 85), \`argent\` (70 <= score < 85) et \`bronze\` (50 <= score < 70). Les scores sous 50 sont ignorés.`,
      starterCode: {
        'javascript': `/**
 * @param {number[]} scores
 * @returns {{ or: number[], argent: number[], bronze: number[] }}
 */
function classerCandidats(scores) {
  const resultat = { or: [], argent: [], bronze: [] };
  for (const s of scores) {
    if (s >= 85) resultat.or.push(s);
    else if (s >= 70) resultat.argent.push(s);
    else if (s >= 50) resultat.bronze.push(s);
  }
  return resultat;
}`
      },
      expectedOutput: '{"or":[92],"argent":[75,80],"bronze":[60]}',
      difficulty: 'moyen',
      timeLimit: 20,
      testCases: [
        {
          id: 'tc-1',
          label: 'Répartition sur les 3 catégories',
          input: 'scores=[92, 75, 80, 60, 42]',
          expectedOutput: '{"or":[92],"argent":[75,80],"bronze":[60]}'
        },
        {
          id: 'tc-2',
          label: 'Tableau vide',
          input: 'scores=[]',
          expectedOutput: '{"or":[],"argent":[],"bronze":[]}'
        }
      ]
    },
    'avance': {
      id: 'tech-js-av',
      title: 'Système d\'évaluation avec détection d\'anomalies et moyenne glissante',
      description: `Implémentez une fonction \`analyserPerformances(evaluations, fenetre)\` calculant la moyenne pondérée glissante des scores et isolant les chutes de scores soudaines (écart > 20 points avec la moyenne locale).`,
      starterCode: {
        'javascript': `/**
 * @param {number[]} evaluations
 * @param {number} fenetre
 * @returns {{ moyennes: number[], anomalies: number[] }}
 */
function analyserPerformances(evaluations, fenetre) {
  // Calcul et détection
  return { moyennes: [], anomalies: [] };
}`
      },
      expectedOutput: '{"moyennes":[82,85],"anomalies":[55]}',
      difficulty: 'difficile',
      timeLimit: 30,
      testCases: [
        {
          id: 'tc-1',
          label: 'Détection d\'une chute atypique',
          input: 'evaluations=[80, 85, 90, 55, 88], fenetre=3',
          expectedOutput: '{"moyennes":[85,76,77],"anomalies":[55]}'
        }
      ]
    }
  },

  'Python': {
    'debutant': {
      id: 'tech-py-deb',
      title: 'Filtrer les candidats éligibles',
      description: `Écrivez une fonction Python \`filtrer_candidats(candidats, min_score)\` renvoyant la liste des prénoms des candidats dont le score est supérieur ou égal au minimum requis.`,
      starterCode: {
        'python': `def filtrer_candidats(candidats: list[dict], min_score: int) -> list[str]:
    # Votre code ici
    return sorted([c['nom'] for c in candidats if c['score'] >= min_score])`
      },
      expectedOutput: "['Amira', 'Yassine']",
      difficulty: 'facile',
      timeLimit: 15,
      testCases: [
        {
          id: 'tc-1',
          label: 'Filtre simple',
          input: 'candidats=[{"nom": "Yassine", "score": 88}, {"nom": "Amira", "score": 92}], min_score=80',
          expectedOutput: "['Amira', 'Yassine']"
        }
      ]
    },
    'intermediaire': {
      id: 'tech-py-int',
      title: 'Agrégation des compétences les plus demandées',
      description: `Développez une fonction \`top_competences(offres, top_n=3)\` qui prend en entrée une liste d'offres et renvoie les N compétences les plus récurrentes sous forme de dictionnaire {competence: occurrences}.`,
      starterCode: {
        'python': `from collections import Counter

def top_competences(offres: list[dict], top_n: int = 3) -> dict[str, int]:
    # Extraction et décompte
    compteur = Counter()
    for o in offres:
        compteur.update(o.get('skills', []))
    return dict(compteur.most_common(top_n))`
      },
      expectedOutput: "{'Angular': 5, 'Python': 4, 'SQL': 3}",
      difficulty: 'moyen',
      timeLimit: 20,
      testCases: [
        {
          id: 'tc-1',
          label: 'Top 3 compétences',
          input: 'offres=[{"skills": ["Angular", "Python"]}, {"skills": ["Angular", "SQL"]}, {"skills": ["Angular", "Python"]}], top_n=2',
          expectedOutput: "{'Angular': 3, 'Python': 2}"
        }
      ]
    },
    'avance': {
      id: 'tech-py-av',
      title: 'Algorithme de matching candidat / offre avec scoring vectoriel',
      description: `Implémentez une fonction de matching calculant la similarité cosinus entre les compétences d'un profil et les exigences d'une offre pondérées par les années d'expérience.`,
      starterCode: {
        'python': `def calculer_matching(candidat: dict, offre: dict) -> float:
    # Calcul de score de pertinence entre 0.0 et 1.0
    return 0.85`
      },
      expectedOutput: '0.88',
      difficulty: 'difficile',
      timeLimit: 30,
      testCases: [
        {
          id: 'tc-1',
          label: 'Matching profil senior',
          input: 'candidat={"skills": ["Python", "IA", "Docker"]}, offre={"skills": ["Python", "IA"]}',
          expectedOutput: '1.0'
        }
      ]
    }
  }
};
