import { useState } from "react";
import COLORS from "../constants/colors";
import { supabase } from "../lib/supabase";

const AuthScreen = ({ onAuth, onGuest }) => {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    setError("");
    setSuccess("");
    if (!email || !password) { setError("Please enter your email and password."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true);

    if (mode === "login") {
      const { data, error: err } = await supabase.auth.signInWithPassword({ email, password });
      if (err) { setError(err.message); setLoading(false); return; }
      onAuth(data.user);
    } else {
      const { data, error: err } = await supabase.auth.signUp({ email, password });
      if (err) { setError(err.message); setLoading(false); return; }
      if (data.user) {
        setSuccess("Account created! You're now signed in.");
        setTimeout(() => onAuth(data.user), 1200);
      }
    }
    setLoading(false);
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", animation: "fadeIn 0.5s ease", maxWidth: "600px", width: "100%", margin: "0 auto" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "48px 36px", justifyContent: "center" }}>

        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ width: "40px", height: "1px", background: COLORS.gold, margin: "0 auto 24px" }} />
          <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: "10px", letterSpacing: "0.35em", color: COLORS.gold, textTransform: "uppercase", marginBottom: "12px" }}>
            The Yellow Chair Salon
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "36px", color: COLORS.softBlack, marginBottom: "8px" }}>
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h2>
          <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: "12px", color: COLORS.warmGrey, letterSpacing: "0.05em" }}>
            {mode === "login" ? "Sign in to access your consultations" : "Set up your stylist account"}
          </p>
        </div>

        <div style={{ display: "flex", background: COLORS.warmWhite, borderRadius: "12px", padding: "4px", marginBottom: "28px", border: `1px solid ${COLORS.lightGrey}` }}>
          {["login", "signup"].map(m => (
            <button key={m} onClick={() => { setMode(m); setError(""); setSuccess(""); }}
              style={{
                flex: 1, padding: "10px", border: "none", borderRadius: "10px", cursor: "pointer",
                background: mode === m ? COLORS.softBlack : "transparent",
                color: mode === m ? COLORS.cream : COLORS.warmGrey,
                fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: "11px",
                letterSpacing: "0.15em", textTransform: "uppercase", transition: "all 0.2s ease",
              }}>
              {m === "login" ? "Sign In" : "Sign Up"}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "20px" }}>
          <div>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "10px", letterSpacing: "0.25em", color: COLORS.warmGrey, textTransform: "uppercase", marginBottom: "8px" }}>Email</p>
            <input className="input-field" type="email" placeholder="your@email.com" value={email}
              onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSubmit()} />
          </div>
          <div>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "10px", letterSpacing: "0.25em", color: COLORS.warmGrey, textTransform: "uppercase", marginBottom: "8px" }}>Password</p>
            <input className="input-field" type="password" placeholder="••••••••" value={password}
              onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSubmit()} />
          </div>
        </div>

        {error && (
          <div style={{ background: "#FDF0EE", border: `1px solid ${COLORS.rose}`, borderRadius: "10px", padding: "12px 16px", marginBottom: "16px" }}>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "12px", color: "#A0615A", letterSpacing: "0.03em" }}>{error}</p>
          </div>
        )}
        {success && (
          <div style={{ background: "#EFF5EF", border: "1px solid #8BAF8B", borderRadius: "10px", padding: "12px 16px", marginBottom: "16px" }}>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "12px", color: "#5A7A5A", letterSpacing: "0.03em" }}>{success}</p>
          </div>
        )}

        <button className="primary-btn" onClick={handleSubmit} disabled={loading}
          style={{ opacity: loading ? 0.6 : 1, marginBottom: "12px" }}>
          {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "20px 0" }}>
          <div style={{ flex: 1, height: "1px", background: COLORS.lightGrey }} />
          <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "10px", color: COLORS.lightGrey, letterSpacing: "0.1em" }}>OR</span>
          <div style={{ flex: 1, height: "1px", background: COLORS.lightGrey }} />
        </div>

        <button className="ghost-btn" onClick={onGuest}>Continue as Guest</button>

        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "10px", color: COLORS.lightGrey, textAlign: "center", marginTop: "16px", letterSpacing: "0.08em", lineHeight: "1.6" }}>
          As a guest, your consultation summary will be<br />emailed to you at the end of the session.
        </p>
      </div>
    </div>
  );
};

export default AuthScreen;
