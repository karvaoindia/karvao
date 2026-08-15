import { describe, it, expect } from 'vitest'
import { calculateScores, getScoreStage } from '../lib/scoring'
import { getRecommendations } from '../lib/recommendations'

describe('Scoring Logic tests', () => {
  it('correctly maps score bands to stages', () => {
    expect(getScoreStage(0)).toBe('Foundation Required')
    expect(getScoreStage(39)).toBe('Foundation Required')
    expect(getScoreStage(40)).toBe('Developing')
    expect(getScoreStage(59)).toBe('Developing')
    expect(getScoreStage(60)).toBe('Growing')
    expect(getScoreStage(74)).toBe('Growing')
    expect(getScoreStage(75)).toBe('Strong')
    expect(getScoreStage(79)).toBe('Strong')
  })

  it('caps overall score at 79 even with high category values', () => {
    const scores = {
      digitalPresence: 100,
      acquisition: 100,
      conversion: 100,
      automation: 100,
      measurement: 100,
    }
    const result = calculateScores(scores)
    expect(result.overallScore).toBe(79)
  })

  it('does not cap scores below 79', () => {
    const scores = {
      digitalPresence: 50,
      acquisition: 50,
      conversion: 50,
      automation: 50,
      measurement: 50,
    }
    const result = calculateScores(scores)
    expect(result.overallScore).toBe(50)
  })

  it('correctly calculates weighted score for mixed values', () => {
    const scores = {
      digitalPresence: 45,
      acquisition: 35,
      conversion: 40,
      automation: 30,
      measurement: 50,
    }
    
    const result = calculateScores(scores)
    // 45*0.25 + 35*0.25 + 40*0.20 + 30*0.15 + 50*0.15 = 11.25 + 8.75 + 8 + 4.5 + 7.5 = 40
    expect(result.overallScore).toBe(40)
    expect(result.stage).toBe('Developing')
    expect(result.strongestArea).toBe('Growth Tracking & Measurement')
    expect(result.biggestOpportunity).toBe('Automation & Efficiency')
  })

  it('identifies strongest and weakest areas correctly', () => {
    const scores = {
      digitalPresence: 80,
      acquisition: 20,
      conversion: 60,
      automation: 40,
      measurement: 50,
    }
    const result = calculateScores(scores)
    expect(result.strongestArea).toBe('Website & Digital Presence')
    expect(result.biggestOpportunity).toBe('Lead Generation & Acquisition')
  })
})

describe('Recommendation Logic tests', () => {
  it('triggers correct recommendations based on sub-50 scores', () => {
    const scores = {
      digitalPresence: 45,
      acquisition: 35,
      conversion: 50,
      automation: 30,
      measurement: 70,
    }

    const recs = getRecommendations(scores)
    const categories = recs.map((r: any) => r.category)
    expect(categories).toContain('digitalPresence')
    expect(categories).toContain('acquisition')
    expect(categories).toContain('automation')
    expect(categories).not.toContain('conversion')
    expect(categories).not.toContain('measurement')
  })

  it('triggers zero recommendations when all categories are >= 50', () => {
    const scores = {
      digitalPresence: 50,
      acquisition: 50,
      conversion: 50,
      automation: 50,
      measurement: 50,
    }

    const recs = getRecommendations(scores)
    expect(recs.length).toBe(0)
  })
})
