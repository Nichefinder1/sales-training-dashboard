/* ============================================================
   Nichefinders AI — Sales Training Academy
   Dashboard Application
   ============================================================ */

;(function () {
  'use strict';

  // ─── Multi-user: resolve active user from ?user= param ────
  const BASE_KEY = 'nf-sales-training';
  function getUser () {
    return window._clerkUsername || new URLSearchParams(window.location.search).get('user') || 'default';
  }
  function storageKey () { return BASE_KEY + ':' + getUser(); }
  function loadUser (user) {
    try { return JSON.parse(localStorage.getItem(BASE_KEY + ':' + user)) || {}; } catch { return {}; }
  }

  // ─── Storage helpers ───────────────────────────────────────
  function load () { try { return JSON.parse(localStorage.getItem(storageKey())) || {}; } catch { return {}; } }
  function save (d) { localStorage.setItem(storageKey(), JSON.stringify(d)); }
  function state () {
    const d = load();
    if (!d.modules) d.modules = {};
    if (!d.quizScores) d.quizScores = {};
    if (!d.scenarios) d.scenarios = {};
    if (!d.name) d.name = '';
    if (!d.startDate) d.startDate = new Date().toISOString();
    save(d);
    return d;
  }

  // ─── Data ──────────────────────────────────────────────────

  const WEEKS = [
    {
      num: 1,
      title: 'Foundations',
      subtitle: 'AI Fundamentals + Product Knowledge',
      modules: [
        { id: 'w1m1', label: 'What Is AI?' },
        { id: 'w1m2', label: 'AI for Business' },
        { id: 'w1m3', label: 'The Nichefinders Difference' },
        { id: 'w1m4', label: 'The AI OS Product' },
        { id: 'w1m5', label: 'Industry Applications' },
        { id: 'w1ex', label: 'Exercise: 60-Second Pitch' }
      ]
    },
    {
      num: 2,
      title: 'Psychology & Customer',
      subtitle: 'Sales Psychology + Customer Understanding',
      modules: [
        { id: 'w2m1', label: 'Psychology of Selling' },
        { id: 'w2m2', label: 'How SMB Owners Buy' },
        { id: 'w2m3', label: 'Ideal Customer Profile' },
        { id: 'w2m4', label: 'Pain-to-Solution Mapping' },
        { id: 'w2m5', label: 'Disqualification Signals' },
        { id: 'w2ex', label: 'Exercise: Profile Prospects' }
      ]
    },
    {
      num: 3,
      title: 'Outreach & Pitch',
      subtitle: 'Prospecting, Discovery, and Closing',
      modules: [
        { id: 'w3m1', label: 'Cold Calling Mastery' },
        { id: 'w3m2', label: 'Elevator Pitches' },
        { id: 'w3m3', label: 'LinkedIn Outreach' },
        { id: 'w3m4', label: 'Discovery Call Masterclass' },
        { id: 'w3m5', label: 'The Presentation' },
        { id: 'w3m6', label: 'Proposal & Close' },
        { id: 'w3ex', label: 'Exercise: Mock Calls' }
      ]
    },
    {
      num: 4,
      title: 'Mastery',
      subtitle: 'Objections, Pricing, Pipeline, and Advanced',
      modules: [
        { id: 'w4m1', label: 'Objection Handling Mastery' },
        { id: 'w4m2', label: 'Pricing Psychology' },
        { id: 'w4m3', label: 'Pipeline Management' },
        { id: 'w4m4', label: 'Case Studies' },
        { id: 'w4m5', label: 'Advanced Techniques' },
        { id: 'w4ex', label: 'Exercise: Certification Prep' }
      ]
    }
  ];

  // Quiz data — 20 questions per week, answer is 0-indexed
  const QUIZZES = {
    1: [
      { q: 'What does LLM stand for?', opts: ['Large Learning Machine', 'Large Language Model', 'Local Learning Module', 'Language Logic Manager'], a: 1 },
      { q: 'What does RAG do for an AI system?', opts: ['Makes the AI faster', 'Reduces the cost of AI processing', 'Lets the AI pull from specific business data before responding', 'Encrypts the AI\'s responses for security'], a: 2 },
      { q: 'What is the best business analogy for a Voice Agent?', opts: ['A security camera that watches your office', 'A receptionist who works 24/7, never takes a break, and answers every call', 'A voicemail system with better messages', 'An app that sends text reminders'], a: 1 },
      { q: 'What is the key difference between regular automation and Agentic AI?', opts: ['Agentic AI is cheaper', 'Regular automation is faster', 'Agentic AI takes initiative and performs multi-step actions on its own', 'Agentic AI only works with voice systems'], a: 2 },
      { q: 'What does NLP stand for and what does it enable AI to do?', opts: ['Network Logic Processing \u2014 connects different AI systems', 'Natural Language Processing \u2014 lets AI understand human language including slang and context', 'Neural Learning Patterns \u2014 helps AI learn from mistakes', 'Numeric Logic Protocol \u2014 processes financial data'], a: 1 },
      { q: 'What are the 5 Layers of the AI OS, in order from bottom to top?', opts: ['Data, Context, Automation, Intelligence, Freedom', 'Context, Data, Intelligence, Automation, Freedom', 'Freedom, Automation, Intelligence, Data, Context', 'Context, Intelligence, Data, Freedom, Automation'], a: 1 },
      { q: 'Which module creates the "holy shit" moment for most business owners?', opts: ['ContextOS', 'Diagram Engine', 'CommandOS', 'Content Pipeline'], a: 2 },
      { q: 'How long does the Architecture phase take and what does the client receive?', opts: ['2-3 weeks; a written proposal', '4-6 weeks; complete process map, AI OS blueprint, working prototype, and implementation roadmap', '8-12 weeks; the full AI OS installation', '1 week; a technology audit'], a: 1 },
      { q: 'What is the Installation phase pricing range?', opts: ['$10K-$25K; based on number of employees', '$25K-$75K; based on complexity, integrations, and modules needed', '$50K-$100K; based on industry', 'Flat rate of $40K for every client'], a: 1 },
      { q: 'What are the Three Pillars of the AI OS?', opts: ['Speed, Efficiency, Growth', 'Business Brain, Business Engine, Business Automation', 'Lead Generation, Operations, Reporting', 'Input, Process, Output'], a: 1 },
      { q: 'What is the core differentiator between Nichefinders AI and most other AI agencies?', opts: ['We\'re cheaper', 'We use better AI models', 'The client owns everything we build \u2014 no vendor lock-in', 'We work faster'], a: 2 },
      { q: 'When a prospect says "I can just use ChatGPT," what is the best response?', opts: ['ChatGPT isn\'t reliable enough for business use.', 'ChatGPT is a tool. An AI OS is a system. That\'s the difference between a calculator and an accountant.', 'ChatGPT is outdated \u2014 we use better technology.', 'ChatGPT is a good starting point but you should upgrade.'], a: 1 },
      { q: 'What is the Nichefinders founding principle that guides the Architecture phase?', opts: ['Move fast and break things', 'The customer is always right', 'You can\'t automate disorder \u2014 structure first, then AI', 'Technology solves everything'], a: 2 },
      { q: 'When comparing Nichefinders to a marketing agency, what is the correct positioning?', opts: ['We replace your marketing agency', 'We\'re better than marketing agencies', 'Your marketing agency fills the funnel \u2014 we make sure nothing leaks out the bottom', 'Marketing agencies are a waste of money'], a: 2 },
      { q: 'What is the best analogy for explaining Nichefinders\' ownership model?', opts: ['Like buying a car vs. taking an Uber', 'Like renting vs. buying a house \u2014 one builds equity, the other builds someone else\'s wealth', 'Like owning a phone vs. borrowing one', 'Like planting a garden vs. buying groceries'], a: 1 },
      { q: 'If a business owner\'s time is worth $100/hour, how quickly does the $15K Architecture phase pay for itself?', opts: ['6 months', '1 year', 'Less than 4 weeks', '10 weeks'], a: 2 },
      { q: 'What would it cost to hire an internal team instead of using Nichefinders?', opts: ['$50K-$100K/year', '$100K-$200K/year', '$260K-$420K/year', '$500K+/year'], a: 2 },
      { q: 'A business misses 10 calls per week. Average job $500, 20% conversion. How much revenue lost per year?', opts: ['$10,000', '$26,000', '$52,000', '$104,000'], a: 2 },
      { q: 'Why is the Management retainer ($2,500-$5,000/month) positioned as optional?', opts: ['Because it\'s not valuable enough to require', 'Because it proves ownership \u2014 the system works without us', 'Because we can\'t guarantee ongoing results', 'Because most clients don\'t need it'], a: 1 },
      { q: 'If an AI OS saves 20 hours/week at $100/hour, what is the annual value?', opts: ['$52,000', '$78,000', '$104,000', '$156,000'], a: 2 }
    ],
    2: [
      { q: 'In SPIN Selling, what type of question creates urgency by revealing the true cost of a problem?', opts: ['Situation', 'Problem', 'Implication', 'Need-payoff'], a: 2 },
      { q: 'In the Challenger Sale framework, what is the primary role of the salesperson?', opts: ['Build a deep personal relationship', 'Teach the prospect something they don\'t know, tailor the message, and guide the conversation', 'Ask as many discovery questions as possible', 'Present the lowest-risk option'], a: 1 },
      { q: 'Which Cialdini principle explains why giving a free audit increases engagement?', opts: ['Authority', 'Consistency', 'Reciprocity', 'Scarcity'], a: 2 },
      { q: 'Chris Voss\'s "mirroring" technique involves:', opts: ['Copying the prospect\'s body language', 'Repeating the prospect\'s last 1-3 words as a question', 'Reflecting their emotions back verbally', 'Matching their communication style'], a: 1 },
      { q: 'Loss aversion says people feel losses how much more intensely than equivalent gains?', opts: ['50% more', 'Equal intensity', '2x more intensely', '5x more intensely'], a: 2 },
      { q: 'What is the ideal revenue range for an AI OS prospect?', opts: ['Under $500K', '$500K - $1M', '$1M - $10M', 'Over $25M'], a: 2 },
      { q: 'What is the "Operator Trap"?', opts: ['When an owner over-hires and can\'t control costs', 'When an owner is so busy working IN the business they can\'t work ON it', 'When a business focuses on operations instead of marketing', 'When an owner delegates too much and loses control'], a: 1 },
      { q: 'Which industry is ranked as the BEST fit (Tier 1) for AI OS?', opts: ['Restaurants', 'E-commerce', 'Home services contractors', 'Manufacturing'], a: 2 },
      { q: 'What is the ideal company size sweet spot for AI OS prospects?', opts: ['1-4 employees', '10-30 employees', '50-100 employees', '200+ employees'], a: 1 },
      { q: 'Which LinkedIn signal indicates a HIGH-priority prospect?', opts: ['Just hit our 10-year anniversary!', 'Trying to scale but I\'m the bottleneck', 'We\'re hiring for a new receptionist', 'Great Q1 results for the team'], a: 1 },
      { q: 'A prospect says they miss a lot of calls. What AI OS module addresses this?', opts: ['AI Content Pipeline', 'AI Call Answering + Automated Lead Capture', 'AI Dashboard + Reporting', 'Internal Knowledge Base'], a: 1 },
      { q: '"We tried ChatGPT and it didn\'t work." Best response?', opts: ['ChatGPT is powerful if you use it correctly.', 'Our AI is better than ChatGPT.', 'ChatGPT is a tool \u2014 like a hammer. What we build is the entire house.', 'I\'m sorry to hear that. Let\'s discuss our product.'], a: 2 },
      { q: 'What is the "golden rule" of pain-to-solution mapping?', opts: ['Always present the most expensive solution first', 'Match every pain to at least two modules', 'Never lead with the solution \u2014 always lead with the pain', 'Use technical language to demonstrate expertise'], a: 2 },
      { q: 'A prospect\'s revenue has plateaued for 2-3 years. This is usually what kind of problem?', opts: ['A marketing problem', 'A hiring problem', 'A capacity problem that systems can solve', 'A pricing problem'], a: 2 },
      { q: 'When responding to pain points, you should reference:', opts: ['Technical specifications of the AI OS module', 'A list of all features included in the package', 'The specific outcome in terms they care about', 'Your company\'s awards and certifications'], a: 2 },
      { q: 'Which is a HARD disqualifier (immediate stop)?', opts: ['Prospect wants to DIY implementation', 'Prospect asks about pricing first', 'Prospect has under $500K in revenue', 'Prospect hasn\'t responded to one follow-up'], a: 2 },
      { q: 'A prospect says "I need to think about it" for the third time. What should you do?', opts: ['Send another proposal with more details', 'Offer a discount to create urgency', 'Ask directly what they\'re unsure about, be prepared to walk away', 'Give them more time and follow up in 30 days'], a: 2 },
      { q: 'What is most important when declining a prospect who isn\'t a fit?', opts: ['Explain in detail why they don\'t qualify', 'Offer a reduced-price alternative', 'Add genuine value on the way out', 'Stop responding to their messages'], a: 2 },
      { q: 'What % of time does the average salesperson spend on prospects who will never buy?', opts: ['25%', '40%', '65%', '80%'], a: 2 },
      { q: 'A prospect compares your AI OS to hiring someone on Fiverr. What does this signal?', opts: ['They\'re price-sensitive but could be good', 'They see AI OS as a commodity and don\'t understand the value', 'They\'ve done thorough market research', 'They\'re ready to buy but negotiating'], a: 1 }
    ],
    3: [
      { q: 'What is the best opening line for a cold call?', opts: ['Hi, my name is Jake from Nichefinders AI. We provide AI operating systems.', 'Hey [Name], this is Jake with Nichefinders AI \u2014 I know I\'m catching you out of the blue, is this a bad time?', 'Good morning! Do you have a few minutes to hear about AI?', 'Hey [Name], I\'ve been looking at your business and I think you need our help.'], a: 1 },
      { q: 'How many voicemails should you leave in a single outreach cadence?', opts: ['1', '2', '3', 'As many as needed'], a: 1 },
      { q: 'A gatekeeper asks "What is this regarding?" Best response?', opts: ['It\'s a personal matter.', 'I\'m returning his call.', 'We help businesses automate operations with AI. I wanted to see if the owner would be open to a quick conversation.', 'I\'d rather discuss that directly with the owner.'], a: 2 },
      { q: 'What is the primary goal of a cold call?', opts: ['Close the deal on the phone', 'Book a 45-minute discovery call', 'Deliver the full AI OS pitch', 'Get their email address'], a: 1 },
      { q: 'On LinkedIn, how many outreach messages before stopping if no reply?', opts: ['1', '3', '5', 'Keep going until they respond'], a: 1 },
      { q: 'In the discovery call structure, when should you first present the AI OS solution?', opts: ['In the first 5 minutes', 'Around minute 15', 'Around minute 35, after deep discovery', 'Only in a follow-up call'], a: 2 },
      { q: 'Prospect says "scheduling has been an absolute nightmare." Using mirroring, best response?', opts: ['I totally understand. We can fix that.', 'Tell me more about your scheduling challenges.', 'A nightmare?', 'That sounds frustrating. Here\'s how we handle scheduling...'], a: 2 },
      { q: 'In SPIN, what is the purpose of Implication questions?', opts: ['Identify their current situation', 'Uncover specific problems', 'Help them quantify the true cost of their problems', 'Get them to envision life with the problem solved'], a: 2 },
      { q: 'Discovery call scored 2/7 on qualification. What should you do?', opts: ['Send the proposal anyway', 'Schedule a presentation with Corey immediately', 'Decline politely, leave the door open, set a 90-day check-in', 'Call them back tomorrow and push harder'], a: 2 },
      { q: 'What is the ideal talk-to-listen ratio on a discovery call?', opts: ['50/50', '60% talking, 40% listening', '20% talking, 80% listening', '30% talking, 70% listening'], a: 2 },
      { q: 'In the presentation, what order should you present costs?', opts: ['Your price first, then alternatives', 'Cost of doing nothing first, then alternatives, then your price', 'Your price alongside competitors', 'Just your price'], a: 1 },
      { q: 'Prospect says "I need to think about it" during presentation. Best response?', opts: ['Take your time \u2014 no pressure.', 'Of course. What specifically are you weighing?', 'I can offer a 10% discount if you decide today.', 'Sure \u2014 I\'ll follow up next week.'], a: 1 },
      { q: 'Max number of follow-ups on a sent proposal with no response?', opts: ['2 times', '3 times', '5 times', 'Until they respond or say no'], a: 1 },
      { q: 'Prospect says "Can you do it for less?" regarding $15K Architecture. Correct response?', opts: ['Let me talk to my team and see what we can do.', 'We can drop it to $12K if you sign this week.', 'The $15K reflects CEO-level involvement and depth. We don\'t discount, but the ROI makes it a no-brainer.', 'How much were you thinking?'], a: 2 },
      { q: 'After a presentation, what must happen before you hang up?', opts: ['Thank them and promise to follow up', 'Send a calendar invite for the next call while still on the line', 'Ask them to email you with questions', 'Give them a week to think it over'], a: 1 },
      { q: 'At a networking event, which "What do you do?" response creates the most curiosity?', opts: ['I\'m in AI consulting for small businesses.', 'We build AI operating systems for businesses doing $1 to $10 million. Think of it as a digital chief of staff.', 'I work at Nichefinders AI. We do marketing and operations automation.', 'I help companies leverage cutting-edge AI technology to streamline workflow optimization.'], a: 1 },
      { q: 'Prospect says "We already use ChatGPT." Most effective reframe?', opts: ['ChatGPT is great, but our system is better.', 'ChatGPT is a tool \u2014 the AI OS is a system. It\'s the difference between a calculator and an accountant.', 'ChatGPT can\'t do what we do.', 'Most clients started with ChatGPT before realizing they needed something more professional.'], a: 1 },
      { q: 'Why does "Is this a bad time?" work better than "Do you have a minute?"', opts: ['It\'s more polite', 'It invites a "no" response, giving the prospect control and lowering their guard', 'It takes less time to say', 'It sounds more professional'], a: 1 },
      { q: 'Prospect pauses 8 seconds after a deep question. What should you do?', opts: ['Rephrase the question', 'Offer examples', 'Wait in silence \u2014 they\'re processing', 'Move on to keep momentum'], a: 2 },
      { q: 'A prospect who said "not now" 3 months ago just had a busy season end. Best approach?', opts: ['Send the original proposal again', 'Call and say "Remember me?"', 'Reach out with a new angle \u2014 relevant insight, case study, or changed circumstance', 'Send a LinkedIn request as if you\'ve never spoken'], a: 2 }
    ],
    4: [
      { q: 'Prospect says "I need to think about it." What is your FIRST response?', opts: ['Sure, take your time. I\'ll follow up next week.', 'What specifically needs more thought? Is it the investment, the timing, or something else?', 'Let me send you some more information.', 'We have a special offer that expires Friday.'], a: 1 },
      { q: 'Prospect says "$15K is too expensive." You should:', opts: ['Offer a 20% discount', 'Anchor against $200K+ hiring alternative, then reframe as investment', 'Agree and suggest a cheaper competitor', 'Tell them the price is non-negotiable and move on'], a: 1 },
      { q: 'When a prospect raises objections about pricing or contract terms, what should you do?', opts: ['Handle it yourself using ROI math', 'Offer founding partner pricing', 'Say "That\'s a great question for Corey \u2014 let me get you 20 minutes with him"', 'Tell them you\'ll get back with a custom quote'], a: 2 },
      { q: '"We tried AI tools before and they didn\'t work." The real psychology behind this is:', opts: ['They hate technology', 'They\'ve been burned and are skeptical of all AI claims', 'They can\'t afford your solution', 'They don\'t understand what AI is'], a: 1 },
      { q: 'What is the "meta-rule" of objection handling?', opts: ['Always have a script ready', 'The objection they state is rarely the real one \u2014 always dig one level deeper', 'Handle every objection in under 30 seconds', 'Never acknowledge an objection \u2014 redirect to benefits'], a: 1 },
      { q: 'What is the correct annual value equation for the AI OS?', opts: ['$15K x 12 months = $180K', '20 hrs/week x $100/hr x 52 weeks = $104K/year', '$2,500/month x 12 = $30K', 'Average deal size x close rate'], a: 1 },
      { q: 'When presenting pricing, what is the correct order?', opts: ['Price \u2192 Value \u2192 Payment terms \u2192 ROI', 'ROI \u2192 Price \u2192 Value \u2192 Anchor', 'Recap pain \u2192 Present value \u2192 Anchor high \u2192 Present price \u2192 Frame payment \u2192 State ROI \u2192 Pause', 'Anchor \u2192 Discount \u2192 Close'], a: 2 },
      { q: 'Prospect can\'t afford the $15K Architecture phase. What do you do?', opts: ['Offer a 50% discount', 'Suggest a free consultation', 'Explain price is fixed but scope is flexible, hand off to Corey', 'Tell them to come back when they have budget'], a: 2 },
      { q: 'Which word should you NEVER use when discussing pricing?', opts: ['Investment', 'Cost', 'Retainer', 'Value'], a: 1 },
      { q: 'The management retainer is $2,500/month. What is the correct anchor comparison?', opts: ['It\'s like a Netflix subscription for your business', 'It\'s less than a part-time employee who works 24/7 including weekends', 'It\'s only $83 a day', 'It\'s half of what other agencies charge'], a: 1 },
      { q: 'How many minutes should your daily pipeline routine take?', opts: ['5 minutes', '15 minutes', '45 minutes', '2 hours'], a: 1 },
      { q: 'Max days a prospect should sit in the same pipeline stage without a touchpoint?', opts: ['7 days', '14 days', '30 days', 'No maximum \u2014 patience is key'], a: 1 },
      { q: 'What is the weekly target for outreach messages sent?', opts: ['2', '5', '15', '25'], a: 1 },
      { q: 'What is the target close rate from proposal to signed deal?', opts: ['10%', '25%', '40%', '75%'], a: 2 },
      { q: 'When should you respond to inbound inquiries?', opts: ['Within 24 hours', 'Within 2 hours', 'By end of business day', 'Within the week'], a: 1 },
      { q: 'In Chris Voss\'s framework, "mirroring" means:', opts: ['Copying body language', 'Repeating the last 1-3 words with an upward inflection', 'Agreeing with everything they say', 'Sending a follow-up that mirrors their email format'], a: 1 },
      { q: 'What is an "accusation audit"?', opts: ['A financial review of the prospect\'s business', 'Listing every negative thing the prospect might think about you before they say it', 'A formal complaint process', 'Reviewing a prospect\'s online reviews'], a: 1 },
      { q: 'The best time to ask for a referral is:', opts: ['At contract signing', 'Right after a win or positive result delivery', 'During the first week', 'At the annual review'], a: 1 },
      { q: 'The "assumptive close" works by:', opts: ['Assuming the prospect will say no', 'Asking a yes/no question about moving forward', 'Stating the next step as if decided and offering a choice of timing', 'Sending the contract without asking'], a: 2 },
      { q: 'What should your pipeline look like by Day 90?', opts: ['5 prospects, 1 proposal sent', '30+ prospects, 1-2 closes, consistent weekly metrics', '100+ prospects, 10 proposals, 5 closes', 'Empty pipeline \u2014 everything closed'], a: 1 }
    ]
  };

  const SCENARIOS = [
    { id: 'sc-plumbing', industry: 'Plumbing', persona: 'Mike Torres', subtitle: 'Torres Plumbing, Chicago suburbs', difficulty: 'Beginner-Intermediate', objections: 'Word of mouth works fine, I\'m not a tech guy, Can I start smaller?', modules: 'Voice Agent + Scheduling AI + GBP Optimization', brief: 'Owner-operator, $1.4M revenue, 9 employees. Relies 100% on word of mouth. Low tech comfort. Cautious decision style.' },
    { id: 'sc-hvac', industry: 'HVAC', persona: 'Dave Hernandez', subtitle: 'Hernandez Heating & Air, Tampa Bay', difficulty: 'Intermediate', objections: 'Already have a marketing agency, Too expensive, Need to talk to my partner', modules: 'Full AI OS', brief: '$2.8M revenue, 16 employees. Has a marketing agency already spending $4K/month. Partner co-owns. Busy season pressure.' },
    { id: 'sc-gc', industry: 'General Contracting', persona: 'Sarah Mitchell', subtitle: 'Mitchell Construction Group, Denver', difficulty: 'Advanced', objections: 'We\'re too complex, I need to see ROI first, My team won\'t adopt it', modules: 'Full AI OS + Custom Integrations', brief: '$6.2M revenue, 28 employees. Multi-crew operations. Complex workflows. Skeptical but sophisticated buyer.' },
    { id: 'sc-restaurant', industry: 'Restaurant', persona: 'James & Maria Park', subtitle: 'The Golden Fork, Nashville', difficulty: 'Intermediate', objections: 'Margins are too thin, We\'re not tech-savvy, Can\'t commit long-term', modules: 'Voice Agent + Review Management + Content Pipeline', brief: '$1.1M revenue, 2 locations. Husband-wife team. Razor-thin margins. Need review and reputation management.' },
    { id: 'sc-nonprofit', industry: 'Nonprofit', persona: 'Angela Washington', subtitle: 'Pathways Youth Foundation, Atlanta', difficulty: 'Advanced', objections: 'Board has to approve, Can\'t justify AI spending, We need donor management not AI', modules: 'Donor Intelligence + Content Pipeline + Reporting', brief: '$1.8M annual budget, 22 staff. Board-driven decisions. Needs donor retention and grant reporting automation.' },
    { id: 'sc-agency', industry: 'Marketing Agency', persona: 'Ryan Chen', subtitle: 'Apex Digital, Portland', difficulty: 'Expert', objections: 'We already do this ourselves, Why would I outsource to a competitor?, My clients won\'t pay for AI', modules: 'White-Label AI OS Partner', brief: '$3.5M revenue, 12 employees. Potential white-label partner. Sees AI as competitive threat AND opportunity.' }
  ];

  const TEMPLATES = [
    { id: 'tpl-cold-call',   title: 'Cold Call Scripts',      desc: 'Three proven opening scripts with gatekeeper responses.',          icon: '\u260E',        file: '/templates/cold-call-scripts.md' },
    { id: 'tpl-discovery',   title: 'Discovery Call Guide',   desc: 'Full call structure with SPIN questions and qualification scorecard.', icon: '\uD83C\uDFAF', file: '/templates/discovery-call-guide.md' },
    { id: 'tpl-email',       title: 'Email Templates',        desc: 'Initial outreach, follow-up, and re-engagement sequences.',        icon: '\u2709\uFE0F',  file: '/templates/email-templates.md' },
    { id: 'tpl-followup',    title: 'Follow-Up Sequences',    desc: 'Multi-touch cadences for post-call, post-proposal, and nurture.',   icon: '\uD83D\uDD04',  file: '/templates/follow-up-sequences.md' },
    { id: 'tpl-onepager',    title: 'One-Pager Content',      desc: 'AI OS product one-pager for leave-behinds and attachments.',       icon: '\uD83D\uDCC4',  file: '/templates/one-pager-content.md' },
    { id: 'tpl-proposal',    title: 'Proposal Template',      desc: 'Six-section proposal framework with mirror structure.',            icon: '\uD83D\uDCDD',  file: '/templates/proposal-template.md' }
  ];

  const CERT_ITEMS = [
    { id: 'cert-quiz', label: 'Written Test \u2014 80% on all 4 weekly quizzes (64/80 combined)' },
    { id: 'cert-pitch', label: '60-Second Pitch \u2014 Recorded video (16/20 rubric score)' },
    { id: 'cert-discovery', label: 'Mock Discovery Call \u2014 15-min role-play (20/25 rubric score)' },
    { id: 'cert-prospects', label: 'Prospect List \u2014 10 researched prospects with outreach messages' },
    { id: 'cert-pipeline', label: 'Pipeline Setup \u2014 Airtable base configured with 5+ prospects' }
  ];

  // ─── Content file paths (relative to sales/ root) ────────
  // Serve from: cd .../training/sales && python3 -m http.server 8080
  // Access at: http://localhost:8080/dashboard/
  const CONTENT_BASE = '/';
  const CONTENT_FILES = {
    w1m1: CONTENT_BASE + 'week-1-foundations/01-what-is-ai.md',
    w1m2: CONTENT_BASE + 'week-1-foundations/02-ai-for-business.md',
    w1m3: CONTENT_BASE + 'week-1-foundations/03-the-nichefinders-difference.md',
    w1m4: CONTENT_BASE + 'week-1-foundations/04-the-ai-os-product.md',
    w1m5: CONTENT_BASE + 'week-1-foundations/05-industry-applications.md',
    w1ex: CONTENT_BASE + 'week-1-foundations/exercise-60-second-pitch.md',
    w2m1: CONTENT_BASE + 'week-2-psychology-and-customer/01-psychology-of-selling.md',
    w2m2: CONTENT_BASE + 'week-2-psychology-and-customer/02-how-smb-owners-buy.md',
    w2m3: CONTENT_BASE + 'week-2-psychology-and-customer/03-ideal-customer-profile.md',
    w2m4: CONTENT_BASE + 'week-2-psychology-and-customer/04-pain-to-solution-mapping.md',
    w2m5: CONTENT_BASE + 'week-2-psychology-and-customer/05-disqualification-signals.md',
    w2ex: CONTENT_BASE + 'week-2-psychology-and-customer/exercise-profile-prospects.md',
    w3m1: CONTENT_BASE + 'week-3-outreach-and-pitch/01-cold-calling-mastery.md',
    w3m2: CONTENT_BASE + 'week-3-outreach-and-pitch/02-elevator-pitches.md',
    w3m3: CONTENT_BASE + 'week-3-outreach-and-pitch/03-linkedin-outreach.md',
    w3m4: CONTENT_BASE + 'week-3-outreach-and-pitch/04-discovery-call-masterclass.md',
    w3m5: CONTENT_BASE + 'week-3-outreach-and-pitch/05-the-presentation.md',
    w3m6: CONTENT_BASE + 'week-3-outreach-and-pitch/06-proposal-and-close.md',
    w3ex: CONTENT_BASE + 'week-3-outreach-and-pitch/exercise-mock-calls.md',
    w4m1: CONTENT_BASE + 'week-4-mastery/01-objection-handling-mastery.md',
    w4m2: CONTENT_BASE + 'week-4-mastery/02-pricing-psychology.md',
    w4m3: CONTENT_BASE + 'week-4-mastery/03-pipeline-management.md',
    w4m4: CONTENT_BASE + 'week-4-mastery/04-case-studies.md',
    w4m5: CONTENT_BASE + 'week-4-mastery/05-advanced-techniques.md',
    w4ex: CONTENT_BASE + 'week-4-mastery/exercise-certification.md'
  };

  // Simple markdown → HTML converter
  function mdToHtml (md) {
    let html = md;
    // Escape HTML entities in code blocks first
    html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
      const escaped = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return '<pre><code>' + escaped.trim() + '</code></pre>';
    });
    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    // Details/summary blocks
    html = html.replace(/<details>\s*<summary>(.*?)<\/summary>/g, '<details><summary>$1</summary>');
    // Tables
    html = html.replace(/^\|(.+)\|\s*\n\|[\s\-:|]+\|\s*\n((?:\|.+\|\s*\n?)*)/gm, (match, headerRow, bodyRows) => {
      const headers = headerRow.split('|').map(h => h.trim()).filter(Boolean);
      const rows = bodyRows.trim().split('\n').map(r => r.split('|').map(c => c.trim()).filter(Boolean));
      let table = '<table><thead><tr>' + headers.map(h => '<th>' + h + '</th>').join('') + '</tr></thead><tbody>';
      rows.forEach(row => {
        table += '<tr>' + row.map(c => '<td>' + c + '</td>').join('') + '</tr>';
      });
      table += '</tbody></table>';
      return table;
    });
    // Headings
    html = html.replace(/^#### (.+)$/gm, '<h4>$1</h4>');
    html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
    // Horizontal rules
    html = html.replace(/^---+$/gm, '<hr>');
    // Bold and italic
    html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    // Blockquotes (multi-line)
    html = html.replace(/(^> .+\n?)+/gm, (match) => {
      const content = match.replace(/^> ?/gm, '').trim();
      return '<blockquote>' + content + '</blockquote>';
    });
    // Unordered lists
    html = html.replace(/(^- .+\n?)+/gm, (match) => {
      const items = match.trim().split('\n').map(l => '<li>' + l.replace(/^- /, '') + '</li>').join('');
      return '<ul>' + items + '</ul>';
    });
    // Ordered lists
    html = html.replace(/(^\d+\. .+\n?)+/gm, (match) => {
      const items = match.trim().split('\n').map(l => '<li>' + l.replace(/^\d+\. /, '') + '</li>').join('');
      return '<ol>' + items + '</ol>';
    });
    // Paragraphs — wrap remaining lines
    html = html.replace(/^(?!<[a-z/])((?!^\s*$).+)$/gm, '<p>$1</p>');
    // Clean up empty paragraphs
    html = html.replace(/<p>\s*<\/p>/g, '');
    return html;
  }

  // Build flat ordered list of all module IDs for nav
  const ALL_MODULES = WEEKS.flatMap(w => w.modules.map(m => m.id));
  // Pre-compute total module count (static — used by stats and manager view)
  const TOTAL_MODULES = WEEKS.reduce((sum, w) => sum + w.modules.length, 0);
  const QUIZ_PASS_THRESHOLD = 16;

  // Cache for getAllUsers — invalidated when a new user is created
  let _usersCache = null;
  function getAllUsers () {
    if (_usersCache) return _usersCache;
    const users = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(BASE_KEY + ':')) users.push(k.slice(BASE_KEY.length + 1));
    }
    _usersCache = users;
    return users;
  }
  function invalidateUsersCache () { _usersCache = null; }

  // ─── DOM references ────────────────────────────────────────
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  // ─── Airtable Config ────────────────────────────────────────
  const AIRTABLE_PAT = (window.NF_CONFIG || {}).AIRTABLE_PAT || atob('cGF0RTJwNTNSNkE2VUlJYTAuYjI5OWU3MGM0YTZlMzhlMzQ2YmU1NjZlODZhNDcxYWJlNjMzYTcxMDllMzAwYjkzMTk4YzZiMTJkOGJhYzc4Ng==');
  const AIRTABLE_BASE = (window.NF_CONFIG || {}).AIRTABLE_BASE || 'appgNChM14muzXCR2';
  const AIRTABLE_TABLE = (window.NF_CONFIG || {}).AIRTABLE_TABLE || 'Sales%20Training%20Progress';
  const ALERT_URL = (window.NF_CONFIG || {}).ALERT_URL || 'http://129.80.92.76:3141/send-alert';

  // ─── App visibility ────────────────────────────────────────
  function showApp () {
    const gate = $('#pw-gate');
    if (gate) gate.classList.add('hidden');
    document.querySelector('header').style.display = '';
    document.querySelector('main').style.display = '';
    document.querySelector('footer').style.display = '';
  }

  function hideApp () {
    document.querySelector('header').style.display = 'none';
    document.querySelector('main').style.display = 'none';
    document.querySelector('footer').style.display = 'none';
  }

  // ─── Init ──────────────────────────────────────────────────
  function init () {
    const d = state();
    renderUserBadge();
    renderName(d);
    renderWeeks(d);
    renderScenarios(d);
    renderTemplates();
    renderCert(d);
    bindName();
    bindTimer();
    bindHeaderScroll();
    bindKeyboard();
    bindExportImport();
    updateHeroStats(d);
  }

  // ─── Name ──────────────────────────────────────────────────
  function renderName (d) {
    const display = $('#name-display');
    const btnLabel = $('#name-btn-label');
    if (d.name) {
      display.textContent = d.name;
      display.classList.remove('hidden');
      btnLabel.textContent = 'Edit';
    } else {
      display.classList.add('hidden');
      btnLabel.textContent = 'Set Name';
    }
  }

  function bindName () {
    const modal = $('#name-modal');
    const input = $('#name-input');
    $('#name-edit-btn').addEventListener('click', () => {
      input.value = state().name || '';
      modal.classList.remove('hidden');
      setTimeout(() => input.focus(), 100);
    });
    $('#name-cancel').addEventListener('click', () => modal.classList.add('hidden'));
    $('#name-save').addEventListener('click', () => {
      const d = state();
      d.name = input.value.trim();
      save(d);
      renderName(d);
      modal.classList.add('hidden');
    });
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') $('#name-save').click(); });
  }

  // ─── Hero Stats ────────────────────────────────────────────
  function updateHeroStats (d) {
    const pct = calcProgressPct(d);
    let quizzesPassed = 0;
    [1, 2, 3, 4].forEach(n => { if ((d.quizScores[n] || 0) >= QUIZ_PASS_THRESHOLD) quizzesPassed++; });

    $('#overall-pct').textContent = pct + '%';
    $('#overall-bar').style.width = pct + '%';
    $('#quizzes-passed').textContent = quizzesPassed + '/4';

    // Days remaining
    const startDate = new Date(d.startDate);
    const now = new Date();
    const daysPassed = Math.floor((now - startDate) / 86400000);
    const daysLeft = Math.max(0, 30 - daysPassed);
    $('#days-remaining').textContent = daysLeft;
  }

  // ─── Week Cards ────────────────────────────────────────────
  function renderWeeks (d) {
    const grid = $('#week-grid');
    grid.innerHTML = '';

    WEEKS.forEach((w, idx) => {
      // Check if previous week unlocked (all modules + quiz passed)
      const locked = idx > 0 && !isWeekComplete(WEEKS[idx - 1], d);

      const card = document.createElement('div');
      card.className = 'week-card' + (locked ? ' locked' : '');

      const checkedCount = w.modules.filter(m => d.modules[m.id]).length;
      const total = w.modules.length;
      const pct = Math.round((checkedCount / total) * 100);
      const score = d.quizScores[w.num];
      const passed = (score || 0) >= QUIZ_PASS_THRESHOLD;

      card.innerHTML = `
        <div class="week-card-head">
          <div>
            <div class="week-num">Week ${w.num}</div>
            <div class="week-title">${w.title}</div>
          </div>
          ${locked ? '<span class="lock-icon">\uD83D\uDD12</span>' : ''}
        </div>
        <ul class="week-modules">
          ${w.modules.map(m => `
            <li class="${d.modules[m.id] ? 'completed' : ''}">
              <label class="custom-check">
                <input type="checkbox" data-mod="${m.id}" ${d.modules[m.id] ? 'checked' : ''} ${locked ? 'disabled' : ''}>
                <span class="checkmark"></span>
              </label>
              <span class="module-link" data-content="${m.id}" ${locked ? '' : 'tabindex="0"'}>${m.label}</span>
            </li>
          `).join('')}
        </ul>
        <div class="week-progress">
          <div class="progress-bar-wrap">
            <div class="progress-bar-fill" style="width:${pct}%"></div>
          </div>
        </div>
        <div class="week-foot">
          ${score !== undefined ? `<span class="quiz-score ${passed ? 'pass' : 'fail'}">${score}/20 ${passed ? 'Passed' : 'Failed'}</span>` : '<span></span>'}
          <button class="btn btn-sm btn-primary" data-quiz="${w.num}" ${locked ? 'disabled' : ''}>Take Quiz</button>
        </div>
      `;
      grid.appendChild(card);
    });

    // Bind module checkboxes
    grid.querySelectorAll('input[data-mod]').forEach(cb => {
      cb.addEventListener('change', () => {
        const d = state();
        d.modules[cb.dataset.mod] = cb.checked;
        save(d);
        renderWeeks(d);
        renderCert(d);
        updateHeroStats(d);
        syncToAirtable(d);
      });
    });

    // Bind module content links
    grid.querySelectorAll('.module-link[data-content]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.stopPropagation();
        openContent(link.dataset.content);
      });
    });

    // Bind quiz buttons
    grid.querySelectorAll('[data-quiz]').forEach(btn => {
      btn.addEventListener('click', () => openQuiz(parseInt(btn.dataset.quiz)));
    });
  }

  function isWeekComplete (w, d) {
    const allModules = w.modules.every(m => d.modules[m.id]);
    const quizPassed = (d.quizScores[w.num] || 0) >= QUIZ_PASS_THRESHOLD;
    return allModules && quizPassed;
  }

  // ─── Content Viewer ─────────────────────────────────────────
  let contentCache = {};

  function openContent (moduleId) {
    const filePath = CONTENT_FILES[moduleId];
    if (!filePath) return;

    const modal = $('#content-modal');
    const body = $('#content-body');
    const titleEl = $('#content-title');
    const weekLabel = $('#content-week-label');
    const doneCb = $('#content-done-cb');

    // Find week and module info
    let weekNum = 0;
    let moduleLabel = '';
    for (const w of WEEKS) {
      const mod = w.modules.find(m => m.id === moduleId);
      if (mod) { weekNum = w.num; moduleLabel = mod.label; break; }
    }

    weekLabel.textContent = 'Week ' + weekNum;
    titleEl.textContent = moduleLabel;
    body.innerHTML = '<div class="loading-spinner">Loading lesson...</div>';

    // Set checkbox state
    const d = state();
    doneCb.checked = !!d.modules[moduleId];
    doneCb.onchange = () => {
      const d2 = state();
      d2.modules[moduleId] = doneCb.checked;
      save(d2);
      renderWeeks(d2);
      renderCert(d2);
      updateHeroStats(d2);
    };

    // Nav buttons
    const idx = ALL_MODULES.indexOf(moduleId);
    const prevBtn = $('#content-prev');
    const nextBtn = $('#content-next');
    prevBtn.disabled = idx <= 0;
    nextBtn.disabled = idx >= ALL_MODULES.length - 1;
    prevBtn.onclick = () => { if (idx > 0) openContent(ALL_MODULES[idx - 1]); };
    nextBtn.onclick = () => {
      if (idx < ALL_MODULES.length - 1) {
        // Auto-mark current as complete when navigating forward
        if (!doneCb.checked) {
          doneCb.checked = true;
          doneCb.onchange();
        }
        openContent(ALL_MODULES[idx + 1]);
      }
    };

    // Ensure done checkbox/label visible (may have been hidden by openTemplate)
    doneCb.style.display = '';
    const doneLabel = modal.querySelector('.content-done-label');
    if (doneLabel) doneLabel.style.display = '';

    // Close
    $('#content-close').onclick = () => modal.classList.add('hidden');

    modal.classList.remove('hidden');

    // Fetch and render
    if (contentCache[moduleId]) {
      body.innerHTML = contentCache[moduleId];
      body.scrollTop = 0;
      return;
    }

    fetch(filePath)
      .then(r => {
        if (!r.ok) throw new Error('Failed to load');
        return r.text();
      })
      .then(md => {
        const html = mdToHtml(md);
        contentCache[moduleId] = html;
        body.innerHTML = html;
        body.scrollTop = 0;
      })
      .catch(() => {
        body.innerHTML = '<div class="loading-spinner">Could not load this lesson. Make sure you\'re running the dashboard from a local server (python3 -m http.server).</div>';
      });
  }

  // ─── Quiz Engine ───────────────────────────────────────────
  function openQuiz (weekNum) {
    const questions = QUIZZES[weekNum];
    if (!questions) return;

    const modal = $('#quiz-modal');
    const body = $('#quiz-body');
    const result = $('#quiz-result');
    const submitBtn = $('#quiz-submit');
    const retryBtn = $('#quiz-retry');
    const doneBtn = $('#quiz-done');

    $('#quiz-title').textContent = `Week ${weekNum} Quiz`;
    result.classList.add('hidden');
    submitBtn.classList.remove('hidden');
    retryBtn.classList.add('hidden');
    doneBtn.classList.add('hidden');

    body.innerHTML = questions.map((q, i) => `
      <div class="quiz-question">
        <div class="quiz-q-num">Question ${i + 1}</div>
        <div class="quiz-q-text">${q.q}</div>
        <div class="quiz-options">
          ${q.opts.map((opt, oi) => `
            <label class="quiz-option" data-qi="${i}" data-oi="${oi}">
              <input type="radio" name="q${i}" value="${oi}">
              <span class="radio-dot"></span>
              <span>${opt}</span>
            </label>
          `).join('')}
        </div>
      </div>
    `).join('');

    // Option click styling
    body.querySelectorAll('.quiz-option').forEach(opt => {
      opt.addEventListener('click', () => {
        const qi = opt.dataset.qi;
        body.querySelectorAll(`.quiz-option[data-qi="${qi}"]`).forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        opt.querySelector('input').checked = true;
      });
    });

    // Submit
    submitBtn.onclick = () => {
      let correct = 0;
      const userAnswers = [];
      questions.forEach((q, i) => {
        const sel = body.querySelector(`input[name="q${i}"]:checked`);
        const chosen = sel ? parseInt(sel.value) : -1;
        userAnswers.push(chosen);
        if (chosen === q.a) correct++;
      });

      const passed = correct >= QUIZ_PASS_THRESHOLD;
      const d = state();
      if (!d.quizScores[weekNum] || correct > d.quizScores[weekNum]) {
        d.quizScores[weekNum] = correct;
        save(d);
      }

      result.classList.remove('hidden');
      $('#quiz-result-inner').innerHTML = `
        <div class="result-score ${passed ? 'pass' : 'fail'}">${correct}/20</div>
        <div class="result-msg">${passed
          ? 'Congratulations! You passed. Keep going!'
          : 'You need 16/20 to pass. Review below and try again.'
        }</div>
      `;

      // Quiz review: highlight correct/wrong on each question
      questions.forEach((q, i) => {
        const chosen = userAnswers[i];
        body.querySelectorAll(`.quiz-option[data-qi="${i}"]`).forEach(opt => {
          const oi = parseInt(opt.dataset.oi);
          opt.classList.remove('selected');
          if (oi === q.a) opt.classList.add('quiz-correct');
          else if (oi === chosen && chosen !== q.a) opt.classList.add('quiz-wrong');
        });
      });
      // Disable all radio inputs after submit
      body.querySelectorAll('input[type="radio"]').forEach(r => { r.disabled = true; });

      submitBtn.classList.add('hidden');
      if (!passed) retryBtn.classList.remove('hidden');
      doneBtn.classList.remove('hidden');

      if (passed) {
        const ds = state();
        renderWeeks(ds);
        renderCert(ds);
        updateHeroStats(ds);
        fireConfetti();
        syncToAirtable(ds);
        sendAlert(ds, 'quiz_pass', weekNum, correct);
      }
    };

    retryBtn.onclick = () => openQuiz(weekNum);
    doneBtn.onclick = () => modal.classList.add('hidden');
    $('#quiz-close').onclick = () => modal.classList.add('hidden');

    modal.classList.remove('hidden');
    // Scroll to top of modal
    modal.querySelector('.modal-box').scrollTop = 0;
  }

  // ─── Scenarios ─────────────────────────────────────────────
  function renderScenarios (d) {
    const grid = $('#scenario-grid');
    grid.innerHTML = '';

    SCENARIOS.forEach(sc => {
      const card = document.createElement('div');
      card.className = 'scenario-card';
      const practiced = d.scenarios[sc.id];

      card.innerHTML = `
        <div class="scenario-head">
          <div class="scenario-head-left">
            <div class="scenario-industry">${sc.industry}</div>
            <div class="scenario-persona">${sc.persona}</div>
            <div class="scenario-meta">
              <span>${sc.subtitle}</span>
              <span>${sc.difficulty}</span>
            </div>
          </div>
          <span class="scenario-chevron">\u25BC</span>
        </div>
        <div class="scenario-details">
          <div class="scenario-details-inner">
            <h4>Brief</h4>
            <p>${sc.brief}</p>
            <h4>Primary Objections</h4>
            <p>${sc.objections}</p>
            <h4>AI OS Modules</h4>
            <p>${sc.modules}</p>
            <div class="scenario-practiced">
              <label class="custom-check">
                <input type="checkbox" data-sc="${sc.id}" ${practiced ? 'checked' : ''}>
                <span class="checkmark"></span>
              </label>
              <span>Mark as practiced</span>
            </div>
          </div>
        </div>
      `;

      // Expand/collapse
      card.querySelector('.scenario-head').addEventListener('click', () => {
        card.classList.toggle('expanded');
      });

      // Practiced checkbox
      card.querySelector(`input[data-sc="${sc.id}"]`).addEventListener('change', (e) => {
        e.stopPropagation();
        const d2 = state();
        d2.scenarios[sc.id] = e.target.checked;
        save(d2);
        syncToAirtable(d2);
      });

      grid.appendChild(card);
    });
  }

  // ─── Templates ─────────────────────────────────────────────
  function renderTemplates () {
    const grid = $('#template-grid');
    grid.innerHTML = '';

    TEMPLATES.forEach(t => {
      const card = document.createElement('div');
      card.className = 'template-card template-card-clickable';
      card.innerHTML = `
        <div class="template-icon">${t.icon}</div>
        <h4>${t.title}</h4>
        <p>${t.desc}</p>
        <span class="template-open-hint">Click to open &rarr;</span>
      `;
      card.addEventListener('click', () => openTemplate(t));
      grid.appendChild(card);
    });
  }

  // ─── Template content viewer ───────────────────────────────
  function openTemplate (t) {
    const modal = $('#content-modal');
    const body = $('#content-body');
    const titleEl = $('#content-title');
    const weekLabel = $('#content-week-label');
    const doneCb = $('#content-done-cb');
    const prevBtn = $('#content-prev');
    const nextBtn = $('#content-next');
    const doneLabel = modal.querySelector('.content-done-label');

    weekLabel.textContent = 'Templates';
    titleEl.textContent = t.title;
    body.innerHTML = '<div class="loading-spinner">Loading template...</div>';

    // Hide completion checkbox for templates
    doneCb.style.display = 'none';
    if (doneLabel) doneLabel.style.display = 'none';

    // Template prev/next within TEMPLATES array
    const idx = TEMPLATES.findIndex(x => x.id === t.id);
    prevBtn.disabled = idx <= 0;
    nextBtn.disabled = idx >= TEMPLATES.length - 1;
    prevBtn.onclick = () => { if (idx > 0) openTemplate(TEMPLATES[idx - 1]); };
    nextBtn.onclick = () => { if (idx < TEMPLATES.length - 1) openTemplate(TEMPLATES[idx + 1]); };

    $('#content-close').onclick = () => {
      modal.classList.add('hidden');
      doneCb.style.display = '';
      if (doneLabel) doneLabel.style.display = '';
    };

    modal.classList.remove('hidden');

    if (contentCache[t.id]) { body.innerHTML = contentCache[t.id]; body.scrollTop = 0; return; }

    fetch(t.file)
      .then(r => { if (!r.ok) throw new Error('Failed'); return r.text(); })
      .then(md => { contentCache[t.id] = mdToHtml(md); body.innerHTML = contentCache[t.id]; body.scrollTop = 0; })
      .catch(() => { body.innerHTML = '<div class="loading-spinner">Could not load template. Make sure the server is running from the sales/ directory.</div>'; });
  }

  // ─── Certification ─────────────────────────────────────────
  function renderCert (d) {
    const checklist = $('#cert-checklist');
    checklist.innerHTML = '';

    // Auto-check the quiz requirement
    let quizzesPassed = 0;
    let totalQuizScore = 0;
    [1, 2, 3, 4].forEach(n => {
      const sc = d.quizScores[n] || 0;
      totalQuizScore += sc;
      if (sc >= QUIZ_PASS_THRESHOLD) quizzesPassed++;
    });
    const quizComplete = quizzesPassed === 4 && totalQuizScore >= QUIZ_PASS_THRESHOLD * 4;

    if (!d.certManual) d.certManual = {};

    const statuses = {
      'cert-quiz': quizComplete,
      'cert-pitch': !!d.certManual['cert-pitch'],
      'cert-discovery': !!d.certManual['cert-discovery'],
      'cert-prospects': !!d.certManual['cert-prospects'],
      'cert-pipeline': !!d.certManual['cert-pipeline']
    };

    CERT_ITEMS.forEach(item => {
      const completed = statuses[item.id];
      const div = document.createElement('div');
      div.className = 'cert-check-item' + (completed ? ' completed' : '');

      if (item.id === 'cert-quiz') {
        div.innerHTML = `
          <label class="custom-check">
            <input type="checkbox" ${completed ? 'checked' : ''} disabled>
            <span class="checkmark"></span>
          </label>
          <span>${item.label}${quizComplete ? ' \u2713' : ` (${quizzesPassed}/4 passed, ${totalQuizScore}/80 total)`}</span>
        `;
      } else {
        div.innerHTML = `
          <label class="custom-check">
            <input type="checkbox" data-cert="${item.id}" ${completed ? 'checked' : ''}>
            <span class="checkmark"></span>
          </label>
          <span>${item.label}</span>
        `;
      }
      checklist.appendChild(div);
    });

    // Bind manual cert checkboxes
    checklist.querySelectorAll('input[data-cert]').forEach(cb => {
      cb.addEventListener('change', () => {
        const d2 = state();
        if (!d2.certManual) d2.certManual = {};
        d2.certManual[cb.dataset.cert] = cb.checked;
        save(d2);
        renderCert(d2);
        syncToAirtable(d2);
      });
    });

    // Check if fully certified
    const allComplete = Object.values(statuses).every(Boolean);
    const badge = $('#cert-badge');
    const printBtn = $('#print-cert');

    if (allComplete) {
      badge.classList.remove('hidden');
      printBtn.classList.remove('hidden');
      // Set print certificate data
      const d2 = state();
      $('#cert-print-name').textContent = d2.name || 'Sales Representative';
      $('#cert-print-date').textContent = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      $('#cert-print-scores').innerHTML = [1, 2, 3, 4].map(n => `Week ${n}: ${d2.quizScores[n] || 0}/20`).join(' &middot; ');

      printBtn.onclick = () => window.print();

      // Fire certified alert only once (first time allComplete becomes true)
      if (!d2.certified) {
        d2.certified = true;
        save(d2);
        syncToAirtable(d2);
        sendAlert(d2, 'certified');
      }
    } else {
      badge.classList.add('hidden');
      printBtn.classList.add('hidden');
    }
  }

  // ─── Timer ─────────────────────────────────────────────────
  function bindTimer () {
    let seconds = 30;
    let timer = null;
    let running = false;
    const display = $('#timer-display');
    const startBtn = $('#timer-start');
    const stopBtn = $('#timer-stop');
    const resetBtn = $('#timer-reset');

    function fmt (s) {
      const m = Math.floor(s / 60);
      const sec = s % 60;
      return String(m).padStart(2, '0') + ':' + String(sec).padStart(2, '0');
    }

    function updateDisplay () {
      display.textContent = fmt(seconds);
      display.classList.remove('warning', 'danger');
      if (seconds <= 5 && seconds > 0) display.classList.add('danger');
      else if (seconds <= 10) display.classList.add('warning');
    }

    function beep () {
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = 800;
        gain.gain.value = 0.3;
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } catch (e) { /* silent fail */ }
    }

    function tick () {
      if (seconds <= 0) {
        clearInterval(timer);
        running = false;
        startBtn.disabled = false;
        stopBtn.disabled = true;
        display.classList.add('danger');
        // Double beep at finish
        beep();
        setTimeout(beep, 200);
        return;
      }
      seconds--;
      updateDisplay();
      if (seconds === 5) beep();
    }

    $('#timer-30').addEventListener('click', () => {
      if (running) return;
      seconds = 30;
      updateDisplay();
    });

    $('#timer-60').addEventListener('click', () => {
      if (running) return;
      seconds = 60;
      updateDisplay();
    });

    startBtn.addEventListener('click', () => {
      if (running) return;
      running = true;
      startBtn.disabled = true;
      stopBtn.disabled = false;
      timer = setInterval(tick, 1000);
    });

    stopBtn.addEventListener('click', () => {
      clearInterval(timer);
      running = false;
      startBtn.disabled = false;
      stopBtn.disabled = true;
    });

    resetBtn.addEventListener('click', () => {
      clearInterval(timer);
      running = false;
      seconds = 30;
      startBtn.disabled = false;
      stopBtn.disabled = true;
      updateDisplay();
    });

    updateDisplay();
  }

  // ─── Header scroll ────────────────────────────────────────
  function bindHeaderScroll () {
    const header = $('#site-header');
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }

  // ─── Confetti ──────────────────────────────────────────────
  function fireConfetti () {
    const canvas = $('#confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#CC5500', '#E88533', '#22C55E', '#FACC15', '#3B82F6', '#D4A017'];

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * -1,
        w: Math.random() * 8 + 4,
        h: Math.random() * 6 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * 3 + 2,
        rot: Math.random() * Math.PI * 2,
        rotV: (Math.random() - 0.5) * 0.2
      });
    }

    let frame = 0;
    function draw () {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      particles.forEach(p => {
        if (p.y > canvas.height + 20) return;
        alive = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05;
        p.rot += p.rotV;
      });

      frame++;
      if (alive && frame < 300) requestAnimationFrame(draw);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    draw();
  }

  // ─── User Badge + Switch User ─────────────────────────────
  function renderUserBadge () {
    const user = getUser();
    const badge = $('#user-badge');
    const isManager = new URLSearchParams(window.location.search).get('manager') === '1';
    if (badge) badge.textContent = user === 'default' ? 'Set ?user= in URL' : user;

    const managerBtn = $('#manager-view-btn');
    if (managerBtn) {
      managerBtn.classList.toggle('hidden', !isManager);
      managerBtn.onclick = openManagerView;
    }

    const signOutBtn = $('#sign-out-btn');
    if (signOutBtn) signOutBtn.onclick = () => window.Clerk && window.Clerk.signOut();
  }

  function openSwitchUser () {
    const modal = $('#switch-user-modal');
    const list = $('#switch-user-list');
    const users = getAllUsers();
    list.innerHTML = users.length
      ? users.map(u => `<button class="btn btn-outline btn-sm switch-user-item" data-u="${u}">${u}</button>`).join('')
      : '<p class="modal-desc">No saved users found.</p>';

    list.querySelectorAll('.switch-user-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const params = new URLSearchParams(window.location.search);
        params.set('user', btn.dataset.u);
        window.location.search = params.toString();
      });
    });

    modal.classList.remove('hidden');
    $('#switch-user-close').onclick = () => modal.classList.add('hidden');
    $('#new-user-btn').onclick = () => {
      const slug = prompt('Enter new user name (no spaces):');
      if (!slug) return;
      const clean = slug.trim().toLowerCase().replace(/\s+/g, '-');
      invalidateUsersCache();
      const params = new URLSearchParams(window.location.search);
      params.set('user', clean);
      window.location.search = params.toString();
    };
  }

  function renderManagerRows (records) {
    if (!records.length) {
      return '<tr><td colspan="6" style="text-align:center;color:var(--text-dim)">No user data found</td></tr>';
    }
    return records.map(r => {
      const f = r.fields;
      return `<tr>
        <td>${f['Name'] || f['User'] || '—'}</td>
        <td>${f['Progress'] !== undefined ? f['Progress'] + '%' : '—'}</td>
        <td>${f['Modules Completed'] !== undefined ? f['Modules Completed'] + '/' + TOTAL_MODULES : '—'}</td>
        <td>${f['Quizzes Passed'] !== undefined ? f['Quizzes Passed'] + '/4' : '—'}</td>
        <td>${f['Scenarios Practiced'] !== undefined ? f['Scenarios Practiced'] + '/' + SCENARIOS.length : '—'}</td>
        <td>${f['Certified'] ? '<span class="cert-yes">✓ Certified</span>' : '—'}</td>
      </tr>`;
    }).join('');
  }

  function localManagerRows () {
    return getAllUsers().map(u => {
      const d = loadUser(u);
      let mods = 0;
      WEEKS.forEach(w => { w.modules.forEach(m => { if (d.modules && d.modules[m.id]) mods++; }); });
      let qPassed = 0;
      [1,2,3,4].forEach(n => { if (d.quizScores && (d.quizScores[n] || 0) >= QUIZ_PASS_THRESHOLD) qPassed++; });
      let scPracticed = 0;
      SCENARIOS.forEach(sc => { if (d.scenarios && d.scenarios[sc.id]) scPracticed++; });
      return { fields: {
        User: u, Name: d.name || u,
        Progress: calcProgressPct(d),
        'Modules Completed': mods, 'Quizzes Passed': qPassed,
        'Scenarios Practiced': scPracticed, Certified: !!d.certified
      }};
    });
  }

  let _managerCache = null;
  let _managerCacheTime = 0;
  const MANAGER_CACHE_TTL = 60000; // 60 seconds

  function openManagerView () {
    const modal = $('#manager-modal');
    const tbody = $('#manager-tbody');

    modal.classList.remove('hidden');
    $('#manager-close').onclick = () => modal.classList.add('hidden');

    // Serve from cache if fresh
    if (_managerCache && Date.now() - _managerCacheTime < MANAGER_CACHE_TTL) {
      tbody.innerHTML = renderManagerRows(_managerCache);
      return;
    }

    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:var(--text-dim)">Loading…</td></tr>';

    fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE}/${AIRTABLE_TABLE}?sort%5B0%5D%5Bfield%5D=Progress&sort%5B0%5D%5Bdirection%5D=desc`, {
      headers: { Authorization: `Bearer ${AIRTABLE_PAT}` }
    })
      .then(r => r.json())
      .then(data => {
        const rows = (data.records && data.records.length > 0)
          ? data.records
          : localManagerRows();
        _managerCache = rows;
        _managerCacheTime = Date.now();
        tbody.innerHTML = renderManagerRows(rows);
      })
      .catch(() => {
        const rows = localManagerRows();
        tbody.innerHTML = renderManagerRows(rows);
      });
  }

  // ─── Keyboard shortcuts ────────────────────────────────────
  function bindKeyboard () {
    document.addEventListener('keydown', (e) => {
      // Ignore when typing in inputs
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key === 'Escape') {
        ['content-modal','quiz-modal','name-modal','switch-user-modal','manager-modal'].forEach(id => {
          const el = $('#' + id);
          if (el && !el.classList.contains('hidden')) el.classList.add('hidden');
        });
      }

      const contentModal = $('#content-modal');
      if (!contentModal || contentModal.classList.contains('hidden')) return;

      if (e.key === 'ArrowLeft') { const btn = $('#content-prev'); if (btn && !btn.disabled) btn.click(); }
      if (e.key === 'ArrowRight') { const btn = $('#content-next'); if (btn && !btn.disabled) btn.click(); }
    });
  }

  // ─── Progress export / import ─────────────────────────────
  function bindExportImport () {
    const exportBtn = $('#export-progress');
    const importBtn = $('#import-progress');
    const importInput = $('#import-file-input');

    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        const data = JSON.stringify(state(), null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'nf-training-progress-' + getUser() + '.json';
        a.click();
        URL.revokeObjectURL(url);
      });
    }

    if (importBtn && importInput) {
      importBtn.addEventListener('click', () => importInput.click());
      importInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
          try {
            const parsed = JSON.parse(ev.target.result);
            save(parsed);
            const d = state();
            renderName(d); renderWeeks(d); renderScenarios(d); renderCert(d); updateHeroStats(d);
            alert('Progress imported successfully!');
          } catch { alert('Invalid progress file.'); }
        };
        reader.readAsText(file);
        importInput.value = '';
      });
    }
  }

  // ─── Airtable Sync ─────────────────────────────────────────

  function calcProgressPct (d) {
    let checkedModules = 0;
    WEEKS.forEach(w => { w.modules.forEach(m => { if (d.modules[m.id]) checkedModules++; }); });
    let quizzesPassed = 0;
    [1, 2, 3, 4].forEach(n => { if ((d.quizScores[n] || 0) >= QUIZ_PASS_THRESHOLD) quizzesPassed++; });
    return Math.round(((checkedModules + quizzesPassed) / (TOTAL_MODULES + 4)) * 100);
  }

  function syncToAirtable (d) {
    const user = getUser();
    const today = new Date().toISOString().split('T')[0];
    const atHeaders = { Authorization: `Bearer ${AIRTABLE_PAT}`, 'Content-Type': 'application/json' };
    const updateFields = {
      User: user,
      Name: d.name || user,
      Progress: calcProgressPct(d),
      'Modules Completed': Object.values(d.modules || {}).filter(Boolean).length,
      'Quizzes Passed': [1, 2, 3, 4].filter(n => (d.quizScores[n] || 0) >= QUIZ_PASS_THRESHOLD).length,
      'Quiz Scores': JSON.stringify(d.quizScores || {}),
      'Scenarios Practiced': Object.values(d.scenarios || {}).filter(Boolean).length,
      Certified: !!d.certified,
      'Last Updated': today
    };

    fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE}/${AIRTABLE_TABLE}?filterByFormula=${encodeURIComponent(`{User}="${user}"`)}`, {
      headers: { Authorization: `Bearer ${AIRTABLE_PAT}` }
    })
      .then(r => r.json())
      .then(data => {
        if (data.records && data.records.length > 0) {
          return fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE}/${AIRTABLE_TABLE}/${data.records[0].id}`, {
            method: 'PATCH', headers: atHeaders, body: JSON.stringify({ fields: updateFields })
          });
        } else {
          const createFields = { ...updateFields, 'Start Date': d.startDate ? d.startDate.split('T')[0] : today };
          return fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE}/${AIRTABLE_TABLE}`, {
            method: 'POST', headers: atHeaders, body: JSON.stringify({ fields: createFields })
          });
        }
      })
      .catch(e => console.warn('[Airtable] sync failed:', e));
  }

  function sendAlert (d, type, weekNum, score) {
    fetch(ALERT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, userName: d.name || getUser(), weekNum, score })
    }).catch(() => {});
  }

  // ─── Clerk Auth Boot ───────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    hideApp();
    const poll = setInterval(async () => {
      if (!window.Clerk) return;
      clearInterval(poll);
      await window.Clerk.load();
      const clerkUser = window.Clerk.user;
      if (clerkUser) {
        showApp();
        initWithClerkUser(clerkUser);
      } else {
        const overlay = document.getElementById('clerk-auth');
        overlay.classList.remove('hidden');
        window.Clerk.mountSignIn(overlay);
        window.Clerk.addListener(({ user: u }) => {
          if (u) { overlay.classList.add('hidden'); showApp(); initWithClerkUser(u); }
        });
      }
    }, 50);
  });

  function initWithClerkUser (clerkUser) {
    const email = (clerkUser.primaryEmailAddress || {}).emailAddress || '';
    window._clerkUsername = email.split('@')[0].toLowerCase() || 'default';
    init();
  }

})();
