import React, { useState } from "react";

const DICTIONARY_DATA = {
  dog: {
    title: "강아지 꿈 (개 꿈)",
    icon: "🐕",
    summary: "강아지는 대개 조력자, 친구, 재물, 혹은 충성스러운 아랫사람을 상징하며, 색상과 상황에 따라 길흉이 극명히 나뉩니다.",
    categories: [
      {
        name: "⚪⚫🟡 털 색상별 예지적 상징",
        items: [
          { name: "⚪ 흰 강아지 (백구)", desc: "새로운 귀인이나 마음이 잘 맞는 좋은 동반자를 만나 도움을 받을 길몽입니다. 태몽일 경우 온순하고 귀여운 아이를 가질 징조이기도 합니다." },
          { name: "⚫ 검은 강아지 (흑구)", desc: "집안에 우환이 들거나 건강 악화, 혹은 가까운 지인에게 배신을 당할 수 있는 강력한 경고몽입니다. 말실수나 대인 관계의 트러블을 극히 조심해야 합니다." },
          { name: "🟡 황구 (누런 개)", desc: "예로부터 누런 개는 재물과 풍요를 뜻합니다. 뜻밖의 횡재수나 금전적 안정, 혹은 평생을 함께할 든든한 조력자가 찾아올 조짐입니다." }
        ]
      },
      {
        name: "🩸🗣️🤝 꿈속 행동별 예지적 상징",
        items: [
          { name: "🩸 강아지에게 물리는 꿈", desc: "주변인 혹은 믿었던 친구나 부하직원에게 배신을 당해 정신적, 물질적 피해를 입을 수 있음을 암시합니다. 현재 진행 중인 투자나 계약을 면밀히 재검토하십시오." },
          { name: "🗣️ 강아지가 사납게 짖어대는 꿈", desc: "구설수나 말싸움에 억울하게 말려들어 명예가 실추될 수 있습니다. 당분간 주변 대인관계에서 언행을 조심하고 자제해야 합니다." },
          { name: "🤝 길 잃은 강아지를 데려오는 꿈", desc: "어려운 처지에 놓인 타인에게 은혜를 베풀게 되며, 훗날 이 선행이 본인의 삶에 큰 복(귀인의 도움)이 되어 되돌아올 길조입니다." },
          { name: "🎉 강아지와 끌어안고 즐겁게 노는 꿈", desc: "오랫동안 마음에 쌓여 있던 스트레스나 근심 걱정이 원만하게 해결되고 평화가 찾아옴을 뜻합니다." }
        ]
      }
    ]
  },
  snake: {
    title: "뱀 꿈",
    icon: "🐍",
    summary: "뱀은 동양 명리학과 해몽 모두에서 지혜, 권력, 재물, 태몽을 뜻하는 강력한 길조이면서도, 동시에 교활한 인물이나 건강상의 위험을 알리는 경고이기도 합니다.",
    categories: [
      {
        name: "⚪⚫🟢 색상 및 크기별 상징",
        items: [
          { name: "⚪ 백사 (흰 뱀)", desc: "최고의 대길몽으로 꼽힙니다. 엄청난 재물운이 따르거나, 진행 중인 혼담이 성사되고 학문적 성취, 사회적 지위가 급상승할 대단한 길조입니다." },
          { name: "⚫ 흑사 (검은 뱀)", desc: "자신을 시기하거나 해치려는 음흉한 인물이 주변에 잠입해 있음을 뜻합니다. 은밀한 사기나 음모를 경계하십시오." },
          { name: "🟢 푸른 뱀 (청사)", desc: "인기와 명예가 크게 오르는 훌륭한 길조이거나, 예술적 재능이 특출나고 총명한 아이를 얻게 될 태몽입니다." }
        ]
      },
      {
        name: "🩸🏠🏃 행동 및 상황별 상징",
        items: [
          { name: "🩸 뱀에게 온몸을 물려 피가 나는 꿈", desc: "재물운이 크게 트이거나, 영향력 있는 조력자를 만나 큰 부를 얻게 될 길몽입니다. 미혼자의 경우 좋은 배우자감이 들어오는 성혼의 전조입니다." },
          { name: "🏠 뱀이 집안으로 기어들어 오는 꿈", desc: "집안에 기쁜 경사가 생기고 재물과 사람이 함께 늘어납니다. 단, 뱀이 집 밖으로 유유히 나갔다면 재물이 새어 나갈 경고몽입니다." },
          { name: "🏃 뱀에게 쫓겨 혼비백산 도망치는 꿈", desc: "찾아온 절호의 기회나 계약을 아깝게 놓치거나, 타인과의 경쟁에서 밀려 마음에 큰 조바심을 겪을 수 있음을 알립니다." }
        ]
      }
    ]
  },
  water: {
    title: "물 꿈",
    icon: "💧",
    summary: "물은 인간의 깊은 무의식적 감정과 사주 명리의 재물(財) 기운을 나타내는 가장 보편적인 상징물입니다.",
    categories: [
      {
        name: "🌊💩🧊 물의 상태에 따른 해몽",
        items: [
          { name: "🌊 맑은 물이 집안에 꽉 차 넘치는 꿈", desc: "학업 합격, 사업 번창, 횡재수 등 가문 전체에 강력한 길운과 재산이 쏟아져 들어올 징조입니다." },
          { name: "💩 흐리고 탁한 흙탕물이 범람하는 꿈", desc: "정서적인 극심한 혼란이나 질병, 가내 분쟁 등 막힌 기운을 뜻합니다. 계획 중인 투자나 결정을 유보하는 것이 안전합니다." },
          { name: "🧊 온 사방이 꽁꽁 얼어붙은 빙판 꿈", desc: "진행 중인 계약이나 자금의 융통이 일시적으로 정체되어 차갑게 식어감을 뜻합니다. 무리하지 말고 때를 기다려야 합니다." }
        ]
      },
      {
        name: "🏊🪣 행동별 상징",
        items: [
          { name: "🏊 맑은 물속에서 자유롭게 수영하는 꿈", desc: "본인의 탁월한 재능이나 아이디어가 세간의 큰 인정을 받아 자아실현과 승진을 이루게 됩니다." },
          { name: "🪣 강물이나 샘물을 길어 통에 채우는 꿈", desc: "외부의 가치 있는 자금이나 정보를 집안에 성공적으로 누적시켜 유산이 차곡차곡 불어나게 될 길조입니다." }
        ]
      }
    ]
  },
  fire: {
    title: "불 꿈",
    icon: "🔥",
    summary: "불은 활활 타오르는 생명력과 강한 번창을 뜻합니다. 연기 없이 불꽃이 크게 솟구칠수록 엄청난 기운의 상승을 나타냅니다.",
    categories: [
      {
        name: "🔥💨 불길의 세기와 상황별 상징",
        items: [
          { name: "🏠 본인의 집이 흔적 없이 활활 타는 꿈", desc: "사업이 대번창하거나 부동산, 문서의 가치가 폭발적으로 급상승하여 명예와 부를 동시에 거머쥘 초대형 길몽입니다." },
          { name: "🧯 타오르는 불길을 인위적으로 꺼버리는 꿈", desc: "성공의 문턱에 다다른 좋은 기회나 계약을 본인의 감정 조절 실패 등으로 스스로 놓치게 됨을 강력히 경고합니다." },
          { name: "💨 불길은 없이 검은 연기만 자욱한 꿈", desc: "실속 없이 헛소문만 무성하거나, 대인 관계에서 오해를 사 모함을 당할 수 있는 답답한 정서적 예고입니다." }
        ]
      }
    ]
  },
  pig: {
    title: "돼지 꿈",
    icon: "🐖",
    summary: "돼지는 예로부터 명실상부한 최고의 재물과 복의 상징입니다. 사업 번창, 횡재수, 혹은 훌륭한 태몽을 뜻합니다.",
    categories: [
      {
        name: "⚪⚫🐷 색상 및 크기별 상징",
        items: [
          { name: "🐷 분홍색 황금 돼지", desc: "뜻밖의 거대한 횡재수나 복권 당첨, 혹은 큰 유산을 상징하는 대길조입니다." },
          { name: "⚫ 검은 돼지", desc: "실속 있고 묵직한 큰돈이나, 부동산 계약 성사 등의 탄탄한 금전 운을 뜻합니다." },
          { name: "🐆 아기 돼지 떼", desc: "작은 투자나 취미가 큰 수익으로 불어나거나, 집안에 경사가 겹치는 풍요의 예고입니다." }
        ]
      },
      {
        name: "🩸🏠🏃 행동 및 상황별 상징",
        items: [
          { name: "🏠 돼지가 집안이나 품으로 들어오는 꿈", desc: "엄청난 재물운이나 권력이 품에 들어올 징조입니다. 귀하고 복이 많은 아이를 얻는 태몽이기도 합니다." },
          { name: "🏃 돼지가 무서워 도망치거나 내쫓는 꿈", desc: "눈앞에 찾아온 일생일대의 기회나 재물을 본인의 실수로 날려 보낼 경고몽입니다." },
          { name: "🐖 돼지와 싸워 이기거나 붙잡는 꿈", desc: "강력한 경쟁자나 어려운 비즈니스 딜에서 마침내 큰 승리를 쟁취하여 이권을 독점하게 됩니다." }
        ]
      }
    ]
  },
  teeth: {
    title: "이빨 꿈",
    icon: "🦷",
    summary: "이빨 꿈은 대표적인 신체 변화 꿈으로, 동양에서는 주로 가족의 우환이나 신분 변화를 뜻하며 서양 심리학에서는 불안과 노화의 상징입니다.",
    categories: [
      {
        name: "🦷 빠지는 위치별 예지적 상징",
        items: [
          { name: "🦷 윗니가 빠지는 꿈", desc: "부모님, 조부모님, 상사 등 윗사람에게 건강 악화나 우환이 닥칠 수 있는 전통적 경고몽입니다." },
          { name: "🦷 아랫니가 빠지는 꿈", desc: "동생, 자식, 후배 등 아랫사람에게 어려움이나 이별이 생길 수 있으니 주변을 살피라는 신호입니다." },
          { name: "🦷 덧니나 앓던 이가 빠지는 꿈", desc: "오랜 기간 고민을 안겨주던 골칫거리나 장애물이 마침내 해소되어 마음의 평화를 찾을 길몽입니다." }
        ]
      },
      {
        name: "🩸🦷 상황별 대처 상징",
        items: [
          { name: "🩸 이빨이 빠진 자리에서 피가 멈추지 않는 꿈", desc: "예상치 못한 지출이나 재물 손실이 발생할 수 있으며, 가까운 대인 관계에서 에너지가 크게 소모될 징조입니다." },
          { name: "🦷 이빨 전체가 우수수 다 빠지는 꿈", desc: "조직의 개편, 이사, 이직 등 삶의 근간을 뒤흔드는 거대한 환경 변화가 닥쳐올 수 있음을 암시합니다." }
        ]
      }
    ]
  },
  fly: {
    title: "하늘을 나는 꿈 (비행 꿈)",
    icon: "🦅",
    summary: "비행 꿈은 억눌린 무의식의 해방과 자유를 상징하며, 동양학적으로는 큰 명예와 소원 성취를 예견합니다.",
    categories: [
      {
        name: "🦅 비행 고도 및 상태별 상징",
        items: [
          { name: "☁️ 구름 위로 쾌적하게 높이 나는 꿈", desc: "사회적 지위나 명예가 최고조에 달하며, 오랫동안 원하던 합격이나 승진을 이뤄낼 아주 훌륭한 길몽입니다." },
          { name: "🌲 지상에 가까이 낮게 비행하는 꿈", desc: "목표가 가깝게 다가왔으나 여전히 정서적 불안이나 장애물이 있음을 뜻합니다. 조금 더 용기를 내십시오." },
          { name: "🌪️ 날아가다 갑자기 추락하는 꿈", desc: "지나친 과신이나 방심으로 인해 다 된 밥에 재를 뿌릴 수 있는 경고몽입니다. 돌다리도 두드려 보고 건너십시오." }
        ]
      },
      {
        name: "🏃 탈것과의 관계",
        items: [
          { name: "✈️ 비행기를 타고 끝없이 날아가는 꿈", desc: "새로운 인생의 시작, 해외 진출, 혹은 본인의 영향력이 넓은 세계로 확장됨을 예지합니다." }
        ]
      }
    ]
  },
  ancestor: {
    title: "조상님 꿈 (돌아가신 분 꿈)",
    icon: "👵",
    summary: "돌아가신 조상님이나 지인은 영적 영감이나 삶의 이정표 역할을 합니다. 그분들의 표정과 분위기가 가장 결정적인 길흉의 단서입니다.",
    categories: [
      {
        name: "😊👵 표정 및 분위기별 상징",
        items: [
          { name: "😊 조상님이 밝고 온화하게 웃어주는 꿈", desc: "가문에 경사가 생기고 막혔던 재물과 건강이 회복될 대길조입니다. 큰 횡재수가 있을 수 있습니다." },
          { name: "😢 조상님이 슬프거나 화난 얼굴로 나타나는 꿈", desc: "집안에 액운이 들거나 현재 가려는 길에 중대한 오류가 있음을 알리는 조상님의 강력한 방어 경고몽입니다." },
          { name: "🍲 조상님께 음식을 정성껏 대접하는 꿈", desc: "오랜 노력의 결실을 맺어 가문의 명예를 높이고 뜻밖의 상속이나 권리를 승계받게 됩니다." }
        ]
      }
    ]
  }
};

export default function Dictionary({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  if (!isOpen) return null;

  // Search filter
  const filteredKeys = Object.keys(DICTIONARY_DATA).filter((key) => {
    const data = DICTIONARY_DATA[key];
    const matchesSearch = 
      data.title.includes(searchTerm) || 
      data.summary.includes(searchTerm) ||
      data.categories.some(cat => 
        cat.name.includes(searchTerm) || 
        cat.items.some(item => item.name.includes(searchTerm) || item.desc.includes(searchTerm))
      );
    
    if (activeTab === "all") return matchesSearch;
    return key === activeTab && matchesSearch;
  });

  return (
    <div style={style.overlay} onClick={onClose}>
      <div style={style.drawer} className="glass-panel" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div style={style.header}>
          <div style={style.headerTitleGroup}>
            <span style={{ fontSize: "20px" }}>🔮</span>
            <h3 style={style.title}>예지몽 상징 대사전</h3>
          </div>
          <button style={style.closeBtn} onClick={onClose}>&times;</button>
        </div>

        {/* Search Bar */}
        <div style={style.searchWrapper}>
          <input
            style={style.searchInput}
            placeholder="알고 싶은 꿈 상징을 검색해 보세요 (예: 강아지, 뱀, 불...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Tabs */}
        <div style={style.tabsRow}>
          <button 
            style={{ ...style.tabBtn, background: activeTab === "all" ? "rgba(142, 110, 230, 0.2)" : "rgba(255,255,255,0.02)", borderColor: activeTab === "all" ? "var(--color-primary)" : "rgba(255,255,255,0.05)" }}
            onClick={() => setActiveTab("all")}
          >
            전체
          </button>
          {Object.keys(DICTIONARY_DATA).map((key) => (
            <button
              key={key}
              style={{ 
                ...style.tabBtn, 
                background: activeTab === key ? "rgba(142, 110, 230, 0.2)" : "rgba(255,255,255,0.02)", 
                borderColor: activeTab === key ? "var(--color-primary)" : "rgba(255,255,255,0.05)" 
              }}
              onClick={() => setActiveTab(key)}
            >
              {DICTIONARY_DATA[key].icon} {DICTIONARY_DATA[key].title.split(" ")[0]}
            </button>
          ))}
        </div>

        {/* Content list */}
        <div style={style.contentArea}>
          {filteredKeys.length > 0 ? (
            filteredKeys.map((key) => {
              const data = DICTIONARY_DATA[key];
              return (
                <div key={key} style={style.symbolSection} className="glass-panel">
                  <div style={style.symbolHeader}>
                    <span style={style.symbolIcon}>{data.icon}</span>
                    <h4 style={style.symbolTitle}>{data.title}</h4>
                  </div>
                  <p style={style.symbolSummary}>{data.summary}</p>
                  
                  {data.categories.map((cat, ci) => (
                    <div key={ci} style={style.categoryBlock}>
                      <div style={style.categoryName}>{cat.name}</div>
                      <div style={style.itemsList}>
                        {cat.items.map((item, ii) => (
                          <div key={ii} style={style.itemRow}>
                            <div style={style.itemName}>{item.name}</div>
                            <div style={style.itemDesc}>{item.desc}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })
          ) : (
            <div style={style.noResult}>🔍 일치하는 꿈의 상징이 사전 정보에 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
}

const style = {
  overlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(3, 3, 7, 0.5)",
    backdropFilter: "blur(2px)",
    display: "flex",
    justifyContent: "flex-end",
    zIndex: 1100,
    animation: "fadeIn 0.2s ease-out",
  },
  drawer: {
    width: "480px",
    maxWidth: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    borderRadius: "24px 0 0 24px",
    padding: "24px",
    boxShadow: "-8px 0 32px rgba(0,0,0,0.5)",
    borderLeft: "1px solid rgba(255,255,255,0.06)",
    animation: "slideInLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  headerTitleGroup: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  title: {
    fontFamily: "var(--font-sans)",
    fontSize: "18px",
    color: "#fff",
    fontWeight: "700",
  },
  closeBtn: {
    background: "none",
    color: "var(--text-muted)",
    fontSize: "28px",
    border: "none",
    cursor: "pointer",
    padding: "4px",
  },
  searchWrapper: {
    marginBottom: "16px",
  },
  searchInput: {
    width: "100%",
    boxSizing: "border-box",
    height: "44px",
    borderRadius: "12px",
    padding: "0 16px",
  },
  tabsRow: {
    display: "flex",
    gap: "6px",
    overflowX: "auto",
    paddingBottom: "10px",
    marginBottom: "16px",
    flexShrink: 0,
  },
  tabBtn: {
    padding: "6px 12px",
    borderRadius: "20px",
    border: "1px solid",
    color: "var(--text-main)",
    fontSize: "12px",
    fontWeight: "600",
    whiteSpace: "nowrap",
    cursor: "pointer",
  },
  contentArea: {
    flex: 1,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    paddingRight: "4px",
    WebkitOverflowScrolling: "touch",
  },
  symbolSection: {
    padding: "18px",
    borderRadius: "16px",
  },
  symbolHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "10px",
  },
  symbolIcon: {
    fontSize: "22px",
  },
  symbolTitle: {
    fontSize: "15px",
    color: "#fff",
    fontWeight: "700",
  },
  symbolSummary: {
    fontSize: "12px",
    lineHeight: "1.6",
    color: "var(--text-muted)",
    marginBottom: "18px",
  },
  categoryBlock: {
    marginTop: "14px",
    borderTop: "1px solid rgba(255,255,255,0.03)",
    paddingTop: "12px",
  },
  categoryName: {
    fontSize: "11px",
    fontWeight: "700",
    color: "var(--color-primary)",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
    marginBottom: "10px",
  },
  itemsList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  itemRow: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  itemName: {
    fontSize: "13px",
    fontWeight: "600",
    color: "var(--text-bright)",
  },
  itemDesc: {
    fontSize: "12px",
    lineHeight: "1.6",
    color: "var(--text-main)",
  },
  noResult: {
    textAlign: "center",
    padding: "40px",
    color: "var(--text-muted)",
    fontSize: "13px",
  },
};
