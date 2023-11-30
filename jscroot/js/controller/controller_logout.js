import { deleteCookie } from 'https://jscroot.github.io/cookie/croot.js';

const logout = () => {
  deleteCookie('Login');
  window.location.href = 'https://hrmonitor.advocata.me/dashboard/public/pages/login.html';
};

document.getElementById('logoutButton').addEventListener('click', logout);
