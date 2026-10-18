const e=import.meta.env;

// Every link below was verified live before being added. GitHub + demo URLs are
// env-overridable, but the fallbacks are the real, working production URLs.
export const CONFIG={
 github:e.VITE_GITHUB_URL||'https://github.com/codewithabhii1210',
 linkedin:e.VITE_LINKEDIN_URL||'https://www.linkedin.com/in/abhisheksingh1210',
 email:e.VITE_EMAIL||'abhisingh12102007@gmail.com',
 photo:e.VITE_PHOTO||'/profile.jpg',
 certImage:e.VITE_CERT_IMAGE||'',
 problemsSolved:400,streakDays:100,
 projects:[
  {
   id:'neuralx',
   name:'NexHeal',
   product:'NeuralX · HackWave 3.0',
   tag:'Featured Project',
   year:'2026',
   kind:'AI · Developer Tools',
   summary:'NexHeal is an intent-aware, self-healing end-to-end testing engine. Instead of brittle CSS selectors, tests are written as high-level user outcomes — when the UI changes, an AI reasoning engine finds the replacement element mid-flight and resumes the run.',
   stack:['React','Node.js','Playwright','MongoDB','Socket.io','AI Reasoning'],
   highlights:[
    'Live Chaos Mode mutates the UI mid-run and auto-heals selectors in milliseconds.',
    'Intent Graph renders every test as a live node state machine with healing states.',
    'Smart Triage separates harmless UI edits from genuine regressions.'
   ],
   github:e.VITE_NEURALX_GITHUB||'https://github.com/codewithabhii1210/HackWave-neuralx',
   live:e.VITE_NEURALX_LIVE||'https://hackwave-neuralx.vercel.app'
  },
  {
   id:'sevenheaven',
   name:'SevenHeaven',
   product:'Seven Heaven Cosmetics',
   tag:'E-commerce',
   year:'2026',
   kind:'Full-Stack Storefront',
   summary:'A complete black-and-gold luxury redesign of sevenheaven.co.in — a production e-commerce platform for a cosmetics brand, rebuilt from the ground up with a new architecture and design system.',
   stack:['React 19','Vite','React Router','Context API','Node.js','Express','MongoDB','Razorpay'],
   highlights:[
    'Cart, wishlist, auth and language state managed with Context API.',
    'Razorpay online payments plus cash-on-delivery checkout flow.',
    'JWT authentication with an admin panel for products and orders.'
   ],
   github:e.VITE_SEVENHEAVEN_GITHUB||'https://github.com/codewithabhii1210/sevenheaven.',
   live:e.VITE_SEVENHEAVEN_LIVE||'https://sevenheaven-plum.vercel.app'
  },
  {
   id:'sehatsaarthi',
   name:'SehatSaarthi',
   product:'SIH 2026 · Healthcare',
   tag:'Featured Project',
   year:'2026',
   kind:'Full-Stack Healthcare',
   summary:'A full-stack healthcare platform connecting citizens, ASHA health workers, doctors and district administration — teleconsultation, digital triage, referrals, immunisation tracking, lab orders and AI-assisted support.',
   stack:['React','Vite','Tailwind CSS','Node.js','Express','MongoDB','Socket.io','JWT','i18next'],
   highlights:[
    'Role-based dashboards for patient, health worker, doctor and district admin.',
    'RESTful services with Node.js, Express and MongoDB.',
    'Real-time queue and referral updates over Socket.io.',
    'Multilingual interface with i18next for rural reach.'
   ],
   github:e.VITE_SEHATSAARTHI_GITHUB||'https://github.com/codewithabhii1210/SehatSaarthi',
   live:e.VITE_SEHATSAARTHI_LIVE||'https://sehatsaarthi-app.vercel.app'
  }
 ]
};
