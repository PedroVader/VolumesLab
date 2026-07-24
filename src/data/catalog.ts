export type Product = {
  slug: string;
  name: string;
  tagline: string;
  price: number; // EUR
  duration?: string;
  category: "membership" | "assessment" | "test" | "package";
  categoryLabel: string;
  measures: string[];
  protocol: string[];
  goodFor: string[];
  giftable?: boolean;
};

export const memberships: Product[] = [
  {
    slug: "health-performance",
    name: "Human Performance",
    tagline: "Personal training, medical oversight and regular retesting under one membership.",
    price: 450,
    duration: "per month",
    category: "membership",
    categoryLabel: "Membership",
    measures: ["Quarterly retesting", "1:1 personal training", "Nutrition guidance", "Medical oversight"],
    protocol: [
      "Initial Foundational assessment to set your baseline.",
      "Weekly 1:1 training sessions with your dedicated coach.",
      "Ongoing medical oversight from our clinical team.",
      "Quarterly retesting to track your progress objectively.",
    ],
    goodFor: ["Individuals committed to long-term health optimization", "Anyone wanting measurable, data-led training"],
    giftable: true,
  },
  {
    slug: "glp-1",
    name: "Body Recomposition (GLP-1)",
    tagline: "Physician-led peptide therapy combining GLP-1 agonists with training and testing.",
    price: 550,
    duration: "per month",
    category: "membership",
    categoryLabel: "Membership",
    measures: ["Medical consultation", "Prescription & monitoring", "Body composition tracking", "Metabolic follow-up"],
    protocol: [
      "Full medical intake and eligibility review.",
      "Personalized GLP-1 protocol with monthly follow-ups.",
      "Body composition and metabolic retesting every 8 weeks.",
      "Training and nutrition guidance included.",
    ],
    goodFor: ["Adults pursuing sustainable weight and metabolic health under medical supervision"],
    giftable: false,
  },
];

export const assessments: Product[] = [
  {
    slug: "foundations",
    name: "Foundational",
    tagline: "Your baseline snapshot across strength, mobility, metabolism and body composition.",
    price: 490,
    duration: "90 minutes",
    category: "assessment",
    categoryLabel: "Complete Assessment",
    measures: ["3-D Body Composition", "Grip Strength", "Mobility Screen", "Resting Metabolic Rate"],
    protocol: [
      "Intake and health history review.",
      "Full body composition and mobility screen.",
      "Strength and metabolic baseline testing.",
      "Clinical debrief with a personalised action plan.",
    ],
    goodFor: ["First-time visitors", "Anyone establishing a health baseline"],
    giftable: true,
  },
  {
    slug: "longevity",
    name: "Longevity",
    tagline: "A deeper look at cardiorespiratory fitness, bone density and metabolic health.",
    price: 890,
    duration: "3 hours",
    category: "assessment",
    categoryLabel: "Complete Assessment",
    measures: ["VO2max", "Bone Mineral Density", "3-D Body Composition", "Metabolic Assessment", "Mobility"],
    protocol: [
      "Foundational tests plus VO2max and bone density scan.",
      "Cardio-metabolic screening with our physician.",
      "Longevity-focused report with 12-month recommendations.",
    ],
    goodFor: ["Adults optimizing for healthspan", "Preventive-health focused clients"],
    giftable: true,
  },
  {
    slug: "performance",
    name: "Performance",
    tagline: "Full physiological workup for anyone chasing measurable gains.",
    price: 1190,
    duration: "3.5 hours",
    category: "assessment",
    categoryLabel: "Complete Assessment",
    measures: ["VO2max with lactate", "Gait Analysis", "Strength Assessment", "3-D Body Composition", "Mobility"],
    protocol: [
      "Sport-specific intake and goal review.",
      "Complete lab performance workup including lactate and gait.",
      "Coach-led debrief translating results into training zones.",
    ],
    goodFor: ["Endurance and strength athletes", "Anyone training with objectives"],
    giftable: true,
  },
];

export const tests: Product[] = [
  {
    slug: "vo2max",
    name: "VO2Max Test",
    tagline: "The gold-standard measure of cardiorespiratory fitness and aerobic capacity.",
    price: 260,
    duration: "60 minutes",
    category: "test",
    categoryLabel: "Individual Test",
    measures: ["VO2max", "Ventilatory thresholds", "Heart-rate training zones"],
    protocol: [
      "Warm-up and calibration.",
      "Graded exercise test on treadmill or bike until volitional exhaustion.",
      "Personalised training zones and debrief.",
    ],
    goodFor: ["Runners, cyclists, triathletes", "Anyone building a science-based training plan"],
    giftable: true,
  },
  {
    slug: "3d-body-composition",
    name: "3-D Body Composition",
    tagline: "Millimetre-accurate scan of body fat, lean mass and posture in under a minute.",
    price: 90,
    duration: "20 minutes",
    category: "test",
    categoryLabel: "Individual Test",
    measures: ["Segmental body fat & lean mass", "Circumferences", "Posture symmetry"],
    protocol: ["Change into scan attire.", "30-second full-body 3-D scan.", "Results walkthrough with your coach."],
    goodFor: ["Anyone tracking body-composition changes objectively"],
    giftable: true,
  },
  {
    slug: "bone-mineral-density",
    name: "Bone Mineral Density",
    tagline: "Clinical scan for bone health, osteopenia and osteoporosis screening.",
    price: 180,
    duration: "30 minutes",
    category: "test",
    categoryLabel: "Individual Test",
    measures: ["Bone mineral density", "T-score & Z-score", "Fracture-risk context"],
    protocol: ["Screening questionnaire.", "Bone density scan of hip and lumbar spine.", "Physician-led results review."],
    goodFor: ["Adults 40+", "Post-menopausal women", "Athletes with high training loads"],
    giftable: true,
  },
  {
    slug: "gait-analysis",
    name: "Gait Analysis",
    tagline: "3-D running and walking analysis to unlock efficiency and reduce injury risk.",
    price: 220,
    duration: "60 minutes",
    category: "test",
    categoryLabel: "Individual Test",
    measures: ["Kinematics", "Ground contact & cadence", "Asymmetries"],
    protocol: ["Movement screen.", "Instrumented treadmill capture.", "Coach debrief with cues and drills."],
    goodFor: ["Runners", "Athletes returning from injury"],
    giftable: true,
  },
  {
    slug: "grip-strength",
    name: "Grip Strength",
    tagline: "A five-minute test that predicts long-term health and muscular capacity.",
    price: 40,
    duration: "15 minutes",
    category: "test",
    categoryLabel: "Individual Test",
    measures: ["Peak grip force", "Left-right asymmetry", "Age-normed percentile"],
    protocol: ["Warm-up.", "Standardised handgrip trials.", "Instant percentile scoring."],
    goodFor: ["Everyone, grip strength is one of the strongest predictors of longevity"],
    giftable: true,
  },
  {
    slug: "metabolic-assessment",
    name: "Metabolic Assessment",
    tagline: "Measure your resting metabolic rate and how efficiently you burn fat and carbs.",
    price: 190,
    duration: "45 minutes",
    category: "test",
    categoryLabel: "Individual Test",
    measures: ["Resting metabolic rate", "Substrate utilisation", "Caloric requirements"],
    protocol: ["Fasted arrival.", "Indirect calorimetry.", "Nutrition-focused debrief."],
    goodFor: ["Anyone dialling in body composition or nutrition"],
    giftable: true,
  },
  {
    slug: "mobility-assessment",
    name: "Mobility Assessment",
    tagline: "A functional screen of joint mobility, movement quality and asymmetries.",
    price: 130,
    duration: "45 minutes",
    category: "test",
    categoryLabel: "Individual Test",
    measures: ["Joint ROM", "Movement patterns", "Asymmetry index"],
    protocol: ["Movement interview.", "Full-body mobility screen.", "Corrective exercise plan."],
    goodFor: ["Desk workers", "Athletes wanting durability"],
    giftable: true,
  },
  {
    slug: "strength-assessment",
    name: "Strength Assessment",
    tagline: "Quantify lower and upper body force to guide training and reduce injury risk.",
    price: 160,
    duration: "60 minutes",
    category: "test",
    categoryLabel: "Individual Test",
    measures: ["Isometric force", "Left-right asymmetry", "Force-velocity profile"],
    protocol: ["Warm-up.", "Force-plate strength tests.", "Coach-led debrief."],
    goodFor: ["Strength athletes", "Anyone benchmarking force production"],
    giftable: true,
  },
];

export const packages: Product[] = [
  {
    slug: "cardio-pack-4",
    name: "Cardio Pack, 4 sessions",
    tagline: "Four VO2max-informed cardio sessions with a coach.",
    price: 320,
    category: "package",
    categoryLabel: "Package",
    measures: ["4 x 1h sessions", "Heart-rate zone coaching", "Progress notes"],
    protocol: ["Book at your own pace within 3 months."],
    goodFor: ["Athletes prepping for a race", "Anyone starting structured cardio"],
    giftable: true,
  },
  {
    slug: "pt-pack-10",
    name: "Personal Training, 10 sessions",
    tagline: "Ten 1:1 sessions with one of our performance coaches.",
    price: 750,
    category: "package",
    categoryLabel: "Package",
    measures: ["10 x 1h sessions", "Programme design", "Retest at end"],
    protocol: ["Use within 4 months."],
    goodFor: ["Committed clients wanting structure without a full membership"],
    giftable: true,
  },
  {
    slug: "retest-bundle",
    name: "Quarterly Retest Bundle",
    tagline: "Four retests over 12 months to keep your data honest.",
    price: 690,
    category: "package",
    categoryLabel: "Package",
    measures: ["4 x Foundational retests"],
    protocol: ["Booked every 12 weeks."],
    goodFor: ["Anyone tracking progress objectively over a year"],
    giftable: true,
  },
];

export const allProducts: Product[] = [...memberships, ...assessments, ...tests, ...packages];

export function findProduct(slug: string): Product | undefined {
  return allProducts.find((p) => p.slug === slug);
}
