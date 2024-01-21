import { getTokenFromCookies } from "../template/template.js";

const showAlert = (message, icon = 'success') => {
  Swal.fire({
    icon: icon,
    text: message,
    showConfirmButton: false,
    timer: 1500
  }).then(() => {
    window.location.href = 'tables_emp.html';
  });
};

const searchEmployeeById = async (employeeId) => {
  const token = getTokenFromCookies('Login');

  if (!token) {
    showAlert("Anda Belum Login", 'error');
    return;
  }

  const targetURL = 'https://asia-southeast2-gis-project-401902.cloudfunctions.net/one-employee';

  const myHeaders = new Headers();
  myHeaders.append('Login', token);

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify({ employeeid: employeeId }),
    redirect: 'follow',
  };
  try {
    const response = await fetch(targetURL, requestOptions);
    const data = await response.json();

    if (data.status === 200) {
      populateForm(data.data);
    } else {
      showAlert(data.message, 'error');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const populateForm = (employeeData) => {
  const setValue = (id, value) => {
    document.getElementById(id).value = value;
  };

  setValue('employeeIdInput', employeeData.employeeid);
  setValue('nameInput', employeeData.name);
  setValue('emailInput', employeeData.email);
  setValue('phoneInput', employeeData.phone);
  setValue('divisionInput', employeeData.division.DivName);
  setValue('usernameInput', employeeData.username); 
  setValue('basicSalaryInput', employeeData.salary['basic-salary']);
  setValue('honorDivisionInput', employeeData.salary['honor-division']);

  document.getElementById('employeeForm').style.display = 'block';
};

const updateEmployee = async (event) => {
  event.preventDefault();

  const employeeId = document.getElementById('employeeIdInput').value;
  const token = getTokenFromCookies('Login');

  if (!token) {
    showAlert("Anda Belum Login", 'error');
    return;
  }

  const targetURL = 'https://asia-southeast2-gis-project-401902.cloudfunctions.net/updatedataemployee';

  const myHeaders = new Headers();
  myHeaders.append('Login', token);
  myHeaders.append('Content-Type', 'application/json');

  const basicSalaryInput = document.getElementById('basicSalaryInput').value;
  const honorDivisionInput = document.getElementById('honorDivisionInput').value;

  if (isNaN(basicSalaryInput) || isNaN(honorDivisionInput)) {
    showAlert('Please enter valid numeric values for salary.', 'error');
    return;
  }

  const requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: JSON.stringify({
      employeeid: employeeId,
      name: document.getElementById('nameInput').value,
      email: document.getElementById('emailInput').value,
      phone: document.getElementById('phoneInput').value,
      username: document.getElementById('usernameInput').value,
      division: {
        DivId: 0, // You may need to adjust this value based on your requirements
        DivName: document.getElementById('divisionInput').value,
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

    if (data.status === 200) {
      showAlert('Berhasil Update Data', 'success');
      window.location.href = 'tables_emp.html';
    } else {
      showAlert(data.message, 'error');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const employeeIdFromURL = new URLSearchParams(window.location.search).get('employeeid');
if (employeeIdFromURL) {
  document.getElementById('employeeIdInput').value = employeeIdFromURL;
  searchEmployeeById(employeeIdFromURL);
}

document.getElementById('employeeForm').style.display = 'block';

document.getElementById('employeeForm').addEventListener('submit', updateEmployee);
