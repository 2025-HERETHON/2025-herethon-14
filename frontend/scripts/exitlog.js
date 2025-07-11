const cards = [
  {
    username: "김** 님",
    title: "여러분의 잘못이 아니에요",
    content:
      "처음엔 그냥 제가 예민한 줄 알았어요 ㅠㅠ 하루 종일 연락 안 받았다고 혼나는 것도, 친구랑 만났다고 화내는 것도,다 나를 너무 사랑해서 그런 줄 알았거든요.",
    date: "2025.06.02",
    isScrapped: false,
  },
  {
    username: "이** 님",
    title: "이제는 웃고 있어요",
    content:
      "안녕하세요 안녕하세요 이렇게저렇게해서 고소했고 접근금지 신청했어요 여러분에게 도움을 주고자 이 글을 써요 꼭 이겨내서 같이 행복한 삶을 살...",
    date: "2025.06.01",
    isScrapped: false,
  },
  {
    username: "박** 님",
    title: "처음 쓴 탈출기",
    content:
      "안녕하세요 안녕하세요 이렇게저렇게해서 고소했고 접근금지 신청했어요 여러분에게 도움을 주고자 이 글을 써요 꼭 이겨내서 같이 행복한 삶을 살...",
    date: "2025.05.20",
    isScrapped: false,
  },
  {
    username: "최** 님",
    title: "도망친 곳에 낙원은 있다",
    content:
      "안녕하세요 안녕하세요 이렇게저렇게해서 고소했고 접근금지 신청했어요 여러분에게 도움을 주고자 이 글을 써요 꼭 이겨내서 같이 행복한 삶을 살...",
    date: "2025.06.02",
    isScrapped: false,
  },
  {
    username: "정** 님",
    title: "이제는 웃고 있어요",
    content:
      "안녕하세요 안녕하세요 이렇게저렇게해서 고소했고 접근금지 신청했어요 여러분에게 도움을 주고자 이 글을 써요 꼭 이겨내서 같이 행복한 삶을 살...",
    date: "2025.06.02",
    isScrapped: false,
  },
  {
    username: "강** 님",
    title: "처음 쓴 탈출기",
    content:
      "안녕하세요 안녕하세요 이렇게저렇게해서 고소했고 접근금지 신청했어요 여러분에게 도움을 주고자 이 글을 써요 꼭 이겨내서 같이 행복한 삶을 살...",
    date: "2025.06.02",
    isScrapped: false,
  },
  {
    username: "조** 님",
    title: "도망친 곳에 낙원은 있다",
    content:
      "안녕하세요 안녕하세요 이렇게저렇게해서 고소했고 접근금지 신청했어요 여러분에게 도움을 주고자 이 글을 써요 꼭 이겨내서 같이 행복한 삶을 살...",
    date: "2025.06.02",
    isScrapped: false,
  },
  {
    username: "윤** 님",
    title: "이제는 웃고 있어요",
    content:
      "안녕하세요 안녕하세요 이렇게저렇게해서 고소했고 접근금지 신청했어요 여러분에게 도움을 주고자 이 글을 써요 꼭 이겨내서 같이 행복한 삶을 살...",
    date: "2025.06.02",
    isScrapped: false,
  },
  {
    username: "강** 님",
    title: "처음 쓴 탈출기",
    content:
      "안녕하세요 안녕하세요 이렇게저렇게해서 고소했고 접근금지 신청했어요 여러분에게 도움을 주고자 이 글을 써요 꼭 이겨내서 같이 행복한 삶을 살...",
    date: "2025.06.02",
    isScrapped: false,
  },
];

// 초기 렌더링 (DOM 로드 후 실행)
document.addEventListener("DOMContentLoaded", () => {
  const saved = JSON.parse(localStorage.getItem("scrappedCards")) || [];
  cards.forEach((card) => {
    card.isScrapped = saved.some(
      (savedCard) =>
        savedCard.title === card.title &&
        savedCard.username === card.username &&
        savedCard.date === card.date
    );
  });
  renderCards(cards);
});

// 스크랩 버튼 클릭 시 상태 변경 및 localStorage 저장
document.addEventListener("click", function (e) {
  const button = e.target.closest(".scrap-icon");
  if (button) {
    const index = button.dataset.index;
    cards[index].isScrapped = !cards[index].isScrapped;

    const img = button.querySelector("img");
    img.src = `../assets/${
      cards[index].isScrapped ? "scrap.png" : "nonscrap.png"
    }`;

    const scrappedCards = cards.filter((card) => card.isScrapped);
    localStorage.setItem("scrappedCards", JSON.stringify(scrappedCards));
  }
});

// 정렬 관련 함수
function selectSort(option) {
  if (option === "최신순") {
    sortPosts("new");
  } else if (option === "오래된 순") {
    sortPosts("old");
  }
  document.getElementById("sortPopup").style.display = "none";
  document.querySelector(
    ".sort-trigger"
  ).innerHTML = `${option} <span class="arrow"><img src="../assets/Vector.png" alt="down"
                    /></span>`;
}

function sortPosts(order) {
  if (order === "old") {
    cards.sort(
      (a, b) =>
        new Date(a.date.replace(/\./g, "-")) -
        new Date(b.date.replace(/\./g, "-"))
    );
  } else {
    cards.sort(
      (a, b) =>
        new Date(b.date.replace(/\./g, "-")) -
        new Date(a.date.replace(/\./g, "-"))
    );
  }
  renderCards(cards);
}

// 정렬 팝업 열고 닫기
toggleSort = () => {
  const popup = document.getElementById("sortPopup");
  popup.style.display = popup.style.display === "block" ? "none" : "block";
};

window.addEventListener("click", function (e) {
  const popup = document.getElementById("sortPopup");
  const trigger = document.querySelector(".sort-trigger");
  if (!popup.contains(e.target) && !trigger.contains(e.target)) {
    popup.style.display = "none";
  }
});

// 사이드바 메뉴 클릭 시 필터링
const allBtn = document.getElementById("allBtn");
const scrapBtn = document.getElementById("scrapBtn");

if (allBtn) {
  allBtn.addEventListener("click", () => {
    renderCards(cards);
    document
      .querySelectorAll(".sidebar-menu li")
      .forEach((li) => li.classList.remove("active"));
    allBtn.parentElement.classList.add("active");
  });
}

if (scrapBtn) {
  scrapBtn.addEventListener("click", () => {
    const saved = JSON.parse(localStorage.getItem("scrappedCards")) || [];
    renderCards(saved);
    document
      .querySelectorAll(".sidebar-menu li")
      .forEach((li) => li.classList.remove("active"));
    scrapBtn.parentElement.classList.add("active");
  });
}

document.addEventListener("click", function (e) {
  const button = e.target.closest(".scrap-icon");
  if (button) {
    const cardElement = button.closest(".escape-card");
    const title = cardElement.querySelector(".card-title").textContent;
    const username = cardElement.querySelector(".user-name").textContent;
    const date = cardElement.querySelector(".card-date").textContent;
    const content = cardElement.querySelector(".card-content").textContent;

    // 로컬 저장소 불러오기
    let saved = JSON.parse(localStorage.getItem("scrappedCards")) || [];

    const exists = saved.find(
      (card) =>
        card.title === title && card.username === username && card.date === date
    );

    if (exists) {
      // 삭제
      saved = saved.filter(
        (card) =>
          !(
            card.title === title &&
            card.username === username &&
            card.date === date
          )
      );
      button.querySelector("img").src = "../assets/nonscrap.png";
    } else {
      // 추가
      saved.push({ username, title, content, date, isScrapped: true });
      button.querySelector("img").src = "../assets/scrap.png";
    }

    localStorage.setItem("scrappedCards", JSON.stringify(saved));
  }
});

function renderCards(cardsArray) {
  const container = document.querySelector(".escape-card-grid");
  container.innerHTML = "";

  cardsArray.forEach((card, index) => {
    const cardHtml = `
            <div class="escape-card" data-index="${index}">
                <div class="card-header">
                    <div class="profile-img"><img src="../assets/exitlog_profile.svg" alt="프로필 이미지" /></div>
                    <div class="user-name">${card.username}</div>
                    <button class="scrap-icon" data-index="${index}">
                        <img src="../assets/${
                          card.isScrapped ? "scrap.png" : "nonscrap.png"
                        }" />
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

  // 🔥 여기서 카드 클릭 시 전체글 보기로 전환하는 이벤트 추가
  document.querySelectorAll(".escape-card").forEach((cardEl, idx) => {
    cardEl.addEventListener("click", (e) => {
      // 스크랩 버튼 클릭은 제외
      if (e.target.closest(".scrap-icon")) return;

      window.location.href = "exitlog_post.html";

      const selectedCard = cardsArray[idx];
      document.getElementById("view-title").textContent = selectedCard.title;
      document.getElementById("view-date").textContent = selectedCard.date;
      document.getElementById("view-body").textContent = selectedCard.content;

      // 이전글/다음글도 설정
      const prev = cardsArray[idx - 1];
      const next = cardsArray[idx + 1];
      document.getElementById("prev-title").textContent = prev
        ? prev.title
        : "";
      document.getElementById("prev-date").textContent = prev ? prev.date : "";
      document.getElementById("next-title").textContent = next
        ? next.title
        : "";
      document.getElementById("next-date").textContent = next ? next.date : "";

      document.getElementById("cardGrid").classList.add("hidden");
      document.getElementById("postView").classList.remove("hidden");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  const allBtn = document.getElementById("allBtn");
  const scrapBtn = document.getElementById("scrapBtn");

  // 현재 페이지에 따라 글씨 색 바꾸기
  if (path.includes("exit.html")) {
    allBtn.classList.add("active");
  } else if (path.includes("scrap.html")) {
    scrapBtn.classList.add("active");
  }

  // 클릭 시 페이지 이동
  if (allBtn) {
    allBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "exitlog.html";
    });
  }

  if (scrapBtn) {
    scrapBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "scrap.html";
    });
  }
});
