import { setCookieWithExpireHour } from 'https://jscroot.github.io/cookie/croot.js';

// export function getTokenFromAPI() {
//   const tokenUrl = "https://asia-southeast2-gis-project-401902.cloudfunctions.net/Login";
//   fetch(tokenUrl)
//     .then(response => response.json())
//     .then(tokenData => {
//       if (tokenData.token) {
//         userToken = tokenData.token;
//         console.log('Token from API:', userToken);
//       }
//     })
//     .catch(error => console.error('Failed to fetch token:', error));
// }

export function GetDataForm() {
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;
  const phone = document.querySelector("#phone-num").value;
  const role = document.querySelector("#role").value;

  const data = {
    username: username,
    password: password,
    "phone-num": phone,
    role: role
  };
  return data;
}

export function PostLogin() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const data = {
    username: username,
    password: password,
  };
  return data;
}

export function AlertPost(value) {
  Swal.fire({
    icon: 'success',
    title: 'Registration Successful',
    text: 'You have successfully registered!',
  }).then(() => {
    window.location.href = "login.html";
  });
}

export function ResponseLogin(result) {
  if (result.status) {
    // Jika login berhasil, tampilkan SweetAlert sukses
    Swal.fire({
      icon: "success",
      title: "Login Successful",
      text: "Redirecting to OTP page...",
    }).then(() => {
      window.location.href = 'otp.html';
    });
  } else {
    // Jika login gagal, tampilkan SweetAlert error
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: result.message, // Display the error message received from the server
    });
  }
}


export function ResponsePost(result) {
  AlertPost(result);
}
