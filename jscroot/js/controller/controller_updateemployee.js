
async function autoSearchEmployee() {
    const urlParams = new URLSearchParams(window.location.search);
    const employeeIdFromURL = urlParams.get('employeeid');
    if (employeeIdFromURL) {
      document.getElementById('employeeIdInput').value = employeeIdFromURL;
  
      await searchEmployee();
    }
  }
  
  async function searchEmployee() {
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
  
        submitAutoSearchData(data.data);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  function submitAutoSearchData(employeeData) {
    document.getElementById('employeeId').value = employeeData.employeeid;
    document.getElementById('name').value = employeeData.name;
    document.getElementById('email').value = employeeData.email;
    document.getElementById('phone').value = employeeData.phone;
    document.getElementById('divId').value = employeeData.division.DivId;
    document.getElementById('divName').value = employeeData.division.DivName;
    document.getElementById('username').value = employeeData.account.Username;
    document.getElementById('password').value = employeeData.account.Password;
    document.getElementById('role').value = employeeData.account.Role;
    document.getElementById('basicSalary').value = employeeData.salary['basic-salary'];
    document.getElementById('honorDivision').value = employeeData.salary['honor-division'];
  
    document.getElementById('employeeDetails').innerHTML = `
      <p>Employee ID: ${employeeData.employeeid}</p>
      <p>Name: ${employeeData.name}</p>
      <p>Email: ${employeeData.email}</p>
      <!-- Add more details as needed -->
    `;
  }
  
  const updateTargetURL = 'https://asia-southeast2-gis-project-401902.cloudfunctions.net/updatedataemployee';
  
  