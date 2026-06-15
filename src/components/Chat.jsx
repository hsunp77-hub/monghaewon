import React, { useState, useEffect, useRef } from "react";

const CHARACTERS = {
  lee: { id: "lee", name: "이선영", title: "심리학 박사", avatar: "🌿", color: "#5A7A5E", bubble: "var(--color-lee-bubble)", border: "rgba(90, 122, 94, 0.25)", textColor: "var(--color-lee-text)" },
  cheong: { id: "cheong", name: "청명 선생", title: "명리학자", avatar: "☽", color: "#745fac", bubble: "var(--color-cheong-bubble)", border: "rgba(116, 95, 172, 0.3)", textColor: "var(--color-cheong-text)" },
  halmae: { id: "halmae", name: "몽화", title: "신점 무속인", avatar: "🕯️", color: "#c0392b", bubble: "var(--color-halmae-bubble)", border: "rgba(192, 57, 43, 0.25)", textColor: "var(--color-halmae-text)" },
};

export default function Chat({
  profile,
  dreams,
  chatMessages,
  chatPhase,
  currentDreamText,
  setCurrentDreamText,
  input,
  setInput,
  loading,
  onDreamInput,
  onUserReply,
  onStartNewDream,
  onGenerateReport,
  onReset,
  onOpenSettings,
  unlocked,
  onUnlock,
  realLifeContext,
  setRealLifeContext,
  dreamDate,
  setDreamDate,
  reports = [],
  onViewReport,
  onOpenDict,
}) {
  const chatEndRef = useRef(null);
  const [activeSubTab, setActiveSubTab] = useState("chat"); // "chat" | "diary"
  const [selectedDream, setSelectedDream] = useState(null);
  const [diaryDetailTab, setDiaryDetailTab] = useState("lee"); // "lee" | "cheong" | "foretell"

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, loading]);

  const handleDreamKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onDreamInput();
    }
  };

  const handleReplyKeyDown = (e) => {
    if (e.key === "Enter") {
      onUserReply();
    }
  };

  const currentLoadingAvatar = CHARACTERS[chatPhase]?.avatar || CHARACTERS.cheong.avatar;
  const currentLoadingColor = CHARACTERS[chatPhase]?.color || CHARACTERS.cheong.color;

  return (
    <div style={style.container}>
      {/* Header */}
      <header style={style.header} className="glass-panel chat-header">
        <div style={style.headerInner} className="chat-header-inner">
          <div style={style.logoGroup} className="logo-group">
            <span style={style.logo} className="glow-text-primary">☽ 몽해원</span>
            <span style={style.pill}>꿈 {dreams.length}회</span>
          </div>
 
          {/* Tab Switcher */}
          <div style={style.tabSwitcher} className="tab-switcher">
            <button 
              style={{
                ...style.tabSelectorBtn,
                color: activeSubTab === "chat" ? "#fff" : "var(--text-muted)",
                backgroundColor: activeSubTab === "chat" ? "rgba(142, 110, 230, 0.15)" : "transparent",
                borderColor: activeSubTab === "chat" ? "#8e6ee6" : "transparent"
              }}
              onClick={() => setActiveSubTab("chat")}
            >
              🔮 실시간 해몽
            </button>
            <button 
              style={{
                ...style.tabSelectorBtn,
                color: activeSubTab === "diary" ? "#fff" : "var(--text-muted)",
                backgroundColor: activeSubTab === "diary" ? "rgba(142, 110, 230, 0.15)" : "transparent",
                borderColor: activeSubTab === "diary" ? "#8e6ee6" : "transparent"
              }}
              onClick={() => setActiveSubTab("diary")}
            >
              📖 나의 꿈 일기장
            </button>
          </div>
 
          <div style={style.actionsGroup} className="actions-group">
            {dreams.length >= 3 && (
              <button style={style.reportHeaderBtn} onClick={onGenerateReport} disabled={loading}>
                처방전 ✦
              </button>
            )}
            <button style={style.headerDictBtn} className="glass-panel no-print header-dict-btn" onClick={onOpenDict} title="해몽 사전">
              🔮 <span className="dict-btn-text">해몽 사전</span>
            </button>
            <button style={style.settingsBtn} className="glass-panel" onClick={onOpenSettings}>
              ⚙️
            </button>
            <button style={style.resetBtn} onClick={onReset}>초기화</button>
          </div>
        </div>
      </header>

      {activeSubTab === "chat" ? (
        <>
          {/* Message Area */}
          <div style={style.chatArea} className="chat-area">
            <div style={style.messagesContainer}>
              {chatPhase !== "input" && chatMessages.map((msg, i) => {
                if (msg.role === "system-info") {
                  return (
                    <div key={i} style={style.sysInfo} className="message-animate">
                      <span style={style.sysInfoText}>{msg.text}</span>
                    </div>
                  );
                }

                if (msg.role === "user") {
                  return (
                    <div key={i} style={style.userWrap} className="message-animate user-wrap">
                      <div style={style.userBubble}>
                        {msg.text}
                      </div>
                    </div>
                  );
                }

                const ch = CHARACTERS[msg.role];
                if (!ch) return null;

                return (
                  <div key={i} style={style.charRow} className="message-animate char-row">
                    <div style={{ ...style.avatar, background: ch.color }}>{ch.avatar}</div>
                    <div style={style.charContent}>
                      <div style={{ ...style.charLabel, color: ch.color }}>
                        {ch.name} <span style={style.charTitle}>{ch.title}</span>
                      </div>
                      <div 
                        style={{ 
                          ...style.charBubble, 
                          background: ch.bubble, 
                          color: ch.textColor,
                          borderColor: ch.border
                        }}
                      >
                        {msg.text}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Typing Loading Indicator */}
              {loading && (
                <div style={style.charRow} className="message-animate">
                  <div style={{ ...style.avatar, background: currentLoadingColor }}>{currentLoadingAvatar}</div>
                  <div style={style.charContent}>
                    <div style={{ ...style.charLabel, color: currentLoadingColor }}>
                      {CHARACTERS[chatPhase]?.name || "분석가"} 
                      <span style={style.charTitle}>
                        분석 중...
                      </span>
                    </div>
                    <div style={{ ...style.charBubble, background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.05)" }}>
                      <span className="dots" style={style.dots}>
                        <span>.</span><span>.</span><span>.</span>
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Initial Dream Input (nested inside scrollable container) */}
              {chatPhase === "input" && (
                <div style={style.dreamInputCard} className="message-animate dream-input-card">
                  {/* Greeting Text as Title */}
                  <div style={style.cardGreeting}>
                    {chatMessages[0]?.text || "오늘 꾸신 꿈을 들려주세요."}
                  </div>

                  <div style={style.inputGroup}>
                    <label style={style.inputLabel}>📅 꿈꾼 날짜</label>
                    <input
                      type="date"
                      style={style.inputFieldPlain}
                      value={dreamDate}
                      onChange={e => setDreamDate(e.target.value)}
                    />
                  </div>

                  <div style={style.inputGroup}>
                    <label style={style.inputLabel}>💭 꿈의 상세 내용</label>
                    <textarea
                      style={style.textareaLarge}
                      placeholder={`${profile.name}님, 오늘 꾸신 꿈의 주요 장면이나 감정을 자세히 들려주세요...`}
                      value={currentDreamText}
                      onChange={e => setCurrentDreamText(e.target.value)}
                      rows={3}
                    />
                   </div>

                  <button 
                    style={{
                      ...style.submitDreamBtn,
                      opacity: (!currentDreamText.trim() || loading) ? 0.6 : 1
                    }} 
                    onClick={onDreamInput} 
                    disabled={loading || !currentDreamText.trim()}
                  >
                    해석 시작하기 ✦
                  </button>
                </div>
              )}
              
              <div ref={chatEndRef} />
            </div>
          </div>

          {/* Input / Controls Area */}
          {chatPhase !== "input" && (
            <footer style={style.inputArea} className="glass-panel chat-footer">
              {/* Clarifying Question Reply */}
              {(chatPhase === "lee" || chatPhase === "cheong" || chatPhase === "halmae") && !loading && (
                <div style={style.inputRow}>
                  <input
                    style={style.inputField}
                    placeholder="질문에 대한 답이나 추가 정보를 입력하세요..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleReplyKeyDown}
                    disabled={loading}
                  />
                  <button 
                    style={{
                      ...style.sendBtn,
                      opacity: (!input.trim() || loading) ? 0.5 : 1
                    }} 
                    onClick={onUserReply} 
                    disabled={loading || !input.trim()}
                  >
                    ➔
                  </button>
                </div>
              )}

              {/* First Analysis Done: Choose Other Perspectives to Unlock */}
              {chatPhase === "first-done" && (
                <div style={style.unlockContainer} className="message-animate">
                  <div style={style.unlockHeader}>
                    <span style={{ fontSize: "14px" }}>🔮</span>
                    <p style={style.unlockLabel}>다른 관점의 해석도 추가로 확인해 보시겠습니까?</p>
                  </div>
                  
                  <div style={style.unlockBtnRow} className="unlock-btn-row">
                    {!unlocked.psychology && (
                      <button style={{ ...style.unlockBtn, borderColor: "#5A7A5E", color: "#e2ede4" }} className="unlock-btn" onClick={() => onUnlock("psychology")} disabled={loading}>
                        🌿 이선영 박사의 심리 분석 받기
                      </button>
                    )}
                    {!unlocked.saju && (
                      <button style={{ ...style.unlockBtn, borderColor: "#745fac", color: "#edeaf5" }} className="unlock-btn" onClick={() => onUnlock("saju")} disabled={loading}>
                        ☽ 청명 선생의 사주 분석 받기
                      </button>
                    )}
                    {!unlocked.foretelling && (
                      <button style={{ ...style.unlockBtn, borderColor: "#c0392b", color: "#fcdbd9" }} className="unlock-btn" onClick={() => onUnlock("foretelling")} disabled={loading}>
                        🕯️ 몽화의 예지몽 신점 받기
                      </button>
                    )}
                  </div>

                  <div style={style.divider}></div>

                  <div style={style.doneActionsRow} className="done-actions-row">
                    <button style={style.newDreamBtn} className="new-dream-btn" onClick={onStartNewDream} disabled={loading}>
                      ✦ 새로운 꿈 기록하기
                    </button>
                    {dreams.length >= 3 ? (
                      <button style={style.reportBtnLg} className="report-btn-lg" onClick={onGenerateReport} disabled={loading}>
                        👑 처방전 리포트 보기
                      </button>
                    ) : (
                      <div style={style.progressHint}>
                        리포트를 받으려면 꿈을 <strong>{3 - dreams.length}개</strong> 더 기록해야 합니다. ({dreams.length}/3)
                      </div>
                    )}
                  </div>
                </div>
              )}
            </footer>
          )}
        </>
      ) : (
        /* Dream Diary Tab Content */
        <div style={style.diaryArea}>
          <div style={style.diaryContainer}>
            <h2 style={style.diaryTitle}>📖 나의 꿈 기록첩</h2>
            <p style={style.diarySubtitle}>밤사이 무의식이 그린 흔적들을 정갈하게 모아둔 일기장입니다.</p>

            {reports && reports.length > 0 && (
              <div style={style.reportsListSection} className="message-animate">
                <h3 style={style.reportsSectionTitle}>👑 발행된 꿈 처방전 목록 ({reports.length}개)</h3>
                <div style={style.reportsGrid}>
                  {reports.map((rep) => {
                    const isForetell = profile.analysisFocus === "foretelling";
                    const partnerName = isForetell ? "무속인 몽화" : "청명 선생";
                    return (
                      <div key={rep.id} style={{ ...style.archivedReportCard, marginBottom: 0 }} className="glass-panel hover-card">
                        <div style={style.archivedReportInfo}>
                          <span style={{ fontSize: "20px" }}>📜</span>
                          <div>
                            <div style={style.archivedReportTitle}>종합 처방전 ({rep.date})</div>
                            <div style={style.archivedReportDesc}>
                              이선영 박사와 {partnerName}의 꿈 {rep.dreamsCount}개 분석 처방 리포트입니다.
                            </div>
                          </div>
                        </div>
                        <button style={style.archivedReportBtn} onClick={() => onViewReport(rep)}>
                          처방전 보기 ➔
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
            {dreams.length === 0 ? (
              <div style={style.emptyDiary} className="glass-panel message-animate">
                <span style={{ fontSize: "48px", marginBottom: "16px", display: "block" }}>🖋️</span>
                <div style={style.emptyText}>기록된 꿈 일기가 없습니다.</div>
                <div style={style.emptySubtext}>'실시간 해몽' 탭에서 오늘의 첫 꿈 일기를 적어보세요.</div>
                <button style={style.goToChatBtn} onClick={() => setActiveSubTab("chat")}>첫 꿈 기록하기 ➔</button>
              </div>
            ) : (
              <div style={style.diaryGrid}>
                {dreams.map((dream, index) => (
                  <div 
                    key={index} 
                    style={style.diaryCard} 
                    className="glass-panel hover-card message-animate"
                    onClick={() => {
                      setSelectedDream(dream);
                      if (dream.leeText) setDiaryDetailTab("lee");
                      else if (dream.cheongText) setDiaryDetailTab("cheong");
                      else setDiaryDetailTab("foretell");
                    }}
                  >
                    <div style={style.diaryCardHeader}>
                      <span style={style.diaryCardDate}>✦ {dream.date}</span>
                      <span style={style.diaryCardIndex}>#{index + 1}번째 일기</span>
                    </div>
                    <p style={style.diaryCardContent}>
                      {dream.content}
                    </p>
                    
                    <div style={style.diaryBadges}>
                      {dream.leeText && <span style={style.diaryBadgeLee}>🌿 심리</span>}
                      {dream.cheongText && <span style={style.diaryBadgeCheong}>☽ 사주</span>}
                      {dream.foretellText && <span style={style.diaryBadgeForetell}>🕯️ 신점</span>}
                    </div>
                    <div style={style.diaryCardFooter}>
                      <span>상세 해몽 읽기 ➔</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Selected Dream Journal Modal */}
      {selectedDream && (
        <div style={style.modalOverlay} onClick={() => setSelectedDream(null)}>
          <div style={style.journalModal} className="glass-panel" onClick={(e) => e.stopPropagation()}>
            <div style={style.journalHeader}>
              <div>
                <span style={style.journalDate}>✦ {selectedDream.date}의 꿈 일기</span>
                <h4 style={style.journalTitle}>꿈의 기록 및 다각도 해몽</h4>
              </div>
              <button style={style.journalCloseBtn} onClick={() => setSelectedDream(null)}>&times;</button>
            </div>
            
            <div style={style.journalBody}>
              {/* Dream Content Box */}
              <div style={style.journalDreamBox}>
                <div style={style.journalBoxLabel}>📝 내가 기록한 내용</div>
                <p style={style.journalDreamText}>"{selectedDream.content}"</p>
              </div>
              
              {/* Analysis Tabs */}
              <div style={style.journalTabs}>
                {selectedDream.leeText && (
                  <button 
                    style={{
                      ...style.journalTabBtn,
                      color: diaryDetailTab === "lee" ? "#e2ede4" : "var(--text-muted)",
                      backgroundColor: diaryDetailTab === "lee" ? "rgba(90, 122, 94, 0.15)" : "transparent",
                      borderColor: diaryDetailTab === "lee" ? "#5A7A5E" : "rgba(255,255,255,0.05)"
                    }}
                    onClick={() => setDiaryDetailTab("lee")}
                  >
                    🌿 이선영 박사 (심리)
                  </button>
                )}
                {selectedDream.cheongText && (
                  <button 
                    style={{
                      ...style.journalTabBtn,
                      color: diaryDetailTab === "cheong" ? "#edeaf5" : "var(--text-muted)",
                      backgroundColor: diaryDetailTab === "cheong" ? "rgba(116, 95, 172, 0.15)" : "transparent",
                      borderColor: diaryDetailTab === "cheong" ? "#745fac" : "rgba(255,255,255,0.05)"
                    }}
                    onClick={() => setDiaryDetailTab("cheong")}
                  >
                    ☽ 청명 선생 (사주)
                  </button>
                )}
                {selectedDream.foretellText && (
                  <button 
                    style={{
                      ...style.journalTabBtn,
                      color: diaryDetailTab === "foretell" ? "#fcdbd9" : "var(--text-muted)",
                      backgroundColor: diaryDetailTab === "foretell" ? "rgba(192, 57, 43, 0.15)" : "transparent",
                      borderColor: diaryDetailTab === "foretell" ? "#c0392b" : "rgba(255,255,255,0.05)"
                    }}
                    onClick={() => setDiaryDetailTab("foretell")}
                  >
                    🕯️ 몽화 (신점)
                  </button>
                )}
              </div>

              {/* Analysis Content */}
              <div style={style.journalContent}>
                {diaryDetailTab === "lee" && selectedDream.leeText && (
                  <div style={style.journalAnalysisBlockLee} className="message-animate">
                    <div style={style.journalAnalysisLabel}>🌿 융 분석심리학적 해석</div>
                    <div style={style.journalAnalysisText}>{selectedDream.leeText}</div>
                  </div>
                )}
                {diaryDetailTab === "cheong" && selectedDream.cheongText && (
                  <div style={style.journalAnalysisBlockCheong} className="message-animate">
                    <div style={style.journalAnalysisLabel}>☽ 동양 명리 / 오행 해석</div>
                    <div style={style.journalAnalysisText}>{selectedDream.cheongText}</div>
                  </div>
                )}
                {diaryDetailTab === "foretell" && selectedDream.foretellText && (
                  <div style={style.journalAnalysisBlockForetell} className="message-animate">
                    <div style={style.journalAnalysisLabel}>🕯️ 몽화의 신점 및 예지몽 풀이</div>
                    <div style={style.journalAnalysisText}>{selectedDream.foretellText}</div>
                  </div>
                )}
              </div>
            </div>
            
            <div style={style.journalFooter}>
              <button style={style.journalCloseBottomBtn} onClick={() => setSelectedDream(null)}>닫기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const style = {
  archivedReportCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 20px",
    borderRadius: "16px",
    background: "linear-gradient(135deg, rgba(142, 110, 230, 0.08), rgba(80, 53, 128, 0.12))",
    border: "1px solid rgba(142, 110, 230, 0.2)",
    marginBottom: "24px",
    gap: "16px",
    flexWrap: "wrap",
    width: "100%",
  },
  archivedReportInfo: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    flex: 1,
    minWidth: "200px",
  },
  archivedReportTitle: {
    fontWeight: "700",
    fontSize: "14px",
    color: "#fff",
    marginBottom: "2px",
    textAlign: "left",
  },
  archivedReportDesc: {
    fontSize: "11px",
    color: "var(--text-muted)",
    textAlign: "left",
  },
  archivedReportBtn: {
    background: "linear-gradient(135deg, #745fac, #503580)",
    color: "#fff",
    borderRadius: "20px",
    padding: "8px 16px",
    fontSize: "12px",
    fontWeight: "700",
    boxShadow: "0 4px 10px rgba(116,95,172,0.3)",
    cursor: "pointer",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    width: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    overflow: "hidden",
  },
  header: {
    position: "relative",
    padding: "16px 20px",
    zIndex: 10,
    borderBottom: "1px solid var(--border-color)",
  },
  headerInner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "800px",
    margin: "0 auto",
    width: "100%",
  },
  logoGroup: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  logo: {
    fontFamily: "var(--font-sans)",
    fontSize: "18px",
    fontWeight: "700",
    color: "#fff",
    letterSpacing: "1.5px",
  },
  pill: {
    background: "rgba(142, 110, 230, 0.15)",
    color: "#e2d0ff",
    fontSize: "11px",
    fontWeight: "600",
    padding: "3px 10px",
    borderRadius: "20px",
    border: "1px solid rgba(142, 110, 230, 0.25)",
  },
  actionsGroup: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },
  reportHeaderBtn: {
    background: "linear-gradient(135deg, #745fac, #503580)",
    color: "#fff",
    border: "none",
    borderRadius: "20px",
    padding: "6px 14px",
    fontSize: "12px",
    cursor: "pointer",
    fontWeight: "600",
    boxShadow: "0 4px 10px rgba(116,95,172,0.3)",
  },
  headerDictBtn: {
    background: "rgba(142, 110, 230, 0.12)",
    border: "1px solid rgba(142, 110, 230, 0.25)",
    color: "#e2d0ff",
    borderRadius: "20px",
    padding: "6px 12px",
    fontSize: "11px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  settingsBtn: {
    background: "none",
    border: "1px solid var(--border-color)",
    color: "var(--text-main)",
    borderRadius: "50%",
    width: "32px",
    height: "32px",
    fontSize: "13px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  resetBtn: {
    background: "none",
    border: "1px solid rgba(255,255,255,0.06)",
    color: "var(--text-muted)",
    borderRadius: "20px",
    padding: "6px 12px",
    fontSize: "11px",
    fontWeight: "500",
    cursor: "pointer",
  },
  chatArea: {
    flex: 1,
    overflowY: "auto",
    padding: "24px 16px",
    position: "relative",
    WebkitOverflowScrolling: "touch",
  },
  messagesContainer: {
    maxWidth: "720px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    width: "100%",
  },
  sysInfo: {
    alignSelf: "center",
    margin: "8px 0",
  },
  sysInfoText: {
    background: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    color: "var(--text-muted)",
    fontSize: "11px",
    fontWeight: "500",
    padding: "4px 14px",
    borderRadius: "20px",
    letterSpacing: "0.5px",
  },
  userWrap: {
    alignSelf: "flex-end",
    maxWidth: "80%",
    display: "flex",
    justifyContent: "flex-end",
  },
  userBubble: {
    background: "linear-gradient(135deg, #1f3552, #18283d)",
    border: "1px solid rgba(43, 73, 112, 0.4)",
    color: "var(--color-user-text)",
    padding: "12px 18px",
    borderRadius: "20px 4px 20px 20px",
    fontSize: "14px",
    lineHeight: "1.65",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.15)",
  },
  charRow: {
    alignSelf: "flex-start",
    maxWidth: "85%",
    display: "flex",
    gap: "12px",
    alignItems: "flex-start",
  },
  avatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    color: "#fff",
    flexShrink: 0,
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  },
  charContent: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  charLabel: {
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "0.5px",
  },
  charTitle: {
    fontSize: "10px",
    fontWeight: "400",
    color: "var(--text-muted)",
    marginLeft: "6px",
  },
  charBubble: {
    border: "1px solid",
    padding: "14px 18px",
    borderRadius: "4px 20px 20px 20px",
    fontSize: "14px",
    lineHeight: "1.7",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.15)",
    whiteSpace: "pre-wrap",
  },
  dots: {
    display: "inline-flex",
    gap: "4px",
    fontSize: "16px",
    color: "var(--text-muted)",
  },
  inputArea: {
    padding: "16px 20px",
    borderTop: "1px solid var(--border-color)",
    zIndex: 10,
  },
  inputRow: {
    maxWidth: "720px",
    margin: "0 auto",
    display: "flex",
    gap: "12px",
    alignItems: "flex-end",
    width: "100%",
  },
  textarea: {
    flex: 1,
    resize: "none",
    lineHeight: "1.5",
    height: "50px",
  },
  inputField: {
    flex: 1,
    height: "48px",
    borderRadius: "24px",
    padding: "0 20px",
  },
  sendBtn: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #745fac, #503580)",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 12px rgba(116,95,172,0.3)",
  },
  unlockContainer: {
    maxWidth: "720px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    width: "100%",
  },
  unlockHeader: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    justifyContent: "center",
  },
  unlockLabel: {
    fontSize: "13px",
    fontWeight: "600",
    color: "var(--text-main)",
  },
  unlockBtnRow: {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  unlockBtn: {
    flex: "1 1 200px",
    maxWidth: "280px",
    background: "rgba(255, 255, 255, 0.02)",
    border: "1px solid",
    borderRadius: "14px",
    padding: "12px 14px",
    fontSize: "12px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.25s ease",
  },
  divider: {
    height: "1px",
    backgroundColor: "rgba(255,255,255,0.04)",
    margin: "6px 0",
  },
  doneActionsRow: {
    display: "flex",
    gap: "12px",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  newDreamBtn: {
    flex: "1 1 180px",
    maxWidth: "240px",
    background: "rgba(255, 255, 255, 0.03)",
    border: "1px solid var(--border-color)",
    color: "var(--text-muted)",
    borderRadius: "24px",
    padding: "12px",
    fontSize: "13px",
    fontWeight: "600",
    textAlign: "center",
  },
  reportBtnLg: {
    flex: "1 1 180px",
    maxWidth: "240px",
    background: "linear-gradient(135deg, #745fac, #503580)",
    color: "#fff",
    borderRadius: "24px",
    padding: "12px",
    fontSize: "13px",
    fontWeight: "700",
    textAlign: "center",
    boxShadow: "0 4px 15px rgba(116,95,172,0.4)",
  },
  progressHint: {
    flex: "1 1 180px",
    maxWidth: "240px",
    fontSize: "11px",
    color: "var(--text-muted)",
    textAlign: "center",
    padding: "10px",
    backgroundColor: "rgba(255,255,255,0.01)",
    borderRadius: "20px",
    border: "1px solid rgba(255,255,255,0.03)",
  },
  dreamInputCard: {
    maxWidth: "720px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    padding: "20px",
    borderRadius: "16px",
    backgroundColor: "rgba(10, 10, 20, 0.4)",
    border: "1px solid var(--border-color)",
    width: "100%",
  },
  cardGreeting: {
    fontSize: "13px",
    lineHeight: "1.6",
    color: "var(--text-main)",
    marginBottom: "4px",
    textAlign: "center",
    paddingBottom: "12px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
    fontWeight: "500",
  },
  inputLabel: {
    fontSize: "12px",
    fontWeight: "600",
    color: "var(--text-main)",
  },
  textareaLarge: {
    width: "100%",
    resize: "none",
    lineHeight: "1.6",
    minHeight: "80px",
    fontFamily: "var(--font-sans)",
  },
  inputFieldPlain: {
    width: "100%",
    height: "44px",
    borderRadius: "12px",
    padding: "0 14px",
    fontSize: "13px",
  },
  submitDreamBtn: {
    width: "100%",
    padding: "12px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #745fac, #503580)",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "700",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(116,95,172,0.3)",
    letterSpacing: "1px",
    cursor: "pointer",
  },
  tabSwitcher: {
    display: "flex",
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.05)",
    padding: "3px",
    borderRadius: "20px",
    margin: "0 10px",
  },
  tabSelectorBtn: {
    padding: "6px 14px",
    borderRadius: "18px",
    fontSize: "12px",
    fontWeight: "600",
    cursor: "pointer",
    border: "1px solid transparent",
    color: "var(--text-muted)",
    background: "transparent",
    transition: "all 0.2s ease",
  },
  diaryArea: {
    flex: 1,
    overflowY: "auto",
    padding: "24px 16px",
    position: "relative",
    WebkitOverflowScrolling: "touch",
  },
  diaryContainer: {
    maxWidth: "800px",
    margin: "0 auto",
    width: "100%",
  },
  diaryTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#fff",
    marginBottom: "6px",
    textAlign: "center",
    fontFamily: "var(--font-sans)",
  },
  diarySubtitle: {
    fontSize: "12px",
    color: "var(--text-muted)",
    textAlign: "center",
    marginBottom: "30px",
  },
  reportsListSection: {
    marginBottom: "28px",
    width: "100%",
  },
  reportsSectionTitle: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#fff",
    marginBottom: "12px",
    textAlign: "left",
    letterSpacing: "0.5px",
  },
  reportsGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    width: "100%",
  },
  emptyDiary: {
    textAlign: "center",
    padding: "60px 20px",
    backgroundColor: "rgba(255,255,255,0.01)",
    border: "1px dashed rgba(255,255,255,0.06)",
    borderRadius: "20px",
    marginTop: "20px",
  },
  emptyText: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#fff",
    marginBottom: "6px",
  },
  emptySubtext: {
    fontSize: "12px",
    color: "var(--text-muted)",
    marginBottom: "20px",
  },
  goToChatBtn: {
    padding: "10px 20px",
    borderRadius: "20px",
    background: "linear-gradient(135deg, #745fac, #503580)",
    color: "#fff",
    border: "none",
    fontWeight: "600",
    fontSize: "12px",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(116,95,172,0.3)",
  },
  diaryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: "16px",
  },
  diaryCard: {
    padding: "18px",
    borderRadius: "18px",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "180px",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  diaryCardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },
  diaryCardDate: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#fff",
  },
  diaryCardIndex: {
    fontSize: "10px",
    color: "var(--text-muted)",
  },
  diaryCardContent: {
    fontSize: "12px",
    color: "var(--text-main)",
    lineHeight: "1.6",
    flexGrow: 1,
    marginBottom: "14px",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  diaryBadges: {
    display: "flex",
    gap: "6px",
    marginBottom: "12px",
  },
  diaryBadgeLee: {
    background: "rgba(90, 122, 94, 0.12)",
    color: "#a4c4ab",
    border: "1px solid rgba(90, 122, 94, 0.2)",
    fontSize: "10px",
    fontWeight: "600",
    padding: "2px 6px",
    borderRadius: "6px",
  },
  diaryBadgeCheong: {
    background: "rgba(116, 95, 172, 0.12)",
    color: "#c7b5eb",
    border: "1px solid rgba(116, 95, 172, 0.2)",
    fontSize: "10px",
    fontWeight: "600",
    padding: "2px 6px",
    borderRadius: "6px",
  },
  diaryBadgeForetell: {
    background: "rgba(192, 57, 43, 0.12)",
    color: "#fcdbd9",
    border: "1px solid rgba(192, 57, 43, 0.2)",
    fontSize: "10px",
    fontWeight: "600",
    padding: "2px 6px",
    borderRadius: "6px",
  },
  diaryCardFooter: {
    fontSize: "11px",
    fontWeight: "700",
    color: "var(--color-primary)",
    textAlign: "right",
  },
  modalOverlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(3, 3, 7, 0.75)",
    backdropFilter: "blur(4px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1200,
    animation: "fadeIn 0.2s ease-out",
  },
  journalModal: {
    width: "520px",
    maxWidth: "92%",
    maxHeight: "85vh",
    borderRadius: "24px",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
    border: "1px solid rgba(255,255,255,0.08)",
    animation: "fadeIn 0.25s ease-out",
    overflow: "hidden",
  },
  journalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    paddingBottom: "12px",
    flexShrink: 0,
  },
  journalDate: {
    fontSize: "11px",
    color: "var(--text-muted)",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  journalTitle: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#fff",
    marginTop: "2px",
  },
  journalCloseBtn: {
    background: "none",
    color: "var(--text-muted)",
    fontSize: "26px",
    border: "none",
    cursor: "pointer",
    padding: "4px",
  },
  journalBody: {
    flex: 1,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    paddingRight: "4px",
  },
  journalDreamBox: {
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.04)",
    borderRadius: "14px",
    padding: "14px 16px",
  },
  journalBoxLabel: {
    fontSize: "11px",
    fontWeight: "700",
    color: "var(--text-muted)",
    marginBottom: "6px",
  },
  journalDreamText: {
    fontSize: "13px",
    lineHeight: "1.6",
    color: "var(--text-main)",
    fontStyle: "italic",
  },
  journalTabs: {
    display: "flex",
    gap: "6px",
    flexShrink: 0,
  },
  journalTabBtn: {
    flex: 1,
    padding: "8px 10px",
    borderRadius: "10px",
    border: "1px solid",
    fontSize: "11px",
    fontWeight: "700",
    cursor: "pointer",
    textAlign: "center",
    transition: "all 0.2s ease",
  },
  journalContent: {
    flex: 1,
  },
  journalAnalysisBlockLee: {
    background: "rgba(90, 122, 94, 0.04)",
    border: "1px solid rgba(90, 122, 94, 0.15)",
    borderRadius: "14px",
    padding: "16px",
  },
  journalAnalysisBlockCheong: {
    background: "rgba(116, 95, 172, 0.04)",
    border: "1px solid rgba(116, 95, 172, 0.15)",
    borderRadius: "14px",
    padding: "16px",
  },
  journalAnalysisBlockForetell: {
    background: "rgba(192, 57, 43, 0.04)",
    border: "1px solid rgba(192, 57, 43, 0.15)",
    borderRadius: "14px",
    padding: "16px",
  },
  journalAnalysisLabel: {
    fontSize: "12px",
    fontWeight: "700",
    marginBottom: "10px",
    color: "#fff",
  },
  journalAnalysisText: {
    fontSize: "13px",
    lineHeight: "1.75",
    color: "var(--text-main)",
    whiteSpace: "pre-wrap",
  },
  journalFooter: {
    marginTop: "16px",
    borderTop: "1px solid rgba(255,255,255,0.05)",
    paddingTop: "12px",
    display: "flex",
    justifyContent: "flex-end",
    flexShrink: 0,
  },
  journalCloseBottomBtn: {
    padding: "8px 16px",
    borderRadius: "10px",
    background: "rgba(255,255,255,0.05)",
    color: "#fff",
    border: "none",
    fontSize: "12px",
    fontWeight: "600",
    cursor: "pointer",
  },
};
