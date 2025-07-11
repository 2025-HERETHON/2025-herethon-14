document.addEventListener("DOMContentLoaded", () => {
  let savedCards = JSON.parse(localStorage.getItem("scrappedCards")) || [];
  let currentSort = "최신순";

  function sortCards(cards, sortType) {
    return cards.slice().sort((a, b) => {
      const d1 = new Date(a.date.replace(/\./g, "-"));
      const d2 = new Date(b.date.replace(/\./g, "-"));
      return sortType === "오래된 순" ? d1 - d2 : d2 - d1;
    });
  }

  function renderCards(cards) {
    const container = document.getElementById("cardGrid");
    container.innerHTML = "";

    if (cards.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; text-align:center; color:#969696; padding:48px 0; font-size:18px;">
          스크랩한 탈출기가 없습니다.
        </div>`;
      return;
    }

    sortCards(cards, currentSort).forEach((card, idx) => {
      const cardHtml = `
        <div class="escape-card" data-index="${idx}">
          <div class="card-header">
            <div class="profile-img"><img src="/static/assets/profile.svg" alt="프로필 이미지" /></div>
            <div class="user-name">${card.username}</div>
            <button class="scrap-icon active">
              <img src="/static/assets/scrap.png">
            </button>
          </div>
          <div class="card-body">
            <div class="card-title">${card.title}</div>
            <div class="card-content">${card.content}</div>
          </div>
          <div class="card-date">${card.date}</div>
        </div>
      `;
      container.insertAdjacentHTML("beforeend", cardHtml);
    });
  }

  // 정렬 토글 함수
  window.toggleSort = () => {
    document.getElementById("sortPopup").classList.toggle("show");
  };

  window.selectSort = (sortType) => {
    currentSort = sortType;
    document.getElementById("sortPopup").classList.remove("show");
    renderCards(savedCards);
    document.querySelector(
      ".sort-trigger"
    ).innerHTML = `${sortType} <span class="arrow"><img src="/static/assets/Vector.png" alt="down" /></span>`;
  };

  // 정렬 토글 버튼 수동 연결 (HTML에 onclick 안 써도 됨)
  document.querySelector(".sort-trigger")?.addEventListener("click", toggleSort);
  document.querySelectorAll("#sortPopup li").forEach((li) => {
    li.addEventListener("click", () => {
      selectSort(li.textContent.trim());
    });
  });

  // 페이지 이동 버튼
  document.getElementById("allBtn")?.addEventListener("click", () => {
    window.location.href = "exitlog.html";
  });

  document.getElementById("scrapBtn")?.addEventListener("click", (e) => {
    e.preventDefault(); // 현재 페이지
  });

  // 렌더링 시작
  renderCards(savedCards);
});


document.addEventListener("click", function (e) {
  const button = e.target.closest(".scrap-icon");
  if (!button) return;

  // 현재 카드 요소
  const cardElement = button.closest(".escape-card");

  const title = cardElement.querySelector(".card-title").textContent;
  const username = cardElement.querySelector(".user-name").textContent;
  const date = cardElement.querySelector(".card-date").textContent;
  const content = cardElement.querySelector(".card-content").textContent;

  // 저장된 카드 가져오기
  let savedCards = JSON.parse(localStorage.getItem("scrappedCards")) || [];

  const exists = savedCards.find(
    (card) =>
      card.title === title &&
      card.username === username &&
      card.date === date
  );

  if (exists) {
    // 1. localStorage에서 제거
    savedCards = savedCards.filter(
      (card) =>
        !(
          card.title === title &&
          card.username === username &&
          card.date === date
        )
    );

    // 2. 저장 반영
    localStorage.setItem("scrappedCards", JSON.stringify(savedCards));

    // ✅ 3. 카드 DOM 요소를 직접 삭제
    cardElement.remove();

    // (선택) 아이콘 회색 처리
    // button.querySelector("img").src = "../assets/nonscrap.png";
  }
});
