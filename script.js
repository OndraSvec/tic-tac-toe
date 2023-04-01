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

  return {
    getPlayerOneName,
    getPlayerOneMark,
    getPlayerTwoName,
    getPlayerTwoMark,
    getPlayerTurn,
    switchPlayers,
  };
})();

const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];
  const render = () => board;
  const handleClick = (e) => {
    const cellNum = e.target.id.split("n")[1];
    const boardIndex = cellNum - 1;
    render();
  };
  document
    .querySelectorAll(".ttt-button")
    .forEach((button) => button.addEventListener("click", handleClick));

  return { render };
})();
