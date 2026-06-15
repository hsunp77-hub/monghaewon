// ── Mock Response Generator for Monghaewon (Richer, Symbol-by-Symbol Analysis) ──

// ── Robust Matcher Helpers for Korean text ──
function hasWater(dream) {
  const matches = [
    "물 ", "물이", "물을", "물에", "물속", "물소리", "강물", "강이 ", "강을 ", "바다", 
    "홍수", "폭포", "비가", "비를", "빗물", "소나기"
  ];
  const exactWater = /(?:^|\s)(물|강|비)(?:[이을에과로속가]|\s|$)/.test(dream);
  return matches.some(k => dream.includes(k)) || exactWater;
}

function hasFire(dream) {
  const matches = ["불길", "화재", "불꽃", "활활", "연기", "폭발", "화염"];
  const exactFire = /(?:^|\s)불(?:[이을에과로속가꽃길]|\s|$)/.test(dream) || /타[는고아어였]다/.test(dream) || dream.includes("타버");
  return matches.some(k => dream.includes(k)) || exactFire;
}

function hasAnimal(dream) {
  const matches = ["강아지", "고양이", "백구", "흑구", "황구", "뱀", "백사", "흑사", "청사", "호랑이", "사자", "동물"];
  const exactDog = /(?:^|\s)(개|뱀)(?:[이을에과로속가]|\s|$)/.test(dream);
  return matches.some(k => dream.includes(k)) || exactDog;
}

function hasFlight(dream) {
  return dream.includes("하늘") || dream.includes("비행") || dream.includes("우주") || /날[아어으]다/.test(dream) || dream.includes("날아");
}

function hasFall(dream) {
  return dream.includes("추락") || dream.includes("절벽") || dream.includes("낭떠러지") || /떨어[진졌지]다/.test(dream) || dream.includes("떨어");
}

function hasChase(dream) {
  return dream.includes("쫓기") || dream.includes("도망") || dream.includes("경찰") || dream.includes("도둑") || dream.includes("괴물") || dream.includes("숨었") || dream.includes("숨기");
}

export function getMockLeeFirstResponse(dream) {
  const analyses = [];
  
  if (dream.includes("작가") || dream.includes("사진")) {
    analyses.push(`• "외국작가와 사진 촬영": 융 심리학에서 '유명한 타인'은 자아(Ego)가 지향하거나 억압해 온 이상적 투사체입니다. 다른 사람들은 못 알아보는데 본인만 알아보고 사진을 고른 행위는, 남들이 보지 못하는 본인의 고유한 예술적·창조적 가능성이나 잠재력을 의식 표면으로 끌어올려 통합(Integration)하려는 자아의 적극적인 시도이자 자부심의 표현으로 보입니다.`);
  }
  if (dream.includes("여행") || dream.includes("밴") || dream.includes("차를") || dream.includes("차가") || dream.includes("자동차") || dream.includes("운전")) {
    analyses.push(`• "차량 여정과 운전": 여행이나 운전은 삶의 과도기나 새로운 자아의 방향성을 상징하는 고전적인 무의식적 이동입니다. 특히 차량을 타고 나아가는 것은 내적인 동력과 삶의 궤적 변화를 나타냅니다.`);
  }
  if (dream.includes("쌍둥이") || dream.includes("아이") || dream.includes("남자애") || dream.includes("여자애")) {
    analyses.push(`• "쌍둥이 아동": 남녀 쌍둥이는 내면의 남성성(Animus)과 여성성(Anima)의 분열 혹은 균형을 지시합니다. 사회적 기준(페르소나)에 부합하는 측면은 수용하되, 미가공된 본질적인 내면의 측면은 무의식 저편에 남겨두려는 심리적 갈등을 읽어낼 수 있습니다.`);
  }
  if (dream.includes("방이") || dream.includes("방을") || dream.includes("방에") || dream.includes("누워") || dream.includes("뒹굴")) {
    analyses.push(`• "안전한 방과 휴식": 외부 자극으로부터 자아를 임시 보호하려는 내적인 안식처(Refuge)입니다. 치열한 현실 속에서도 무의식적으로 긴장을 풀고 내면의 에너지를 회복하고자 하는 심리적 욕구를 드러냅니다.`);
  }
  if (dream.includes("짜장") || dream.includes("밥") || dream.includes("먹으") || dream.includes("동생")) {
    analyses.push(`• "동생의 음식(짜장밥) 준비": 융의 관점에서 음식을 요리하고 나누는 행위는 정신적 영양 공급(Psychic Nourishment)을 뜻합니다. 가까운 형제(동생)가 밥을 짓는 것은 자아의 친밀한 자매 인자로부터 정서적인 보살핌 and 에너지 공급을 받고자 하는 무의식의 온화한 위로입니다.`);
  }
  if (dream.includes("스키") || dream.includes("새벽")) {
    analyses.push(`• "새벽 스키장 질주": 겨울의 스키장은 정서적으로 다소 차갑거나 동결된 현실 상황을 의미하며, 새벽에 스키를 타는 속도감은 통제 지향적 모험을 뜻합니다. 감정의 억압을 뚫고 속도감 있게 상황을 극복해 나가고자 하는 자아의 투지입니다.`);
  }
  if (dream.includes("머리") || dream.includes("자르") || dream.includes("단발")) {
    analyses.push(`• "스스로 긴 머리를 단발로 자름": 머리카락은 융 심리학에서 오랜 생각의 타래, 축적된 감정적 애착, 혹은 사회적 권위를 대변합니다. 타인의 손이 아닌 '스스로' 긴 머리를 싹둑 잘라내는 행위는 구습과 불필요한 생각의 고리를 과감하게 정리하고 새 출발하겠다는 강력한 주체적 결단과 자아 변환(Transformation)의 징조입니다.`);
  }
  
  // Checking water, fire, animal, flight, fall, chase with robust matching
  if (hasWater(dream)) {
    analyses.push(`• "원초적인 물의 범람과 이동": 무의식의 심연과 억눌린 감정적 에너지의 임계점을 상징합니다. 감정이 흘러넘치거나 정화되고 있음을 뜻합니다.`);
  }
  if (hasFire(dream)) {
    analyses.push(`• "타오르는 불길": 기존의 형태를 태워 없애고 새로 탄생하려는 파괴적이면서도 창조적인 에너지를 의미합니다.`);
  }
  if (hasAnimal(dream)) {
    analyses.push(`• "동물의 조우": 이성 아래 숨겨진 생명력과 길들여지지 않은 원초적인 본능적 자아를 나타냅니다.`);
  }
  if (hasFlight(dream)) {
    analyses.push(`• "하늘 비행": 중력과 현실 제약으로부터 탈피하려는 무의식적인 초월적 보상 혹은 회피 성향을 나타냅니다.`);
  }
  if (hasFall(dream)) {
    analyses.push(`• "자유 낙하/추락": 통제력 상실에 대한 원초적인 두려움이나, 지나치게 팽창된 에고를 가라앉히라는 경고입니다.`);
  }
  if (hasChase(dream)) {
    analyses.push(`• "도망침과 추격": 마주하기 두려운 내면의 그림자(Shadow)로부터 도망치려 하지만 역설적으로 직면해야 할 때가 왔음을 알립니다.`);
  }

  // Fallback if no keywords matched
  if (analyses.length === 0) {
    analyses.push(`• "낯선 공간과 만남": 융 분석심리학적으로 꿈속의 낯선 장소와 예기치 못한 흐름은 현재 의식적인 일상의 안정성을 흔들고, 자아(Ego)가 새로운 성장 단계로 진입하는 과정에서 발생하는 성장의 진통을 의미합니다.`);
  }

  const concepts = [];
  if (dream.includes("작가") || dream.includes("사진")) concepts.push("창조적 에너지(외국작가, 사진)");
  if (dream.includes("여행") || dream.includes("밴") || dream.includes("차를") || dream.includes("차가") || dream.includes("자동차") || dream.includes("운전")) concepts.push("방향 전환(여행, 운전)");
  if (dream.includes("쌍둥이") || dream.includes("아이")) concepts.push("의식과 무의식의 균형(쌍둥이)");
  if (dream.includes("방이") || dream.includes("방을") || dream.includes("방에")) concepts.push("정신적 안식처(안전한 방)");
  if (dream.includes("짜장") || dream.includes("밥") || dream.includes("동생")) concepts.push("정서적 영양 공급(동생의 밥)");
  if (dream.includes("스키") || dream.includes("새벽")) concepts.push("현실 극복의 의지(새벽 스키)");
  if (dream.includes("머리") || dream.includes("자르") || dream.includes("단발")) concepts.push("감정 정리(머리 자르기)");
  if (hasWater(dream)) concepts.push("무의식의 감정 정화(물)");
  if (hasFire(dream)) concepts.push("창조와 파괴의 열정(불)");
  if (hasAnimal(dream)) concepts.push("원초적 본능과의 조우(동물)");
  if (hasFlight(dream)) concepts.push("초월적 상상과 보상(비행)");
  if (hasFall(dream)) concepts.push("에고의 비대함 경고(추락)");
  if (hasChase(dream)) concepts.push("그림자의 직면과 대면(추격)");

  let summaryText = "";
  if (concepts.length > 0) {
    summaryText = `이 꿈은 전체적으로 본인의 ${concepts.join(", 및 ")}을 향해 나아가면서 내면을 조율하고 의식과 무의식의 균형을 맞추고자 요동치는 과도기적 역동을 고스란히 비춰주고 있습니다.`;
  } else {
    summaryText = `이 꿈은 전체적으로 본인이 마주한 의식적 일상의 변화에 적응하고, 새로운 무의식적 성장 단계로 진입하는 과정에서 발생하는 심리적 역동을 고스란히 비춰주고 있습니다.`;
  }

  return `이선영 박사입니다. 올려주신 꿈의 전체적인 내용과 세부 흐름을 꼼꼼히 살펴보았습니다. 적어주신 서사는 여러 상징물이 아주 유기적으로 얽혀 있는 한 편의 거대한 정신적 지도와 같습니다.

"꿈속 주요 상징 분석"
${analyses.join("\n\n")}

"종합 심리 상태 조명"
${summaryText}

꿈속에서 여러 상황들이 빠르게 전개되며 분주하게 움직였는데, 이 과정에서 당신이 마음속 가장 깊이 느꼈던 정서적 질감은 무언가를 새로 도모하려는 '조용한 기대감'에 가까웠습니까, 아니면 정리되지 않은 복잡함으로 인한 '은밀한 피로감'에 가까웠습니까?`;
}

export function getMockLeeSecondResponse(dream, userReply) {
  const hasHair = dream.includes("머리") || dream.includes("자르");
  const hasFood = dream.includes("짜장") || dream.includes("밥");
  let detailedSynthesis = "";
  if (hasHair || hasFood) {
    detailedSynthesis = `꿈속에서 ${hasHair ? "스스로 머리를 잘라내고 " : ""}${hasFood ? "따뜻한 밥을 함께 나눈 " : ""}사건은 당신의 내면이 오랜 번민에서 벗어나 스스로를 보살피고 안식을 제공하는 통합 작업이 매우 성공적으로 진행되고 있음을 뜻합니다.`;
  } else {
    detailedSynthesis = `꿈속에 나타난 무의식의 징조들은 현실 속 마음의 갈등을 씻어내고, 스스로를 보살피며 더 나은 자아로 나아가기 위한 통합 작업이 성공적으로 시작되고 있음을 뜻합니다.`;
  }

  return `전해주신 답변을 통해 당신의 무의식적 감정 질감인 "${userReply}"의 내면적 연결고리가 더욱 뚜렷해졌습니다.

분석심리학적 융의 관점에서 볼 때, 당신이 느낀 정서적 반응과 꿈속에서 겪은 변화는 내면의 그림자(Shadow)를 건강하게 직면하고 에너지를 방출하고 있음을 뜻합니다. ${detailedSynthesis}

이 흐름을 현실로 이어가기 위해 이선영 박사가 제안하는 마음의 처방전은 다음과 같습니다:
- 이번 주말에는 스마트폰이나 외부의 피로한 연락망에서 한 걸음 멀어져, 온전히 당신의 내면과 감정을 보살펴주는 하루를 실천하십시오.

스스로의 마음을 직시하는 결단이야말로 온전한 자기(Self)로 나아가는 지름길입니다. 이어서 청명 선생의 명리학 관점의 오행 풀이도 열어서 음양의 격을 맞추어보시길 권합니다.`;
}

export function getMockCheongFirstResponse(dream) {
  const analyses = [];
  
  if (dream.includes("작가") || dream.includes("사진")) {
    analyses.push(`• "명사와의 사진": 운세 상 본인의 명예가 외부에 비치거나 뜻밖의 신분 상승, 중요 문서 취득의 대길한 징조이외다.`);
  }
  if (dream.includes("여행") || dream.includes("밴") || dream.includes("차를") || dream.includes("차가") || dream.includes("자동차") || dream.includes("운전")) {
    analyses.push(`• "이동과 운전": 마차나 배를 타고 이동하는 형국은 사주 상 역마(驛馬)의 발흥이자 일상의 주거/환경의 대대적 이동수(이동수)를 점치게 하오.`);
  }
  if (dream.includes("쌍둥이") || dream.includes("아이") || dream.includes("남자애") || dream.includes("여자애")) {
    analyses.push(`• "쌍둥이 조우": 음양의 두 기운이 한꺼번에 들이치는 격이라, 현실 속 선택의 기로에 놓이거나 대인관계에서 큰 변동이 일어날 전조이외다.`);
  }
  if (dream.includes("방이") || dream.includes("방을") || dream.includes("방에") || dream.includes("누워") || dream.includes("뒹굴")) {
    analyses.push(`• "안전한 방": 사주 상 본인의 세력권이나 문서운(부동산 등)이 안정적으로 보호되고 있음을 일러주는 길조요.`);
  }
  if (dream.includes("짜장") || dream.includes("밥") || dream.includes("먹으") || dream.includes("동생")) {
    analyses.push(`• "동생의 요리 조리": 밥을 짓고 함께 나누는 것은 사주 길신 중 최고로 치는 '식신(食神)'과 '재성(財星)'의 조화요. 식복과 재물이 늘어나고 가정이 편안해질 온화한 기운의 발흥이오.`);
  }
  if (dream.includes("스키") || dream.includes("새벽")) {
    analyses.push(`• "새벽 스키장 질주": 스키장과 겨울은 오행 상 수(水)와 금(金)의 기운이오. 새벽의 차가운 수(水) 기운을 뚫고 나아가는 것은, 사주 내의 차갑고 정체된 수기를 본인의 활동력(木/火)으로 헤쳐나가 정면 돌파하려는 사주 역학의 형국이오.`);
  }
  if (dream.includes("머리") || dream.includes("자르") || dream.includes("단발")) {
    analyses.push(`• "머리카락을 단발로 자름": 머리카락은 오행 중 목(木) 기운에 배속되며 사람의 정신과 고집을 뜻하오. 이를 스스로 잘라낸 것은, 사주에서 금극목(金剋木)의 단호한 결단을 뜻하며, 본인을 켭켭이 가두던 목의 번뇌와 해묵은 잡념을 금(金)의 칼날로 베어내어 사주의 조후를 맞추려는 강한 의지적 작용이오.`);
  }
  
  if (hasWater(dream)) {
    analyses.push(`• "수(水)의 기운(물/바다)": 오행 상 수(水) 기운이며, 사주 상 재물과 지혜를 주관하오. 기가 맑으면 재운이 융성하나 탁하면 막힘이 생기오. 특히 큰 바다나 흐르는 물은 재물의 원천이 크게 요동침을 의미하오.`);
  }
  if (hasFire(dream)) {
    analyses.push(`• "불": 오행 상 화(火) 기운이며, 사회적 명예와 폭발적 활동을 의미하오. 사주의 정체를 태우는 강렬한 동력수요.`);
  }
  if (hasAnimal(dream)) {
    analyses.push(`• "동물": 십이지지의 동물 기운을 대변하여, 본인 사주의 지지(地支) 오행을 활성화시키는 동적 작용이오.`);
  }
  if (hasFlight(dream)) {
    analyses.push(`• "하늘 비상": 기를 위로 솟구치게 하는 목/화(木/火) 상승 운세의 정점으로, 명예운의 급상승을 뜻하오.`);
  }
  if (hasFall(dream)) {
    analyses.push(`• "낙하": 기가 하강하는 형국으로 관재수나 건강상의 기력 소모를 조심해야 함을 일러주는 하강 징조요.`);
  }
  if (hasChase(dream)) {
    analyses.push(`• "도망": 사주 기운이 설기(洩氣)되거나 일시적으로 관살(官殺)의 압박을 받아 기세가 억눌려 있음을 뜻하오.`);
  }

  if (analyses.length === 0) {
    analyses.push(`• "낯선 기운과의 조우": 사주의 일진 중 평소 보지 못했던 오행의 외풍이 불어와 현실 속 대인관계나 계약에서 작은 요동이 생길 전조이외다.`);
  }

  const concepts = [];
  if (dream.includes("머리") || dream.includes("자르") || dream.includes("단발")) concepts.push("목(木) 기운의 정리(머리 자르기)");
  if (dream.includes("스키") || dream.includes("새벽")) concepts.push("수(水)/금(金)의 기운 극복(새벽 스키)");
  if (dream.includes("짜장") || dream.includes("밥") || dream.includes("동생")) concepts.push("식신(食神)과 재성의 조화(동생의 밥)");
  if (dream.includes("운전") || dream.includes("차") || dream.includes("여행")) concepts.push("이동과 역마의 흐름(운전)");
  if (hasWater(dream)) concepts.push("수(水) 기운의 순환(바다/물)");
  if (hasFire(dream)) concepts.push("화(火) 기운의 활성화(불)");
  if (hasAnimal(dream)) concepts.push("지지 오행의 생명력(동물)");
  if (hasFlight(dream)) concepts.push("목/화(木/火) 상승 운세(비상)");
  if (hasFall(dream)) concepts.push("토/금(土/金) 기운의 하강(낙하)");

  let summaryText = "";
  if (concepts.length > 0) {
    summaryText = `이 꿈은 전체적으로 ${concepts.join(", 및 ")}을 통해 사주 전체의 조후를 맞추고 본인이 처한 사주 음양오행의 격렬한 동요와 활로의 개척을 비추고 있소.`;
  } else {
    summaryText = `이 꿈은 전체적으로 본인의 타고난 사주팔자 오행 기운에 새로운 일진의 변화를 주고, 정체된 조후를 맞춰 막힌 운의 순환을 도우려는 음양의 격렬한 동요를 비추고 있소.`;
  }

  return `청명(靑明)이외다. 다녀간 꿈의 오행(五행) 배합을 사용자의 생년월일 사주팔자 기운과 견주어 전체적으로 살펴보았소.

"꿈속 상징의 오행 분석"
${analyses.join("\n\n")}

"종합 음양 조율"
${summaryText}

사주의 막힌 구멍을 뚫기 위해 여쭙고자 하오. 이 꿈에서 깨어났을 때, 가장 선명하게 눈에 아른거렸던 색채(예: 어둠, 붉음, 푸름 등)나, 몸에서 기억하는 가장 강렬한 촉각(예: 서늘함, 뜨거움, 날카로움 등)은 어떤 기운에 더 닿아 있었소?`;
}

export function getMockCheongSecondResponse(dream, userReply) {
  const hasHair = dream.includes("머리") || dream.includes("자르");
  const hasCar = dream.includes("여행") || dream.includes("밴") || dream.includes("차") || dream.includes("운전");
  let detailedSynthesis = "";
  if (hasHair || hasCar) {
    detailedSynthesis = `${hasHair ? "머리카락을 스스로 잘라내고 " : ""}${hasCar ? "차를 타고 질주한 " : ""}것은, 당신을 옭아매던 불필요한 인맥이나 생각의 고리를 끊고 역마(驛馬)의 힘찬 동력으로 도약할 때가 도래했음을 증명하오.`;
  } else {
    detailedSynthesis = `꿈속에서 만난 오행의 흔적은 당신을 가로막던 잡념과 해묵은 방해물을 단호하게 걷어내고, 새로운 기운의 통로를 열어 힘차게 도약할 준비가 되었음을 증명하오.`;
  }

  return `들려주신 색감과 감각의 편린인 "${userReply}"의 기운을 사주 원국과 대조하여 살펴보니, 막혀 있던 기의 순환 통로가 비로소 뚫리는 형국이 뚜렷이 드러나는구려.

명리학적으로 당신이 느끼신 오행의 감각은 사주의 조후를 맞추는 최적의 조율 수단이오. ${detailedSynthesis}

다가올 목요일(목/화 운)에는 정서적인 안정이 크게 올 것이며, 토요일 야간에는 북쪽 방향의 출입을 삼가고 백색이나 황색 계열의 소품을 곁에 두는 것이 쇠해진 금(金)의 기운을 보강하여 일진 상의 불의의 충돌을 예방하는 묘수가 될 것이오.

이 오행의 기운이 마음속 깊은 심연에서는 어떠한 감정적 흐름으로 작용하고 있었는지, 이제 분석심리학자인 이선영 박사에게 연결하여 최종적인 마음 처방을 받아보시구려.`;
}

export function getMockForetellFirstResponse(dream) {
  const analyses = [];

  if (dream.includes("작가") || dream.includes("사진")) {
    analyses.push(`• "명사와 만나 사진을 남김": 오냐, 꿈에 이름난 양반이랑 사진을 찰칵 박은 것은 현실에서 이름 꽤나 날리는 귀인을 만나거나 평소 바라고 바라던 큰 계약 문서가 딱 네 손안에 들어오게 될 아주 경사스러운 길몽이란다.`);
  }
  if (dream.includes("여행") || dream.includes("밴") || dream.includes("차를") || dream.includes("차가") || dream.includes("자동차") || dream.includes("운전")) {
    analyses.push(`• "탈것을 타고 이동": 마차나 바퀴 달린 큰 탈것을 타고 붕붕 멀리 달리는 꿈은 이사든 이직이든 네 둥지가 크게 바뀌고 발 딛는 터전이 넓어질 이동수가 성큼 다가왔다는 하늘의 신호란다.`);
  }
  if (dream.includes("쌍둥이") || dream.includes("아이") || dream.includes("남자애") || dream.includes("여자애")) {
    analyses.push(`• "쌍둥이 조우": 눈앞에 똑 닮은 쌍둥이가 떡 하니 나타난 것은 네 앞에 고르기 힘든 중대한 갈림길이나 두 갈래의 현실적인 이권 다툼이 조만간 벌어진다는 경고란다.`);
  }
  if (dream.includes("방이") || dream.includes("방을") || dream.includes("방에") || dream.includes("누워") || dream.includes("뒹굴")) {
    analyses.push(`• "방과 휴식": 변화무쌍한 이동수 와중에도 아늑한 방구석에 누워 뒹굴거리는 것은 현실이 아무리 시끄럽고 어지러워도 네 밥줄이나 안전지대만큼은 귀신같이 단단히 지켜질 징조이니 염려할 거 없단다.`);
  }
  if (dream.includes("짜장") || dream.includes("밥") || dream.includes("먹으") || dream.includes("동생")) {
    analyses.push(`• "음식 준비와 대접": 동생이나 어린 녀석이 고소한 음식을 가져와 대접하는 꿈은 네 집안 식솔들이 화목해지고, 네 먹고살 길에 조력자가 붙어 쏠쏠한 먹거리나 횡재수가 굴러 들어올 아주 든든한 꿈자리란다.`);
  }
  if (dream.includes("스키") || dream.includes("새벽")) {
    analyses.push(`• "얼음산에서 동트기 전 활강": 동도 안 튼 한밤중에 미끄러운 얼음산을 쌩쌩 달리는 것은 네가 발 딛은 현실이 몹시 춥고 거칠지라도, 네 영리한 재치와 남다른 속도로 남보다 앞서서 먹을 걸 싹 채갈 기막힌 재주를 보인다는 뜻이다.`);
  }
  if (dream.includes("머리") || dream.includes("자르") || dream.includes("단발")) {
    analyses.push(`• "스스로 머리를 자름": 제 손으로 머리통을 싹둑 자르는 꿈은 오랫동안 네 가슴을 답답하게 짓누르고 괴롭히던 지긋지긋한 골칫거리랑 우환을 네 칼 같은 결단으로 한순간에 싹 베어낼 대길조 중의 대길조란다!`);
  }
  
  if (hasWater(dream)) {
    analyses.push(`• "물/바다": 사방팔방에서 맑은 물이 콸콸 쏟아져 들어오는 꿈은 집안에 재물이 화수분마냥 모여들고 사업에 물꼬가 탁 트일 대단한 경사란다. 깊고 넓은 바다를 보았다면 관청이나 회사에서 큰 기쁜 소식이 당도할 게야.`);
  }
  if (hasFire(dream)) {
    analyses.push(`• "불": 활활 타오르는 불구덩이는 네 이름 석 자가 세상에 널리 알려지고 집안 사업이 번창할 활활 불꽃 같은 길몽이란다.`);
  }
  if (hasAnimal(dream)) {
    analyses.push(`• "동물": 영험한 동물이 나타나는 것은 네게 덕을 베풀 귀인이 찾아오거나 기막히게 영리한 자손이 생길 태몽과도 연결되는 귀한 징조란다.`);
  }
  if (hasFlight(dream)) {
    analyses.push(`• "비상": 하늘 높이 둥둥 떠서 날아오르는 것은 네 지위나 평판이 크게 올라가서 사람들의 칭송을 한 몸에 받을 전조란다.`);
  }
  if (hasFall(dream)) {
    analyses.push(`• "추락": 벼랑 끝에서 밑도 끝도 없이 떨어지는 꿈은 네 기운이 바닥나거나 갑자기 몸을 다칠 우환이 생길 수 있으니 며칠간은 행여나 발걸음 조심하고 몸을 조아려야 하느니라.`);
  }
  if (hasChase(dream)) {
    analyses.push(`• "추격": 무언가에게 쫓겨 헐떡거리는 꿈은 현실의 번잡한 일이나 얄미운 훼방꾼 때문에 마음고생과 피로가 겹칠 터이니, 당분간은 쉬어가거라.`);
  }

  if (analyses.length === 0) {
    analyses.push(`• "기이한 풍경과 마주함": 낯선 기운이 맴도는 곳을 마주한 것은 조만간 가보지 않은 낯선 터전이나 만난 적 없는 귀인과 중대한 계약이나 약조를 맺을 징조란다.`);
  }

  const concepts = [];
  if (dream.includes("머리") || dream.includes("자르") || dream.includes("단발")) concepts.push("답답하던 골칫거리 청산");
  if (dream.includes("스키") || dream.includes("새벽")) concepts.push("거친 경쟁 속의 활로 개척");
  if (dream.includes("작가") || dream.includes("사진")) concepts.push("귀인과의 경사스러운 조우");
  if (dream.includes("짜장") || dream.includes("밥") || dream.includes("동생")) concepts.push("식솔들과의 돈독한 화합");
  if (dream.includes("운전") || dream.includes("밴") || dream.includes("여행")) concepts.push("큰 터전의 변화와 이동수");
  if (hasWater(dream)) concepts.push("재물과 문서의 풍성한 물꼬");
  if (hasFire(dream)) concepts.push("폭발적인 기운의 번창");
  if (hasAnimal(dream)) concepts.push("영험한 귀인의 보살핌");

  let summaryText = "";
  if (concepts.length > 0) {
    summaryText = `내 신기 어린 눈으로 쭉 훑어보니, 이번 꿈은 네가 가진 ${concepts.join(", 그리고 ")}을 아주 똑똑히 보여주고 있구나. 앞으로 네 앞길이 훤히 뚫릴 운수란다.`;
  } else {
    summaryText = `내 신기 어린 눈으로 쭉 훑어보니, 이번 꿈은 네 막힌 살들이 비켜나고 새로운 활로와 인연이 닿아서 인생의 큰 경사가 생길 운수란다.`;
  }

  return `몽화 할미란다! 네가 어제 다녀간 꿈의 자국들을 내 신통방통한 눈으로 샅샅이 비춰 보았단다. 꿈이라는 건 다가올 길흉을 무당의 방울소리처럼 미리 귀띔해 주는 거울이니 절대 귓등으로 흘려들어선 안 되느니라.

"꿈자리 주요 상징과 예지몽 풀이"
${analyses.join("\n\n")}

"할미가 일러주는 종합 길흉 징조"
${summaryText}

앞길을 더 똑똑히 내다보고 영험한 비방을 내어주마. 어서 대답해 보거라. 어젯밤 꿈을 깨고 일어났을 때, 머리속이 시원하고 개운하여 몸이 나풀거리더냐, 아니면 밤새 먼 길을 헤맨 듯 온몸이 무겁고 찌뿌둥하더냐?`;
}

export function getMockForetellSecondResponse(dream, userReply) {
  const hasHair = dream.includes("머리") || dream.includes("자르");
  const hasFood = dream.includes("짜장") || dream.includes("밥");
  const hasSki = dream.includes("스키");
  let detailedSynthesis = "";
  if (hasHair || hasFood || hasSki) {
    detailedSynthesis = `${hasHair ? "머리칼을 싹둑 자르고 " : ""}${hasFood ? "남한테 맛나게 대접하고 " : ""}${hasSki ? "추운 겨울 새벽 활강을 쌩쌩 질주한 " : ""}몸짓들은 현실에서 요 아래 두 가지 일들로 들이닥칠 게야.`;
  } else {
    detailedSynthesis = `어젯밤 보인 상서로운 기운과 눈짓들은 현실에서 요 아래 두 가지 일들로 들이닥칠 게야.`;
  }

  return `네가 말한 깨어났을 때의 기운인 "${userReply}"을 보아하니, 네 꿈에 서린 미래의 예언이 한층 더 뚜렷하게 다가오는구나.

우리 전통 무속과 신점 해몽에서는 꿈에서 깨어났을 때의 몸 상태가 다가올 운수의 속도와 맞아떨어지느니라. ${detailedSynthesis}

첫째, 앞으로 열흘 이내에 오랜 결정을 미루어 오던 둥지의 이동이나 중대한 자격증 혹은 계약 문서가 기적같이 네 품에 쏙 들어올 소식이 있겠구나.
둘째, 다음 주 화요일이나 목요일 사이에 가까운 식솔이나 옛 동료 사이에 얽혀 있던 해묵은 갈등과 푼돈 계산이 시원하게 풀려서 집안에 화평이 돌 징조란다.

다만, 부정 타지 않게 다음 주 수요일 밤 8시가 넘어가면 밖에서 나돌지 말고 일찍 귀가하여 네 기운을 다독이거라. 대문 앞에 굵은 소금을 세 줌 뿌려두거나 네 주머니에 붉은 팥 일곱 알을 고이 넣어 다녀라. 모진 액이 귀신같이 비껴갈 게다. 이 신비로운 징조가 네 마음속과 어떻게 닿아 있는지는 저 융 학자 이선영 박사의 말을 마저 들어서 너를 다스려 보아라.`;
}

export function getMockLeeResponse(dream, userReply, firstExpertReply, birthdate) {
  const hasHair = dream.includes("머리") || dream.includes("자르");
  const hasFood = dream.includes("짜장") || dream.includes("밥");
  let detailedSynthesis = "";
  if (hasHair || hasFood) {
    detailedSynthesis = `꿈속에서 ${hasHair ? "스스로 긴 머리를 잘라 단발로 만들고, " : ""}${hasFood ? "동생이 따뜻한 밥을 지어 함께 나눈 " : ""}사건은 당신의 내면이 오랜 번민에서 벗어나 스스로를 보살피고 안식을 제공하는 '자기 치료적(Self-healing)' 통합 작업이 매우 성공적으로 진행되고 있음을 뜻합니다.`;
  } else {
    detailedSynthesis = `꿈속의 징조들은 당신의 내면이 오랜 갈등에서 벗어나 스스로를 보살피고 안식을 제공하는 '자기 치료적(Self-healing)' 통합 작업이 성공적으로 진행되고 있음을 뜻합니다.`;
  }

  const isMonghwa = firstExpertReply && (firstExpertReply.includes("할미") || firstExpertReply.includes("몽화") || firstExpertReply.includes("소금"));
  const expertName = isMonghwa ? "무속인 몽화님" : "청명 선생님";

  return `이선영 박사입니다. ${expertName}께서 꿈에 서린 징조와 예측을 아주 직관적이고 날카롭게 짚어 주셨군요.

분석심리학적으로 당신이 ${expertName}와의 문답에서 내놓으신 감각적 잔상인 "${userReply}"과 ${expertName}의 예측은, 당신의 의식적 자아(Ego)가 그동안 억압해 온 내면의 무의식적 콤플렉스와 긴밀히 동기화되어 나타나는 싱크로니시티(Synchronicity, 동시성)의 증거입니다. 융에 따르면, 외부의 징조나 꿈속의 기운은 우리 마음의 원형적 에너지 흐름과 본질적으로 같습니다.

${detailedSynthesis}

이제 그림자가 요구하는 주체적 결단과 결실의 기운을 현실 속에서도 그대로 실천해 나가십시오. 불안을 마주하고 스스로를 다스려 마침내 온전한 내면의 평화를 이루시길 이선영 박사가 진심으로 응원합니다.`;
}

export function getMockCheongResponse(dream, userReply, firstExpertReply, birthdate) {
  const hasHair = dream.includes("머리") || dream.includes("자르");
  const hasSki = dream.includes("스키");
  let detailedSynthesis = "";
  if (hasHair || hasSki) {
    detailedSynthesis = `꿈속에서 ${hasHair ? "단발로 머리를 자르고 " : ""}${hasSki ? "새벽 스키장에서 질주한 " : ""}에너지는 사주 내에 얽혀 있던 고집 센 목(木) 기운을 절단하고, 막혀 있던 수(水)기를 힘차게 순환시키는 조후의 발현이오.`;
  } else {
    detailedSynthesis = `꿈에 나타난 오행의 에너지는 사주 내에 정체되어 있던 막힌 기운들을 씻어내고 힘차게 순환시키는 조후의 조화로운 발현이오.`;
  }

  const isMonghwa = firstExpertReply && (firstExpertReply.includes("할미") || firstExpertReply.includes("몽화") || firstExpertReply.includes("소금"));
  const isLee = firstExpertReply && (firstExpertReply.includes("이선영") || firstExpertReply.includes("분석심리학") || firstExpertReply.includes("그림자"));
  
  let refText = "기존에 풀이된 해석";
  if (isLee) {
    refText = "이선영 박사의 무의식 분석";
  } else if (isMonghwa) {
    refText = "무속인 몽화의 신점 징조";
  }

  return `청명(靑明)이외다. ${refText}을 바탕으로, 태어나신 생년월일 ${birthdate}의 오행 성쇠를 꾸신 꿈의 전체 줄거리와 종합적으로 조율해 보았소.

이전 분석이 짚어낸 자아의 주체적 정리와 흐름은 명리학 상으로 금(金) 기운의 기민한 작용과 일치하오. ${detailedSynthesis} 

1. 꿈의 최종 격(格): 꾸신 꿈은 본인의 인생 변환점에서 찾아든 명백한 예지몽(豫知夢)의 성격이 매우 짙소.
2. 구체적 현실 예측: 다가올 10일 이내에 평소 갈망하던 일(문서 취득, 이직, 승진 등)에서 동남방으로부터 뜻밖의 기쁜 소식이 도착하거나 귀인이 문을 두드릴 것이오.
3. 조심하고 취할 기운: 목요일 야간에는 기의 소모가 많으니 가벼운 산책 외의 외출을 삼가고, 황색이나 푸른색 계열의 소품을 늘 몸에 지녀 사주의 조화를 완성해 보시오.`;
}

export function getMockReport(dreams, birthdate, analysisFocus) {
  const isForetelling = analysisFocus === "foretelling";
  const baseReport = {
    leeReport: {
      repeatSymbols: "3개 꿈에서 일관되게 발견되는 물, 공간적 미로, 낯선 인물은 자아가 의식적으로 외면하려 했던 감정의 심연과 그림자(Shadow)를 상징합니다. 융의 원형 관점에서 이는 억압된 콤플렉스와 직면하여 통합을 이룰 것을 요구하고 있습니다.",
      shadowMessage: "당신이 감당하기 힘들다고 느껴 피해왔던 정서적 실체를 그대로 수용하라는 무의식의 전언입니다. 통제하려 들지 않고 직시할 때 비로소 심리적 해방감이 다가올 것입니다.",
      dreamFlow: "1일차에 보였던 막막한 불안의 태도가 3일차에 이르러 주체적인 소통과 의지적 탐색으로 이행하는 긍정적인 심리 변화의 흐름을 보여줍니다.",
      prescription: "하루 10분, 조용한 공간에서 떠오르는 불안한 감정에 거리를 두고 이름을 지어 불러주는 훈련을 해보세요.",
      closing: "무의식이 내비친 그 어둠은 당신이 빛으로 나아가기 위해 반드시 짚고 가야 할 축복의 시작점입니다."
    }
  };

  if (isForetelling) {
    baseReport.halmaeReport = {
      dreamType: "3일간의 꿈자리는 음울한 살이 서서히 걷히고 새로운 길조와 재물의 문이 활짝 열리는 전형적인 길몽이자 예지몽이란다.",
      ohangFlow: "조상이나 집안 터주신의 보살핌이 깃든 기운이 느껴지니, 그동안 지체되고 꼬였던 일들이 비바람 갠 뒤 개듯 풀려갈 게다.",
      monthlyYun: "이번 달은 문서나 재물운의 흐름이 왕성해지는 절기이니, 꿈속에서 본 징조들이 그 기운을 힘차게 밀어주고 있구나.",
      prediction: "향후 2주 내인 다가올 25일 전에 뜻밖의 계약 문서나 횡재수가 생길 것이며, 29일 동북방에서 우연히 마주치는 이가 도움을 줄 게다.",
      caution: "화요일 밤 10시 이후에는 밖에 돌아다니지 말고 몸을 사리는 게 좋단다.",
      luck: "대문 앞에 굵은 소금을 세 줌 뿌려 액을 막거나, 주머니에 붉은 팥 일곱 알을 고이 넣어 다녀라.",
      closing: "할미가 일러준 비방을 가볍게 여기지 말고 몸을 조심히 하면 만사가 귀신같이 풀려갈 게다."
    };
  } else {
    baseReport.cheongReport = {
      dreamType: "3일간의 꿈 기록은 음기가 강하게 고였다가 점차 활로를 개척해 나가는 형국으로, 다가올 일의 조짐을 일러주는 경고몽과 앞길의 귀인을 알려주는 예지몽의 조화로운 결합이오.",
      ohangFlow: "수(水) 기운의 범람이 목(木)의 통로를 거쳐 서서히 화(火) 기운으로 소통되어 가고 있으니, 사주 내의 정체된 흐름이 풀리기 시작하는 대길(大吉)의 징조라 볼 수 있소.",
      monthlyYun: "이번 달은 사주 내 목의 성장이 활발해져 기운의 소통을 돕는 시기이며, 꿈들의 정화 작용이 이러한 흐름을 가속하고 있소.",
      prediction: "향후 2주 내인 다가올 25일 전후로 문서나 금전적 맺음에서 뜻밖의 희소식이 올 것이며, 29일 동북방에서 우연히 만나게 될 인연이 귀인이 될 것이오.",
      caution: "화요일 야간 10시 이후 외출이나 불필요한 장거리 이동은 몸의 기를 소모하니 피하는 것이 좋소.",
      luck: "푸른 기운이 서린 옷을 취하거나, 해 뜨는 오전 8시에서 10시 사이 동쪽을 보며 심호흡을 하오.",
      closing: "하늘이 미리 일러주는 기운을 어기지 아니하고 묵묵히 몸과 마음을 갈고닦으면 만사가 조화롭게 풀릴 것이니 안심하시오."
    };
  }
  return baseReport;
}
