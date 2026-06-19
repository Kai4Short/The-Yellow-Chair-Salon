import COLORS from "../constants/colors";

// Sits above the ProgressBar on every consultation screen.
// Left side: back button (only when showBack is true)
// Right side: avatar/guest badge passed in as `topRight`
const ScreenHeader = ({ onBack, showBack = true, topRight }) => (
  <div style={{
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "14px 28px 0", flexShrink: 0, minHeight: "44px",
  }}>
    <div>
      {showBack && (
        <button onClick={onBack} style={{
          background: "none", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", gap: "8px", padding: 0,
        }}>
          <span style={{ color: COLORS.warmGrey, fontSize: "18px", lineHeight: 1 }}>←</span>
          <span style={{
            fontFamily: "'Jost', sans-serif", fontSize: "10px",
            letterSpacing: "0.2em", color: COLORS.warmGrey, textTransform: "uppercase",
          }}>Back</span>
        </button>
      )}
    </div>
    <div>{topRight}</div>
  </div>
);

export default ScreenHeader;
