// Function to make the API request with the token
async function getUserWithToken() {
  const token = getTokenFromCookies('Login'); // Get the token dari cookies via parameter

  if (!token) {
    alert("token tidak ditemukan");
    return;
  }

  const targetURL = 'https://asia-southeast2-gis-project-401902.cloudfunctions.net/get-all-employee';

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
      displayEmployeeData(data.data);
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error('Error:', error);
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
function displayEmployeeData(EmployeeData) {
  const EmployeeDataBody = document.getElementById('EmployeeDataBody');

  if (EmployeeData && EmployeeData.length > 0) {
    EmployeeData.forEach(emp => {
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
      <td
      class="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
      <div class="flex px-2 py-1">
        <div>
          <img src="../assets/img/team-2.jpg"
            class="inline-flex items-center justify-center mr-4 text-sm text-white transition-all duration-200 ease-in-out h-9 w-9 rounded-xl"
            alt="user1" />
        </div>
        <div class="flex flex-col justify-center">
          <h6 class="mb-0 text-sm leading-normal dark:text-white">${emp.employeeid}</h6>
          <p class="mb-0 text-xs leading-tight dark:text-white dark:opacity-80 text-slate-400">
          ${emp.name}</p>
        </div>
      </div>
    </td>
    <td
      class="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
      <p class="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-80">Manager</p>
      <p class="mb-0 text-xs leading-tight dark:text-white dark:opacity-80 text-slate-400">
        Organization</p>
    </td>
    <td
      class="p-2 text-sm leading-normal text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
      <span
        class="bg-gradient-to-tl from-emerald-500 to-teal-400 px-2.5 text-xs rounded-1.8 py-1.4 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white">${user.role}</span>
    </td>
    <td
      class="p-2 text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
      <span
        class="text-xs font-semibold leading-tight dark:text-white dark:opacity-80 text-slate-400">23/04/18</span>
    </td>
    <td
      class="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
      <a href="javascript:;"
        class="text-xs font-semibold leading-tight dark:text-white dark:opacity-80 text-slate-400">
        Edit </a>
    </td>
  </tr>
      `;
      EmployeeDataBody.appendChild(newRow);
    });
  } else {
    EmployeeDataBody.innerHTML = '<tr><td colspan="3">No user data found.</td></tr>';
  }
}

getUserWithToken();
