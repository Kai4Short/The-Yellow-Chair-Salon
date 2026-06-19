import { useState } from "react";
import COLORS from "../constants/colors";
import ProgressBar from "../components/ProgressBar";
import ScreenHeader from "../components/ScreenHeader";
import GoldDivider from "../components/GoldDivider";
import { supabase } from "../lib/supabase";
import getRecommendations from "../utils/recommendations";

const DISTRIBUTION_LABELS = {
  frontHairline: "Front Hairline", temples: "Temples", crown: "Crown",
  scattered: "Scattered Throughout", fullHead: "Full Head",
};

const buildSummaryText = (hairData, goalData, clientName, notes) => {
  const recs = getRecommendations(hairData, goalData);
  const greyLabel = hairData.greyPercentage
    ? hairData.greyPercentage === "less10" ? "< 10%" : hairData.greyPercentage.replace("to", "–") + "%"
    : "N/A";
  return `
THE YELLOW CHAIR SALON — CONSULTATION SUMMARY
═══════════════════════════════════════════════
${clientName ? `Client: ${clientName}` : ""}
${notes ? `Notes: ${notes}` : ""}

HAIR PROFILE
Thickness: ${hairData.thickness} | Level: ${hairData.level} | Density: ${hairData.density}
Texture: ${hairData.texture} | Grey: ${greyLabel}
Distribution: ${hairData.greyDistribution?.map(d => DISTRIBUTION_LABELS[d]).join(", ") || "N/A"}

GOALS
Direction: ${goalData.goal} | Condition: ${goalData.condition}

RECOMMENDATIONS
Colour Direction: ${recs.colourDirection}
Technique: ${recs.technique}
Haircut: ${recs.haircut}
What to Avoid: ${recs.avoid}
Future Plan: ${recs.futurePlan}

HOME HAIRCARE
${recs.homeHaircare.map(h => `${h.category}: ${h.rec}`).join("\n")}

COLOUR OPTIONS
${recs.colourOptions.map(o => `${o.label}: ${o.detail}`).join("\n")}

HAIRCUT OPTIONS
${recs.haircutOptions.map(o => `${o.label}: ${o.detail}`).join("\n")}
`.trim();
};

const SaveScreen = ({ onRestart, hairData, goalData, user, guestEmail, topRight, onBack }) => {
  const [clientName, setClientName] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const isGuest = !user;

  const greyLabel = hairData.greyPercentage
    ? hairData.greyPercentage === "less10" ? "< 10%" : hairData.greyPercentage.replace("to", "–") + "%"
    : null;

  const handleSave = async () => {
    setStatus("loading"); setMessage("");
    if (isGuest) {
      const summaryText = buildSummaryText(hairData, goalData, clientName, notes);
      const { error } = await supabase.auth.signInWithOtp({
        email: guestEmail,
        options: { shouldCreateUser: true, data: { consultation_summary: summaryText }, emailRedirectTo: window.location.origin },
      });
      if (error) { setStatus("error"); setMessage("Failed to send email. Please try again."); return; }
      await supabase.from("consultations").insert({ user_id: null, client_name: clientName || `Guest — ${guestEmail}`, notes, hair_data: hairData, goal_data: goalData, confirmed_services: null });
      setStatus("success"); setMessage(`Consultation summary sent to ${guestEmail}`);
    } else {
      const { error } = await supabase.from("consultations").insert({ user_id: user.id, client_name: clientName, notes, hair_data: hairData, goal_data: goalData, confirmed_services: null });
      if (error) { setStatus("error"); setMessage("Failed to save. Please try again."); return; }
      setStatus("success"); setMessage("Consultation saved to your account.");
    }
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", animation: "fadeIn 0.5s ease", maxWidth: "600px", width: "100%", margin: "0 auto" }}>
      <ScreenHeader onBack={onBack} showBack={true} topRight={topRight} />
      <ProgressBar step={5} />
      <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px 40px" }}>
        <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: "10px", letterSpacing: "0.35em", color: COLORS.gold, textTransform: "uppercase", marginBottom: "8px" }}>Step 04</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "32px", color: COLORS.softBlack, marginBottom: "6px" }}>Save Consultation</h2>
        <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: "12px", color: COLORS.warmGrey, letterSpacing: "0.05em", marginBottom: "28px" }}>
          {isGuest ? `Results will be emailed to ${guestEmail}` : `Signed in as ${user.email}`}
        </p>

        <GoldDivider />

        <div style={{ marginBottom: "20px" }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "10px", letterSpacing: "0.25em", color: COLORS.warmGrey, textTransform: "uppercase", marginBottom: "10px" }}>Client Name</p>
          <input className="input-field" placeholder="Enter client name..." value={clientName} onChange={e => setClientName(e.target.value)} />
        </div>

        <div style={{ marginBottom: "24px" }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "10px", letterSpacing: "0.25em", color: COLORS.warmGrey, textTransform: "uppercase", marginBottom: "10px" }}>Session Notes</p>
          <textarea className="input-field" rows={4} placeholder="Add any additional notes, formula details, or observations..." value={notes} onChange={e => setNotes(e.target.value)} />
        </div>

        <div style={{ background: `linear-gradient(135deg, ${COLORS.softBlack}, ${COLORS.charcoal})`, borderRadius: "16px", padding: "20px", marginBottom: "24px" }}>
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

        {status === "success" && (
          <div style={{ background: "#EFF5EF", border: "1px solid #8BAF8B", borderRadius: "10px", padding: "14px 16px", marginBottom: "16px" }}>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "12px", color: "#5A7A5A", letterSpacing: "0.03em" }}>✓ {message}</p>
          </div>
        )}
        {status === "error" && (
          <div style={{ background: "#FDF0EE", border: `1px solid ${COLORS.rose}`, borderRadius: "10px", padding: "14px 16px", marginBottom: "16px" }}>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "12px", color: "#A0615A", letterSpacing: "0.03em" }}>{message}</p>
          </div>
        )}

        <button className="primary-btn" onClick={handleSave}
          disabled={status === "loading" || status === "success"}
          style={{ marginBottom: "12px", opacity: status === "loading" || status === "success" ? 0.6 : 1, background: status === "success" ? "#6B8F6B" : undefined }}>
          {status === "loading" ? "Please wait..." : status === "success" ? (isGuest ? "✓ Email Sent" : "✓ Saved") : (isGuest ? "Send Summary to Email" : "Save Consultation")}
        </button>
        <button className="ghost-btn" onClick={onRestart}>New Consultation</button>
      </div>
    </div>
  );
};

export default SaveScreen;
