// scrap.js
document.addEventListener("DOMContentLoaded", () => {
  // localStorage에서 스크랩 카드만 가져오기
  let savedCards = JSON.parse(localStorage.getItem("scrappedCards")) || [];
  let currentSort = "최신순";

  // 최신순/오래된순 정렬 함수 (카드 데이터에 date가 있다고 가정)
  function sortCards(cards, sortType) {
    return cards.slice().sort((a, b) => {
      if (sortType === "오래된 순") {
        return new Date(a.date) - new Date(b.date);
      } else {
        return new Date(b.date) - new Date(a.date);
      }
    });
  }

  // 카드 렌더링
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
            <div class="profile-img"><img src="../assets/profile.png" alt="프로필 이미지" /></div>
            <div class="user-name">${card.username}</div>
            <button class="scrap-icon active">
              <img src="../assets/scrab.png">
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

  // 정렬 팝업 핸들링
  window.toggleSort = function () {
    document.getElementById("sortPopup").classList.toggle("show");
  };

  window.selectSort = function (sortType) {
    currentSort = sortType;
    document.getElementById("sortPopup").classList.remove("show");
    renderCards(savedCards);
    document.querySelector(
      ".sort-trigger"
    ).innerHTML = `${sortType} <span class="arrow"><img src="../assets/Vector.png" alt="down"
                    /></span>`;
  };

  // 사이드바 메뉴 이동
  document.getElementById("allBtn").addEventListener("click", () => {
    window.location.href = "exit.html";
  });
  document.getElementById("scrapBtn").addEventListener("click", (e) => {
    e.preventDefault();
    // 현재 페이지가 scrap이므로 동작 없음
  });

  // 최초 렌더링
  renderCards(savedCards);
});
