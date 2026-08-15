import { CategoryScores } from './scoring'

export interface Recommendation {
  category: keyof CategoryScores
  title: string
  items: string[]
  priority: 'High' | 'Medium'
}

export function getRecommendations(scores: CategoryScores): Recommendation[] {
  const recommendations: Recommendation[] = []

  if (scores.digitalPresence < 50) {
    recommendations.push({
      category: 'digitalPresence',
      title: 'Upgrade Digital Presence & Website Foundation',
      items: [
        'Website Development (Speed & Mobile UX)',
        'E-commerce & Shopify Setup',
        'Branding & Visuals Upgrade',
      ],
      priority: scores.digitalPresence < 30 ? 'High' : 'Medium',
    })
  }

  if (scores.acquisition < 50) {
    recommendations.push({
      category: 'acquisition',
      title: 'Optimize Lead Generation & Customer Acquisition',
      items: [
        'SEO Audit & Keyword Plan',
        'Google Ads Setup & Optimization',
        'Meta Paid Social Campaign Setup',
      ],
      priority: scores.acquisition < 30 ? 'High' : 'Medium',
    })
  }

  if (scores.conversion < 50) {
    recommendations.push({
      category: 'conversion',
      title: 'Strengthen Lead Follow-Up & Sales Pipeline',
      items: [
        'CRM & Pipeline Setup',
        'Automated Follow-Up Sequences',
        'Sales Enablement Systems',
      ],
      priority: scores.conversion < 30 ? 'High' : 'Medium',
    })
  }

  if (scores.automation < 50) {
    recommendations.push({
      category: 'automation',
      title: 'Automate Operations & Customer Messaging',
      items: [
        'WhatsApp Automation Solutions',
        'Workflow Automation Integrations',
        'Automated Chatbots & Auto-responders',
      ],
      priority: scores.automation < 30 ? 'High' : 'Medium',
    })
  }

  if (scores.measurement < 50) {
    recommendations.push({
      category: 'measurement',
      title: 'Setup Growth Measurement & Analytics',
      items: [
        'Analytics Auditing & Custom Dashboards',
        'GA4 & Pixel Conversions Audit',
        'Lead Source Attribution Tracking',
      ],
      priority: scores.measurement < 30 ? 'High' : 'Medium',
    })
  }

  return recommendations
}
