import type { Post } from "./blog";

// Posts supplied for the site in September 2026. The CMS may replace an
// article with the same slug; these stay visible until then.
export const editorialPosts: Post[] = [
  {
    slug: "estimated-vs-laboratory-vo2max",
    title: "Estimated vs Lab Measured VO2max: What’s the Difference?",
    excerpt:
      "How wearable and field estimates differ from laboratory VO2max testing, and what to compare when tracking aerobic fitness over time.",
    date: "2026-10-05",
    readingTime: "5 min read",
    category: "Performance",
    author: "Volumes Lab",
    body: [
      {
        type: "paragraph",
        text: "A laboratory VO2max test measures respiratory gas exchange directly while exercise intensity increases. Wearables and field tests estimate VO2max from heart rate, pace, speed, distance, and other inputs. The numbers may look comparable, but they are produced through different methods and should not automatically be treated as the same result.",
      },
      {
        type: "paragraph",
        text: "This is why an Apple Watch, Garmin, field test, and laboratory test can produce different VO2max values. A wearable estimates from the signals it can observe. A laboratory system measures oxygen uptake and carbon-dioxide output during a structured exercise test.",
      },
      {
        type: "heading",
        text: "How estimated VO2max works",
      },
      {
        type: "paragraph",
        text: "A wearable or field test uses an equation or algorithm. Depending on the product, inputs may include heart rate, pace, speed, distance, movement, age, sex, height, weight, and the quality of the recorded signal. The exact model is device-specific and may work only during supported activities or under particular recording conditions.",
      },
      {
        type: "paragraph",
        text: "A field test follows the same general principle. It may estimate VO2max from the distance completed in a set time, the time required to cover a set distance, running speed, or heart-rate response to a known workload. The result is calculated rather than measured from each breath.",
      },
      {
        type: "paragraph",
        text: "This is why the label on a wearable should be read as an estimate from that product and activity. Apple Watch, Garmin, and other systems may use different inputs and models, so their values can disagree without one device necessarily being malfunctioning. A field estimate can be useful for following a trend, but the trend is strongest when the same device and activity are repeated.",
      },
      {
        type: "heading",
        text: "How laboratory VO2max works",
      },
      {
        type: "paragraph",
        text: "During a laboratory cardiopulmonary exercise test, the person exercises on a treadmill or cycle ergometer while breathing through a measurement interface. The system records oxygen consumption, carbon-dioxide production, and ventilation as workload increases. Heart rate, workload, and other variables may also be recorded.",
      },
      {
        type: "paragraph",
        text: "The laboratory result is more directly tied to the person’s respiratory response during that session. It still varies with protocol, calibration, effort, exercise mode, and test termination. A test that stops early or uses different workload stages may not produce the same value as another laboratory test, even when both are performed correctly.",
      },
      {
        type: "paragraph",
        text: "The American Heart Association provides additional context on cardiopulmonary exercise testing.",
        linkText: "cardiopulmonary exercise testing",
        href: "https://professional.heart.org/en/science-news/2016-focused-update-clinical-recommendations-for-cardiopulmonary-exercise-testing-data-assessment/commentary",
      },
      {
        type: "heading",
        text: "Why the numbers differ",
      },
      {
        type: "paragraph",
        text: "The main difference is the input. A wearable observes heart rate and movement; a laboratory system measures gas exchange. The algorithm may also be trained on a population that does not match every individual closely. Average agreement in a study does not guarantee that a particular person’s estimate will match a laboratory value.",
      },
      {
        type: "paragraph",
        text: "Exercise mode matters as well. Treadmill and cycling results can differ because the movements, muscle demands, technique, and familiarity are different. When comparing results over time, use the same exercise mode where possible. A running estimate should not be treated as directly interchangeable with a cycling laboratory result.",
      },
      {
        type: "heading",
        text: "What a laboratory report adds",
      },
      {
        type: "paragraph",
        text: "A laboratory assessment can provide more than a VO2max number. Ventilatory thresholds, heart-rate response, workload, ventilation, and the pattern of the test can help explain how the result was reached. These measures may be more useful than VO2max alone for understanding training intensity or changes between assessments.",
      },
      {
        type: "paragraph",
        text: "The result should still be interpreted as a measurement from a specific session. It is not a complete description of fitness, performance, symptoms, or sporting ability, and it is not medical advice by itself.",
      },
      {
        type: "paragraph",
        text: "The laboratory setting can also help explain why a wearable estimate changes from one day to the next. A device may use different workouts or different signal quality, while a laboratory report identifies the exercise mode, workload, and respiratory response that produced the result. This does not make the laboratory number permanent, but it gives the reader more information about the test behind it.",
      },
      {
        type: "paragraph",
        text: "For the cleanest trend, compare treadmill with treadmill and cycling with cycling. Keep the date, body mass, exercise mode, and test type beside the value. When the purpose is to understand training response, the thresholds and workload may be more informative than comparing two headline VO2max values produced by different methods.",
      },
      {
        type: "paragraph",
        text: "A laboratory test can also show whether the highest value was reached under the intended protocol. The report may describe how the workload progressed, when the test ended, and how the peak value was selected. That context is often unavailable in a consumer estimate, which is designed for convenient tracking rather than a full assessment of the exercise response.",
      },
      {
        type: "heading",
        text: "VO2max testing in Madrid",
      },
      {
        type: "paragraph",
        text: "Volumes Lab lists a VO2max test at Churruca 5, Madrid, using respiratory gas analysis during exercise. Check the test page for current details and booking availability.",
      },
      {
        type: "heading",
        text: "Conclusion",
      },
      {
        type: "paragraph",
        text: "Laboratory VO2max testing measures respiratory gas exchange directly, while Apple Watch, Garmin, and field-test values estimate VO2max from observable inputs. Both can be useful, but comparisons should preserve the method and exercise mode. A laboratory test adds respiratory, threshold, heart-rate, and workload information that a single wearable estimate cannot provide.",
      },
    ],
  },
  {
    slug: "dexa-vs-bia-body-composition",
    title: "DEXA vs BIA: Which Is More Accurate for Body Composition?",
    excerpt:
      "DEXA and BIA estimate body composition differently. Learn where each method is useful and why their results may not agree.",
    date: "2026-10-05",
    readingTime: "5 min read",
    category: "Body Composition",
    author: "Volumes Lab",
    body: [
      {
        type: "paragraph",
        text: "DEXA is generally the stronger reference method for body composition. BIA is useful and accessible, but its results are more sensitive to hydration, the device used, and the conditions of testing. The best choice depends on whether you need a more detailed reference assessment or a practical method for repeating measurements under consistent conditions.",
      },
      {
        type: "paragraph",
        text: "Neither method gives a perfect, context-free description of the body. DEXA estimates body compartments from X-ray attenuation, while BIA estimates them from electrical impedance and a device-specific model. The result should always be read with the method, equipment, date, and testing conditions in mind.",
      },
      {
        type: "heading",
        text: "How DEXA works",
      },
      {
        type: "paragraph",
        text: "DEXA, also written DXA, uses two low-dose X-ray energies. The scanner measures how those beams are attenuated as they pass through the body and uses the difference to estimate bone mineral, fat mass, and lean soft tissue. A whole-body scan can also report total and regional values.",
      },
      {
        type: "paragraph",
        text: "DEXA is often used as a comparator in research because it provides a structured assessment of several body-composition compartments. It is still an estimation method, not a direct chemical separation of every tissue. Results can vary with the scanner, calibration, software, positioning, movement, body size, and protocol.",
      },
      {
        type: "paragraph",
        text: "For a broader explanation of the assumptions behind DXA and BIA, see this overview of BIA and DXA methods.",
        linkText: "overview of BIA and DXA methods",
        href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6452160/",
      },
      {
        type: "heading",
        text: "How BIA works",
      },
      {
        type: "paragraph",
        text: "BIA sends a low-level electrical current through the body and measures impedance, including resistance and reactance. The device combines that signal with inputs such as height, weight, age, and sex to estimate total body water and then derive fat-free mass, fat mass, and other outputs.",
      },
      {
        type: "paragraph",
        text: "BIA describes a wide range of devices. A foot-to-foot consumer scale, a hand-to-foot analyser, and a multi-frequency professional system may use different electrodes, frequencies, equations, and populations. Results from one BIA device should not automatically be treated as representative of every other BIA system.",
      },
      {
        type: "paragraph",
        text: "Hydration and fluid distribution are especially important because water affects the electrical path measured by the device. Recent exercise, food and drink, stimulants, skin temperature, posture, time of day, and electrode contact can all influence the result. Consistent preparation improves repeatability, but it does not turn a BIA estimate into a DEXA measurement.",
      },
      {
        type: "heading",
        text: "Why results differ",
      },
      {
        type: "paragraph",
        text: "DEXA and BIA do not measure the same physical signal. They also use different definitions and equations to convert that signal into body compartments. Two reports can use the same label, such as body-fat percentage or lean mass, while calculating it differently.",
      },
      {
        type: "paragraph",
        text: "A change in hydration may affect a BIA result without representing the same change in tissue mass. A change in positioning, scanner, software, or regional boundaries may affect a DEXA result. A result can also be repeatable without being close to the value produced by another method.",
      },
      {
        type: "paragraph",
        text: "The difference between repeatability and agreement is illustrated in this study comparing BIA with DXA.",
        linkText: "study comparing BIA with DXA",
        href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9813632/",
      },
      {
        type: "heading",
        text: "Which should you use?",
      },
      {
        type: "paragraph",
        text: "Choose DEXA when the priority is a more detailed reference assessment of bone mineral, fat mass, lean soft tissue, or regional composition. It is generally the stronger comparator when the question is how closely a result agrees with a research or clinical reference.",
      },
      {
        type: "paragraph",
        text: "Choose BIA when the priority is convenience or repeated measurements with the same device and procedure. A consistent BIA trend can be useful for observing movement within that method, especially when testing conditions are kept similar. It should not be merged with DEXA values as if both came from one instrument.",
      },
      {
        type: "paragraph",
        text: "In either case, record the method, device, date, relevant conditions, and compartments reported. That information makes the number more useful than the label alone.",
      },
      {
        type: "paragraph",
        text: "The practical choice also depends on the question being asked. If the goal is to establish a detailed baseline, compare total and regional compartments, or evaluate a result against a commonly used reference method, DEXA is usually the clearer choice. If the goal is to repeat a measurement regularly with minimal friction, BIA may be more practical, provided the same device and procedure are used each time.",
      },
      {
        type: "paragraph",
        text: "A change from BIA to DEXA, or from one BIA device to another, should be marked as a change in method. A new value may reflect a real change in body composition, a measurement difference, or both. Keeping the reports and their conditions together prevents a method change from being mistaken for a biological result.",
      },
      {
        type: "heading",
        text: "Conclusion",
      },
      {
        type: "paragraph",
        text: "DEXA is generally the stronger reference method for body composition, while BIA is a practical option for consistent repeat measurements. The right comparison depends on the method, device, conditions, and purpose of the assessment.",
      },
    ],
  },
  {
    slug: "resting-energy-expenditure",
    title: "What Is Resting Energy Expenditure and How Is It Measured?",
    excerpt:
      "Resting energy expenditure can be estimated with equations or measured using indirect calorimetry. Learn what each result means.",
    date: "2026-10-05",
    readingTime: "5 min read",
    category: "Metabolism",
    author: "Volumes Lab",
    body: [
      {
        type: "paragraph",
        text: "Resting energy expenditure, or REE, is the energy your body uses at rest. Predictive equations estimate it from personal variables such as age, sex, height, weight, and sometimes body composition. Indirect calorimetry measures respiratory gas exchange and uses it to calculate a more individual resting value.",
      },
      {
        type: "paragraph",
        text: "REE is not your total daily calorie expenditure and is not automatically a calorie target. Daily energy use also includes physical activity and the energy associated with processing food. A measured REE is one component of a broader calculation, not the final answer for how much someone should eat.",
      },
      {
        type: "heading",
        text: "What REE means",
      },
      {
        type: "paragraph",
        text: "REE describes energy use while the body is resting. It supports basic ongoing functions, but the measurement does not capture everything that happens during a normal day. Resting metabolic rate, or RMR, is often used for a similar practical concept. Basal metabolic rate, or BMR, is usually defined under more restrictive conditions. In all cases, the report should state which term and protocol were used.",
      },
      {
        type: "heading",
        text: "How indirect calorimetry measures REE",
      },
      {
        type: "paragraph",
        text: "Indirect calorimetry records oxygen consumption and carbon-dioxide production while the person rests and breathes through the equipment used for the assessment. Those gas-exchange measurements are entered into established equations to calculate resting energy expenditure.",
      },
      {
        type: "paragraph",
        text: "A short period of rest, recent food or exercise, stimulants, movement, illness, room conditions, equipment calibration, and the quality of the recorded data can affect the result. The practical aim is to measure gas exchange while the person is resting under defined conditions, then use an appropriate portion of the recording for the calculation.",
      },
      {
        type: "paragraph",
        text: "The National Academies provides a general explanation of energy expenditure and indirect calorimetry.",
        linkText: "indirect calorimetry",
        href: "https://www.ncbi.nlm.nih.gov/books/NBK591031/",
      },
      {
        type: "heading",
        text: "How predictive equations compare",
      },
      {
        type: "paragraph",
        text: "A predictive equation is a population estimate. It can be reasonable when direct measurement is not available, but its average performance in a group does not guarantee a close result for every individual. People can differ from the population used to develop or validate the equation, so a calculator result may differ materially from measured REE.",
      },
      {
        type: "paragraph",
        text: "A measured value can also vary between sessions. Preparation, rest, recent activity, breathing pattern, equipment, and the calculation approach matter. The useful comparison is between results obtained through the same method under similar conditions, not between a calculator estimate and an indirect-calorimetry result treated as if they were identical.",
      },
      {
        type: "paragraph",
        text: "Best-practice considerations for resting measurements are discussed in this review of resting indirect calorimetry.",
        linkText: "review of resting indirect calorimetry",
        href: "https://pubmed.ncbi.nlm.nih.gov/26038298/",
      },
      {
        type: "heading",
        text: "What the result is useful for",
      },
      {
        type: "paragraph",
        text: "REE can provide an individual resting component for a broader energy estimate. It may help explain why a generic calorie calculator does not fit someone well, but it does not prescribe an intake on its own. Activity, goals, food processing, changes in body mass, and training load still require separate assumptions or assessment.",
      },
      {
        type: "paragraph",
        text: "A clear report distinguishes the measured or calculated resting value from any daily-energy estimate built from it. That makes it easier to understand what came from respiratory data and what came from assumptions.",
      },
      {
        type: "paragraph",
        text: "For example, a person may use REE as the resting component in a wider estimate that also includes activity. That wider estimate can change when activity changes, even if the measured REE stays similar. Keeping the components separate prevents a calculator output from being mistaken for a direct measurement of the whole day.",
      },
      {
        type: "paragraph",
        text: "The same care applies when comparing a test with an online calculator. The calculator may use a different equation, different inputs, or a different definition of resting conditions. A difference between the two values is a reason to examine the methods, not proof that one number is automatically wrong.",
      },
      {
        type: "paragraph",
        text: "This distinction is useful when an online calculator gives a value that does not seem to fit the person. The difference may reflect the equation’s population assumptions, an inaccurate input, or genuine individual variation. Indirect calorimetry does not remove every source of uncertainty, but it replaces a general equation input with observed respiratory data from the person during the assessment.",
      },
      {
        type: "paragraph",
        text: "REE can also change with the conditions of the day. A result collected after recent exercise or food intake may not be directly comparable with one collected after a different preparation. The purpose of documenting the conditions is not to create a perfect number; it is to make the result understandable and repeatable enough for the question being asked.",
      },
      {
        type: "paragraph",
        text: "The result is therefore most useful as a clearly labelled input. It can support a broader estimate of energy needs or help compare resting measurements collected under similar conditions, but it should not be presented as a prescription or as a complete measure of metabolism.",
      },
      {
        type: "heading",
        text: "Metabolic testing in Madrid",
      },
      {
        type: "paragraph",
        text: "Volumes Lab lists a Metabolic Assessment at Churruca 5, Madrid, using indirect calorimetry. Check the assessment page for current details and booking availability.",
      },
      {
        type: "heading",
        text: "Conclusion",
      },
      {
        type: "paragraph",
        text: "REE is the energy your body uses at rest. Predictive equations estimate it from population relationships, while indirect calorimetry measures oxygen consumption and carbon-dioxide production to calculate a more individual value. The result can improve a broader energy estimate, but it is not the same as total daily expenditure or an automatic calorie target.",
      },
    ],
  },
];
