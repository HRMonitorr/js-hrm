import { deleteCookie } from "../config/config";

export default function Logout() {
    deleteCookie();
    window.location.href = "https://fancypedia.my.id/theme/signin/index.html";
}