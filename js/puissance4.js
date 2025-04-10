const ROWS = 6;
const COLS = 7;
let currentPlayer = 'red';
let board = [];

const gameDiv = document.getElementById("game");
const message = document.getElementById("message");

function createBoard() {
  gameDiv.innerHTML = '';
  board = [];

  for (let row = 0; row < ROWS; row++) {
    board[row] = [];
    for (let col = 0; col < COLS; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = row;
      cell.dataset.col = col;
      gameDiv.appendChild(cell);
      board[row][col] = null;
    }
  }

  const cells = document.querySelectorAll(".cell");
  cells.forEach(cell => {
    cell.addEventListener("click", () => {
      const col = parseInt(cell.dataset.col);
      dropDisc(col);
    });
  });
}

function dropDisc(col) {
  for (let row = ROWS - 1; row >= 0; row--) {
    if (!board[row][col]) {
      board[row][col] = currentPlayer;
      const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
      cell.classList.add(currentPlayer);

      if (checkWin(row, col)) {
        message.textContent = `Le joueur ${currentPlayer === 'red' ? 'Rouge' : 'Jaune'} a gagné !`;
        message.style.color = currentPlayer === 'red' ? 'red' : 'gold';
        disableBoard();
        return;
      }

      if (checkDraw()) {
        message.textContent = "Match nul !";
        message.style.color = 'gray';
        disableBoard();
        return;
      }

      currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
      message.textContent = `Au tour du joueur ${currentPlayer === 'red' ? 'Rouge' : 'Jaune'}`;
      message.style.color = currentPlayer === 'red' ? 'red' : 'gold';
      return;
    }
  }
}

function checkWin(row, col) {
  const directions = [
    [[0, 1], [0, -1]], // horizontal
    [[1, 0], [-1, 0]], // vertical
    [[1, 1], [-1, -1]], // diagonale /
    [[1, -1], [-1, 1]]  // diagonale \
  ];

  for (const dir of directions) {
    let count = 1;

    for (const [dx, dy] of dir) {
      let r = row + dx;
      let c = col + dy;

      while (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === currentPlayer) {
        count++;
        r += dx;
        c += dy;
      }
    }

    if (count >= 4) return true;
  }

  return false;
}

function checkDraw() {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (!board[row][col]) {
        return false;
      }
    }
  }
  return true;
}

function disableBoard() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach(cell => cell.style.pointerEvents = "none");
}

function resetGame() {
  currentPlayer = 'red';
  message.textContent = "Joueur Rouge commence";
  message.style.color = 'red';
  createBoard();
}

createBoard();
