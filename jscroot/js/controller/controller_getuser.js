import { getTokenFromCookies } from "../template/template.js";

async function getUserWithToken() {
  const token = getTokenFromCookies('Login');

  if (!token) {
    Swal.fire({
      icon: 'warning',
      title: 'Authentication Error',
      text: 'kamu Belum Login.',
    });
    return;
  }

  const targetURL = 'https://asia-southeast2-gis-project-401902.cloudfunctions.net/GetUserWithToken';

  const myHeaders = new Headers();
  myHeaders.append('Login', token);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  try {
    const response = await fetch(targetURL, requestOptions);
    const data = await response.json();

    if (data.status === true) {
      displayUserData(data.data);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: data.message,
      });
    }
  } catch (error) {
    console.error('Error:', error);
  }
}


function displayUserData(userData) {
  const userDataBody = document.getElementById('userDataBody');

  if (userData && userData.length > 0) {
    userData.forEach((user) => {
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td class="px-4 py-3">
          <div class="flex items-center text-sm">
            <div>
              <p class="font-semibold">${user.username}</p>
            </div>
          </div>
        </td>
        <td class="px-4 py-3 text-sm">
          <p class="font-semibold">${user.password}</p>
        </td>
      `;
      userDataBody.appendChild(newRow);
    });
  } else {
    userDataBody.innerHTML = '<tr><td colspan="3">No user data found.</td></tr>';
  }
}

getUserWithToken();
