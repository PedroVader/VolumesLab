import type { Post } from "./blog";

export const wearableVo2maxAccuracyPost: Post = {
  slug: "smartwatch-vo2max-accuracy",
  title: "How Accurate Is the VO2max Estimate on Garmin, Apple Watch, or Polar?",
  excerpt:
    "Garmin, Apple Watch, and Polar can estimate VO2max from workouts, but accuracy depends on the device, activity, signal quality, and comparison method.",
  date: "2026-10-12",
  readingTime: "10 min read",
  category: "Performance",
  author: "Volumes Lab",
  body: [
    {
      type: "paragraph",
      text: "A watch can turn a run, ride, or brisk outdoor session into a VO2max estimate within minutes. That makes the number easy to follow, but it also makes the word accurate harder to answer than it first appears. Accuracy is not only about whether one reading matches a laboratory result. It is also about whether the estimate is stable enough for the decision you want to make.",
    },
    {
      type: "paragraph",
      text: "For a recreational athlete, the useful question may be whether aerobic fitness appears to be changing across similar sessions. For a runner, cyclist, triathlete, or coach, the question may be whether a device estimate can stand in for a measured baseline. Garmin, Apple Watch, and Polar may all display VO2max, but they do not necessarily use the same signals, activity rules, or model.",
    },
    {
      type: "paragraph",
      text: "This guide explains what the devices are estimating, what research can and cannot tell you about accuracy, and when a measured exercise test from Volumes Lab answers a different question.",
    },
    { type: "heading", level: 2, text: "Accuracy has more than one meaning" },
    {
      type: "paragraph",
      text: "In measurement science, accuracy refers to closeness to a reference value. Repeatability asks a different question, whether the result is similar when the same thing is measured again under similar conditions. A device can be repeatable without being close to a laboratory value, or it can occasionally be close by chance without producing a dependable trend.",
    },
    {
      type: "paragraph",
      text: "Agreement asks how close an estimate is to a reference measurement. Repeatability asks how similar the results are across comparable sessions. Sensitivity to conditions asks how much the number shifts when the inputs change, while transferability asks whether findings from one model, sport, or study population apply elsewhere.",
    },
    {
      type: "paragraph",
      text: "That distinction is important for Volumes Lab testing too. A laboratory value is not a permanent truth, it is a measured result produced by a particular protocol, exercise mode, analyser, and session. The advantage is that the method and the surrounding physiological response are documented more directly.",
    },
    { type: "heading", level: 2, text: "What Garmin, Apple Watch, and Polar are estimating" },
    {
      type: "paragraph",
      text: "A consumer wearable usually combines heart-rate data with movement and performance information. Depending on the product and activity, this may include pace, speed, distance, elevation, GPS data, cycling power, age, body mass, and maximum-heart-rate settings. The algorithm uses those inputs to infer how much oxygen the body would be expected to use at maximal effort.",
    },
    {
      type: "paragraph",
      text: "The watch does not normally collect exhaled air through a mask. It observes a relationship between external work and the heart-rate response, then applies a model developed for particular activities, populations, sensors, and data-quality thresholds.",
    },
    {
      type: "paragraph",
      text: "A study of the Garmin fēnix 6 validation shows why the exact model and test setup matter: its estimates were compared with metabolic-system data after a graded exercise test and an outdoor run. That result cannot be transferred automatically to every Garmin device or every workout.",
      linkText: "Garmin fēnix 6 validation",
      href: "https://pubmed.ncbi.nlm.nih.gov/39797066/",
    },
    {
      type: "paragraph",
      text: "Apple Watch and Polar also use product-specific approaches. The label VO2max may look identical across apps, while the activity eligibility, sensor mix, filtering, and update behaviour differ. Even within one brand, the result can vary between watch generations, heart-rate sources, sport modes, and software versions.",
    },
    {
      type: "paragraph",
      text: "A recent study also illustrates why an average result and the spread of individual differences need to be read together. The tested Apple Watch estimates were not interchangeable with the criterion measurements for every participant.",
      linkText: "Apple Watch VO2max agreement study",
      href: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12080799/",
    },
    { type: "heading", level: 2, text: "The inputs that can move the number" },
    {
      type: "paragraph",
      text: "The estimate is only as informative as the data the algorithm receives. A change in the displayed value can reflect a change in aerobic capacity, a change in the exercise session, a change in signal quality, or a change in the way the software processed the activity.",
    },
    { type: "heading", level: 3, text: "Heart-rate data" },
    {
      type: "paragraph",
      text: "Optical wrist sensors can be affected by movement, fit, skin contact, temperature, cadence lock, and rapid changes in intensity. A chest strap may provide a different signal quality profile, but it does not remove every source of uncertainty. If the heart-rate trace is implausible, the VO2max estimate deserves less confidence.",
    },
    { type: "heading", level: 3, text: "Pace, speed, power, and terrain" },
    {
      type: "paragraph",
      text: "The same heart rate means something different when the athlete is running uphill, into a strong wind, on soft ground, or carrying fatigue. A device may account for some contextual inputs, but no consumer algorithm captures every factor equally well. Cycling estimates also depend on whether power data are available and reliable.",
    },
    { type: "heading", level: 3, text: "Profile data and body mass" },
    {
      type: "paragraph",
      text: "Age, sex, body mass, maximum heart rate, and training information can feed the model. Relative VO2max is expressed per kilogram, so an altered body-mass entry can change the displayed value even when absolute oxygen use has not changed in the same way. An outdated maximum-heart-rate setting can also distort the relationship the algorithm is trying to interpret.",
    },
    { type: "heading", level: 3, text: "Workout eligibility" },
    {
      type: "paragraph",
      text: "A watch may only update the estimate after an activity meets its rules for duration, intensity, route, GPS quality, or heart-rate coverage. Two hard workouts are not automatically equivalent inputs. One may qualify for an estimate, while the other is ignored or processed differently.",
    },
    { type: "heading", level: 2, text: "What the research says about wearable accuracy" },
    {
      type: "paragraph",
      text: "Research on consumer wearables is useful, but it must be interpreted carefully. Studies compare a device with a criterion test in a particular sample, activity, protocol, and software version. The result can describe average bias, limits of agreement, correlation, or classification performance, and those are not interchangeable summaries.",
    },
    {
      type: "paragraph",
      text: "A small validation study of the Polar A300 found a meaningful relationship with a treadmill criterion test and strong test-retest reliability, but its sample was only 19 recreationally active adults. That is an example of why correlation, reliability, and agreement should not be treated as the same claim.",
      linkText: "Polar A300 validation study",
      href: "https://pubmed.ncbi.nlm.nih.gov/30899351/",
    },
    {
      type: "paragraph",
      text: "A comparison of the Polar V800 and Garmin Forerunner 230 shows another limitation: comparing brands requires attention to the exact models, the population tested, and how the reference value was obtained.",
      linkText: "Polar V800 and Garmin Forerunner 230",
      href: "https://pubmed.ncbi.nlm.nih.gov/30640299/",
    },
    {
      type: "paragraph",
      text: "“Accurate on average” is not the same as “accurate enough for every person.” A study may show a modest average bias while individual results spread widely around the laboratory reference. This is why a wearable can be useful for monitoring without being a substitute for measured respiratory gas exchange when the decision depends on a precise baseline.",
    },
    {
      type: "heading",
      level: 2,
      text: "Using a Volumes Lab test to check a wearable VO2max estimate",
    },
    {
      type: "paragraph",
      text: "Suppose your watch repeatedly reports a VO2max of 48, then falls to 44 after several rides, or gives a running value that does not seem comparable with your cycling data. The useful next step is not to collect more screenshots. Write down the device, sport, heart-rate source, body mass, route conditions, and dates, then decide what you want the comparison to explain.",
    },
    { type: "heading", level: 3, text: "Before the assessment" },
    {
      type: "paragraph",
      text: "Bring the device or recent activity records if they are relevant to the question. Tell the team whether the estimate comes from running, cycling, or another activity, and whether it uses wrist-based or chest-strap heart rate. A clear comparison starts with matching the laboratory exercise mode to the device series whenever that is possible.",
    },
    {
      type: "paragraph",
      text: "The performance assessment Madrid service at Volumes Lab can place VO2max alongside movement and performance information when the wearable score does not explain why output, gait, or exercise tolerance changed.",
      linkText: "performance assessment Madrid",
      href: "https://www.volumeslab.com/performance",
    },
    { type: "heading", level: 3, text: "During the assessment" },
    {
      type: "paragraph",
      text: "A structured treadmill or bike test records respiratory gas exchange as the workload rises, together with heart rate and exercise output. The report can therefore show how the result was produced, not only the final number. Depending on the assessment, thresholds and other response markers may help explain why a watch trend and a measured value do not line up.",
    },
    { type: "heading", level: 3, text: "After the assessment" },
    {
      type: "paragraph",
      text: "Compare like with like. A running watch estimate is easier to interpret beside a treadmill result than beside a cycling result. Note the date, body mass, exercise mode, protocol, and whether the laboratory report uses VO2max or VO2peak. Keep the watch series labelled as an estimate, and use the measured result as a reference point rather than replacing every future device value with it.",
    },
    {
      type: "paragraph",
      text: "If the disagreement appears alongside movement questions, a gait analysis Madrid is a different assessment and should not be used as a proxy for VO2max. Keeping those measurements separate prevents unrelated physiological questions from blending together.",
      linkText: "gait analysis Madrid",
      href: "https://www.volumeslab.com/gait-analysis",
    },
    {
      type: "paragraph",
      text: "This gives Volumes Lab a clear role in the process: the laboratory assessment helps explain the device number, while the wearable remains useful for frequent observations between formal assessments.",
    },
    { type: "heading", level: 2, text: "How to judge your own wearable trend" },
    {
      type: "paragraph",
      text: "A single estimate is weak evidence. A sequence of comparable estimates can be more informative, especially when the activity, device, heart-rate source, route type, and profile data stay reasonably consistent. The goal is not to force the number to agree with a laboratory test, it is to understand whether the series is interpretable.",
    },
    {
      type: "paragraph",
      text: "Before comparing two wearable estimates, check the device and software version, sport and route type, heart-rate source, body-mass and profile settings, GPS or power data, and unusual heat, terrain, wind, fatigue, or recording interruptions.",
    },
    {
      type: "paragraph",
      text: "If several comparable sessions move in the same direction, the trend may be worth following. If one value changes sharply, first inspect the inputs and activity file. If the disagreement persists, a measured assessment may answer the question more directly than another round of app interpretation.",
    },
    { type: "heading", level: 2, text: "When a wearable estimate is enough, and when it is not" },
    {
      type: "paragraph",
      text: "If the number is one piece of a personal training log, a device trend may be sufficient. If it is being used as a formal baseline, compared across methods, or interpreted alongside thresholds and exercise response, the measurement method becomes more important.",
    },
    { type: "heading", level: 2, text: "A better way to record the result" },
    {
      type: "paragraph",
      text: "Do not store VO2max as a number alone. Add the brand and model, sport mode, sensor source, body mass, activity type, and relevant route or environmental context. For laboratory testing, record the exercise mode, protocol, analyser report, workload, and whether the report uses VO2max or VO2peak.",
    },
    {
      type: "paragraph",
      text: "This makes later comparisons more honest and helps a Volumes Lab professional understand whether a difference is likely to come from the person, exercise mode, protocol, algorithm, or input quality.",
    },
    { type: "heading", level: 2, text: "The useful answer to the accuracy question" },
    {
      type: "paragraph",
      text: "Garmin, Apple Watch, and Polar can provide useful estimates of aerobic capacity, particularly when the same device and activity are repeated under similar conditions. Their numbers are still modelled outputs, not direct measurements of inhaled and exhaled gases. Research supports cautious use of wearable trends, but it does not justify treating every displayed value as a laboratory-equivalent result.",
    },
    {
      type: "paragraph",
      text: "Use the watch to observe a consistent series. Use a laboratory assessment when you need a defined reference point, measured respiratory gas exchange, or more context around why a value changed. Label the method beside every result, and let the question determine how much confidence the number deserves.",
    },
    { type: "heading", level: 2, text: "Frequently Asked Questions (FAQs)" },
    { type: "heading", level: 3, text: "Which is more accurate, Garmin, Apple Watch, or Polar?" },
    {
      type: "paragraph",
      text: "There is no universal winner across every model, software version, sport, population, and testing protocol. Validation evidence is device-specific, so compare the exact product and activity studied rather than assuming that a brand-level claim applies to every watch.",
    },
    { type: "heading", level: 3, text: "Can a smartwatch measure VO2max directly?" },
    {
      type: "paragraph",
      text: "Usually no. A smartwatch estimates VO2max from sensor and performance data. Direct measurement requires respiratory gas analysis during exercise, typically with a mask or mouthpiece connected to a calibrated analyser.",
    },
    { type: "heading", level: 3, text: "Why did my VO2max estimate change after one workout?" },
    {
      type: "paragraph",
      text: "The change may reflect the workout itself, heart-rate or GPS quality, terrain, temperature, profile settings, body mass, software processing, or normal model variation. Inspect the activity data before treating one reading as a physiological change.",
    },
    {
      type: "heading",
      level: 3,
      text: "Is a chest strap required for a reliable smartwatch estimate?",
    },
    {
      type: "paragraph",
      text: "Not always, and requirements vary by device. A chest strap can provide a different heart-rate signal, but it cannot correct for every source of error in pace, power, GPS, profile data, exercise mode, or the algorithm.",
    },
    {
      type: "heading",
      level: 3,
      text: "Can I compare a running estimate with a cycling laboratory test?",
    },
    {
      type: "paragraph",
      text: "You can compare them as different results, but they should not be treated as a clean validation pair. Exercise mode, technique, muscle recruitment, training history, and protocol can all affect the value.",
    },
    { type: "heading", level: 3, text: "Does a higher wearable VO2max mean I am fitter?" },
    {
      type: "paragraph",
      text: "It may suggest a change within the device’s model, especially when several comparable sessions move together. It is not a complete assessment of fitness, performance, health, or exercise readiness.",
    },
    { type: "heading", level: 3, text: "When should I consider a Volumes Lab VO2max test?" },
    {
      type: "paragraph",
      text: "Consider a measured assessment when you need a defined baseline, a closer comparison between device data and respiratory gas exchange, thresholds and workload context, or an explanation for a persistent disagreement between the watch and the wider performance picture.",
    },
    {
      type: "heading",
      level: 3,
      text: "Should I combine Garmin, Apple Watch, and Polar values in one trend?",
    },
    {
      type: "paragraph",
      text: "No. Keep each device series labelled separately. Different models can use different inputs and algorithms, so a change of device should be recorded as a method change rather than a seamless continuation.",
    },
  ],
};
