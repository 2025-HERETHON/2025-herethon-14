document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("profilingForm");
  const submitBtn = document.getElementById("profiling-submit");
  const totalQuestions = form.querySelectorAll("tbody tr").length;

  // 한 줄에 체크박스 1개만 선택 가능
  form.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      if (this.checked) {
        form.querySelectorAll(`input[name="${this.name}"]`).forEach((cb) => {
          if (cb !== this) cb.checked = false;
        });
      }
      checkAllSelected();
    });
  });

  // 모든 줄에 체크해야 버튼 active 되도록!
  function checkAllSelected() {
    let allChecked = true;
    for (let i = 1; i <= totalQuestions; i++) {
      if (!form.querySelector(`input[name="q${i}"]:checked`)) {
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
    window.location.href = "profiling_result.html";
  });
});

// 팝업창
document
  .querySelector(".profiling-prev-result-btn")
  .addEventListener("click", function () {
    document.getElementById("resultModal").style.display = "flex";
    document.body.style.overflow = "hidden"; //
  });

document.querySelector(".modal-close").addEventListener("click", function () {
  document.getElementById("resultModal").style.display = "none";
  document.body.style.overflow = ""; //
});

// 팝업창 바깥 클릭하면 닫히도록
document.getElementById("resultModal").addEventListener("click", function (e) {
  if (e.target === this) {
    this.style.display = "none";
    document.body.style.overflow = "";
  }
});

// 결과들 리스트 중 하나 클릭하면 확인 버튼 active 되도록!
const items = document.querySelectorAll(".modal-item");
const confirmBtn = document.querySelector(".modal-confirm");
items.forEach((item) => {
  item.addEventListener("click", function () {
    items.forEach((it) => it.classList.remove("selected"));
    this.classList.add("selected");
    confirmBtn.classList.add("active");
    confirmBtn.disabled = false;
    confirmBtn.style.cursor = "pointer";
    confirmBtn.style.color = "#fff";
  });
});

// 확인하기 버튼 누르면
confirmBtn.addEventListener("click", function () {
  if (!this.disabled) {
    // 지난 결과 페이지 이동
    document.getElementById("resultModal").style.display = "none";
    document.body.style.overflow = "";
    window.location.href = "last_result.html";
  }
});
