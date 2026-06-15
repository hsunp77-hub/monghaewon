import fs from 'fs';

// 1. Patch App.jsx
const appPath = '/Users/kakao/Documents/antigravity/focused-nobel/src/App.jsx';
let appContent = fs.readFileSync(appPath, 'utf8');

// Replace system prompt brackets and instructions
appContent = appContent.replace(/\[핵심 상징 1~2개\]/g, '"핵심 상징 1~2개"');
appContent = appContent.replace(/질문 \[1개\]로/g, '질문 한 개로');
appContent = appContent.replace(/\[심리학적 처방전 \(마음 가이드\)\]/g, '"심리학적 처방전 (마음 가이드)"');
appContent = appContent.replace(/대괄호 \[상징명\] 또는 큰따옴표 "상징명"을/g, '큰따옴표 "상징명"을');
appContent = appContent.replace(/질문 \[1개\]를/g, '질문 한 개를');
appContent = appContent.replace(/\[명리학적 처방전 \(개운법 및 방책\)\]/g, '"명리학적 처방전 (개운법 및 방책)"');
appContent = appContent.replace(/대괄호 \[상징명\] 또는 큰따옴표 "상징명"을 사용하여/g, '큰따옴표 "상징명"을 사용하여');
appContent = appContent.replace(/대괄호 \[상징명\]나 큰따옴표 "상징명"을/g, '큰따옴표 "상징명"을');

// Enforce bracket avoidance rule explicitly in the prompts
appContent = appContent.replace(
  '※ 매우 중요: 응답 텍스트에 마크다운 기호(예: **, *, #, -, • 등)를 절대 사용하지 마십시오. 채팅창은 일반 텍스트로 표시되므로 마크다운 기호가 그대로 노출되면 가독성이 떨어지고 지저분합니다. 항목 구분이나 상징 강조가 필요할 때는 대괄호 [상징명] 또는 큰따옴표 "상징명"을 사용하십시오.',
  '※ 매우 중요: 응답 텍스트에 마크다운 기호(예: **, *, #, -, • 등)와 대괄호(예: [, ])를 절대 사용하지 마십시오. 채팅창은 일반 텍스트로 표시되므로 이러한 특수 기호가 노출되면 가독성이 떨어지고 변수처럼 보여 어색합니다. 항목 구분이나 상징 강조가 필요할 때는 반드시 큰따옴표 "상징명"을 사용하십시오.'
);

appContent = appContent.replace(
  '※ 매우 중요: 응답 텍스트에 마크다운 기호(예: **, *, #, -, • 등)를 절대 사용하지 마시오. 대괄호 [상징명] 또는 큰따옴표 "상징명"을 사용하여 강조나 구분을 해주시오.',
  '※ 매우 중요: 응답 텍스트에 마크다운 기호(예: **, *, #, -, • 등)와 대괄호(예: [, ])를 절대 사용하지 마시오. 강조나 구분이 필요할 때는 대괄호 대신 반드시 큰따옴표 "상징명"을 사용하여 주시오. 대괄호 기호는 절대 사용하지 마시오.'
);

appContent = appContent.replace(
  '※ 매우 중요: JSON 내의 모든 응답 텍스트 값 역시 마크다운 기호(예: **, *, # 등)를 절대 사용하지 말고, 강조나 구분이 필요할 때는 대괄호 [상징명]나 큰따옴표 "상징명"을 사용하십시오.',
  '※ 매우 중요: JSON 내의 모든 응답 텍스트 값 역시 마크다운 기호(예: **, *, # 등)와 대괄호(예: [, ])를 절대 사용하지 말고, 강조나 구분이 필요할 때는 반드시 큰따옴표 "상징명"을 사용하십시오.'
);

// Replace unlocking prefix
appContent = appContent.replace(/\[예지몽 상징 풀이\]/g, '"예지몽 상징 풀이"');

fs.writeFileSync(appPath, appContent, 'utf8');
console.log('App.jsx patched successfully!');

// 2. Patch mockResponses.js
const mockPath = '/Users/kakao/Documents/antigravity/focused-nobel/src/utils/mockResponses.js';
let mockContent = fs.readFileSync(mockPath, 'utf8');

// Replace • [상징명]: to • "상징명":
mockContent = mockContent.replace(/• \[([^\]]+)\]:/g, '• "$1":');
// Replace headers like [제목] to "제목" or just title
mockContent = mockContent.replace(/\[꿈속 주요 상징 분석\]/g, '"꿈속 주요 상징 분석"');
mockContent = mockContent.replace(/\[종합 심리 상태 조명\]/g, '"종합 심리 상태 조명"');
mockContent = mockContent.replace(/\[꿈속 상징의 오행 분석\]/g, '"꿈속 상징의 오행 분석"');
mockContent = mockContent.replace(/\[종합 음양 조율\]/g, '"종합 음양 조율"');
mockContent = mockContent.replace(/\[꿈속 주요 상징별 해몽\]/g, '"꿈속 주요 상징별 해몽"');
mockContent = mockContent.replace(/\[종합 운세 징조\]/g, '"종합 운세 징조"');

fs.writeFileSync(mockPath, mockContent, 'utf8');
console.log('mockResponses.js patched successfully!');
