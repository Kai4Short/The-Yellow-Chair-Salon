import COLORS from "../constants/colors";

const ProgressBar = ({ step, total = 5 }) => (
  <div style={{ padding: "16px 28px 0", flexShrink: 0 }}>
    <div style={{ display: "flex", gap: "6px" }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          flex: 1,
          height: "2px",
          borderRadius: "2px",
          background: i < step ? COLORS.gold : COLORS.lightGrey,
          transition: "background 0.4s ease",
        }} />
      ))}
    </div>
  </div>
);

export default ProgressBar;
