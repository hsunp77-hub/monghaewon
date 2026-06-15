import React, { useState } from "react";

const FOCUS_OPTIONS = [
  {
    id: "psychology",
    title: "심리 분석 우선",
    subtitle: "분석심리학 · 융 원형",
    desc: "내면의 상징과 감정을 들여다보고, 그림자(Shadow)를 탐구하여 마음을 치유합니다.",
    avatar: "🌿",
    color: "#5A7A5E",
  },
  {
    id: "foretelling",
    title: "예지몽 분석 우선",
    subtitle: "상징 해석 · 미래 예측",
    desc: "무속인 몽화 할머니가 꿈자리에 서린 미래의 예지적 길흉과 처방 비방을 짚어줍니다.",
    avatar: "🕯️",
    color: "#c0392b",
  },
  {
    id: "saju",
    title: "사주/명리 연결",
    subtitle: "음양오행 · 사주팔자",
    desc: "명리학자 청명 선생이 먼저 꿈과 사주의 결합 기운을 짚고 오행을 풀이합니다.",
    avatar: "☽",
    color: "#745fac",
  },
];

export default function Onboard({ onSubmit, onOpenSettings, useMock }) {
  const [name, setName] = useState("");
  
  // Date Dial states (for Saju Birthdate)
  const currentYear = new Date().getFullYear();
  const [birthYear, setBirthYear] = useState("1995");
  const [birthMonth, setBirthMonth] = useState("1");
  const [birthDay, setBirthDay] = useState("1");
  
  // Dream Date calendar selector (default to today)
  const [dreamDate, setDreamDate] = useState(() => {
    const today = new Date();
    const offset = today.getTimezoneOffset();
    const localToday = new Date(today.getTime() - (offset * 60 * 1000));
    return localToday.toISOString().split("T")[0];
  });
  
  // Focus state
  const [focus, setFocus] = useState("psychology");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !dreamDate) return;

    // Formatting birthdate
    const formattedMonth = birthMonth.padStart(2, "0");
    const formattedDay = birthDay.padStart(2, "0");
    const birthdate = `${birthYear}-${formattedMonth}-${formattedDay}`;
    
    onSubmit(name.trim(), birthdate, dreamDate, focus);
  };

  const years = Array.from({ length: 80 }, (_, i) => String(currentYear - i));
  const months = Array.from({ length: 12 }, (_, i) => String(i + 1));
  const days = Array.from({ length: 31 }, (_, i) => String(i + 1));

  return (
    <div style={style.container}>
      <div style={style.settingsBtnWrapper}>
        <button style={style.settingsBtn} className="glass-panel" onClick={onOpenSettings}>
          ⚙️ 설정
        </button>
      </div>

      <div style={style.card} className="glass-panel">
        <div style={style.moonContainer}>
          <div style={style.moon} className="glow-text">☽</div>
          <div style={style.moonGlow}></div>
        </div>
        
        <h1 style={style.title}>夢解院</h1>
        <h2 style={style.subtitle} className="glow-text-primary">몽해원</h2>
        
        <p style={style.description}>
          이름, 생년월일과 함께 꿈을 꾼 날짜를 선택해 주세요.<br />
          원하시는 분석 관점부터 풀이를 시작합니다.
        </p>

        <form onSubmit={handleSubmit} style={style.form}>
          {/* Name Input */}
          <div style={style.inputGroup}>
            <label style={style.label}>이름 또는 닉네임</label>
            <input 
              style={style.input} 
              placeholder="이름을 입력하세요" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              required
            />
          </div>

          {/* Dream Date (Calendar Selector) */}
          <div style={style.inputGroup}>
            <label style={style.label}>꿈을 꾼 날짜 (달력 선택)</label>
            <input 
              style={style.input} 
              type="date" 
              value={dreamDate} 
              onChange={e => setDreamDate(e.target.value)} 
              required
            />
          </div>
          
          {/* Birthdate Celestial Dial */}
          <div style={style.inputGroup}>
            <label style={style.label}>생년월일 (음양오행 사주 계산용)</label>
            <div style={style.dialRow}>
              <select style={style.select} value={birthYear} onChange={e => setBirthYear(e.target.value)}>
                {years.map(y => <option key={y} value={y}>{y}년</option>)}
              </select>
              <select style={style.select} value={birthMonth} onChange={e => setBirthMonth(e.target.value)}>
                {months.map(m => <option key={m} value={m}>{m}월</option>)}
              </select>
              <select style={style.select} value={birthDay} onChange={e => setBirthDay(e.target.value)}>
                {days.map(d => <option key={d} value={d}>{d}일</option>)}
              </select>
            </div>
          </div>

          {/* Analysis focus choices */}
          <div style={style.inputGroup}>
            <label style={style.label}>어떤 분석 관점을 먼저 보시겠습니까?</label>
            <div style={style.focusGrid}>
              {FOCUS_OPTIONS.map((opt) => {
                const isSelected = focus === opt.id;
                return (
                  <div 
                    key={opt.id}
                    style={{
                      ...style.focusCard,
                      borderColor: isSelected ? opt.color : "rgba(255, 255, 255, 0.05)",
                      backgroundColor: isSelected ? "rgba(255, 255, 255, 0.02)" : "transparent",
                      boxShadow: isSelected ? `0 0 15px ${opt.color}25` : "none"
                    }}
                    onClick={() => setFocus(opt.id)}
                  >
                    <div style={style.focusCardHeader}>
                      <span style={{ ...style.focusAvatar, backgroundColor: opt.color }}>{opt.avatar}</span>
                      <div>
                        <div style={{ ...style.focusCardTitle, color: isSelected ? "#fff" : "var(--text-main)" }}>
                          {opt.title}
                        </div>
                        <div style={style.focusCardSubtitle}>{opt.subtitle}</div>
                      </div>
                    </div>
                    <p style={style.focusCardDesc}>{opt.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            style={{ 
              ...style.submitBtn, 
              opacity: (!name.trim() || !dreamDate) ? 0.6 : 1,
            }}
            disabled={!name.trim() || !dreamDate}
          >
            꿈의 세계 입장하기
          </button>
        </form>

        <div style={style.footer}>
          {useMock ? (
            <span style={{ color: "var(--color-primary)", fontWeight: "500" }}>
              ✨ 데모(Mock) 모드가 활성화되어 있습니다
            </span>
          ) : (
            <span style={{ color: "var(--text-muted)" }}>
              🔒 꿈 기록과 개인 정보는 기기의 로컬 저장소에만 안전하게 보관됩니다.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

const style = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "36px 16px",
    position: "relative",
  },
  settingsBtnWrapper: {
    position: "absolute",
    top: "24px",
    right: "24px",
  },
  settingsBtn: {
    background: "rgba(255,255,255,0.03)",
    color: "var(--text-main)",
    border: "1px solid var(--border-color)",
    padding: "8px 16px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "500",
  },
  card: {
    width: "100%",
    maxWidth: "480px",
    borderRadius: "24px",
    padding: "40px 24px 32px",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
    animation: "slideInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
  },
  moonContainer: {
    position: "relative",
    width: "80px",
    height: "80px",
    margin: "0 auto 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  moon: {
    fontFamily: "var(--font-mystic)",
    fontSize: "56px",
    color: "#e2d0ff",
    zIndex: 2,
    animation: "float 6s ease-in-out infinite",
  },
  moonGlow: {
    position: "absolute",
    width: "50px",
    height: "50px",
    background: "radial-gradient(circle, rgba(142,110,230,0.3) 0%, transparent 70%)",
    borderRadius: "50%",
    zIndex: 1,
  },
  title: {
    fontFamily: "var(--font-serif)",
    fontSize: "30px",
    letterSpacing: "6px",
    color: "#ffffff",
    fontWeight: "400",
    marginBottom: "2px",
    marginLeft: "6px",
  },
  subtitle: {
    fontFamily: "var(--font-sans)",
    fontSize: "15px",
    letterSpacing: "3px",
    color: "var(--color-primary)",
    fontWeight: "600",
    textTransform: "uppercase",
    marginBottom: "16px",
  },
  description: {
    fontSize: "12px",
    lineHeight: "1.7",
    color: "var(--text-muted)",
    marginBottom: "28px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    width: "100%",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    textAlign: "left",
  },
  label: {
    fontSize: "12px",
    fontWeight: "600",
    color: "var(--text-main)",
    paddingLeft: "2px",
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
  },
  dialRow: {
    display: "flex",
    gap: "8px",
  },
  select: {
    flex: 1,
    background: "rgba(5, 5, 10, 0.5)",
    border: "1px solid var(--border-color)",
    borderRadius: "12px",
    padding: "12px 14px",
    color: "var(--text-bright)",
    fontSize: "14px",
    outline: "none",
    cursor: "pointer",
  },
  focusGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  focusCard: {
    border: "1px solid",
    borderRadius: "14px",
    padding: "14px 16px",
    cursor: "pointer",
    transition: "all 0.25s ease",
  },
  focusCardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "6px",
  },
  focusAvatar: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "13px",
    color: "#fff",
  },
  focusCardTitle: {
    fontSize: "13px",
    fontWeight: "600",
    transition: "color 0.2s ease",
  },
  focusCardSubtitle: {
    fontSize: "10px",
    color: "var(--text-muted)",
    marginTop: "2px",
  },
  focusCardDesc: {
    fontSize: "11px",
    lineHeight: "1.5",
    color: "var(--text-muted)",
  },
  submitBtn: {
    background: "linear-gradient(135deg, #745fac, #503580)",
    color: "#ffffff",
    padding: "14px 20px",
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "700",
    marginTop: "8px",
    boxShadow: "0 4px 15px rgba(116, 95, 172, 0.3)",
    letterSpacing: "1px",
  },
  footer: {
    marginTop: "20px",
    fontSize: "11px",
    lineHeight: "1.4",
  },
};
