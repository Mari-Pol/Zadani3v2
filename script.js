window.onload = updateStoredTasks;

const deleteBtns = document.getElementsByClassName("delete");
for(let i = 0; i < deleteBtns.length; i++) {
    const deleteBtn = deleteBtns[i];
    deleteBtn.addEventListener("click", function(ev){
      const liElement = ev.target.parentElement;
      liElement.parentElement.removeChild(liElement);
    });
}
  
var list = document.getElementById("myList");

function updateStoredTasks() {
  const storedTasks = JSON.parse(localStorage.getItem("STORED_TASKS") || "[]");
  for(let i = 0; i < storedTasks.length; i++) {
    const storedTask = storedTasks[i];
    addTaskIntoUI(storedTask);
  }
}

function addTask(){
  var value = document.getElementById("ToDoTask").value;
  if (!value) {
    alert("Please fill out toDo task");
    return;
  }

  const storedTasks = JSON.parse(localStorage.getItem("STORED_TASKS") || "[]");
  storedTasks.push(value);
  localStorage.setItem("STORED_TASKS", JSON.stringify(storedTasks));
  
  addTaskIntoUI(value);
}

function addTaskIntoUI(task){      
  var li = document.createElement("LI");      
  var deleteSpan = document.createElement('span')
  deleteSpan.innerHTML = "x";
  deleteSpan.classList.add("delete");
  deleteSpan.addEventListener("click", function(ev){
    let storedTasks = JSON.parse(localStorage.getItem("STORED_TASKS") || "[]");
    storedTasks = storedTasks.filter(value => value !== task);
    localStorage.setItem("STORED_TASKS", JSON.stringify(storedTasks));
    
    const liElement = ev.target.parentElement;
    liElement.parentElement.removeChild(liElement);
  });
  var textNode = document.createTextNode(task);

  li.appendChild(deleteSpan);
  li.appendChild(textNode);
  list.appendChild(li);
}

list.addEventListener("click", function(ev){
  if (ev.target.tagName === "LI") {
    ev.target.classList.toggle("checked");
  }
});