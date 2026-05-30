import COLORS from "../constants/colors";
import ProgressBar from "../components/ProgressBar";
import GoldDivider from "../components/GoldDivider";

const GoalScreen = ({ onNext, onBack, data, setData }) => {
  const update = (key, val) => setData(prev => ({ ...prev, [key]: val }));
  const canContinue = data.goal && data.condition;

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", animation: "fadeIn 0.5s ease", maxWidth: "600px", width: "100%", margin: "0 auto" }}>
      <ProgressBar step={3} />
      <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px 32px" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ color: COLORS.warmGrey, fontSize: "18px" }}>←</span>
          <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "10px", letterSpacing: "0.2em", color: COLORS.warmGrey, textTransform: "uppercase" }}>Back</span>
        </button>

        <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: "10px", letterSpacing: "0.35em", color: COLORS.gold, textTransform: "uppercase", marginBottom: "8px" }}>Step 02</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "32px", color: COLORS.softBlack, marginBottom: "6px" }}>Client Goals</h2>
        <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: "12px", color: COLORS.warmGrey, letterSpacing: "0.05em", marginBottom: "28px" }}>
          What is the client's desired outcome?
        </p>

        <GoldDivider />

        <div style={{ marginBottom: "28px" }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "10px", letterSpacing: "0.25em", color: COLORS.warmGrey, textTransform: "uppercase", marginBottom: "14px" }}>Desired Direction</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {[
              ["Go Lighter", "✦"],
              ["Go Darker", "◆"],
              ["Low Maintenance", "○"],
              ["Full Transformation", "◈"],
            ].map(([goal, icon]) => (
              <button key={goal} className={`choice-btn ${data.goal === goal ? "selected" : ""}`} onClick={() => update("goal", goal)}
                style={{ display: "flex", flexDirection: "column", gap: "8px", padding: "16px" }}>
                <span style={{ color: COLORS.gold, fontSize: "14px" }}>{icon}</span>
                <span>{goal}</span>
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: "32px" }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "10px", letterSpacing: "0.25em", color: COLORS.warmGrey, textTransform: "uppercase", marginBottom: "14px" }}>Current Condition</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
            {["Healthy", "Moderate", "Compromised"].map(c => (
              <button key={c} className={`choice-btn ${data.condition === c ? "selected" : ""}`} onClick={() => update("condition", c)}>{c}</button>
            ))}
          </div>
        </div>

        <button className="primary-btn" onClick={onNext} disabled={!canContinue} style={{ opacity: canContinue ? 1 : 0.4 }}>
          Generate Results
        </button>
      </div>
    </div>
  );
};

export default GoalScreen;
