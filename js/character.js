// JSON 데이터 가져오기 및 렌더링
fetch('characters.json')
  .then((response) => response.json())
  .then((characters) => {
    const characterList = document.getElementById('characterList');

    if (characters.length === 0) {
      characterList.innerHTML = '<p>아직 등록된 영웅이 없습니다.</p>';
    } else {
      characters.forEach((character) => {
        const card = document.createElement('div');
        card.className = 'card';

        card.innerHTML = `
          <img src="${character.image}" alt="${character.title}">
          <h3>${character.title}</h3>
          <p>${character.content}</p>
        `;

        characterList.appendChild(card);
      });
    }
  })
  .catch((error) => {
    console.error('데이터를 가져오는 중 오류 발생:', error);
  });
