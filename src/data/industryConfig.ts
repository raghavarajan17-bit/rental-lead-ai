export interface IndustryConfig {
  id: string;
  name: string;
  iconName: string;
  sampleBusinessName: string;
  welcomeMessage: string;
  assistantName: string;
  qualificationCriteria: string[];
  quickPrompts: string[];
  pricingSuggestion: {
    setupFee: string;
    monthlyRetainer: string;
  };
  clientOutreachPitch: {
    headline: string;
    emailSubject: string;
    coldEmailBody: string;
    linkedInDm: string;
    followUp3Days: string;
  };
}

export const SUPPORTED_INDUSTRIES: IndustryConfig[] = [
  {
    id: "property_leasing",
    name: "Apartment Leasing & Property Management",
    iconName: "Building2",
    sampleBusinessName: "Oakwood Premier Living",
    assistantName: "LeaseBot",
    welcomeMessage:
      "Hello and welcome to Oakwood Premier Apartments! I'm LeaseBot, an automated AI leasing assistant operating in compliance with the US Fair Housing Act. I'm here 24/7 to answer floor plan questions, review pet policies, and schedule your tour. What kind of apartment layout and move-in date are you looking for?",
    qualificationCriteria: [
      "Target Move-in Date",
      "Budget & Desired Layout (Studio / 1-bed / 2-bed)",
      "Pet Policy Compatibility (Oakwood allows up to 2 pets under 60 lbs)",
      "Income Verification Standard (~2.5x-3x rent)",
      "Tour Booking & Instant Manager Handoff (SMS / Calendar)"
    ],
    quickPrompts: [
      "Looking for a 2-bedroom apartment under $2,400/mo.",
      "Do you allow dogs? Looking to move in around July 1st.",
      "What are the deposit and income verification rules?",
      "Can I book a weekend walkthrough tour?"
    ],
    pricingSuggestion: {
      setupFee: "$450 one-time",
      monthlyRetainer: "$99 - $199/month"
    },
    clientOutreachPitch: {
      headline: "Stop losing weekend rental applicants to competitors",
      emailSubject: "Quick question regarding {{Company}} weekend leasing inquiries",
      coldEmailBody:
        "Hi {{Name}},\n\nI noticed that when prospective renters visit your properties on Saturday or Sunday evening, they have to wait until Monday morning for a reply.\n\nOver 62% of prospective renters sign with the first community that answers their pet policy, pricing, and tour availability.\n\nWe set up a 24/7 AI Leasing Assistant that handles questions and qualifies renters before booking them into your calendar.\n\nHere is a 30-second interactive preview: {{DemoLink}}\n\nWould you be open to a quick 5-minute chat to see how this works for {{Company}}?",
      linkedInDm:
        "Hi {{Name}} - saw your listings at {{Company}}. Quick question: do you currently have a way to automatically qualify prospective renters and book tours outside office hours? Built a live demo here: {{DemoLink}} - curious what you think!",
      followUp3Days:
        "Hi {{Name}} - following up in case my previous note slipped through. Did you get a chance to test the automated tour-booking demo? Happy to install a 14-day free trial on your site with zero upfront commitment."
    }
  },
  {
    id: "dental_medical",
    name: "Dental & Cosmetic Clinics",
    iconName: "Stethoscope",
    sampleBusinessName: "Aura Smile Dental & Orthodontics",
    assistantName: "AuraBot",
    welcomeMessage:
      "Welcome to Aura Smile Dental! I'm your clinic assistant. Are you looking to schedule a new patient cleaning, consult for Invisalign, or do you have an urgent dental question?",
    qualificationCriteria: [
      "Treatment Interest (Cleaning, Implants, Ortho, Emergency)",
      "Insurance Provider / Self-pay status",
      "Preferred Appointment Day & Time",
      "Patient Name & Contact Details"
    ],
    quickPrompts: [
      "How much is an Invisalign consultation?",
      "Do you accept Delta Dental insurance?",
      "I have severe tooth pain, can I get a same-day appointment?",
      "I'd like to book a routine cleaning next Tuesday."
    ],
    pricingSuggestion: {
      setupFee: "$500 one-time",
      monthlyRetainer: "$149/month"
    },
    clientOutreachPitch: {
      headline: "Capture high-ticket dental patients after 5 PM",
      emailSubject: "Missed patient bookings on {{Company}}'s website",
      coldEmailBody:
        "Hi Dr. {{Name}},\n\nMost patients research dentists, teeth whitening, and orthodontic consults after 7 PM when their workday ends.\n\nRight now, if someone visits {{Company}}'s website at night, they are asked to fill out a static contact form—and many simply leave to find a clinic with instant confirmation.\n\nWe built an automated 24/7 patient qualification assistant that answers insurance questions and books appointments directly.\n\nLive test demo: {{DemoLink}}\n\nCan I send you a 1-minute video showing how it captures new patients for you?",
      linkedInDm:
        "Hi Dr. {{Name}} - noticed your clinic {{Company}}. We recently built an AI assistant that answers patient insurance/pricing questions and schedules visits 24/7. Live demo: {{DemoLink}}. Would love your feedback!",
      followUp3Days:
        "Hi Dr. {{Name}} - just checking if you saw my note on capturing after-hours patient inquiries for {{Company}}. Would you like a 14-day test run on your website?"
    }
  },
  {
    id: "roofing_hvac",
    name: "Home Services (Roofing, HVAC & Plumbing)",
    iconName: "Wrench",
    sampleBusinessName: "Summit Peak Roofing & HVAC",
    assistantName: "SummitBot",
    welcomeMessage:
      "Hi there! Welcome to Summit Peak Services. Need an emergency repair quote, routine maintenance, or a free roof replacement inspection?",
    qualificationCriteria: [
      "Service needed (Roof leak, AC repair, Furnace replacement)",
      "Urgency level (Emergency vs Standard estimate)",
      "Property address / ZIP code",
      "Homeowner confirmation & Phone number"
    ],
    quickPrompts: [
      "My AC is blowing warm air, how fast can a tech come?",
      "Need a free estimate for full roof replacement.",
      "Do you offer financing for furnace installations?",
      "Schedule a roof inspection after last night's hail storm."
    ],
    pricingSuggestion: {
      setupFee: "$600 one-time",
      monthlyRetainer: "$150/month"
    },
    clientOutreachPitch: {
      headline: "Instant emergency quote & dispatch assistant",
      emailSubject: "Quick idea to capture more emergency HVAC/roofing leads for {{Company}}",
      coldEmailBody:
        "Hi {{Name}},\n\nWhen a homeowner has an emergency leak or their AC breaks in 90-degree heat, they call or message 3 contractors and hire whichever one responds in 60 seconds.\n\nIf you don't answer instantly, that $8,000 job goes to your competitor.\n\nWe install an automated AI dispatcher on your site that captures address, issue, and contact info within 45 seconds and texts it straight to your phone.\n\nTest the live workflow here: {{DemoLink}}\n\nWould you be open to testing this for 14 days free?",
      linkedInDm:
        "Hey {{Name}} - quick question: how do you guys handle emergency service inquiries that hit your website at 9 PM? Built an instant dispatcher demo here: {{DemoLink}} - takes 10 mins to plug into your site.",
      followUp3Days:
        "Hey {{Name}} - circling back on the instant lead dispatcher for {{Company}}. Can show you how it generates 5-10 extra homeowner estimates per month. 5-minute chat this week?"
    }
  },
  {
    id: "web_agency",
    name: "Web Design & Digital Marketing Agencies",
    iconName: "Briefcase",
    sampleBusinessName: "NovaScale Growth Agency",
    assistantName: "NovaBot",
    welcomeMessage:
      "Welcome to NovaScale Agency! I'm NovaBot. Are you looking to redesign your company website, scale paid Google/Meta ads, or build custom software?",
    qualificationCriteria: [
      "Service Requested (Web Design, SEO, Paid Ads, Automation)",
      "Current Monthly Budget ($3k - $10k+)",
      "Project Launch Target Date",
      "Company Name, Website & Decision Maker Email"
    ],
    quickPrompts: [
      "What is your pricing for a full website redesign?",
      "Do you guarantee SEO ranking improvements?",
      "We need a custom web app built in Next.js.",
      "Schedule a discovery call with a growth strategist."
    ],
    pricingSuggestion: {
      setupFee: "$750 one-time",
      monthlyRetainer: "$250/month"
    },
    clientOutreachPitch: {
      headline: "White-label AI Lead Qualifier to upsell your agency clients",
      emailSubject: "Partnership: Add $1k/mo recurring revenue per agency client",
      coldEmailBody:
        "Hi {{Name}},\n\nI run an AI automation service that helps digital agencies deliver 24/7 lead-capture bots for their clients without writing code from scratch.\n\nYou can white-label this, add it to your client web builds, and charge your clients $100-$300/mo retainer while we handle the backend.\n\nHere is a live demo you can test right now: {{DemoLink}}\n\nWould you be interested in a quick 5-minute call to see how other agencies are packaging this?",
      linkedInDm:
        "Hi {{Name}} - saw the great client work you're doing at {{Company}}. We build 24/7 lead bots that digital agencies white-label and resell to their clients for recurring retainers. Live preview: {{DemoLink}} - worth a quick chat?",
      followUp3Days:
        "Hi {{Name}} - touching base regarding the white-label lead assistant. We have 2 agency partner spots open this month. Let me know if you'd like a quick demo!"
    }
  }
];

export const AUTOMATION_BLUEPRINT = {
  freeScrapingStack: [
    {
      step: 1,
      title: "Find 20 Targeted Businesses Free (Google Maps)",
      description:
        "Search: 'Dentists in Austin, TX' or 'Property Management in Dallas' or 'Roofing Contractors in Atlanta'.",
      action: "Click on 15-20 business listings. Note down: Business Name, Website URL, Owner/Manager name (found on 'About Us' or 'Team' page)."
    },
    {
      step: 2,
      title: "Get Verified Owner Email Free (Hunter.io or Anymail Finder)",
      description:
        "Hunter.io gives 25 free searches/month. Enter the company domain (e.g., auradental.com). It instantly finds: 'dr.smith@auradental.com' with 98% deliverability score.",
      action: "Zero paid tools needed. You get 25 verified high-value decision maker emails completely free."
    },
    {
      step: 3,
      title: "Send 5 Personalized Pitches Per Day via Gmail",
      description:
        "Do NOT blast 500 emails with automated spam software that gets blocked. Instead, send 5 carefully customized emails per day using the pre-written scripts in this dashboard.",
      action: "Mention their actual business name and include your live demo link. Sending 5 high-quality emails/day = 100 emails/month -> Yields 4 to 8 sales conversations!"
    },
    {
      step: 4,
      title: "Close $300-$500 Deal + $100/mo Maintenance",
      description:
        "Offer a 7-day risk-free pilot. When they see live leads being captured into their inbox, they happily pay the setup fee + monthly retainer.",
      action: "2 clients = $1,000+ immediate cash. 5 clients = $2,500/month predictable recurring income."
    }
  ]
};
