import { getTokenFromCookies } from "../template/template.js";

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
    //   console.log('Response Data:', data);
  
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
        <tr>
        <td class="px-4 py-3 text-sm">
          <p class="font-semibold">${commit.author}</p>
        </td>
        <td class="px-4 py-3 text-sm">
          <p class="font-semibold">${commit.repos}</p>
        </td>
        <td class="px-4 py-3 text-sm">
        <p class="font-semibold">${commit.email}</p>
      </td>
      <td class="px-4 py-3 text-sm">
        <p class="font-semibold">${commit.comment}</p>
      </td>
      <td class="px-4 py-3 text-sm">
        <p class="font-semibold">${commit.date}</p>
      </td>
        </tr>
      `;
      tableBody.insertAdjacentHTML('beforeend', row);
    });
  }
  
