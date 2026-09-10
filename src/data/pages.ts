// Page copy, pulled out of the components so it can be edited rather than
// deployed. Every object here is shaped like the Payload collection it will
// become, so wiring the CMS is a change of source, not a rewrite of the pages:
//
//   homePage        -> global "Home"
//   productLabels   -> global "Product page labels"
//   aboutPage       -> global "About"
//   labPage         -> global "The Lab"
//   faqPage         -> global "FAQ page"
//   blogPage        -> global "Blog page"
//
// Commercial values (price, duration, availability) are deliberately absent.
// Momence owns those; putting them here too would create a second source of
// truth and they would drift.

export type SectionCopy = { title: string; description: string };

export const homePage = {
  intro:
    "Volumes Lab combines advanced testing, a medical team, personal training, and peptide therapies in one space. Membership options available.",
  headline: "Madrid Health & Performance Lab",
  sections: {
    tests: {
      title: "Tests",
      description: "Measure one specific area on its own.",
    },
    assessments: {
      title: "Assessments",
      description: "Combinations of tests, run in a single visit.",
    },
    medical: {
      title: "Medical Appointment",
      description: "Talk to a doctor about peptides and GLP-1.",
    },
    train: {
      title: "Train",
      description: "Personal training sessions with a strength and conditioning coach.",
    },
    memberships: {
      title: "Memberships",
      description: "Ongoing testing, training and medical support.",
    },
  } as Record<"tests" | "assessments" | "medical" | "train" | "memberships", SectionCopy>,
};

// The SKU template is one component rendering 19 pages, so a single edit here
// changes every product page at once.
export const productLabels = {
  whatItIs: "What it is",
  howItWorks: "How it works",
  questions: "Questions",
  prepPrefix: "Before you come:",
  priceTbdNote: "Price shown is indicative and pending confirmation.",

  modules: {
    testIncludedIn: "Included in",
    testNote: "Booking the assessment is cheaper than booking each test on its own.",
    assessmentIncludes: "Includes",
    trainingOtherOptions: "Other options",
    trainingNote: "Larger packs bring the price per session down.",
    membershipIncluded: "What's included",
    membershipHowToJoin: "How to join",
    membershipSteps: ["Enquire", "15-minute call", "Join"],
    medicalTitle: "How the consultation works",
    medicalIntro:
      "A 30-minute appointment with a Volumes Lab doctor to discuss peptide and GLP-1 treatment, your history and whether it is appropriate for you.",
    medicalSteps: ["Purchase", "Book the doctor", "Consultation", "Treatment if appropriate"],
    medicalNote:
      "Treatment is prescribed only where clinically appropriate. Medication is purchased separately, and any required bloodwork is completed through an external provider.",
  },

  finalCta: {
    membership: "Ready to join?",
    training: "Ready to start training?",
    medical: "Ready to talk to a doctor?",
    default: "Ready to book?",
  },
};

export const aboutPage = {
  steps: [
    {
      title: "Test",
      body: "Measure body composition, bone density, metabolism, cardiovascular fitness, strength and movement.",
    },
    {
      title: "Understand",
      body: "Review the results with the Volumes Lab medical and performance team.",
    },
    {
      title: "Treat or train",
      body: "Follow a personalised program or, where appropriate, a medically supervised treatment plan.",
    },
    { title: "Retest", body: "Measure progress and adjust the program using objective data." },
  ],
};

export const labPage = {
  areas: [
    {
      title: "Testing areas",
      body: "Lab-grade equipment for body composition, bone density, metabolism, cardiovascular fitness, strength and movement.",
    },
    { title: "Medical room", body: "Private consultation and review with the medical team." },
    {
      title: "3D body scanning",
      body: "Fast, repeatable body-composition scans to track change over time.",
    },
    { title: "Training floor", body: "A dedicated space for private personal training sessions." },
  ],
};

// FAQ page framing. The questions themselves are the Faqs collection; this is
// the heading above them and the band below. {email} in the intro becomes a
// mailto link to the contact email.
export const faqPage = {
  eyebrow: "Frequently asked",
  headline: "Questions.",
  intro:
    "Everything people ask before their first visit. Something missing? Write to {email} and ask a human.",
  band: "Still curious? Come see the lab.",
};

// Blog index framing. The posts themselves are the Posts collection.
export const blogPage = {
  eyebrow: "Journal / 01",
  headline: "Field notes on performance & longevity.",
  intro:
    "Short essays from the lab floor. What we measure, what the numbers mean, and how we translate them into training.",
  cta: {
    eyebrow: "Your turn",
    headline: "Reading about numbers is nice. Knowing yours is better.",
    button: "Book a test",
  },
};

// The legal page body. Kept as labelled paragraphs rather than one blob so the
// CMS can present them as separate fields and nobody has to edit HTML.
export const legalPage = {
  title: "Legal & Privacy",
  companyHeading: "Company information",
  labels: {
    legalName: "Registered name",
    tradingName: "Trading as",
    taxId: "Tax ID (NIF/CIF)",
    registeredAddress: "Registered address",
    premises: "Premises",
    email: "Email",
    phone: "Phone",
    pending: "pending",
  },
  privacyHeading: "Privacy notice",
  privacy: [
    {
      lead: "Who is responsible.",
      body: "{company}, at the contact details above, is the data controller for the personal data collected through this website.",
    },
    {
      lead: "What this website collects.",
      body: "This site is informational. It does not take bookings or payments and does not require an account. If you write to us using the contact form or by email, we receive the name, email address and message you send. We use anonymous, aggregated analytics to understand how the site is used; these do not identify you individually.",
    },
    {
      lead: "Why, and on what basis.",
      body: "We use your message solely to reply to it, on the basis of your request. We keep it only as long as needed to deal with your enquiry and to meet any legal obligation.",
    },
    {
      lead: "Booking and payment happen elsewhere.",
      body: "When you choose to book or buy, you leave this website for our booking platform, Momence, which acts as processor and handles the appointment and the payment under its own terms and privacy policy. Any health or clinical information you give us as a patient is handled outside this website, under the information we provide you at the clinic.",
    },
    {
      lead: "Who else sees your data.",
      body: "Our website hosting and analytics providers process data on our behalf under contract. We do not sell your personal data or share it for advertising.",
    },
    {
      lead: "Your rights.",
      body: "You can ask us for access to your data, or to correct, delete, restrict or object to its use, or to receive it in a portable form. Write to {email}. You may also lodge a complaint with the Spanish data protection authority, the Agencia Española de Protección de Datos (aepd.es).",
    },
    {
      lead: "Cookies.",
      body: "This site uses essential local storage and, only if you accept, Google Analytics cookies to understand aggregate website usage. We do not use analytics data for advertising. You can change your choice at any time using Cookie settings.",
    },
  ],
  backLink: "Back to Volumes Lab",
};
