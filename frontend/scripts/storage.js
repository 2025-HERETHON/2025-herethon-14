let currentTab = "all";
let currentYear = 2025;
let currentMonth = 6;
let currentPage = 1;
const pageSize = 5; //게시글 몇 개까지 보여줄지

// 더미 데이터
function initSample() {
  if (
    !localStorage.getItem("records") ||
    JSON.parse(localStorage.getItem("records")).length === 0
  ) {
    const now = new Date();
    const sampleRecords = [
      {
        title: "제목입니다제목입니다제목입니다제목입니다",
        content: "사진 없음",
        hasFile: false,
        date: "2025-06-30",
        timestamp: now.getTime() - 100000,
      },
      {
        title: "제목입니다제목입니다제목입니다제목입니다",
        content: "사진 있음",
        hasFile: true,
        date: "2025-06-28",
        timestamp: now.getTime() - 90000,
      },
      {
        title: "제목입니다제목입니다제목입니다제목입니다",
        content: "사진 있음",
        hasFile: true,
        date: "2025-06-22",
        timestamp: now.getTime() - 70000,
      },
      {
        title: "제목입니다제목입니다제목입니다제목입니다",
        content: "사진 있음",
        hasFile: true,
        date: "2025-06-17",
        timestamp: now.getTime() - 60000,
      },
      {
        title: "제목입니다제목입니다제목입니다제목입니다",
        content: "사진 있음",
        hasFile: true,
        date: "2025-06-15",
        timestamp: now.getTime() - 50000,
      },
      {
        title: "제목입니다제목입니다제목입니다제목입니다",
        content: "사진 없음",
        hasFile: false,
        date: "2025-06-12",
        timestamp: now.getTime() - 40000,
      },
      {
        title: "제목입니다제목입니다제목입니다제목입니다",
        content: "사진 없음",
        hasFile: false,
        date: "2025-06-10",
        timestamp: now.getTime() - 30000,
      },
      {
        title: "제목입니다제목입니다제목입니다제목입니다",
        content: "사진 있음",
        hasFile: true,
        date: "2025-06-06",
        timestamp: now.getTime() - 20000,
      },
      {
        title: "제목입니다제목입니다제목입니다제목입니다",
        content: "사진 있음",
        hasFile: true,
        date: "2025-06-05",
        timestamp: now.getTime() - 15000,
      },
      {
        title: "제목입니다제목입니다제목입니다제목입니다",
        content: "사진 없음",
        hasFile: false,
        date: "2025-06-02",
        timestamp: now.getTime() - 10000,
      },
    ];
    localStorage.setItem("records", JSON.stringify(sampleRecords));
  }
}
function getRecords() {
  return JSON.parse(localStorage.getItem("records") || "[]");
}
function filterData() {
  const records = getRecords();
  return records.filter((item) => {
    const date = new Date(item.date);
    const isRightMonth =
      date.getFullYear() === currentYear &&
      date.getMonth() + 1 === currentMonth;
    if (!isRightMonth) return false;
    if (currentTab === "all") return true;
    if (currentTab === "file") return item.hasFile;
    return true;
  });
}
function renderTable() {
  let data = filterData();
  data = data.sort((a, b) => b.timestamp - a.timestamp);
  // 페이지네이션
  const pageCount = Math.max(1, Math.ceil(data.length / pageSize));
  if (currentPage > pageCount) currentPage = pageCount;
  const start = (currentPage - 1) * pageSize;
  const pageData = data.slice(start, start + pageSize);

  const tbody = document.querySelector("#storageTable tbody");
  tbody.innerHTML =
    pageData.length === 0
      ? `<tr><td colspan="3" style="color:#bbb;text-align:center;">작성된 글이 없습니다.</td></tr>`
      : pageData
          .map(
            (row, i) => `
    <tr>
      <td>${data.length - (start + i)}</td>
      <td>${row.title}${
              row.hasFile
                ? ' <img class="file-icon" src="../assets/img_icon.svg" alt="첨부파일" />'
                : ""
            }</td>
      <td>${
        parseInt(row.date.slice(5, 7)) +
        "월 " +
        parseInt(row.date.slice(8, 10)) +
        "일"
      }</td>
    </tr>
  `
          )
          .join("");
  document.getElementById(
    "monthText"
  ).textContent = `${currentYear}년 ${currentMonth}월`;

  renderPagination(pageCount);
}
function renderPagination(pageCount) {
  const pagination = document.getElementById("pagination");
  // 현재 페이지 표시
  let html = `<button class="pagination-btn" onclick="movePage(-1)" ${
    currentPage === 1 ? "disabled" : ""
  }>이전</button>`;
  html += `<button class="pagination-btn active">${currentPage}</button>`;
  html += `<button class="pagination-btn" onclick="movePage(1)" ${
    currentPage === pageCount ? "disabled" : ""
  }>다음</button>`;
  pagination.innerHTML = html;
}
window.movePage = function (dir) {
  let data = filterData();
  const pageCount = Math.max(1, Math.ceil(data.length / pageSize));
  currentPage += dir;
  if (currentPage < 1) currentPage = 1;
  if (currentPage > pageCount) currentPage = pageCount;
  renderTable();
};
window.goPage = function (page) {
  currentPage = page;
  renderTable();
};
function changeMonth(diff) {
  currentMonth += diff;
  if (currentMonth > 12) {
    currentMonth = 1;
    currentYear++;
  } else if (currentMonth < 1) {
    currentMonth = 12;
    currentYear--;
  }
  currentPage = 1;
  renderTable();
}
document.addEventListener("DOMContentLoaded", () => {
  initSample();
  renderTable();

  document.getElementById("prevMonthBtn").onclick = () => changeMonth(-1);
  document.getElementById("nextMonthBtn").onclick = () => changeMonth(1);

  document.getElementById("tab-all").onclick = () => {
    currentTab = "all";
    document.getElementById("tab-all").classList.add("active");
    document.getElementById("tab-file").classList.remove("active");
    currentPage = 1;
    renderTable();
  };
  document.getElementById("tab-file").onclick = () => {
    currentTab = "file";
    document.getElementById("tab-all").classList.remove("active");
    document.getElementById("tab-file").classList.add("active");
    currentPage = 1;
    renderTable();
  };
});
