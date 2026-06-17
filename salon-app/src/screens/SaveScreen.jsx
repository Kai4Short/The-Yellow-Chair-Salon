import { useState } from "react";
import COLORS from "../constants/colors";
import ProgressBar from "../components/ProgressBar";
import GoldDivider from "../components/GoldDivider";

const DISTRIBUTION_LABELS = {
  frontHairline: "Front Hairline",
  temples: "Temples",
  crown: "Crown",
  scattered: "Scattered Throughout",
  fullHead: "Full Head",
};

const SaveScreen = ({ onRestart, hairData, goalData }) => {
  const [clientName, setClientName] = useState("");
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const greyLabel = hairData.greyPercentage
    ? hairData.greyPercentage === "less10" ? "< 10%" : hairData.greyPercentage.replace("to", "–") + "%"
    : null;

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", animation: "fadeIn 0.5s ease", maxWidth: "600px", width: "100%", margin: "0 auto" }}>
      <ProgressBar step={5} />
      <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px 40px" }}>
        <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: "10px", letterSpacing: "0.35em", color: COLORS.gold, textTransform: "uppercase", marginBottom: "8px" }}>Step 04</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "32px", color: COLORS.softBlack, marginBottom: "6px" }}>Save Consultation</h2>
        <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: "12px", color: COLORS.warmGrey, letterSpacing: "0.05em", marginBottom: "28px" }}>
          Record this client's session for future reference
        </p>

        <GoldDivider />

        <div style={{ marginBottom: "20px" }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "10px", letterSpacing: "0.25em", color: COLORS.warmGrey, textTransform: "uppercase", marginBottom: "10px" }}>Client Name</p>
          <input
            className="input-field"
            placeholder="Enter client name..."
            value={clientName}
            onChange={e => setClientName(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "10px", letterSpacing: "0.25em", color: COLORS.warmGrey, textTransform: "uppercase", marginBottom: "10px" }}>Session Notes</p>
          <textarea
            className="input-field"
            rows={4}
            placeholder="Add any additional notes, formula details, or observations..."
            value={notes}
            onChange={e => setNotes(e.target.value)}
          />
        </div>

        {/* Session summary card */}
        <div style={{
          background: `linear-gradient(135deg, ${COLORS.softBlack}, ${COLORS.charcoal})`,
          borderRadius: "16px", padding: "20px", marginBottom: "24px",
        }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "9px", letterSpacing: "0.3em", color: COLORS.gold, textTransform: "uppercase", marginBottom: "14px" }}>Session Summary</p>
          {[
            ["Profile", `${hairData.thickness} | Level ${hairData.level} | ${hairData.density} density`],
            ["Texture", hairData.texture],
            ["Goal", goalData.goal],
            ["Condition", goalData.condition],
            greyLabel ? ["Grey", greyLabel] : null,
            hairData.greyDistribution?.length ? ["Distribution", hairData.greyDistribution.map(d => DISTRIBUTION_LABELS[d]).join(", ")] : null,
          ].filter(Boolean).map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px", gap: "12px" }}>
              <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "10px", color: COLORS.warmGrey, letterSpacing: "0.1em", flexShrink: 0 }}>{k}</span>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", color: COLORS.cream, textAlign: "right" }}>{v}</span>
            </div>
          ))}
        </div>

        <button className="primary-btn" onClick={handleSave} style={{ marginBottom: "12px", background: saved ? "#6B8F6B" : undefined }}>
          {saved ? "✓ Consultation Saved" : "Save Consultation"}
        </button>
        <button className="ghost-btn" onClick={onRestart}>New Consultation</button>
      </div>
    </div>
  );
};

export default SaveScreen;
