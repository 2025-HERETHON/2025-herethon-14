document.addEventListener('DOMContentLoaded', () => {
    const savedCards = JSON.parse(localStorage.getItem('scrappedCards')) || [];

    const container = document.getElementById('cardGrid');
    container.innerHTML = '';

    savedCards.forEach(card => {
        const cardHtml = `
            <div class="escape-card">
                <div class="card-header">
                    <div class="profile-img">
                        <img src="../assets/profile.png" alt="프로필 이미지" />
                    </div>
                    <div class="user-name">${card.username}</div>
                    <button class="scrap-icon">
                        <img src="../assets/scrab.png">
                    </button>
                </div>
                <div class="card-body">
                    <div class="card-title">${card.title}</div>
                    <div class="card-content">${card.content}</div>
                </div>
                <div class="card-date">${card.date}</div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', cardHtml);
    });
});
