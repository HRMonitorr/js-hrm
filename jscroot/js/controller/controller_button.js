// Function to extract the token from cookies
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
// Function to check login status and toggle visibility
function checkLoginStatus() {
  const token = getTokenFromCookies('Login'); // Ganti 'user_token' dengan nama cookie yang sesuai

  const pagesMenu = document.getElementById('pagesMenu');
  const loginPage = document.getElementById('loginPage');
  const registerPage = document.getElementById('registerPage');

  if (token) {
    // Jika ada token, pengguna sudah login. Sembunyikan halaman login dan register.
    pagesMenu.style.display = 'none';
  } else {
    // Jika tidak ada token, pengguna belum login. Tampilkan halaman login dan register.
    pagesMenu.style.display = 'block';
  }
}

// Panggil fungsi untuk memeriksa status login saat halaman dimuat
checkLoginStatus();

export { getTokenFromCookies, checkLoginStatus };
