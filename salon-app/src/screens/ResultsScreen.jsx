import { useState } from "react";
import COLORS from "../constants/colors";
import ProgressBar from "../components/ProgressBar";
import GoldDivider from "../components/GoldDivider";
import ScreenHeader from "../components/ScreenHeader";
import getRecommendations from "../utils/recommendations";

const DISTRIBUTION_LABELS = {
  frontHairline: "Front Hairline",
  temples: "Temples",
  crown: "Crown",
  scattered: "Scattered Throughout",
  fullHead: "Full Head",
};

const ResultsScreen = ({ onNext, onBack, hairData, goalData, topRight }) => {
  const recs = getRecommendations(hairData, goalData);

  const [selectedColour, setSelectedColour] = useState(null);
  const [selectedHaircut, setSelectedHaircut] = useState(null);

  // Step 9 — service confirmation fields
  const [confirmedColour, setConfirmedColour] = useState("");
  const [confirmedTechnique, setConfirmedTechnique] = useState("");
  const [confirmedHaircut, setConfirmedHaircut] = useState("");
  const [maintenance, setMaintenance] = useState("");
  const [investment, setInvestment] = useState("");

  const labelStyle = {
    fontFamily: "'Jost', sans-serif", fontSize: "10px", letterSpacing: "0.25em",
    color: COLORS.warmGrey, textTransform: "uppercase", marginBottom: "14px", display: "block",
  };

  const sectionHeading = (text) => (
    <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: "10px", letterSpacing: "0.35em", color: COLORS.gold, textTransform: "uppercase", marginBottom: "14px" }}>{text}</p>
  );

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", animation: "fadeIn 0.5s ease", maxWidth: "600px", width: "100%", margin: "0 auto" }}>
      <ScreenHeader onBack={onBack} showBack={true} topRight={topRight} />
      <ProgressBar step={3} />
      <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px 40px" }}>

        <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: "10px", letterSpacing: "0.35em", color: COLORS.gold, textTransform: "uppercase", marginBottom: "8px" }}>Consultation Results</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "32px", color: COLORS.softBlack, marginBottom: "6px" }}>Complete Look</h2>

        {/* Client tags */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px", marginTop: "16px" }}>
          {[hairData.thickness, `Level ${hairData.level}`, hairData.density, goalData.goal].filter(Boolean).map(tag => (
            <span key={tag} style={{
              fontFamily: "'Jost', sans-serif", fontSize: "10px", letterSpacing: "0.1em",
              color: COLORS.gold, background: COLORS.goldLight,
              border: `1px solid ${COLORS.goldLight}`, borderRadius: "20px",
              padding: "4px 12px", textTransform: "uppercase",
            }}>{tag}</span>
          ))}
        </div>

        {/* ── Step 6: Core Recommendations ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "28px" }}>
          {[
            { label: "Colour Direction", icon: "◈", value: recs.colourDirection, delay: "0.1s" },
            { label: "Technique", icon: "⟡", value: recs.technique, delay: "0.2s" },
            { label: "Haircut Guidance", icon: "✂", value: recs.haircut, delay: "0.3s" },
            { label: "What to Avoid", icon: "◇", value: recs.avoid, delay: "0.4s", accent: true },
            { label: "Future Plan", icon: "◦", value: recs.futurePlan, delay: "0.5s" },
          ].map(({ label, icon, value, delay, accent }) => (
            <div key={label} className="result-card" style={{
              animationDelay: delay,
              borderLeft: accent ? `3px solid ${COLORS.rose}` : `3px solid ${COLORS.goldLight}`,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <span style={{ color: accent ? COLORS.rose : COLORS.gold, fontSize: "14px" }}>{icon}</span>
                <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "9px", letterSpacing: "0.25em", color: COLORS.warmGrey, textTransform: "uppercase" }}>{label}</span>
              </div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "15px", lineHeight: "1.6", color: COLORS.charcoal, fontWeight: 400 }}>{value}</p>
            </div>
          ))}
        </div>

        <GoldDivider />

        {/* ── Grey Analysis Summary ── */}
        {recs.coverageTier && (
          <>
            {sectionHeading("Grey Analysis")}
            <div style={{
              background: COLORS.goldLight, borderRadius: "16px", padding: "18px 20px",
              border: `1px solid ${COLORS.gold}`, marginBottom: "12px",
            }}>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "9px", letterSpacing: "0.25em", color: COLORS.gold, textTransform: "uppercase", marginBottom: "8px" }}>
                {recs.coverageTier.strategy}
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "15px", color: COLORS.charcoal, lineHeight: "1.6", marginBottom: hairData.greyDistribution?.length ? "12px" : 0 }}>
                {recs.coverageTier.detail}
              </p>
              {hairData.greyDistribution?.length > 0 && (
                <>
                  <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "9px", letterSpacing: "0.2em", color: COLORS.warmGrey, textTransform: "uppercase", marginBottom: "8px" }}>Distribution</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {hairData.greyDistribution.map(d => (
                      <span key={d} style={{
                        fontFamily: "'Jost', sans-serif", fontSize: "10px", letterSpacing: "0.08em",
                        color: COLORS.charcoal, background: COLORS.warmWhite,
                        border: `1px solid ${COLORS.lightGrey}`, borderRadius: "20px",
                        padding: "4px 12px", textTransform: "uppercase",
                      }}>{DISTRIBUTION_LABELS[d]}</span>
                    ))}
                  </div>
                </>
              )}
            </div>
            {recs.distributionGuidance.map((note, i) => (
              <p key={i} style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", color: COLORS.warmGrey,
                lineHeight: "1.6", paddingLeft: "12px", borderLeft: `2px solid ${COLORS.goldLight}`,
                marginBottom: "8px",
              }}>{note}</p>
            ))}
            <GoldDivider />
          </>
        )}

        {/* ── Step 7: Future Look — 3 Colour Options ── */}
        {sectionHeading("Future Look — Colour Options")}
        <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: "12px", color: COLORS.warmGrey, letterSpacing: "0.04em", marginBottom: "16px" }}>
          Present all three to create excitement and support rebooking.
        </p>
        {recs.colourOptions.map((opt, i) => (
          <div key={i} className={`option-card ${selectedColour === i ? "selected" : ""}`} onClick={() => setSelectedColour(i)}>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "10px", letterSpacing: "0.15em", color: selectedColour === i ? COLORS.charcoal : COLORS.gold, textTransform: "uppercase", marginBottom: "6px" }}>{opt.label}</p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", color: COLORS.charcoal, lineHeight: "1.6" }}>{opt.detail}</p>
          </div>
        ))}

        <GoldDivider />

        {/* ── Step 7: Future Look — 3 Haircut Options ── */}
        {sectionHeading("Future Look — Haircut Options")}
        {recs.haircutOptions.map((opt, i) => (
          <div key={i} className={`option-card ${selectedHaircut === i ? "selected" : ""}`} onClick={() => setSelectedHaircut(i)}>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "10px", letterSpacing: "0.15em", color: selectedHaircut === i ? COLORS.charcoal : COLORS.gold, textTransform: "uppercase", marginBottom: "6px" }}>{opt.label}</p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", color: COLORS.charcoal, lineHeight: "1.6" }}>{opt.detail}</p>
          </div>
        ))}

        <GoldDivider />

        {/* ── Step 8: Home Haircare Recommendations ── */}
        {sectionHeading("Home Haircare")}
        <div style={{ marginBottom: "8px" }}>
          {recs.homeHaircare.map((item, i) => (
            <div key={i} style={{
              display: "flex", gap: "16px", padding: "12px 0",
              borderBottom: i < recs.homeHaircare.length - 1 ? `1px solid ${COLORS.beige}` : "none",
            }}>
              <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "9px", letterSpacing: "0.2em", color: COLORS.gold, textTransform: "uppercase", width: "80px", flexShrink: 0, paddingTop: "2px" }}>{item.category}</span>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", color: COLORS.charcoal, lineHeight: "1.6" }}>{item.rec}</p>
            </div>
          ))}
        </div>

        <GoldDivider />

        {/* ── Step 9: Confirm Service & Investment ── */}
        {sectionHeading("Confirm Service & Investment")}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "28px" }}>
          {[
            { label: "Colour", value: confirmedColour, onChange: setConfirmedColour, placeholder: "e.g. Full coverage — warm brunette base" },
            { label: "Technique", value: confirmedTechnique, onChange: setConfirmedTechnique, placeholder: "e.g. Full colour + root smudge" },
            { label: "Haircut", value: confirmedHaircut, onChange: setConfirmedHaircut, placeholder: "e.g. Long layers with textured ends" },
            { label: "Maintenance", value: maintenance, onChange: setMaintenance, placeholder: "e.g. Return in 6–8 weeks for root touch-up" },
            { label: "Investment", value: investment, onChange: setInvestment, placeholder: "e.g. $280 — colour + cut" },
          ].map(({ label, value, onChange, placeholder }) => (
            <div key={label}>
              <span style={labelStyle}>{label}</span>
              <input
                className="input-field"
                placeholder={placeholder}
                value={value}
                onChange={e => onChange(e.target.value)}
              />
            </div>
          ))}
        </div>

        <button className="primary-btn" onClick={onNext}>Save Consultation</button>
      </div>
    </div>
  );
};

export default ResultsScreen;
