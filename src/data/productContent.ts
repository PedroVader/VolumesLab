// Marketing content layer for product pages.
// Commerce data (price, slug, cart) lives in catalog.ts, everything that
// sells the product (outcomes, sample reports, FAQs, visit experience) lives here.

export type SampleMetric = {
  label: string;
  value: string;
  percentile: number; // 0–100, rendered as a bar vs. age-matched reference
  note?: string;
};

export type IllustrationKey =
  | "vo2max"
  | "bodycomp"
  | "bone"
  | "gait"
  | "grip"
  | "metabolic"
  | "mobility"
  | "strength"
  | "foundations"
  | "longevity"
  | "performance"
  | "membership"
  | "glp1"
  | "cardiopack"
  | "ptpack"
  | "retest";

export type ProductContent = {
  illustration: IllustrationKey;
  heroProof: string[]; // micro-trust items under the hero CTA
  outcomes: string[]; // what you walk away with
  measuresDetail: { name: string; why: string }[];
  experience: { title: string; body: string }[]; // the visit, step by step
  sampleReport: { title: string; metrics: SampleMetric[]; footnote: string };
  prep: string[];
  notFor: string[];
  faqs: { q: string; a: string }[];
  related: string[]; // product slugs
};

export const productContent: Record<string, ProductContent> = {
  // ---------------- MEMBERSHIPS ----------------
  "health-performance": {
    illustration: "membership",
    heroProof: ["Physician-led", "Cancel anytime after 3 months", "Quarterly retests included"],
    outcomes: [
      "A dedicated coach and a medical team who know your numbers by name.",
      "A training plan rewritten every quarter from fresh lab data, not guesswork.",
      "A trendline, not a snapshot: watch VO2max, strength and body composition move.",
    ],
    measuresDetail: [
      { name: "Quarterly retesting", why: "Every 12 weeks we re-measure the full Foundational battery, so progress is objective." },
      { name: "1:1 personal training", why: "Weekly sessions programmed from your latest results, not a generic template." },
      { name: "Nutrition guidance", why: "Caloric and protein targets tied to your measured metabolic rate." },
      { name: "Medical oversight", why: "Our clinical team reviews every report and flags what training alone can't fix." },
    ],
    experience: [
      { title: "Month 1, Baseline", body: "Full Foundational assessment, goal-setting with your coach, and your first training block." },
      { title: "Months 2–3, Build", body: "Weekly 1:1 sessions, nutrition targets, and direct message access to the team." },
      { title: "Every quarter, Prove it", body: "Retest, review the trendline with your coach and physician, rewrite the plan." },
    ],
    sampleReport: {
      title: "Sample quarter review",
      metrics: [
        { label: "VO2max", value: "+9.2%", percentile: 72, note: "vs. your baseline" },
        { label: "Lean mass", value: "+1.8 kg", percentile: 64, note: "vs. your baseline" },
        { label: "Grip strength", value: "+11%", percentile: 68, note: "vs. your baseline" },
        { label: "Sessions completed", value: "11 / 12", percentile: 92 },
      ],
      footnote: "Illustrative results from a typical first two quarters. Yours will be measured, not promised.",
    },
    prep: ["Bring training shoes and clothes you can move in.", "No fasting needed for regular sessions."],
    notFor: ["Anyone looking for a casual gym, this is a measured, coached programme."],
    faqs: [
      { q: "What's the minimum commitment?", a: "Three months. Real, measurable change needs at least one full training and retest cycle." },
      { q: "Can I pause my membership?", a: "Yes, up to one month per year for travel or injury, with your retest schedule shifted accordingly." },
    ],
    related: ["foundations", "longevity", "pt-pack-10"],
  },
  "glp-1": {
    illustration: "glp1",
    heroProof: ["Physician-prescribed", "Monthly medical follow-ups", "Body composition tracked"],
    outcomes: [
      "A medically supervised protocol, prescription, dosing and monitoring by our physicians.",
      "Weight loss that protects muscle: body composition scans every 8 weeks keep us honest.",
      "Training and nutrition built around the medication, so results outlast it.",
    ],
    measuresDetail: [
      { name: "Medical consultation", why: "Full intake, contraindication screening and eligibility review before anything is prescribed." },
      { name: "Prescription & monitoring", why: "Dosing adjusted monthly based on response, side effects and labs." },
      { name: "Body composition tracking", why: "GLP-1s can cost lean mass, we scan every 8 weeks and correct course early." },
      { name: "Metabolic follow-up", why: "Resting metabolic rate checks keep your nutrition targets accurate as you lose weight." },
    ],
    experience: [
      { title: "Week 1, Medical intake", body: "Consultation, history, contraindication review and baseline body composition scan." },
      { title: "Monthly, Follow-ups", body: "Dose review with the physician, side-effect check and nutrition adjustment." },
      { title: "Every 8 weeks, Scan", body: "3-D body composition and metabolic retest: weight down, muscle defended." },
    ],
    sampleReport: {
      title: "Sample 12-week review",
      metrics: [
        { label: "Weight", value: "−6.2 kg", percentile: 70, note: "12 weeks" },
        { label: "Waist", value: "−5 cm", percentile: 66 },
        { label: "Lean mass", value: "−0.3 kg", percentile: 88, note: "protected" },
        { label: "Adherence", value: "96%", percentile: 96 },
      ],
      footnote: "Illustrative results. Every protocol is individual and medically supervised.",
    },
    prep: ["Fasted blood work may be requested before your first prescription.", "Bring a list of current medications."],
    notFor: ["Anyone seeking medication without medical oversight or lifestyle change."],
    faqs: [
      { q: "Am I eligible?", a: "Eligibility is decided by our physicians at intake, based on BMI, metabolic health and contraindications. The consultation comes first, prescription only if it's appropriate." },
      { q: "What about side effects?", a: "Nausea and GI effects are the most common and are managed through slow dose titration at your monthly follow-ups. You have direct access to the medical team between visits." },
    ],
    related: ["metabolic-assessment", "3d-body-composition", "health-performance"],
  },

  // ---------------- ASSESSMENTS ----------------
  foundations: {
    illustration: "foundations",
    heroProof: ["The recommended starting point", "Report within 48h", "Clinical debrief included"],
    outcomes: [
      "Your baseline across the four pillars: body composition, strength, mobility, metabolism.",
      "A personalised action plan, reviewed with a clinician before you leave.",
      "The reference point every future retest is measured against.",
    ],
    measuresDetail: [
      { name: "3-D Body Composition", why: "Millimetre-accurate fat, lean mass and posture, the bathroom scale, resolved." },
      { name: "Grip Strength", why: "One of the strongest single predictors of long-term health, scored against your age group." },
      { name: "Mobility Screen", why: "How freely your joints move today predicts how freely they'll move at seventy." },
      { name: "Resting Metabolic Rate", why: "How many calories your body actually burns, the foundation of any nutrition plan." },
    ],
    experience: [
      { title: "Arrive & intake", body: "Health history review with the team. Come fasted, water is fine." },
      { title: "The testing battery", body: "Around 60 minutes: 3-D scan, grip dynamometry, mobility screen and resting metabolic rate." },
      { title: "Clinical debrief", body: "We walk through every number, what it means, and your written action plan." },
    ],
    sampleReport: {
      title: "Sample Foundational report",
      metrics: [
        { label: "Body fat", value: "18.4%", percentile: 61 },
        { label: "Grip strength", value: "44 kg", percentile: 72 },
        { label: "Resting metabolic rate", value: "1,680 kcal", percentile: 55 },
        { label: "Mobility score", value: "86 / 100", percentile: 78 },
      ],
      footnote: "Sample data from a 45-year-old male profile. Your report benchmarks you against your own age group.",
    },
    prep: ["Fasted, no food or caffeine for 4 hours before.", "Comfortable clothing; the 3-D scan needs minimal, tight-fitting attire."],
    notFor: ["Competitive athletes, go straight to the Performance assessment."],
    faqs: [
      { q: "How long does it take?", a: "90 minutes door to door, including the debrief. Your full written report arrives within 48 hours." },
      { q: "How often should I retest?", a: "Every 12 weeks if you're actively training on the plan; every 6–12 months for maintenance." },
    ],
    related: ["longevity", "health-performance", "retest-bundle"],
  },
  longevity: {
    illustration: "longevity",
    heroProof: ["Our most complete healthspan picture", "Physician-led cardio-metabolic screen", "12-month roadmap included"],
    outcomes: [
      "The deepest look we offer at the numbers that predict how long, and how well, you'll live.",
      "A cardio-metabolic screening with our physician, not a printout.",
      "A 12-month, longevity-focused roadmap built from your results.",
    ],
    measuresDetail: [
      { name: "VO2max", why: "The strongest modifiable predictor of all-cause mortality in the literature." },
      { name: "Bone Mineral Density", why: "Clinical screening for osteopenia and osteoporosis, years before symptoms." },
      { name: "3-D Body Composition", why: "Visceral fat and lean mass, quantified region by region." },
      { name: "Metabolic Assessment", why: "Resting metabolic rate and substrate use, how your engine runs at rest." },
      { name: "Mobility", why: "Movement quality today is independence in your seventies." },
    ],
    experience: [
      { title: "Foundational battery", body: "The complete Foundational protocol: body composition, grip, mobility, metabolic rate." },
      { title: "VO2max & bone density", body: "Graded exercise test to exhaustion, then a clinical bone density scan of hip and spine." },
      { title: "Physician review", body: "Cardio-metabolic screening and a 12-month longevity roadmap, delivered in person." },
    ],
    sampleReport: {
      title: "Sample Longevity report",
      metrics: [
        { label: "VO2max", value: "46.2 ml/kg/min", percentile: 78 },
        { label: "Bone density (T-score)", value: "−0.4", percentile: 84, note: "spine" },
        { label: "Body fat", value: "18.4%", percentile: 61 },
        { label: "Resting metabolic rate", value: "1,680 kcal", percentile: 55 },
      ],
      footnote: "Sample data. Your report includes 30+ markers benchmarked against your age group.",
    },
    prep: ["Fasted, no food or caffeine for 4 hours before.", "Bring training shoes for the VO2max test."],
    notFor: ["Anyone with a known cardiac condition, speak to us first; we'll adapt the protocol."],
    faqs: [
      { q: "Why three hours?", a: "Five clinical-grade measurements, each with calibration and rest periods, plus an unhurried physician review. Nothing is rushed." },
      { q: "Is the bone scan safe?", a: "Yes, it's a very low-dose scan, a fraction of the radiation of a chest X-ray." },
    ],
    related: ["foundations", "health-performance", "vo2max"],
  },
  performance: {
    illustration: "performance",
    heroProof: ["Built for athletes", "Lactate + gait included", "Coach-led debrief"],
    outcomes: [
      "Your complete physiological profile: engine, force, movement, composition.",
      "Training zones calculated from lactate and ventilatory data, not age formulas.",
      "A coach-led debrief that turns the workup into next month's training plan.",
    ],
    measuresDetail: [
      { name: "VO2max with lactate", why: "Pinpoints your thresholds to the beat, the difference between training hard and training right." },
      { name: "Gait Analysis", why: "3-D running mechanics reveal the inefficiencies costing you watts and causing injuries." },
      { name: "Strength Assessment", why: "Force-plate testing quantifies power and left-right asymmetries." },
      { name: "3-D Body Composition", why: "Lean mass distribution, segment by segment." },
      { name: "Mobility", why: "The range-of-motion limits hiding in your stride and your squat." },
    ],
    experience: [
      { title: "Sport-specific intake", body: "Goals, race calendar, training history and current load with your coach." },
      { title: "The workup", body: "Around 2.5 hours: VO2max with lactate sampling, gait capture, force plates, scan and mobility screen." },
      { title: "Coach debrief", body: "Your zones, your limiters, and the specific sessions to fix them." },
    ],
    sampleReport: {
      title: "Sample Performance report",
      metrics: [
        { label: "VO2max", value: "58.1 ml/kg/min", percentile: 93 },
        { label: "Lactate threshold", value: "172 bpm", percentile: 90, note: "LT2" },
        { label: "Countermovement jump", value: "34 cm", percentile: 81 },
        { label: "Gait asymmetry", value: "3.1%", percentile: 74, note: "lower is better" },
      ],
      footnote: "Sample data from a sub-3h marathon profile.",
    },
    prep: ["Come rested, no hard sessions for 48 hours.", "Bring your usual running or cycling kit and shoes."],
    notFor: ["Complete beginners, Foundational will serve you better first."],
    faqs: [
      { q: "Treadmill or bike?", a: "Either. We test on the modality you compete in, treadmill for runners, ergometer for cyclists and triathletes." },
      { q: "Can my coach get the results?", a: "Yes, with your permission we share the full report and zones directly with them." },
    ],
    related: ["vo2max", "gait-analysis", "cardio-pack-4"],
  },

  // ---------------- TESTS ----------------
  vo2max: {
    illustration: "vo2max",
    heroProof: ["Gold-standard protocol", "Treadmill or bike", "Zones included"],
    outcomes: [
      "Your true VO2max in ml/kg/min, measured breath by breath, not estimated by a watch.",
      "Ventilatory thresholds and five heart-rate training zones, precise to the beat.",
      "A debrief on how to move the number: zone 2 volume and intervals that work.",
    ],
    measuresDetail: [
      { name: "VO2max", why: "The ceiling of your aerobic engine, and the strongest modifiable predictor of longevity." },
      { name: "Ventilatory thresholds", why: "VT1 and VT2 mark the effort you can sustain for hours versus minutes. Training is built around them." },
      { name: "Heart-rate training zones", why: "Five zones calculated from your physiology, so every session has a purpose." },
    ],
    experience: [
      { title: "Warm-up & calibration", body: "Mask fitting, analyzer calibration and an easy 10-minute warm-up." },
      { title: "The test", body: "A graded ramp on treadmill or bike, getting steeper every minute until you call it, usually 8–14 minutes of work." },
      { title: "Zones & debrief", body: "Your number, your thresholds, and how to train them." },
    ],
    sampleReport: {
      title: "Sample VO2max report",
      metrics: [
        { label: "VO2max", value: "46.2 ml/kg/min", percentile: 78 },
        { label: "VT1 (aerobic threshold)", value: "132 bpm", percentile: 70 },
        { label: "VT2 (anaerobic threshold)", value: "168 bpm", percentile: 80 },
        { label: "Max heart rate", value: "184 bpm", percentile: 65 },
      ],
      footnote: "Sample data from a 40-year-old male profile. Percentiles are age- and sex-matched.",
    },
    prep: ["No hard training for 24–48 hours before.", "No food or caffeine for 3 hours before.", "Bring the shoes you train in."],
    notFor: ["Anyone with uncontrolled cardiac symptoms, speak with us first."],
    faqs: [
      { q: "Is it painful?", a: "It's hard but short: the last two minutes are genuinely tough, then it's over. Most people say it feels like the end of a 5k race." },
      { q: "How often should I retest?", a: "Every 8–12 weeks during a focused training block is ideal to see the number move." },
    ],
    related: ["performance", "cardio-pack-4", "metabolic-assessment"],
  },
  "3d-body-composition": {
    illustration: "bodycomp",
    heroProof: ["30-second scan", "Millimetre accuracy", "Same-day results"],
    outcomes: [
      "Exact body fat and lean mass, segment by segment, left arm versus right, trunk versus legs.",
      "Posture and symmetry analysis from a full 3-D avatar.",
      "The objective baseline for any fat-loss or muscle-gain phase.",
    ],
    measuresDetail: [
      { name: "Segmental body fat & lean mass", why: "Total weight hides everything; segmental data shows exactly where you're gaining or losing." },
      { name: "Circumferences", why: "Waist, hip, thigh and more, measured by the scanner, not a tape." },
      { name: "Posture symmetry", why: "Front and side posture analysis flags the imbalances your desk job is building." },
    ],
    experience: [
      { title: "Change", body: "Into scan attire, minimal and tight-fitting for accuracy." },
      { title: "The scan", body: "Stand still on the turntable for 30 seconds while the scanner captures your full body in 3-D." },
      { title: "Walkthrough", body: "Your coach takes you through the avatar, the numbers and what to change." },
    ],
    sampleReport: {
      title: "Sample body composition report",
      metrics: [
        { label: "Body fat", value: "18.4%", percentile: 61 },
        { label: "Lean mass", value: "61.2 kg", percentile: 74 },
        { label: "Waist circumference", value: "84 cm", percentile: 58 },
        { label: "Posture symmetry", value: "94 / 100", percentile: 82 },
      ],
      footnote: "Sample data from a 42-year-old male profile.",
    },
    prep: ["No large meals for 2 hours before.", "Scan is done in minimal, tight-fitting attire, we provide what you need."],
    notFor: ["Anyone with a pacemaker, ask us about alternatives."],
    faqs: [
      { q: "How accurate is it?", a: "Circumferences are millimetre-accurate and, crucially, identical every visit, which makes it far better than tape or scales for tracking change." },
      { q: "How often should I scan?", a: "Every 4–8 weeks during an active fat-loss or muscle-gain phase." },
    ],
    related: ["metabolic-assessment", "foundations", "glp-1"],
  },
  "bone-mineral-density": {
    illustration: "bone",
    heroProof: ["Clinical-grade scan", "Physician-led review", "Very low radiation"],
    outcomes: [
      "Your bone mineral density at hip and lumbar spine, the two sites that matter most.",
      "T-score and Z-score explained by a physician, with your fracture-risk context.",
      "A clear answer on osteopenia or osteoporosis, years before it would otherwise show up.",
    ],
    measuresDetail: [
      { name: "Bone mineral density", why: "Bone loss is silent until a fracture. Measuring early makes it reversible." },
      { name: "T-score & Z-score", why: "How your bones compare to a healthy young adult and to your own age group." },
      { name: "Fracture-risk context", why: "Density plus age, sex and history give a far more useful risk picture than density alone." },
    ],
    experience: [
      { title: "Questionnaire", body: "Short screening on history, medications and risk factors." },
      { title: "The scan", body: "You lie still for about 10 minutes while the scanner images your hip and lumbar spine." },
      { title: "Physician review", body: "Results explained in person, with training and nutrition guidance if your scores need it." },
    ],
    sampleReport: {
      title: "Sample bone density report",
      metrics: [
        { label: "T-score (lumbar spine)", value: "−0.4", percentile: 84 },
        { label: "T-score (femoral neck)", value: "−0.1", percentile: 90 },
        { label: "Z-score (spine)", value: "0.2", percentile: 58 },
      ],
      footnote: "Sample data from a 55-year-old female profile. T-score ≥ −1.0 is normal range.",
    },
    prep: ["No calcium supplements for 24 hours before.", "Wear clothing without metal zips or buttons."],
    notFor: ["Pregnant women."],
    faqs: [
      { q: "How much radiation is involved?", a: "Very little, roughly a tenth of a chest X-ray, comparable to a few hours of natural background radiation." },
      { q: "Who should get scanned?", a: "Everyone over 40, post-menopausal women, and athletes with high training loads or a history of stress injuries." },
    ],
    related: ["longevity", "strength-assessment", "mobility-assessment"],
  },
  "gait-analysis": {
    illustration: "gait",
    heroProof: ["3-D motion capture", "Instrumented treadmill", "Drills included"],
    outcomes: [
      "Your running mechanics in 3-D: cadence, ground contact, strike pattern, asymmetries.",
      "The specific inefficiencies costing you energy, and the injury risks hiding in your stride.",
      "Cues and drills from a coach to fix what the data shows.",
    ],
    measuresDetail: [
      { name: "Kinematics", why: "Joint angles through the gait cycle reveal overstriding, drop and rotation issues." },
      { name: "Ground contact & cadence", why: "The two simplest levers for running economy, most recreational runners leave free speed here." },
      { name: "Asymmetries", why: "Left-right differences above ~5% are strongly linked to overuse injuries." },
    ],
    experience: [
      { title: "Movement screen", body: "Quick off-treadmill screen of hips, ankles and single-leg control." },
      { title: "The capture", body: "You run at easy, moderate and fast paces on the instrumented treadmill while cameras and sensors record every stride." },
      { title: "Coach debrief", body: "Slow-motion review of your stride, plus the cues and drills to change it." },
    ],
    sampleReport: {
      title: "Sample gait report",
      metrics: [
        { label: "Cadence", value: "172 spm", percentile: 76 },
        { label: "Ground contact time", value: "238 ms", percentile: 69 },
        { label: "Vertical oscillation", value: "8.2 cm", percentile: 62, note: "lower is better" },
        { label: "Left-right asymmetry", value: "3.1%", percentile: 74, note: "lower is better" },
      ],
      footnote: "Sample data from a recreational marathoner at 10 km/h.",
    },
    prep: ["Bring your usual running shoes, and an older pair if you have them.", "No hard sessions the day before."],
    notFor: ["Anyone with an acute injury, see a physio first, then come back to us."],
    faqs: [
      { q: "Walking or running?", a: "Both. We capture walking and running, since walking asymmetries often explain running problems." },
      { q: "Will you tell me which shoes to buy?", a: "We'll tell you what your mechanics need, brand-agnostic, based on the data." },
    ],
    related: ["vo2max", "mobility-assessment", "performance"],
  },
  "grip-strength": {
    illustration: "grip",
    heroProof: ["5-minute test", "Instant scoring", "Age-normed percentiles"],
    outcomes: [
      "Your peak grip force on a calibrated dynamometer, not a gym squeeze ball.",
      "Left-right asymmetry, flagged if it's meaningful.",
      "Your percentile against your age group, on one of longevity's strongest markers.",
    ],
    measuresDetail: [
      { name: "Peak grip force", why: "Grip strength predicts all-cause mortality better than blood pressure in several cohorts." },
      { name: "Left-right asymmetry", why: "A gap over ~10% can signal neurological or overuse issues worth investigating." },
      { name: "Age-normed percentile", why: "Raw kilograms mean little; your rank against your age group is the actionable number." },
    ],
    experience: [
      { title: "Warm-up", body: "Brief hand and forearm warm-up to get a true maximal reading." },
      { title: "The trials", body: "Three maximal squeezes per hand on the calibrated dynamometer, with rest between." },
      { title: "Instant scoring", body: "Peak force, asymmetry and your percentile, before you leave the room." },
    ],
    sampleReport: {
      title: "Sample grip report",
      metrics: [
        { label: "Peak force (dominant)", value: "44 kg", percentile: 72 },
        { label: "Peak force (non-dominant)", value: "41 kg", percentile: 68 },
        { label: "Left-right asymmetry", value: "6.8%", percentile: 80, note: "under 10% is normal" },
      ],
      footnote: "Sample data from a 45-year-old male profile.",
    },
    prep: ["No grip-heavy training (climbing, heavy pulls) for 24 hours before."],
    notFor: ["Anyone with an acute hand or wrist injury."],
    faqs: [
      { q: "Why does grip matter so much?", a: "It's a proxy for total-body strength and nervous-system health. In large cohort studies it's one of the cleanest predictors of how long, and how independently, people live." },
    ],
    related: ["strength-assessment", "foundations", "longevity"],
  },
  "metabolic-assessment": {
    illustration: "metabolic",
    heroProof: ["Indirect calorimetry", "Fasted test", "Nutrition debrief"],
    outcomes: [
      "Your actual resting metabolic rate, measured, not estimated from a formula.",
      "How efficiently you burn fat versus carbohydrate at rest.",
      "Caloric and macro targets you can finally trust, reviewed with our team.",
    ],
    measuresDetail: [
      { name: "Resting metabolic rate", why: "Online calculators can be off by 300+ kcal. Measuring ends the guessing." },
      { name: "Substrate utilisation", why: "Whether your body prefers fat or carbs at rest, key for fat loss and endurance fuelling." },
      { name: "Caloric requirements", why: "Your real maintenance calories, the anchor for any nutrition plan." },
    ],
    experience: [
      { title: "Arrive fasted", body: "No food or caffeine for 4 hours, the measurement depends on a true resting state." },
      { title: "The test", body: "You lie comfortably for 20–25 minutes, breathing normally through a mask while the analyzer samples every breath." },
      { title: "Nutrition debrief", body: "Your numbers translated into calories, protein targets and fuelling strategy." },
    ],
    sampleReport: {
      title: "Sample metabolic report",
      metrics: [
        { label: "Resting metabolic rate", value: "1,680 kcal", percentile: 55 },
        { label: "Fat oxidation at rest", value: "62%", percentile: 71 },
        { label: "Respiratory exchange ratio", value: "0.81", percentile: 66 },
      ],
      footnote: "Sample data from a 40-year-old profile after a 4-hour fast.",
    },
    prep: ["Fasted, no food or caffeine for 4 hours. Water is fine.", "No exercise that morning."],
    notFor: ["Anyone who can't lie still comfortably for 25 minutes."],
    faqs: [
      { q: "Why fasted?", a: "Digestion raises metabolism for hours. Fasting isolates your true resting rate, the number your nutrition plan is built on." },
      { q: "Is one measurement enough?", a: "For most people, yes, retest after significant weight change or every 6–12 months." },
    ],
    related: ["3d-body-composition", "glp-1", "foundations"],
  },
  "mobility-assessment": {
    illustration: "mobility",
    heroProof: ["Full-body screen", "Active + passive range", "Corrective plan included"],
    outcomes: [
      "A joint-by-joint map of your active range of motion and movement quality.",
      "The asymmetries and restrictions behind your aches, plateaus and compensations.",
      "A corrective exercise plan targeting the gaps, not generic stretching.",
    ],
    measuresDetail: [
      { name: "Joint ROM", why: "Active range is what you can actually use; the passive-active gap is where injuries live." },
      { name: "Movement patterns", why: "Squat, hinge, lunge and overhead patterns expose what isolated joint tests miss." },
      { name: "Asymmetry index", why: "One-sided restrictions compound over thousands of daily reps." },
    ],
    experience: [
      { title: "Movement interview", body: "History, pain points, training and desk habits, context shapes the screen." },
      { title: "The screen", body: "Around 30 minutes of guided movement: joint by joint, pattern by pattern, both sides." },
      { title: "Corrective plan", body: "The 3–5 highest-leverage exercises for your restrictions, demonstrated and sent to you." },
    ],
    sampleReport: {
      title: "Sample mobility report",
      metrics: [
        { label: "Shoulder external rotation", value: "88°", percentile: 74 },
        { label: "Hip internal rotation", value: "32°", percentile: 58 },
        { label: "Overhead squat score", value: "3 / 5", percentile: 66 },
        { label: "Left-right asymmetry", value: "7%", percentile: 77, note: "lower is better" },
      ],
      footnote: "Sample data from a desk-worker profile.",
    },
    prep: ["Wear clothing you can move freely in."],
    notFor: ["Anyone with an acute injury, get it diagnosed first, then screen."],
    faqs: [
      { q: "Is this physiotherapy?", a: "No, it's a performance screen. If we find something clinical, we'll tell you honestly and refer you on." },
    ],
    related: ["strength-assessment", "gait-analysis", "pt-pack-10"],
  },
  "strength-assessment": {
    illustration: "strength",
    heroProof: ["Force-plate testing", "Objective numbers", "Coach debrief"],
    outcomes: [
      "Exactly how much force you produce, upper and lower body, on lab force plates.",
      "Left-right asymmetries and your force-velocity profile.",
      "Benchmarks that make your training programme provably effective.",
    ],
    measuresDetail: [
      { name: "Isometric force", why: "The mid-thigh pull is the gold standard for total-body strength, no technique, just force." },
      { name: "Left-right asymmetry", why: "Imbalances over ~10% predict injuries and cap performance." },
      { name: "Force-velocity profile", why: "Whether you're strong-slow or weak-fast decides what your training should emphasise." },
    ],
    experience: [
      { title: "Warm-up", body: "Standardised ramp-up so the numbers reflect you at your best." },
      { title: "The tests", body: "Force-plate battery: isometric mid-thigh pull, countermovement jump and grip, about 30 minutes." },
      { title: "Coach debrief", body: "Your force profile, how you rank, and what to train." },
    ],
    sampleReport: {
      title: "Sample strength report",
      metrics: [
        { label: "Isometric mid-thigh pull", value: "2.4× BW", percentile: 79 },
        { label: "Countermovement jump", value: "32 cm", percentile: 74 },
        { label: "Grip strength", value: "44 kg", percentile: 72 },
        { label: "Leg asymmetry", value: "5%", percentile: 81, note: "lower is better" },
      ],
      footnote: "Sample data from a 38-year-old male profile.",
    },
    prep: ["No heavy lower-body training for 48 hours before."],
    notFor: ["Anyone returning from acute injury, test once cleared."],
    faqs: [
      { q: "I'm not an athlete, is this for me?", a: "Especially for you. Strength is the physical quality most protective of independent ageing, and the one nobody measures." },
    ],
    related: ["grip-strength", "pt-pack-10", "performance"],
  },

  // ---------------- PACKAGES ----------------
  "cardio-pack-4": {
    illustration: "cardiopack",
    heroProof: ["4 × 1h with a coach", "Use within 3 months", "Zones from your data"],
    outcomes: [
      "Four coached cardio sessions built around your heart-rate zones.",
      "Learn what zone 2 actually feels like, most people have never trained it correctly.",
      "Session-by-session progress notes you keep.",
    ],
    measuresDetail: [
      { name: "4 x 1h sessions", why: "Enough volume to build the habit and see early fitness changes." },
      { name: "Heart-rate zone coaching", why: "Sessions anchored to your measured thresholds, not perceived effort." },
      { name: "Progress notes", why: "A written record of zones, paces and coaching cues after every session." },
    ],
    experience: [
      { title: "Session 1, Calibrate", body: "Review your zones (or test them), then an easy coached session to lock in the feel." },
      { title: "Sessions 2–3, Build", body: "Progressive zone work on treadmill, bike or rower, your choice." },
      { title: "Session 4, Prove it", body: "A benchmark session to quantify the improvement, with notes for what comes next." },
    ],
    sampleReport: {
      title: "Sample pack summary",
      metrics: [
        { label: "Sessions completed", value: "4 / 4", percentile: 100 },
        { label: "Zone 2 adherence", value: "91%", percentile: 88 },
        { label: "Pace at same HR", value: "+4.5%", percentile: 70, note: "4 weeks" },
      ],
      footnote: "Sample data from a 4-week block.",
    },
    prep: ["A recent VO2max or threshold test helps, but isn't required.", "Bring your training watch if you have one."],
    notFor: ["Anyone wanting medical or body-composition testing, this is pure coaching."],
    faqs: [
      { q: "Do I need a VO2max test first?", a: "It makes the zones far more precise, but we can estimate zones in session one and refine as we go." },
    ],
    related: ["vo2max", "performance", "pt-pack-10"],
  },
  "pt-pack-10": {
    illustration: "ptpack",
    heroProof: ["10 × 1h 1:1 sessions", "Use within 4 months", "End-of-pack retest"],
    outcomes: [
      "Ten fully programmed 1:1 sessions with a performance coach.",
      "A programme built around your assessment data, not a template.",
      "A retest at the end, so the progress is measured, not vibes.",
    ],
    measuresDetail: [
      { name: "10 x 1h sessions", why: "Ten weeks is the shortest window where strength change becomes measurable." },
      { name: "Programme design", why: "Your coach writes the plan from your assessment results and goals." },
      { name: "Retest at end", why: "Grip and strength benchmarks repeated, so you see the delta in black and white." },
    ],
    experience: [
      { title: "Session 1, Baseline", body: "Movement and strength baseline, goal-setting, and your programme design." },
      { title: "Sessions 2–9, Train", body: "Weekly progressive sessions with technique coaching throughout." },
      { title: "Session 10, Retest", body: "Repeat the benchmarks, review the change, plan the next block." },
    ],
    sampleReport: {
      title: "Sample pack summary",
      metrics: [
        { label: "Sessions completed", value: "10 / 10", percentile: 100 },
        { label: "Grip strength", value: "+8%", percentile: 75, note: "10 weeks" },
        { label: "Squat pattern score", value: "3 → 4 / 5", percentile: 80 },
      ],
      footnote: "Sample data from a 10-week block.",
    },
    prep: ["An assessment first helps us programme precisely, Foundational is ideal."],
    notFor: ["Anyone wanting medical testing, this is coaching only."],
    faqs: [
      { q: "Can I split sessions across the week?", a: "Yes, most clients do two sessions per week and finish in five to eight weeks." },
    ],
    related: ["strength-assessment", "health-performance", "cardio-pack-4"],
  },
  "retest-bundle": {
    illustration: "retest",
    heroProof: ["4 retests / 12 months", "Save €270 vs. booking separately", "Trendline report"],
    outcomes: [
      "Four Foundational retests across twelve months, your year in data.",
      "A trendline report after each retest: what moved, what didn't, what to change.",
      "The accountability of a booked date every 12 weeks.",
    ],
    measuresDetail: [
      { name: "4 x Foundational retests", why: "The same battery, the same equipment, the same protocol, comparable data, every time." },
    ],
    experience: [
      { title: "Q1, Baseline", body: "Your first retest sets the year's reference point." },
      { title: "Q2 & Q3, Track", body: "Quarterly retests show whether the plan is working." },
      { title: "Q4, Review", body: "Your year-end report: twelve months of change on one page." },
    ],
    sampleReport: {
      title: "Sample 12-month trendline",
      metrics: [
        { label: "Body fat", value: "21% → 17.5%", percentile: 84, note: "12 months" },
        { label: "Grip strength", value: "+12%", percentile: 78 },
        { label: "Mobility score", value: "78 → 90", percentile: 86 },
      ],
      footnote: "Sample data from a 12-month training year.",
    },
    prep: ["Same prep as every Foundational visit, fasted, 4 hours."],
    notFor: ["Anyone who hasn't done a Foundational assessment yet, start there."],
    faqs: [
      { q: "What if I miss a quarter?", a: "Retests can shift by a couple of weeks either side; the bundle stays valid for 14 months." },
    ],
    related: ["foundations", "health-performance", "longevity"],
  },
};

// ---------------- SHARED TRUST CONTENT ----------------

export const testimonials: { quote: string; name: string; detail: string; category: string }[] = [
  {
    quote: "I thought I was fit. The VO2max test said otherwise, and twelve weeks later the number proved the plan worked.",
    name: "Miguel R.",
    detail: "Performance assessment · Madrid",
    category: "test",
  },
  {
    quote: "First time anyone explained my numbers instead of handing me a PDF. I left knowing exactly what to do on Monday.",
    name: "Carmen L.",
    detail: "Foundational assessment · Madrid",
    category: "assessment",
  },
  {
    quote: "Down 8 kilos in four months, and the scans proved I kept my muscle. That last part is why I chose a medical programme.",
    name: "Jorge A.",
    detail: "Body Recomposition (GLP-1) · Madrid",
    category: "membership",
  },
  {
    quote: "My coach programmes from my retests, not from a template. Two quarters in, every marker is moving the right way.",
    name: "Elena V.",
    detail: "Human Performance member",
    category: "membership",
  },
  {
    quote: "The gait analysis found in 20 minutes what two physios had missed in a year. Fixed the asymmetry, fixed the knee.",
    name: "Pablo S.",
    detail: "Gait analysis · Madrid",
    category: "test",
  },
  {
    quote: "Bought the Foundational assessment as a gift for my father. He now talks about his grip percentile at family dinners.",
    name: "Lucía M.",
    detail: "Gift card · Madrid",
    category: "package",
  },
];

export const teamCredentials: { name: string; role: string; detail: string }[] = [
  {
    name: "Dr. Rodrigo Ortega",
    role: "Medical Director",
    detail: "Sports cardiologist (QuirónSalud Madrid · Olympia), PhD cum laude, CNIC researcher, National End-of-Degree Award 2023",
  },
  {
    name: "Mauricio Serrano Richards",
    role: "Head Performance Coach",
    detail: "MSc Sports Physiotherapy & Reconditioning, formerly Club Puebla (Liga MX first team), rehab internship at Atlético de Madrid",
  },
];

export function getProductContent(slug: string): ProductContent | undefined {
  return productContent[slug];
}

export function getTestimonialFor(category: string) {
  return testimonials.find((t) => t.category === category) ?? testimonials[0];
}
