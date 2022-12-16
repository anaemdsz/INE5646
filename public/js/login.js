const urlParameters = Object.fromEntries(
  new URLSearchParams(window.location.search).entries()
);

if (urlParameters.errorCode) {
  const errorCode = parseInt(urlParameters.errorCode);

  switch (errorCode) {
    case 1:
      alert("Usuário e/ou senha incorretos.");
      break;
    case 2:
      alert("Acesso negado. Efetue login primeiro.");
      break;
    default:
      alert("Erro desconhecido.");
      break;
  }
}