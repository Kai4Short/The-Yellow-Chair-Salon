const getRecommendations = (hair, goals) => {
  const { thickness, density, level, condition } = hair;
  const { goal } = goals;

  const recs = {
    colourDirection: "",
    technique: "",
    haircut: "",
    avoid: "",
    futurePlan: "",
  };

  if (goal === "Go Lighter") {
    if (level <= 4) recs.colourDirection = "Gradual lightening journey — target Level 7 this visit to protect integrity";
    else if (level <= 7) recs.colourDirection = "Lift to Level 9–10 with toner for seamless, luminous result";
    else recs.colourDirection = "Tone and gloss to enhance natural brightness";
  } else if (goal === "Go Darker") {
    recs.colourDirection = level > 6
      ? "Colour fill recommended before darkening to ensure longevity and evenness"
      : "Direct deposit shade 2 levels deeper with a gloss finish for richness";
  } else if (goal === "Low Maintenance") {
    recs.colourDirection = "Seamless root shadow with lived-in balayage — 12–16 week grow-out";
  } else {
    recs.colourDirection = "Full consultation journey: assess, plan, and execute in multiple staged sessions";
  }

  if (goal === "Go Lighter" && level <= 5) {
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
  if (condition === "Compromised") avoidList.push("avoid bleach on ends without pre-treatment bond builder");
  if (thickness === "Fine") avoidList.push("avoid heavy all-over tint which can flatten fine hair");
  if (goal === "Go Lighter" && level <= 3) avoidList.push("avoid going blonde in one session — integrity risk");
  if (avoidList.length === 0) avoidList.push("no major contraindications — proceed with confidence");
  recs.avoid = avoidList.map(a => a.charAt(0).toUpperCase() + a.slice(1)).join("; ");

  const weeks = goal === "Low Maintenance" ? "16–20" : goal === "Full Transformation" ? "6–8" : "10–12";
  recs.futurePlan = `Rebook in ${weeks} weeks. ${condition === "Compromised"
    ? "Prescribe in-salon treatment protocol and homecare routine."
    : "Maintain with colour-safe homecare and quarterly gloss."}`;

  return recs;
};

export default getRecommendations;
