const urlParameters = Object.fromEntries(
  new URLSearchParams(window.location.search).entries()
);
const errorCode = parseInt(urlParameters.errorCode);

switch (errorCode) {
  case 1:
    alert("Senha nao foi inserida.");
    break;
  case 2:
    alert("Username nao foi inserido");
    break;
  case 3:
    alert("As senhas fornecidas sao difernetes");
    break;
  case 4:
    alert("O username fornecido ja esta sendo usado");
    break;
  default:
    alert("Erro desconhecido");
    break;
}
