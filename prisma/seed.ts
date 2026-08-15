import "dotenv/config"
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const connectionString = process.env.DATABASE_URL || ''
const pool = new pg.Pool({ connectionString })
const adapter = new PrismaPg(pool)

const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Seeding database...')

  // Clean existing data for clean seed
  await prisma.media.deleteMany()
  await prisma.scoreQuestion.deleteMany()
  await prisma.scoreCategory.deleteMany()
  await prisma.testimonial.deleteMany()
  await prisma.project.deleteMany()
  await prisma.siteContent.deleteMany()
  await prisma.contactSubmission.deleteMany()
  await prisma.quotationItem.deleteMany()
  await prisma.quotation.deleteMany()
  await prisma.report.deleteMany()
  await prisma.assessment.deleteMany()
  await prisma.lead.deleteMany()

  // --- CMS Content Seed ---

  // 1. Site Content
  const contentItems = [
    { key: 'hero_headline', value: 'Build better. Grow smarter. Scale with systems.', section: 'hero', label: 'Hero Headline', type: 'text' },
    { key: 'hero_subheadline', value: 'We design and execute complete digital-growth systems for Indian businesses — from first click to loyal customer.', section: 'hero', label: 'Hero Subheadline', type: 'textarea' },
    { key: 'hero_cta_primary', value: 'Get a Free Business Score', section: 'hero', label: 'Hero Primary CTA', type: 'text' },
    { key: 'hero_cta_secondary', value: 'See Our Work', section: 'hero', label: 'Hero Secondary CTA', type: 'text' },
    { key: 'challenge_headline', value: 'Disconnected channels are costing you growth.', section: 'challenge', label: 'Challenge Headline', type: 'text' },
    { key: 'challenge_subheadline', value: 'Most Indian businesses juggle 5–8 different vendors and tools — with no unified strategy. The result? Leaked leads, wasted ad spend, and zero accountability.', section: 'challenge', label: 'Challenge Subheadline', type: 'textarea' },
    { key: 'challenge_cta', value: 'Meet KARVAO ONE SYSTEM', section: 'challenge', label: 'Challenge CTA', type: 'text' },
    { key: 'score_headline', value: 'How strong is your digital-growth engine?', section: 'score', label: 'Score Headline', type: 'text' },
    { key: 'score_subheadline', value: 'Take our 5-question Business Growth Score to uncover exactly where your systems are leaking revenue — and what to fix first.', section: 'score', label: 'Score Subheadline', type: 'textarea' },
    { key: 'solutions_headline', value: 'Everything you need to grow — one team, one system.', section: 'solutions', label: 'Solutions Headline', type: 'text' },
    { key: 'solutions_subheadline', value: 'We build, grow, convert, automate, and measure — so every part of your digital engine works together.', section: 'solutions', label: 'Solutions Subheadline', type: 'textarea' },
    { key: 'industries_headline', value: 'Built for Indian industries that move fast.', section: 'industries', label: 'Industries Headline', type: 'text' },
    { key: 'industries_subheadline', value: 'From Jaipur to Jodhpur to pan-India — we build systems that fit your industry.', section: 'industries', label: 'Industries Subheadline', type: 'textarea' },
    { key: 'projects_headline', value: 'Results that speak louder than promises.', section: 'projects', label: 'Projects Headline', type: 'text' },
    { key: 'projects_subheadline', value: 'Real transformations. Real businesses. Real growth.', section: 'projects', label: 'Projects Subheadline', type: 'textarea' },
    { key: 'reviews_headline', value: 'Trusted by growth-focused founders.', section: 'reviews', label: 'Reviews Headline', type: 'text' },
    { key: 'reviews_subheadline', value: 'Hear from founders and marketing heads who transformed their digital growth with KARVAO.', section: 'reviews', label: 'Reviews Subheadline', type: 'textarea' },
    { key: 'solutions_cta', value: 'See Our Full Services', section: 'solutions', label: 'Solutions CTA', type: 'text' },
    { key: 'industries_cta', value: 'Find Your Industry', section: 'industries', label: 'Industries CTA', type: 'text' },
    { key: 'footer_company', value: 'KARVAO India — Digital-Growth Systems Partner for Indian Businesses.', section: 'footer', label: 'Footer Company Description', type: 'textarea' },
    { key: 'about_headline', value: 'We build the systems your growth depends on.', section: 'about', label: 'About Headline', type: 'text' },
    { key: 'about_subheadline', value: 'KARVAO India is a full-stack digital-growth agency. We design, build, and operate the complete system that turns your digital presence into measurable growth.', section: 'about', label: 'About Subheadline', type: 'textarea' },
    { key: 'solutions_page_headline', value: 'Complete digital-growth systems — one partner, one system.', section: 'solutions', label: 'Solutions Page Headline', type: 'text' },
    { key: 'industries_page_headline', value: 'Growth systems built for Indian industries.', section: 'industries', label: 'Industries Page Headline', type: 'text' },
    { key: 'insights_page_headline', value: 'Insights to grow smarter.', section: 'insights', label: 'Insights Page Headline', type: 'text' },
  ]

  for (const item of contentItems) {
    await prisma.siteContent.create({ data: item })
  }
  console.log(`Created ${contentItems.length} site content items`)

  // 2. Score Categories
  const categories = [
    { key: 'digitalPresence', label: 'Website & Digital Presence', weight: 0.25, description: 'Your website, Google visibility, and online reputation.', sortOrder: 1 },
    { key: 'acquisition', label: 'Lead Generation & Acquisition', weight: 0.25, description: 'How you attract, capture, and nurture potential customers.', sortOrder: 2 },
    { key: 'conversion', label: 'Conversion & Sales', weight: 0.20, description: 'How effectively you turn traffic and leads into paying customers.', sortOrder: 3 },
    { key: 'automation', label: 'Automation & Efficiency', weight: 0.15, description: 'How you use tools and workflows to save time and scale operations.', sortOrder: 4 },
    { key: 'measurement', label: 'Growth Tracking & Measurement', weight: 0.15, description: 'How you measure, analyse, and optimise your digital performance.', sortOrder: 5 },
  ]

  const createdCategories: Record<string, string> = {}
  for (const cat of categories) {
    const created = await prisma.scoreCategory.create({ data: cat })
    createdCategories[cat.key] = created.id
  }
  console.log(`Created ${categories.length} score categories`)

  // 3. Score Questions
  const questions = [
    {
      categoryKey: 'digitalPresence',
      questionText: 'How would you rate your current website and digital presence?',
      options: [
        { text: 'No professional website or Google Business Profile', score: 0 },
        { text: 'Basic website exists but rarely updated or optimised', score: 35 },
        { text: 'Professional website with active Google Business Profile', score: 65 },
        { text: 'High-performing, fast website with strong SEO and reviews', score: 90 },
      ],
      sortOrder: 1,
    },
    {
      categoryKey: 'acquisition',
      questionText: 'How do you currently generate leads for your business?',
      options: [
        { text: 'No active lead generation strategy or tools', score: 0 },
        { text: 'Basic efforts (WhatsApp, social posts) but inconsistent', score: 35 },
        { text: 'Active campaigns with landing pages and form captures', score: 65 },
        { text: 'Systematic lead engine with CRM, ads, and content working together', score: 90 },
      ],
      sortOrder: 2,
    },
    {
      categoryKey: 'conversion',
      questionText: 'How effectively do your leads convert into paying customers?',
      options: [
        { text: 'No clear conversion process — leads often go cold', score: 0 },
        { text: 'Basic follow-up but no structured sales system', score: 35 },
        { text: 'Defined sales process with regular follow-ups and tracking', score: 65 },
        { text: 'Automated nurture sequences with high conversion rates', score: 90 },
      ],
      sortOrder: 3,
    },
    {
      categoryKey: 'automation',
      questionText: 'How automated are your day-to-day digital operations?',
      options: [
        { text: 'Everything is manual — emails, follow-ups, scheduling', score: 0 },
        { text: 'Some tools in place but not integrated or automated', score: 35 },
        { text: 'Key workflows automated (CRM, email, WhatsApp)', score: 65 },
        { text: 'Fully integrated automation across marketing, sales, and ops', score: 90 },
      ],
      sortOrder: 4,
    },
    {
      categoryKey: 'measurement',
      questionText: 'How well do you track and measure your digital growth?',
      options: [
        { text: 'No analytics setup or regular reporting', score: 0 },
        { text: 'Basic Google Analytics but rarely reviewed', score: 35 },
        { text: 'Regular reporting with clear KPIs and dashboards', score: 65 },
        { text: 'Advanced analytics with data-driven decisions and optimisation', score: 90 },
      ],
      sortOrder: 5,
    },
  ]

  for (const q of questions) {
    const categoryId = createdCategories[q.categoryKey]
    if (categoryId) {
      await prisma.scoreQuestion.create({
        data: {
          categoryId,
          questionText: q.questionText,
          options: q.options,
          sortOrder: q.sortOrder,
        },
      })
    }
  }
  console.log(`Created ${questions.length} score questions`)

  // 4. Projects
  const projects = [
    { name: 'D2C Skincare Brand', category: 'Growth', description: 'Complete growth system including Meta Ads, influencer pipeline, and WhatsApp retention flows. Achieved 3.2x ROAS in 90 days.', featured: true, sortOrder: 1 },
    { name: 'B2B SaaS Platform', category: 'Build', description: 'Full-funnel lead generation with CRM automation, content marketing, and LinkedIn ads. Grew from 50 to 400 MQLs/month.', featured: true, sortOrder: 2 },
    { name: 'Healthcare Clinic Network', category: 'Convert', description: 'High-converting website with online booking, patient CRM, and automated follow-ups. 85% direct bookings via website.', featured: true, sortOrder: 3 },
    { name: 'Real Estate Developer', category: 'Automate', description: 'End-to-end lead automation from Facebook Ads to site visits with zero manual follow-up. 12x ROI on lead spend.', featured: true, sortOrder: 4 },
    { name: 'Education Institute Chain', category: 'Measure', description: 'Performance marketing with full-funnel analytics, A/B testing, and conversion tracking. 200% enrollment growth.', featured: false, sortOrder: 5 },
    { name: 'Manufacturing Exporter', category: 'Build', description: 'Complete digital presence setup with B2B lead generation for export markets. New digital channel in 60 days.', featured: false, sortOrder: 6 },
  ]

  for (const project of projects) {
    await prisma.project.create({ data: project })
  }
  console.log(`Created ${projects.length} projects`)

  // 5. Testimonials
  const testimonials = [
    { name: 'Rohit Mehta', company: 'Mehta Electronics', role: 'Founder', rating: 5, review: 'KARVAO transformed our entire digital presence into a growth machine. We went from scattered efforts to a unified system that generates qualified leads every single day.', featured: true, sortOrder: 1 },
    { name: 'Priya Agarwal', company: 'StyleNest Fashion', role: 'Marketing Head', rating: 5, review: 'The team built us a complete system — from ads to CRM to automation. Our conversion rate doubled in just 3 months. The level of strategic thinking combined with execution is rare.', featured: true, sortOrder: 2 },
    { name: 'Amit Kapoor', company: 'Kapoor Realty Group', role: 'Director', rating: 5, review: 'Finally, a partner that understands both strategy and execution. KARVAO designed our growth system and managed every channel. Site visits went from 8 to 30 per week in 60 days.', featured: true, sortOrder: 3 },
    { name: 'Deepak Nair', company: 'TechBridge Solutions', role: 'CEO', rating: 5, review: 'We needed a partner, not just an agency. KARVAO built our entire digital system — CRM, landing pages, ad campaigns, content. Our MQLs increased by 5x in 90 days.', featured: false, sortOrder: 4 },
    { name: 'Neha Gupta', company: 'Glow Wellness Spa', role: 'Founder', rating: 5, review: 'From zero online bookings to a fully automated booking system — KARVAO delivered beyond expectations. Now 80% of our new clients come through digital channels.', featured: false, sortOrder: 5 },
    { name: 'Vikram Singh', company: 'Heritage Hotels India', role: 'Operations Head', rating: 5, review: 'KARVAO built our direct booking system from scratch. We reduced OTA dependency by 40% and increased direct revenue by 65% in the first year.', featured: false, sortOrder: 6 },
  ]

  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t })
  }
  console.log(`Created ${testimonials.length} testimonials`)

  // --- Legacy Seed Data ---

  // Create a Seed Lead
  const testLead = await prisma.lead.create({
    data: {
      email: 'growth@karvao.in',
      name: 'Rahul Sharma',
      phone: '+919876543210',
      company: 'Sharma Retail Tech',
      status: 'QUALIFIED',
    },
  })
  console.log(`Created Lead: ${testLead.name} (${testLead.email})`)

  // Create an Assessment for the Lead
  const testAssessment = await prisma.assessment.create({
    data: {
      leadId: testLead.id,
      answers: { q1: 'professional', q2: 'active', q3: 'defined', q4: 'partial', q5: 'regular' },
      digitalPresence: 65,
      acquisition: 65,
      conversion: 65,
      automation: 65,
      measurement: 65,
      brand: 0,
      overallScore: 65,
    },
  })
  console.log(`Created Assessment with Overall Score: ${testAssessment.overallScore}`)

  // Create a Shareable Report token
  const testReport = await prisma.report.create({
    data: {
      assessmentId: testAssessment.id,
      accessToken: 'seed-token-retail-65',
    },
  })
  console.log(`Created Report Token: ${testReport.accessToken}`)

  // Create a Quotation
  const testQuotation = await prisma.quotation.create({
    data: {
      leadId: testLead.id,
      goals: 'Increase online sales conversion and automate WhatsApp lead follow-ups.',
      timeline: '1-3 months',
      budget: '₹1,50,000 - ₹3,00,000',
      status: 'PENDING',
      items: {
        create: [
          { service: 'Website Development' },
          { service: 'WhatsApp Automation' },
          { service: 'Conversion Systems' },
        ],
      },
    },
  })
  console.log(`Created Quotation ID: ${testQuotation.id}`)

  console.log('Seeding completed successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
