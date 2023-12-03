// Function to show SweetAlert
const showAlert = (title, text, icon = 'info') => {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonText: 'OK',
  });
};

const getTokenFromCookies = (cookieName) => {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === cookieName) {
      return value;
    }
  }
  return null;
};

const insertEmployee = async (event) => {
  event.preventDefault();

  const token = getTokenFromCookies('Login');

  if (!token) {
    showAlert("Header Login Not Found", "Header Login tidak ditemukan.");
    return;
  }

  const targetURL = 'https://asia-southeast2-gis-project-401902.cloudfunctions.net/InsertDataEmployee';

  const myHeaders = new Headers();
  myHeaders.append('Login', token);
  myHeaders.append('Content-Type', 'application/json');

  const basicSalaryInput = document.getElementById('newBasicSalaryInput').value;
  const honorDivisionInput = document.getElementById('newHonorDivisionInput').value;

  if (isNaN(basicSalaryInput) || isNaN(honorDivisionInput)) {
    showAlert('Error', 'Silakan masukkan nilai numerik valid untuk gaji.');
    return;
  }

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify({
      employeeid: document.getElementById('newEmployeeIdInput').value,
      name: document.getElementById('newNameInput').value,
      email: document.getElementById('newEmailInput').value,
      phone: document.getElementById('newPhoneInput').value,
      division: {
        DivId: 0,
        DivName: document.getElementById('newDivisionInput').value,
      },
      account: {
        Username: document.getElementById('newUsernameInput').value,
        Password: document.getElementById('newPasswordInput').value,
        Role: document.getElementById('newRoleInput').value,
      },
      salary: {
        'basic-salary': parseInt(basicSalaryInput),
        'honor-division': parseInt(honorDivisionInput),
      },
    }),
    redirect: 'follow',
  };

  try {
    const response = await fetch(targetURL, requestOptions);
    const data = await response.json();

    if (data.status === false) {
      showAlert('Error', data.message, 'error');
    } else {
      showAlert('Success', 'Data karyawan berhasil ditambahkan!', 'success');
    }
  } catch (error) {
    console.error('Error:', error);
    showAlert('Error', 'Terjadi kesalahan yang tidak terduga.', 'error');
  }
};

document.getElementById('newEmployeeForm').addEventListener('submit', insertEmployee);
