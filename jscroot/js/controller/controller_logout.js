import Swal from 'sweetalert2';
import { deleteCookie } from 'https://jscroot.github.io/cookie/croot.js';

function showAlert(title, text, icon) {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonText: 'OK',
  });
}

function logout() {
  Swal.fire({
    title: 'Konfirmasi Logout',
    text: 'Anda yakin ingin keluar?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Ya, Logout',
    cancelButtonText: 'Batal',
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      deleteCookie('Login');
      showAlert('Logout Berhasil', 'Anda telah berhasil logout.', 'success');
      window.location.href = 'https://hrmonitor.advocata.me/dashboard/public/pages/login.html';
    }
  });
}

document.getElementById('logoutButton').addEventListener('click', logout);
