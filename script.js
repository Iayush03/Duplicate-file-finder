const sampleData = [
    {
        name: "photo1.jpg",
        size: "2MB",
        status: "Duplicate"
    },
    {
        name: "video.mp4",
        size: "50MB",
        status: "Unique"
    },
    {
        name: "document.pdf",
        size: "1MB",
        status: "Duplicate"
    }
];

function scanFiles() {

    const table = document.getElementById('resultBody');

    table.innerHTML = '';

    sampleData.forEach(file => {

        const row = `
            <tr>
                <td>${file.name}</td>
                <td>${file.size}</td>
                <td>${file.status}</td>
            </tr>
        `;

        table.innerHTML += row;
    });
}

function clearResults() {
    document.getElementById('resultBody').innerHTML = '';
}
