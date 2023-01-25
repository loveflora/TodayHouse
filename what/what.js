// 1. 변수 설정 - 가져오기
const todoInput = document.querySelector(".todoInput");
const addBtn = document.querySelector(".addBtn");
const ul = document.querySelector(".todoUl");

// 2. Input
// 1) todoInputValue 함수 실행
const todoInputValue = () => {
  const data = todoInput.value;
  console.log(data);
  const li = document.createElement("li");
  li.innerText = data;
  ul.appendChild(li);
  data = "";
};

// 2) click 이벤트
addBtn.addEventListener("click", todoInputValue);
