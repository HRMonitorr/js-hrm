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
    Swal.fire({
      icon: 'warning',
      title: 'Authentication Error',
      text: 'You are not logged in.',
    }).then(() => {
      window.location.href = 'pages/login.html'; 
    });
    return;
  }

  const targetURL = 'https://asia-southeast2-gis-project-401902.cloudfunctions.net/get-all-employee';

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

    if (data.status === 200) {
      displayEmployeeData(data.data, 'EmployeeDataBody');
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
};

const searchEmployee = async () => {
  const employeeIdInput = document.getElementById('employeeIdInput').value;

  if (!employeeIdInput) {
    Swal.fire({
      icon: 'warning',
      title: 'Validation Error',
      text: 'Please enter Employee ID.',
    });
    return;
  }

  const token = getTokenFromCookies('Login');

  if (!token) {
    Swal.fire({
      icon: 'warning',
      title: 'Authentication Error',
      text: 'You are not logged in.',
    }).then(() => {
      window.location.href = 'pages/login.html'; 
    });
    return;
  }

  const targetURL = 'https://asia-southeast2-gis-project-401902.cloudfunctions.net/one-employee';

  const myHeaders = new Headers();
  myHeaders.append('Login', token);

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify({ employeeid: employeeIdInput }),
    redirect: 'follow',
  };

  try {
    const response = await fetch(targetURL, requestOptions);
    const data = await response.json();

    if (data.status === 200) {
      displayEmployeeData([data.data], 'EmployeeDataBody');
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
};

const deleteEmployee = async (employeeId) => {
  const token = getTokenFromCookies('Login');

  if (!token) {
    Swal.fire({
      icon: 'warning',
      title: 'Authentication Error',
      text: 'You are not logged in.',
    }).then(() => {
      window.location.href = 'tables_emp.html';
    });
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
    redirect: 'follow',
  };

  try {
    const response = await fetch(targetURL, requestOptions);
    const data = await response.json();

    if (data.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Employee deleted successfully!',
      }).then(() => {
        getAllEmployees();
      });
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
};

const editEmployee = (employeeId) => {
  window.location.href = `formsupdate.html?employeeid=${employeeId}`;
};

document.getElementById('searchButton').addEventListener('click', searchEmployee);

document.getElementById('EmployeeDataBody').addEventListener('click', (event) => {
  const target = event.target;
  if (target.classList.contains('edit-link')) {
    const employeeId = target.getAttribute('data-employeeid');
    editEmployee(employeeId);
  } else if (target.classList.contains('delete-link')) {
    const employeeId = target.getAttribute('data-employeeid');
    deleteEmployeeHandler(employeeId);
  }
});

const deleteEmployeeHandler = (employeeId) => {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You won\'t be able to revert this!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      deleteEmployee(employeeId);
    }
  });
};


const displayEmployeeData = (employeeData, tableBodyId) => {
  const employeeDataBody = document.getElementById(tableBodyId);

  employeeDataBody.innerHTML = '';

  if (employeeData && employeeData.length > 0) {
    employeeData.forEach((emp) => {
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
          <a href="#" class="edit-link" data-employeeid="${emp.employeeid}">Edit</a>
          <a href="#" class="delete-link" data-employeeid="${emp.employeeid}">Delete</a>
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
