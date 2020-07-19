//SELECTORS
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const todoFliter = document.querySelector('.filter-todo');
const todoContainer = document.querySelector('.todo-container');


//EVENT LISTENERS
todoButton.addEventListener("click", addTodo);
todoList.addEventListener('click', deleteCheck);
todoFliter.addEventListener('change', filterTodo);
document.addEventListener('DOMContentLoaded',getTodos); 

//FUNCTIONS

function filterTodo(e){

        const nodes = todoList.childNodes;
        nodes.forEach((node)=>{
            if(node.nodeName === "DIV"){
                todo = node;         
                switch(e.target.value){
                    case "all":
                        todo.style.display = "flex";
                        break;            
                    case "completed":
                        if(todo.classList.contains('completed')) {
                            todo.style.display = "flex";
                        }else{
                            todo.style.display = "none";
                        } 
                        break;                 
                    case "uncompleted":
                        if(!todo.classList.contains('completed')) {
                            todo.style.display = "flex";
                        }else{
                            todo.style.display = "none";
                        }
                        break;       
                }
    
            }        
        });    

}

function addTodo(e){
    e.preventDefault();
   
    if(todoInput.value == ""){        
        alert("Enter a new activity");
    }
    else{
        todos = todoList.childNodes;
       if(todos.length == 8){
        alert("Please finish the existing activity to add a new activity");
    }
    else{
        
    //create Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    todoDiv.appendChild(newTodo);

    //ADD todo to localStorage
    addToLocalStorage(todoInput.value);
  

    // check button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check">';
    completedButton.classList.add('btn-complete');
    todoDiv.appendChild(completedButton);


    // trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash">';
    trashButton.classList.add('btn-trash');
    todoDiv.appendChild(trashButton);


    // Append todoDiv to todoList
    todoList.appendChild(todoDiv);
    todoInput.value = "";
    }
    }
   
}

function deleteCheck(e){
    e.preventDefault();
    const item = e.target;

    //DELETE
    if (item.classList[0] == 'btn-trash'){
        const todo = item.parentElement;

        //ANIMATION
        todo.classList.add('fall');
        RemoveTodo(todo); 
        todo.addEventListener ('transitionend', ()=>{            
            todo.remove();
        })      
    }

    //CHECK
    if (item.classList[0] == 'btn-complete'){
        item.parentElement.classList.toggle('completed');
    }

}

function addToLocalStorage(todo){
    //Check for todos in localstorage
    let todos;
    const items = localStorage.getItem('todos');
    if(items === null){
        todos = [];
    }
    else{
        todos = JSON.parse(items);
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    let todos;
    const items = localStorage.getItem('todos');
    if(items === null){
        todos = [];
    }
    else{
        todos = JSON.parse(items);
    }
    todos.forEach((todo)=>{          
    //create Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    todoDiv.appendChild(newTodo);

    // check button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check">';
    completedButton.classList.add('btn-complete');
    todoDiv.appendChild(completedButton);


    // trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash">';
    trashButton.classList.add('btn-trash');
    todoDiv.appendChild(trashButton);

    // Append todoDiv to todoList
    todoList.appendChild(todoDiv);
    });
}

function RemoveTodo(todo){
    let todos;
    const items = localStorage.getItem('todos');
    if(items === null){
        todos = [];
    }
    else{
        todos = JSON.parse(items);
    }
    const todoText = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoText),1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

