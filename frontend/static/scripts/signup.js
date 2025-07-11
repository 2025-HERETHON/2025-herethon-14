// 입력 필드
const inputs = document.querySelectorAll(".signup-input");
const pwInput = inputs[3];
const pwCheckInput = inputs[4];
const signupBtn = document.querySelector(".signup-btn");
const agreeChk = document.getElementById("agree");
const form = document.querySelector(".signup-form");
const pwCheckWrapper = document.getElementById("pw-check-wrapper");

function checkAll() {
  let filled = true;
  inputs.forEach((input) => {
    if (!input.value.trim()) filled = false;
  });
  if (!agreeChk.checked) filled = false;
  if (
    pwInput.value &&
    pwCheckInput.value &&
    pwInput.value !== pwCheckInput.value
  )
    filled = false;
  if (filled) {
    signupBtn.classList.add("active");
    signupBtn.disabled = false;
  } else {
    signupBtn.classList.remove("active");
    signupBtn.disabled = true;
  }
}

// 입력 및 체크 변화마다 버튼/테두리 상태 반영
inputs.forEach((input) => {
  input.addEventListener("input", () => {
    // 테두리
    // 비밀번호 길이 유효성 검사
    let lengthErrorMsg = document.querySelector(".pw-length-error");
    if (pwInput.value && (pwInput.value.length < 8 || pwInput.value.length > 16)) {
      pwInput.classList.add("error");
      if (!lengthErrorMsg) {
        lengthErrorMsg = document.createElement("div");
        lengthErrorMsg.className = "pw-length-error";
        lengthErrorMsg.innerText = "비밀번호는 8~16자여야 합니다.";
        pwInput.parentElement.appendChild(lengthErrorMsg);
      }
    } else {
      pwInput.classList.remove("error");
      if (lengthErrorMsg) lengthErrorMsg.remove();
    }
    if (input.value) {
      input.classList.add("active");
      // 비밀번호 input이면 길이 검사 결과로 error 유지
      if (input !== pwInput) {
        input.classList.remove("error");
      }
    } else {
      input.classList.remove("active");
      input.classList.remove("error");
    }
    // 비번 확인 불일치
    if (input === pwInput || input === pwCheckInput) {
      // 에러 메시지 관리
      let errorMsg = document.querySelector(".pw-error-msg");
      if (
        pwInput.value &&
        pwCheckInput.value &&
        pwInput.value !== pwCheckInput.value
      ) {
        pwCheckInput.classList.add("error");
        if (!errorMsg) {
          errorMsg = document.createElement("div");
          errorMsg.className = "pw-error-msg";
          errorMsg.innerText = "비밀번호가 일치하지 않습니다.";
          pwCheckWrapper.appendChild(errorMsg);
        }
      } else {
        pwCheckInput.classList.remove("error");
        if (errorMsg) errorMsg.remove();
      }
    }
    checkAll();
  });
});
agreeChk.addEventListener("change", checkAll);

// ✅ 여기서 API 연동
form.addEventListener("submit", async function (e) {
  e.preventDefault();

  if (
    inputs[0].value &&
    inputs[1].value &&
    inputs[2].value &&
    pwInput.value &&
    pwCheckInput.value &&
    pwInput.value === pwCheckInput.value &&
    agreeChk.checked
  ) {
    const name = inputs[0].value.trim();
    const email = inputs[1].value.trim();
    const username = inputs[2].value.trim();
    const password = pwInput.value.trim();
    const password2 = pwCheckInput.value.trim();

    // 👉 확인용 로그
    console.log("회원가입 요청 시작");

    try {
      const formData = new URLSearchParams();
      formData.append("action", "signup");
      formData.append("name", name);
      formData.append("email", email);
      formData.append("username", username);
      formData.append("nickname", username); // nickname은 따로 입력 안 받으므로 username으로 대체
      formData.append("password", password);
      formData.append("password2", password2);

      const response = await fetch("https://your-api.com/auth/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      });

      const data = await response.json();

      console.log("응답 결과:", data); // 🔍 응답 확인용 로그

      if (response.ok && data.success) {
        alert("회원가입 성공! 로그인 페이지로 이동합니다.");
        location.href = "login.html";
      } else {
        alert(data.message || "회원가입에 실패했습니다.");
      }
    } catch (err) {
      console.error("회원가입 중 오류:", err);
      alert("서버 오류가 발생했습니다. 다시 시도해주세요.");
    }
  }
});

window.onload = checkAll;
// 회원가입 시 기존 로그인 정보 제거
window.localStorage.removeItem("userEmail");
window.localStorage.removeItem("userName");
window.localStorage.removeItem("userNickname");
