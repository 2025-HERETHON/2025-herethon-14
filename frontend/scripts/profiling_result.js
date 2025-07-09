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
