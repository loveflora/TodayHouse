// 변수 선언 - 가져오기
const todoInput = document.querySelector(".todo_field__input");
const addButton = document.querySelector(".add_todo__button");
const todoList = document.querySelector(".todo_list__ul");

// 1. input 값 입력 후 - '추가' btn 클릭

// 2. saveTodo 함수 정의 ---> 저장소에 값 저장
const saveTodo = (todoText) => {
  // 1) 기존 데이터 가져옴
  const getFromStorage = JSON.parse(localStorage.getItem("TODO_LIST")) || [];
  // null || []
  // error || 공백 ===> 에러 안나게 공백처리한거랑 마찬가지

  // 2) 기존 데이터 배열에 값 추가
  localStorage.setItem(
    "TODO_LIST",
    JSON.stringify([
      ...getFromStorage,
      { id: getFromStorage.length + 1, value: todoText },
    ]),
  );
  // (1) localStorage.setItem(KEY 대문자, value) : 문자열만 저장
  // setItem : 덮어 씌운다
  // JSON.stringfy() : 배열 -> 문자열 (JSON 파일로 변환)
  // JSON.parse() : 문자열 -> 배열  ------- *** parse : 해석하다 변조하다

  // (2) id: 고유의 값
};
// 함수 - 호출되면 죽어버림

// 4. delete 함수 정의
const deleteTodo = (e) => {
  const getFromStorage = JSON.parse(localStorage.getItem("TODO_LIST")) || [];
  const dbtn = e.target;
  const li = dbtn.parentNode;
  li.remove();

  const delTodos = getFromStorage.filter((v) => v.id !== parseInt(li.id));

  localStorage.setItem("TODO_LIST", JSON.stringify([...delTodos]));

  console.log(delTodos);
  console.log(getFromStorage);
};

// Update 기능
// 수정버튼 - input 수정완료 - text
const updateTodo = (e) => {
  const ubtn = e.target;

  // span
  ubtn.parentNode.firstChild.className = "element__hidden";
  // input
  ubtn.parentNode.lastChild.className = "";
  // li --> input 태그로 변경
  // toggle --- css display : none
};

// 1) getInputValue 함수 정의
const getInputValue = () => {
  const getFromStorage = JSON.parse(localStorage.getItem("TODO_LIST")) || [];

  // (1) input 값 가져오기
  const data = todoInput.value;
  // (2) li 태그 생성
  const li = document.createElement("li");
  const span = document.createElement("span");
  // (3) text 안에 값 삽입
  span.innerText = data;

  li.appendChild(span);
  // *** innerText는 속성값임
  // (4) 어떤 element 안에 자식으로 넣겠다
  todoList.appendChild(li);
  // *** appendChild()는 "따옴표" 사용하지 않음
  // ** ul 요소 안에 자식으로 li 넣음
  li.id = getFromStorage.length + 1;

  // (5) 삭제버튼 이하 동일
  const btn = document.createElement("button");
  btn.id = getFromStorage.length + 1;
  // *** className 부여
  li.className = "liClass";
  btn.className = "deleteBtn";
  btn.innerText = "삭제";
  li.appendChild(btn);
  // ** li 요소 안에 자식으로 btn 넣음
  btn.addEventListener("click", deleteTodo);

  // (6) 수정버튼
  const updateBtn = document.createElement("button");
  updateBtn.innerText = "수정";
  li.appendChild(updateBtn);
  updateBtn.addEventListener("click", updateTodo);

  // (7) input 엘리먼트 추가
  const inputForEdit = document.createElement("input");
  //? input요소에 hidden class 추가
  inputForEdit.value = data;
  inputForEdit.className = "element__hidden";
  li.appendChild(inputForEdit);

  // (8) input 초기화
  todoInput.value = "";
  // *** data = ""; 라고 하면 error  ====> const 재할당 안됨 !!!
  // (9) 2. 저장소에 값 저장
  saveTodo(data);
};

// 2) btn 클릭 시, getInputValue 함수 실행
addButton.addEventListener("click", getInputValue);
// 이벤트 - 명령 내림
// addEventListener 기본적 내장되어 있는 함수 - 메서드
// (type, listener) === (이벤트 타입, 뭘 수행시킬 것인가)

// 3. loadTodo 함수 정의 ---> 1) 저장된 값 가져와서  2) li 뿌려줌
const loadTodo = () => {
  // 1) 저장된 값 가져옴
  const getFromStorage = JSON.parse(localStorage.getItem("TODO_LIST")) || [];

  // 2) 데이터 값 개수만큼 li 뿌려줌
  for (let i = 0; i < getFromStorage.length; i++) {
    const li = document.createElement("li");
    li.innerText = getFromStorage[i].value;

    // id 추가
    li.id = getFromStorage[i].id;
    todoList.appendChild(li);
    const btn = document.createElement("button");
    btn.innerText = "삭제";
    li.appendChild(btn);
    btn.addEventListener("click", deleteTodo);

    // 수정
    const editBtn = document.createElement("button");
    editBtn.innerText = "수정";
    li.appendChild(editBtn);
    editBtn.addEventListener("click", updateTodo);
  }
};

// console.log(todoList.li);
// 3. loadTodo 함수 실행 (저장된 값 가져와서, li 뿌려줌)
loadTodo();
