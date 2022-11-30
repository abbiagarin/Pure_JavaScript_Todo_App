"use strict";

const homePage = $(".todo__container");
const createTaskBtn = $(".create__btn");
const titleForm = $(".title__form");
const overlay = $(".overlay");
const getTitleBtn = $(".submit__title--btn");
const cancelTitleBtn = $(".cancel__title--btn");
const titleInputField = $(".form__group-input");
const taskTitleContainer = $(".title__lists");
const descInputField = $(".desc__group-input");
const createDescBtn = $(".plus__icon-wrapper");
const descriptionForm = $(".description__form");
const addDescBtn = $(".save__btn");
const cancelDescForm = $(".cancel__desc-btn");
const editTaskForm = $(".edit__form");
const updateBtn = $(".update__btn");

const closeModal = () => {
  overlay.classList.remove("hidden");
  homePage.classList.remove("overlay");
  titleForm.classList.add("hidden");
  descriptionForm.classList.add("hidden");

  //clear fields and input
  titleForm.title.value = "";
  descriptionForm.text.value = "";
  descriptionForm.date.value = "";
  titleInputField.classList.remove("error");
  titleInputField.classList.remove("success");
  descInputField.classList.remove("error");
  descInputField.classList.remove("success");
};

const saveDataToLocalStorage = (task) => {
  localStorage.setItem("tasks", JSON.stringify(task));
};

const getDataFromLocalStorage = () => {
  const data = localStorage.getItem("tasks");
  if (data === null) {
    return [];
  }
  return JSON.parse(data);
};

const saveTaskTitle = (data) => {
  let tasks = getDataFromLocalStorage();

  tasks.push(data);
  saveDataToLocalStorage(tasks);
};

const deleteTask = (e) => {
  const id = e.parentElement.dataset.id;
  console.log(e.parentElement);
  const tasks = getDataFromLocalStorage();
  e.parentElement.remove();

  tasks.forEach((task, i) => {
    if (id == task.id) {
      tasks.splice(i, 1);
    }
  });
  saveDataToLocalStorage(tasks);
};

const displayTaskTitle = (data) => {
  let html = `
  <div class="title__list" data-id = ${data.id}>
  <span class="task_title">${data.titleInput}</span>
  <span onClick = "deleteTask(this)" class="options del__option"><i class=" fas fa-trash-alt"></i></span> <br>
  <span class=" task_date created_date">Created: ${data.createdDate}</span>
</div>

  `;
  $(".title__lists").insertAdjacentHTML("afterbegin", html);
};

const displayDescTask = (data) => {
  let html = `
  <div class="desc__list" >
    <div class="todo__desc-heading" data-id =${data.id}>
      <span class="todo__desc-heading">${data.titleInput}</span>
      <span class="options del__option"><i class=" fas fa-trash-alt"></i></span>
      <span onClick ="displayEditForm(); editTask(this)" class="options edit__option"><i class="fas fa-edit"></i></span>
    </div>
    <div class="todo__desc-content">
      <p class="task__description">${data.description}</p>
      <p class="task_date due_date">Due Date: ${data.dueDate}</p>
    </div>
</div>
  
   `;
  $(".desc__lists").innerHTML = html;
};

const editTask = (e) => {};

const selectTitleTask = (e) => {
  if (e.target.classList.contains("title__list")) {
    const id = e.target.dataset.id;
    const tasks = getDataFromLocalStorage();
    let task = tasks.find((task) => task.id == id);
    displayDescTask(task);
  }
};

const addDescription = (e) => {
  e.preventDefault();
  const descInput = $(".desc__group-input").value.trim();
  const dateInput = $(".form__group-date").value;
  const errorMsg = $(".form__group-description");

  //validation
  if (!descInput) {
    errorMsg.textContent = "Task required!!";
    descInputField.classList.add("error");
    return alert("Task required!!");
  } else {
    errorMsg.textContent = "";
    descInputField.classList.add("success");
  }

  if (!dateInput) return alert("Due date is required!!");

  const id = $(".todo__desc-heading").dataset.id;
  const tasks = getDataFromLocalStorage();
  const updatedTasks = tasks.map((task) => {
    if (task.id === +id) {
      task.description = descInput;
      task.dueDate = dateInput;
      displayDescTask(task);
      return task;
    }
    return task;
  });
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  closeModal();
};

const getTaskTitle = (e) => {
  e.preventDefault();

  const titleInput = titleForm.title.value.trim();
  const errorMsg = $(".form__group-small");

  // validation
  if (!titleInput) {
    errorMsg.textContent = "Task required!!";
    titleInputField.classList.add("error");
    return alert("task required!!");
  } else {
    errorMsg.textContent = "";
    titleInputField.classList.add("success");
  }

  let now = new Date();
  let day = now.getDate();
  let month = now.getMonth();
  let year = now.getFullYear();

  const task = {
    id: Math.random(),
    titleInput,
    createdDate: `${day}-${month}-${year}`,
    description: "",
    dueDate: "",
  };

  saveTaskTitle(task);
  displayTaskTitle(task);
  closeModal();
};

const displayEditForm = () => {
  overlay.classList.remove("hidden");
  editTaskForm.classList.remove("hidden");
  homePage.classList.add("overlay");
};

const displayDescriptionForm = () => {
  overlay.classList.remove("hidden");
  descriptionForm.classList.remove("hidden");
  homePage.classList.add("overlay");
};

const displayTitleForm = () => {
  overlay.classList.remove("hidden");
  titleForm.classList.remove("hidden");
  homePage.classList.add("overlay");
};

(() => {
  const tasks = getDataFromLocalStorage();
  tasks.forEach((task) => {
    displayTaskTitle(task);
  });
})();

createTaskBtn.addEventListener("click", displayTitleForm);
createDescBtn.addEventListener("click", displayDescriptionForm);
getTitleBtn.addEventListener("click", getTaskTitle);
cancelTitleBtn.addEventListener("click", closeModal);
taskTitleContainer.addEventListener("click", selectTitleTask);
addDescBtn.addEventListener("click", addDescription);
