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
            displayCommitChart(data.data);
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

function calculateTotalCommits(commitData) {
    return commitData.length;
}

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

    // Hitung total komit dari keseluruhan data
    const totalCommits = calculateTotalCommits(commitData);

    const chartData = {
        labels: ['Total Commits'],
        datasets: [{
            label: 'Total Commits',
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            data: [totalCommits],
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
        plugins: {
            title: {
                display: true,
                text: 'Total Number of Commits',
                font: {
                    size: 16,
                },
            },
            datalabels: {
                display: true,
                color: 'black',
                anchor: 'end',
                align: 'top',
                formatter: function (value, context) {
                    return value; // Menampilkan nilai sebagai label
                },
            },
        },
    };

    new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: chartOptions,
    });
}
