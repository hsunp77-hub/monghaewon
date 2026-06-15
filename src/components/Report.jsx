import React from "react";

const CHARACTERS = {
  lee: { id: "lee", name: "이선영", title: "심리학 박사", avatar: "🌿", color: "#5A7A5E" },
  cheong: { id: "cheong", name: "청명 선생", title: "명리학자", avatar: "☽", color: "#745fac" },
  halmae: { id: "halmae", name: "몽화", title: "신점 무속인", avatar: "🕯️", color: "#c0392b" },
};

export default function Report({ report, profile, name, dreams, onBack }) {
  const isForetelling = profile?.analysisFocus === "foretelling";
  const lee = report?.leeReport;
  const secondReport = isForetelling ? report?.halmaeReport : report?.cheongReport;
  const secondCharacter = isForetelling ? CHARACTERS.halmae : CHARACTERS.cheong;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={style.wrapper} className="cosmic-bg">
      <div style={style.container} className="no-print">
        {/* Navigation & Controls */}
        <div style={style.navBar}>
          <button style={style.backBtn} onClick={onBack}>
            ← 돌아가기
          </button>
          <button style={style.printBtn} onClick={handlePrint}>
            🖨️ PDF 저장 / 인쇄
          </button>
        </div>

        {/* Report Header */}
        <div style={style.reportHeader}>
          <div style={style.lunarOrnament}>✦</div>
          <h2 style={style.reportTitle}>{name}님의 꿈 처방전</h2>
          <div style={style.subtitle}>
            총 {dreams.length}회의 기록 분석 • {new Date().toLocaleDateString("ko-KR")} 발급
          </div>
        </div>

        {/* Dr. Lee's psychology prescription */}
        <div style={{ ...style.card, borderTop: `4px solid ${CHARACTERS.lee.color}` }} className="glass-panel">
          <div style={style.cardHeader}>
            <div style={{ ...style.avatar, background: CHARACTERS.lee.color }}>🌿</div>
            <div>
              <div style={style.expertName}>이선영 박사</div>
              <div style={style.prescriptionTitle}>임상·분석심리학 처방</div>
            </div>
          </div>
          
          <div style={style.cardBody}>
            <Section label="반복 상징 및 무의식 분석" text={lee?.repeatSymbols} />
            <Section label="그림자(Shadow)가 던지는 메시지" text={lee?.shadowMessage} />
            <Section label="의식과 꿈의 정서적 흐름" text={lee?.dreamFlow} />
            
            <div style={style.prescriptionBlockLee}>
              <div style={style.blockLabelLee}>이번 주 행동 처방</div>
              <p style={style.blockTextLee}>{lee?.prescription}</p>
            </div>
            
            <p style={style.closingLee}>"{lee?.closing}"</p>
          </div>
        </div>

        {/* Second expert's prescription (Cheong-myeong or Monghwa) */}
        <div style={{ ...style.card, borderTop: `4px solid ${secondCharacter.color}` }} className="glass-panel">
          <div style={style.cardHeader}>
            <div style={{ ...style.avatar, background: secondCharacter.color }}>{secondCharacter.avatar}</div>
            <div>
              <div style={style.expertName}>{secondCharacter.name} {isForetelling ? "" : "선생"}</div>
              <div style={style.prescriptionTitle}>{isForetelling ? "민속 해몽·예지 신점 처방" : "명리·음양오행 처방"}</div>
            </div>
          </div>

          <div style={style.cardBody}>
            <Section label={isForetelling ? "꿈의 성격 분류 (길몽·흉몽·예지)" : "꿈의 성격 분류 (예지·경고·소화)"} text={secondReport?.dreamType} />
            <Section label={isForetelling ? "신점 및 꿈자리 징조 풀이" : "꿈 속 지배 오행과 사주 오행 풀이"} text={secondReport?.ohangFlow} />
            <Section label={isForetelling ? "최근 신변 및 기운과의 연관 관계" : "월운(月運) 흐름과의 연관 관계"} text={secondReport?.monthlyYun} />
            
            <div 
              style={{
                ...style.prescriptionBlockCheong,
                backgroundColor: isForetelling ? "var(--color-halmae-bubble)" : "var(--color-cheong-bubble)",
                borderColor: isForetelling ? "rgba(192, 57, 43, 0.25)" : "rgba(116, 95, 172, 0.25)"
              }}
            >
              <div style={{ ...style.blockLabelCheong, color: isForetelling ? "#fcdbd9" : "#b8a0d8" }}>
                {isForetelling ? "향후 2주간의 예언" : "향후 2주간의 예측"}
              </div>
              <p style={{ ...style.blockTextCheong, color: isForetelling ? "#fcdbd9" : "#edeaf5" }}>{secondReport?.prediction}</p>
            </div>

            <div style={style.gridRow}>
              <Section label={isForetelling ? "⚠ 액막이를 위해 피하고 조심할 행동" : "⚠ 경계하고 조심할 행동"} text={secondReport?.caution} color="#e57373" />
              <Section label={isForetelling ? "🕯️ 재수를 트이게 하기 위해 취할 비방" : "✦ 가까이하여 취할 기운 (방향/색상/시간)"} text={secondReport?.luck} color={isForetelling ? "#fca5a5" : "#a78bfa"} />
            </div>

            <p style={style.closingCheong}>"{secondReport?.closing}"</p>
          </div>
        </div>

        {/* Dream History Log */}
        <div style={style.historyCard} className="glass-panel">
          <div style={style.historyTitle}>기록된 꿈 여정 (Dream Logs)</div>
          <div style={style.timeline}>
            {dreams.map((d, i) => (
              <div key={i} style={style.timelineItem}>
                <div style={style.timelineBadge}>{i + 1}</div>
                <div style={style.timelineContent}>
                  <div style={style.timelineMeta}>
                    <span style={style.timelineDate}>{d.date}</span>
                  </div>
                  <p style={style.timelineText}>{d.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Print View Only (Hidden on screen, styled for clean print) */}
      <div className="print-only" style={style.printContainer}>
        <h1 style={style.printMainTitle}>夢解院 꿈 처방전</h1>
        <p style={style.printMeta}>수진자: {name} | 분석 건수: {dreams.length}건 | 발행일: {new Date().toLocaleDateString("ko-KR")}</p>
        
        <div style={style.printDivider}></div>
        
        <div style={style.printSection}>
          <h2>[1] 이선영 박사 - 분석심리학 처방</h2>
          <p><strong>반복 상징:</strong> {lee?.repeatSymbols}</p>
          <p><strong>그림자 메시지:</strong> {lee?.shadowMessage}</p>
          <p><strong>꿈의 흐름:</strong> {lee?.dreamFlow}</p>
          <div style={style.printAlert}>
            <strong>심리 행동 처방:</strong> {lee?.prescription}
          </div>
          <p style={style.printClosing}>- {lee?.closing}</p>
        </div>

        <div style={style.printSection}>
          <h2>[2] {secondCharacter.name} - {isForetelling ? "민속 해몽 예지 신점 처방" : "명리 사주 처방"}</h2>
          <p><strong>꿈 분류:</strong> {secondReport?.dreamType}</p>
          <p><strong>{isForetelling ? "징조 풀이:" : "오행 흐름:"}</strong> {secondReport?.ohangFlow}</p>
          <p><strong>{isForetelling ? "신변 연관:" : "월운 연관:"}</strong> {secondReport?.monthlyYun}</p>
          <div style={style.printAlert}>
            <strong>{isForetelling ? "향후 2주 예언:" : "향후 2주 예지:"}</strong> {secondReport?.prediction}
          </div>
          <p><strong>조심할 점:</strong> {secondReport?.caution}</p>
          <p><strong>{isForetelling ? "취할 비방:" : "취할 길운:"}</strong> {secondReport?.luck}</p>
          <p style={style.printClosing}>- {secondReport?.closing}</p>
        </div>

        <div style={style.printDivider}></div>
        <p style={{ textAlign: "center", fontSize: "10px", color: "#666" }}>몽해원(夢解院) - 마음과 사주의 합치</p>
      </div>

      {/* Add CSS for print-specific visibility directly in component */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          body, html, #root { background: #fff !important; color: #000 !important; overflow: visible !important; height: auto !important; }
        }
        @media screen {
          .print-only { display: none !important; }
        }
      `}</style>
    </div>
  );
}

function Section({ label, text, color }) {
  return (
    <div style={style.section}>
      <div style={{ ...style.sectionLabel, color: color || "var(--text-muted)" }}>{label}</div>
      <p style={style.sectionText}>{text}</p>
    </div>
  );
}

const style = {
  wrapper: {
    minHeight: "100vh",
    padding: "32px 16px",
  },
  container: {
    maxWidth: "540px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    animation: "slideInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
  },
  navBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backBtn: {
    background: "none",
    color: "var(--text-muted)",
    fontSize: "13px",
    fontWeight: "500",
    padding: "8px 0",
  },
  printBtn: {
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid var(--border-color)",
    color: "var(--text-main)",
    fontSize: "12px",
    fontWeight: "600",
    padding: "8px 16px",
    borderRadius: "20px",
  },
  reportHeader: {
    textAlign: "center",
    padding: "16px 0",
  },
  lunarOrnament: {
    fontSize: "24px",
    color: "#c7b3e2",
    marginBottom: "8px",
    animation: "float 6s ease-in-out infinite",
  },
  reportTitle: {
    fontFamily: "var(--font-sans)",
    fontSize: "24px",
    color: "var(--text-bright)",
    fontWeight: "700",
    letterSpacing: "1px",
    marginBottom: "6px",
  },
  subtitle: {
    color: "var(--text-muted)",
    fontSize: "12px",
    letterSpacing: "0.5px",
  },
  card: {
    borderRadius: "20px",
    padding: "28px 24px",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "24px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
    paddingBottom: "16px",
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    color: "#fff",
    flexShrink: 0,
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  },
  expertName: {
    color: "var(--text-bright)",
    fontWeight: "700",
    fontSize: "16px",
  },
  prescriptionTitle: {
    color: "var(--text-muted)",
    fontSize: "11px",
    marginTop: "2px",
    letterSpacing: "0.5px",
  },
  cardBody: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  sectionLabel: {
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
  },
  sectionText: {
    color: "var(--text-main)",
    fontSize: "14px",
    lineHeight: "1.75",
  },
  prescriptionBlockLee: {
    backgroundColor: "var(--color-lee-bubble)",
    border: "1px solid rgba(90, 122, 94, 0.25)",
    borderRadius: "14px",
    padding: "16px 20px",
    marginTop: "8px",
  },
  blockLabelLee: {
    color: "#9FCC9F",
    fontSize: "11px",
    fontWeight: "700",
    marginBottom: "6px",
    letterSpacing: "0.5px",
  },
  blockTextLee: {
    color: "#e2ede4",
    fontSize: "15px",
    fontWeight: "600",
    lineHeight: "1.7",
  },
  closingLee: {
    color: "var(--text-muted)",
    fontSize: "13px",
    fontStyle: "italic",
    textAlign: "right",
    marginTop: "8px",
  },
  prescriptionBlockCheong: {
    backgroundColor: "var(--color-cheong-bubble)",
    border: "1px solid rgba(116, 95, 172, 0.25)",
    borderRadius: "14px",
    padding: "16px 20px",
    marginTop: "8px",
  },
  blockLabelCheong: {
    color: "#b8a0d8",
    fontSize: "11px",
    fontWeight: "700",
    marginBottom: "6px",
    letterSpacing: "0.5px",
  },
  blockTextCheong: {
    color: "#edeaf5",
    fontSize: "15px",
    fontWeight: "600",
    lineHeight: "1.7",
  },
  gridRow: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    borderTop: "1px solid rgba(255,255,255,0.03)",
    paddingTop: "18px",
  },
  closingCheong: {
    color: "var(--text-muted)",
    fontSize: "13px",
    fontStyle: "italic",
    textAlign: "right",
    marginTop: "8px",
  },
  historyCard: {
    borderRadius: "20px",
    padding: "24px",
    marginBottom: "24px",
  },
  historyTitle: {
    fontSize: "12px",
    fontWeight: "700",
    color: "var(--text-muted)",
    letterSpacing: "1.2px",
    textTransform: "uppercase",
    marginBottom: "20px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
    paddingBottom: "10px",
  },
  timeline: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  timelineItem: {
    display: "flex",
    gap: "14px",
    alignItems: "flex-start",
  },
  timelineBadge: {
    width: "22px",
    height: "22px",
    borderRadius: "50%",
    backgroundColor: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "var(--text-muted)",
    fontSize: "11px",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: "2px",
  },
  timelineContent: {
    flex: 1,
  },
  timelineMeta: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "4px",
  },
  timelineDate: {
    fontSize: "11px",
    color: "var(--text-muted)",
    fontWeight: "600",
  },
  timelineText: {
    color: "var(--text-main)",
    fontSize: "13px",
    lineHeight: "1.6",
  },
  
  // Print container
  printContainer: {
    fontFamily: "sans-serif",
    lineHeight: "1.6",
    color: "#000",
    padding: "40px",
  },
  printMainTitle: {
    fontSize: "28px",
    fontWeight: "bold",
    textAlign: "center",
    margin: "0 0 10px 0",
  },
  printMeta: {
    fontSize: "12px",
    textAlign: "center",
    color: "#555",
    margin: "0 0 20px 0",
  },
  printDivider: {
    height: "2px",
    borderTop: "2px solid #000",
    borderBottom: "1px solid #000",
    margin: "20px 0",
  },
  printSection: {
    margin: "24px 0",
    pageBreakInside: "avoid",
  },
  printAlert: {
    border: "1px solid #333",
    padding: "12px",
    margin: "12px 0",
    backgroundColor: "#f9f9f9",
    fontWeight: "500",
  },
  printClosing: {
    fontStyle: "italic",
    textAlign: "right",
    margin: "10px 0 0 0",
  },
};
