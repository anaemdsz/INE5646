const urlParameters = Object.fromEntries(
  new URLSearchParams(window.location.search).entries()
);

if (urlParameters.errorCode) {
  const errorCode = parseInt(urlParameters.errorCode);

  switch (errorCode) {
    case 1:
      alert("Senha não foi inserida.");
      break;
    case 2:
      alert("Username não foi inserido");
      break;
    case 3:
      alert("As senhas fornecidas são diferentes.");
      break;
    case 4:
      alert("O username fornecido já esta sendo usado.");
      break;
    default:
      alert("Erro desconhecido.");
      break;
  }
}
