// ? Ф-я создания матрицы

export function getMatrix(arr) {
  const matrix = [[], [], [], []];
  let x = 0;
  let y = 0;
  for (let i = 0; i < arr.length; i++) {
    if (x >= 4) {
      y++;
      x = 0;
    }
    matrix[y][x] = arr[i];
    x++;
  }
  return matrix;
}

// ? Ф-я для расположения каждого айтема через замену стилей

export function setElementNodeStyle(elementNode, x, y) {
  const percent = 100;
  elementNode.style.transform = `translate3D(${x * percent}%, ${y * percent}%, 0)`;
}

// ? Сортировка массива в случайном порядке

export function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

// ? Получение координат айтема

export function getItemCoords(itemNumber, matrix) {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      if (matrix[y][x] === itemNumber) {
        return { x, y };
      }
    }
  }
  return null;
}

// ? Проверка на возможность перемещения айтема

export function isValidToSwap(coords1, coords2) {
  return (coords1.x === coords2.x || coords1.y === coords2.y) && (Math.abs(coords1.x - coords2.x) === 1 || Math.abs(coords1.y - coords2.y) === 1) ? true : false;
}
// ? Ф-я перемещения айтема

export function swapItem(coords1, coords2, matrix) {
  const tempCoords = matrix[coords1.y][coords1.x];
  matrix[coords1.y][coords1.x] = matrix[coords2.y][coords2.x];
  matrix[coords2.y][coords2.x] = tempCoords;
}

// ? обнуление счетчика ходов

export function cleanMovesCount(node) {
  node.textContent = 0;
}

// ? запуск таймера
