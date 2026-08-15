export interface InsightBlock {
  heading?: string
  body: string
  bullets?: string[]
}

export interface Insight {
  slug: string
  title: string
  category: string
  excerpt: string
  readTime: string
  date: string
  author: string
  content: InsightBlock[]
}

export const insights: Insight[] = [
  {
    slug: 'why-your-business-needs-a-digital-presence',
    title: 'Why Your Business Needs a Digital Presence in 2026',
    category: 'Digital Presence',
    excerpt:
      'If a customer searches for your product and cannot find you, they will find your competitor instead. Here is how to build a presence that actually converts.',
    readTime: '6 min read',
    date: 'Feb 10, 2026',
    author: 'Karvao Team',
    content: [
      {
        heading: 'The search starts online',
        body: 'Every day, millions of Indian consumers open a search engine or social app before making a buying decision. From a restaurant order to a new car showroom visit, the journey almost always begins online. If your business is invisible in that moment, the sale is already lost.',
      },
      {
        heading: 'Digital presence is more than having a website',
        body: 'Many businesses think a single page with their name and phone number is enough. A real digital presence ties together your website, search visibility, social proof and review management into one consistent story.',
        bullets: [
          'A fast, mobile-first website that explains what you do in seconds.',
          'Google Business Profile and local search listings that answer "near me" queries.',
          'Active social profiles that show you are a real, operating business.',
          'Consistent branding and reviews across every platform.',
        ],
      },
      {
        heading: 'The cost of being invisible',
        body: 'Every month without a proper digital presence is a month where demand that could have reached you flows to someone else. Building presence is not an expense — it is the foundation every other growth activity depends on.',
      },
    ],
  },
  {
    slug: 'local-seo-vs-paid-ads-what-to-choose-first',
    title: 'Local SEO vs Paid Ads: What Should an SME Choose First?',
    category: 'Attract',
    excerpt:
      'A practical framework for small businesses deciding where to invest their first marketing rupee — and why most need both.',
    readTime: '7 min read',
    date: 'Feb 02, 2026',
    author: 'Karvao Team',
    content: [
      {
        heading: 'The classic dilemma',
        body: 'Startups and small businesses in India are constantly torn between building organic visibility through SEO and getting instant traffic through paid ads. The right answer depends on your time horizon and cash flow.',
      },
      {
        heading: 'Paid ads buy time',
        body: 'Paid campaigns on Google and Meta put your offer in front of the right audience the moment they go live. They are ideal for validating a new service, clearing inventory, or generating leads while your organic presence matures.',
      },
      {
        heading: 'SEO compounds',
        body: 'Local SEO takes longer to show results, but every piece of ranking content keeps working for months. Over time it lowers your cost per lead far below paid channels.',
        bullets: [
          'Optimise your Google Business Profile and local citations first.',
          'Publish content that answers real customer questions in your area.',
          'Collect and respond to reviews consistently.',
          'Track calls and enquiries from each channel so you know what works.',
        ],
      },
      {
        heading: 'A practical starting point',
        body: 'For most SMEs, begin with a small paid budget to learn which offers and messages convert, while building local SEO in parallel. Review every 90 days and shift spend toward whichever channel produces the lowest cost per qualified lead.',
      },
    ],
  },
  {
    slug: 'turn-enquiries-into-customers-crm',
    title: 'Stop Losing Leads: Turn Enquiries into Customers with a CRM',
    category: 'Convert',
    excerpt:
      'Most businesses do not have a lead problem — they have a follow-up problem. A simple CRM fixes the leaks in your sales funnel.',
    readTime: '5 min read',
    date: 'Jan 20, 2026',
    author: 'Karvao Team',
    content: [
      {
        heading: 'The leaky funnel',
        body: 'A customer sends a WhatsApp message, fills a form or calls your number. Then nothing. Enquiries sit in a personal phone, get forgotten in a shared inbox, or are chased too late. Research consistently shows that leads contacted quickly are far more likely to convert.',
      },
      {
        heading: 'What a CRM actually does',
        body: 'A CRM centralises every enquiry, assigns ownership, and automates the follow-up so no lead falls through the cracks.',
        bullets: [
          'Every enquiry is captured automatically from forms, calls and chats.',
          'Statuses move from New to Contacted to Qualified to Won — so the pipeline is always visible.',
          'Automated reminders and WhatsApp messages follow up without manual effort.',
          'Reports show exactly where leads are getting stuck.',
        ],
      },
      {
        heading: 'Start simple',
        body: 'You do not need an expensive enterprise system. A well-configured CRM with a clean pipeline, a few automation rules and a daily review habit is enough to dramatically lift conversion for a growing business.',
      },
    ],
  },
  {
    slug: 'whatsapp-automation-for-indian-businesses',
    title: 'WhatsApp Automation: The Overlooked Growth Lever for Indian Businesses',
    category: 'Automate',
    excerpt:
      'Your customers already live on WhatsApp. Here is how to use automation to respond faster, follow up consistently and save hours every week.',
    readTime: '6 min read',
    date: 'Jan 08, 2026',
    author: 'Karvao Team',
    content: [
      {
        heading: 'Meet customers where they are',
        body: 'India runs on WhatsApp. Yet most businesses treat it as a personal messaging app instead of a structured customer channel. Automated WhatsApp flows turn a chat tool into a 24/7 sales and support desk.',
      },
      {
        heading: 'What you can automate today',
        body: 'Modern WhatsApp tools let you handle repetitive work without losing the personal feel customers expect.',
        bullets: [
          'Instant replies and acknowledgements when a customer first messages you.',
          'Automated catalogue and price-list sharing based on the enquiry.',
          'Follow-up sequences for quotations that have not been answered.',
          'Appointment and payment reminders that reduce no-shows.',
        ],
      },
      {
        heading: 'Automation without losing trust',
        body: 'The goal is not to replace human conversation but to make it faster and more consistent. Automate the predictable parts, keep the human touch for the moments that matter, and measure response times to prove the improvement.',
      },
    ],
  },
  {
    slug: 'metrics-that-actually-matter',
    title: 'Metrics That Matter: Measuring Growth Without Vanity Numbers',
    category: 'Measure',
    excerpt:
      'Likes and impressions feel good but do not pay bills. Learn which metrics actually predict revenue and how to track them simply.',
    readTime: '5 min read',
    date: 'Dec 15, 2025',
    author: 'Karvao Team',
    content: [
      {
        heading: 'The vanity trap',
        body: 'Most business owners open their dashboard, see rising impressions and follower counts, and assume growth. Meanwhile the phone barely rings. Vanity metrics measure activity, not results.',
      },
      {
        heading: 'Metrics that predict revenue',
        body: 'Build your dashboard around the numbers that lead directly to customers and cash flow.',
        bullets: [
          'Cost per qualified lead across each channel.',
          'Enquiry-to-quotation and quotation-to-sale conversion rates.',
          'Average response time to new enquiries.',
          'Customer acquisition cost and lifetime value.',
        ],
      },
      {
        heading: 'Simple measurement beats perfect measurement',
        body: 'You do not need a data science team. A clean dashboard with five to seven numbers, reviewed weekly, gives you the clarity to kill what is not working and double down on what is. As the saying goes: you cannot improve what you do not measure.',
      },
    ],
  },
  {
    slug: 'scaling-your-business-without-burning-out',
    title: 'Scaling a Business Without Burning Out Your Team',
    category: 'Growth',
    excerpt:
      'Growth multiplies complexity. Smart systems — not more hours — are what let a small team handle a bigger workload.',
    readTime: '7 min read',
    date: 'Dec 02, 2025',
    author: 'Karvao Team',
    content: [
      {
        heading: 'Growth is a system, not a sprint',
        body: 'When orders and enquiries rise, the instinct is to work harder. That works until it does not. Sustainable scaling comes from replacing manual effort with repeatable systems.',
      },
      {
        heading: 'Systemise before you scale',
        body: 'Write down the way your best work gets done and turn it into a process others can repeat.',
        bullets: [
          'Document the sales follow-up process so anyone can run it.',
          'Automate invoicing, reminders and reporting.',
          'Set up integrations so data flows between your website, CRM and accounts.',
          'Track team workload so you hire before people burn out, not after.',
        ],
      },
      {
        heading: 'Measure the business, not the hustle',
        body: 'A business that depends on any single person doing everything manually is fragile. Every system you install makes the business more valuable, more predictable and more sellable. Clear thinking, simple systems, measurable growth — that is the Karvao way.',
      },
    ],
  },
]

export function getAllInsights(): Insight[] {
  return insights
}

export function getInsightBySlug(slug: string): Insight | undefined {
  return insights.find((insight) => insight.slug === slug)
}
