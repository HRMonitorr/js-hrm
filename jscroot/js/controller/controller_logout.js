import { deleteCookie } from 'https://jscroot.github.io/cookie/croot.js';

function logout() {
  Swal.fire({
    icon: 'warning',
    title: 'Logout',
    text: 'Are you sure you want to log out?',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, log out!'
  }).then((result) => {
    if (result.isConfirmed) {
      deleteCookie('Login');
      window.location.href = 'pages/login.html';
    }
  });
}

document.getElementById('logoutButton').addEventListener('click', logout);
