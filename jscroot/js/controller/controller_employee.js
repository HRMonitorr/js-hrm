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
  window.location.href = `formsupdate.html?employeeid=${employeeId}`;
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
      <tr class="text-gray-700 dark:text-gray-400">
      <td class="px-4 py-3">
      <div class="flex items-center text-sm">
        <div>
          <p class="font-semibold">${emp.employeeid}</p>
        </div>
      </div>
    </td>
    <td class="px-4 py-3 text-sm">
      <p class="font-semibold">${emp.name}</p>
    </td>
    <td class="px-4 py-3 text-sm">
      <p class="font-semibold">${emp.email}</p>
    </td>
    <td class="px-4 py-3 text-sm">
      ${emp.phone}
    </td>
    <td class="px-4 py-3 text-xs">
      <span
        class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
        ${emp.division['divName']}
      </span>
    </td>
    <td class="px-4 py-3 text-sm">
      ${emp.salary['basic-salary']}
    </td>
    <td class="px-4 py-3 text-sm">
      ${emp.salary['honor-division']}
    </td>
    <td class="px-4 py-3">
      <div class="flex items-center space-x-4 text-sm">
        <a href="javascript:;"
          class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
          aria-label="Edit" onclick="editEmployee('${emp.employeeid}')">
          <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z">
            </path>
          </svg>
        </a>
        <a href="javascript:;"
          class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
          aria-label="Delete">
          <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clip-rule="evenodd" onclick="deleteEmployeeHandler('${emp.employeeid}')"></path>
          </svg>
        </a>
      </div>
    </td>
    </tr>

      `;
      employeeDataBody.appendChild(newRow);
    });
  } else {
    employeeDataBody.innerHTML = `<tr><td colspan="9">No user data found.</td></tr>`;
  }
};

// Initial fetch of all employees
getAllEmployees();
