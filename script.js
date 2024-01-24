const Form = document.querySelector(`.addTodoForm`);
const listContainer = document.querySelector(`.listContainer`);
const input = document.getElementById(`todo`);
//FUNCTION TO FIND HIGHEST ID
function findHighestId() {
  const existingCheckboxes = document.querySelectorAll(".checkbox-round");
  let id = 0;

  existingCheckboxes.forEach((checkbox) => {
    const idNumber = parseInt(checkbox.id.replace("checkbox-", ""), 10);
    if (!isNaN(idNumber) && idNumber > id) {
      id = idNumber;
    }
  });

  return id;
}

let id = findHighestId();

const data = JSON.parse(localStorage.getItem(`todoData`) || "[]");
Array.from(data).forEach((val) => {
  loadItems(val);
});
Form.addEventListener("submit", (e) => {
  e.preventDefault();
  const getVal = input.value;
  const newItem = {
    id: findHighestId() + 1,
    text: getVal,
    checked: false,
  };
  loadItems(newItem);
  input.value = "";
});

function loadItems(item) {
  const liEl = document.createElement(`li`);
  liEl.className = "listItem";
  liEl.innerHTML = `<div class="flex">
  <input type="checkbox" id="${item.id}" class="checkbox-round" ${
    item.checked ? "checked" : ""
  } />

  <label for="${item.id}">${item.text}</label>
</div>
<button
  class="deleteBtn"
  onMouseOver="this.style.backgroundColor='red'"
  onMouseOut="this.style.backgroundColor='green'"
>
  <i class="fa-solid fa-trash-can"></i>
</button>`;
  listContainer.appendChild(liEl);
  input.value = "";

  const deleteBtn = liEl.querySelector(".deleteBtn");
  deleteBtn.addEventListener(`click`, (e) => {
    const childEl = e.target.parentElement.parentElement;
    childEl.remove();
    updateLocalStorage();
  });

  const inputs = liEl.querySelectorAll(`.checkbox-round`);
  Array.from(inputs).forEach((val) => {
    val.addEventListener(`click`, () => {
      const parent = val.parentElement.parentElement;
      if (val.checked) {
        parent.classList.add(`strike`);
      } else {
        parent.classList.remove("strike");
      }
      updateLocalStorage();
    });
  });
  updateLocalStorage();
}

function updateLocalStorage() {
  const listItems = document.querySelectorAll(".listItem");
  const todoData = [];

  listItems.forEach((item) => {
    const checkbox = item.querySelector(".checkbox-round");
    const label = item.querySelector("label");

    todoData.push({
      id: checkbox.id,
      text: label.textContent,
      checked: checkbox.checked,
    });
  });

  // Save todoData to local storage
  localStorage.setItem("todoData", JSON.stringify(todoData));
}
