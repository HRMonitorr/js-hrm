
// Function to show SweetAlert
const showAlert = (title, text, icon = 'info') => {
  Swal.fire({
    title: title,
    text: text,
    icon: icon,
    confirmButtonText: 'OK',
  });
};

// Function to get token from cookies
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

// Function to fetch all employees
const getAllEmployees = async () => {
  const token = getTokenFromCookies('Login');

  if (!token) {
    showAlert("Anda Belum Login", "Silakan login terlebih dahulu.");
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
      showAlert("Error", data.message, "error");
    }
  } catch (error) {
    console.error('Error:', error);
    showAlert("Error", "Terjadi kesalahan yang tidak terduga.", "error");
  }
};

// Function to search for an employee
const searchEmployee = async () => {
  const employeeIdInput = document.getElementById('employeeIdInput').value;

  if (!employeeIdInput) {
    showAlert("Error", "Silakan masukkan ID Karyawan", "error");
    return;
  }

  const token = getTokenFromCookies('Login');

  if (!token) {
    showAlert("Anda Belum Login", "Silakan login terlebih dahulu.");
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
      showAlert("Error", data.message, "error");
    }
  } catch (error) {
    console.error('Error:', error);
    showAlert("Error", "Terjadi kesalahan yang tidak terduga.", "error");
  }
};

// Function to delete an employee
const deleteEmployee = async (employeeId) => {
  const token = getTokenFromCookies('Login');

  if (!token) {
    showAlert("Error", "Token login tidak ada", "error");
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
      showAlert("Sukses", "Karyawan berhasil dihapus!", "success");
      getAllEmployees();
    } else {
      showAlert("Error", data.message, "error");
    }
  } catch (error) {
    console.error('Error:', error);
    showAlert("Error", "Terjadi kesalahan yang tidak terduga.", "error");
  }
};

// Function to edit an employee
const editEmployee = (employeeId) => {
  window.location.href = `formsupdate.html?employeeid=${employeeId}`;
};

// Event listener for search button click
document.getElementById('searchButton').addEventListener('click', searchEmployee);

// Event listener for employee data body click
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

// Function to handle delete employee confirmation
const deleteEmployeeHandler = (employeeId) => {
  Swal.fire({
    title: "Apakah Anda yakin?",
    text: "Setelah dihapus, Anda tidak dapat memulihkan data karyawan ini!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Ya, hapus!",
    cancelButtonText: "Tidak, batal!",
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      deleteEmployee(employeeId);
    }
  });
};

// Function to display employee data in the table
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
        <a href="#" class="edit-link" data-employeeid="${emp.employeeid}">Edit</a>
        <a href="#" class="delete-link" data-employeeid="${emp.employeeid}">Delete</a>
      </td>
      `;

      employeeDataBody.appendChild(newRow);
    });
  } else {
    employeeDataBody.innerHTML = `<tr><td colspan="9">Tidak ada data karyawan ditemukan.</td></tr>`;
  }
};

// Initial fetch of all employees
getAllEmployees();
