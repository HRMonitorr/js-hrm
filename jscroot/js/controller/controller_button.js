function getTokenFromCookies(cookieName) {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === cookieName) {
      return value;
    }
  }
  return null;
}
function checkLoginStatus() {
  const token = getTokenFromCookies('Login'); 

  const pagesMenu = document.getElementById('pagesMenu');
  const logout = document.getElementById('logoutid');
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
