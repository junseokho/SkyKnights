const scenarioList = document.getElementById('scenarioList'); // 시나리오 목록을 담는 부모 컨테이너
let activeDeleteBtn = null; // 현재 활성화된 삭제 버튼

// Fetch scenarios from the server
fetch('/api/scenarios')
  .then((res) => res.json())
  .then((scenarios) => {
    if (scenarios.length === 0) {
      scenarioList.innerHTML = '<p class="empty">아직 시나리오 데이터가 없습니다.</p>';
    } else {
      scenarios.forEach((scenario, index) => {
        // Create card element
        const card = document.createElement('div');
        card.className = 'card';

        // Set card content
        card.innerHTML = `
          <h3>${scenario.title}</h3>
          <p>${scenario.content}</p>
          ${scenario.image ? `<img src="${scenario.image}" alt="시나리오 이미지">` : ''}
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

          if (confirm('정말 이 시나리오를 삭제하시겠습니까?')) {
            deleteScenario(index);
          }
        });

        // Append delete button to card
        card.appendChild(deleteBtn);

        // Append card to parent container
        scenarioList.appendChild(card);
      });
    }
  })
  .catch(() => {
    scenarioList.innerHTML = '<p class="error">시나리오 데이터를 로드할 수 없습니다.</p>';
  });

// Function to delete a scenario
function deleteScenario(index) {
  fetch(`/api/scenarios/${index}`, { method: 'DELETE' })
    .then((res) => {
      if (res.ok) {
        alert('시나리오가 삭제되었습니다.');
        location.reload(); // Reload the page to update the list
      } else {
        alert('삭제 실패. 다시 시도하세요.');
      }
    });
}
