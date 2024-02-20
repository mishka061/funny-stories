let pagination = document.querySelector(".pagination");
let conteinerStories = document.querySelectorAll(".title-stories");
let profileContent = document.querySelectorAll(".profile-content");

let allStoriesArr = 10;
let currentPage = 1;

function createPaginationBtn(pageNumber) {
  let button = document.createElement("button");
  button.classList.add("page-link");
  button.textContent = pageNumber;
  button.addEventListener("click", function () {
    currentPage = pageNumber;
    updateVisibly(conteinerStories);
    updateVisibly(profileContent);
    updateActiveClass();
  });
  pagination.appendChild(button);
}

function updateVisibly(elements) {
  elements.forEach((element, index) => {
    if (index < (currentPage - 1) * allStoriesArr || index >= currentPage * allStoriesArr) {
      element.style.display = "none";
    } else {
      element.style.display = "block";
    }
  });
}

for (let i = 0; i < Math.ceil(conteinerStories.length / allStoriesArr); i++) {
  createPaginationBtn(i + 1);
}

function updateActiveClass() {
  let buttons = document.querySelectorAll(".page-link");
  buttons.forEach((button, index) => {
    if (index + 1 === currentPage) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
}

updateActiveClass();
updateVisibly(conteinerStories);
updateVisibly(profileContent);

