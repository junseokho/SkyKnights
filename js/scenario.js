// 시나리오 데이터 (JSON 데이터를 직접 변수로 정의)
const scenarios = [
  {
    "title": "붉은 머리 쌍둥이",
    "content": "그들은 소녀들의 미소를 지켰고 비로소 베테랑 탐공사로서 이름을 알렸다.",
    "image": "https://postfiles.pstatic.net/MjAyNDExMjJfMTI4/MDAxNzMyMjU4NDM0Mjkw.GpBXZsi538N5vwupHPrOyyw04PKAitaWWFUODiZ4ePcg.K1fvlklndaVz0wwO4IzC4iZSESEyLXgGDlFKnxeu1DIg.JPEG/%EC%9E%90%EB%A7%A4.jpg?type=w966"
  },
  {
    "title": "무인 탑과 수수께끼의 소녀",
    "content": "그들은 무인탑에서 수수께끼의 코펠리아 소녀를 만났다. \n앞으로 그들에게 어떤 모험이 기다리고 있을까?",
    "image": "https://postfiles.pstatic.net/MjAyNDExMjJfMjYx/MDAxNzMyMjU4MzQ2MTE3.sf4-COT3xMwCQqnUqZ1PGLLLQ816Fa1pJk9Z-i7SoKIg.X1uNoGysotI3q4dIRpBUBO6Ol6NYYdDwUG_Z2YwTRoMg.JPEG/1000013598.jpg?type=w966"
  },
  {
    "title": "즐거운 여행",
    "content": "공적으로 인한 추락, 신비로운 무인 탑, 알 수 없는 항로, 모든 것이 탐공사들에게 말하고 있다. 무언가 거대한 것이 그들을 기다리고 있다고.",
    "image": "https://postfiles.pstatic.net/MjAyNDExMjJfMTg3/MDAxNzMyMjU4NTgwMjEz.KfBXdfMq_LUE2mEd9-tDxvZJV0rJSYZx2Q4RfkDpw4Ig.UwFh7-ByTl1FcWuNz8lJzxj8C3amQeTxdhvz7plojiYg.JPEG/1729864329429.jpg?type=w966"
  }
];

const scenarioList = document.getElementById('scenarioList');
let activeDeleteBtn = null; // 현재 활성화된 삭제 버튼

// 시나리오 데이터 렌더링
if (scenarios.length === 0) {
  scenarioList.innerHTML = '<p class="empty">아직 시나리오 데이터가 없습니다.</p>';
} else {
  scenarios.forEach((scenario, index) => {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
      <h3>${scenario.title}</h3>
      <p>${scenario.content}</p>
      ${scenario.image ? `<img src="${scenario.image}" alt="시나리오 이미지" style="max-width: 100%; height: auto;">` : ''}
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

      if (confirm('정말 이 시나리오를 삭제하시겠습니까?')) {
        deleteScenario(index);
      }
    });

    card.appendChild(deleteBtn);
    scenarioList.appendChild(card);
  });
}

// 시나리오 삭제 함수
function deleteScenario(index) {
  scenarios.splice(index, 1); // 선택한 시나리오 삭제

  // 새로운 JSON 데이터 다운로드
  const blob = new Blob([JSON.stringify(scenarios, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'scenarios.json';
  a.click();
  URL.revokeObjectURL(url);

  alert('시나리오가 삭제되었습니다.');
  location.reload(); // 새로고침하여 변경 사항 적용
}
