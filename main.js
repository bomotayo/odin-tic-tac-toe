//Steps
//empty board array
//Render board section & assign each block to array element with onclick player move
//create player move func -> checks for if event clicked is empty and then assigns player move
// create comp move func -> math random * 9 to select a spot, check if spot is empty then assigns comp move
// check if gameboard is full with flag & complete func => fun has a local flag is true init but then turns false if there is an empty spot in the board and then assigns the global flag to its !value
//gameloop func => includes render func, complete func & check winner func. It is called after every move

const boardSection = document.querySelector(".board-section");
const winner = document.getElementById("winner");
const compBtn = document.getElementById("comp-btn");
const plrBtn = document.getElementById("pl2-btn");

//Boolean flags for opponents being either computer or human based on button clicked
let isComp = false;
let isPlr2 = false;
let flag = false;

const opponent = "O";
let player = "X";

//Button clicked
compBtn.addEventListener("click", () => {
  isComp = true;
  compBtn.style.backgroundColor = "yellow";
});

plrBtn.addEventListener("click", () => {
  isPlr2 = true;
  plrBtn.style.backgroundColor = "yellow";
});

let isBoardFull = false;
let gameBoard = ["", "", "", "", "", "", "", "", ""];

checkBoardComplete = () => {
  let flag = true;
  gameBoard.forEach((element) => {
    if (element != player && element != opponent) {
      flag = false;
    }
  });
  isBoardFull = flag;
};

const checkLine = (a, b, c) => {
  return (
    gameBoard[a] === gameBoard[b] &&
    gameBoard[b] === gameBoard[c] &&
    (gameBoard[a] === player || gameBoard[a] === opponent)
  );
};

const checkMatch = () => {
  //rows
  for (let i = 0; i < 9; i += 3) {
    if (checkLine(i, i + 1, i + 2)) {
      return gameBoard[i];
    }
  }
  //columns
  for (let i = 0; i < 3; i++) {
    if (checkLine(i, i + 3, i + 6)) {
      return gameBoard[i];
    }
  }
  //right diag
  if (checkLine(0, 4, 8)) {
    return gameBoard[0];
  }
  //left diag
  if (checkLine(2, 4, 6)) {
    return gameBoard[2];
  }
  return "";
};

const winnerCheck = () => {
  let res = checkMatch();
  if (res == "X") {
    winner.innerText = "Winner is Player 1";
    winner.classList.add("player1Win");
    isBoardFull = true;
  } else if (res == opponent && isComp && !isPlr2) {
    winner.innerText = "Winner is computer";
    winner.classList.add("computerWin");
    isBoardFull = true;
  } else if (res == "O" && isPlr2 && !isComp) {
    winner.innerText = "Winner is Player 2";
    winner.classList.add("player2Win");
    isBoardFull = true;
  } else if (isBoardFull) {
    winner.innerText = "Draw";
    winner.classList.add("draw");
  }
};
const gameLoop = () => {
  renderBoard();
  checkBoardComplete();
  winnerCheck();
};

const renderBoard = () => {
  boardSection.innerHTML = "";
  gameBoard.forEach((e, i) => {
    boardSection.innerHTML += `<div id="sqr-${i}" class="block" onclick="addPlayerMove(${i})">${gameBoard[i]}</div>`;
    if (e == player || e == opponent) {
      document.querySelector(`#sqr-${i}`).classList.add("occupied");
    }
  });
};

const addPlayerMove = (e) => {
  if (!isBoardFull && gameBoard[e] == "") {
    if (isComp && !isPlr2) {
      gameBoard[e] = player;
      gameLoop();
      addComputerMove();
    } else if (!isComp && isPlr2) {
      flag ? (player = "O") : (player = "X");
      gameBoard[e] = player;
      gameLoop();
      flag = !flag;
    }
  }
};

const addPlayer2Move = (e) => {
  if (!isBoardFull && gameBoard[e] == "" && isPlr2) {
    gameBoard[e] = player;
    gameLoop();
  }
};

//Reset Computer move function
const addComputerMove = () => {
  if (!isBoardFull && isComp) {
    do {
      selected = Math.floor(Math.random() * 9);
    } while (gameBoard[selected] != "");
    gameBoard[selected] = opponent;
    gameLoop();
  }
};

//Reset board function
const resetBoard = () => {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  isBoardFull = false;
  isComp = false;
  isPlr2 = false;
  flag = false;
  compBtn.style.backgroundColor = "";
  plrBtn.style.backgroundColor = "";

  winner.classList.remove("playerWin");
  winner.classList.remove("computerWin");
  winner.classList.remove("draw");
  winner.innerText = "";
  renderBoard();
};
renderBoard();
