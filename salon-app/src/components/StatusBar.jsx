import COLORS from "../constants/colors";

const StatusBar = () => (
  <div style={{
    padding: "14px 28px 0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexShrink: 0,
  }}>
    <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "12px", fontWeight: 400, color: COLORS.charcoal }}>9:41</span>
    <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
      {[1, 1, 1, 0.4].map((o, i) => (
        <div key={i} style={{ width: "4px", height: `${6 + i * 2}px`, background: COLORS.charcoal, opacity: o, borderRadius: "1px" }} />
      ))}
      <div style={{ width: "16px", height: "8px", border: `1.5px solid ${COLORS.charcoal}`, borderRadius: "2px", marginLeft: "4px", position: "relative" }}>
        <div style={{ position: "absolute", left: "1px", top: "1px", right: "3px", bottom: "1px", background: COLORS.charcoal, borderRadius: "1px" }} />
        <div style={{ position: "absolute", right: "-4px", top: "2px", width: "2px", height: "4px", background: COLORS.charcoal, borderRadius: "1px" }} />
      </div>
    </div>
  </div>
);

export default StatusBar;
