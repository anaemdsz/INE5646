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
