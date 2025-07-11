// 더미 데이터
const post = {
  title: "또 싸웠다...",
  date: "2025.06.30",
  body: [
    "어제 내가 친구 만나느라 1시간 정도 늦게 일정했다고 오늘까지 난리다.",
    "처음에는 내가 더 잘하면 될 줄 알았는데, 이젠 뭘 어떻게 해도 쟤 기분이 먼저고, 나는 늘 눈치만 보는 사람이 됐다.",
    "조금만 잘못해도 인신공격을 한다.",
  ],
  image: "kakaotalk.png",
  footer: [
    "진짜... 그냥 대화가 안 된다.",
    "말을 하면 할수록 내가 이상한 사람이 되는 기분이다.",
  ],
};

const prevPosts = [
  {
    title: "맨날 나를 의심한다",
    date: "2025.06.29",
    thumb: "image 25.svg",
  },
];
const nextPosts = [
  {
    title: "진짜 지겹다",
    date: "2025.07.01",
    thumb: "",
  },
];

document.addEventListener("DOMContentLoaded", function () {
  // 제목
  document.querySelector(".storage-detail-title").textContent = post.title;
  // 날짜
  document.querySelector(".storage-detail-date").textContent = post.date;
  // 본문
  document.querySelector(".storage-detail-body").innerHTML = post.body
    .map((p) => `<p>${p}</p>`)
    .join("");
  // 이미지
  document.querySelector(".storage-detail-img").src = post.image;
  // footer
  document.querySelector(".storage-detail-footer").innerHTML = post.footer
    .map((f) => `<p>${f}</p>`)
    .join("");

  // 이전글/다음글
  let prevNextHTML = "";
  if (prevPosts.length) {
    prevNextHTML += `
      <div class="storage-detail-prev-item">
        <div>
          <div class="storage-detail-prev-label">이전글</div>
          <div class="storage-detail-prev-item-title">${
            prevPosts[0].title
          }</div>
          <div class="storage-detail-prev-item-date">${prevPosts[0].date}</div>
        </div>
        ${
          prevPosts[0].thumb
            ? `<img src="${prevPosts[0].thumb}" class="storage-detail-prev-thumb" />`
            : ""
        }
      </div>
    `;
  }
  if (nextPosts.length) {
    prevNextHTML += `
      <div class="storage-detail-prev-item">
        <div>
          <div class="storage-detail-prev-label">다음글</div>
          <div class="storage-detail-prev-item-title">${
            nextPosts[0].title
          }</div>
          <div class="storage-detail-prev-item-date">${nextPosts[0].date}</div>
        </div>
        ${
          nextPosts[0].thumb
            ? `<img src="${nextPosts[0].thumb}" class="storage-detail-prev-thumb" />`
            : ""
        }
      </div>
    `;
  }
  document.querySelector(".storage-detail-prev-list").innerHTML = prevNextHTML;

  // '전체글 보기' 버튼 클릭 시 /timelog.html로 이동
  document.querySelectorAll('.view_all_btn a').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      window.location.href = '/timelog.html';
    });
  });
});
