// ✅ 1. 페이지 로딩 시 세션 초기화 (GET 요청)
window.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('https://nexit.com/auth/api/signup', {
            method: 'GET',
        });
        const result = await response.json();
        console.log('초기화 결과:', result.message);
    } catch (error) {
        console.error('세션 초기화 실패:', error);
    }
});

// ✅ 2. DOM 요소 선택
const form = document.getElementById('signup-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const password2Input = document.getElementById('password2');
const nameInput = document.getElementById('name');
const usernameInput = document.getElementById('username');
const termsCheckbox = document.getElementById('terms');
const submitBtn = document.getElementById('submit-btn');

// ✅ 3. 버튼 활성화 조건 체크 함수
function validateInputs() {
    const name = nameInput.value.trim();
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    const password2 = password2Input.value;
    const termsChecked = termsCheckbox.checked;

    const isValid =
        name !== '' &&
        username !== '' &&
        password.length >= 8 &&
        password.length <= 16 &&
        password === password2 &&
        termsChecked;

    if (isValid) {
        submitBtn.classList.add('active');
        submitBtn.disabled = false;
    } else {
        submitBtn.classList.remove('active');
        submitBtn.disabled = true;
    }
}

// ✅ 4. 입력값 변경 시 버튼 상태 업데이트
[
    nameInput,
    usernameInput,
    passwordInput,
    password2Input,
    termsCheckbox
].forEach((el) => {
    el.addEventListener('input', validateInputs);
    el.addEventListener('change', validateInputs);
});

// ✅ 4-1. 입력값 있을 때 input 테두리 민트색 (.filled)
document.querySelectorAll('.input-group input').forEach(input => {
    input.addEventListener('input', () => {
        if (input.value.trim() !== '') {
            input.classList.add('filled');
        } else {
            input.classList.remove('filled');
        }
    });
});


// ✅ 5. 회원가입 제출 이벤트
form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const password2 = password2Input.value;
    const name = nameInput.value.trim();
    const username = usernameInput.value.trim();  // username -> nickname 으로 전송
    const termsChecked = termsCheckbox.checked;

    if (!termsChecked) {
        alert('개인정보 수집 및 이용에 동의해주세요.');
        return;
    }

    try {
        // 이메일 중복 확인
        const emailCheck = await fetch('https://nexit.com/auth/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                email,
                action: 'check_email'
            })
        });
        const emailResult = await emailCheck.json();
        if (!emailResult.success) {
            alert(emailResult.message);
            return;
        }

        // 비밀번호 일치 확인
        const pwCheck = await fetch('https://nexit.com/auth/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                password,
                password2,
                action: 'check_password'
            })
        });
        const pwResult = await pwCheck.json();
        if (!pwResult.success) {
            alert(pwResult.message);
            return;
        }

        // 회원가입 최종 요청
        const signupRes = await fetch('https://nexit.com/auth/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                email,
                password,
                password2,
                name,
                nickname: username,
                action: 'signup'
            })
        });

        const signupResult = await signupRes.json();

        if (signupResult.success) {
            alert(signupResult.message);
            form.reset();
            submitBtn.classList.remove('active');
            submitBtn.disabled = true;
            window.location.href = 'login.html';
        } else {
            alert(signupResult.message);
        }
    } catch (error) {
        console.error('회원가입 오류:', error);
        alert('서버 오류가 발생했습니다.');
    }
});
