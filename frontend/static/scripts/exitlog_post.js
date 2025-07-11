document.addEventListener("DOMContentLoaded", () => {
  const selectedCard = JSON.parse(localStorage.getItem("selectedCard"));
  const cardsArray = JSON.parse(localStorage.getItem("cardsArray"));
  const selectedIndex = parseInt(localStorage.getItem("selectedCardIndex"));

  if (!selectedCard || !cardsArray || isNaN(selectedIndex)) {
    document.querySelector(".post-title").textContent = "불러올 데이터가 없습니다.";
    return;
  }

  // 제목, 날짜 출력
  document.querySelector(".post-title").textContent = selectedCard.title;
  document.querySelector(".post-date").textContent = selectedCard.date;

  // 본문 내용 줄바꿈 처리해서 출력
  const bodyHTML = selectedCard.content
    .split("\n")
    .map((line) => `<p>${line.trim()}</p>`)
    .join("");
  document.querySelector("#cardContent").innerHTML = bodyHTML;

  // 이전글/다음글 계산
  let prevNextHTML = "";

  if (selectedIndex > 0) {
    const prevCard = cardsArray[selectedIndex - 1];
    prevNextHTML += `
      <div class="post-prev-item">
        <div class="post-prev-label">이전글</div>
        <div class="post-prev-title">${prevCard.title}</div>
        <div class="post-prev-date">${prevCard.date}</div>
      </div>
    `;
  }
  if (selectedIndex < cardsArray.length - 1) {
    const nextCard = cardsArray[selectedIndex + 1];
    prevNextHTML += `
      <div class="post-prev-item">
        <div class="post-prev-label">다음글</div>
        <div class="post-prev-title">${nextCard.title}</div>
        <div class="post-prev-date">${nextCard.date}</div>
      </div>
    `;
  }

  document.querySelector(".post-prev-next").innerHTML = prevNextHTML;
});
