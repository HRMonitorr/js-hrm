import { setCookieWithExpireHour } from 'https://jscroot.github.io/cookie/croot.js';

const form = document.getElementById('formotp');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const otpCodeInput = document.getElementById('otp-code');
  const otpCode = otpCodeInput.value.trim();

  if (!otpCode) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Please enter the OTP code',
    });
    return;
  }

  const apiUrl = 'https://asia-southeast2-gis-project-401902.cloudfunctions.net/loginafterotp';

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'otp-code': otpCode,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (data.status) {
      // Set token in cookies with 2-hour expiration
      setCookieWithExpireHour('token', data.token, 2);

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: data.message,
      });

      // You can handle the successful login here, e.g., redirect to another page
      window.location.href = 'https://hrmonitor.advocata.me/dashboard/public/index.html';
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: data.message,
      });
    }
  } catch (error) {
    console.error('Error during API request:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'An unexpected error occurred. Please try again later.',
    });
  }
});