const titleForm = document.querySelector(".form");
const homePage = document.querySelector(".task__list-container");
const descForm = document.querySelector(".description__form");

const data = {};

const task = {
  title: titleForm.task,
  text: descForm.text,
};

console.log(task.text);

function acceptData() {
  data["title"] = task.title.value;
  data["text"] = task.text.value;
  console.log(data);
}

function validateTitleInput() {
  const titleInput = task.title.value.trim();
  const message = titleForm.querySelector(".form__group-small");
  const formField = titleForm.querySelector(".form__group-input");

  if (!titleInput) {
    message.textContent = "Task cannot be blank!!";
    formField.classList.add("error");
  } else {
    message.textContent = "";
    formField.classList.add("success");
    acceptData();
    // clearInput();
    displayDescription();
  }
}

function validateDescInput() {
  const textInput = task.text.value.trim();
  const descField = descForm.querySelector(".desc__group-input");
  const message = descForm.querySelector(".form__group-small");

  if (!textInput) {
    message.textContent = "Task cannot be blank!!";
    descField.classList.add("error");
  } else {
    message.textContent = "";
    descField.classList.add("success");
    acceptData();
    // clearInput();
    displayDescription();
  }
}

function clearInput() {
  const clearTitle = titleForm.querySelector(".form__group-input");
  clearTitle.value = "";

  const clearText = descForm.querySelector(".desc__group-input");
  clearText.value = "";
}

function displayForm() {
  if (titleForm.classList.contains("hidden")) {
    titleForm.classList.remove("hidden");
  }
  homePage.classList.add("hidden");
}

function cancelForm() {
  titleForm.classList.add("hidden");
  homePage.classList.remove("hidden");
}

function displayDescription() {
  if (homePage.classList.contains("hidden")) {
    homePage.classList.remove("hidden");
  }
  titleForm.classList.add("hidden");
}

function removeDescription() {
  homePage.classList.add("hidden");
  titleForm.classList.remove("hidden");
}

function displayDescForm() {
  const blurPage = document.querySelector(".blur");
  if (descForm.classList.contains("hidden")) {
    descForm.classList.remove("hidden");
  }
  blurPage.classList.remove("hidden");
  homePage.classList.add("blur");
}

function removeDescForm() {
  const blurPage = document.querySelector(".blur");

  descForm.classList.add("hidden");
  blurPage.classList.add("hidden");
  homePage.classList.remove("blur");
  homePage.classList.remove("hidden");
}

homePage.querySelector(".create__btn").addEventListener("click", displayForm);

titleForm.querySelector(".cancel__btn").addEventListener("click", cancelForm);

titleForm.querySelector(".submit__btn").addEventListener("click", (e) => {
  e.preventDefault();
  validateTitleInput();
  // displayDescription();
});

homePage.querySelector(".create__btn").addEventListener("click", (e) => {
  e.preventDefault();
  removeDescription();
});

homePage.querySelector(".plus-icon").addEventListener("click", displayDescForm);

descForm.querySelector(".cancel__desc-btn").addEventListener("click", (e) => {
  e.preventDefault();
  removeDescForm();
});

descForm.querySelector(".save__btn").addEventListener("click", (e) => {
  e.preventDefault();
  validateDescInput();
});
