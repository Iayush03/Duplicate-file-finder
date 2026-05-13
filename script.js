async function findDuplicates() {
    const input = document.getElementById('folderInput');
    const files = Array.from(input.files);
    const results = document.getElementById('results');

    results.innerHTML = '<h2>Scanning files...</h2>';

    if (files.length === 0) {
        results.innerHTML = '<p>Please select a folder.</p>';
        return;
    }

    const hashMap = {};

    for (const file of files) {
        const hash = await generateHash(file);

        if (!hashMap[hash]) {
            hashMap[hash] = [];
        }

        hashMap[hash].push(file.webkitRelativePath);
    }

    results.innerHTML = '<h2>Duplicate Files:</h2>';

    let duplicateFound = false;

    for (const hash in hashMap) {
        if (hashMap[hash].length > 1) {
            duplicateFound = true;

            const div = document.createElement('div');
            div.classList.add('file-card');

            div.innerHTML = `
                <p class="duplicate">Duplicate Group</p>
                ${hashMap[hash].map(file => `<p>${file}</p>`).join('')}
            `;

            results.appendChild(div);
        }
    }

    if (!duplicateFound) {
        results.innerHTML += '<p>No duplicate files found.</p>';
    }
}

async function generateHash(file) {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}
