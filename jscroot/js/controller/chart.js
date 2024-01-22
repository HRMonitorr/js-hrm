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
  

const employeeLabel = [];
const employeeSalaryData = [];
const empHonorDivision = [];

const dummyChart = async () => {
  await getAllEmployees();

  const ctx = document.getElementById('myChart').getContext('2d');

  const chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
      labels: employeeLabel,
      datasets: [
        {
          label: 'Employee Basic salary',
          backgroundColor: 'blue',
          borderColor: 'rgb(255, 99, 132)',
          data: employeeSalaryData,
        },
        {
          label: 'Employee Honor Division',
          backgroundColor: 'pink',
          borderColor: 'rgb(255, 99, 132)',
          data: empHonorDivision,
        },
      ],
    },

    // Configuration options go here
    options: {
      tooltips: {
        mode: 'index',
      },
    },
  });
};

const getAllEmployees = async () => {
  const token = getTokenFromCookies('Login');

  const apiUrl = 'https://asia-southeast2-gis-project-401902.cloudfunctions.net/get-all-employee'; // Replace with your API endpoint
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(apiUrl, requestOptions);
    const employeeData = await response.json();

    // Assuming the structure of employeeData is similar to the previous example
    const salary = employeeData.map((x) => x.salary['basic-salary']);
    const honorDivision = employeeData.map((x) => x.salary['honor-division']);
    const name = employeeData.map((x) => x.username);

    employeeSalaryData.push(...salary);
    empHonorDivision.push(...honorDivision);
    employeeLabel.push(...name);
  } catch (error) {
    console.error('Error fetching employee data:', error);
  }
};

dummyChart();
