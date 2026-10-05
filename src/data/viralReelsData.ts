export interface ReelScriptItem {
  id: string;
  day: number;
  niche: "ai_money_hacks" | "stoic_motivation" | "tech_life_hacks" | "wealth_facts";
  nicheLabel: string;
  title: string;
  visualHook: string; // The bold text on screen in first 3 seconds
  voiceoverScript: string; // Word-for-word spoken text (25-35s)
  brollKeyword: string;
  brollUrl: string; // Direct link to free vertical videos on Pexels
  caption: string;
  hashtags: string[];
  affiliateTip: string; // How to make money from this specific reel
  targetAudience: string;
  estimatedRpm: string;
}

export const VIRAL_REEL_SCRIPTS: ReelScriptItem[] = [
  {
    id: "reel-day-1",
    day: 1,
    niche: "ai_money_hacks",
    nicheLabel: "AI & Money Websites",
    title: "3 Websites That Feel Illegal to Know in 2026",
    visualHook: "3 WEBSITES THAT FEEL ILLEGAL TO KNOW IN 2026 🤫",
    voiceoverScript:
      "Here are three free websites that feel illegal to know. Number one is Toolify.ai: it tracks every new AI tool that can automate your job for free. Number two is Pexels.com: you can download unlimited 4K videos and music with zero copyright strikes. And number three is Gumroad.com: where people are selling simple two-page PDF checklists for twenty dollars on complete autopilot. Save this video before it gets taken down, and comment 'LIST' to get my free starter guide.",
    brollKeyword: "Dark aesthetic laptop keyboard neon",
    brollUrl: "https://www.pexels.com/search/videos/laptop%20dark/",
    caption:
      "Save this reel before you forget! 🤫 These 3 websites are completely free and 99% of people have never heard of them. Which one is your favorite?",
    hashtags: ["#moneyhacks", "#websitestoknow", "#sidehustleideas", "#passiveincomeonline", "#techtricks", "#workfromhomejobs"],
    affiliateTip: "Pin comment: 'Download my free 10-page AI side hustle checklist (link in bio!)' -> Link to a free Gumroad digital guide with affiliate links inside.",
    targetAudience: "US / UK young professionals & students (Age 18-35)",
    estimatedRpm: "$4.50 - $9.00 / 1,000 views"
  },
  {
    id: "reel-day-2",
    day: 2,
    niche: "stoic_motivation",
    nicheLabel: "Stoic Discipline & Wealth",
    title: "The Harsh 6-Month Rule Nobody Tells You",
    visualHook: "THE HARSH 6-MONTH RULE (STOP WASTING TIME) ⏳",
    voiceoverScript:
      "Nobody is coming to save you. In six months, you can either have six months of excuses, or six months of progress. Stop telling people your goals. Disappear for ninety days, learn a high-income skill, build an audience, and let your results make the noise. The version of you that wins is waiting for you to get uncomfortable. Follow if you're taking action today.",
    brollKeyword: "Rainy city night driving slow motion",
    brollUrl: "https://www.pexels.com/search/videos/city%20rain%20night/",
    caption:
      "6 months from now you will wish you had started today. Silence the noise, lock in, and build in private. Double tap if you agree. 🚀",
    hashtags: ["#stoicism", "#disciplineovermotivation", "#mindsetmatters", "#successquotes", "#wealthmindset", "#hustlehard"],
    affiliateTip: "Put an Amazon affiliate link in bio for popular books: 'Atomic Habits' or 'The Psychology of Money' (earns 10% commission).",
    targetAudience: "US / UK / Canada ambition seekers & entrepreneurs",
    estimatedRpm: "$3.00 - $6.50 / 1,000 views"
  },
  {
    id: "reel-day-3",
    day: 3,
    niche: "tech_life_hacks",
    nicheLabel: "Everyday Tech Hacks",
    title: "Stop Paying for Expensive Software - Use This Instead",
    visualHook: "STOP PAYING FOR EXPENSIVE SOFTWARE IN 2026 ❌",
    voiceoverScript:
      "If you're still paying a monthly subscription for expensive photo editors, project planners, and transcription software, stop right now. Instead of Photoshop, use Photopea.com: it's one hundred percent free in your browser. Instead of expensive audio transcribers, use Riverside.fm free tools. And instead of paying for stock footage, use Coverr.co. Tag a friend who is burning money on monthly subscriptions.",
    brollKeyword: "Modern workspace dual monitors aesthetic",
    brollUrl: "https://www.pexels.com/search/videos/workspace%20desk/",
    caption:
      "Why pay $50/month when these free alternatives exist? Tag a friend who needs to stop wasting money! 💡",
    hashtags: ["#freewebsites", "#techhacks", "#budgeting101", "#productivitytools", "#lifehack", "#usefulwebsites"],
    affiliateTip: "Pin comment: 'I organized all 25 free software alternatives into a free Notion sheet. Link in bio!'",
    targetAudience: "US / UK remote workers, freelancers, college students",
    estimatedRpm: "$5.00 - $11.00 / 1,000 views"
  },
  {
    id: "reel-day-4",
    day: 4,
    niche: "wealth_facts",
    nicheLabel: "Real Estate & Money Truths",
    title: "How the Wealthy Buy Real Estate with $0 of Their Own Money",
    visualHook: "HOW TO BUY RENTAL PROPERTY WITH $0 DOWN 🏠",
    voiceoverScript:
      "This is the exact strategy real estate investors use to acquire multi-family properties without using their own savings. It's called the BRRRR method: Buy, Rehab, Rent, Refinance, Repeat. They find an undervalued property, take a private bridge loan, renovate it to force appreciation, place a verified tenant, and refinance with a bank to pull one hundred percent of their cash back out. Comment 'REAL ESTATE' to see the exact cash flow calculator.",
    brollKeyword: "Luxury modern home exterior drone footage",
    brollUrl: "https://www.pexels.com/search/videos/luxury%20house/",
    caption:
      "Wealthy investors don't keep cash sitting in a bank. They use leverage and forced equity. Have you heard of the BRRRR method before? 👇",
    hashtags: ["#realestateinvesting", "#financialfreedom", "#passiveincome", "#propertyinvestor", "#landlordlife", "#wealthcreation"],
    affiliateTip: "Direct them to your rental leasing lead bot demo link (https://rental-lead-ai.vercel.app/) as an example of tech used by top landlords!",
    targetAudience: "US homeowners, aspiring investors, landlords (High net worth)",
    estimatedRpm: "$8.00 - $16.00 / 1,000 views"
  },
  {
    id: "reel-day-5",
    day: 5,
    niche: "ai_money_hacks",
    nicheLabel: "AI & Money Websites",
    title: "How to Make $50/Day with Free AI Tools in 15 Minutes",
    visualHook: "MAKE $50/DAY WITH THIS FREE AI WORKFLOW ⚡",
    voiceoverScript:
      "Here is a simple side hustle that nobody is talking about. Small local businesses like dentists, roofers, and plumbers are terrible at replying to weekend customer messages. Go to Google Maps, find five businesses with missing chat widgets, and offer to install a free automated lead capture bot on their website. You can set it up in five minutes using free templates, and charge them ninety-nine dollars a month to maintain it. Link in bio for the exact outreach script.",
    brollKeyword: "Coffee cup near keyboard typing fast",
    brollUrl: "https://www.pexels.com/search/videos/coffee%20laptop/",
    caption:
      "Most local businesses lose 40% of their leads on weekends simply because nobody replies. This simple agency model solves that problem instantly. Link in bio for details! 📈",
    hashtags: ["#sidehustle2026", "#howtomakemoneyonline", "#agencyowner", "#digitalmarketingtips", "#remoteincome"],
    affiliateTip: "Pin comment: 'I provide the exact ready-to-copy client outreach email in my bio link.'",
    targetAudience: "US / UK / Global aspiring digital entrepreneurs",
    estimatedRpm: "$6.00 - $12.00 / 1,000 views"
  },
  {
    id: "reel-day-6",
    day: 6,
    niche: "stoic_motivation",
    nicheLabel: "Stoic Discipline & Wealth",
    title: "Marcus Aurelius on Waking Up Early",
    visualHook: "WHY YOU CAN'T WAKE UP EARLY (STREET WISDOM) 🌅",
    voiceoverScript:
      "Two thousand years ago, Roman Emperor Marcus Aurelius wrote: 'At dawn, when you have trouble getting out of bed, tell yourself: I have to go to work as a human being. Was I made for lying under warm blankets?' If the most powerful man in the world had to remind himself to stop being lazy, you have no excuse. Get up, make your bed, and attack the day.",
    brollKeyword: "Sunrise mountain fog cinematic drone",
    brollUrl: "https://www.pexels.com/search/videos/sunrise%20fog/",
    caption:
      "Your bed is comfortable, but your future won't build itself while you're sleeping in. Save this for tomorrow morning! ⏰",
    hashtags: ["#marcusaurelius", "#morningroutine", "#discipline", "#stoicphilosophy", "#mindsetiseverything"],
    affiliateTip: "Affiliate link for minimalist sunrise alarm clock or journals on Amazon.",
    targetAudience: "US / UK productivity enthusiasts",
    estimatedRpm: "$3.50 - $7.00 / 1,000 views"
  },
  {
    id: "reel-day-7",
    day: 7,
    niche: "tech_life_hacks",
    nicheLabel: "Everyday Tech Hacks",
    title: "The Google Search Trick Nobody Taught You in School",
    visualHook: "THE GOOGLE SEARCH TRICK 99% OF PEOPLE DON'T KNOW 🔍",
    voiceoverScript:
      "Stop searching on Google the normal way. If you want to find free PDF books and guides, type your topic followed by 'filetype:pdf'. If you want to search inside a specific university website, type 'site:edu'. And if you want to bypass paywalled articles, put 'cache:' before the web address. Share this with a student or colleague who needs to see this.",
    brollKeyword: "Typing on modern illuminated keyboard close up",
    brollUrl: "https://www.pexels.com/search/videos/typing%20keyboard/",
    caption:
      "Work smarter, not harder. These 3 search modifiers will save you hours of research time. 📌",
    hashtags: ["#googletips", "#studenthacks", "#techshortcuts", "#studygram", "#researchhacks"],
    affiliateTip: "Recommend an affordable VPN or cloud storage tool with an affiliate link in bio.",
    targetAudience: "Students, researchers, office workers in US & UK",
    estimatedRpm: "$4.00 - $8.00 / 1,000 views"
  },
  {
    id: "reel-day-8",
    day: 8,
    niche: "wealth_facts",
    nicheLabel: "Real Estate & Money Truths",
    title: "Assets vs. Liabilities Explained in 20 Seconds",
    visualHook: "POOR PEOPLE BUY LIABILITIES. THE WEALTHY BUY ASSETS 💰",
    voiceoverScript:
      "Most people think their car and their designer clothes are assets. They are not. An asset is anything that puts money into your pocket every single month while you sleep: index funds, dividend stocks, rental properties, and automated digital products. A liability is anything that takes money out of your pocket: car loans, credit card balances, and subscriptions you forgot to cancel. Switch your focus to buying cash flow.",
    brollKeyword: "High speed luxury car night city highway",
    brollUrl: "https://www.pexels.com/search/videos/luxury%20car/",
    caption:
      "If it takes money out of your pocket every month, it's a liability. What is your favorite income-generating asset? Comment below! 📊",
    hashtags: ["#financialliteracy", "#richdadpoordad", "#moneytips", "#investingforbeginners", "#smartmoney"],
    affiliateTip: "Affiliate link to Robinhood / TradingView / Acorns referral link ($5 - $30 per free signup).",
    targetAudience: "US/UK investors, beginner savers",
    estimatedRpm: "$6.00 - $14.00 / 1,000 views"
  },
  {
    id: "reel-day-9",
    day: 9,
    niche: "ai_money_hacks",
    nicheLabel: "AI & Money Websites",
    title: "How to Build a Faceless Brand with Zero Video Editing",
    visualHook: "CREATE 30 REELS IN 1 HOUR WITHOUT SHOWING YOUR FACE 🎬",
    voiceoverScript:
      "You don't need a thousand dollar camera or video editing skills to create viral content. Here is the secret three-step formula: Step one: Grab free aesthetic 4K background videos from Pexels. Step two: Write a 30-second script with Gemini or ChatGPT. Step three: Put it into CapCut and click 'Auto Text-to-Speech' and 'Auto-Captions'. It takes three minutes per video. Follow for daily automated business workflows.",
    brollKeyword: "Cinematic dark rain on window city lights",
    brollUrl: "https://www.pexels.com/search/videos/rain%20window/",
    caption:
      "No camera? No microphone? No editing experience? You can still build an audience in 2026. Here is the exact stack I use every day. 🚀",
    hashtags: ["#facelesscontent", "#contentcreatorhacks", "#capcutvideo", "#reelsgrowth", "#aiworkflows"],
    affiliateTip: "Pin comment: 'The exact tools I use are linked in my bio!' (Canva/CapCut affiliate).",
    targetAudience: "Aspiring content creators looking to monetize on Facebook/TikTok",
    estimatedRpm: "$4.50 - $10.00 / 1,000 views"
  },
  {
    id: "reel-day-10",
    day: 10,
    niche: "stoic_motivation",
    nicheLabel: "Stoic Discipline & Wealth",
    title: "Don't Waste Your 20s and 30s Living for the Weekend",
    visualHook: "STOP LIVING ONLY FOR FRIDAY NIGHT 🛑",
    voiceoverScript:
      "If you spend Monday through Friday complaining about your life, just to spend Saturday and Sunday getting drunk and scrolling social media, you are trapped in a loop. Five days of misery for two days of escape is a bad trade. Use your weekends to build a life you don't need a vacation from. One hour of focused effort every Saturday will change your entire year.",
    brollKeyword: "Man walking alone misty forest morning path",
    brollUrl: "https://www.pexels.com/search/videos/foggy%20forest/",
    caption:
      "Your weekends are where your future is built. Don't sacrifice your potential for temporary comfort. Double tap if you're working on yourself. 🐺",
    hashtags: ["#disciplineovermotivation", "#mindsetshift", "#weekendhustle", "#selfgrowth", "#focusongrowth"],
    affiliateTip: "Pin link to daily planner or productivity journal.",
    targetAudience: "US/UK young adults seeking career/life change",
    estimatedRpm: "$3.50 - $7.50 / 1,000 views"
  },
  {
    id: "reel-day-11",
    day: 11,
    niche: "tech_life_hacks",
    nicheLabel: "Everyday Tech Hacks",
    title: "Secret Windows & Mac Shortcuts That Save 10 Hours a Week",
    visualHook: "COMPUTER SHORTCUTS THAT FEEL LIKE MAGIC 💻✨",
    voiceoverScript:
      "Here are three computer shortcuts you should be using every single day. On Windows, press Windows key plus V: this opens your clipboard history so you can paste things you copied an hour ago. On Mac, press Command plus Shift plus 4 plus Spacebar: this takes a clean screenshot of a single window without messy backgrounds. And on any browser, press Control plus Shift plus T to instantly reopen the tab you accidentally closed.",
    brollKeyword: "Hands typing smooth keyboard slow motion",
    brollUrl: "https://www.pexels.com/search/videos/laptop%20working/",
    caption:
      "Stop doing things the hard way! Which of these shortcuts did you not know about? ⌨️",
    hashtags: ["#computertricks", "#windows11", "#mactips", "#officehacks", "#productivityhacks"],
    affiliateTip: "Promote an ergonomic mouse or desk accessory via Amazon Associates.",
    targetAudience: "US/UK remote workers & corporate employees",
    estimatedRpm: "$5.00 - $9.50 / 1,000 views"
  },
  {
    id: "reel-day-12",
    day: 12,
    niche: "wealth_facts",
    nicheLabel: "Real Estate & Money Truths",
    title: "Why The Bank Loves Debt and Why You Should Too",
    visualHook: "THE SECRET DIFFERENCE BETWEEN GOOD DEBT & BAD DEBT 🏦",
    voiceoverScript:
      "The poor use debt to buy things that lose value: flat-screen televisions, cars, and vacations. The rich use debt to buy assets that pay off the debt for them. When an investor borrows one million dollars at six percent interest to buy an apartment building that generates ten percent cash flow, the tenants pay off the mortgage, the property value rises, and the cash flow is tax-advantaged. Learn how money actually works.",
    brollKeyword: "Modern skyscraper financial district glass towers",
    brollUrl: "https://www.pexels.com/search/videos/skyscrapers/",
    caption:
      "Good debt makes you richer. Bad debt makes the bank richer. Understanding this simple rule changes your financial trajectory forever. 📈",
    hashtags: ["#realestatetruths", "#taxstrategy", "#gooddebt", "#wealthmindset", "#financialeducation"],
    affiliateTip: "Direct to your rental management calculator & agency demo widget.",
    targetAudience: "US/UK high-income earners and aspiring landlords",
    estimatedRpm: "$7.50 - $15.00 / 1,000 views"
  },
  {
    id: "reel-day-13",
    day: 13,
    niche: "ai_money_hacks",
    nicheLabel: "AI & Money Websites",
    title: "The 3 Secret AI Prompts to Write Viral Hooks",
    visualHook: "STEAL MY 3 SECRET VIRAL HOOK PROMPTS 🤫🔥",
    voiceoverScript:
      "Stop struggling with video ideas. Here are three prompts you can copy right now. Prompt one: 'Give me five contrarian opinions about my niche that challenge common advice.' Prompt two: 'Write a hook that triggers curiosity by revealing an uncommon mistake 90 percent of people make.' And prompt three: 'Give me a 3-step breakdown of how a beginner went from zero to mastery in 30 days.' Comment 'PROMPT' and I will DM you all fifty templates.",
    brollKeyword: "Close up code on screen or terminal matrix style",
    brollUrl: "https://www.pexels.com/search/videos/code%20screen/",
    caption:
      "The first 3 seconds determine 80% of your video views. Save this reel to use these exact prompts for your next post! 📝",
    hashtags: ["#chatgptprompts", "#viralhooks", "#socialmediagrowth", "#contentstrategy", "#creatorsontiktok"],
    affiliateTip: "Pin comment with link to Gumroad prompt pack ($5 purchase with instant delivery).",
    targetAudience: "Online creators, marketers, freelancers",
    estimatedRpm: "$5.50 - $11.00 / 1,000 views"
  },
  {
    id: "reel-day-14",
    day: 14,
    niche: "stoic_motivation",
    nicheLabel: "Stoic Discipline & Wealth",
    title: "The Law of Unseen Work",
    visualHook: "THEY ONLY CHEER FOR YOU AT THE FINISH LINE 🏆",
    voiceoverScript:
      "Nobody cares when you wake up at five in the morning. Nobody cares when you're studying on a Friday night while your friends are out partying. Nobody cares about the hours of unseen work in the dark. But the moment you succeed, everyone will ask: 'How did you get so lucky?' Let them call it luck. Just keep putting in the reps.",
    brollKeyword: "Boxer shadow boxing gym dark aesthetic",
    brollUrl: "https://www.pexels.com/search/videos/boxing%20gym/",
    caption:
      "They judge the outcome, but the magic happens in the silence. Put your head down and let your work speak for itself. 👊",
    hashtags: ["#workethic", "#hardworkbeatstalent", "#silentmoves", "#relentless", "#motivationdaily"],
    affiliateTip: "Amazon fitness / gym gear or audiobooks affiliate link.",
    targetAudience: "US/UK gymgoers and entrepreneurs",
    estimatedRpm: "$3.50 - $6.50 / 1,000 views"
  },
  {
    id: "reel-day-15",
    day: 15,
    niche: "tech_life_hacks",
    nicheLabel: "Everyday Tech Hacks",
    title: "How to Clear Your Phone's Hidden Junk Files in 30 Seconds",
    visualHook: "FREE UP 20GB ON YOUR PHONE RIGHT NOW 📱⚡",
    voiceoverScript:
      "Is your phone running slow and constantly complaining about storage? Here is the hidden fix. If you use Telegram or WhatsApp, go into Settings, Storage and Data, and tap 'Manage Storage'. You will see gigabytes of cached media you haven't opened in months. Clear the cache—it doesn't delete your photos from the cloud, but it frees up fifteen to twenty gigabytes instantly. Share this with someone whose phone is always full.",
    brollKeyword: "Smartphone held in hand scrolling modern UI",
    brollUrl: "https://www.pexels.com/search/videos/smartphone%20hand/",
    caption:
      "Instant phone speed boost! Clear that hidden cache and reclaim 10GB+ of storage. 🚀",
    hashtags: ["#phonetricks", "#iphonetips", "#androidhacks", "#techsecrets", "#storagespace"],
    affiliateTip: "Affiliate link for fast backup USB flash drive or cloud storage.",
    targetAudience: "General US/UK mobile users",
    estimatedRpm: "$4.00 - $7.50 / 1,000 views"
  },
  {
    id: "reel-day-16",
    day: 16,
    niche: "wealth_facts",
    nicheLabel: "Real Estate & Money Truths",
    title: "The $5 Daily Habit That Costs You $150,000",
    visualHook: "THE $5 DAILY HABIT DRAINING YOUR RETIREMENT ☕📉",
    voiceoverScript:
      "I'm not going to tell you to stop buying coffee. But here is the math you need to know. If you take that five dollars a day—that's one hundred and fifty dollars a month—and invest it into the S&P 500 averaging ten percent annual returns, in thirty years that small change turns into over three hundred and forty thousand dollars. Small daily discipline creates massive long-term freedom. Start investing early.",
    brollKeyword: "Pouring coffee espresso cup close up slow mo",
    brollUrl: "https://www.pexels.com/search/videos/coffee%20pour/",
    caption:
      "It’s never about the coffee—it’s about the opportunity cost of compound interest. Start investing small amounts consistently! 📈",
    hashtags: ["#compoundinterest", "#investing101", "#personalfinance", "#wealthbuilding", "#financialindependence"],
    affiliateTip: "Referral links to investment apps (Acorns / Public / M1 Finance).",
    targetAudience: "US/UK young adults and beginner investors",
    estimatedRpm: "$6.50 - $13.00 / 1,000 views"
  },
  {
    id: "reel-day-17",
    day: 17,
    niche: "ai_money_hacks",
    nicheLabel: "AI & Money Websites",
    title: "How to Turn Articles into YouTube Shorts in 60 Seconds",
    visualHook: "TURN ANY BLOG POST INTO A VIRAL VIDEO IN 60 SECONDS ⏱️",
    voiceoverScript:
      "Did you know you can take any top-ranking Google article and repurpose it into a viral short in less than a minute? Copy the article link, paste it into an AI summarizer, extract the top three punchlines, drop them over royalty-free cinematic b-roll from Pixabay, and add trending background audio. You just created a high-value piece of short-form content with zero original video recording. Follow for more content shortcuts.",
    brollKeyword: "Abstract digital particles waves technology",
    brollUrl: "https://www.pexels.com/search/videos/technology%20abstract/",
    caption:
      "Content repurposing is how the top creators produce 5 videos a day without burning out. Try this workflow today! 💡",
    hashtags: ["#contentstrategy", "#repurposingcontent", "#shortscreator", "#reelsgrowth", "#digitalmarketer"],
    affiliateTip: "Pin comment: 'The full step-by-step checklist is in my bio link.'",
    targetAudience: "Creators and digital marketers in US & Europe",
    estimatedRpm: "$5.00 - $10.00 / 1,000 views"
  },
  {
    id: "reel-day-18",
    day: 18,
    niche: "stoic_motivation",
    nicheLabel: "Stoic Discipline & Wealth",
    title: "Seneca on the Shortness of Life",
    visualHook: "YOU ARE NOT SHORT OF TIME. YOU JUST WASTE IT ⏳",
    voiceoverScript:
      "Seneca wrote over two thousand years ago: 'It is not that we have a short time to live, but that we waste a lot of it. Life is long enough, and a sufficiently generous estimate has been given to us for the highest achievements, if it were all well invested.' Stop waiting for the perfect day. The perfect day is today. Get to work.",
    brollKeyword: "Hourglass sand falling slow motion macro",
    brollUrl: "https://www.pexels.com/search/videos/hourglass/",
    caption:
      "Stop scrolling and start building. Time is the only asset you cannot buy back. Double tap if this resonated. ⏳",
    hashtags: ["#seneca", "#stoicism", "#timemanagement", "#philosophyquotes", "#motivationoftheday"],
    affiliateTip: "Promote classic books: 'Letters from a Stoic' by Seneca on Amazon.",
    targetAudience: "US/UK thinkers, readers, and high achievers",
    estimatedRpm: "$3.50 - $7.00 / 1,000 views"
  },
  {
    id: "reel-day-19",
    day: 19,
    niche: "tech_life_hacks",
    nicheLabel: "Everyday Tech Hacks",
    title: "Secret Airline Ticket Trick to Fly for Half Price",
    visualHook: "HOW TO BOOK CHEAP FLIGHTS 99% OF PEOPLE MISS ✈️",
    voiceoverScript:
      "Here is how frequent travelers find ridiculously cheap plane tickets. First, open your browser in incognito mode so airline algorithms don't track your search history. Second, use Google Flights and leave your destination blank—click 'Explore' on the world map to see the lowest fares globally. Third, set your departure day to Tuesday or Wednesday to avoid weekend surge pricing. Save this for your next holiday.",
    brollKeyword: "Airplane wing sunset clouds aerial view",
    brollUrl: "https://www.pexels.com/search/videos/airplane%20sunset/",
    caption:
      "Never overpay for flights again! Save this reel for the next time you plan a vacation. 🛫",
    hashtags: ["#travelhacks", "#cheapflights", "#googleflights", "#budgettravel", "#traveltipsandtricks"],
    affiliateTip: "Affiliate link for travel credit card referral or luggage packing cubes.",
    targetAudience: "US/UK travelers and vacation planners",
    estimatedRpm: "$4.50 - $8.50 / 1,000 views"
  },
  {
    id: "reel-day-20",
    day: 20,
    niche: "wealth_facts",
    nicheLabel: "Real Estate & Money Truths",
    title: "Why Wealthy People Never Keep Cash in Checking Accounts",
    visualHook: "WHY YOUR CHECKING ACCOUNT IS MAKING YOU POOR ⚠️",
    voiceoverScript:
      "Keeping more than three months of living expenses sitting in a traditional checking account is a guaranteed way to lose wealth. With inflation at three to four percent, one hundred thousand dollars sitting idle in a big bank loses three thousand dollars in purchasing power every single year. The wealthy sweep their emergency cash into High-Yield Savings Accounts earning four to five percent, or short-term treasury bills. Make your money work as hard as you do.",
    brollKeyword: "Stack of US dollar bills counting currency",
    brollUrl: "https://www.pexels.com/search/videos/money%20cash/",
    caption:
      "Don't let inflation quietly rob your hard-earned money. Keep only what you need for monthly bills in checking! 💵",
    hashtags: ["#hysa", "#moneymanagement", "#inflationproof", "#savingstips", "#smartinvesting"],
    affiliateTip: "Affiliate links to High-Yield Savings Accounts or brokerage accounts.",
    targetAudience: "US/UK savers and working professionals",
    estimatedRpm: "$7.00 - $15.00 / 1,000 views"
  },
  {
    id: "reel-day-21",
    day: 21,
    niche: "ai_money_hacks",
    nicheLabel: "AI & Money Websites",
    title: "Sell Digital Planners with Zero Printing or Shipping",
    visualHook: "HOW TO SELL DIGITAL PRODUCTS FOR 100% PROFIT 📦❌",
    voiceoverScript:
      "You don't need inventory to start an online store. Go to Canva.com, search for free 'Daily Planner' or 'Budget Tracker' templates, customize the colors and fonts in ten minutes, and export it as a high-resolution PDF. Upload it to Etsy or Gumroad for seven dollars. Every time someone buys, the platform delivers the file automatically. You do the work once, and earn passive income forever. Comment 'DIGITAL' for the template guide.",
    brollKeyword: "Cozy desk iPad with Apple pencil drawing",
    brollUrl: "https://www.pexels.com/search/videos/ipad%20desk/",
    caption:
      "Digital products have zero shipping costs, zero inventory, and 95% profit margins. Have you tried selling digital files yet? 👇",
    hashtags: ["#digitalproducts", "#etsyseller", "#passiveincomestream", "#canvadesign", "#sidehustleideas"],
    affiliateTip: "Pin comment: 'Get my free digital planner design template via the link in my bio!'",
    targetAudience: "US/UK stay-at-home parents, students, side hustlers",
    estimatedRpm: "$5.00 - $11.00 / 1,000 views"
  },
  {
    id: "reel-day-22",
    day: 22,
    niche: "stoic_motivation",
    nicheLabel: "Stoic Discipline & Wealth",
    title: "Stop Complaining About Things You Cannot Control",
    visualHook: "THE ONLY TWO THINGS YOU ACTUALLY CONTROL 🧠",
    voiceoverScript:
      "Epictetus, the former slave who became one of history's greatest philosophers, taught that there are only two things in your control: your own actions and your own thoughts. You cannot control the weather, the economy, or how other people treat you. The moment you stop wasting mental energy on things outside your control, you become invincible. Focus on your effort, ignore the rest.",
    brollKeyword: "Ocean waves crashing on dark rocks dramatic",
    brollUrl: "https://www.pexels.com/search/videos/ocean%20waves/",
    caption:
      "Master your thoughts and your actions. Let everything else take care of itself. Drop a 💯 if you needed this today.",
    hashtags: ["#epictetus", "#innerpeace", "#mindsetcoach", "#stoicprinciples", "#personalgrowth"],
    affiliateTip: "Amazon link to 'The Daily Stoic' by Ryan Holiday.",
    targetAudience: "US/UK personal development audience",
    estimatedRpm: "$3.50 - $6.50 / 1,000 views"
  },
  {
    id: "reel-day-23",
    day: 23,
    niche: "tech_life_hacks",
    nicheLabel: "Everyday Tech Hacks",
    title: "How to Stop Spam Calls Forever on iPhone & Android",
    visualHook: "BLOCK ALL SPAM CALLS IN 10 SECONDS 🚫📞",
    voiceoverScript:
      "Tired of getting five robocalls every afternoon? Here is how to silence them instantly. On iPhone, go to Settings, tap Phone, scroll down and turn on 'Silence Unknown Callers'. Any number not in your contacts goes straight to voicemail without ringing. On Android, open the Phone app, tap the three dots, go to Settings, Caller ID and Spam, and toggle on 'Filter Spam Calls'. Share this with your parents right now.",
    brollKeyword: "Holding smartphone ringing on desk incoming call",
    brollUrl: "https://www.pexels.com/search/videos/phone%20screen/",
    caption:
      "Silence those annoying spam callers once and for all! Tag someone who gets 10 robocalls a day. 🔇",
    hashtags: ["#phonehacks", "#spamcalls", "#androidsettings", "#iphonetipsandtricks", "#techlifehack"],
    affiliateTip: "Affiliate link for privacy tools (Incogni / DeleteMe data removal).",
    targetAudience: "Mass US/UK smartphone users of all ages",
    estimatedRpm: "$4.00 - $8.00 / 1,000 views"
  },
  {
    id: "reel-day-24",
    day: 24,
    niche: "wealth_facts",
    nicheLabel: "Real Estate & Money Truths",
    title: "Why Renting Isn't 'Throwing Money Away'",
    visualHook: "IS BUYING A HOUSE ACTUALLY A TRAP? 🏡🤔",
    voiceoverScript:
      "Society tells you that renting is throwing money away and buying a home is the ultimate financial goal. But when you buy, your mortgage is the absolute minimum you will pay. You have property taxes, HOA fees, mortgage interest, and expensive roof repairs that add zero equity. When you rent, your monthly payment is the maximum you will pay, and you can invest the difference into high-growth assets. Choose freedom over tradition.",
    brollKeyword: "Modern apartment interior clean minimalist living room",
    brollUrl: "https://www.pexels.com/search/videos/modern%20apartment/",
    caption:
      "Renting buys flexibility and caps your maintenance liability. What do you think: rent or buy in 2026? Let’s debate in the comments! 👇",
    hashtags: ["#rentvsbuy", "#realestatemyths", "#homeownership", "#wealthstrategy", "#financialdecisions"],
    affiliateTip: "Link to your rental leasing interactive platform demo (https://rental-lead-ai.vercel.app/).",
    targetAudience: "US/UK millennials and Gen Z facing housing market realities",
    estimatedRpm: "$6.50 - $13.50 / 1,000 views"
  },
  {
    id: "reel-day-25",
    day: 25,
    niche: "ai_money_hacks",
    nicheLabel: "AI & Money Websites",
    title: "The 3 High-Income Skills You Can Learn for Free in 30 Days",
    visualHook: "3 SKILLS THAT PAY $5,000/MONTH (LEARN FOR FREE) 🎓💼",
    voiceoverScript:
      "You don't need a four-year college degree to make great money. Here are three high-income skills you can learn on YouTube for free: Number one: Prompt engineering and AI automation for small businesses. Number two: Short-form video editing using CapCut and Premiere. And number three: Lead generation using Google Maps and email outreach. Spend one hour every evening learning one of these, and in thirty days you can land your first freelance client.",
    brollKeyword: "Person studying writing in notebook cafe laptop",
    brollUrl: "https://www.pexels.com/search/videos/studying%20cafe/",
    caption:
      "All the information you need to build a high-income freelance career is free online. Pick one skill and master it this month! 📚",
    hashtags: ["#highincomeskills", "#freelancingtips", "#selfeducation", "#workfromhomejobs", "#careeradvice"],
    affiliateTip: "Skillshare or Coursera affiliate link in bio (earns $10 - $25 per trial signup).",
    targetAudience: "US/UK career switchers and freelancers",
    estimatedRpm: "$5.50 - $11.50 / 1,000 views"
  },
  {
    id: "reel-day-26",
    day: 26,
    niche: "stoic_motivation",
    nicheLabel: "Stoic Discipline & Wealth",
    title: "The Power of Not Reacting",
    visualHook: "THE QUIET POWER OF EMOTIONAL CONTROL 🧘‍♂️⚡",
    voiceoverScript:
      "When someone insults you or tries to provoke you, your immediate reaction is their victory. The moment you get angry, you hand your power over to them on a silver platter. Master the art of the pause. Look at them, say nothing, and let their disrespect bounce right off you. True strength is not loud. True strength is calm in the middle of chaos.",
    brollKeyword: "Lone man standing overlooking misty canyon",
    brollUrl: "https://www.pexels.com/search/videos/mountain%20mist/",
    caption:
      "Your calm is your superpower. Never let an emotional person pull you into their storm. Double tap if you practice self-control. 🌊",
    hashtags: ["#emotionalintelligence", "#calmmind", "#innerstrength", "#selfmastery", "#stoicwisdom"],
    affiliateTip: "Meditation app (Headspace / Calm) affiliate link or audio guide.",
    targetAudience: "US/UK adults seeking mental clarity and stress relief",
    estimatedRpm: "$3.50 - $7.00 / 1,000 views"
  },
  {
    id: "reel-day-27",
    day: 27,
    niche: "tech_life_hacks",
    nicheLabel: "Everyday Tech Hacks",
    title: "How to Read Any Book in 15 Minutes for Free",
    visualHook: "HOW TO READ 50 BOOKS A YEAR IN 15 MINS A DAY 📚⚡",
    voiceoverScript:
      "If you want to read more non-fiction books but don't have hours to sit down, here is the secret method top executives use. Look up book summaries on platforms like Shortform or Blinkist, or ask AI: 'Give me the top five actionable takeaways from the book with real-world examples.' You get the golden nuggets without the two hundred pages of filler stories. Follow for more accelerated learning tricks.",
    brollKeyword: "Bookshelf library warm lighting turning pages",
    brollUrl: "https://www.pexels.com/search/videos/books%20library/",
    caption:
      "Extract the wisdom, skip the filler. How many books have you read this year? 📖",
    hashtags: ["#readinghacks", "#bookstagram", "#speedreading", "#learnfast", "#bookrecommendations"],
    affiliateTip: "Blinkist or Audible affiliate link in bio (free trial earns $5 - $10).",
    targetAudience: "US/UK lifelong learners and professionals",
    estimatedRpm: "$4.50 - $9.00 / 1,000 views"
  },
  {
    id: "reel-day-28",
    day: 28,
    niche: "wealth_facts",
    nicheLabel: "Real Estate & Money Truths",
    title: "The 50/30/20 Budgeting Rule That Actually Works",
    visualHook: "HOW TO BUDGET YOUR PAYCHECK LIKE A MILLIONAIRE 💳",
    voiceoverScript:
      "If you never know where your paycheck disappears at the end of the month, try the 50/30/20 rule. Fifty percent of your take-home pay goes to essential needs: rent, groceries, and utilities. Thirty percent goes to wants: dining out and entertainment. And twenty percent goes directly into savings, debt payoff, and investments before you spend a single dollar. Pay yourself first.",
    brollKeyword: "Modern bank building interior financial ledger",
    brollUrl: "https://www.pexels.com/search/videos/finance%20accounting/",
    caption:
      "A simple budget is better than an unrealistic one. Pay yourself first before spending on lifestyle! 💰",
    hashtags: ["#budgeting101", "#503020rule", "#paycheckbudgeting", "#moneymindset", "#savemoneytips"],
    affiliateTip: "Pin link to free Google Sheet budget tracker template on Gumroad.",
    targetAudience: "US/UK young earners and families",
    estimatedRpm: "$6.00 - $12.50 / 1,000 views"
  },
  {
    id: "reel-day-29",
    day: 29,
    niche: "ai_money_hacks",
    nicheLabel: "AI & Money Websites",
    title: "How to Build a $1,000/Month Niche Newsletter",
    visualHook: "THE LAZY BUSINESS MODEL MAKING $1,000/MONTH 📧💰",
    voiceoverScript:
      "Here is one of the lowest-stress online businesses you can start today: a curated niche newsletter on Beehiiv or Substack. Pick a topic you love—like AI tools, real estate deals, or personal finance. Once a week, send a five-bullet email summarizing the best news. Once you hit two thousand free subscribers, sponsors will pay you fifty to one hundred dollars per issue to place a banner ad. Link in bio for the complete launch blueprint.",
    brollKeyword: "Typing email newsletter on modern laptop desk",
    brollUrl: "https://www.pexels.com/search/videos/writing%20desk/",
    caption:
      "Email subscribers are an audience you actually own, independent of social media algorithms. Have you started your newsletter yet? 📩",
    hashtags: ["#emailmarketing", "#beehiiv", "#newsletters", "#onlinebusinessmodel", "#solopreneur"],
    affiliateTip: "Beehiiv affiliate link (pays 50% recurring commission on paid users).",
    targetAudience: "Digital writers, entrepreneurs, content creators",
    estimatedRpm: "$5.00 - $10.50 / 1,000 views"
  },
  {
    id: "reel-day-30",
    day: 30,
    niche: "stoic_motivation",
    nicheLabel: "Stoic Discipline & Wealth",
    title: "Day 30: The Person You Became",
    visualHook: "30 DAYS OF SHOWING UP HAS CHANGED YOU 🏁🔥",
    voiceoverScript:
      "If you've been showing up every single day for the past thirty days, look back at where you started. Most people quit after day three. You didn't. Consistency is the great filter that separates dreamers from builders. Keep your head down, keep executing, and remember: you don't need easy. You just need possible. Congratulations on finishing day thirty. Now, let's keep going.",
    brollKeyword: "Runner reaching mountain summit victory sunrise",
    brollUrl: "https://www.pexels.com/search/videos/mountain%20top/",
    caption:
      "Consistency beats talent every single day. Celebrate how far you’ve come, but never get complacent. Let's attack the next 30 days together! 🚀",
    hashtags: ["#consistencyiskey", "#30daychallenge", "#dontquit", "#relentlesspursuit", "#successmindset"],
    affiliateTip: "Link to your primary digital brand or agency offer in bio.",
    targetAudience: "US/UK self-improvement and ambition community",
    estimatedRpm: "$4.00 - $8.00 / 1,000 views"
  }
];

export interface StepGuide {
  step: number;
  title: string;
  duration: string;
  description: string;
  actionItems: string[];
  proTip: string;
}

export const ZERO_EDITING_WORKFLOW: StepGuide[] = [
  {
    step: 1,
    title: "Grab Free Vertical B-Roll Video (60 Seconds)",
    duration: "1 min",
    description: "You do NOT need a camera or your face. We use royalty-free 4K vertical aesthetic video clips.",
    actionItems: [
      "Click the 'Open Free B-Roll Video' link on any script card in this tab.",
      "Pexels.com or Pixabay will open with pre-filtered vertical video clips (dark luxury, rainy city, typing on laptop, etc.).",
      "Click the green 'Download' button on any 10-to-15 second video clip to your phone or computer. (100% Free, No Copyright)"
    ],
    proTip: "Search for 'dark aesthetic', 'city rain night', or 'modern office'. Videos with slow, smooth motion hold attention longest."
  },
  {
    step: 2,
    title: "Auto-Generate US Voiceover in CapCut (90 Seconds)",
    duration: "1.5 mins",
    description: "You do NOT need a microphone. CapCut will read the script out loud in a crisp, native US/UK accent for free.",
    actionItems: [
      "Open the free CapCut app (on your smartphone or PC at capcut.com).",
      "Click 'New Project' and import the vertical video you downloaded in Step 1.",
      "Tap 'Text' ➔ 'Add Text', and paste the 'Word-for-Word Voiceover Script' from this tab.",
      "Tap the text layer and select 'Text to Speech'.",
      "Pick a popular native voice: 'Adam' (deep storytelling voice), 'American Male', or 'Jessie' (energetic female). CapCut instantly generates the audio track!"
    ],
    proTip: "Once the voice is generated, you can delete the raw text box—the clear audio track stays on your timeline!"
  },
  {
    step: 3,
    title: "1-Click Auto-Captions (30 Seconds)",
    duration: "30 secs",
    description: "80% of US viewers watch reels with sound muted while at work or commuting. Captions are mandatory.",
    actionItems: [
      "In CapCut, tap 'Captions' (or 'Auto Captions') ➔ click 'Generate'.",
      "In 5 seconds, CapCut automatically writes and animates every spoken word on screen.",
      "Select a high-contrast style: Choose bold white text with a yellow keyword highlight or black outline.",
      "Position the captions in the center of the screen so they don't get covered by Facebook's bottom buttons."
    ],
    proTip: "Make sure the top '3-Second Visual Hook' (e.g., '3 WEBSITES THAT FEEL ILLEGAL TO KNOW') is placed at the top of the video in bold yellow text for the entire duration!"
  },
  {
    step: 4,
    title: "Export & Post to Facebook in Professional Mode (60 Seconds)",
    duration: "1 min",
    description: "Upload as a Facebook Reel & YouTube Short to reach US and UK viewers.",
    actionItems: [
      "Click 'Export' in CapCut (choose 1080p, 30fps).",
      "Open your Facebook App ➔ go to your Profile or Page ➔ ensure 'Professional Mode' is turned ON (Settings ➔ Turn on Professional Mode).",
      "Tap 'Create Reel' ➔ select your exported video.",
      "Paste the ready-made Caption & Hashtags from this tab.",
      "Tap 'Share Reel'!"
    ],
    proTip: "Post between 6:00 PM and 9:00 PM US Eastern Time (US peak leisure hours) so your reel hits American feeds immediately."
  }
];

export const REVENUE_MILESTONES = [
  {
    phase: "Phase 1: Days 1 to 14",
    title: "Algorithm Warming & Initial Testing",
    viewsExpected: "150 to 1,500 views per reel",
    revenueExpected: "$0 - $25 (Occasional affiliate link click)",
    whatHappens:
      "Facebook's recommendation engine tests your reels with small test clusters. It reads your captions and audio to categorize you in US/UK interest categories. Focus only on posting 1 video every single day without checking view counts every hour."
  },
  {
    phase: "Phase 2: Days 15 to 30",
    title: "First Viral Breakout & Affiliate Earnings",
    viewsExpected: "10,000 to 150,000+ views on winning reels",
    revenueExpected: "$50 to $250 / month",
    whatHappens:
      "Typically, 2 to 3 reels out of 30 catch a wave with high completion rates. Viewers start clicking the affiliate link in your pinned comment or bio (free tools, digital guides). You make your first digital commissions directly to PayPal or your bank."
  },
  {
    phase: "Phase 3: Month 2 & Beyond",
    title: "Facebook Monetization Payouts Unlocked",
    viewsExpected: "250,000 to 1,000,000+ monthly views",
    revenueExpected: "$300 to $1,500+ / month",
    whatHappens:
      "Facebook invites your page to the Content Monetization / Performance Bonus program. Payouts for US/UK viewers average $0.50 to $2.00 per 1,000 views. Combined with affiliate sponsorships, you generate reliable monthly income on autopilot."
  }
];
