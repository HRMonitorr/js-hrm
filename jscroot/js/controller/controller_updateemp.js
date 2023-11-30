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

const searchEmployeeById = async (employeeId) => {
  const token = getTokenFromCookies('Login');

  if (!token) {
    // alert("Anda Belum Login");
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
      alert(data.message);
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
  setValue('divisionInput', employeeData.division.divName);
  setValue('usernameInput', employeeData.account.username);
  setValue('passwordInput', employeeData.account.password);
  setValue('basicSalaryInput', employeeData.salary['basic-salary']);
  setValue('honorDivisionInput', employeeData.salary['honor-division']);

  document.getElementById('employeeForm').style.display = 'block';
};

const updateEmployee = async (event) => {
  event.preventDefault();

  const employeeId = document.getElementById('employeeIdInput').value;
  const token = getTokenFromCookies('Login');

  if (!token) {
    // alert("Anda Belum Login");
    return;
  }

  const targetURL = 'https://asia-southeast2-gis-project-401902.cloudfunctions.net/updatedataemployee';

  const myHeaders = new Headers();
  myHeaders.append('Login', token);
  myHeaders.append('Content-Type', 'application/json');

  const basicSalaryInput = document.getElementById('basicSalaryInput').value;
  const honorDivisionInput = document.getElementById('honorDivisionInput').value;

  if (isNaN(basicSalaryInput) || isNaN(honorDivisionInput)) {
    // alert('Please enter valid numeric values for salary.');
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
      division: { divName: document.getElementById('divisionInput').value },
      account: {
        username: document.getElementById('usernameInput').value,
        password: document.getElementById('passwordInput').value,
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
window.location.href = 'pages/';
    } else {
      alert(data.message);
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
