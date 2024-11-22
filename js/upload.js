const uploadForm = document.getElementById('uploadForm');

uploadForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const uploadType = document.getElementById('uploadType').value;
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  const imageURL = document.getElementById('imageURL').value;

  const data = { title, content, image: imageURL || null };

  // 서버에 업로드
  const response = await fetch(`/api/${uploadType}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    alert(`${uploadType === 'scenarios' ? '시나리오' : '캐릭터'} 업로드 성공!`);
    location.reload();
  } else {
    alert('업로드 실패. 다시 시도하세요.');
  }
});
