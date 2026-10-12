import type { Post } from "./blog";
import { heading as h, linkedParagraph as link, paragraph as p } from "./articleBlocks";

// Based on the supplied "Optimized Draft 03" document.
export const restingEnergyPost: Post = {
  slug: "resting-energy-expenditure",
  title: "What Is Resting Energy Expenditure and How Is It Measured?",
  excerpt:
    "Resting energy expenditure can be estimated with equations or measured with indirect calorimetry. Learn what each result can and cannot tell you.",
  date: "2026-10-12",
  readingTime: "7 min read",
  category: "Metabolism",
  author: "Volumes Lab",
  body: [
    p(
      "Resting energy expenditure, or REE, is the energy your body uses at rest. Predictive equations estimate it from personal variables such as age, sex, height, weight, and sometimes body composition. Indirect calorimetry measures respiratory gas exchange and uses it to calculate a more individual resting value.",
    ),
    p(
      "REE is not your total daily calorie expenditure and is not automatically a calorie target. Daily energy use also includes physical activity and the energy associated with processing food. A measured REE is one component of a broader calculation, not the final answer for how much someone should eat.",
    ),

    h("What REE means"),
    p(
      "REE describes energy use while the body is resting. It supports basic ongoing functions, but the measurement does not capture everything that happens during a normal day. Resting metabolic rate, or RMR, is often used for a similar concept. Basal metabolic rate, or BMR, is usually defined under more restrictive conditions. In all cases, the report should state which term and protocol were used.",
    ),

    h("How indirect calorimetry measures REE"),
    p(
      "Indirect calorimetry records oxygen consumption and carbon-dioxide production while the person rests and breathes through the equipment used for the assessment. Those gas-exchange measurements are entered into established equations to calculate resting energy expenditure.",
    ),
    p(
      "A short period of rest, recent food or exercise, stimulants, movement, illness, room conditions, equipment calibration, and the quality of the recorded data can affect the result. The aim is to measure gas exchange while the person is resting under defined conditions, then use an appropriate portion of the recording for the calculation.",
    ),
    link(
      "The National Academies provides a general explanation of energy expenditure and indirect calorimetry.",
      "indirect calorimetry",
      "https://www.ncbi.nlm.nih.gov/books/NBK591031/",
    ),

    h("How predictive equations compare"),
    p(
      "A predictive equation is a population estimate. It can be reasonable when direct measurement is not available, but its average performance in a group does not guarantee a close result for every individual. People can differ from the population used to develop or validate the equation, so a calculator result may differ materially from measured REE.",
    ),
    p(
      "A measured value can also vary between sessions. Preparation, rest, recent activity, breathing pattern, equipment, and the calculation approach matter. The useful comparison is between results obtained through the same method under similar conditions, not between a calculator estimate and an indirect-calorimetry result treated as if they were identical.",
    ),
    link(
      "Best-practice considerations for resting measurements are discussed in this review of resting indirect calorimetry.",
      "review of resting indirect calorimetry",
      "https://pubmed.ncbi.nlm.nih.gov/26038298/",
    ),

    h("What the result is useful for"),
    p(
      "REE can provide an individual resting component for a broader energy estimate. It may help explain why a generic calorie calculator does not fit someone well, but it does not prescribe an intake on its own. Activity, goals, food processing, changes in body mass, and training load still require separate assumptions or assessment.",
    ),
    p(
      "A clear report distinguishes the measured or calculated resting value from any daily-energy estimate built from it. That makes it easier to understand what came from respiratory data and what came from assumptions.",
    ),
    p(
      "For example, a person may use REE as the resting component in a wider estimate that also includes activity. That wider estimate can change when activity changes, even if the measured REE stays similar. Keeping the components separate prevents a calculator output from being mistaken for a direct measurement of the whole day.",
    ),
    p(
      "The same care applies when comparing a test with an online calculator. The calculator may use a different equation, different inputs, or a different definition of resting conditions. A difference between the two values is a reason to examine the methods, not proof that one number is automatically wrong.",
    ),
    p(
      "This distinction is useful when an online calculator gives a value that does not seem to fit the person. The difference may reflect the equation’s population assumptions, an inaccurate input, or genuine individual variation. Indirect calorimetry does not remove every source of uncertainty, but it replaces a general equation input with observed respiratory data from the person during the assessment.",
    ),
    p(
      "REE can also change with the conditions of the day. A result collected after recent exercise or food intake may not be directly comparable with one collected after a different preparation. The purpose of documenting the conditions is not to create a perfect number; it is to make the result understandable and repeatable enough for the question being asked.",
    ),
    p(
      "The result is therefore most useful as a clearly labelled input. It can support a broader estimate of energy needs or help compare resting measurements collected under similar conditions, but it should not be presented as a prescription or as a complete measure of metabolism.",
    ),

    h("Metabolic testing at Volumes Lab"),
    link(
      "Volumes Lab's service catalogue includes a Metabolic Assessment at Churruca 5, Madrid, using indirect calorimetry. Its dedicated booking page is not currently public, so check the Volumes Lab website for current availability, preparation and reporting details.",
      "Volumes Lab website",
      "https://www.volumeslab.com/",
    ),
    p(
      "The decision to book depends on the question. Someone whose generic calculator seems inconsistent with their experience may want an individually measured resting component. Someone trying to estimate a full day's expenditure still needs to account for activity and food processing. Volumes Lab can provide the resting measurement, but the result should be interpreted with its protocol and the rest of the person's context.",
    ),
    link(
      "If the question is how your body responds during progressively harder exercise, the VO2max assessment is a separate test, not a substitute for a resting energy measurement.",
      "VO2max assessment",
      "https://www.volumeslab.com/vo2max",
    ),

    h("What to take away from an REE result"),
    p(
      "REE is the energy your body uses at rest. Predictive equations estimate it from population relationships, while indirect calorimetry measures oxygen consumption and carbon-dioxide production to calculate a more individual value. Neither route measures total daily expenditure in one number.",
    ),
    p(
      "Keep the measured or estimated resting value separate from the assumptions used to build a daily-energy target. Record how the result was obtained, preparation conditions and date, particularly if you plan to repeat the assessment. If two results differ, compare their methods and conditions before changing a nutrition plan based on the difference alone.",
    ),

    h("Frequently Asked Questions (FAQs)"),
    h("Is resting energy expenditure the same as total daily energy expenditure?", 3),
    p(
      "No. REE is the resting component. Total daily expenditure also includes movement, exercise, and the energy associated with processing food.",
    ),
    h("Does a measured REE tell me exactly how many calories to eat?", 3),
    p(
      "No. It is one input to a broader decision. Activity, goals, changes in body mass, health context and the method used to estimate non-resting expenditure all matter.",
    ),
    h("Why might my calculator and indirect-calorimetry results differ?", 3),
    p(
      "A calculator uses a population equation and your entered details. Indirect calorimetry uses gas-exchange data collected during a specific resting session. Equation assumptions, inaccurate inputs, preparation and individual variation can all contribute to the difference.",
    ),
  ],
};
