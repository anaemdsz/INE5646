const urlParameters = Object.fromEntries(
  new URLSearchParams(window.location.search).entries()
);

if (urlParameters.errorCode) {
  const errorCode = parseInt(urlParameters.errorCode);

  switch (errorCode) {
    case 1:
      alert("Nome não foi inserido.");
      break;
    case 2:
      alert("Email não foi inserido.");
      break;
    case 3:
      alert("Senha não foi inserida.");
      break;
    case 4:
      alert("As senhas fornecidas são diferentes.");
      break;
    case 5:
      alert("O username fornecido não existe.");
      break;
    default:
      alert("Erro desconhecido");
      break;
  }
}
