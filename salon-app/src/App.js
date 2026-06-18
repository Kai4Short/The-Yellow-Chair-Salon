import { useState, useEffect } from "react";
import COLORS from "./constants/colors";
import { supabase } from "./lib/supabase";
import WelcomeScreen from "./screens/WelcomeScreen";
import AuthScreen from "./screens/AuthScreen";
import GuestEmailScreen from "./screens/GuestEmailScreen";
import HairAnalysisScreen from "./screens/HairAnalysisScreen";
import GoalScreen from "./screens/GoalScreen";
import ResultsScreen from "./screens/ResultsScreen";
import SaveScreen from "./screens/SaveScreen";
import "./index.css";

const INITIAL_HAIR = { thickness: "", density: "", level: null, condition: "", texture: "", greyPercentage: "", greyDistribution: [] };
const INITIAL_GOAL = { goal: "", condition: "" };

export default function App() {
  const [screen, setScreen] = useState("welcome");
  const [user, setUser] = useState(null);
  const [guestEmail, setGuestEmail] = useState(null);
  const [hairData, setHairData] = useState(INITIAL_HAIR);
  const [goalData, setGoalData] = useState(INITIAL_GOAL);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) { setUser(session.user); setScreen("hair"); }
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleRestart = () => {
    setScreen("welcome");
    setGuestEmail(null);
    setHairData(INITIAL_HAIR);
    setGoalData(INITIAL_GOAL);
  };

  const renderScreen = () => {
    switch (screen) {
      case "welcome":
        return <WelcomeScreen onLogin={() => setScreen("auth")} onGuest={() => setScreen("guestEmail")} />;
      case "auth":
        return <AuthScreen onAuth={(u) => { setUser(u); setScreen("hair"); }} onGuest={() => setScreen("guestEmail")} />;
      case "guestEmail":
        return <GuestEmailScreen onNext={(email) => { setGuestEmail(email); setScreen("hair"); }} onBack={() => setScreen("welcome")} />;
      case "hair":
        return <HairAnalysisScreen onNext={() => setScreen("goal")} onBack={() => setScreen(user ? "welcome" : "guestEmail")} data={hairData} setData={setHairData} />;
      case "goal":
        return <GoalScreen onNext={() => setScreen("results")} onBack={() => setScreen("hair")} data={goalData} setData={setGoalData} />;
      case "results":
        return <ResultsScreen onNext={() => setScreen("save")} onBack={() => setScreen("goal")} hairData={hairData} goalData={goalData} />;
      case "save":
        return <SaveScreen onRestart={handleRestart} hairData={hairData} goalData={goalData} user={user} guestEmail={guestEmail} />;
      default:
        return null;
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@200;300;400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #FAF7F2; margin: 0; }
        html, body, #root { height: 100%; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .choice-btn { background: ${COLORS.warmWhite}; border: 1.5px solid ${COLORS.lightGrey}; border-radius: 12px; padding: 14px 18px; cursor: pointer; transition: all 0.25s ease; text-align: left; font-family: 'Jost', sans-serif; font-weight: 300; font-size: 13px; letter-spacing: 0.08em; color: ${COLORS.charcoal}; text-transform: uppercase; }
        .choice-btn:hover { border-color: ${COLORS.gold}; background: ${COLORS.goldLight}; transform: translateY(-1px); box-shadow: 0 4px 16px rgba(201,169,110,0.2); }
        .choice-btn.selected { border-color: ${COLORS.gold}; background: linear-gradient(135deg, ${COLORS.goldLight}, #F5E8CC); box-shadow: 0 2px 12px rgba(201,169,110,0.25); }
        .grey-pill { border: 1.5px solid ${COLORS.lightGrey}; border-radius: 20px; padding: 7px 14px; cursor: pointer; transition: all 0.2s ease; font-family: 'Jost', sans-serif; font-weight: 300; font-size: 12px; letter-spacing: 0.08em; color: ${COLORS.charcoal}; text-transform: uppercase; background: ${COLORS.warmWhite}; }
        .grey-pill:hover { border-color: ${COLORS.gold}; }
        .grey-pill.selected { border-color: ${COLORS.gold}; background: linear-gradient(135deg, ${COLORS.goldLight}, #F5E8CC); color: ${COLORS.charcoal}; box-shadow: 0 2px 8px rgba(201,169,110,0.2); }
        .level-btn { width: 36px; height: 36px; border-radius: 50%; border: 1.5px solid ${COLORS.lightGrey}; background: ${COLORS.warmWhite}; cursor: pointer; font-family: 'Jost', sans-serif; font-weight: 300; font-size: 12px; color: ${COLORS.charcoal}; transition: all 0.2s ease; display: flex; align-items: center; justify-content: center; }
        .level-btn:hover { border-color: ${COLORS.gold}; }
        .level-btn.selected { background: ${COLORS.gold}; border-color: ${COLORS.gold}; color: white; box-shadow: 0 2px 10px rgba(201,169,110,0.4); }
        .primary-btn { background: ${COLORS.softBlack}; color: ${COLORS.cream}; border: none; border-radius: 14px; padding: 16px 32px; font-family: 'Jost', sans-serif; font-weight: 300; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; cursor: pointer; transition: all 0.3s ease; width: 100%; }
        .primary-btn:hover { background: ${COLORS.charcoal}; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(26,23,20,0.3); }
        .ghost-btn { background: transparent; color: ${COLORS.warmGrey}; border: 1.5px solid ${COLORS.lightGrey}; border-radius: 14px; padding: 14px 32px; font-family: 'Jost', sans-serif; font-weight: 300; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; cursor: pointer; transition: all 0.25s ease; width: 100%; }
        .ghost-btn:hover { border-color: ${COLORS.gold}; color: ${COLORS.gold}; }
        .result-card { background: ${COLORS.warmWhite}; border: 1px solid ${COLORS.beige}; border-radius: 16px; padding: 20px; animation: slideUp 0.4s ease forwards; }
        .option-card { background: ${COLORS.warmWhite}; border: 1.5px solid ${COLORS.lightGrey}; border-radius: 14px; padding: 16px 18px; cursor: pointer; transition: all 0.25s ease; margin-bottom: 10px; }
        .option-card:hover { border-color: ${COLORS.gold}; transform: translateY(-1px); }
        .option-card.selected { border-color: ${COLORS.gold}; background: linear-gradient(135deg, ${COLORS.goldLight}, #F5E8CC); box-shadow: 0 2px 12px rgba(201,169,110,0.25); }
        .input-field { width: 100%; background: ${COLORS.warmWhite}; border: 1.5px solid ${COLORS.lightGrey}; border-radius: 12px; padding: 14px 16px; font-family: 'Jost', sans-serif; font-weight: 300; font-size: 13px; color: ${COLORS.charcoal}; resize: none; transition: border-color 0.2s ease; outline: none; }
        .input-field:focus { border-color: ${COLORS.gold}; }
        .input-field::placeholder { color: ${COLORS.lightGrey}; letter-spacing: 0.05em; }
        ::-webkit-scrollbar { width: 0; }
      `}</style>
      <div style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif", background: COLORS.cream, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        {renderScreen()}
      </div>
    </>
  );
}
