// Import the deleteCookie function
import { deleteCookie } from 'https://jscroot.github.io/cookie/croot.js';

function logout() {
  deleteCookie('Login');
  
  window.location.href = 'https://hrmonitor.advocata.me/dashboard/public/pages/login.html';
}

document.addEventListener('DOMContentLoaded', function() {
  const logoutButton = document.getElementById('logoutButton');
  
  if (logoutButton) {
    logoutButton.addEventListener('click', logout);
  } else {
    console.error("Element with ID 'logoutButton' not found");
  }
});
