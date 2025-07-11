// 로그인 정보 입력 요소
const idInput = document.querySelector('.login-input[type="text"]');
const pwInput = document.querySelector('.login-input[type="password"]');
const loginBtn = document.querySelector(".login-btn");
const loginForm = document.querySelector(".login-form");

// 버튼 및 테두리 상태 업데이트 함수
function updateBtnAndBorder() {
  const idVal = idInput.value.trim();
  const pwVal = pwInput.value.trim();

  if (idVal && pwVal) {
    idInput.classList.add("active");
    pwInput.classList.add("active");
    loginBtn.classList.add("active");
    loginBtn.disabled = false;
  } else {
    idInput.classList.remove("active");
    pwInput.classList.remove("active");
    loginBtn.classList.remove("active");
    loginBtn.disabled = true;
  }

  idInput.classList.remove("error");
  pwInput.classList.remove("error");
  const msg = document.querySelector(".login-error-msg");
  if (msg) msg.remove();
}

// 실시간 입력 감지
idInput.addEventListener("input", updateBtnAndBorder);
pwInput.addEventListener("input", updateBtnAndBorder);

// 폼 제출 시 실행
loginForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const idVal = idInput.value.trim();
  const pwVal = pwInput.value.trim();

  console.log("로그인 요청 시작");

  try {
    const formData = new URLSearchParams();
    formData.append("email", idVal);
    formData.append("password", pwVal);

    const response = await fetch("http://localhost:8000/auth/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    });

    const data = await response.json();
    console.log("로그인 응답:", data);

    if (response.ok && data.success) {
      alert("로그인 성공!");
      // 사용자 정보 저장 (옵션)
      localStorage.setItem("userEmail", data.user.email);
      localStorage.setItem("userName", data.user.name);
      localStorage.setItem("userNickname", data.user.nickname);
      location.href = "main.html"; // 로그인 성공 시 페이지 이동
    } else {
      pwInput.classList.add("error");
      const errorMsg = document.createElement("div");
      errorMsg.className = "login-error-msg";
      errorMsg.innerText =
        data.message || "아이디 또는 비밀번호를 확인해 주세요.";
      pwInput.parentElement.after(errorMsg);
    }
  } catch (err) {
    console.error("로그인 중 오류:", err);
    alert("서버 오류가 발생했습니다. 다시 시도해 주세요.");
  }
});

// 페이지 로딩 시 초기화
window.onload = updateBtnAndBorder;
