import React, { useState, useEffect } from "react";

export default function Settings({ isOpen, onClose, apiKey, onChangeApiKey, useMock, onToggleMock }) {
  const [serverHasKey, setServerHasKey] = useState(false);
  const [localKey, setLocalKey] = useState(apiKey || "");

  useEffect(() => {
    // Check if the backend has an API key configured
    fetch("/api/config")
      .then((res) => res.json())
      .then((data) => {
        if (data.hasApiKey) {
          setServerHasKey(true);
        }
      })
      .catch((err) => console.error("Failed to fetch server config", err));
  }, []);

  const handleSave = () => {
    onChangeApiKey(localKey);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={style.overlay}>
      <div style={style.modal} className="glass-panel">
        <div style={style.header}>
          <h3 style={style.title}>설정 (Settings)</h3>
          <button style={style.closeBtn} onClick={onClose}>&times;</button>
        </div>

        <div style={style.body}>
          {/* Server Config Info */}
          <div style={style.infoBox}>
            <span style={{ fontSize: 16 }}>🖥️</span>
            <div>
              <div style={style.infoTitle}>서버 API 키 상태</div>
              <div style={{ ...style.infoStatus, color: serverHasKey ? "#5A7A5E" : "#999" }}>
                {serverHasKey ? "● 활성화됨 (서버 측 환경변수 사용 중)" : "○ 구성되지 않음 (로컬 키 또는 Mock 모드 사용 필요)"}
              </div>
            </div>
          </div>

          {/* Local API Key Input */}
          <div style={style.field}>
            <label style={style.label}>개인 Gemini API Key</label>
            <input
              type="password"
              style={style.input}
              placeholder="AIzaSy..."
              value={localKey}
              onChange={(e) => setLocalKey(e.target.value)}
              disabled={serverHasKey || useMock}
            />
            <p style={style.helpText}>
              {serverHasKey 
                ? "서버에 전역 API 키가 설정되어 있어 개별 입력이 불필요합니다." 
                : "API 키는 브라우저 로컬 저장소에만 안전하게 저장되며, 백엔드 프록시를 통해서만 Gemini로 전달됩니다."}
            </p>
          </div>

          {/* Mock Mode Toggle */}
          <div style={style.toggleRow}>
            <div>
              <div style={style.toggleLabel}>데모 체험 (Mock Mode)</div>
              <div style={style.toggleDesc}>Gemini API 키 없이 시뮬레이션된 고품질 해석으로 앱을 바로 사용해 봅니다.</div>
            </div>
            <button 
              style={{
                ...style.toggleBtn,
                background: useMock ? "linear-gradient(135deg, #745fac, #503580)" : "#1c1c2e",
                borderColor: useMock ? "#8e6ee6" : "#333",
              }}
              onClick={() => onToggleMock(!useMock)}
            >
              {useMock ? "Mock 모드 사용 중" : "사용 안 함"}
            </button>
          </div>
        </div>

        <div style={style.footer}>
          {!serverHasKey && !useMock && !localKey.trim() && (
            <div style={style.warnMessage}>⚠️ API 키를 입력하거나 Mock 모드를 활성화해야 정상 작동합니다.</div>
          )}
          <button style={style.saveBtn} onClick={handleSave}>설정 저장</button>
        </div>
      </div>
    </div>
  );
}

const style = {
  overlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(3, 3, 7, 0.75)",
    backdropFilter: "blur(4px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    animation: "fadeIn 0.2s ease-out",
  },
  modal: {
    width: "420px",
    maxWidth: "90%",
    borderRadius: "20px",
    padding: "24px",
    border: "1px solid rgba(255, 255, 255, 0.08)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  title: {
    fontFamily: "var(--font-sans)",
    fontSize: "18px",
    color: "#fff",
    fontWeight: 600,
    letterSpacing: "0.5px",
  },
  closeBtn: {
    background: "none",
    color: "var(--text-muted)",
    fontSize: "24px",
    border: "none",
    cursor: "pointer",
    padding: "4px",
  },
  body: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  infoBox: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    padding: "12px 16px",
    backgroundColor: "rgba(255,255,255,0.02)",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.04)",
  },
  infoTitle: {
    fontSize: "12px",
    fontWeight: "700",
    color: "var(--text-muted)",
    marginBottom: "2px",
  },
  infoStatus: {
    fontSize: "13px",
    fontWeight: "500",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "var(--text-main)",
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
  },
  helpText: {
    fontSize: "11px",
    color: "var(--text-muted)",
    lineHeight: "1.4",
  },
  toggleRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "14px",
    borderTop: "1px solid rgba(255,255,255,0.05)",
    gap: "16px",
  },
  toggleLabel: {
    fontSize: "13px",
    fontWeight: "600",
    color: "var(--text-bright)",
    marginBottom: "4px",
  },
  toggleDesc: {
    fontSize: "11px",
    color: "var(--text-muted)",
    lineHeight: "1.4",
    maxWidth: "240px",
  },
  toggleBtn: {
    padding: "8px 14px",
    borderRadius: "10px",
    border: "1px solid",
    color: "#fff",
    fontSize: "12px",
    fontWeight: "600",
    cursor: "pointer",
    flexShrink: 0,
  },
  footer: {
    marginTop: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    alignItems: "stretch",
  },
  warnMessage: {
    fontSize: "12px",
    color: "#C0392B",
    textAlign: "center",
  },
  saveBtn: {
    padding: "12px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #745fac, #503580)",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "600",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(116, 95, 172, 0.2)",
  },
};
