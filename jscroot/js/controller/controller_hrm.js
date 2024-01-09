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

const getEmployeeDetails = async () => {
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
            displayEmployeeData(data, 'EmployeeDataBody');
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
                    <span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                        ${emp.division['DivName']}
                    </span>
                </td>
                <td class="px-4 py-3 text-sm">
                    ${emp.salary['basic-salary']}
                </td>
                <td class="px-4 py-3 text-sm">
                    ${emp.salary['honor-division']}
                </td>
                <td class="px-4 py-3">
                    <a href="#" class="edit-link" data-employeeid="${emp.employeeid}">detail</a>
                </td>
            `;

            employeeDataBody.appendChild(newRow);
        });
    } else {
        employeeDataBody.innerHTML = `<tr><td colspan="7">No user data found.</td></tr>`;
    }
};

getEmployeeDetails();
