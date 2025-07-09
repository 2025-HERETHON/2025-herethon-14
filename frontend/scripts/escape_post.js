const post = {
  title: "여러분의 잘못이 아니에요",
  date: "2025.06.30",
  body: [
    `처음엔 그냥 제가 예민한 줄 알았어요 ㅠㅠ`,
    `하루 종일 연락 안 받았다고 혼나는 것도,
친구랑 만났다고 화내는 것도,
다 “나를 너무 사랑해서” 그런 줄 알았거든요.`,
  ],

  image: "",
  footer: [],
};

const prevPosts = [
  {
    title: "헤어지고 광명찾자",
    date: "2025.06.30",
    thumb: "",
  },
];
const nextPosts = [
  {
    title: "안전이별 안전탈출하세요 ㅠㅠ",
    date: "2024.06.30",
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
});
