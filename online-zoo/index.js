// // карусель


let items = document.querySelectorAll('.pets__slider') // элементы слайдера
let currentItem = 0 // индекс "текущего" элемента
let isEnabled = true // Параметр для вкл/выкл для стрелок
let arrowLeft = document.querySelector('.arrow-left')
let arrowRight = document.querySelector('.arrow-right')


function changeCurrentItem(n) {
	currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
	isEnabled = false;
	items[currentItem].classList.add(direction);
	items[currentItem].addEventListener('animationend', function() {
		this.classList.remove('active', direction);
	});
}

function showItem(direction) {
	items[currentItem].classList.add('next', direction);
	items[currentItem].addEventListener('animationend', function() {
		this.classList.remove('next', direction);
		this.classList.add('active');
		isEnabled = true;
	});
}

function nextItem(n) {
	hideItem('to-left');
	changeCurrentItem(n + 1);
	showItem('from-right');
}

function previousItem(n) {
	hideItem('to-right');
	changeCurrentItem(n - 1);
	showItem('from-left');
}

document.querySelector('.arrow-left').addEventListener('click', function() {
	if (isEnabled) {
		previousItem(currentItem);
	}
});

document.querySelector('.arrow-right').addEventListener('click', function() {
	if (isEnabled) {
		nextItem(currentItem);
	}
});



// Слайдер
// const gap = 22;

// const carousel = document.querySelector(".carousel"),
//   content = document.querySelector(".content"),
//   next = document.querySelector(".arrow-right"),
//   prev = document.querySelector(".arrow-left");

// next.addEventListener("click", e => {
//   carousel.scrollBy(width + gap, 0);
//   if (carousel.scrollWidth !== 0) {
//     prev.style.display = "flex";
//   }
//   if (content.scrollWidth - width - gap <= carousel.scrollLeft + width) {
//     // next.style.display = "none";
//   }
// });
// prev.addEventListener("click", e => {
//   carousel.scrollBy(-(width + gap), 0);
//   if (carousel.scrollLeft - width - gap <= 0) {
//     // prev.style.display = "none";
//   }
// //   if (!content.scrollWidth - width - gap <= carousel.scrollLeft + width) {
// //     next.style.display = "flex";
// //   }
// });

// let width = carousel.offsetWidth;
// window.addEventListener("resize", e => (width = carousel.offsetWidth));
