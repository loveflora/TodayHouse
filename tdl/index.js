// 변수 선언 - 가져오기

const todoInput = document.querySelector(".todo_field__input");
const addButton = document.querySelector(".add_todo__button");
const todoList = document.querySelector(".todo_list__ul");

// 배열 새로 생성
const willSaveTodos = [];

const saveTodo = (todoText) => {
  console.log(todoText);
  willSaveTodos.push(todoText);

  console.log(willSaveTodos);

  localStorage.setItem("TODO_LIST", JSON.stringify(willSaveTodos));
  // (key, value)
  // localstorage : 대문자
  // 문자열만 저장
  // JSON.stringfy() : 배열 -> 문자열

  // console.log(JSON.stringify(willSaveTodos));
};
// 함수 - 호출되면 죽어버림

const loadTodo = () => {
  const getFromStorage = JSON.parse(localStorage.getItem("TODO_LIST"));
  // key값

  // parse : 해석하다 변조하다
  // 문자열 -> 배열

  for (let i = 0; i < getFromStorage.length; i++) {
    console.log(getFromStorage[i]);
  }
};

loadTodo();

const getInputValue = () => {
  const value = todoInput.value;
  const li = document.createElement("li");
  // 1) li 태그 생성

  li.innerText = getFromStorage[i];
  // 2) text 안에 삽입
  // 속성값임

  todoList.appendChild(li);
  // 어떤 element 안에 자식으로 넣겠다

  // input 초기화
  todoInput.value = "";

  saveTodo(value);
};

// 이벤트 - 명령 내림
addButton.addEventListener("click", getInputValue);
// addEventListener 기본적 내장되어 있는 함수 - 메서드
// (type, listener)
// (이벤트 타입, 뭘 수행시킬 것인가)
