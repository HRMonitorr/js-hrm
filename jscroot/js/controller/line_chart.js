var employeeLabel = [], employeeSalaryData = [], empHonorDivision = []

async function dummyChart() {
  await getDummyData()

  const ctx = document.getElementById('lineChart').getContext('2d');

  const chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line', // Change from 'bar' to 'line'

    // The data for our dataset
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

    // Configuration options go here
    options: {
      tooltips: {
        mode: 'index'
      }
    }
  });
}

dummyChart();

// Fetch Data from API

async function getDummyData() {
  const apiUrl = "https://raw.githubusercontent.com/harisriyoni/json/main/employee.json"

  const response = await fetch(apiUrl);
  const barChatData = await response.json();

  const salary = barChatData.data.map((x) => x.salary['basic-salary']);
  const honor_division = barChatData.data.map((x) => x.salary['honor-division']);
  const name = barChatData.data.map((x) => x.username);

  employeeSalaryData = salary;
  empHonorDivision = honor_division;
  employeeLabel = name;
}
