// Grey percentage options
export const GREY_PERCENTAGES = [
  { value: "less10", label: "< 10%" },
  { value: "10to20", label: "10–20%" },
  { value: "20to30", label: "20–30%" },
  { value: "30to40", label: "30–40%" },
  { value: "40to50", label: "40–50%" },
  { value: "50",     label: "50%" },
  { value: "60",     label: "60%" },
  { value: "70",     label: "70%" },
  { value: "80",     label: "80%" },
  { value: "90",     label: "90%" },
  { value: "100",    label: "100%" },
];

export const GREY_DISTRIBUTIONS = [
  { value: "frontHairline", label: "Front Hairline" },
  { value: "temples",       label: "Temples" },
  { value: "crown",         label: "Crown" },
  { value: "scattered",     label: "Scattered Throughout" },
  { value: "fullHead",      label: "Full Head" },
];

export const getGreyCoverageTier = (greyPercentage) => {
  if (!greyPercentage) return null;
  if (["less10", "10to20"].includes(greyPercentage)) {
    return { tier: "blend", strategy: "Blending approach suitable", detail: "Less than 20% grey — blending techniques are well suited. Full coverage is optional." };
  }
  if (["20to30", "30to40", "40to50"].includes(greyPercentage)) {
    return { tier: "consider", strategy: "Blending vs. coverage — discuss with client", detail: "20–50% grey — discuss lifestyle and maintenance preference to decide between blending and coverage." };
  }
  if (["50", "60", "70"].includes(greyPercentage)) {
    return { tier: "coverage", strategy: "Coverage is the primary consideration", detail: "More than 50% grey — a coverage-first approach is recommended." };
  }
  if (["80", "90", "100"].includes(greyPercentage)) {
    return { tier: "full", strategy: "Full coverage — tone & maintenance planning critical", detail: "80–100% grey — full coverage required. Focus on tone retention and long-term maintenance scheduling." };
  }
  return null;
};

export const getGreyDistributionGuidance = (distributions = []) => {
  const notes = {
    frontHairline: "Front hairline grey may require targeted coverage and shorter maintenance intervals.",
    temples:       "Temple grey often benefits from strategic placement to frame the face.",
    crown:         "Crown grey may influence formulation and coverage placement.",
    scattered:     "Scattered grey can often be blended effectively with highlights or lowlights.",
    fullHead:      "Full-head grey distribution typically requires a complete coverage strategy.",
  };
  return distributions.map(d => notes[d]).filter(Boolean);
};

const getHomeHaircare = (hair, goals) => {
  const { thickness, density, texture, greyPercentage } = hair;
  const { goal } = goals;
  const tier = getGreyCoverageTier(greyPercentage)?.tier;
  const recs = [];

  if (tier === "coverage" || tier === "full") {
    recs.push({ category: "Shampoo", rec: "Colour-safe, sulphate-free shampoo to maintain coverage longevity and tone." });
  } else if (goal === "Go Lighter") {
    recs.push({ category: "Shampoo", rec: "Purple toning shampoo once a week to neutralise brassiness between appointments." });
  } else {
    recs.push({ category: "Shampoo", rec: "Colour-protective sulphate-free shampoo to preserve vibrancy." });
  }

  if (thickness === "Fine") {
    recs.push({ category: "Conditioner", rec: "Lightweight volumising conditioner — avoid heavy formulas that weigh fine strands down." });
  } else if (thickness === "Coarse") {
    recs.push({ category: "Conditioner", rec: "Rich moisturising conditioner or mask to soften and smooth coarse texture." });
  } else {
    recs.push({ category: "Conditioner", rec: "Balanced hydrating conditioner suited to their colour service." });
  }

  if (texture === "Curly" || texture === "Coily") {
    recs.push({ category: "Treatment", rec: "Weekly deep conditioning mask — curl patterns need consistent hydration." });
  } else if (density === "Low") {
    recs.push({ category: "Treatment", rec: "Scalp-stimulating serum to support density and encourage healthy growth." });
  } else {
    recs.push({ category: "Treatment", rec: "Fortnightly nourishing treatment mask to maintain colour vibrancy and condition." });
  }

  if (texture === "Curly" || texture === "Coily") {
    recs.push({ category: "Styling", rec: "Leave-in conditioner and curl-defining cream for frizz control and definition." });
  } else if (thickness === "Fine") {
    recs.push({ category: "Styling", rec: "Volumising mousse or lightweight spray — avoid heavy serums or oils." });
  } else {
    recs.push({ category: "Styling", rec: "Heat protectant spray when heat styling, plus a finishing serum for shine." });
  }

  if (tier === "full" || tier === "coverage") {
    recs.push({ category: "Colour Care", rec: "At-home toning treatment to extend vibrancy and reduce visible regrowth between visits." });
  }

  return recs;
};

const getFutureLooks = (hair, goals) => {
  const { greyPercentage, density, thickness } = hair;
  const { goal } = goals;
  const tier = getGreyCoverageTier(greyPercentage)?.tier;

  let colourOptions = [];
  if (tier === "blend" || tier === "consider") {
    colourOptions = [
      { label: "Option 1 — Soft Blend", detail: "Subtle highlights woven through to blend and brighten without full coverage." },
      { label: "Option 2 — Balayage", detail: "Natural, sun-kissed colour melt that transitions beautifully with the grey." },
      { label: "Option 3 — Tonal Gloss", detail: "A tone-on-tone gloss to add depth and unify the blend throughout." },
    ];
  } else {
    colourOptions = [
      { label: "Option 1 — Full Coverage", detail: "Rich all-over colour with complete grey coverage for a polished, uniform result." },
      { label: "Option 2 — Root Smudge & Cover", detail: "Full coverage colour with a softened root for a lower-maintenance grow-out." },
      { label: "Option 3 — Covered + Dimensional", detail: "Full coverage base with face-framing highlights for extra dimension and warmth." },
    ];
  }

  let haircutOptions = [];
  if (density === "Low") {
    haircutOptions = [
      { label: "Option 1 — Blunt Bob", detail: "Clean blunt cut to maximise fullness and create the illusion of density." },
      { label: "Option 2 — Minimal Layers", detail: "Subtle layers to add movement without sacrificing volume." },
      { label: "Option 3 — Lob with Fringe", detail: "Lob length with a soft fringe to add fullness around the face." },
    ];
  } else if (goal === "Full Transformation") {
    haircutOptions = [
      { label: "Option 1 — Textured Crop", detail: "Short, lived-in crop with texture and movement for a bold transformation." },
      { label: "Option 2 — Classic Bob", detail: "Clean, chin-length bob — timeless and low maintenance." },
      { label: "Option 3 — Long Layers", detail: "Face-framing long layers to add movement and complement the colour." },
    ];
  } else {
    haircutOptions = [
      { label: "Option 1 — Shape & Refresh", detail: "Remove bulk and rebalance the shape without losing significant length." },
      { label: "Option 2 — Medium Layers", detail: "Layered cut to add movement and suit the face shape." },
      { label: "Option 3 — Textured Lob", detail: "Shoulder-length lob with textured ends — versatile and easy to style at home." },
    ];
  }

  return { colourOptions, haircutOptions };
};

const getRecommendations = (hair, goals) => {
  const { thickness, density, level, condition, greyPercentage, greyDistribution } = hair;
  const { goal } = goals;

  const recs = {
    colourDirection: "",
    technique: "",
    haircut: "",
    avoid: "",
    futurePlan: "",
    homeHaircare: [],
    colourOptions: [],
    haircutOptions: [],
    coverageTier: null,
    distributionGuidance: [],
  };

  recs.coverageTier = getGreyCoverageTier(greyPercentage);
  recs.distributionGuidance = getGreyDistributionGuidance(greyDistribution || []);
  const tier = recs.coverageTier?.tier;

  if (goal === "Go Lighter") {
    if (level <= 4) recs.colourDirection = "Gradual lightening journey — target Level 7 this visit to protect integrity";
    else if (level <= 7) recs.colourDirection = "Lift to Level 9–10 with toner for seamless, luminous result";
    else recs.colourDirection = "Tone and gloss to enhance natural brightness";
  } else if (goal === "Go Darker") {
    recs.colourDirection = level > 6
      ? "Colour fill recommended before darkening to ensure longevity and evenness"
      : "Direct deposit shade 2 levels deeper with a gloss finish for richness";
  } else if (goal === "Low Maintenance") {
    recs.colourDirection = (tier === "coverage" || tier === "full")
      ? "Root shadow coverage with softened regrowth line — 10–12 week maintenance cycle"
      : "Seamless root shadow with lived-in balayage — 12–16 week grow-out";
  } else {
    recs.colourDirection = "Full consultation journey: assess, plan, and execute in staged sessions";
  }

  if (tier === "full" || tier === "coverage") {
    recs.technique = condition === "Compromised"
      ? "Full coverage with bond builder pre-treatment — protect integrity throughout"
      : "Full coverage colour application with toner for depth and tone retention";
  } else if (goal === "Go Lighter" && level <= 5) {
    recs.technique = condition === "Compromised"
      ? "Foilayage — gentler lightener with targeted precision"
      : "Full-head foils or balayage for maximum lift";
  } else if (goal === "Low Maintenance") {
    recs.technique = "Balayage or bronde with shadow root — minimal regrowth visibility";
  } else if (goal === "Full Transformation") {
    recs.technique = "Multi-session approach: pre-lighten, tone, and colour correct over 2–3 visits";
  } else {
    recs.technique = thickness === "Fine"
      ? "Foilayage for volume and dimension"
      : "Balayage for natural movement and blend";
  }

  if (density === "Low") {
    recs.haircut = "Blunt or minimal layers to maximise fullness — avoid heavy graduation";
  } else if (density === "High" && thickness === "Coarse") {
    recs.haircut = "Internal texturising and point-cut ends to remove bulk and enhance movement";
  } else {
    recs.haircut = "Long layers with face-framing pieces to complement colour technique";
  }

  const avoidList = [];
  if (condition === "Compromised") avoidList.push("Avoid bleach on ends without pre-treatment bond builder");
  if (thickness === "Fine") avoidList.push("Avoid heavy all-over tint which can flatten fine hair");
  if (goal === "Go Lighter" && level <= 3) avoidList.push("Avoid going blonde in one session — integrity risk");
  if ((tier === "full" || tier === "coverage") && goal === "Go Lighter") avoidList.push("Avoid high-lift on grey-heavy roots — pre-soften first");
  if (avoidList.length === 0) avoidList.push("No major contraindications — proceed with confidence");
  recs.avoid = avoidList.join("; ");

  const weeks = goal === "Low Maintenance" ? "16–20" : goal === "Full Transformation" ? "6–8" : (tier === "full" || tier === "coverage") ? "6–8" : "10–12";
  recs.futurePlan = `Rebook in ${weeks} weeks. ${condition === "Compromised"
    ? "Prescribe in-salon treatment protocol and homecare routine."
    : "Maintain with colour-safe homecare and regular gloss refresh."}`;

  recs.homeHaircare = getHomeHaircare(hair, goals);
  const looks = getFutureLooks(hair, goals);
  recs.colourOptions = looks.colourOptions;
  recs.haircutOptions = looks.haircutOptions;

  return recs;
};

export default getRecommendations;
