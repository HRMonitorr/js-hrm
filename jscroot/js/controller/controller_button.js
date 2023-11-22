function checkLoginStatus() {
  const token = getTokenFromCookies('Login'); // Ganti 'user_token' dengan nama cookie yang sesuai

  if (token) {
      // Jika ada token, pengguna sudah login. Tampilkan tombol Logout.
      document.getElementById('logoutButton').style.display = 'block';
      // Sembunyikan tombol Sign In dan Sign Up.
      document.getElementById('signInButton').style.display = 'none';
      document.getElementById('signUpButton').style.display = 'none';
  } else {
      // Jika tidak ada token, pengguna belum login. Tampilkan tombol Sign In dan Sign Up.
      document.getElementById('signInButton').style.display = 'block';
      document.getElementById('signUpButton').style.display = 'block';
      // Sembunyikan tombol Logout.
      document.getElementById('logoutButton').style.display = 'none';
  }
}

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

// Panggil fungsi untuk memeriksa status login saat halaman dimuat
checkLoginStatus();
