// Function to show SweetAlert
function showAlert(title, text, icon = 'info') {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonText: 'OK',
  });
}

// Function to make the API request with the token
async function getUserWithToken() {
  const token = getTokenFromCookies('Login'); // Get the token from cookies via parameter

  if (!token) {
    showAlert("Token Tidak Ditemukan", "Token tidak ditemukan.");
    return;
  }

  const targetURL = 'https://asia-southeast2-gis-project-401902.cloudfunctions.net/GetUserWithToken';

  // Set up headers with the token
  const myHeaders = new Headers();
  myHeaders.append('Login', token);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  try {
    const response = await fetch(targetURL, requestOptions);
    const data = await response.json();

    if (data.status === true) {
      displayUserData(data.data);
    } else {
      showAlert("Error", data.message, "error");
    }
  } catch (error) {
    console.error('Error:', error);
    showAlert("Error", "Terjadi kesalahan yang tidak terduga.", "error");
  }
}

// Function to extract the token from cookies
function getTokenFromCookies(cookieName) {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === cookieName) {
      return value;
    }
  }
  return null;
}

// Function to display user data in the table
function displayUserData(userData) {
  const userDataBody = document.getElementById('userDataBody');

  if (userData && userData.length > 0) {
    userData.forEach(user => {
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
    userDataBody.innerHTML = '<tr><td colspan="2">Tidak ada data pengguna ditemukan.</td></tr>';
  }
}

// Initial fetch of user data with token
getUserWithToken();
