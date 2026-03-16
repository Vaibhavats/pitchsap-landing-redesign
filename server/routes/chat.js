const express = require('express');
const Message = require('../models/Message');
const { protect } = require('../middleware/auth');

const router = express.Router();

// ── Mock AI Engine ────────────────────────────────────────────────────────────
const mockResponses = [
  {
    keywords: ['validate', 'validation', 'viable', 'feasible', 'good idea', 'bad idea', 'worth it'],
    replies: [
      (name) => `Great question, ${name}! Here's a quick validation framework:\n\n✅ Problem clarity — Is the pain point real and frequent?\n✅ Market size — Is the TAM above $1B?\n✅ Competition — Are incumbents slow or ignoring this segment?\n✅ Unfair advantage — Do you have a unique insight?\n\nShare your idea in one sentence and I'll score it across all four dimensions.`,
      (name) => `Validation is the most important step before building anything, ${name}. The biggest mistake founders make is skipping customer discovery. Before writing a line of code, get 10 potential users to say they'd pay. Have you done any customer interviews yet?`,
    ],
  },
  {
    keywords: ['investor', 'funding', 'raise', 'investment', 'vc', 'angel', 'seed', 'pre-seed', 'capital'],
    replies: [
      (name) => `For first-time founders raising pre-seed, here's what works in 2025:\n\n💰 Target: Angel investors & micro-VCs ($25K–$250K checks)\n📋 What they want: Strong team, clear problem, early traction\n📍 Where to find them: AngelList, LinkedIn, founder communities, PitchSAP's investor network\n\nYour validation score on PitchSAP directly affects investor match quality. Have you completed your idea brief yet, ${name}?`,
      (name) => `Investors at pre-seed are primarily betting on YOU, ${name}, not just the idea. They look for:\n\n1. Domain expertise or personal connection to the problem\n2. Coachability and self-awareness\n3. Early signals — waitlists, LOIs, pilot users\n4. A clear "why now"\n\nWhat stage are you at? Any early traction?`,
    ],
  },
  {
    keywords: ['pitch', 'deck', 'presentation', 'slides'],
    replies: [
      (name) => `A great pre-seed pitch deck has exactly 10 slides, ${name}:\n\n1. Problem — The pain, with data\n2. Solution — Your unique approach\n3. Market Size — TAM / SAM / SOM\n4. Product — Screenshots or demo\n5. Traction — Early signals\n6. Business Model — How you make money\n7. Competition — Why you win\n8. Go-to-Market — First 1,000 customers\n9. Team — Why you're the right people\n10. The Ask — Amount + use of funds\n\nKeep it under 12 slides. Investors decide in the first 3 minutes.`,
    ],
  },
  {
    keywords: ['market', 'size', 'tam', 'sam', 'som', 'industry', 'sector', 'opportunity'],
    replies: [
      (name) => `Market sizing done right, ${name}:\n\n📊 TAM — Everyone who could ever use this\n📊 SAM — Who you can realistically reach\n📊 SOM — Your realistic Year 1–3 target\n\nPro tip: Investors distrust top-down sizing ("1% of a $10B market"). Use bottom-up — "There are 50,000 SMBs spending ₹2L/year on this = ₹1,000Cr SAM." What's your target segment?`,
    ],
  },
  {
    keywords: ['mentor', 'mentorship', 'advisor', 'guidance', 'expert'],
    replies: [
      (name) => `Finding the right mentor can 10x your speed, ${name}:\n\n🎯 Be specific — "I need help with enterprise sales" beats "I need a mentor"\n📬 Cold outreach works — 3 sentences: who you are, what you're building, one specific ask\n💡 Give before you ask — Share something valuable first\n\nPitchSAP's mentor matching connects you with domain experts who've built in your exact space. Want help crafting an outreach message?`,
    ],
  },
  {
    keywords: ['cofounder', 'co-founder', 'team', 'technical', 'cto', 'builder', 'partner'],
    replies: [
      (name) => `Finding a co-founder is like finding a spouse for your startup, ${name}:\n\n✅ Complementary skills (business + technical)\n✅ Shared risk tolerance and commitment\n✅ Do a trial project before committing\n✅ Align on equity upfront — 4-year vest, 1-year cliff is standard\n\nPitchSAP's Builder role lets technical co-founders browse validated ideas. Have you posted yours yet?`,
    ],
  },
  {
    keywords: ['compete', 'competition', 'competitor', 'differentiate', 'moat', 'advantage'],
    replies: [
      (name) => `Competitive analysis framework for ${name}:\n\n1. List your top 5 direct competitors\n2. Map them on 2 axes that matter to your customers\n3. Find the white space where you uniquely sit\n4. Define your moat — network effects, proprietary data, switching costs, or brand?\n\nThe best answer to "what about [Big Competitor]?" is: "They serve segment X, we're laser-focused on segment Y which they're ignoring."`,
    ],
  },
  {
    keywords: ['revenue', 'business model', 'monetize', 'pricing', 'subscription', 'saas', 'freemium'],
    replies: [
      (name) => `Business model options for early-stage, ${name}:\n\n💳 SaaS Subscription — Predictable, investor-friendly, best for B2B\n🛒 Marketplace (take rate) — Scalable but hard to bootstrap\n📦 Usage-based — Aligns with customer value\n🎁 Freemium — Great for distribution, hard to convert\n\nFor pre-seed, pick the model that lets you charge on Day 1. What's your current thinking on pricing?`,
    ],
  },
  {
    keywords: ['traction', 'users', 'customers', 'growth', 'metrics', 'mrr', 'arr'],
    replies: [
      (name) => `Traction is the #1 thing that unlocks funding, ${name}:\n\n🌱 Idea stage: 10+ customer discovery interviews\n🚀 Pre-seed: Waitlist of 500+, pilot users, or 1–2 paying customers\n📈 Seed: $5K–$20K MRR or >10% week-over-week growth\n\nEven "soft" traction like a waitlist or LOI from a potential customer is powerful. What signals do you have right now?`,
    ],
  },
  {
    keywords: ['problem', 'pain point', 'customer', 'user', 'persona', 'target'],
    replies: [
      (name) => `Defining your customer problem sharply is everything, ${name}. Try this:\n\n"[Segment] struggles with [problem] when [context]. Current solutions fail because [gap]. This costs them [time/money/frustration]."\n\nThe more specific, the better. "Small restaurant owners in Tier 2 cities waste 2 hours/day on manual inventory" is 10x stronger than "businesses have inventory problems." Can you fill in that template?`,
    ],
  },
  {
    keywords: ['hello', 'hi', 'hey', 'start', 'begin', 'help', 'who are you', 'what can you do'],
    replies: [
      (name) => `Hey ${name}! I'm your PitchSAP AI advisor. Here's what I can help you with:\n\n💡 Validate your startup idea\n📊 Analyze your market size\n🎯 Find the right investors\n📋 Structure your pitch deck\n🤝 Find co-founders or mentors\n💰 Plan your business model\n\nWhat are you working on? Tell me your idea in one sentence and let's dig in!`,
    ],
  },
];

const fallbacks = [
  (name) => `That's a great question, ${name}. To give you specific advice, could you tell me more about your idea or the stage you're at? That'll help me give you actionable guidance rather than generic advice.`,
  (name) => `Interesting point, ${name}! The fundamentals remain the same for every startup: validate fast, talk to customers constantly, and don't build what you haven't proven people want. What specific challenge are you trying to solve right now?`,
  (name) => `I love that you're thinking about this, ${name}. The founders who ask the right questions early save themselves months of wasted effort. What have you learned so far from potential customers?`,
];

function getMockReply(message, userName) {
  const lower = message.toLowerCase();
  const name = userName ? userName.split(' ')[0] : 'there';
  for (const group of mockResponses) {
    if (group.keywords.some((k) => lower.includes(k))) {
      const pool = group.replies;
      return pool[Math.floor(Math.random() * pool.length)](name);
    }
  }
  return fallbacks[Math.floor(Math.random() * fallbacks.length)](name);
}

// ── POST /api/chat ────────────────────────────────────────────────────────────
// Protected — user must be logged in
router.post('/', protect, async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message cannot be empty.' });
    }

    // Generate mock AI reply
    const reply = getMockReply(message.trim(), req.user.name);

    // Persist to MongoDB
    const saved = await Message.create({
      userId: req.user._id,
      message: message.trim(),
      reply,
    });

    res.status(201).json({
      messageId: saved._id,
      message: saved.message,
      reply: saved.reply,
      timestamp: saved.timestamp,
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error while processing chat.' });
  }
});

// ── GET /api/chat/history ─────────────────────────────────────────────────────
// Returns logged-in user's full chat history
router.get('/history', protect, async (req, res) => {
  try {
    const messages = await Message.find({ userId: req.user._id })
      .sort({ timestamp: 1 })
      .lean();

    res.json({ messages });
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching chat history.' });
  }
});

module.exports = router;
