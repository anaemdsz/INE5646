const urlParameters = Object.fromEntries(
  new URLSearchParams(window.location.search).entries()
);
const errorCode = parseInt(urlParameters.errorCode);

if (errorCode)
  switch (errorCode) {
    case 1:
      alert("Usuario e/ou senha incorretos");
      break;
    case 2:
      alert("Acesso negado. Efetue login primeiro.");
      break;
    default:
      alert("Erro desconhecido.");
      break;
  }