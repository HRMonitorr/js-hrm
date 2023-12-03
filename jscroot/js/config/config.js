import { setCookieWithExpireHour } from 'https://jscroot.github.io/cookie/croot.js';
import Swal from 'sweetalert2';

//token
export function getTokenFromAPI() {
  const tokenUrl = "https://asia-southeast2-gis-project-401902.cloudfunctions.net/Login";
  fetch(tokenUrl)
    .then(response => response.json())
    .then(tokenData => {
      if (tokenData.token) {
        userToken = tokenData.token;
        console.log('Token dari API:', userToken);
      }
    })
    .catch(error => console.error('Gagal mengambil token:', error));
}
export function GetDataForm(){
            const username = document.querySelector("#username").value;
            const password = document.querySelector("#password").value;
            const role = document.querySelector("#role").value;
            console.log(password)

            const data = {
                username: username,
                password: password,
                role: role
            };
            return data
}
//login
export function PostLogin() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  const data = {
    username: username,
    password: password,
    role: role
  };
  return data;
}


export function AlertPost(value) {
  Swal.fire({
    title: 'Registrasi Berhasil',
    text: value.message,
    icon: 'success',
    confirmButtonText: 'OK',
  }).then(() => {
    window.location.href = 'https://hrmonitor.advocata.me/dashboard/public/pages/login.html';
  });
}

function ResponsePostLogin(response) {
  if (response && response.token) {
    setCookieWithExpireHour('Login', response.token, 2);
    Swal.fire({
      title: 'Selamat Datang',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then(() => {
      window.location.href = 'https://hrmonitor.advocata.me/dashboard/public/index.html';
    });
  } else {
    Swal.fire({
      title: 'Login Gagal',
      text: 'Silakan coba lagi.',
      icon: 'error',
      confirmButtonText: 'OK',
    });
  }
}



export function ResponsePost(result) {
    AlertPost(result);
}
export function ResponseLogin(result) {
  ResponsePostLogin(result)
}

