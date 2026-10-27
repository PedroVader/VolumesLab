import type { Post } from "./blog";
import { bulletList, heading as h, linkedParagraph as link, paragraph as p, table } from "./articleBlocks";

export const dexaBiaPost: Post = {
  slug: "dexa-vs-bia-body-composition",
  title: "Bioimpedance vs DEXA: How Accurate Is Body Fat Testing?",
  excerpt:
    "Bioimpedance and DEXA estimate body composition in different ways. Learn what each method measures, why results change, and which test fits the question you need to answer.",
  date: "2026-10-27",
  readingTime: "6 min read",
  category: "Body Composition",
  author: "Volumes Lab",
  body: [
    p(
      "Bioimpedance, also called bioelectrical impedance analysis or BIA, estimates body composition using a small electrical current. DEXA uses low-dose X-rays to estimate fat mass, lean soft tissue, and bone mineral content. Both methods use calculations, and neither is error-free.",
    ),
    p(
      "The useful question is not which report shows more decimal places. It is which method measures the information you need, under a protocol you can understand and repeat. That distinction matters when you are tracking body fat, muscle-related values, body recomposition, or changes during a training or weight-management programme.",
    ),

    h("How bioimpedance works"),
    p(
      "A BIA device measures resistance and reactance as a low-level current passes through the body. Its software combines those signals with personal data to estimate body water, fat mass, fat-free mass, and other outputs. It does not directly weigh fat or photograph muscle.",
    ),
    p(
      "Water and electrolytes conduct electricity, so the reading can change when hydration, fluid distribution, food intake, skin temperature, posture, recent exercise, or electrode contact changes. A higher body-fat estimate after a workout does not necessarily mean that you gained fat.",
    ),
    link(
      "The NIH explains how body-composition methods use measurements and assumptions rather than directly separating every tissue.",
      "body-composition methods",
      "https://www.ncbi.nlm.nih.gov/books/NBK541116/",
    ),

    h("Why BIA readings change"),
    bulletList([
      "Hydration and the movement of fluid between body compartments.",
      "Food, drink, caffeine, alcohol, and the time since the last meal.",
      "Recent exercise, sweating, muscle contractions, and raised skin temperature.",
      "Body position, time of day, bladder status, and contact with the electrodes.",
      "The device type, frequency, electrode configuration, inputs, and equation used.",
    ]),
    p(
      "Using the same device under similar conditions makes trends more useful, but repeatability alone does not guarantee accuracy. A consistent BIA reading can still differ from a DEXA estimate because the two methods measure different signals and use different models.",
    ),

    h("What DEXA measures"),
    p(
      "Dual-energy X-ray absorptiometry, commonly written as DEXA or DXA, uses two X-ray energy levels to estimate bone mineral, fat mass, and lean soft tissue. A whole-body scan can provide total and regional body-composition values, while a bone-density appointment may use a different scan area and reporting purpose.",
    ),
    p(
      "DEXA is less dependent on the hydration assumptions used by BIA, but the result still depends on scanner calibration, positioning, movement, software, body size, and technical analysis. DEXA estimates lean soft tissue, which includes water and other non-fat components as well as muscle, so lean mass is not the same as pure muscle mass.",
    ),
    link(
      "A DXA and MRI comparison study shows why agreement can vary by device, compartment, and outcome.",
      "DXA and MRI comparison study",
      "https://pmc.ncbi.nlm.nih.gov/articles/PMC6452160/",
    ),

    h("BIA and DEXA compared"),
    table(
      ["Question", "Bioimpedance", "DEXA"],
      [
        ["What signal is measured?", "Electrical impedance", "Differential X-ray attenuation"],
        ["Typical outputs", "Estimated body water, fat mass, fat-free mass, and related values", "Estimated fat mass, lean soft tissue, regional values, and bone mineral measures"],
        ["Main sources of variation", "Hydration, food, exercise, posture, electrodes, inputs, and equations", "Positioning, movement, calibration, software, scan area, and analysis settings"],
        ["Practical advantage", "Fast and widely available", "More detailed regional and bone-related information"],
        ["Best comparison", "Repeat with the same device and conditions", "Repeat with the same scanner, protocol, and positioning where possible"],
      ],
    ),

    h("Can either test measure muscle directly?"),
    p(
      "Neither method directly measures pure muscle tissue. BIA predicts muscle-related values from electrical signals and equations. DEXA reports lean soft tissue, which includes water and other non-fat components as well as muscle. The label in a report should always be read alongside the method that produced it.",
    ),

    h("Can DEXA estimate BMR?"),
    p(
      "Yes, a DEXA report can use body-composition data to estimate basal metabolism. This is a calculated KPI, not direct calorimetry, and it does not tell you your exact daily calorie needs. Daily energy use also depends on activity, exercise, digestion, and other factors.",
    ),

    h("Choosing a body-composition test at Volumes Lab"),
    p(
      "At Volumes Lab, the first step is to clarify whether you need a body-shape scan, a body-composition estimate, a bone-related measurement, or a wider performance assessment. The method, device, and report fields should match that question.",
    ),
    p(
      "Volumes Lab can combine body-composition information with other assessments when the decision requires more context. A VO2max test measures aerobic fitness, VALD force plates assess strength and power, and mobility or gait assessments answer separate movement questions. These tests do not replace one another.",
    ),
    link(
      "Check the current Volumes Lab services and availability before choosing a body-composition measurement.",
      "Volumes Lab services",
      "https://www.volumeslab.com/",
    ),

    h("Which test should you choose?"),
    bulletList([
      "Use BIA for convenient repeat checks when you can control the device and measurement conditions.",
      "Choose DEXA when you need a more detailed body-composition and bone assessment.",
      "Repeat measurements with similar preparation, timing, positioning, and equipment.",
      "Record the method and conditions before comparing changes over time.",
    ]),
    p(
      "A useful report is not just a number. It tells you what was measured, what was estimated, what can affect the result, and whether the value can be compared with an earlier report.",
    ),

    h("Frequently Asked Questions (FAQs)"),
    h("Does BIA measure body fat directly?", 3),
    p("No. BIA calculates an estimate from electrical signals, personal inputs, and a model."),
    h("Is DEXA 100% accurate?", 3),
    p("No. DEXA is a well-established measurement method with technical and analytical limits."),
    h("Does DEXA directly measure BMR?", 3),
    p("No. A DEXA-based basal-metabolism value is estimated from body-composition data, not measured from respiratory gases."),
    h("Can I compare BIA and DEXA results as one trend?", 3),
    p("You can review them side by side, but they should not be treated as interchangeable points in one continuous series."),
  ],
};
