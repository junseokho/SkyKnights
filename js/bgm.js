// bgm.js
if (!window.audioPlayer) {
    // 오디오 객체 생성 또는 기존 상태 복원
    const savedTime = localStorage.getItem('bgmTime') || 0; // 마지막 재생 위치
    const isMuted = localStorage.getItem('bgmMuted') === 'true'; // 음소거 상태

    window.audioPlayer = new Audio('assets/audio/bgm.mp3'); // MP3 파일 경로
    window.audioPlayer.loop = true; // 반복 재생
    window.audioPlayer.volume = 0.5; // 볼륨 설정
    window.audioPlayer.currentTime = savedTime; // 이전 재생 위치 설정
    window.audioPlayer.muted = isMuted; // 음소거 상태 복원
    window.audioPlayer.play().then(() => {
        window.audioPlayer.muted = false; // 음소거 해제
    }).catch((e) => {
        console.log('자동 재생 차단: ', e);
    });


    // 재생 위치 저장
    setInterval(() => {
        localStorage.setItem('bgmTime', window.audioPlayer.currentTime); // 재생 시간 저장
        localStorage.setItem('bgmMuted', window.audioPlayer.muted); // 음소거 상태 저장
    }, 1000);

    // 클릭 시 음소거 해제
    document.addEventListener('click', () => {
        if (window.audioPlayer.muted) {
            window.audioPlayer.muted = false;
            localStorage.setItem('bgmMuted', 'false'); // 음소거 상태 업데이트
        }
    });
}
