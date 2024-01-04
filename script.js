//GET THE RELEVANT DOM ELEMENTS
const submitForm=document.getElementById(`submitTodo`);
const inputForm=document.getElementById(`submitButton`);
const ulEl=document.getElementById(`todoList`);


const storedValues=JSON.parse(localStorage.getItem(`todos`))||[];

storedValues.forEach((value)=>{
    logTodo(value);
})

//ADD EVENT LISTENER TO FORM ELEMENT TO LISTEN TO SUBMIT EVENT
submitForm.addEventListener(`submit`,(e)=>{
    e.preventDefault();
    logTodo();
})

function logTodo(todo){
    //GET INPUT VALUE
    let inputValue=inputForm.value;
    //CREATE A LIST ELEMENT TO APPEND THE VALUE TO THE CURRENT LIST
    if(todo){
        inputValue=todo.todo;
    }
    const newLiEl=document.createElement(`li`);
    newLiEl.className=`todoitem`;
    if(todo && todo.completed){
        newLiEl.classList.add(`completed`);
    }
    newLiEl.appendChild(document.createTextNode(inputValue));
    ulEl.appendChild(newLiEl);

    inputForm.value=``;

    //FUNCTION TO DELETE ITEM...ADD EVENT LISTENER TO THE ULELEMENT
    newLiEl.addEventListener(`click`,()=>{
        newLiEl.classList.toggle(`completed`);
        updateLs();
    })
    updateLs();
}

function updateLs(){
    const todoValue=document.querySelectorAll(`.todoitem`);
    const arrayToStoreValues=[];
    todoValue.forEach((val)=>{
        arrayToStoreValues.push(
            {
            todo:val.innerText,
            completed:val.classList.contains(`completed`)
            })
    })
    localStorage.setItem(`todos`,JSON.stringify(arrayToStoreValues));
}

