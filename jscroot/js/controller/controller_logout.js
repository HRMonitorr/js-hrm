import { deleteCookie } from "https://jscroot.github.io/cookie/croot.js";

export default function Logout() {
    deleteCookie();
    window.location.href = "pages/login.html";
}