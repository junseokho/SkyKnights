const characterList = document.getElementById('characterList'); // 캐릭터 목록을 담는 부모 컨테이너
let activeDeleteBtn = null; // 현재 활성화된 삭제 버튼

// Fetch characters from the server
fetch('/api/characters')
  .then((res) => res.json())
  .then((characters) => {
    if (characters.length === 0) {
      characterList.innerHTML = '<p class="empty">아직 캐릭터 데이터가 없습니다.</p>';
    } else {
      characters.forEach((character, index) => {
        // Create card element
        const card = document.createElement('div');
        card.className = 'card';

        // Set card content
        card.innerHTML = `
          <h3>${character.title}</h3>
          <p>${character.content}</p>
          ${character.image ? `<img src="${character.image}" alt="캐릭터 이미지">` : ''}
        `;


        // Create delete button
        const deleteBtn = document.createElement('span');
        deleteBtn.textContent = '×';
        deleteBtn.className = 'delete-btn';
        deleteBtn.dataset.index = index;

        // Show delete button on card click
        card.addEventListener('click', () => {
          if (activeDeleteBtn) {
            activeDeleteBtn.style.display = 'none'; // Hide previous button
          }
          deleteBtn.style.display = 'block'; // Show current button
          activeDeleteBtn = deleteBtn;
        });

        // Handle delete button click
        deleteBtn.addEventListener('click', (e) => {
          e.stopPropagation(); // Prevent card click event
          const index = deleteBtn.dataset.index;

          if (confirm('정말 이 캐릭터를 삭제하시겠습니까?')) {
            deleteCharacter(index);
          }
        });

        // Append delete button to card
        card.appendChild(deleteBtn);

        // Append card to parent container
        characterList.appendChild(card);
      });
    }
  })
  .catch(() => {
    characterList.innerHTML = '<p class="error">캐릭터 데이터를 로드할 수 없습니다.</p>';
  });

// Function to delete a character
function deleteCharacter(index) {
  fetch(`/api/characters/${index}`, { method: 'DELETE' })
    .then((res) => {
      if (res.ok) {
        alert('캐릭터가 삭제되었습니다.');
        location.reload(); // Reload the page to update the list
      } else {
        alert('삭제 실패. 다시 시도하세요.');
      }
    });
}
