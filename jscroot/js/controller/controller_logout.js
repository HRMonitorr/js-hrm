import { deleteCookie } from "https://jscroot.github.io/cookie/croot.js";

function logout() {
  deleteCookie();
  window.location.href = "pages/login.html";
}