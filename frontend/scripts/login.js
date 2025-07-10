const form = document.getElementById('login-form');

form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim(); 
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('error-msg');

    try {
        const response = await fetch('/auth/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({ username, password })
        });

        const result = await response.json();

        if (result.success) {
            window.location.href = 'main.html';
        } else {
            errorMsg.textContent = result.message || '아이디 또는 비밀번호가 일치하지 않습니다.';
            errorMsg.style.display = 'block';
        }
    } catch (error) {
        console.error('서버 오류:', error);
        errorMsg.textContent = '서버 오류가 발생했습니다.';
        errorMsg.style.display = 'block';
    }
});
