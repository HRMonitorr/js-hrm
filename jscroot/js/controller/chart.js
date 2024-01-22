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
  
  var employeeLabel = [], employeeSalaryData = [], empHonorDivision = [];
  
  async function dummyChart() {
    await getDummyData();
  
    const ctx = document.getElementById('myChart').getContext('2d');
  
    const chart = new Chart(ctx, {
      type: 'bar',
  
      data: {
        labels: employeeLabel,
        datasets: [{
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
  }
  
  dummyChart();
  
  async function getDummyData() {
    const apiUrl = "https://asia-southeast2-gis-project-401902.cloudfunctions.net/get-all-employee";
  
    const token = getTokenFromCookies('Login');
    const myHeaders = new Headers();
    myHeaders.append('Login', token);
  
    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
  
    try {
      const response = await fetch(apiUrl, requestOptions);
      const barChatData = await response.json();
  
      if (barChatData.data && Array.isArray(barChatData.data)) {
        const salary = barChatData.data.map((x) => x.salary && x.salary['basic-salary'] ? x.salary['basic-salary'] : 0);
        const honor_division = barChatData.data.map((x) => x.salary && x.salary['honor-division'] ? x.salary['honor-division'] : 0);
        const name = barChatData.data.map((x) => x.username || '');
  
        employeeSalaryData = salary;
        empHonorDivision = honor_division;
        employeeLabel = name;
      } else {
        console.error("Data is null or not an array:", barChatData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  