// TODO Реализовать фунцкию перемешивания матрицы при загрузке страницы и использовать её при клике на кнопку shuffled and reset
// TODO Игра должна быть неактивна пока пользователь не нажмет кнопку Start game
// TODO Сохранения в локал сторедж
// TODO проверка на выигрыш и вывод сообщения типа "Ура ты выиграл за n ходов и n времени"
// TODO Драг н дроп
// TODO

import "./index.html";
import "./index.scss";
import { getMatrix, setElementNodeStyle, shuffleArray, getItemCoords, isValidToSwap, swapItem, cleanMovesCount } from "./modules/helpers.js";
import "./modules/stopwatch";

// кол-во ячеек(уровень сложности)
let puzzleSize = 16;
// * Генерация HTML

// Ограничивающий контейнер
export const puzzleContainer = document.createElement("div");
puzzleContainer.classList.add("container");
document.body.append(puzzleContainer);
// ! Start game button
const startGameButton = document.createElement("button");
startGameButton.classList.add("start-button");
startGameButton.classList.add("button");
startGameButton.textContent = "Start Game";
puzzleContainer.append(startGameButton);
// ! Puzzle info(timer and moves count)
const puzzleInfo = document.createElement("div");
puzzleInfo.classList.add("puzzle__info");
puzzleContainer.append(puzzleInfo);
// ! StopWatch
const puzzleTimer = document.createElement("div");
puzzleTimer.classList.add("puzzle__info-timer");
puzzleTimer.insertAdjacentHTML(
  "afterbegin",
  `Timer:
    <span id="min">00</span>
    <span>:</span>
    <span id="sec">00</span>
    `
);
puzzleInfo.append(puzzleTimer);
// ! Moves
const puzzleMovesCount = document.createElement("div");
puzzleMovesCount.classList.add("puzzle__info-moves");
puzzleMovesCount.textContent = "Moves: ";
puzzleInfo.append(puzzleMovesCount);
// ! Moves span
const puzzleMovesCountContent = document.createElement("span");
puzzleMovesCountContent.textContent = 0;
puzzleMovesCount.append(puzzleMovesCountContent);
// ! Puzzle field
const puzzle = document.createElement("div");
puzzle.classList.add("puzzle");
puzzleContainer.append(puzzle);
// ! Tiles
for (let i = 1; i <= puzzleSize; i++) {
  const elem = document.createElement("button");
  elem.classList.add("item");
  elem.textContent = i;
  puzzle.append(elem);
}
// ! Shuffled and reset button
const resetAndShuffledBtn = document.createElement("button");
resetAndShuffledBtn.classList.add("reset-btn");
resetAndShuffledBtn.classList.add("button");
resetAndShuffledBtn.innerHTML = "Shuffle and start";
puzzleContainer.append(resetAndShuffledBtn);

// * Константы
const tilesNodes = Array.from(document.querySelectorAll(".item")); // массив айтемов

// * I Первоначальное расположение элементов

//  Создание матрицы

let matrix = getMatrix(tilesNodes.map((e) => Number(e.textContent)));
setLocationForItems(matrix);
// Расставление элементов по местам

function setLocationForItems(matrix) {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      const numOfElement = matrix[y][x];
      const elementNode = tilesNodes[numOfElement - 1];
      setElementNodeStyle(elementNode, x, y);
    }
  }
}

// * II Расположение айтемов в случайном порядке

//  Создание пустой ячейки
tilesNodes[puzzleSize - 1].style.display = "none";
const shuffledArray = shuffleArray(matrix.flat());
matrix = getMatrix(shuffledArray);
setLocationForItems(matrix);

// * III Перемешение айтема в пустую ячейку

// Пустая ячейка всегда равна последнему айтему(в зависимости от уровня сложности)

const blankItem = puzzleSize;

puzzle.addEventListener("click", (e) => {
  const itemNode = e.target.closest("button");
  if (!itemNode) {
    return;
  }
  const itemTextContent = Number(itemNode.textContent);
  const blankItemCoords = getItemCoords(blankItem, matrix);
  const ItemNodeCoords = getItemCoords(itemTextContent, matrix);
  const isValid = isValidToSwap(ItemNodeCoords, blankItemCoords);
  if (isValid) {
    swapItem(blankItemCoords, ItemNodeCoords, matrix);
    setLocationForItems(matrix);
    puzzleMovesCountContent.textContent++;
  }
});

// * IV Действие по нажатию на shuffled

resetAndShuffledBtn.addEventListener("click", () => {
  const shuffledArrayAfterGame = shuffleArray(matrix.flat());
  matrix = getMatrix(shuffledArrayAfterGame);
  setLocationForItems(matrix);
  //   puzzleMovesCountContent.textContent = 0;
  cleanMovesCount(puzzleMovesCountContent);
  stopTimer();
});

// * V Реализация таймера

const startButton = document.querySelector(".start-button");
const secNode = document.querySelector("#sec");
const minNode = document.querySelector("#min");
let min = 0;
let sec = 0;
let interval;
startButton.addEventListener("click", () => {
  clearInterval(interval);
  interval = setInterval(startTimer, 1000);
});

// ? запуск таймера

function startTimer() {
  sec++;
  if (sec < 9) {
    secNode.innerText = "0" + sec;
  }
  if (sec > 9) {
    secNode.innerText = sec;
  }
  if (sec > 60) {
    min++;
    minNode.innerText = "0" + min;
    sec = 0;
    secNode.innerText = "0" + sec;
  }
  if (min > 9) {
    minNode.innerText = min;
  }
}

// ? Очистка таймера

function stopTimer() {
  clearInterval(interval);
  secNode.innerText = "00";
  secNode.innerText = "00";
  min = 0;
  sec = 0;
}
