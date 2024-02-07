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
  async function dummyPieChart() {
    await getDummyData();
  
    const ctx = document.getElementById('myPieChart').getContext('2d');
  
    const chart = new Chart(ctx, {
      type: 'pie',
  
      data: {
        labels: employeeLabel,
        datasets: [{
          data: employeeSalaryData,
          backgroundColor: ['blue', 'pink', 'green', 'orange', 'purple'], // Add more colors as needed
        }]
      },
  
      options: {
        tooltips: {
          mode: 'index'
        }
      }
    });
  }
  
  dummyPieChart();
  
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
      const barChartData = await response.json();
  
      if (barChartData.data && Array.isArray(barChartData.data)) {
        const salary = barChartData.data.map((x) => x.salary && x.salary['basic-salary'] ? x.salary['basic-salary'] : 0);
        const honor_division = barChartData.data.map((x) => x.salary && x.salary['honor-division'] ? x.salary['honor-division'] : 0);
        const name = barChartData.data.map((x) => x.username || '');
  
        employeeSalaryData = salary;
        empHonorDivision = honor_division;
        employeeLabel = name;
      } else {
        console.error("Data is null or not an array:", barChartData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  