// Function to make the API request with the token
async function getOneEmployeeWithToken(employeeId) {
  const token = getTokenFromCookies('Login');

  if (!token) {
    alert("Token not found");
    return;
  }

  const oneEmployeeURL = 'https://asia-southeast2-gis-project-401902.cloudfunctions.net/one-employee';

  // Set up headers with the token
  const myHeaders = new Headers();
  myHeaders.append('Login', token);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  try {
    // Make GET request to one-employee endpoint by employee ID
    const response = await fetch(`${oneEmployeeURL}?employeeid=${employeeId}`, requestOptions);
    const data = await response.json();

    if (data.status === 200) {
      // Update HTML element with the retrieved data
      displayEmployeeDetails(data.data);
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

// Function to display employee details in HTML
function displayEmployeeDetails(employeeData) {
  const employeeCardElement = document.getElementById('employeeCard');

  if (employeeData.employeeid !== "") {
    // Display the employee details in a card
    employeeCardElement.innerHTML = `
      <div class="card-body">
        <h2>Employee Details</h2>
        <p><strong>Employee ID:</strong> ${employeeData.employeeid}</p>
        <p><strong>Name:</strong> ${employeeData.name}</p>
        <p><strong>Email:</strong> ${employeeData.email}</p>
        <p><strong>Phone:</strong> ${employeeData.phone}</p>
        <p><strong>Division:</strong> ${employeeData.division.divName}</p>
        <p><strong>Username:</strong> ${employeeData.account.username}</p>
        <p><strong>Password:</strong> ${employeeData.account.password}</p>
        <p><strong>Basic Salary:</strong> ${employeeData.salary['basic-salary']}</p>
        <p><strong>Honor Division:</strong> ${employeeData.salary['honor-division']}</p>
      </div>
    `;
  } else {
    // Display the error message when no data is available or unauthorized
    employeeCardElement.innerHTML = `<p>${employeeData.message}</p>`;
  }
}

// Example usage: Provide the actual employee ID you want to retrieve
const employeeIdToRetrieve = "123"; // Replace with the actual employee ID
getOneEmployeeWithToken(employeeIdToRetrieve);
