// 이벤트 루프
// 싱글 스레드 - JS 언어 - 인력 1

// 비동기
// setTimeout : 뒤에
// setInterval : 마다

// 뒤로 뺀다는 느낌인가..?
setInterval(() => {
  console.log("Hello");
}, 0);
// setInterval(반복시킬 콜백함수, 시간)

console.log("bye");
