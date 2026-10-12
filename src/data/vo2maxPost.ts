import type { Post } from "./blog";
import { heading as h, linkedParagraph as link, paragraph as p, table } from "./articleBlocks";

// Based on Tab 1 of the supplied "Optimized Draft 01" document.
export const vo2maxPost: Post = {
  slug: "estimated-vs-laboratory-vo2max",
  title: "Estimated vs Laboratory-Measured VO2max: What Is the Difference?",
  excerpt:
    "An estimated VO2max and a laboratory measurement use different evidence. Learn what each number means and how to compare results over time.",
  date: "2026-10-12",
  readingTime: "12 min read",
  category: "Performance",
  author: "Volumes Lab",
  body: [
    p(
      "VO2max is commonly used as a measure of aerobic capacity, but the number is not always obtained in the same way. A smartwatch may estimate it from heart rate and movement. A field test may calculate it from pace, distance, or the heart-rate response to a standard task. A laboratory cardiopulmonary exercise test measures respiratory gas exchange while exercise intensity increases.",
    ),
    p(
      "These methods can produce values that look comparable because they use the same unit, usually millilitres of oxygen per kilogram of body mass per minute. The shared unit does not make the methods identical. Before comparing two results, check how each was produced, which exercise mode was used, when it was collected, and whether oxygen uptake was measured directly from expired air.",
    ),
    p(
      "This distinction matters for anyone tracking fitness over time. A change in the number may reflect a change in aerobic capacity, a change in the algorithm or device, a different exercise mode, or different test conditions. The most useful record keeps the method and conditions next to the result.",
    ),

    h("What an estimated VO2max means"),
    p(
      "An estimated VO2max is a modelled value. The device or test does not normally analyse the oxygen and carbon dioxide in every breath. Instead, it uses observable variables and an equation or algorithm that has been developed for a particular product, activity, or population.",
    ),
    p(
      "Depending on the system, the inputs may include heart rate, pace, speed, movement, distance, elapsed time, age, sex, height, weight, and the quality of the recorded signal. The exact combination is product-specific. Some wearables estimate cardio fitness only during supported activities, such as a qualifying outdoor walk, run, or hike, rather than during every workout.",
    ),
    p(
      "Field tests follow the same general principle but use a different estimation route. A standardised task may use the distance completed in a set time, the time required to cover a set distance, running speed, or the heart-rate response to a known workload. The result is still calculated rather than directly measured.",
    ),
    p(
      "An estimate is not automatically useless because it is modelled. It can help describe a trend when the same device, activity, and procedure are used consistently. It should be labelled as an estimate produced under those conditions, rather than treated as a direct measurement of oxygen uptake.",
    ),

    h("What a laboratory cardiopulmonary exercise test measures"),
    p(
      "During a laboratory cardiopulmonary exercise test, the person exercises on a treadmill or cycle ergometer while breathing through a mask, mouthpiece, or other measurement interface. The workload is increased according to a defined protocol, and the system records the volume and composition of inspired and expired air.",
    ),
    p(
      "The main gas-exchange variables include oxygen uptake, carbon-dioxide output, and ventilation. Heart rate is also commonly recorded, and a protocol may include additional observations depending on the purpose of the assessment. Because the gas exchange is observed during the test, the laboratory result is not an algorithmic estimate based only on external performance data.",
    ),
    link(
      "For further context on the purpose and interpretation of this type of testing, see the American Heart Association’s cardiopulmonary exercise testing guidance.",
      "cardiopulmonary exercise testing guidance",
      "https://professional.heart.org/en/science-news/2016-focused-update-clinical-recommendations-for-cardiopulmonary-exercise-testing-data-assessment/commentary",
    ),
    link(
      "Research comparing consumer devices with criterion measurements is summarised in this systematic review of consumer VO2max estimates.",
      "systematic review of consumer VO2max estimates",
      "https://pubmed.ncbi.nlm.nih.gov/35072942/",
    ),
    p(
      "The word laboratory does not mean that the result is free from variation. The reported value depends on the analyser, calibration, sampling system, exercise mode, workload stages, stage duration, test termination, data processing, and the person’s effort and physiological response on that day. A measured result is therefore a measurement under a specified protocol, not a permanent or context-free property.",
    ),

    h("Estimated and laboratory-measured VO2max compared"),
    table(
      ["Comparison point", "Estimated VO2max", "Laboratory-measured VO2max"],
      [
        [
          "Main input",
          "Sensor data, performance data, and personal information",
          "Respiratory gas exchange during exercise",
        ],
        [
          "Setting",
          "Daily activity, recorded workout, or field test",
          "Controlled treadmill or cycle test",
        ],
        [
          "Method",
          "Device-specific or test-specific equation",
          "Analysis of measured oxygen uptake and related gas-exchange variables",
        ],
        ["Output", "An estimated value", "A value measured during that laboratory protocol"],
        [
          "Main limitation",
          "Model, inputs, signal quality, supported activity, and software updates",
          "Protocol, equipment, calibration, exercise mode, and test execution",
        ],
      ],
    ),

    h("Understanding the VO2max result"),
    h("What VO2max represents physiologically", 3),
    p(
      "VO2max describes the highest rate at which the body can take in, transport, and use oxygen during progressively harder exercise. It reflects the interaction of several systems rather than one isolated organ. The lungs move air, the heart and circulation deliver oxygenated blood, the muscles extract and use oxygen, and the test protocol determines how those systems are stressed.",
    ),
    p(
      "The value is usually expressed relative to body mass. That makes it useful for comparing people or tracking a person whose body mass is stable, but it also means that a change in body mass can affect the relative number even if absolute oxygen uptake changes differently. Reports may also contain an absolute value, expressed in litres per minute, which answers a related but distinct question.",
    ),
    h("A laboratory test does not always produce a perfect maximum", 3),
    p(
      "The word maximum describes the intended measurement target, not a guarantee that every session reaches a person’s physiological ceiling. The test may stop because of symptoms, safety criteria, equipment limits, inability to maintain the workload, or the protocol’s stopping rules. A laboratory report should explain how the highest valid value was identified and whether the test met the laboratory’s criteria for a maximal effort.",
    ),
    p(
      "This is one reason the protocol belongs beside the result. A short test with large workload increases, a longer staged test, and a test stopped early may not stress the body in the same way. A lower value is not automatically evidence of lower fitness if the tests were not equivalent.",
    ),

    h("Why the two results can differ"),
    h("They use different information", 3),
    p(
      "A wearable can observe movement, speed, and heart rate, but it does not usually observe respiratory gas exchange. A laboratory system can record gas exchange directly, but it measures the person during one structured session. The two methods therefore answer related questions through different evidence.",
    ),
    h("The exercise mode changes the demand", 3),
    p(
      "Running and cycling do not recruit the body in exactly the same way. A person may also be more familiar with one mode than the other. A running estimate compared with a cycle-based laboratory test can differ because the exercise task changed, even if both results were collected carefully.",
    ),
    h("The protocol changes the measurement", 3),
    p(
      "Workload increments, stage length, warm-up, test duration, recovery rules, and the criteria used to identify the highest valid value can all vary. Two laboratories may also use different analysers, sampling arrangements, calibration procedures, or processing rules. Those choices should be recorded when a result is used for comparison.",
    ),
    h("The device and its user data matter", 3),
    p(
      "An incorrect weight can change a value expressed relative to body mass. An incomplete heart-rate signal, poor sensor contact, unusual terrain, or activity outside the device’s intended conditions can affect an estimate. A manufacturer may also update the model in a software release, which can change future readings without a matching physiological change.",
    ),
    h("Agreement across a group does not guarantee agreement for one person", 3),
    p(
      "Studies that compare consumer devices with criterion measurements often report average agreement across a group. An average result describes the performance of the sample; it does not guarantee that every individual’s estimate is close to their laboratory value. Individual differences in physiology, training, body size, movement, heart-rate response, and the conditions of the activity can affect the comparison.",
    ),

    h("Reading the result beyond the headline number"),
    h("How to read the surrounding measurements", 3),
    p(
      "VO2max is often interpreted alongside ventilation, carbon-dioxide output, heart rate, workload, and ventilatory thresholds. Those measurements provide context for how the result was reached and may explain why two sessions with similar peak values felt different. A report can therefore be more informative than a single headline number.",
    ),
    p(
      "The exercise mode also changes the meaning of the result. A value obtained on a treadmill describes performance during that test mode. It may be relevant to running, but it should not automatically be treated as a direct prediction of cycling performance or of performance in every sport. Familiarity, technique, local muscle fatigue, and the ability to tolerate the protocol all contribute.",
    ),
    h("Why VO2max should not stand alone", 3),
    p(
      "VO2max is one measure of aerobic capacity. It does not by itself describe movement economy, strength, sprint ability, training status in a specific sport, symptoms during exercise, or the reason one person performs better than another at a given distance. Ventilatory thresholds, heart-rate response, workload, and the quality of the test can add useful context, but they do not turn the number into a diagnosis or a complete description of fitness.",
    ),

    h("How to compare VO2max over time"),
    p(
      "A trend is easiest to interpret when the same method is repeated under similar conditions. For a wearable, that means keeping the device, activity type, personal data, and recording conditions as consistent as possible. For laboratory testing, it means noting the exercise mode, protocol, equipment, and relevant preparation or termination conditions.",
    ),
    p(
      "Label every result with its method and date. If you change from one watch model to another, switch from running to cycling, or move from an estimate to a laboratory test, mark that transition in the record. A change after the transition may contain both a physiological component and a method component.",
    ),
    p(
      "It is reasonable to keep estimated and laboratory results in the same fitness history. It is not reasonable to treat them as repeated measurements from one identical instrument. They can inform the same broad picture while retaining their separate measurement identities.",
    ),

    h("What to look for in a VO2max assessment at Volumes Lab"),
    p(
      "The central question is how the result was obtained. Anyone comparing a wearable estimate with a laboratory result should look for the exercise mode, measurement system, protocol, and way the report identifies the result. Without those details, it is difficult to know whether two numbers are genuinely comparable.",
    ),
    link(
      "Volumes Lab lists a VO2Max Test at Churruca 5, Madrid, with a graded treadmill or bike session, respiratory measurement, and ventilatory-threshold and heart-rate-zone outputs. Check the VO2Max Test page for current protocol and booking details.",
      "VO2Max Test page",
      "https://www.volumeslab.com/vo2max",
    ),
    p(
      "A reader deciding whether to book should ask whether the goal is a documented baseline, an explanation for a watch-to-lab difference, or a repeat assessment under the same conditions. The exercise mode, protocol, and report fields matter more than trying to make two unlike values match exactly.",
    ),
    link(
      "If the main question concerns energy use at rest rather than exercise capacity, the resting energy expenditure article explains why a metabolic assessment answers a different question.",
      "resting energy expenditure article",
      "https://www.volumeslab.com/blog/resting-energy-expenditure",
    ),

    h("What to take away from the comparison"),
    p(
      "An estimated VO2max and a laboratory-measured VO2max are related measures produced through different routes. Estimates model aerobic capacity from sensor and performance data. Laboratory testing records respiratory gas exchange during a defined exercise protocol. The values can be useful in different ways, but they should not be merged into one trend without recording the method, exercise mode, date, and conditions.",
    ),
    p(
      "Use the same procedure when tracking change, and read the surrounding measurements rather than only the headline value. If a watch changes sharply, check the device, sensor signal, activity and body-mass inputs first. If a decision depends on a measured baseline or thresholds, review the protocol and reporting details of a laboratory test. A change in device or protocol is a meaningful break in the record, not necessarily a change in fitness.",
    ),

    h("Frequently Asked Questions (FAQs)"),
    h("Is a laboratory VO2max result always higher than a smartwatch estimate?", 3),
    p(
      "No. Either result can be higher. The device model, exercise mode, protocol, data quality, body-mass input, and effort during the test can all influence the comparison.",
    ),
    h("Can I combine watch and laboratory VO2max values into one trend?", 3),
    p(
      "Keep both in your history, but label them as different methods. Compare repeated watch results with watch results and repeated laboratory tests with tests performed under similar conditions.",
    ),
    h("What if a laboratory test stops before a true maximum is reached?", 3),
    p(
      "The report should explain how the highest valid value was selected and whether criteria for a maximal effort were met. The highest observed value may be reported as peak oxygen uptake rather than a confirmed VO2max.",
    ),
  ],
};
