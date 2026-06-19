import { useState, useRef, useEffect } from "react";
import COLORS from "../constants/colors";
import { supabase } from "../lib/supabase";

const ProfileMenu = ({ user, onSignOut, onEditProfile }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const displayName = user?.user_metadata?.display_name || "";
  const initials = displayName
    ? displayName.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)
    : user?.email?.[0]?.toUpperCase() || "?";

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setOpen(false);
    onSignOut();
  };

  return (
    <div ref={menuRef} style={{ position: "relative" }}>
      {/* Avatar */}
      <button onClick={() => setOpen(o => !o)} style={{
        width: "32px", height: "32px", borderRadius: "50%",
        background: open ? COLORS.gold : `linear-gradient(135deg, ${COLORS.goldLight}, ${COLORS.gold})`,
        border: `1.5px solid ${open ? COLORS.gold : COLORS.goldLight}`,
        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Jost', sans-serif", fontWeight: 400, fontSize: "11px",
        color: COLORS.softBlack, letterSpacing: "0.05em",
        transition: "all 0.2s ease",
        boxShadow: open ? "0 2px 12px rgba(201,169,110,0.4)" : "none",
      }}>
        {initials}
      </button>

      {/* Dropdown */}
      {open && (
        <div style={{
          position: "absolute", top: "40px", right: 0,
          width: "220px", background: COLORS.warmWhite,
          border: `1px solid ${COLORS.lightGrey}`, borderRadius: "14px",
          boxShadow: "0 8px 32px rgba(26,23,20,0.12)",
          overflow: "hidden", animation: "fadeIn 0.15s ease",
          zIndex: 200,
        }}>
          {/* User info */}
          <div style={{ padding: "14px 16px", borderBottom: `1px solid ${COLORS.beige}` }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "15px", color: COLORS.softBlack, marginBottom: "2px" }}>
              {displayName || "Stylist"}
            </p>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "10px", color: COLORS.warmGrey, letterSpacing: "0.03em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {user?.email}
            </p>
          </div>

          {/* Actions */}
          <div style={{ padding: "6px" }}>
            <button onClick={() => { setOpen(false); onEditProfile(); }} style={{
              width: "100%", background: "none", border: "none", cursor: "pointer",
              padding: "9px 12px", borderRadius: "8px", display: "flex", alignItems: "center",
              gap: "10px", textAlign: "left", transition: "background 0.15s ease",
            }}
              onMouseEnter={e => e.currentTarget.style.background = COLORS.beige}
              onMouseLeave={e => e.currentTarget.style.background = "none"}
            >
              <span style={{ color: COLORS.gold, fontSize: "13px" }}>◈</span>
              <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "11px", fontWeight: 300, color: COLORS.charcoal, letterSpacing: "0.05em" }}>Edit Profile</span>
            </button>
          </div>

          {/* Sign out */}
          <div style={{ padding: "6px", borderTop: `1px solid ${COLORS.beige}` }}>
            <button onClick={handleSignOut} style={{
              width: "100%", background: "none", border: "none", cursor: "pointer",
              padding: "9px 12px", borderRadius: "8px", display: "flex", alignItems: "center",
              gap: "10px", textAlign: "left", transition: "background 0.15s ease",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "#FDF0EE"}
              onMouseLeave={e => e.currentTarget.style.background = "none"}
            >
              <span style={{ color: COLORS.rose, fontSize: "13px" }}>↗</span>
              <span style={{ fontFamily: "'Jost', sans-serif", fontSize: "11px", fontWeight: 300, color: COLORS.rose, letterSpacing: "0.05em" }}>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
