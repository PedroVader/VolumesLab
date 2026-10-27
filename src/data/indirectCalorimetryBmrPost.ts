import type { Post } from "./blog";
import { bulletList, heading as h, linkedParagraph as link, paragraph as p, table } from "./articleBlocks";

export const indirectCalorimetryBmrPost: Post = {
  slug: "indirect-calorimetry-vs-bmr-equations",
  title: "Indirect Calorimetry vs BMR Equations: What Is the Difference?",
  excerpt:
    "BMR equations estimate resting energy needs from personal data. Indirect calorimetry uses breathing measurements to estimate resting energy expenditure. Learn what each result can and cannot tell you.",
  date: "2026-10-27",
  readingTime: "6 min read",
  category: "Metabolism",
  author: "Volumes Lab",
  body: [
    p(
      "Online BMR calculators estimate how many calories your body burns at rest. Indirect calorimetry uses your breathing to estimate resting energy expenditure. Both can be useful, but they are not the same test.",
    ),
    p(
      "The difference is important when a generic estimate does not seem to match your experience, or when you need to understand whether a number came from a formula, a body-composition model, or respiratory gas exchange.",
    ),

    h("What is BMR?"),
    p(
      "Basal metabolic rate, or BMR, is the energy your body uses to maintain basic functions at rest. True BMR is measured under strict conditions. Many devices and calculators use the term BMR when they mean an estimate of resting energy expenditure, or REE.",
    ),
    p(
      "REE and BMR are related concepts, but the exact definition and protocol should be stated in the report. Neither value is automatically the same as total daily energy expenditure.",
    ),

    h("How BMR calculators work"),
    p(
      "Equations such as Mifflin St Jeor use inputs including age, sex, height, and weight. They predict the average resting energy needs of people with similar characteristics. They do not measure your metabolism.",
    ),
    p(
      "Two people with the same height and weight can have different energy needs because body composition, health status, activity, training history, and other factors differ. An equation is therefore a starting estimate, not a direct observation of an individual’s breathing or energy use.",
    ),
    link(
      "The Mifflin St Jeor equation is one example of a predictive approach to resting energy expenditure.",
      "Mifflin St Jeor equation",
      "https://pubmed.ncbi.nlm.nih.gov/2305711/",
    ),

    h("What does indirect calorimetry measure?"),
    p(
      "Indirect calorimetry measures oxygen use, VO2, and carbon dioxide output, VCO2, while you rest. It uses these gases to calculate energy expenditure and may also report the respiratory exchange ratio, or RER.",
    ),
    p(
      "Results depend on the device, calibration, fasting status, recent exercise, room conditions, movement, breathing pattern, and the quality of the recording. A controlled resting protocol matters because the goal is to capture resting gas exchange rather than the effect of a recent meal, workout, stimulant, or conversation.",
    ),
    link(
      "A review of resting indirect calorimetry discusses protocol and interpretation considerations.",
      "resting indirect calorimetry",
      "https://pubmed.ncbi.nlm.nih.gov/26038298/",
    ),

    h("BMR estimate vs measured resting metabolism"),
    table(
      ["Comparison point", "BMR equation", "Indirect calorimetry"],
      [
        ["What it uses", "Personal data and a predictive equation", "Measured oxygen use and carbon dioxide output"],
        ["What it provides", "A population-based resting estimate", "A protocol-dependent resting energy estimate from respiratory gas exchange"],
        ["Main strengths", "Fast, inexpensive, and easy to repeat", "Uses individual breathing data rather than only demographic inputs"],
        ["Main limitations", "May not reflect individual variation", "Requires controlled preparation, calibrated equipment, and a valid recording"],
      ],
    ),
    p(
      "A measured value can still vary between sessions. Preparation, rest, recent activity, breathing, equipment, and calculation approach all matter. The useful comparison is between results obtained through the same method under similar conditions, not between a calculator estimate and an indirect-calorimetry result treated as if they were identical.",
    ),

    h("Can DEXA calculate BMR?"),
    p(
      "DEXA measures body composition, including fat mass and lean soft tissue. A report can use this information to estimate basal metabolism. This is still an estimate. DEXA does not directly measure calories burned or respiratory gases.",
    ),
    p(
      "That estimate can be useful as one part of a wider picture, but it should not be confused with an indirect-calorimetry result. The method and output should be clear before a number is used for planning.",
    ),

    h("How Volumes Lab measures it"),
    p(
      "Volumes Lab in Madrid offers DEXA body-composition testing with a basal-metabolism estimate. This KPI is also included in the Volumes Health Check and the APEX and Friends of Volumes assessment plans, according to the supplied service information.",
    ),
    p(
      "Volumes also records resting respiratory exchange ratio, RER or RQ, in its APEX metabolic assessment. RER describes the ratio between carbon dioxide output and oxygen uptake. It is not, by itself, a measured resting calorie result.",
    ),
    link(
      "Check the current Volumes Lab assessment options and availability before booking a metabolic measurement.",
      "Volumes Lab assessments",
      "https://www.volumeslab.com/",
    ),

    h("Which method should you choose?"),
    bulletList([
      "Use a BMR equation for a quick starting estimate when direct measurement is not required.",
      "Choose DEXA when you also want body composition and a composition-based basal-metabolism estimate.",
      "Choose a dedicated resting indirect calorimetry test when you need measured resting energy expenditure from respiratory gases.",
      "Check that the provider uses a defined resting protocol and explains which result is measured and which is calculated.",
    ]),
    p(
      "None of these methods gives your total daily calorie needs by itself. Activity, exercise, digestion, body-mass changes, and goals also contribute to daily energy use.",
    ),

    h("Frequently Asked Questions (FAQs)"),
    h("Is DEXA BMR a direct measurement?", 3),
    p("No. It is calculated from body-composition data."),
    h("Does VO2max testing measure resting metabolism?", 3),
    p("Not automatically. VO2max testing measures exercise responses. A separate resting protocol is needed to estimate resting energy expenditure."),
    h("Does BMR tell me how many calories to eat?", 3),
    p("No. BMR or REE is one component of daily energy use, not a complete intake prescription."),
  ],
};
