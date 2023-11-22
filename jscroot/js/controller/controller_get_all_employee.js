// Function to make the API request with the token
async function getUserWithToken() {
  const token = getTokenFromCookies('Login');

  if (!token) {
    alert("Token not found");
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

    if (data.status === 200) {
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
function displayEmployeeData(employeeData) {
  const employeeDataBody = document.getElementById('EmployeeDataBody');

  if (employeeData && employeeData.length > 0) {
    employeeData.forEach(emp => {
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td class="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
          <div class="flex px-2 py-1">
            <div>
              <img src="../assets/img/team-2.jpg"
                class="inline-flex items-center justify-center mr-4 text-sm text-white transition-all duration-200 ease-in-out h-9 w-9 rounded-xl"
                alt="user1" />
            </div>
            <div class="flex flex-col justify-center">
              <h6 class="mb-0 text-sm leading-normal dark:text-white">${emp.employeeid}</h6>
              <p class="mb-0 text-xs leading-tight dark:text-white dark:opacity-80 text-slate-400">
                ${emp.name}
              </p>
            </div>
          </div>
        </td>
        <td class="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
          <p class="mb-0 text-xs font-semibold leading-tight dark:text-white dark:opacity-80">${emp.division.divName}</p>
        </td>
        <td class="p-2 text-sm leading-normal text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
          <span class="bg-gradient-to-tl from-emerald-500 to-teal-400 px-2.5 text-xs rounded-1.8 py-1.4 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white">${emp.account.role}</span>
        </td>
        <td class="p-2 text-center align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
          <span class="text-xs font-semibold leading-tight dark:text-white dark:opacity-80">${emp.salary['basic-salary']}</span>
        </td>
        <td class="p-2 align-middle bg-transparent border-b dark:border-white/40 whitespace-nowrap shadow-transparent">
          <a href="javascript:;" class="text-xs font-semibold leading-tight dark:text-white dark:opacity-80 text-slate-400">
            Edit
          </a>
        </td>
      `;
      employeeDataBody.appendChild(newRow);
    });
  } else {
    employeeDataBody.innerHTML = '<tr><td colspan="5">No user data found.</td></tr>';
  }
}

getUserWithToken();
