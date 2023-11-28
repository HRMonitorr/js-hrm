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

const getAllEmployees = async () => {
  const token = getTokenFromCookies('Login');

  if (!token) {
    alert("Anda Belum Login");
    return;
  }

  const targetURL = 'https://asia-southeast2-gis-project-401902.cloudfunctions.net/get-all-employee';

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

    if (data.status === 200) {
      displayEmployeeData(data.data, 'EmployeeDataBody');
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const searchEmployee = async () => {
  const employeeIdInput = document.getElementById('employeeIdInput').value;

  if (!employeeIdInput) {
    alert("Please enter Employee ID");
    return;
  }

  const token = getTokenFromCookies('Login');

  if (!token) {
    alert("Anda Belum Login");
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
      alert(data.message);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const deleteEmployee = async (employeeId) => {
  const token = getTokenFromCookies('Login');

  if (!token) {
    alert("Token login tidak ada");
    return;
  }

  const targetURL = 'https://asia-southeast2-gis-project-401902.cloudfunctions.net/delete-employee';

  const myHeaders = new Headers();
  myHeaders.append('Login', token);
  myHeaders.append('Content-Type', 'application/json');

  const requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    body: JSON.stringify({ employeeid: employeeId }),
    redirect: 'follow'
  };

  try {
    const response = await fetch(targetURL, requestOptions);
    const data = await response.json();

    if (data.status === 200) {
      alert("Employee deleted successfully!");
      getAllEmployees();
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const editEmployee = (employeeId) => {
  window.location.href = `update.html?employeeid=${employeeId}`;
};

document.getElementById('searchButton').addEventListener('click', searchEmployee);

const deleteEmployeeHandler = (employeeId) => {
  if (confirm("Are you sure you want to delete this employee?")) {
    deleteEmployee(employeeId);
  }
};

const displayEmployeeData = (employeeData, tableBodyId) => {
  const employeeDataBody = document.getElementById(tableBodyId);

  employeeDataBody.innerHTML = '';

  if (employeeData && employeeData.length > 0) {
    employeeData.forEach(emp => {
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td>${emp.employeeid}</td>
        <td>${emp.name}</td>
        <td>${emp.email}</td>
        <td>${emp.phone}</td>
        <td>${emp.division['divName']}</td>
        <td>${emp.account['username']}</td>
        <td>${emp.account['password']}</td>
        <td>${emp.salary['basic-salary']}</td>
        <td>${emp.salary['honor-division']}</td>
        <td>
          <a href="javascript:;" onclick="editEmployee('${emp.employeeid}')">Edit</a>
          <a href="javascript:;" onclick="deleteEmployeeHandler('${emp.employeeid}')">Delete</a>
        </td>
      `;
      employeeDataBody.appendChild(newRow);
    });
  } else {
    employeeDataBody.innerHTML = `<tr><td colspan="9">No user data found.</td></tr>`;
  }
};

// Initial fetch of all employees
getAllEmployees();
