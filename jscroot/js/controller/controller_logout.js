import { deleteCookie } from "https://jscroot.github.io/cookie/croot.js";

function logout() {

  deleteCookie("Login");

}

document.getElementById("logoutButton").addEventListener("click", logout);
