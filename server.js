const express = require('express'); // Express 모듈 가져오기
const fs = require('fs'); // 파일 시스템 모듈
const path = require('path'); // 파일 경로 관리 모듈

const app = express(); // Express 애플리케이션 생성

// JSON 데이터 처리 미들웨어
app.use(express.json());

// 정적 파일 제공
app.use(express.static(path.join(__dirname)));

// 파일 경로 정의
const SCENARIOS_FILE = './scenarios.json';
const CHARACTERS_FILE = './characters.json';

// 파일에서 데이터 읽기
const readData = (file) => {
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, 'utf8'));
};

// 파일에 데이터 쓰기
const writeData = (file, data) => {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
};

// 시나리오 데이터 가져오기
app.get('/api/scenarios', (req, res) => {
  const scenarios = readData(SCENARIOS_FILE);
  res.json(scenarios);
});

// 시나리오 데이터 추가
app.post('/api/scenarios', (req, res) => {
  const scenarios = readData(SCENARIOS_FILE);
  scenarios.push(req.body);
  writeData(SCENARIOS_FILE, scenarios);
  res.status(201).json({ message: 'Scenario added!' });
});

// 시나리오 데이터 삭제
app.delete('/api/scenarios/:index', (req, res) => {
  const index = parseInt(req.params.index, 10);
  const scenarios = readData(SCENARIOS_FILE);

  if (index >= 0 && index < scenarios.length) {
    scenarios.splice(index, 1); // index에 해당하는 항목 제거
    writeData(SCENARIOS_FILE, scenarios);
    res.status(200).json({ message: 'Scenario deleted!' });
  } else {
    res.status(404).json({ error: 'Scenario not found' });
  }
});

// 캐릭터 데이터 가져오기
app.get('/api/characters', (req, res) => {
  const characters = readData(CHARACTERS_FILE);
  res.json(characters);
});

// 캐릭터 데이터 추가
app.post('/api/characters', (req, res) => {
  const characters = readData(CHARACTERS_FILE);
  characters.push(req.body);
  writeData(CHARACTERS_FILE, characters);
  res.status(201).json({ message: 'Character added!' });
});

// 캐릭터 데이터 삭제
app.delete('/api/characters/:index', (req, res) => {
  const index = parseInt(req.params.index, 10);
  const characters = readData(CHARACTERS_FILE);

  if (index >= 0 && index < characters.length) {
    characters.splice(index, 1); // index에 해당하는 항목 제거
    writeData(CHARACTERS_FILE, characters);
    res.status(200).json({ message: 'Character deleted!' });
  } else {
    res.status(404).json({ error: 'Character not found' });
  }
});

// 루트 경로에서 index.html 반환
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 서버 실행
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
