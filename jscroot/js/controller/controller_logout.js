import { deleteCookie } from "../config/config.js";

export default function Logout() {
    deleteCookie();
    window.location.href = "pages/login.html";
}