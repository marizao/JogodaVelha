let currentPlayer = 1;
let player1Name = "";
let player2Name = "";
let gameOver = false;
let boardCreated = false;
const board = document.getElementById("board");
const status = document.getElementById("status");

function startGame() {
  player1Name = document.getElementById("player1").value;
  player2Name = document.getElementById("player2").value;
  if (player1Name === "" || player2Name === "") {
    alert("Por favor, insira os nomes dos jogadores!");
    return;
  }
  if (!boardCreated) {
    createBoard();
    boardCreated = true;
  }
}

function createBoard() {
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.addEventListener("click", () => cellClicked(cell));
    board.appendChild(cell);
  }
}

function cellClicked(cell) {
  if (cell.textContent !== "" || gameOver) return;
  
  if (currentPlayer === 1) {
    cell.textContent = "X";
    status.textContent = `É a vez de ${player2Name}`;
  } else {
    cell.textContent = "O";
    status.textContent = `É a vez de ${player1Name}`;
  }
  
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  
  checkWinner();
}

function checkWinner() {
  const cells = document.querySelectorAll(".cell");
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]              
  ];

  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
      status.textContent = `${currentPlayer === 1 ? player2Name : player1Name} Venceu!`;
      gameOver = true;
      return;
    }
  }

  if ([...cells].every(cell => cell.textContent !== "")) {
    status.textContent = "Empate!";
    gameOver = true;
    return;
  }
}

function resetGame() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach(cell => {
    cell.textContent = "";
  });
  status.textContent = "";
  currentPlayer = 1;
  gameOver = false;
}
