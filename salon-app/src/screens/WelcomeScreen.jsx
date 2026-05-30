import COLORS from "../constants/colors";

const WelcomeScreen = ({ onNext }) => (
  <div style={{ flex: 1, display: "flex", flexDirection: "column", animation: "fadeIn 0.5s ease", maxWidth: "600px", width: "100%", margin: "0 auto" }}>
    <div style={{
      flex: 1, display: "flex", flexDirection: "column",
      padding: "0 36px 48px", justifyContent: "space-between",
      overflowY: "auto",
    }}>
      <div style={{ paddingTop: "48px", textAlign: "center" }}>
        <div style={{ width: "56px", height: "1px", background: COLORS.gold, margin: "0 auto 32px" }} />
        <p style={{
          fontFamily: "'Jost', sans-serif", fontWeight: 200,
          fontSize: "10px", letterSpacing: "0.35em", color: COLORS.gold,
          textTransform: "uppercase", marginBottom: "20px",
        }}>
          The Art of Consultation™
        </p>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif", fontWeight: 300,
          fontSize: "48px", lineHeight: "1.1", color: COLORS.softBlack,
          marginBottom: "24px", letterSpacing: "-0.01em",
        }}>
          Your Hair.<br />
          <em style={{ fontStyle: "italic", color: COLORS.warmGrey }}>Elevated.</em>
        </h1>
        <p style={{
          fontFamily: "'Jost', sans-serif", fontWeight: 300,
          fontSize: "13px", lineHeight: "1.8", color: COLORS.warmGrey,
          letterSpacing: "0.04em",
        }}>
          A professional consultation experience crafted to deliver precise, personalised results for every client.
        </p>
      </div>

      <div>
        <div style={{
          background: `linear-gradient(135deg, ${COLORS.beige}, ${COLORS.warmWhite})`,
          borderRadius: "20px", padding: "28px",
          border: `1px solid ${COLORS.lightGrey}`,
          marginBottom: "32px",
        }}>
          {[
            ["01", "Hair Assessment"],
            ["02", "Goal Setting"],
            ["03", "Expert Results"],
          ].map(([num, label]) => (
            <div key={num} style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
              <span style={{
                fontFamily: "'Cormorant Garamond', serif", fontSize: "11px",
                color: COLORS.gold, fontWeight: 400, letterSpacing: "0.1em", minWidth: "20px",
              }}>{num}</span>
              <div style={{ flex: 1, height: "1px", background: COLORS.lightGrey }} />
              <span style={{
                fontFamily: "'Jost', sans-serif", fontSize: "11px",
                fontWeight: 300, letterSpacing: "0.15em", color: COLORS.charcoal,
                textTransform: "uppercase",
              }}>{label}</span>
            </div>
          ))}
        </div>

        <button className="primary-btn" onClick={onNext}>Begin Consultation</button>
        <p style={{
          fontFamily: "'Jost', sans-serif", fontSize: "10px",
          color: COLORS.lightGrey, textAlign: "center", marginTop: "16px", letterSpacing: "0.1em",
        }}>
          Takes approximately 3 minutes
        </p>
      </div>
    </div>
  </div>
);

export default WelcomeScreen;
