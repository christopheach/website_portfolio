import type { BookingContent, FaqContent, PricingContent } from "@/types/content";

export const pricing = {
  id: "pricing",
  eyebrow: "Pricing",
  title: "Simple pricing.",
  description:
    "A monthly creative retainer for brands and artists who need fresh, consistent content without juggling freelancers.",
  plans: [
    {
      name: "Creative retainer",
      badge: "2 slots left",
      price: 2400,
      currency: "EUR",
      period: "/month",
      description: "Two shoot days a month, photo and film, fully produced.",
      cta: { label: "Get started", href: "#contact" },
      features: [
        "2 shoot days per month in Paris",
        "40 retouched photos",
        "4 short films or reels",
        "Colour grading on every deliverable",
        "Moodboards and shot lists",
        "Private gallery delivery",
        "Usage rights for social and web",
      ],
    },
  ],
  footnote: {
    text: "Need a single shoot? Day rates start at €750.",
    link: { label: "Ask for a quote", href: "#contact" },
  },
} satisfies PricingContent;

export const booking = {
  id: "contact",
  eyebrow: "Contact",
  title: "Book a call",
  description:
    "Pick a day for a free 15-minute call about your project, dates and budget. I reply within 24 hours.",
  emailLabel: "Email",
  followLabel: "Follow me on",
  calendar: {
    title: "Choose a date",
    timezone: "Paris time (CET)",
    unavailableWeekdays: [0],
    slots: ["10:00", "11:30", "14:00", "16:30", "18:00"],
    emptyState: "Select a date to see available times.",
    timesLabel: "Available times on {date}",
    selectTimeLabel: "Choose a time",
    requestLabel: "Request {date} at {time}",
    mailSubject: "Call request: {date} at {time}",
    mailBody: "Hi Fayad,\n\nI'd like to book a 15-minute call on {date} at {time} (Paris time).\n\nAbout my project:\n",
  },
} satisfies BookingContent;

export const faq = {
  id: "faq",
  eyebrow: "FAQ",
  title: "Frequently asked questions.",
  description: "Shoots, timelines and delivery, answered.",
  items: [
    {
      question: "Do you travel outside Paris?",
      answer:
        "Yes. I shoot across France and Europe regularly. Travel and accommodation are quoted separately, and I can often combine trips to keep costs down.",
    },
    {
      question: "What's your turnaround time?",
      answer:
        "Preview selects arrive within 48 hours. Finished photos take about a week, and edited films one to two weeks depending on length.",
    },
    {
      question: "How many revisions are included?",
      answer:
        "One full round of notes is included on every edit and retouch. Further rounds are billed hourly, and I'll always tell you before that happens.",
    },
    {
      question: "Can you match my brand's existing look?",
      answer:
        "Yes. Send me your guidelines or a few past campaigns and I'll build lighting and a grade that fit, or help you define a new look.",
    },
    {
      question: "Who owns the photos and videos?",
      answer:
        "You receive usage rights for the channels agreed in the quote. Extended rights for print, paid ads or broadcast can be added.",
    },
    {
      question: "What do you need from me before the shoot?",
      answer:
        "A short brief, any references you love, and the people or products being shot. I'll turn that into a moodboard and plan for your approval.",
    },
  ],
} satisfies FaqContent;
