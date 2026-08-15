export interface QuestionOption {
  text: string
  score: number
}

export interface Question {
  id: string
  category: 'digitalPresence' | 'acquisition' | 'conversion' | 'automation' | 'measurement'
  text: string
  options: QuestionOption[]
}

export const ASSESSMENT_QUESTIONS: Question[] = [
  // 1. Website & Digital Presence
  {
    id: 'q1_digital_presence',
    category: 'digitalPresence',
    text: "How would you rate your business's current digital presence — website, search visibility, and online profiles?",
    options: [
      { text: "No website or online presence. We rely entirely on word-of-mouth and offline channels.", score: 0 },
      { text: "Basic website exists but it's slow, outdated, or not mobile-friendly. Minimal search visibility.", score: 25 },
      { text: "Professional website that works well on mobile. Some search visibility but not optimized for conversion.", score: 50 },
      { text: "Fast, modern website with clear CTAs. Strong Google presence and optimized local search listings.", score: 75 },
      { text: "Blazing-fast, conversion-optimized website with complete SEO strategy, local listings, and active content marketing.", score: 100 },
    ],
  },
  // 2. Lead Generation & Acquisition
  {
    id: 'q2_acquisition',
    category: 'acquisition',
    text: "How do you currently generate new leads and acquire customers digitally?",
    options: [
      { text: "No digital lead generation. Relying purely on referrals, walk-ins, or offline methods.", score: 0 },
      { text: "Occasional social media posts. No paid ads, SEO strategy, or systematic lead generation.", score: 25 },
      { text: "Running some paid ads (Google/Meta) or basic SEO. Lead flow is inconsistent and cost per lead is high.", score: 50 },
      { text: "Multi-channel lead generation with paid ads, SEO, and social media. Some tracking in place but room to optimize.", score: 75 },
      { text: "Predictable, automated lead generation engine across search, social, and referral channels with precise ROAS tracking.", score: 100 },
    ],
  },
  // 3. Conversion & Sales
  {
    id: 'q3_conversion',
    category: 'conversion',
    text: "How effectively do you convert leads into paying customers?",
    options: [
      { text: "No follow-up system. Leads are lost, forgotten, or followed up manually and inconsistently.", score: 0 },
      { text: "Basic follow-up via phone/email but no CRM. Leads fall through cracks regularly. Response time is 24+ hours.", score: 25 },
      { text: "Using a CRM with organized pipeline but follow-up is mostly manual. Conversion rate is below 2%.", score: 50 },
      { text: "CRM with automated follow-up sequences. decent conversion rate. Sales pipeline is visible and managed.", score: 75 },
      { text: "Fully automated sales pipeline with instant lead routing, automated sequences, and 3%+ conversion rate.", score: 100 },
    ],
  },
  // 4. Automation & Efficiency
  {
    id: 'q4_automation',
    category: 'automation',
    text: "How automated are your business operations — customer messaging, bookings, notifications, and admin tasks?",
    options: [
      { text: "Everything is manual. Bookings, follow-ups, invoices, and notifications all require human effort.", score: 0 },
      { text: "Some tools in place (e.g., calendar booking) but they don't integrate. Systems work in silos.", score: 25 },
      { text: "Key processes automated (WhatsApp alerts, email sequences) but gaps remain. Partial integration.", score: 50 },
      { text: "Most customer-facing processes automated. WhatsApp API, booking systems, and notifications work together.", score: 75 },
      { text: "Fully integrated automation: website triggers CRM, which triggers WhatsApp, email, invoicing — end to end.", score: 100 },
    ],
  },
  // 5. Growth Tracking & Measurement
  {
    id: 'q5_measurement',
    category: 'measurement',
    text: "How well can you measure and track your business growth metrics — traffic, leads, conversions, and ROI?",
    options: [
      { text: "No tracking. No idea where leads come from, what campaigns work, or what the cost per acquisition is.", score: 0 },
      { text: "Basic Google Analytics installed. Check traffic occasionally but can't tie metrics to revenue.", score: 25 },
      { text: "Tracking leads and ad spend. Have some dashboards but metrics are incomplete or reviewed inconsistently.", score: 50 },
      { text: "Live dashboards tracking traffic, leads, conversions, and CAC by channel. Reviewed weekly.", score: 75 },
      { text: "Comprehensive measurement stack: GA4, CRM analytics, custom dashboards, attribution modeling, reviewed daily.", score: 100 },
    ],
  },
]
