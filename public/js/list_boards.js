const urlParameters = Object.fromEntries(
  new URLSearchParams(window.location.search).entries()
);

if (urlParameters.errorCode) {
  const errorCode = parseInt(urlParameters.errorCode);
}

async function createBoard() {

}

async function deleteBoard(id) {
  console.log("TODO: delete board where id = ", id);
}

async function loadBoards() {
  const res = await (await fetch("/load-boards")).json();
  if (!res.boards) {
    console.log("Error retrieving boards. Null was returned.");
    return;
  }

  const boards = res.boards;
  const boardsContainer = document.getElementById("boards");
  boardsContainer.innerHTML = "";

  if (boards.length == 0) {
    boardsContainer.innerHTML +=
    `
      <div class="board-list-row">
        <span> Nenhum quadro encontrado. </span>
      </div>
    `;
  }

  for (let board of boards) {
    boardsContainer.innerHTML +=
    `
      <div class="board-list-row">
        <a href="/boards/${board._id}">${board.name}</a>
        <button class="button button-red" onclick="deleteBoard(${board._id})">Excluir</button>
      </div>
    `;
  }
}

loadBoards();
