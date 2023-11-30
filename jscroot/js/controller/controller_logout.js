import { deleteCookie } from "https://jscroot.github.io/cookie/croot.js";

function logout() {
  deleteCookie("Login");
}

document.getElementById("logoutContainer").addEventListener("click", function (event) {
  // Check if the clicked element is the logout link
  if (event.target.matches('a[href="#"]')) {
    logout();
  }
});
// uyuyuyuy