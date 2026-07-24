export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  category: string;
  author: string;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "why-vo2max-matters",
    title: "Why VO2max is the single best predictor of longevity",
    excerpt:
      "A high VO2max is more strongly associated with lifespan than smoking, diabetes or hypertension. Here is what the number actually measures, and how to move it.",
    date: "2026-06-14",
    readingTime: "6 min read",
    category: "Performance",
    author: "Volumes Lab",
    body: [
      "VO2max quantifies the maximum volume of oxygen your body can transport and use per minute of exercise. It is the ceiling of your aerobic engine, and it is the strongest modifiable predictor of all-cause mortality in the medical literature.",
      "A 2018 JAMA cohort of 122,000 adults showed that people in the top VO2max quintile had a five-fold lower risk of death than those in the bottom quintile, a gap larger than the one between smokers and non-smokers.",
      "In the lab we measure it directly on a treadmill or cycle ergometer while sampling every breath. That gives us a real number in ml/kg/min, not an estimate from a wristwatch. From there we build a training prescription: zone 2 volume to grow the mitochondrial network, and short VO2max intervals to lift the ceiling.",
      "Most sedentary adults can add 15–20% to their VO2max in twelve weeks of structured training. That is decades of biological age, bought with three or four hours a week.",
    ],
  },
  {
    slug: "strength-after-forty",
    title: "Strength after forty: the non-negotiable",
    excerpt:
      "Lean mass and force production collapse from the fourth decade onwards. Resistance training is the only intervention that reliably reverses it.",
    date: "2026-05-22",
    readingTime: "5 min read",
    category: "Training",
    author: "Volumes Lab",
    body: [
      "From age 40 onwards, adults lose roughly 1% of muscle mass and 3% of strength per year without training. The consequence is not aesthetic, it is functional independence in the last decades of life.",
      "Grip strength and leg press force are two of the cleanest predictors of mortality we have. Both respond to twice-weekly resistance work with heavy compound lifts and progressive overload.",
      "Our strength assessment measures isometric mid-thigh pull, grip and countermovement jump. Together they draw a full picture of how much force your nervous system can produce, how quickly, and how symmetrically.",
    ],
  },
  {
    slug: "body-composition-vs-weight",
    title: "Why the scale lies, and DEXA doesn't",
    excerpt:
      "Body weight tells you nothing about the ratio of muscle to fat, or where that fat sits. A DEXA scan resolves the picture in eight minutes.",
    date: "2026-04-30",
    readingTime: "4 min read",
    category: "Diagnostics",
    author: "Volumes Lab",
    body: [
      "Two people at 78 kg can carry radically different bodies: one with 12 kg of visceral fat and 28 kg of muscle, the other with 4 kg of visceral fat and 36 kg. Their metabolic risk profiles are not comparable.",
      "A DEXA scan uses low-dose X-ray to segment your body into bone, lean tissue and fat, region by region. Visceral adipose tissue, the deep abdominal fat that drives insulin resistance, is reported directly.",
      "We use DEXA as the baseline for every performance program at Volumes. Every 12 weeks we scan again. Progress is measured in shifted tissue, not scale weight.",
    ],
  },
  {
    slug: "mobility-is-a-skill",
    title: "Mobility is a skill, not a stretch",
    excerpt:
      "Passive range of motion without control is a liability. Real mobility is active, load-bearing, and trainable.",
    date: "2026-03-18",
    readingTime: "5 min read",
    category: "Training",
    author: "Volumes Lab",
    body: [
      "The mobility industry sells stretching. The evidence tells a different story: what protects joints and improves output is the ability to produce force through end ranges under load.",
      "Our mobility assessment maps active range of motion at every major joint, then quantifies control with tempo-loaded end-range work. The gap between passive and active range is the training target.",
      "Expect to work on shoulder external rotation, hip internal rotation and thoracic extension. Twelve weeks of consistent work usually eliminates the compensations that show up in your VO2max stride or your squat depth.",
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
