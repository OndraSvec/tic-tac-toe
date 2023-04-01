const Player = (name, mark) => {
  const getMark = () => mark;
  const getName = () => name;
  return { getName, getMark };
};

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
