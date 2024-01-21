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
        text: 'An error occurred while processing your request.',
      });
    }
  });

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

  function displayCommitData(commitData) {
    const commitTableBody = document.querySelector('#commitTable tbody');
    commitTableBody.innerHTML = '';

    if (commitData && commitData.length > 0) {
      commitData.forEach((commit) => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
          <td>${commit.author}</td>
          <td><a href="${commit.repos}" target="_blank">${commit.repos}</a></td>
          <td>${commit.email}</td>
          <td>${commit.comment}</td>
          <td>${commit.date}</td>
        `;
        commitTableBody.appendChild(newRow);
      });
    } else {
      const newRow = document.createElement('tr');
      newRow.innerHTML = '<td colspan="5">No commit data found.</td>';
      commitTableBody.appendChild(newRow);
    }
  }