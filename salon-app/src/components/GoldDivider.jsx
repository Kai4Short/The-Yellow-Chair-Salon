import COLORS from "../constants/colors";

const GoldDivider = () => (
  <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "20px 0" }}>
    <div style={{ flex: 1, height: "1px", background: `linear-gradient(to right, transparent, ${COLORS.goldLight})` }} />
    <div style={{ width: "4px", height: "4px", background: COLORS.gold, borderRadius: "50%", opacity: 0.6 }} />
    <div style={{ flex: 1, height: "1px", background: `linear-gradient(to left, transparent, ${COLORS.goldLight})` }} />
  </div>
);

export default GoldDivider;
