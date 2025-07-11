document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("profilingForm");
  const submitBtn = document.getElementById("profiling-submit");
  const totalQuestions = form.querySelectorAll("tbody tr").length;

  // 각 행(질문)에서 radio 하나만 선택 가능
  form.querySelectorAll('input[type="radio"]').forEach((radio) => {
    radio.addEventListener("change", function () {
      checkAllSelected();
    });
  });

  // 모든 행에 하나씩 선택해야 버튼 active
  function checkAllSelected() {
    let allChecked = true;
    for (let i = 1; i <= totalQuestions; i++) {
      if (!form.querySelector(`input[name=\"q${i}\"]:checked`)) {
        allChecked = false;
        break;
      }
    }
    if (allChecked) {
      submitBtn.disabled = false;
      submitBtn.classList.add("active");
    } else {
      submitBtn.disabled = true;
      submitBtn.classList.remove("active");
    }
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    // 각 행에서 선택된 값 수집 (예시)
    let selected = {};
    for (let i = 1; i <= totalQuestions; i++) {
      const checked = form.querySelector(`input[name=\"q${i}\"]:checked`);
      selected[`q${i}`] = checked ? checked.value : null;
    }
    sessionStorage.setItem("profilingSelected", JSON.stringify(selected));
    window.location.href = "../pages/profiling_result.html";
  });
}); // <-- 여기까지가 DOMContentLoaded

// ------ (여기서부터는 팝업 관련 코드!) ------

const modalList = document.querySelector(".modal-list");
const confirmBtn = document.querySelector(".modal-confirm");
let selectedIdx = null;

// 지난 결과 불러오기(팝업 열기)
document
  .querySelector(".profiling-prev-result-btn")
  .addEventListener("click", function () {
    // 리스트 동적 생성
    modalList.innerHTML = ""; // 기존 하드코딩 삭제

    // 저장된 결과 가져오기
    let profilingResults = JSON.parse(
      localStorage.getItem("profilingResults") || "[]"
    );

    if (profilingResults.length === 0) {
      modalList.innerHTML = `<div style="padding:24px;text-align:center;color:#888">저장된 결과가 없습니다.</div>`;
    } else {
      profilingResults.forEach((item, idx) => {
        const div = document.createElement("div");
        div.className = "modal-item";
        div.dataset.index = idx;
        div.innerHTML = `
          <div class="modal-item-title">${item.nickname}</div>
          <div class="modal-item-date">${item.date}</div>
        `;
        modalList.appendChild(div);
      });
    }

    document.getElementById("resultModal").style.display = "flex";
    document.body.style.overflow = "hidden";
    // 확인 버튼, 선택 해제
    confirmBtn.disabled = true;
    confirmBtn.classList.remove("active");
    selectedIdx = null;
  });

// 팝업 닫기
document.querySelector(".modal-close").addEventListener("click", function () {
  document.getElementById("resultModal").style.display = "none";
  document.body.style.overflow = "";
});

// 팝업창 바깥 클릭하면 닫히도록
document.getElementById("resultModal").addEventListener("click", function (e) {
  if (e.target === this) {
    this.style.display = "none";
    document.body.style.overflow = "";
  }
});

// 리스트 동적 바인딩 (선택)
modalList.addEventListener("click", function (e) {
  const item = e.target.closest(".modal-item");
  if (item) {
    // 모두 선택 해제
    modalList
      .querySelectorAll(".modal-item")
      .forEach((it) => it.classList.remove("selected"));
    item.classList.add("selected");
    confirmBtn.disabled = false;
    confirmBtn.classList.add("active");
    selectedIdx = Number(item.dataset.index);
  }
});

// 확인하기 버튼 동작
confirmBtn.addEventListener("click", function () {
  if (selectedIdx === null) return;
  // 선택 결과 localStorage에서 꺼내 세션스토리지에 기록
  let profilingResults = JSON.parse(
    localStorage.getItem("profilingResults") || "[]"
  );
  const selected = profilingResults[selectedIdx];
  if (selected) {
    sessionStorage.setItem("profilingResultIndex", selected.level);
    sessionStorage.setItem("profilingResultDate", selected.date);
    sessionStorage.setItem("profilingResultNickname", selected.nickname);
  }
  document.getElementById("resultModal").style.display = "none";
  document.body.style.overflow = "";
  window.location.href = "../pages/profiling_last_result.html";
});
