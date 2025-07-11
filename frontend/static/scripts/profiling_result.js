document.addEventListener("DOMContentLoaded", function () {
  // 결과 카드 HTML 5개를 미리 준비해 둔다.
  const cards = [
    // 0점~4점 구간 (아래에 카드 HTML 넣기)
    `              <div class="profiling-result-card">
                <div class="result-block result-block-1">
                  <img
                    src="../assets/result1_illust1.png"
                    class="result-illust"
                    alt="일러스트1"
                  />
                  <h2 class="result-main-title">
                    김여기 님은<br />
                    <span class="em">신뢰와 존중이 가득한</span>안정적인 관계에
                    있습니다.
                  </h2>
                  <div class="result-desc">
                    <p>
                      두 분은 서로의 생각과 감정을 솔직하게 나누고, 다툼이
                      있어도 대화로 잘 풀어가는 편입니다. <br />각자의 삶을
                      존중하며, 서로에게 긍정적인 에너지를 주는 건강한 연애를
                      하고 있습니다.<br />
                    </p>
                  </div>
                  <h2 class="result-main-title">이렇게 행동해 보세요.</h2>
                  <ul class="result-actions">
                    <li>
                      <span class="strong">감사와 애정을 표현하세요</span><br />
                      <span class="result-desc"
                        >고마움과 사랑의 말을 자주 나누면 신뢰가 더욱
                        깊어집니다.</span
                      >
                    </li>
                    <li>
                      <span class="strong">서로의 경계를 존중하세요</span><br />
                      <span class="result-desc"
                        >개인의 시간과 취미도 소중히 여기며, 서로에게 자유를
                        주세요.</span
                      >
                    </li>
                    <li>
                      <span class="strong"
                        >문제가 생기면 솔직하게 대화하세요</span
                      ><br />
                      <span class="result-desc"
                        >오해나 서운함은 쌓이지 않게 바로 이야기하는 것이
                        중요합니다.<br />
                        계속해서 원만한 관계를 유지할 수 있어요.</span
                      >
                    </li>
                  </ul>
                </div>
                <hr class="result-hr" />
                <div class="result-block result-block-2">
                  <img
                    src="../assets/result1_illust2.png"
                    class="result-illust"
                    alt="일러스트2"
                  />
                  <h2 class="result-main-title">
                    김여기 님의 연인은<br />
                    <span class="em">따뜻하고 배려심 많은 사람</span>일 가능성이
                    높습니다.
                  </h2>
                  <div class="result-desc">
                    <p>
                      상대방은 자신의 감정을 잘 표현하고, 김여기님의 감정도
                      세심하게 살피며 존중해 줍니다. <br />
                      두 분 모두 상대를 신뢰하며, 갈등 상황에서도 서로를
                      탓하기보다는 <br />이해하려고 노력합니다.
                    </p>
                  </div>
                  <h3 class="result-main-title">이런 부분을 주의하세요.</h3>
                  <ul class="result-cautions">
                    <li>
                      <span class="strong">과도한 의존</span><br />
                      <span class="result-desc"
                        >너무 상대에게만 기대지 않고 스스로의 삶도 균형 있게
                        지켜주세요.</span
                      >
                    </li>
                    <li>
                      <span class="strong">작은 오해 방치</span><br />
                      <span class="result-desc"
                        >사소한 불만도 그냥 넘기지 말고, 서로에게 진심을
                        말해보세요.</span
                      >
                    </li>
                  </ul>
                </div>
                <div class="result-final-msg">
                  <h2 class="result-main-title">마지막으로</h2>
                  <p class="result-desc">
                    건강한 관계는 둘의 노력이 함께할 때 더 단단해집니다. 서로를
                    아끼는 마음을 <br />지속적으로 표현하면서, 각자의 삶도
                    소중히 여겨주세요.
                  </p>
                  <p class="result-desc">
                    <br />
                    김여기 님의 행복한 연애를 응원합니다.
                  </p>
                </div>
              </div>`,
    // 5~8점
    `  <div class="profiling-result-card">
                <div class="result-block result-block-1">
                  <img
                    src="../assets/result2_illust1.png"
                    class="result-illust"
                    alt="일러스트1"
                  />
                  <h2 class="result-main-title">
                    김여기 님은<br />
                    <span class="em">소소한 갈등</span>이 잦은 연애를 하고 있습니다. 
                  </h2>
                  <div class="result-desc">
                    <p>
                      기본적으로 안정적인 관계지만, 때때로 감정 표현이 서툴러<br /> 오해가 생기거나, 서로의 입장이 잘 전달되지 않아<br />작은 다툼이 일어날 수 있습니다.<br /><br /></p>
                      이런 경우에는 서로 더 많은 관심과 노력이 필요합니다.
                    </p>
                  </div>
                  <h2 class="result-main-title">이렇게 행동해 보세요.</h2>
                  <ul class="result-actions">
                    <li>
                      <span class="strong"
                        >감정을 솔직하게 표현하세요</span
                      ><br />
                      <span class="result-desc"
                        >속상한 점이나 원하는 바를 숨기지 말고 부드럽게 이야기해보세요.</span>
                    </li>
                    <li>
                      <span class="strong">작은 문제도 무시하지 마세요</span
                      ><br />
                      <span class="result-desc"
                        >사소한 갈등이 쌓이지 않게 바로 해결하려고 노력하세요.</span
                      >
                    </li>
                    <li>
                      <span class="strong">상대방의 입장을 들어보세요</span><br />
                      <span class="result-desc"
                        >내 생각만 고집하지 않고, 연인의 이야기를 경청해보세요.</span
                      >
                    </li>
                  </ul>
                </div>
                <hr class="result-hr" />
                <div class="result-block result-block-2">
                  <img
                    src="../assets/result2_illust2.png"
                    class="result-illust"
                    alt="일러스트2"
                  />
                  <h2 class="result-main-title">
                    김여기 님의 연인은<br />
                    <span class="em">감정 표현에 서툰 사람</span>일 가능성이
                    높습니다.
                  </h2>
                  <div class="result-desc">
                    <p>
                      상대방은 가끔 자신의 감정을 잘 드러내지 못하거나,
                      별일 아닌 것에도<br /> 쉽게 서운해할 수 있습니다. 이런 경향 때문에 자주 오해가 <br />생기거나, 서로 감정이 쌓일 수 있습니다.
                    </p>
                  </div>
                  <h3 class="result-main-title">이런 부분을 주의하세요.</h3>
                  <ul class="result-cautions">
                    <li>
                      <span class="strong">무심한 행동</span><br />
                      <span class="result-desc"
                        >일상 속 무심한 말이나 행동이 상대를 더 서운하게 할 수 있습니다.</span
                      >
                    </li>
                    <li>
                      <span class="strong">사과와 용서의 부족</span><br />
                      <span class="result-desc"
                        >작은 다툼이 오래가지 않도록, 사과와 용서를 자연스럽게 나눠주세요.<br /> 서로의 입장에서 생각하며 마음의 거리를 조금씩 다시 좁혀가세요.</span
                      >
                    </li>
                  </ul>
                </div>
                <div class="result-final-msg">
                  <h2 class="result-main-title">마지막으로</h2>
                  <p class="result-desc">
                    오해나 갈등은 관계의 성장 기회가 될 수 있습니다.<br />
                    솔직한 대화와 서로를 이해하려는 마음이 쌓이면, 관계는 한층 더 깊어질 것입니다.
                  </p>
                  <p class="result-desc"><br />
                    김여기 님은 작은 용기로 관계를 다시 이어갈 수 있는 힘이 있어요.
                  </p>
                </div>
              </div>`,
    // 9~12점
    `  <div class="profiling-result-card">
                <div class="result-block result-block-1">
                  <img
                    src="../assets/result3_illust1.png"
                    class="result-illust"
                    alt="일러스트1"
                  />
                  <h2 class="result-main-title">
                    김여기 님은<br />
                    <span class="em">약간의 불신과 통제 신호</span>를 경험하고
                    있습니다.
                  </h2>
                  <div class="result-desc">
                    <p>
                      상대방이 자주 연락을 요구하거나, 일상을 지나치게
                      <br />궁금해하는 등 사생활의 자유가 제한된다고 느낄 수
                      있습니다.<br />이런 상황이 반복된다면 스트레스가 쌓일 수
                      있으니 주의가 필요합니다.
                    </p>
                  </div>
                  <h2 class="result-main-title">이렇게 행동해 보세요.</h2>
                  <ul class="result-actions">
                    <li>
                      <span class="strong">자신의 경계를 명확히 하세요</span
                      ><br />
                      <span class="result-desc"
                        >불편한 요구가 있다면 솔직하게 표현해 보세요.<br />
                        단순한 대화라도, 상황을 정리해서 말해보는 것이 큰 도움이
                        됩니다.</span
                      >
                    </li>
                    <li>
                      <span class="strong">가까운 센터를 방문해 보세요.</span
                      ><br />
                      <span class="result-desc"
                        >감정이 흔들릴 때, 전문가의 통찰적인 시선은 큰 힘이
                        됩니다.</span
                      >
                    </li>
                    <li>
                      <span class="strong">기록을 시작해 보세요.</span><br />
                      <span class="result-desc"
                        >그 사람의 말과 행동, 내가 느낀 감정을 날짜와 함께
                        메모해두면 현실을 객관적으로<br />
                        파악하는 데 도움이 됩니다. 법적 분쟁이 있을 경우에는
                        증거로 쓸 수 있습니다.</span
                      >
                    </li>
                  </ul>
                </div>
                <hr class="result-hr" />
                <div class="result-block result-block-2">
                  <img
                    src="../assets/result3_illust2.png"
                    class="result-illust"
                    alt="일러스트2"
                  />
                  <h2 class="result-main-title">
                    김여기 님의 연인은<br />
                    <span class="em">쉽게 의심하는 통제 성향의 사람</span>일
                    가능성이 높습니다.
                  </h2>
                  <div class="result-desc">
                    <p>
                      상대방이 자주 위치나 일정을 확인하거나, 친구 관계를
                      간섭하는 모습을 보일 수 있습니다. <br />사소한 일에도
                      감정이 크게 요동치고, 자주 질투를 표현할 수도 있습니다.
                    </p>
                  </div>
                  <h3 class="result-main-title">이런 부분을 주의하세요.</h3>
                  <ul class="result-cautions">
                    <li>
                      <span class="strong">과도한 질투</span><br />
                      <span class="result-desc"
                        >친구나 가족과의 만남까지 간섭하려 한다면 분명하게 선을
                        그으세요.</span
                      >
                    </li>
                    <li>
                      <span class="strong">사생활 침해</span><br />
                      <span class="result-desc"
                        >휴대폰, SNS 등 사적인 영역을 침범하려는 행동은 용납하지
                        마세요.</span
                      >
                    </li>
                  </ul>
                </div>
                <div class="result-final-msg">
                  <h2 class="result-main-title">마지막으로</h2>
                  <p class="result-desc">
                    관계에서 신뢰와 자유는 반드시 지켜져야 합니다. 불편하거나
                    위험하다고 느껴진다면, <br />이건 작은 문제가 아니라 지금
                    바로 살펴야 할 내 삶의 신호입니다.
                  </p>
                  <p class="result-desc">
                    <br />
                    김여기 님은 내 감정과 자유가 온전히 존중받는지 꼭 돌아봐
                    주세요.
                  </p>
                </div>
              </div>`,
    // 13~16점
    `<div class="profiling-result-card"> ...위험 카드 HTML... </div>`,
    // 17~20점
    `  <div class="profiling-result-card">
                <div class="result-block result-block-1">
                  <img
                    src="../assets/result5_illust1.png"
                    class="result-illust"
                    alt="일러스트1"
                  />
                  <h2 class="result-main-title">
                    김여기 님은<br />
                    <span class="em">심각한 폭력의 위험</span>에 노출되어 있습니다.
                  </h2>
                  <div class="result-desc">
                    <p>
                      상대방이 언어적·신체적 폭력, 반복적인 위협, 강한 통제 등을 <br />지속적으로 보이고 있습니다. 지금의 상황은 결코 정상적인 연애가 아니며,<br />즉각적인 보호와 지원이 필요한 상황입니다.</p>
                    </p>
                  </div>
                  <h2 class="result-main-title">이렇게 행동해 보세요.</h2>
                  <ul class="result-actions">
                    <li>
                      <span class="strong"
                        >안전한 곳으로 이동하세요</span
                      ><br />
                      <span class="result-desc"
                        >당장 위험하다면 가까운 친구, 가족, 기관에 도움을 요청하세요.<br /> 단순한 대화라도, 상황을 정리해서 말해보는
                        것이 큰 도움이 됩니다.</span>
                    </li>
                    <li>
                      <span class="strong">증거를 기록·보관하세요</span
                      ><br />
                      <span class="result-desc"
                        >폭력·협박의 흔적(메시지, 녹음, 사진 등)은 반드시 안전하게 보관하세요.</span
                      >
                    </li>
                    <li>
                      <span class="strong">전문기관에 즉시 연락하세요</span><br />
                      <span class="result-desc"
                        >경찰, 상담소 등 공식 기관의 도움을 받으세요.</span
                      >
                    </li>
                  </ul>
                </div>
                <hr class="result-hr" />
                <div class="result-block result-block-2">
                  <img
                    src="../assets/result5_illust2.png"
                    class="result-illust"
                    alt="일러스트2"
                  />
                  <h2 class="result-main-title">
                    김여기 님의 연인은<br />
                    <span class="em">극단적인 폭력성을 지닌 사람</span>일 가능성이
                    높습니다.
                  </h2>
                  <div class="result-desc">
                    <p>언어폭력, 신체적 위협, 일상적인 감시와 통제, 강압적인 행동 등 심각한 <br />데이트폭력 징후가 반복되고 있습니다. 자신뿐만 아니라 <br />주변인도 위험해질 수 있습니다.
                    </p>
                  </div>
                  <h3 class="result-main-title">이런 부분을 주의하세요.</h3>
                  <ul class="result-cautions">
                    <li>
                      <span class="strong">모든 위협 신호</span><br />
                      <span class="result-desc"
                        >사소해 보여도 한 번이라도 폭력적이거나 위협적인<br />행동이 있었다면 반드시 경계하세요.</span
                      >
                    </li>
                    <li>
                      <span class="strong">외부와의 단절</span><br />
                      <span class="result-desc"
                        >상대가 친구, 가족과의 연락을 막으려 한다면 즉시 주변에 알려 도움을 요청하세요.</span
                      >
                    </li>
                  </ul>
                </div>
                <div class="result-final-msg">
                  <h2 class="result-main-title">마지막으로</h2>
                  <p class="result-desc">
                    지금의 상황에서는 무엇보다 자신의 안전이 가장 중요합니다.<br />
                    혼자 감당하지 말고, 주저 없이 주변과 기관에 도움을 요청하세요.
                  </p>
                  <p class="result-desc"><br />
                    김여기 님은 소중한 존재이며, 안전하게 보호받을 권리가 있습니다.
                  </p>
                </div>
              </div>`,
  ];

  // 저장된 인덱스를 불러온다 (없으면 0)
  const idx = sessionStorage.getItem("profilingResultIndex") || 0;

  // 카드 부분에 동적으로 삽입
  document.getElementById("dynamic-result-card").innerHTML = cards[idx];
});

// 결과 저장하기 버튼 - 팝업 띄움
document.querySelector(".profiling-result-download-btn").onclick = function () {
  document.getElementById("modalOverlay").style.display = "flex";
  document.getElementById("filenameInput").value = "";
  document.getElementById("modalSaveBtn").classList.remove("enabled");
  document.getElementById("modalSaveBtn").disabled = true;
  document.body.classList.add("modal-open");
  setTimeout(() => {
    document.getElementById("filenameInput").focus();
  }, 150);
};

// 팝업 닫기
document.getElementById("modalCancelBtn").onclick = function () {
  document.getElementById("modalOverlay").style.display = "none";
  document.body.classList.remove("modal-open");
};

// 입력값에 따른 버튼 변화
document.getElementById("filenameInput").oninput = function () {
  const val = this.value.trim();
  const saveBtn = document.getElementById("modalSaveBtn");
  if (val.length > 0) {
    saveBtn.classList.add("enabled");
    saveBtn.disabled = false;
  } else {
    saveBtn.classList.remove("enabled");
    saveBtn.disabled = true;
  }
};

document.getElementById("saveForm").onsubmit = function (e) {
  e.preventDefault();
  if (!document.getElementById("modalSaveBtn").disabled) {
    // 저장될 데이터 구성
    const nickname = document.getElementById("filenameInput").value.trim();
    const date = new Date();
    const ymd = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}.${String(date.getDate()).padStart(2, "0")}`;
    const level = sessionStorage.getItem("profilingResultIndex") || 0;

    // 기존 배열 가져오기
    let profilingResults = JSON.parse(
      localStorage.getItem("profilingResults") || "[]"
    );
    profilingResults.unshift({ nickname, date: ymd, level }); // 최신이 앞으로
    localStorage.setItem("profilingResults", JSON.stringify(profilingResults));

    // 기존 알림
    document.getElementById("modalOverlay").style.display = "none";
    document.body.classList.remove("modal-open");
    alert("저장 완료!");
  }
};
document.getElementById("modalOverlay").onclick = function (e) {
  if (e.target === this) e.stopPropagation();
};
window.addEventListener("keydown", function (e) {
  if (
    document.getElementById("modalOverlay").style.display === "flex" &&
    e.key === "Escape"
  ) {
    e.preventDefault();
  }
});
