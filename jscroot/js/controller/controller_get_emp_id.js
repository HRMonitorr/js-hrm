// Function to make the API request to get all employees
async function getAllEmployees() {
  const token = getTokenFromCookies('Login');

  if (!token) {
    alert("Token not found");
    return;
  }

  const allEmployeesURL = 'https://asia-southeast2-gis-project-401902.cloudfunctions.net/one-employee';

  const requestOptions = {
    method: 'GET',
    headers: {
      'accept': 'application/json',
      'Login': token,
    },
  };

  try {
    const response = await fetch(allEmployeesURL, requestOptions);
    const data = await response.json();

    if (data.status === 200 && data.data.length > 0) {
      // Extract employeeid from the first employee in the list
      const employeeId = data.data[0].employeeid;
      // Call the function to post employee data using the extracted employeeid
      postEmployeeData(employeeId);
    } else {
      // Handle error or empty employee list
      alert('Error getting employee data');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Function to make the API request to post employee data
async function postEmployeeData(employeeId) {
  const token = getTokenFromCookies('Login');

  if (!token) {
    alert("Token not found");
    return;
  }

  const oneEmployeeURL = 'https://asia-southeast2-gis-project-401902.cloudfunctions.net/one-employee';

  const requestOptions = {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Login': token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "employeeid": employeeId
    })
  };

  try {
    const response = await fetch(oneEmployeeURL, requestOptions);
    const data = await response.json();

    if (data.status === 200) {
      // Handle success
      displayEmployeeDetails(data.data);
    } else {
      // Handle error
      console.error('Error:', data.message);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Function to display employee details in HTML
function displayEmployeeDetails(employeeData) {
  // Your existing displayEmployeeDetails function code goes here
  const employeeCardElement = document.getElementById('employeeCard');

  if (employeeData.employeeid !== "") {
    // Display the employee details in a card
    employeeCardElement.innerHTML = `
      <div class="card-body">
        <h2>Employee Details</h2>
        <p><strong>Employee ID:</strong> ${employeeData.employeeid}</p>
        <p><strong>Name:</strong> ${employeeData.name}</p>
        <p><strong>Email:</strong> ${employeeData.email}</p>
        <!-- Add other details as needed -->
      </div>
    `;
  } else {
    // Display the error message when no data is available or unauthorized
    employeeCardElement.innerHTML = `<p>${employeeData.message}</p>`;
  }
}

// Call the function to get all employees and initiate the process
getAllEmployees();
