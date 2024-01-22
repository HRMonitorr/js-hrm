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
            displayCommitData(data.data);
            displayCommitChart(data.data); // New line to display chart
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
    tableBody.innerHTML = '';

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

function displayCommitChart(commitData) {
    const ctx = document.getElementById('commitChart').getContext('2d');

    // Extract data for the chart
    const labels = commitData.map(commit => commit.date);
    const data = commitData.map(commit => commit.commitsCount);

    // Log the extracted data to the console for debugging
    console.log('Labels:', labels);
    console.log('Data:', data);

    const chartData = {
        labels: labels,
        datasets: [{
            label: 'Commit Data',
            borderColor: 'rgb(75, 192, 192)',
            data: data,
        }],
    };

    const chartOptions = {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
            },
            y: {
                type: 'linear',
                position: 'left',
            },
        },
    };

    new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: chartOptions,
    });
}
