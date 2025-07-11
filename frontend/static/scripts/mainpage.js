window.addEventListener("DOMContentLoaded", function () {
  // localStorage에서 로그인 정보 확인 (userName or userNickname)
  const userName = localStorage.getItem("userName");
  const userNickname = localStorage.getItem("userNickname");

  // 메뉴의 마지막 li(원래 프로필/로그인 버튼 들어가는 자리)
  const menuAndLogin = document.querySelector(".menu-and-login .nav ul");
  const profileLinkLi = menuAndLogin.querySelector("li:last-child");

  if (userName || userNickname) {
    // 로그인 상태: 프로필/이름 표시, a태그는 내 타임로그로
    profileLinkLi.innerHTML = `
      <a href="timelog.html" class="profile-link">
        <span class="profile-img-wrap">
          <img src="../assets/profile.svg" alt="프로필" />
          <span class="profile-name">${userNickname || userName}님</span>
        </span>
      </a>
    `;
    // 로그아웃 버튼 동작
    document.getElementById("logoutBtn").onclick = function () {
      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userNickname");
      location.reload();
    };
  } else {
    // 로그아웃 상태: 로그인 버튼(a태그, 로그인페이지로)
    profileLinkLi.innerHTML = `
      <a href="login.html" class="main-login-btn">로그인</a>
    `;
  }
}); 
