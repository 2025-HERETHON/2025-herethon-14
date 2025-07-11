// 날짜 한글 표시
const dateInput = document.getElementById("record-date");
const korDateText = document.getElementById("kor-date-text");
function formatKorDate(dateStr) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
}
const today = new Date();
const pad2 = (n) => (n < 10 ? "0" + n : n);
dateInput.value = `${today.getFullYear()}-${pad2(today.getMonth() + 1)}-${pad2(
  today.getDate()
)}`;
korDateText.textContent = formatKorDate(dateInput.value);
dateInput.addEventListener("input", function () {
  korDateText.textContent = formatKorDate(this.value);
});

// 달력 기능
document
  .getElementById("kor-date-view")
  .addEventListener("click", function (e) {
    dateInput.focus();
    dateInput.showPicker && dateInput.showPicker();
  });

// 파일, 링크 업로드
const fileInput = document.getElementById("file-input");
const fileUploadBtn = document.getElementById("file-upload-btn");
const linkUploadBtn = document.getElementById("link-upload-btn");
const fileLinkList = document.getElementById("file-link-list");
let uploadedFiles = [];
let uploadedLinks = [];

fileUploadBtn.addEventListener("click", () => fileInput.click());
fileInput.addEventListener("change", function () {
  [...this.files].forEach((f) => uploadedFiles.push(f));
  renderFilesLinks();
  this.value = "";
});

linkUploadBtn.addEventListener("click", () => {
  const url = prompt("첨부할 링크(URL)를 입력하세요:");
  if (url) {
    uploadedLinks.push(url);
    renderFilesLinks();
  }
});

function renderFilesLinks() {
  fileLinkList.innerHTML = "";
  uploadedFiles.forEach((file, idx) => {
    const div = document.createElement("div");
    div.className = "record-file-item";
    div.innerHTML = `<img src="../assets/icon-file.svg" style="width:16px;"> <span>${file.name}</span> <span class="remove-attach" title="삭제">×</span>`;
    div.querySelector(".remove-attach").onclick = () => {
      uploadedFiles.splice(idx, 1);
      renderFilesLinks();
    };
    fileLinkList.appendChild(div);
  });
  uploadedLinks.forEach((link, idx) => {
    const div = document.createElement("div");
    div.className = "record-link-item";
    div.innerHTML = `<img src="../assets/icon-link.svg" style="width:15px;"> <a href="${link}" target="_blank" style="color:#06c; text-decoration:underline;">${link}</a> <span class="remove-attach" title="삭제">×</span>`;
    div.querySelector(".remove-attach").onclick = () => {
      uploadedLinks.splice(idx, 1);
      renderFilesLinks();
    };
    fileLinkList.appendChild(div);
  });
}

// 글자 스타일 적용
function applyEditorCmd(cmd) {
  document.execCommand(cmd, false, null);
  document.getElementById("record-content").focus();
}
document.getElementById("bold-btn").onclick = () => applyEditorCmd("bold");
document.getElementById("italic-btn").onclick = () => applyEditorCmd("italic");
document.getElementById("underline-btn").onclick = () =>
  applyEditorCmd("underline");

// 왼/가운데/오 정렬
let alignState = 0;
document.getElementById("align-btn").onclick = function () {
  const contentDiv = document.getElementById("record-content");
  alignState = (alignState + 1) % 3;
  if (alignState === 0) {
    document.execCommand("justifyLeft");
  } else if (alignState === 1) {
    document.execCommand("justifyCenter");
  } else if (alignState === 2) {
    document.execCommand("justifyRight");
  }
  contentDiv.focus();
};

// 업로드 버튼
document.querySelector(".record-upload-btn").onclick = function () {
  const korDate = korDateText.textContent;
  const dateVal = dateInput.value;
  const title = document.querySelector(".record-input-title").value.trim();

  const content = document.getElementById("record-content").innerHTML.trim();

  if (!title || !content.replace(/<(.|\n)*?>/g, "").trim()) {
    alert("제목과 내용을 입력해주세요!");
    return;
  }
  const hasFile = uploadedFiles.length > 0;
  const now = new Date(dateVal ? dateVal : undefined);
  const record = {
    title,
    content,
    hasFile,
    date:
      now.getFullYear() +
      "-" +
      String(now.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(now.getDate()).padStart(2, "0"),
    timestamp: now.getTime(),
  };
  let records = JSON.parse(localStorage.getItem("records") || "[]");
  records.unshift(record);
  localStorage.setItem("records", JSON.stringify(records));
  window.location.href = "timelog.html";
};
