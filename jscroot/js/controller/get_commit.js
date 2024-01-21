document.getElementById('commitLifetimeForm').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const ownerName = document.getElementById('ownerName').value;
    const repoName = document.getElementById('repoName').value;
  
    const token = getTokenFromCookies('Login');
  
    if (!token) {
      await Swal.fire({
        icon: 'warning',
        title: 'Authentication Error',
        text: 'You are not logged in.',
      });
      return;
    }
  
    const requestBody = {
      ownerName,
      repoName,
    };
  
    try {
      const response = await fetch('https://asia-southeast2-gis-project-401902.cloudfunctions.net/commit-lifetime', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Login': token,
        },
        body: JSON.stringify(requestBody),
      });
  
      const data = await response.json();
      console.log('Response Data:', data);
  
      if (data.status === 200) {
        displayCommitData(data.data);
  
        await Swal.fire({
          icon: 'success',
          title: 'Success',
          text: data.message,
        });
      } else {
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.message,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An unexpected error occurred. Please try again later.',
      });
    }
  });
  
  function displayCommitData(commitData) {
    const tableBody = document.getElementById('commitTableBody');
    tableBody.innerHTML = ''; // Clear existing data
  
    commitData.forEach(commit => {
      const row = `
      <tr
      class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
        <td class="px-4 py-3">
        <div class="flex items-center text-sm">
          <div>
            <p class="font-semibold">${commit.author}</p>
          </div>
        </div>
      </td>
      <td class="px-4 py-3 text-sm">
        <p class="font-semibold">${commit.repos}</p>
      </td>
      <td class="px-4 py-3 text-sm">
        <p class="font-semibold">${commit.email}</p>
      </td>
      <td class="px-4 py-3 text-sm">
        ${commit.comment}
      </td>
      <td class="px-4 py-3 text-xs">
        <span
          class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
          ${author.date}
        </span>
      </td>
        </tr>
      `;
      tableBody.insertAdjacentHTML('beforeend', row);
    });
  }
  
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
  