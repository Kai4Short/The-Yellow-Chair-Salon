import { useState } from "react";
import COLORS from "../constants/colors";

const GuestEmailScreen = ({ onNext, onBack }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleContinue = () => {
    setError("");
    if (!email || !email.includes("@")) { setError("Please enter a valid email address."); return; }
    onNext(email);
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", animation: "fadeIn 0.5s ease", maxWidth: "600px", width: "100%", margin: "0 auto" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "48px 36px", justifyContent: "center" }}>

        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", marginBottom: "32px", display: "flex", alignItems: "center", gap: "8px", alignSelf: "flex-start" }}>
          <span style={{ color: COLORS.warmGrey, fontSize: "18px" }}>←</span>
          <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "10px", letterSpacing: "0.2em", color: COLORS.warmGrey, textTransform: "uppercase" }}>Back</span>
        </button>

        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ width: "40px", height: "1px", background: COLORS.gold, margin: "0 auto 24px" }} />
          <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: "10px", letterSpacing: "0.35em", color: COLORS.gold, textTransform: "uppercase", marginBottom: "12px" }}>
            Guest Consultation
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "36px", color: COLORS.softBlack, marginBottom: "12px" }}>
            Where should we<br /><em style={{ fontStyle: "italic", color: COLORS.warmGrey }}>send your results?</em>
          </h2>
          <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: "12px", color: COLORS.warmGrey, letterSpacing: "0.05em", lineHeight: "1.7" }}>
            Enter your email and we'll send a complete<br />consultation summary when you're done.
          </p>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "10px", letterSpacing: "0.25em", color: COLORS.warmGrey, textTransform: "uppercase", marginBottom: "8px" }}>Email Address</p>
          <input className="input-field" type="email" placeholder="your@email.com" value={email}
            onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && handleContinue()}
            style={{ fontSize: "14px" }} />
        </div>

        {error && (
          <div style={{ background: "#FDF0EE", border: `1px solid ${COLORS.rose}`, borderRadius: "10px", padding: "12px 16px", marginBottom: "16px" }}>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "12px", color: "#A0615A", letterSpacing: "0.03em" }}>{error}</p>
          </div>
        )}

        <button className="primary-btn" onClick={handleContinue}>Begin Consultation</button>

        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "10px", color: COLORS.lightGrey, textAlign: "center", marginTop: "16px", letterSpacing: "0.08em", lineHeight: "1.6" }}>
          Your email is only used to send your consultation summary.<br />No account is created.
        </p>
      </div>
    </div>
  );
};

export default GuestEmailScreen;
