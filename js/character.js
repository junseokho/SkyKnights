const characterList = document.getElementById('characterList'); // 캐릭터 목록을 담는 부모 컨테이너
let activeDeleteBtn = null; // 현재 활성화된 삭제 버튼

// Fetch characters from the local JSON file
fetch('characters.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Failed to fetch data from JSON file');
    }
    return response.json();
  })
  .then((characters) => {
    if (characters.length === 0) {
      characterList.innerHTML = '<p class="empty">아직 캐릭터 데이터가 없습니다.</p>';
    } else {
      characters.forEach((character, index) => {
        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
          <h3>${character.title}</h3>
          <p>${character.content}</p>
          ${character.image ? `<img src="${character.image}" alt="캐릭터 이미지" style="max-width: 100%; height: auto;">` : ''}
        `;

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

        card.appendChild(deleteBtn);
        characterList.appendChild(card);
      });
    }
  })
  .catch(() => {
    characterList.innerHTML = '<p class="error">캐릭터 데이터를 로드할 수 없습니다.</p>';
  });

// Function to delete a character
function deleteCharacter(index) {
  fetch('characters.json')
    .then((response) => response.json())
    .then((characters) => {
      characters.splice(index, 1); // Remove the character at the specified index

      // Create a downloadable JSON blob
      const blob = new Blob([JSON.stringify(characters, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'characters.json';
      a.click();
      URL.revokeObjectURL(url);
      
      alert('캐릭터가 삭제되었습니다.');
      location.reload(); // Reload the page to update the list
    });
}
