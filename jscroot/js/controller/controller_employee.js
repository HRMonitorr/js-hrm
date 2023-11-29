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
    <a href="javascript:;" onclick="editEmployee('${emp.employeeid}')"
      class="text-purple-600 hover:text-purple-800 cursor-pointer focus:outline-none focus:shadow-outline-purple">
      Edit
    </a>
    <a href="javascript:;" onclick="deleteEmployeeHandler('${emp.employeeid}')"
      class="text-red-600 hover:text-red-800 cursor-pointer focus:outline-none focus:shadow-outline-red">
      Delete
    </a>
  </div>
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
