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

      if (data.status === 200) {
          // Divide the data into chunks of 4
          const chunksOf4 = chunkArray(data.data, 4);
          console.log('Chunks of 4:', chunksOf4);

          // Divide the data into chunks of 5
          const chunksOf5 = chunkArray(data.data, 5);
          console.log('Chunks of 5:', chunksOf5);

          // Display the first chunk in the UI
          displayCommitData(chunksOf4[0]);

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

// Function to divide an array into chunks
function chunkArray(arr, chunkSize) {
  const result = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
  }
  return result;
}

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
