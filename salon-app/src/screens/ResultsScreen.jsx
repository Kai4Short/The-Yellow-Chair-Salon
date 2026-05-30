import COLORS from "../constants/colors";
import ProgressBar from "../components/ProgressBar";
import getRecommendations from "../utils/recommendations";

const ResultsScreen = ({ onNext, onBack, hairData, goalData }) => {
  const recs = getRecommendations(hairData, goalData);

  const sections = [
    { label: "Colour Direction", icon: "◈", value: recs.colourDirection, delay: "0.1s" },
    { label: "Technique", icon: "⟡", value: recs.technique, delay: "0.2s" },
    { label: "Haircut Guidance", icon: "✂", value: recs.haircut, delay: "0.3s" },
    { label: "What to Avoid", icon: "◇", value: recs.avoid, delay: "0.4s", accent: true },
    { label: "Future Plan", icon: "◦", value: recs.futurePlan, delay: "0.5s" },
  ];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", animation: "fadeIn 0.5s ease", maxWidth: "600px", width: "100%", margin: "0 auto" }}>
      <ProgressBar step={4} />
      <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px 32px" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ color: COLORS.warmGrey, fontSize: "18px" }}>←</span>
          <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "10px", letterSpacing: "0.2em", color: COLORS.warmGrey, textTransform: "uppercase" }}>Back</span>
        </button>

        <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: "10px", letterSpacing: "0.35em", color: COLORS.gold, textTransform: "uppercase", marginBottom: "8px" }}>Consultation Results</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "32px", color: COLORS.softBlack, marginBottom: "6px" }}>Your Recommendation</h2>

        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px", marginTop: "16px" }}>
          {[hairData.thickness, `Level ${hairData.level}`, hairData.density, goalData.goal].map(tag => (
            <span key={tag} style={{
              fontFamily: "'Jost', sans-serif", fontSize: "10px", letterSpacing: "0.1em",
              color: COLORS.gold, background: COLORS.goldLight,
              border: `1px solid ${COLORS.goldLight}`, borderRadius: "20px",
              padding: "4px 12px", textTransform: "uppercase",
            }}>{tag}</span>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "28px" }}>
          {sections.map(({ label, icon, value, delay, accent }) => (
            <div key={label} className="result-card" style={{
              animationDelay: delay,
              borderLeft: accent ? `3px solid ${COLORS.rose}` : `3px solid ${COLORS.goldLight}`,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <span style={{ color: accent ? COLORS.rose : COLORS.gold, fontSize: "14px" }}>{icon}</span>
                <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "9px", letterSpacing: "0.25em", color: COLORS.warmGrey, textTransform: "uppercase" }}>{label}</span>
              </div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "15px", lineHeight: "1.6", color: COLORS.charcoal, fontWeight: 400 }}>
                {value}
              </p>
            </div>
          ))}
        </div>

        <button className="primary-btn" onClick={onNext}>Save Consultation</button>
      </div>
    </div>
  );
};

export default ResultsScreen;
