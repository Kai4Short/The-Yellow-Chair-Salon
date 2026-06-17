import COLORS from "../constants/colors";
import ProgressBar from "../components/ProgressBar";
import GoldDivider from "../components/GoldDivider";
import { GREY_PERCENTAGES, GREY_DISTRIBUTIONS, getGreyCoverageTier } from "../utils/recommendations";

const HairAnalysisScreen = ({ onNext, onBack, data, setData }) => {
  const update = (key, val) => setData(prev => ({ ...prev, [key]: val }));

  const toggleDistribution = (val) => {
    setData(prev => ({
      ...prev,
      greyDistribution: prev.greyDistribution.includes(val)
        ? prev.greyDistribution.filter(v => v !== val)
        : [...prev.greyDistribution, val],
    }));
  };

  const coverageTier = getGreyCoverageTier(data.greyPercentage);
  const canContinue = data.thickness && data.density && data.level && data.texture && data.greyPercentage && data.greyDistribution.length > 0;

  const labelStyle = {
    fontFamily: "'Jost', sans-serif", fontSize: "10px", letterSpacing: "0.25em",
    color: COLORS.warmGrey, textTransform: "uppercase", marginBottom: "14px",
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", animation: "fadeIn 0.5s ease", maxWidth: "600px", width: "100%", margin: "0 auto" }}>
      <ProgressBar step={2} />
      <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px 32px" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ color: COLORS.warmGrey, fontSize: "18px" }}>←</span>
          <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "10px", letterSpacing: "0.2em", color: COLORS.warmGrey, textTransform: "uppercase" }}>Back</span>
        </button>

        <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: "10px", letterSpacing: "0.35em", color: COLORS.gold, textTransform: "uppercase", marginBottom: "8px" }}>Step 01</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "32px", color: COLORS.softBlack, marginBottom: "6px" }}>Hair Analysis</h2>
        <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: "12px", color: COLORS.warmGrey, letterSpacing: "0.05em", marginBottom: "28px" }}>
          Assess the client's natural hair profile
        </p>

        <GoldDivider />

        {/* Strand Thickness */}
        <div style={{ marginBottom: "28px" }}>
          <p style={labelStyle}>Strand Thickness</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
            {["Fine", "Medium", "Coarse"].map(t => (
              <button key={t} className={`choice-btn ${data.thickness === t ? "selected" : ""}`} onClick={() => update("thickness", t)}>{t}</button>
            ))}
          </div>
        </div>

        {/* Hair Density */}
        <div style={{ marginBottom: "28px" }}>
          <p style={labelStyle}>Hair Density</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
            {["Low", "Medium", "High"].map(d => (
              <button key={d} className={`choice-btn ${data.density === d ? "selected" : ""}`} onClick={() => update("density", d)}>{d}</button>
            ))}
          </div>
        </div>

        {/* Texture */}
        <div style={{ marginBottom: "28px" }}>
          <p style={labelStyle}>Texture</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            {["Straight", "Wavy", "Curly", "Coily"].map(t => (
              <button key={t} className={`choice-btn ${data.texture === t ? "selected" : ""}`} onClick={() => update("texture", t)}>{t}</button>
            ))}
          </div>
        </div>

        {/* Natural Level */}
        <div style={{ marginBottom: "28px" }}>
          <p style={labelStyle}>Natural Level (1–10)</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "8px", marginBottom: "8px" }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(l => (
              <button key={l} className={`level-btn ${data.level === l ? "selected" : ""}`} onClick={() => update("level", l)}>{l}</button>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "0 4px" }}>
            <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "9px", color: COLORS.lightGrey, letterSpacing: "0.1em" }}>DARKEST</span>
            <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "9px", color: COLORS.lightGrey, letterSpacing: "0.1em" }}>LIGHTEST</span>
          </div>
        </div>

        <GoldDivider />

        {/* Grey Percentage */}
        <div style={{ marginBottom: "20px" }}>
          <p style={labelStyle}>Grey Percentage</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {GREY_PERCENTAGES.map(({ value, label }) => (
              <button
                key={value}
                className={`grey-pill ${data.greyPercentage === value ? "selected" : ""}`}
                onClick={() => update("greyPercentage", value)}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Live coverage strategy callout */}
          {coverageTier && (
            <div style={{
              marginTop: "16px", padding: "14px 16px", borderRadius: "12px",
              border: `1px solid ${COLORS.gold}`, background: COLORS.goldLight,
            }}>
              <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "9px", letterSpacing: "0.25em", color: COLORS.gold, textTransform: "uppercase", marginBottom: "6px" }}>
                {coverageTier.strategy}
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", color: COLORS.charcoal, lineHeight: "1.6" }}>
                {coverageTier.detail}
              </p>
            </div>
          )}
        </div>

        {/* Grey Distribution */}
        <div style={{ marginBottom: "32px" }}>
          <p style={labelStyle}>Grey Distribution — select all that apply</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {GREY_DISTRIBUTIONS.map(({ value, label }) => (
              <button
                key={value}
                className={`choice-btn ${data.greyDistribution.includes(value) ? "selected" : ""}`}
                onClick={() => toggleDistribution(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <button className="primary-btn" onClick={onNext} disabled={!canContinue} style={{ opacity: canContinue ? 1 : 0.4 }}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default HairAnalysisScreen;
