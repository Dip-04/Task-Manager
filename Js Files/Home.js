document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList1 = document.getElementById("taskList1");
    const deadlineInput = document.getElementById("deadlineInput");
    const deadlinePicker = document.getElementById("deadlinePicker");
    const completedFilter = document.getElementById("completedFilter");
  
    loadTasks();
  
    addTaskBtn.addEventListener("click", function () {
      const taskText = taskInput.value.trim();
      if (taskText !== "") {
        addTask(taskText);
        saveTasks();
        taskInput.value = "";
      }
    });
  
    deadlinePicker.addEventListener("click", function () {
      console.log(deadlineInput.value);
    });
  
    completedFilter.addEventListener("change", function () {
      const completedTasks = document.querySelectorAll(".completed");
      if (completedFilter.checked) {
        completedTasks.forEach((task) => {
          task.parentElement.style.display = "";
        });
      } else {
        completedTasks.forEach((task) => {
          task.parentElement.style.display = "none";
        });
      }
    });
  
    function addTask(taskText) {
     
      const newRow = document.createElement("tr");
  
      const taskCell = document.createElement("td");
      taskCell.innerText = taskText;
  
      
      const deadlineCell = document.createElement("td");
      deadlineCell.innerText = deadlineInput.value || "-"; 
  
  
      const actionsCell = document.createElement("td");
      const completeBtn = document.createElement("button");
      completeBtn.className = "btn btn-success btn-sm me-3";
      completeBtn.innerText = "Complete";
      completeBtn.addEventListener("click", function () {
        newRow.classList.toggle("completed");
        saveTasks();
      });
      const removeBtn = document.createElement("button");
      removeBtn.className = "btn btn-danger btn-sm";
      removeBtn.innerText = "Remove";
      removeBtn.addEventListener("click", function () {
        newRow.remove();
        saveTasks();
      });
      actionsCell.appendChild(completeBtn);
      actionsCell.appendChild(removeBtn);
  
     
      newRow.appendChild(taskCell);
      newRow.appendChild(deadlineCell);
      newRow.appendChild(actionsCell);
  
      
      taskList1.appendChild(newRow);
    }
  
    function saveTasks() {
      localStorage.setItem("tasks", taskList1.innerHTML);
    }
  
    function loadTasks() {
      const tasks = localStorage.getItem("tasks");
      if (tasks) {
        taskList1.innerHTML = tasks;
  
      
        const completeButtons = document.querySelectorAll(".btn-success");
        completeButtons.forEach((button) => {
          button.addEventListener("click", function () {
            button.parentElement.parentElement.classList.toggle("completed");
            saveTasks();
          });
        });
  
        
        const removeButtons = document.querySelectorAll(".btn-danger");
        removeButtons.forEach((button) => {
          button.addEventListener("click", function () {
            button.parentElement.parentElement.remove();
            saveTasks();
          });
        });
      }
    }
  });
  