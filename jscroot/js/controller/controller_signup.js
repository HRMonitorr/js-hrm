import { postWithBearer } from "https://jscroot.github.io/api/croot.js";
import { GetDataForm, ResponsePost } from "../config/config.js";
import Swal from 'sweetalert2';

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    let data = GetDataForm();
    postWithBearer(URLPost, token, data, ResponsePost);
  });
});
