import { useState } from "react";
import COLORS from "../constants/colors";
import GoldDivider from "../components/GoldDivider";
import ScreenHeader from "../components/ScreenHeader";
import { supabase } from "../lib/supabase";

const ProfileScreen = ({ user, onBack, topRight }) => {
  const [displayName, setDisplayName] = useState(user?.user_metadata?.display_name || "");
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileStatus, setProfileStatus] = useState({ type: "", message: "" });
  const [passwordStatus, setPasswordStatus] = useState({ type: "", message: "" });
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const labelStyle = {
    fontFamily: "'Jost', sans-serif", fontSize: "10px", letterSpacing: "0.25em",
    color: COLORS.warmGrey, textTransform: "uppercase", marginBottom: "8px", display: "block",
  };

  const handleUpdateProfile = async () => {
    setProfileStatus({ type: "", message: "" });
    const updates = {};
    if (displayName !== (user?.user_metadata?.display_name || "")) updates.data = { display_name: displayName };
    if (newEmail && newEmail !== user?.email) updates.email = newEmail;
    if (Object.keys(updates).length === 0) { setProfileStatus({ type: "error", message: "No changes to save." }); return; }
    setProfileLoading(true);
    const { error } = await supabase.auth.updateUser(updates);
    if (error) setProfileStatus({ type: "error", message: error.message });
    else {
      setProfileStatus({ type: "success", message: newEmail ? "Check your new email to confirm the change." : "Profile updated successfully." });
      setNewEmail("");
    }
    setProfileLoading(false);
  };

  const handleUpdatePassword = async () => {
    setPasswordStatus({ type: "", message: "" });
    if (!currentPassword) { setPasswordStatus({ type: "error", message: "Enter your current password to continue." }); return; }
    if (!newPassword) { setPasswordStatus({ type: "error", message: "Enter a new password." }); return; }
    if (newPassword.length < 6) { setPasswordStatus({ type: "error", message: "New password must be at least 6 characters." }); return; }
    if (newPassword !== confirmPassword) { setPasswordStatus({ type: "error", message: "New passwords don't match." }); return; }
    if (currentPassword === newPassword) { setPasswordStatus({ type: "error", message: "New password must be different from your current one." }); return; }
    setPasswordLoading(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email: user.email, password: currentPassword });
    if (signInError) { setPasswordStatus({ type: "error", message: "Current password is incorrect." }); setPasswordLoading(false); return; }
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) setPasswordStatus({ type: "error", message: error.message });
    else {
      setPasswordStatus({ type: "success", message: "Password updated successfully." });
      setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
    }
    setPasswordLoading(false);
  };

  const StatusBox = ({ status }) => status.message ? (
    <div style={{
      background: status.type === "success" ? "#EFF5EF" : "#FDF0EE",
      border: `1px solid ${status.type === "success" ? "#8BAF8B" : COLORS.rose}`,
      borderRadius: "10px", padding: "12px 14px", marginBottom: "16px",
    }}>
      <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "12px", color: status.type === "success" ? "#5A7A5A" : "#A0615A", letterSpacing: "0.03em" }}>
        {status.type === "success" ? "✓ " : ""}{status.message}
      </p>
    </div>
  ) : null;

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", animation: "fadeIn 0.5s ease", maxWidth: "600px", width: "100%", margin: "0 auto" }}>
      <ScreenHeader onBack={onBack} showBack={true} topRight={topRight} />
      <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px 48px" }}>

        <div style={{ marginBottom: "32px" }}>
          <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: "10px", letterSpacing: "0.35em", color: COLORS.gold, textTransform: "uppercase", marginBottom: "8px" }}>Account</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: "32px", color: COLORS.softBlack, marginBottom: "6px" }}>Your Profile</h2>
          <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: "12px", color: COLORS.warmGrey, letterSpacing: "0.05em" }}>{user?.email}</p>
        </div>

        <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: "10px", letterSpacing: "0.35em", color: COLORS.gold, textTransform: "uppercase", marginBottom: "18px" }}>Profile Details</p>

        <div style={{ marginBottom: "16px" }}>
          <span style={labelStyle}>Display Name</span>
          <input className="input-field" placeholder="Your name" value={displayName} onChange={e => setDisplayName(e.target.value)} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <span style={labelStyle}>New Email Address</span>
          <input className="input-field" type="email" placeholder={user?.email} value={newEmail} onChange={e => setNewEmail(e.target.value)} />
          <p style={{ fontFamily: "'Jost', sans-serif", fontSize: "10px", color: COLORS.warmGrey, marginTop: "6px", letterSpacing: "0.03em" }}>Leave blank to keep your current email</p>
        </div>

        <StatusBox status={profileStatus} />
        <button className="primary-btn" onClick={handleUpdateProfile} disabled={profileLoading}
          style={{ opacity: profileLoading ? 0.6 : 1, marginBottom: "8px" }}>
          {profileLoading ? "Saving..." : "Save Profile"}
        </button>

        <GoldDivider />

        <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 200, fontSize: "10px", letterSpacing: "0.35em", color: COLORS.gold, textTransform: "uppercase", marginBottom: "18px" }}>Change Password</p>

        <div style={{ marginBottom: "16px" }}>
          <span style={labelStyle}>Current Password</span>
          <input className="input-field" type="password" placeholder="••••••••" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
        </div>
        <div style={{ marginBottom: "16px" }}>
          <span style={labelStyle}>New Password</span>
          <input className="input-field" type="password" placeholder="••••••••" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <span style={labelStyle}>Confirm New Password</span>
          <input className="input-field" type="password" placeholder="••••••••" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
        </div>

        <StatusBox status={passwordStatus} />
        <button className="primary-btn" onClick={handleUpdatePassword} disabled={passwordLoading}
          style={{ opacity: passwordLoading ? 0.6 : 1 }}>
          {passwordLoading ? "Updating..." : "Update Password"}
        </button>
      </div>
    </div>
  );
};

export default ProfileScreen;
