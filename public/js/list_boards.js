const urlParameters = Object.fromEntries(
  new URLSearchParams(window.location.search).entries()
);

if (urlParameters.errorCode) {
  const errorCode = parseInt(urlParameters.errorCode);

  switch (errorCode) {
    case 1:
      alert("Nome do quadro não foi inserido.");
      break;
    case 2:
      alert("Quadro não encontrado.");
      break;
    default:
      alert("Erro desconhecido");
      break;
  }
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
      <form action="/delete-board/${board._id}" method="post">
        <div class="board-list-row">
          <a href="/boards/${board._id}">${board.name}</a>
          <button class="button button-red" type="submit">Excluir</button>
        </div>
      </form>
    `;
  }
}

loadBoards();
