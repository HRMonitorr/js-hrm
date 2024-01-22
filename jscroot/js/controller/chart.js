var employeeLabel = [], employeeSalaryData = [], empHonorDivision = [];

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

const myHeaders = new Headers();
const token = getTokenFromCookies('Login'); 
myHeaders.append('Login', token);

const requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow',
};

async function getDummyData() {
  const apiUrl = "https://asia-southeast2-gis-project-401902.cloudfunctions.net/get-all-employee";

  try {
    const response = await fetch(apiUrl, requestOptions);

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const barChatData = await response.json();

    const salary = barChatData.data.map((x) => x.salary['basic-salary']);
    const honor_division = barChatData.data.map((x) => x.salary['honor-division']);
    const name = barChatData.data.map((x) => x.username);

    employeeSalaryData = salary;
    empHonorDivision = honor_division;
    employeeLabel = name;
  } catch (error) {
    console.error('Error in getDummyData:', error.message);
  }
}

async function dummyChart() {
  try {
    await getDummyData();

    const ctx = document.getElementById('lineChart').getContext('2d');

    if (!ctx) {
      throw new Error('Canvas element not found');
    }

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: employeeLabel,
        datasets: [
          {
            label: 'Employee Basic salary',
            backgroundColor: 'blue',
            borderColor: 'rgb(255, 99, 132)',
            data: employeeSalaryData
          },
          {
            label: 'Employee Honor Division',
            backgroundColor: 'pink',
            borderColor: 'rgb(255, 99, 132)',
            data: empHonorDivision
          }
        ]
      },
      options: {
        tooltips: {
          mode: 'index'
        }
      }
    });
  } catch (error) {
    console.error('Error in dummyChart:', error.message);
  }
}

dummyChart();
