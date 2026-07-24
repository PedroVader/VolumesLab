export type Faq = { q: string; a: string };

export const faqGroups: { title: string; items: Faq[] }[] = [
  {
    title: "Booking & changes",
    items: [
      {
        q: "What happens after I book?",
        a: "Our team confirms your appointment personally by email within 24 hours, including exactly how to prepare for your specific tests.",
      },
      {
        q: "Can I cancel or reschedule?",
        a: "Yes. Cancel or reschedule up to 48 hours before your appointment at no charge. Within 48 hours, a 50% fee applies.",
      },
      {
        q: "Can I book for someone else?",
        a: "Yes. Book normally and add the recipient's details in the notes at checkout, or send them a gift card and let them book at their own pace.",
      },
      {
        q: "Do I need to be fit to come?",
        a: "No. Most of our clients are starting from scratch, the whole point is to measure where you are today. Protocols adapt to every level.",
      },
    ],
  },
  {
    title: "Preparing for your visit",
    items: [
      {
        q: "How should I prepare for my tests?",
        a: "For most tests, come hydrated and wear comfortable clothing. For metabolic and DEXA tests, arrive fasted (no food or caffeine for 4 hours). We'll send full prep instructions with your booking confirmation.",
      },
      {
        q: "What should I wear?",
        a: "Comfortable training clothes and the shoes you usually train in. For 3-D body composition scans, minimal tight-fitting attire works best, we have changing rooms and everything you need.",
      },
      {
        q: "How long will I be in the lab?",
        a: "Individual tests run 15–60 minutes, the Foundational assessment 90 minutes, and the Longevity and Performance assessments around 3 hours, including your debrief.",
      },
    ],
  },
  {
    title: "Results & reports",
    items: [
      {
        q: "When do I get my results?",
        a: "Key numbers are reviewed with you in person on the day. Your full written report, benchmarked against your age group, arrives within 48 hours.",
      },
      {
        q: "Who sees my health data?",
        a: "Only your care team. Your data is stored securely, never sold or shared, and you can request a full export or deletion at any time.",
      },
      {
        q: "Can you share results with my doctor or coach?",
        a: "Yes, with your explicit permission, we send the full report directly to them.",
      },
    ],
  },
  {
    title: "Medical & safety",
    items: [
      {
        q: "Is the VO2max test safe?",
        a: "Yes. It's a maximal-effort test, but it's supervised throughout by our medical team with continuous monitoring, and you can stop at any moment.",
      },
      {
        q: "How much radiation does the bone density scan use?",
        a: "Very little, roughly a tenth of a chest X-ray, comparable to a few hours of natural background radiation.",
      },
      {
        q: "Is the GLP-1 program right for everyone?",
        a: "No, and we say so when it isn't. Eligibility is decided by our physicians at intake based on your health profile and contraindications. Consultation first, prescription only if appropriate.",
      },
      {
        q: "Do you accept insurance?",
        a: "We're a private lab and do not process insurance directly. We can provide an itemised invoice for reimbursement claims.",
      },
    ],
  },
  {
    title: "Gift cards",
    items: [
      {
        q: "Can I buy a gift card?",
        a: "Every test, assessment and package is available as a gift card. Choose 'Gift card' on any product and we'll email a redeemable code instantly.",
      },
      {
        q: "How long are gift cards valid?",
        a: "12 months from purchase. The recipient books whichever date suits them within that window.",
      },
    ],
  },
  {
    title: "Location & practical",
    items: [
      {
        q: "Where are you located?",
        a: "Calle Churruca 5, Madrid, in the heart of Chamberí. See the Contact page for directions, metro and parking.",
      },
      {
        q: "Do you offer memberships?",
        a: "Yes, our Human Performance and Body Recomposition memberships combine testing, personal training and medical oversight. See the Memberships section for details.",
      },
      {
        q: "What languages do you speak?",
        a: "The full experience, testing, debriefs and reports, is available in English and Spanish.",
      },
    ],
  },
];

// Flat list kept for any existing imports.
export const faqs: Faq[] = faqGroups.flatMap((g) => g.items);
