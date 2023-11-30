// LogoutFunction.js
import { deleteCookie } from "./cookies.js";

export default function Logout() {
    deleteCookie();
    window.location.href = "pages/login.html";
}

// Add an event listener to the logout link
document.getElementById('logoutLink').addEventListener('click', function (event) {
    event.preventDefault(); // Prevents the default link behavior (navigating to the href)
    Logout(); // Call the Logout function when the link is clicked
});
