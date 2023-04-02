const Player = (name, mark) => {
  const getMark = () => mark;
  const getName = () => name;
  return { getName, getMark };
};

const gameController = (() => {
  const playerOne = Player("Player One", "X");
  const playerTwo = Player("Player Two", "O");

  const getPlayerOneMark = () => playerOne.getMark();
  const getPlayerTwoMark = () => playerTwo.getMark();

  const getPlayerOneName = () => playerOne.getName();
  const getPlayerTwoName = () => playerTwo.getName();

  let activePlayer = getPlayerOneName();

  const switchPlayers = () => {
    if (activePlayer === getPlayerOneName()) activePlayer = getPlayerTwoName();
    else activePlayer = getPlayerOneName();
  };

  const getPlayerTurn = () => activePlayer;
  const setPlayerTurn = () => {
    activePlayer = getPlayerOneName();
  };

  return {
    getPlayerOneName,
    getPlayerOneMark,
    getPlayerTwoName,
    getPlayerTwoMark,
    getPlayerTurn,
    setPlayerTurn,
    switchPlayers,
  };
})();

const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];
  const render = () => board;
  const setBoard = () =>
    board.forEach((item, index) => board.splice(index, 1, ""));
  const handleClick = (e) => {
    const cellNum = e.target.id.split("n")[1];
    const boardIndex = cellNum - 1;
    if (board[boardIndex] !== "" || gameEnd.endGame()) return;
    if (gameController.getPlayerTurn() === gameController.getPlayerOneName()) {
      board[boardIndex] = gameController.getPlayerOneMark();
    } else {
      board[boardIndex] = gameController.getPlayerTwoMark();
    }
    render();
    displayGameBoard.updateUIBoard();
    announceWinner.displayWinner();
    gameController.switchPlayers();
    e.stopPropagation();
  };
  document
    .querySelectorAll(".ttt-button")
    .forEach((button) => button.addEventListener("click", handleClick));

  return { render, setBoard };
})();

const gameEnd = (() => {
  const board = gameBoard.render();
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const endGame = () => {
    if (
      winConditions.some((array) =>
        array.every(
          (index) => board[index] === gameController.getPlayerOneMark()
        )
      )
    ) {
      return `${gameController.getPlayerOneName()} Wins!`;
    }
    if (
      winConditions.some((array) =>
        array.every(
          (index) => board[index] === gameController.getPlayerTwoMark()
        )
      )
    ) {
      return `${gameController.getPlayerTwoName()} Wins!`;
    }
    if (board.every((index) => index !== "")) {
      return "It's a draw!";
    }
  };
  return { endGame };
})();

const displayGameBoard = (() => {
  const board = gameBoard.render();
  const updateUIBoard = () => {
    const buttons = document.querySelectorAll(".ttt-button");

    buttons.forEach((button, index) => {
      button.textContent = board[index];
      if (button.textContent === gameController.getPlayerOneMark()) {
        button.setAttribute("style", "color: var(--mark-playerOne);");
      } else button.setAttribute("style", "color: var(--mark-playerTwo);");
    });
  };
  return { updateUIBoard };
})();

const restartGame = (() => {
  const handleRestartClick = () => {
    gameBoard.setBoard();
    displayGameBoard.updateUIBoard();
    gameController.setPlayerTurn();
  };

  const restartButton = document.getElementById("restartGame");
  restartButton.addEventListener("click", handleRestartClick);
  return { handleRestartClick };
})();

const announceWinner = (() => {
  const draw = "It's a draw!";
  const playerOneWin = `${gameController.getPlayerOneName()} Wins!`;
  const playerTwoWin = `${gameController.getPlayerTwoName()} Wins!`;

  const divAnnounce = document.getElementById("ann-win");
  const displayWinner = () => {
    let classAdd = false;
    if (gameEnd.endGame() === draw) {
      divAnnounce.textContent = draw;
      classAdd = true;
    }
    if (gameEnd.endGame() === playerOneWin) {
      divAnnounce.textContent = playerOneWin;
      classAdd = true;
    }
    if (gameEnd.endGame() === playerTwoWin) {
      divAnnounce.textContent = playerTwoWin;
      classAdd = true;
    }
    if (classAdd) divAnnounce.classList.toggle("announceWinner");
  };
  const removeAnnouncer = () => {
    if (divAnnounce.classList.toString() === "announceWinner") {
      divAnnounce.classList.remove("announceWinner");
      divAnnounce.textContent = "";
      restartGame.handleRestartClick();
    }
  };
  ["click", "touchstart"].forEach((event) =>
    window.addEventListener(event, removeAnnouncer)
  );

  return { displayWinner };
})();
