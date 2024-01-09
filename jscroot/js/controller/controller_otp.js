import { setCookieWithExpireHour } from 'https://jscroot.github.io/cookie/croot.js';

const showAlert = (message, type = 'success') => {
  Swal.fire({
    icon: type,
    text: message,
    showConfirmButton: false,
    timer: 1500
  });
};

const insertOTP = async (event) => {
  event.preventDefault();

  const token = getTokenFromCookies('Login');

  if (!token) {
    showAlert("Kamu Belum Login", 'error');
    return;
  }

  const targetURL = 'https://example.com/your-endpoint'; 
  const myHeaders = new Headers();
  myHeaders.append('Login', token);
  myHeaders.append('Content-Type', 'application/json');

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify({
      otpsatu: document.getElementById('otpsatu').value,
      otpdua: document.getElementById('otpdua').value,
      otptiga: document.getElementById('otptiga').value,
      otpempat: document.getElementById('otpempat').value,
    }),
    redirect: 'follow',
  };

  try {
    const response = await fetch(targetURL, requestOptions);
    const responseData = await response.json();

    if (responseData && responseData.token) {
      setCookieWithExpireHour('Login', responseData.token, 2);
      showAlert({
        icon: 'success',
        title: 'Kode Otp Valid',
        text: 'Otp Berhasil!'
      }, () => {
        window.location.href = 'https://hrmonitor.advocata.me/dashboard/public/index.html';
      });
    } else {
      showAlert({
        icon: 'error',
        title: 'Token Salah',
        text: 'Invalid Token. Please try again.'
      });
    }
  } catch (error) {
    console.error('Error:', error);
    showAlert({
      icon: 'error',
      title: 'Error',
      text: 'An error occurred. Please try again.'
    });
  }
};

document.getElementById('formotp').addEventListener('submit', insertOTP);
