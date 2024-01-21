import { getTokenFromCookies } from "../template/template.js";

function checkLoginStatus() {
  const token = getTokenFromCookies('Login'); 

  const pagesMenu = document.getElementById('pagesMenu');
  const logout = document.getElementById('logoutButton');
  const registerPage = document.getElementById('registerPage');

  if (token) {
    pagesMenu.style.display = 'none';
    // display logout
    logout.style.display ='block';
  } else {
    pagesMenu.style.display = 'block';
    logout.style.display ='none';
  }
}

checkLoginStatus();

export { getTokenFromCookies, checkLoginStatus };
