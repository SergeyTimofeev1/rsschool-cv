// // карусель

let items = document.querySelectorAll(".pets__slider"); // элементы слайдера
let currentItem = 0; // индекс "текущего" элемента
let isEnabled = true; // Параметр для вкл/выкл для стрелок
let arrowLeft = document.querySelector(".arrow-left");
let arrowRight = document.querySelector(".arrow-right");

function changeCurrentItem(n) {
  currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
  isEnabled = false;
  items[currentItem].classList.add(direction);
  items[currentItem].addEventListener("animationend", function () {
    this.classList.remove("active", direction);
  });
}

function showItem(direction) {
  items[currentItem].classList.add("next", direction);
  items[currentItem].addEventListener("animationend", function () {
    this.classList.remove("next", direction);
    this.classList.add("active");
    isEnabled = true;
  });
}

function nextItem(n) {
  hideItem("to-left");
  changeCurrentItem(n + 1);
  showItem("from-right");
}

function previousItem(n) {
  hideItem("to-right");
  changeCurrentItem(n - 1);
  showItem("from-left");
}

document.querySelector(".arrow-left").addEventListener("click", function () {
  if (isEnabled) {
    previousItem(currentItem);
  }
});

document.querySelector(".arrow-right").addEventListener("click", function () {
  if (isEnabled) {
    nextItem(currentItem);
  }
});

// Карусель в блоке testimonials

let input = document.querySelector(".testimonials__input");
let testimonialsArr = document.querySelectorAll(".testimonials__inner");
let testimonialsItem = document.querySelector(".testimonials__item");

function changeValue() {
  input.addEventListener("input", (e) => {
    const itemWidth = testimonialsItem.getBoundingClientRect().width;
    const testimonialsGap = parseInt(
      window.getComputedStyle(testimonialsArr).columnGap
    );
    // testimonialsArr.scrollLeft = (itemWidth + testimonialsGap) * e.target.value
    testimonialsArr.scroll({
      left: (itemWidth + testimonialsGap) * e.target.value,
      behavior: "smooth",
    });
  });
}

changeValue();

// Меню бургер

let burgerButton = document.querySelector(".burger-menu-button");
let menuMobile = document.querySelector(".mobile-menu");
let header = document.querySelector(".header");
let overlay = document.querySelector(".overlay");
let headerTitle = document.querySelector(".favorite__title");

burgerButton.addEventListener("click", (e) => {
  showBurgerMenu();
});
burgerButton.addEventListener("click", (e) => {
  hideBurgerMenu();
});

header.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("overlay") ||
    e.target.classList.contains("menu-mobile__close")
  ) {
    console.log("clicked");
    menuMobile.style.top = -500 + "px";
    menuMobile.style.position = "start";
    overlay.style.display = "none";
    headerTitle.style.display = "block";
  }
});

function showBurgerMenu() {
  menuMobile.style.top = 0;
  menuMobile.style.position = "fixed";
  overlay.style.display = "block";
  headerTitle.style.display = "none";
}

function hideBurgerMenu(e) {
  if (
    e.target.classList.contains("overlay") ||
    e.target.classList.contains("menu-mobile__close")
  ) {
    menuMobile.style.top = -500 + "px";
    menuMobile.style.position = "start";
    overlay.style.display = "none";
    headerTitle.style.display = "block";
  }
}

// POPUP

// let input = document.querySelector('.testimonials__input')
// let testimonialsArr = document.querySelector('.testimonials__inner')
let testimonialsItems = document.querySelectorAll(".testimonials__item");
let popupOverlay = document.querySelector("#popup-overlay");
let popup = document.querySelector("#popup-item");
let popupClose = document.querySelector("#popup-close");

testimonialsItems.forEach(function (item) {
  item.addEventListener("click", function (event) {
    this.classList.add("active-popup");
    this.lastChild.previousElementSibling.style.opacity = 1;
    popupOverlay.style.top = 0;
  });
});

popupClose.addEventListener("click", function (e) {
  e.target.parentElement.remove(".active-popup");
  console.log(e);
  popupOverlay.style.left = 1000 + "px";
});
