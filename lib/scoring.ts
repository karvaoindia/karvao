export interface CategoryScores {
  digitalPresence: number
  acquisition: number
  conversion: number
  automation: number
  measurement: number
}

export type ScoreStage = 'Foundation Required' | 'Developing' | 'Growing' | 'Strong' | 'Advanced'

export interface ScoringResult {
  overallScore: number
  stage: ScoreStage
  categoryScores: CategoryScores
  strongestArea: string
  biggestOpportunity: string
}

export const CATEGORY_WEIGHTS: Record<keyof CategoryScores, number> = {
  digitalPresence: 0.25,
  acquisition: 0.25,
  conversion: 0.20,
  automation: 0.15,
  measurement: 0.15,
}

export const CATEGORY_LABELS: Record<keyof CategoryScores, string> = {
  digitalPresence: 'Website & Digital Presence',
  acquisition: 'Lead Generation & Acquisition',
  conversion: 'Conversion & Sales',
  automation: 'Automation & Efficiency',
  measurement: 'Growth Tracking & Measurement',
}

export function getScoreStage(score: number): ScoreStage {
  if (score < 40) return 'Foundation Required'
  if (score < 60) return 'Developing'
  if (score < 75) return 'Growing'
  if (score < 90) return 'Strong'
  return 'Advanced'
}

export function calculateScores(scores: CategoryScores): ScoringResult {
  const rawOverall =
    scores.digitalPresence * CATEGORY_WEIGHTS.digitalPresence +
    scores.acquisition * CATEGORY_WEIGHTS.acquisition +
    scores.conversion * CATEGORY_WEIGHTS.conversion +
    scores.automation * CATEGORY_WEIGHTS.automation +
    scores.measurement * CATEGORY_WEIGHTS.measurement

  // Cap at 79% per business rule
  const cappedScore = Math.min(79, Math.max(0, Math.round(rawOverall)))
  const overallScore = cappedScore
  const stage = getScoreStage(overallScore)

  let strongestArea: keyof CategoryScores = 'digitalPresence'
  let biggestOpportunity: keyof CategoryScores = 'digitalPresence'

  const categories = Object.keys(scores) as Array<keyof CategoryScores>

  for (const cat of categories) {
    if (scores[cat] > scores[strongestArea]) {
      strongestArea = cat
    }
    if (scores[cat] < scores[biggestOpportunity]) {
      biggestOpportunity = cat
    }
  }

  return {
    overallScore,
    stage,
    categoryScores: { ...scores },
    strongestArea: CATEGORY_LABELS[strongestArea],
    biggestOpportunity: CATEGORY_LABELS[biggestOpportunity],
  }
}
