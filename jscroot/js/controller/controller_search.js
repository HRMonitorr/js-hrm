
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

async function searchEmployee() {
  const employeeIdInput = document.getElementById('employeeIdInput').value;

  if (!employeeIdInput) {
    showAlert("Please enter Employee ID");
    return;
  }

  const token = getTokenFromCookies('Login');

  if (!token) {
    showAlert("Anda Belum Login");
    return;
  }

  const targetURL = 'https://asia-southeast2-gis-project-401902.cloudfunctions.net/one-employee';

  const myHeaders = new Headers();
  myHeaders.append('Login', token);

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify({ employeeid: employeeIdInput }),
    redirect: 'follow'
  };

  try {
    const response = await fetch(targetURL, requestOptions);
    const data = await response.json();

    if (data.status === 200) {
      displayEmployeeData([data.data], 'EmployeeDataBody');
    } else {
      showAlert(data.message, 'error');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

document.getElementById('searchButton').addEventListener('click', searchEmployee);

function editEmployee(employeeId) {
  window.location.href = `update_form.html?employeeid=${employeeId}`;
}

// Function to show SweetAlert
const showAlert = (message, type = 'info') => {
  Swal.fire({
    icon: type,
    text: message,
    showConfirmButton: false,
    timer: 1500
  });
};