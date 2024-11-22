const uploadForm = document.getElementById('uploadForm');

uploadForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const uploadType = document.getElementById('uploadType').value; // 'scenarios' or 'characters'
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  const imageURL = document.getElementById('imageURL').value;

  const data = { title, content, image: imageURL || null };

  // Fetch existing JSON file and append new data
  fetch(`${uploadType}.json`)
    .then((response) => response.json())
    .then((items) => {
      items.push(data);

      // Create a downloadable JSON blob
      const blob = new Blob([JSON.stringify(items, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `${uploadType}.json`; // 'scenarios.json' or 'characters.json'
      a.click();
      URL.revokeObjectURL(url);

      alert(`${uploadType === 'scenarios' ? '시나리오' : '캐릭터'} 업로드 성공!`);
    })
    .catch((error) => {
      console.error('업로드 오류:', error);
      alert('업로드 실패. 다시 시도하세요.');
    });
});
