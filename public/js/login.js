const urlParameters = Object.fromEntries(
  new URLSearchParams(window.location.search).entries()
);
const errorCode = parseInt(urlParameters.errorCode);

switch (errorCode) {
  case 1:
    alert("Usuario e/ou senha incorretos");
    break;
}
