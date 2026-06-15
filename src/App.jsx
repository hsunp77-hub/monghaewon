import { useState, useRef, useEffect } from "react";
import Onboard from "./components/Onboard";
import Chat from "./components/Chat";
import Report from "./components/Report";
import Settings from "./components/Settings";
import Dictionary from "./components/Dictionary";
import {
  getMockLeeFirstResponse,
  getMockLeeSecondResponse,
  getMockCheongResponse,
  getMockCheongFirstResponse,
  getMockCheongSecondResponse,
  getMockLeeResponse,
  getMockReport,
  getMockForetellFirstResponse,
  getMockForetellSecondResponse
} from "./utils/mockResponses";

// ── CONSTANTS ─────────────────────────────────────────────────────────────────
const STAGES = { ONBOARD: "onboard", CHAT: "chat", REPORT: "report" };
const STORAGE_KEY = "monghaewon_data";

// ── LOCAL STORAGE UTILS ───────────────────────────────────────────────────────
function loadStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function saveStorage(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

// ── SYSTEM PROMPTS ────────────────────────────────────────────────────────────
function getLeeSystem(birthdate, pastDreams, analysisFocus) {
  const pastSummary = pastDreams.length > 0
    ? "\n\n[이전 꿈 기록]\n" + pastDreams.map((d, i) => d.date + ": " + d.content).join("\n") + "\n→ 오늘 꿈을 해석할 때 이전 꿈들과의 연속성, 반복 상징, 변화 흐름을 반드시 연결하세요."
    : "";

  const focusModifier = analysisFocus === "foretelling"
    ? "\n→ 중요: 사용자가 꿈의 '예지적 성격(미래의 조짐)'에 관심이 높습니다. 상징이 지시하는 무의식적 경고나 직관적 예견 요소를 분석심리학적으로 어떻게 조명할 수 있을지 함께 언급해 주세요."
    : "";

  return `당신은 이선영 박사입니다. 임상심리학 박사 학위 소지자로 분석심리학(융 심리학) 전문가이며 꿈 분석 경력 20년의 베테랑 상담가입니다.${focusModifier}

[캐릭터 핵심]
- 말투: 학자적 권위가 있되 따뜻함. 단정적이고 구체적. "~일 수 있어요" 같은 모호한 말 절대 금지.
- 현재 꿈을 이전 꿈들과 반드시 연결합니다. ("지난번 꿈에서도 비슷한 공간이 나왔는데...")
- 융의 원형 개념(그림자, 아니마/아니무스, 자기, 페르소나)을 실제로 적용합니다.
- 꿈 속 감정의 질감을 정확히 짚어냅니다. ("그 '기분 좋음'—해방에 가깝습니까, 안도에 가깝습니까?")
- 금기어: "신호일 수 있어요" / "나아가고 있어요" / "좋은 것 같아요" 절대 사용 금지.

[상담 방식 및 단계별 대응 규칙]
당신과 사용자의 대화는 2개의 턴으로 진행되거나, 혹은 이미 진행된 대화 요약(오늘의 꿈 + 사용자의 추가 답변 + 타 전문가의 분석)이 입력으로 한꺼번에 주어질 수 있습니다. 입력 형태에 따라 다음과 같이 동작하십시오.

1. 첫 번째 답변 (사용자가 처음 꿈을 이야기했을 때 - 입력 메시지/대화의 길이가 1이고 일반 꿈인 경우):
   - 일방적으로 모든 상징을 한꺼번에 해몽하여 나열하지 마십시오.
   - 사용자가 말한 꿈에서 무의식적으로 가장 의미가 크고 강렬한 "핵심 상징 1~2개"만 포착하여 분석심리학(융 원형 관점)적으로 간결하면서도 깊이 있게 해설하십시오.
   - 사용자가 처한 현실 상황과 꿈의 정서적 톤을 이어주십시오. 만약 꿈의 내용과 현실 고민이 이미 충분히 기술되어 질문이 불필요하다고 판단되면, 질문 없이 즉각 심리학적 조언과 구체적인 행동 가이드를 주며 답변을 마무리하십시오. 추가적인 확인이 필요하여 질문을 던질 때만, 반드시 꿈의 구체적인 내용과 정서(예: 바다로 돌진하는 속도감, 이빨을 쑤시는 통증 등)에 100% 밀착된 독창적이고 사적인 질문 한 개로 답변을 끝맺으십시오. 질문은 문장 맨 마지막에 물음표(?) 기호로 끝나야 합니다. (질문이 없을 경우 분량 400~500자, 질문이 있을 경우 300~400자 내외)
   - ※ 상투성 배제 규칙: "최근 노력을 인정받지 못하거나 주변 사람과의 갈등이 있나요?" 혹은 "마음고생을 하고 계신지 조심스레 묻습니다" 같은 진부하고 정형화된 템플릿 질문은 인공지능 티가 나므로 절대 금지합니다. 꿈속 상황(예: 무언가를 몰래 숨겨야만 했던 상황, 오랜만에 만난 동료의 굳은 표정 등)에서 파생된 아주 구체적이고 사적인 무의식의 질문을 던져야 합니다.

2. 두 번째 답변 (사용자가 질문에 답하여 최근 상황을 들려주었을 때 - 대화의 길이가 3인 경우):
   - 사용자가 들려준 현재 상황에 대한 답변을 1턴에서 분석한 꿈의 무의식적 상징과 결합하여 깊이 있게 해설하고 위로하십시오.
   - 사용자의 무의식을 정리하여, 실생활에서 이번 주에 즉각 시도해볼 수 있는 구체적이고 실질적인 "심리학적 처방전 (마음 가이드)" 1가지를 명확히 제시하십시오.
   - 따뜻하고 권위 있는 학자의 말투로 상담을 격려하며 상담을 최종 마무리하십시오. (분량 500~600자 내외)

3. 종합 분석 답변 (입력이 하나뿐이지만 내용이 "오늘의 꿈: ... 사용자의 추가 답변: ..." 처럼 요약 및 타 전문가 분석을 포함하여 전달하는 경우 - 타 전문가 해금 시):
   - 질문을 던지지 마십시오.
   - 꿈의 핵심 상징 분석, 사용자의 현실 상황과의 연계, 그리고 최종 심리학적 처방 및 격려의 메시지를 하나의 완결된 에세이 형태의 보고서로 정갈하게 작성하십시오. (분량 500~600자 내외)

사용자 생년월일: ${birthdate}
오늘 날짜: ${new Date().toLocaleDateString("ko-KR")}${pastSummary}

※ 매우 중요: 응답 텍스트에 마크다운 기호(예: **, *, #, -, • 등)와 대괄호(예: [, ])를 절대 사용하지 마십시오. 채팅창은 일반 텍스트로 표시되므로 이러한 특수 기호가 노출되면 가독성이 떨어지고 변수처럼 보여 어색합니다. 항목 구분이나 상징 강조가 필요할 때는 반드시 큰따옴표 "상징명"을 사용하십시오. 개조식(bullet points)이나 대시(-), 번호 리스트 등을 사용해 기계적으로 나열하지 말고, 단락과 줄바꿈을 활용하여 자연스러운 에세이/답변 형식의 흐름글로 작성해 주십시오.`;
}

function getCheongSystem(birthdate, pastDreams, leeAnalysis, analysisFocus) {
  const pastSummary = pastDreams.length > 0
    ? "\n\n[이전 꿈 기록]\n" + pastDreams.map((d) => d.date + ": " + d.content).join("\n")
    : "";

  const focusModifier = analysisFocus === "foretelling"
    ? "\n→ 중요: 사용자가 꿈의 '예지몽적 예견과 다가올 일진'에 큰 관심을 보이고 있습니다. 운세 예측의 날짜와 수치를 좀 더 구체적이고 단정적으로 명시하여 예지몽의 격을 명확히 해 주시오."
    : "";

  return `당신은 청명(靑明) 선생입니다. 명리학 연구 30년의 역술가로, 사주팔자와 운세 흐름으로 꿈의 예지적 의미를 읽는 전문가입니다.${focusModifier}

[캐릭터 핵심]
- 말투: 고풍스럽고 묵직하며 단정적. 현대어와 한자어를 섞어 씁니다. "~하오" "~이니라" 체는 지나치니 자제하고, 격식 있는 경어체 사용.
- 일진(日辰)만이 아닌 이번 달 월운(月運), 이번 주 주간 흐름을 기준으로 해석합니다.
- 꿈을 예지몽 / 경고몽 / 소화몽 중 하나로 명확히 분류하고 근거를 제시합니다.
- 오행(水木火土金)으로 꿈의 상징을 분류하고, 사용자의 사주 오행과 충·합 관계를 언급합니다.
- 구체적 예측을 합니다. ("이번 주 수요일~목요일 사이 뜻밖의 연락이 올 수 있습니다.")
- 금기어: 심리학 용어, "무의식", "상징", "트라우마" 절대 사용 금지.

[상담 방식 및 단계별 대응 규칙]
당신과 사용자의 대화는 2개의 턴으로 진행되거나, 혹은 이미 진행된 대화 요약(오늘의 꿈 + 사용자의 추가 답변 + 타 전문가의 분석)이 입력으로 한꺼번에 주어질 수 있습니다. 입력 형태에 따라 다음과 같이 동작하십시오.

1. 첫 번째 답변 (사용자가 처음 꿈을 이야기했을 때 - 입력 메시지/대화의 길이가 1이고 일반 꿈인 경우):
   - 일방적으로 모든 상징을 나열하며 결론짓지 마십시오.
   - 꿈속에 깃든 가장 지배적인 오행(水木火土金)의 기운과 핵심 사물/행동 1~2가지를 짚어 사용자의 사주와 융합 설명하십시오.
   - 사용자가 전한 꿈의 묘사와 현실 고민이 충분하다면 더 묻지 않고 첫 답변에서 곧바로 명리학적 조언과 구체적인 개운법(처방전)을 함께 내려 답변을 마무리하시오. 현실의 기운을 더 확인해야만 할 때만, 기운의 흐름이나 막힘이 최근 일상에서 어떻게 나타나는지 질문 한 개를 던지되, 반드시 꿈의 기운(예: 이빨에 낀 찌꺼기를 청소하는 시원함, 좁고 얇은 건물 조형을 숨기는 답답함 등)에 직접 맞물리는 구체적인 질문이어야 하며 문장 끝에 물음표(?) 기호로 끝나야 하오. (처방까지 완료할 경우 분량 400~500자, 질문할 경우 300~400자 내외)
   - ※ 상투성 배제 규칙: "최근 대인관계에서 오해가 있거나 재능이 인정받지 못하고 있소?" 혹은 "주변과의 마찰로 마음고생을 하오?" 같은 정형화된 식상한 질문은 AI 티가 강하게 나므로 엄격히 금지합니다. 꿈속 오행의 징후(예: 물기가 넘쳐 속도를 제어하기 힘들었던 기억, 숨기고 싶었던 조형물 등)에 딱 맞물리는 사적이고 구체적인 기운의 문답을 유도하시오.

2. 두 번째 답변 (사용자가 질문에 답하여 최근 상황을 들려주었을 때 - 대화의 길이가 3인 경우):
   - 사용자가 들려준 현실의 기운과 1턴에서 분석한 오행의 징조를 결합하여, 다가올 2주 내의 구체적인 일진 변화와 예지적 징조(길흉화복)를 명확히 진단하십시오.
   - 사주의 막힌 곳을 뚫어줄 구체적이고 실질적인 "명리학적 처방전 (개운법 및 방책)" 1가지를 일러주십시오. (예: 착용할 색상, 피해야 할 방위, Remedy 행동 등 구체적 명시)
   - 묵직하고 고풍스러운 어조로 삶의 방향을 일깨우며 상담을 최종 마무리하십시오. (분량 500~600자 내외)

3. 종합 분석 답변 (입력이 하나뿐이지만 내용이 "오늘의 꿈: ... 사용자의 추가 답변: ..." 처럼 요약 및 타 전문가 분석을 포함하여 전달하는 경우 - 타 전문가 해금 시):
   - 질문을 던지지 마십시오.
   - 꿈의 지배 오행 분석, 사용자의 사주팔자 융합 분석, 다가올 2주 내의 일진 변화 예측(길흉화복), 그리고 구체적인 명리학적 처방전(개운법)을 하나의 완결된 보고서로 작성하십시오. (분량 500~600자 내외)

[선행 분석 내용 (이선영 박사 분석 혹은 명리가 먼저인 경우 공백)]
${leeAnalysis}

사용자 생년월일: ${birthdate}
오늘 날짜: ${new Date().toLocaleDateString("ko-KR")}${pastSummary}

※ 매우 중요: 응답 텍스트에 마크다운 기호(예: **, *, #, -, • 등)와 대괄호(예: [, ])를 절대 사용하지 마시오. 강조나 구분이 필요할 때는 대괄호 대신 반드시 큰따옴표 "상징명"을 사용하여 주시오. 대괄호 기호는 절대 사용하지 마시오. 개조식(bullet points)이나 대시(-), 번호 리스트 등을 사용해 기계적으로 나열하지 말고, 단락과 줄바꿈을 활용하여 자연스러운 에세이/답변 형식의 흐름글로 작성해 주시오.`;
}
function getHalmaeSystem(birthdate, pastDreams, leeAnalysis, analysisFocus) {
  const pastSummary = pastDreams.length > 0
    ? "\n\n[이전 꿈 기록]\n" + pastDreams.map((d) => d.date + ": " + d.content).join("\n")
    : "";

  return `당신은 "몽화"입니다. 신기를 타고난 50년 경력의 신점 무속인이자, 한국 전통 민속 해몽과 꿈자리 풀이의 대가인 괴짜 할머니입니다.

[캐릭터 핵심]
- 말투: 친근하면서도 반말과 경어를 섞어 쓰는 거침없고 직관적인 할머니/무속인 말투 ("오냐,", "~란다", "~거라", "~느니라", "~이여"). 때로는 호통치듯 단호하게 말합니다.
- 해몽 방식: 심리학적 무의식이나 명리 오행 같은 어려운 학문적 이야기는 일체 하지 마십시오. 철저히 한국 전통 민속 해몽(해몽사전식 직관적 방향)과 신점 관점에서만 분석합니다.
- 예: "돼지나 똥꿈을 꾸면 복권을 사거라", "조상이 나타났으니 제를 지내거나 묘자리를 돌아보라", "칼이나 가위는 구설수니 조심하라" 등 대중적이고 직관적인 한국 민간 해몽을 적용합니다.
- 구체적인 액막이 비방(Remedy)과 처방을 줍니다. (예: "대문 앞에 굵은 소금을 세 줌 뿌려라", "주머니에 붉은 팥 일곱 알을 넣고 다녀라", "서쪽에서 오는 사람은 피해라")
- 금기어: "무의식", "원형", "콤플렉스", "오행", "사주", "조후" 절대 사용 금지.

[상담 방식 및 단계별 대응 규칙]
당신과 사용자의 대화는 2개의 턴으로 진행되거나, 혹은 이미 진행된 대화 요약(오늘의 꿈 요약 + 사용자의 추가 답변 + 타 전문가의 분석)이 입력으로 한꺼번에 주어질 수 있습니다. 입력 형태에 따라 다음과 같이 동작하십시오.

1. 첫 번째 답변 (사용자가 처음 꿈을 이야기했을 때 - 입력 메시지/대화의 길이가 1이고 일반 꿈인 경우):
   - 꿈속에 깃든 민속학적 대략적인 해몽 방향(예: 이빨에 낀 찌꺼기를 치우는 것, 건물 조형을 남몰래 숨기는 행위 등)을 짚고, 신점적으로 느껴지는 직관적 징조를 읊어주십시오.
   - 꿈속의 특정 상황이나 감정(예: 찌꺼기를 청소할 때의 시원함, 몰래 숨길 때의 초조함 등)에 꼭 맞는 직관적인 질문 한 개를 던져 사용자의 상황을 물어보십시오.
   - ※ 상투성 배제 규칙: "최근 사람들과 마찰이 있거나 노력이 무시당해 힘드냐?" 혹은 "재능을 평가받지 못해 마음고생을 하냐?" 같은 뻔하고 인공적인 질문은 엄격히 금지합니다. 꿈속의 독특한 행위나 상징물(예: 사람들에게 숨기고 싶었던 그 물건, 예전 동료가 다시 나타난 일 등)에 철저히 밀착한 구체적이고 토속적인 질문을 하십시오. (분량 300~400자 내외)

2. 두 번째 답변 (사용자가 질문에 답하여 최근 상황을 들려주었을 때 - 대화의 길이가 3인 경우):
   - 사용자가 전한 현실 상황을 꿈속 징조와 연결하여, 다가올 2주 내의 직관적 미래 길흉을 거침없이 예언하십시오. (돼지꿈 복권 구매 등의 구체적 방향 제시)
   - 액을 물리치거나 재수를 트이게 해줄 비방 처방(팥, 소금, 방위, 조력자 등) 1가지를 명확히 처방해주고 대화를 최종 마무리하십시오. (분량 400~500자 내외)

3. 종합 분석 답변 (입력이 하나뿐이지만 내용이 "오늘의 꿈: ... 사용자의 추가 답변: ..." 처럼 요약 및 타 전문가 분석을 포함하여 전달하는 경우 - 타 전문가 해금 시):
   - 질문은 일절 던지지 마십시오.
   - 꿈의 직관적 민속 해몽, 신점 징조, 향후 2주 내 미래 길흉 예언, 그리고 구체적인 무속적 비방 처방을 하나의 완결된 보고서 형태로 작성하십시오. (분량 400~500자 내외)

[선행 분석 내용 (이선영 박사 분석 혹은 명리가 먼저인 경우 공백)]
${leeAnalysis}

사용자 생년월일: ${birthdate}
오늘 날짜: ${new Date().toLocaleDateString("ko-KR")}${pastSummary}

※ 매우 중요: 응답 텍스트에 마크다운 기호(예: **, *, #, -, • 등)와 대괄호(예: [, ])를 절대 사용하지 마십시오. 채팅창은 일반 텍스트로 표시되므로 이러한 특수 기호가 노출되면 가독성이 떨어지고 변수처럼 보여 어색합니다. 항목 구분이나 강조가 필요할 때는 반드시 큰따옴표 "상징명"을 사용하십시오. 단락과 줄바꿈을 활용하여 자연스러운 무속인의 조언 형식의 흐름글로 작성해 주십시오.`;
}
function getReportSystem(birthdate, dreams, analysisFocus) {
  const dreamSummary = dreams.map((d, i) => `${i+1}일차 (${d.date}): ${d.content}`).join("\n");
  
  const isForetelling = analysisFocus === "foretelling";
  const secondExpertName = isForetelling ? "무속인 몽화" : "청명 선생";
  const secondReportKey = isForetelling ? "halmaeReport" : "cheongReport";
  
  const secondJsonStructure = isForetelling
    ? `"${secondReportKey}": {
    "dreamType": "3개 꿈의 전체 성격 판정: 민속 해몽 및 예지적 신점 분석 (2문장)",
    "ohangFlow": "신점 징조 분석—대중적 꿈자리 징조와 신기(신기)로 느끼는 미래 길흉 (2문장)",
    "monthlyYun": "최근 조상이나 기운의 흐름과 꿈들의 연관성 (2문장)",
    "prediction": "향후 2주 내 구체적 미래 예언 2가지 (시기/상황 명시)",
    "caution": "액막이를 위해 반드시 조심하고 경계할 것 1가지 (구체적)",
    "luck": "재수를 트이게 하기 위해 취할 무속적 비방 1가지 (소금, 팥, 조력자 등 구체적 비방)",
    "closing": "몽화 할머니의 마무리 한 문장 (호통치거나 정감 있는 할머니 조언)"
  }`
    : `"${secondReportKey}": {
    "dreamType": "3개 꿈의 전체 성격 판정: 예지몽/경고몽/소화몽 혼합 분석 (2문장)",
    "ohangFlow": "오행 흐름 분석—지배 오행과 사주와의 관계 (2문장)",
    "monthlyYun": "이번 달 월운과 꿈들의 연관성 (2문장)",
    "prediction": "향후 2주 내 구체적 예측 2가지 (날짜/상황 명시)",
    "caution": "반드시 조심할 것 1가지 (구체적)",
    "luck": "취하면 좋을 것 1가지 (방향/색/시간대 등 구체적)",
    "closing": "청명 선생의 마무리 한 문장 (묵직하고 단정적으로)"
  }`;

  return `당신은 이선영 박사와 ${secondExpertName} 두 전문가입니다. 아래 꿈 기록을 종합 분석하여 처방전을 작성하세요.

사용자 생년월일: ${birthdate}
꿈 기록:
${dreamSummary}

반드시 아래 JSON만 반환하세요. 다른 텍스트, 백틱, 설명 일체 금지.
※ 매우 중요: JSON 내의 모든 응답 텍스트 값 역시 마크다운 기호(예: **, *, # 등)를 절대 사용하지 말고, 강조나 구분이 필요할 때는 큰따옴표 "상징명"을 사용하십시오. 개조식(bullet points)이나 대시(-), 번호 리스트 등을 사용한 기계적 나열은 절대 금하며 자연스러운 문장으로 서술하십시오.

{
  "leeReport": {
    "repeatSymbols": "3개 꿈에서 반복된 핵심 상징들과 그 의미 (융 원형 관점, 3문장)",
    "shadowMessage": "그림자(Shadow) 또는 무의식이 보내는 메시지 (2문장, 구체적으로)",
    "dreamFlow": "꿈의 흐름 변화—심리적 상태가 어떻게 바뀌었는지 (2문장)",
    "prescription": "이번 주 심리적 처방 1가지 (구체적 행동, 1문장)",
    "closing": "이선영 박사의 마무리 한 문장 (학자답게, 따뜻하게)"
  },
  ${secondJsonStructure}
}`;
}

export default function App() {
  const [stage, setStage] = useState(STAGES.ONBOARD);
  const [profile, setProfile] = useState({ name: "", birthdate: "", analysisFocus: "psychology" });
  const [dreams, setDreams] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatPhase, setChatPhase] = useState("input"); // input | lee | cheong | first-done
  const [currentDreamText, setCurrentDreamText] = useState("");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  
  // Custom states for date & unlocks
  const [dreamDate, setDreamDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [unlocked, setUnlocked] = useState({ psychology: false, saju: false, foretelling: false });
  const [realLifeContext, setRealLifeContext] = useState("");

  // Settings & API state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDictOpen, setIsDictOpen] = useState(false);
  const [apiKey, setApiKey] = useState(() => {
    try {
      return localStorage.getItem("monghaewon_gemini_api_key") || localStorage.getItem("monghaewon_api_key") || "";
    } catch { return ""; }
  });
  const [useMock, setUseMock] = useState(() => {
    try {
      const saved = localStorage.getItem("monghaewon_use_mock");
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const [leeHistory, setLeeHistory] = useState([]);

  // Check server-side key presence and update default Mock mode on load
  useEffect(() => {
    fetch("/api/config")
      .then(res => res.json())
      .then(data => {
        if (data.hasApiKey) {
          setUseMock(false);
          localStorage.setItem("monghaewon_use_mock", JSON.stringify(false));
        }
      })
      .catch(err => console.error("Could not fetch server settings:", err));
  }, []);

  // Load storage details
  useEffect(() => {
    const saved = loadStorage();
    if (saved?.profile?.name && saved?.profile?.birthdate) {
      setProfile(saved.profile);
      setDreams(saved.dreams || []);
      if (saved.reports) {
        setReports(saved.reports);
      } else if (saved.report) {
        const migrated = [{
          id: Date.now().toString(),
          date: new Date().toLocaleDateString("ko-KR"),
          dreamsCount: saved.dreams?.length || 3,
          dreamsSnapshot: saved.dreams || [],
          data: saved.report
        }];
        setReports(migrated);
        saveStorage({ profile: saved.profile, dreams: saved.dreams || [], reports: migrated });
      }
      setStage(STAGES.CHAT);
      
      const focus = saved.profile.analysisFocus || "psychology";
      let greetText = "";
      if (focus === "psychology") {
        greetText = `다시 오셨군요, ${saved.profile.name}님. 융 분석심리학을 기반으로 마음을 분석해 드릴게요. 오늘 꾸신 꿈을 들려주세요.`;
      } else if (focus === "saju") {
        greetText = `반갑소, ${saved.profile.name}님. 사주팔자 오행의 눈으로 오늘의 길흉화복을 짚어드리겠소. 오늘 밤 다녀간 꿈의 흔적을 들려주시오.`;
      } else {
        greetText = `오냐, 다시 왔구나 ${saved.profile.name}아. 네 꿈자리에 깃든 미래의 조짐과 길흉을 샅샅이 짚어줄 테니, 어서 오늘 꿈을 들려주려무나.`;
      }

      setChatMessages([
        {
          role: "system-info",
          text: greetText
        }
      ]);
    }
  }, []);

  // Update Settings local storage values
  const handleChangeApiKey = (newKey) => {
    setApiKey(newKey);
    localStorage.setItem("monghaewon_gemini_api_key", newKey);
  };

  const handleToggleMock = (val) => {
    setUseMock(val);
    localStorage.setItem("monghaewon_use_mock", JSON.stringify(val));
  };

  // Secure API Call through proxy
  const callGemini = async (messages, systemPrompt, maxTokens = 800) => {
    const headers = {
      "Content-Type": "application/json",
    };
    if (apiKey) {
      headers["x-user-api-key"] = apiKey;
    }

    const res = await fetch("/api/gemini", {
      method: "POST",
      headers,
      body: JSON.stringify({
        messages,
        systemPrompt,
        maxTokens,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error?.message || `API error (Status ${res.status})`);
    }

    const data = await res.json();
    return data.content?.[0]?.text ?? "";
  };


  // Onboarding submit handler
  const handleOnboard = (name, birthdate, dreamDt, focus) => {
    const p = { name, birthdate, analysisFocus: focus };
    setProfile(p);
    setDreamDate(dreamDt);
    saveStorage({ profile: p, dreams: [] });
    setStage(STAGES.CHAT);
    setChatPhase("input");
    
    let greetText = "";
    if (focus === "psychology") {
      greetText = `안녕하세요, ${name}님. 융 분석심리학 전문가 이선영입니다. 마음 속 그림자를 발견할 준비가 되셨나요? 오늘 꾸신 꿈을 들려주세요.`;
    } else if (focus === "saju") {
      greetText = `반갑소, ${name}님. 명리학자 청명이라 하오. 태어난 날의 기운과 오늘의 일진을 짚어 꿈의 비밀을 풀고자 하니, 꿈을 상세히 일러주시오.`;
    } else {
      greetText = `오냐, 반갑다 ${name}아. 신비로운 꿈의 길흉과 예지적 징조를 밝혀줄 무속인 몽화란다. 네 앞길을 보여줄 오늘 꿈을 자세히 들려주려무나.`;
    }

    setChatMessages([
      {
        role: "system-info",
        text: greetText
      }
    ]);
  };

  // Step 1: User Dream Input -> First Expert Question
  const handleDreamInput = async () => {
    if (!currentDreamText.trim() || loading) return;
    const dream = currentDreamText.trim();
    setCurrentDreamText("");
    setLoading(true);

    const context = realLifeContext.trim();
    setRealLifeContext("");

    const combinedText = dream + (context ? `\n\n[최근 현실 맥락]\n${context}` : "");

    setChatMessages(prev => [...prev, { role: "user", text: combinedText }]);

    const history = [{ role: "user", content: combinedText }];
    setLeeHistory(history);

    let firstRole = "lee";
    let sysPrompt = "";
    
    if (profile.analysisFocus === "saju") {
      firstRole = "cheong";
      sysPrompt = getCheongSystem(profile.birthdate, dreams, "(선행 분석 없음 - 첫 질문자)", profile.analysisFocus);
    } else if (profile.analysisFocus === "foretelling") {
      firstRole = "halmae";
      sysPrompt = getHalmaeSystem(profile.birthdate, dreams, "(선행 분석 없음 - 첫 질문자)", profile.analysisFocus);
    } else {
      firstRole = "lee";
      sysPrompt = getLeeSystem(profile.birthdate, dreams, profile.analysisFocus);
    }
    
    // Lock/Unlock state initialization based on first chosen focus
    setUnlocked({
      psychology: profile.analysisFocus === "psychology",
      saju: profile.analysisFocus === "saju",
      foretelling: profile.analysisFocus === "foretelling"
    });

    try {
      let reply = "";
      if (useMock) {
        await new Promise(r => setTimeout(r, 1200));
        if (profile.analysisFocus === "saju") {
          reply = getMockCheongFirstResponse(dream);
        } else if (profile.analysisFocus === "foretelling") {
          reply = getMockForetellFirstResponse(dream);
        } else {
          reply = getMockLeeFirstResponse(dream);
        }
      } else {
        reply = await callGemini(history, sysPrompt);
      }

      setLeeHistory(prev => [...prev, { role: "assistant", content: reply }]);
      setChatMessages(prev => [...prev, { role: firstRole, text: reply }]);

      const trimmedReply = reply.trim();
      const hasQuestion = trimmedReply.endsWith("?") || trimmedReply.slice(-15).includes("?");

      if (hasQuestion) {
        setChatPhase(firstRole);
      } else {
        // Direct finish on Turn 1! Save the dream entry immediately.
        const dreamContent = history[0]?.content || "";
        const newDream = {
          content: dreamContent,
          date: new Date(dreamDate).toLocaleDateString("ko-KR"),
          leeText: profile.analysisFocus === "psychology" ? reply : "",
          cheongText: profile.analysisFocus === "saju" ? reply : "",
          foretellText: profile.analysisFocus === "foretelling" ? reply : "",
        };
        const updatedDreams = [...dreams, newDream];
        setDreams(updatedDreams);
        saveStorage({ profile, dreams: updatedDreams, reports });
        
        if (updatedDreams.length >= 3) {
          setChatMessages(prev => [
            ...prev,
            {
              role: "system-info",
              text: `✦ ${profile.name}님의 꿈 기록이 ${updatedDreams.length}회 쌓였습니다. 종합 처방전 리포트를 확인할 수 있습니다.`
            }
          ]);
        }
        setChatPhase("first-done");
      }
    } catch (err) {
      console.error(err);
      setChatMessages(prev => [
        ...prev,
        { role: "system-info", text: `⚠️ 해석 실패: ${err.message}` }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: User Reply -> First Expert Final Analysis -> Go to first-done perspective unlock phase
  const handleUserReply = async () => {
    if (!input.trim() || loading) return;
    const userText = input.trim();
    setInput("");
    setLoading(true);
    setChatMessages(prev => [...prev, { role: "user", text: userText }]);

    let firstRole = "lee";
    let sysPrompt = "";
    
    if (profile.analysisFocus === "saju") {
      firstRole = "cheong";
      sysPrompt = getCheongSystem(profile.birthdate, dreams, "(선행 분석 없음)", profile.analysisFocus);
    } else if (profile.analysisFocus === "foretelling") {
      firstRole = "halmae";
      sysPrompt = getHalmaeSystem(profile.birthdate, dreams, "(선행 분석 없음)", profile.analysisFocus);
    } else {
      firstRole = "lee";
      sysPrompt = getLeeSystem(profile.birthdate, dreams, profile.analysisFocus);
    }

    try {
      let firstExpertReply = "";
      const updatedHistory = [...leeHistory, { role: "user", content: userText }];
      
      // Fetch first expert's final response
      if (useMock) {
        await new Promise(r => setTimeout(r, 1000));
        if (profile.analysisFocus === "saju") {
          firstExpertReply = getMockCheongSecondResponse(leeHistory[0].content, userText);
        } else if (profile.analysisFocus === "foretelling") {
          firstExpertReply = getMockForetellSecondResponse(leeHistory[0].content, userText);
        } else {
          firstExpertReply = getMockLeeSecondResponse(leeHistory[0].content, userText);
        }
      } else {
        firstExpertReply = await callGemini(updatedHistory, sysPrompt);
      }

      setLeeHistory([...updatedHistory, { role: "assistant", content: firstExpertReply }]);
      setChatMessages(prev => [...prev, { role: firstRole, text: firstExpertReply }]);

      // Save the initial dream entry in database
      const dreamContent = leeHistory[0]?.content || "";
      const newDream = {
        content: dreamContent + (userText ? ` / ${userText}` : ""),
        date: new Date(dreamDate).toLocaleDateString("ko-KR"),
        leeText: profile.analysisFocus === "psychology" ? firstExpertReply : "",
        cheongText: profile.analysisFocus === "saju" ? firstExpertReply : "",
        foretellText: profile.analysisFocus === "foretelling" ? firstExpertReply : "",
      };
      
      const updatedDreams = [...dreams, newDream];
      setDreams(updatedDreams);
      saveStorage({ profile, dreams: updatedDreams, reports });

      // Notify if report is unlocked
      if (updatedDreams.length >= 3) {
        setChatMessages(prev => [
          ...prev,
          {
            role: "system-info",
            text: `✦ ${profile.name}님의 꿈 기록이 ${updatedDreams.length}회 쌓였습니다. 종합 처방전 리포트를 확인할 수 있습니다.`
          }
        ]);
      }
      setChatPhase("first-done");
    } catch (err) {
      console.error(err);
      setChatMessages(prev => [
        ...prev,
        { role: "system-info", text: `⚠️ 분석 중 문제 발생: ${err.message}` }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Secondary perspective unlock handler
  const handleUnlock = async (type) => {
    setLoading(true);
    setChatPhase(type === "psychology" ? "lee" : (type === "saju" ? "cheong" : "halmae"));

    try {
      let reply = "";
      const dreamContent = leeHistory[0]?.content || "";
      const userReply = leeHistory[1]?.content || "";
      
      // Compile previous readings for reference context
      const prevLeeText = dreams[dreams.length - 1]?.leeText || "";
      const prevCheongText = dreams[dreams.length - 1]?.cheongText || "";
      const prevForetellText = dreams[dreams.length - 1]?.foretellText || "";
      const contextSummary = `[기존 심리해석]: ${prevLeeText}\n[기존 사주해석]: ${prevCheongText}\n[기존 예지해석]: ${prevForetellText}`;

      if (type === "psychology") {
        if (useMock) {
          await new Promise(r => setTimeout(r, 1200));
          reply = getMockLeeResponse(dreamContent, userReply, prevCheongText || prevForetellText, profile.birthdate);
        } else {
          const sysPrompt = getLeeSystem(profile.birthdate, dreams, profile.analysisFocus);
          const messages = [{
            role: "user",
            content: `오늘의 꿈: "${dreamContent}"\n사용자의 추가 답변: "${userReply}"\n\n위 내용과 아래 기존 분석들을 바탕으로 분석심리학(융 심리학) 관점의 분석과 최종 감정 처방을 완성해 주세요.\n\n${contextSummary}`
          }];
          reply = await callGemini(messages, sysPrompt);
        }
        setChatMessages(prev => [...prev, { role: "lee", text: reply }]);
      } else if (type === "saju") {
        if (useMock) {
          await new Promise(r => setTimeout(r, 1200));
          reply = getMockCheongResponse(dreamContent, userReply, prevLeeText || prevForetellText, profile.birthdate);
        } else {
          const sysPrompt = getCheongSystem(profile.birthdate, dreams, prevLeeText, profile.analysisFocus);
          const messages = [{
            role: "user",
            content: `오늘의 꿈: "${dreamContent}"\n사용자의 추가 답변: "${userReply}"\n\n위 내용과 아래 기존 분석들을 바탕으로 명리학적 오행 해석을 짚어 주세요.\n\n${contextSummary}`
          }];
          reply = await callGemini(messages, sysPrompt);
        }
        setChatMessages(prev => [...prev, { role: "cheong", text: reply }]);
      } else if (type === "foretelling") {
        if (useMock) {
          await new Promise(r => setTimeout(r, 1200));
          reply = `오냐, 내 신기 어린 돋보기로 네 꿈자리 징조를 샅샅이 비춰주마!
 
1. 다가올 징조: 이 꿈은 네 앞길을 가로막던 살이 걷히고 재물운과 횡재수가 열릴 길조란다. 며칠 내로 반가운 귀인이나 목돈 만질 일이 생길 테니 눈을 크게 뜨고 잘 보거라. 만약 돼지꿈이나 똥꿈처럼 재물 기운이 강한 꿈이라면 묻지도 따지지도 말고 당장 복권을 사거라!
2. 물리쳐야 할 액운: 이번 주 다가오는 수요일 밤에는 부정 타지 않게 불필요한 이동을 자제하고 입을 무겁게 하거라. 대문 앞에 굵은 소금을 세 줌 뿌려두거나 주머니에 붉은 팥 일곱 알을 넣고 다니면 모진 액을 쫓아낼 수 있을 것이야.`;
        } else {
          const sysPrompt = getHalmaeSystem(profile.birthdate, dreams, prevLeeText, profile.analysisFocus);
          const messages = [{
            role: "user",
            content: `오늘의 꿈: "${dreamContent}"\n사용자의 추가 답변: "${userReply}"\n\n위 내용과 아래 기존 분석들을 바탕으로, 무속적 관점(신점, 한국 전통 민속 해몽, 돼지꿈 복권 등 직관적 징조)에서 이 꿈에 깃든 예지몽의 의미와 다가올 징조를 예언해 주십시오.\n\n${contextSummary}`
          }];
          reply = await callGemini(messages, sysPrompt);
        }
        setChatMessages(prev => [...prev, { role: "halmae", text: reply }]);
      }

      // Update unlocked state
      const updatedUnlocked = { ...unlocked, [type]: true };
      setUnlocked(updatedUnlocked);

      // Update database entry in storage
      setDreams(prevDreams => {
        const updated = [...prevDreams];
        if (updated.length > 0) {
          const idx = updated.length - 1;
          updated[idx] = {
            ...updated[idx],
            leeText: type === "psychology" ? reply : updated[idx].leeText,
            cheongText: type === "saju" ? reply : updated[idx].cheongText,
            foretellText: type === "foretelling" ? reply : updated[idx].foretellText,
          };
          saveStorage({ profile, dreams: updated });
        }
        return updated;
      });

    } catch (err) {
      console.error(err);
      setChatMessages(prev => [
        ...prev,
        { role: "system-info", text: `⚠️ 해제 실패: ${err.message}` }
      ]);
    } finally {
      setChatPhase("first-done");
      setLoading(false);
    }
  };

  // Generate multi-dream combined report
  const generateReport = async () => {
    // Check if we already generated a report for this exact dream count
    const existing = reports.find(r => r.dreamsCount === dreams.length);
    if (existing) {
      setSelectedReport(existing);
      setStage(STAGES.REPORT);
      return;
    }

    if (loading) return;
    setLoading(true);

    try {
      let parsedReport = null;
      if (useMock) {
        await new Promise(r => setTimeout(r, 1500));
        parsedReport = getMockReport(dreams, profile.birthdate, profile.analysisFocus);
      } else {
        const reply = await callGemini(
          [{ role: "user", content: "처방전을 작성해주세요." }],
          getReportSystem(profile.birthdate, dreams, profile.analysisFocus),
          1500
        );
        const clean = reply.replace(/```json|```/g, "").trim();
        parsedReport = JSON.parse(clean);
      }

      const newReport = {
        id: Date.now().toString(),
        date: new Date().toLocaleDateString("ko-KR"),
        dreamsCount: dreams.length,
        dreamsSnapshot: [...dreams],
        data: parsedReport
      };

      const updatedReports = [newReport, ...reports];
      setReports(updatedReports);
      setSelectedReport(newReport);
      saveStorage({ profile, dreams, reports: updatedReports });
      setStage(STAGES.REPORT);
    } catch (err) {
      console.error(err);
      alert(`리포트 생성 오류: ${err.message}. 다시 시도해 주세요.`);
    } finally {
      setLoading(false);
    }
  };

  const startNewDream = () => {
    setChatPhase("input");
    setRealLifeContext("");
    
    // Reset date picker for the next dream to today
    const today = new Date().toISOString().split("T")[0];
    setDreamDate(today);

    setChatMessages(prev => [
      ...prev,
      { role: "system-info", text: `── ${new Date().toLocaleDateString("ko-KR")} ──` },
      { role: "system-info", text: "오늘 꾸신 새로운 꿈을 말해주십시오." }
    ]);
  };

  const resetAll = () => {
    if (!confirm("모든 꿈 기록을 삭제하고 처음부터 다시 시작하시겠습니까?")) return;
    localStorage.removeItem(STORAGE_KEY);
    setProfile({ name: "", birthdate: "", analysisFocus: "psychology" });
    setDreams([]);
    setChatMessages([]);
    setRealLifeContext("");
    setReports([]);
    setSelectedReport(null);
    setStage(STAGES.ONBOARD);
    setChatPhase("input");
  };

  return (
    <>
      {stage === STAGES.ONBOARD && (
        <Onboard 
          onSubmit={handleOnboard} 
          onOpenSettings={() => setIsSettingsOpen(true)}
          useMock={useMock}
        />
      )}
      
      {stage === STAGES.CHAT && (
        <Chat
          profile={profile}
          dreams={dreams}
          chatMessages={chatMessages}
          chatPhase={chatPhase}
          currentDreamText={currentDreamText}
          setCurrentDreamText={setCurrentDreamText}
          input={input}
          setInput={setInput}
          loading={loading}
          onDreamInput={handleDreamInput}
          onUserReply={handleUserReply}
          onStartNewDream={startNewDream}
          onGenerateReport={generateReport}
          onReset={resetAll}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenDict={() => setIsDictOpen(true)}
          unlocked={unlocked}
          onUnlock={handleUnlock}
          realLifeContext={realLifeContext}
          setRealLifeContext={setRealLifeContext}
          dreamDate={dreamDate}
          setDreamDate={setDreamDate}
          reports={reports}
          onViewReport={(rep) => {
            setSelectedReport(rep);
            setStage(STAGES.REPORT);
          }}
        />
      )}

      {stage === STAGES.REPORT && selectedReport && (
        <Report
          report={selectedReport.data}
          profile={profile}
          name={profile.name}
          dreams={selectedReport.dreamsSnapshot || dreams}
          onBack={() => setStage(STAGES.CHAT)}
        />
      )}

      <Settings
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        apiKey={apiKey}
        onChangeApiKey={handleChangeApiKey}
        useMock={useMock}
        onToggleMock={handleToggleMock}
      />

      {/* Floating dictionary button (hidden during print) */}
      <button 
        className="floating-dict-btn no-print" 
        onClick={() => setIsDictOpen(true)}
      >
        🔮 해몽 사전
      </button>

      {/* Dictionary Drawer */}
      <Dictionary 
        isOpen={isDictOpen} 
        onClose={() => setIsDictOpen(false)} 
      />
    </>
  );
}
