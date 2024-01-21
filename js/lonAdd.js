const apiKey = 'AIzaSyAb1O4dItYxNjvBXqbDyGlNag2mI0CRtFE';
const spreadsheetId = '1-qngs3tCge2ulWuPodfBifWOl-uZ94tgf5I7XIf1wMg';
const sheetName = 'LonAdd';

// Function to get data from the Google Sheet
async function getData() {
    try {
        const response = await axios.get(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?key=${apiKey}`);
        const data = response.data.values || [];
		console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

// Function to display data in card view
function displayCardView(data) {
    const container = document.getElementById('lonAddData');
    container.innerHTML = '';

    if (data.length === 0) {
        container.innerHTML = 'No data available.';
        return;
    }

    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');

    for (let i = 1; i < data.length; i += 2) {
        const cardRow = document.createElement('div');
        cardRow.classList.add('row', 'mb-3');

        // Create first card
        const card1 = createCard(data[0], data[i]);
        cardRow.appendChild(card1);

        // Add a separator
        const separator = document.createElement('div');
        separator.classList.add('col-md-1'); // Adjust the size of the separator
        cardRow.appendChild(separator);

        // Create second card if available
        if (i + 1 < data.length) {
            const card2 = createCard(data[0], data[i + 1]);
            cardRow.appendChild(card2);
        }

        cardContainer.appendChild(cardRow);
    }

    container.appendChild(cardContainer);
}

// Function to display data in table view
function displayTableView(data) {
    const tableContainer = document.getElementById('lonAddTable');
    tableContainer.innerHTML = '';

    if (data.length === 0) {
        tableContainer.innerHTML = 'No data available.';
        return;
    }

    const table = document.createElement('table');
    table.classList.add('table');

    // Create table headers
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    for (const header of data[0]) {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    }
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');
    for (let i = 1; i < data.length; i++) {
        const rowData = data[i];
        const tr = document.createElement('tr');
        for (const field of rowData) {
            const td = document.createElement('td');
            td.textContent = field;
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);

    tableContainer.appendChild(table);
}

// Function to create a card
function createCard(headers, rowData) {
    const card = document.createElement('div');
    card.classList.add('col-md-5', 'card', 'border-primary'); // Adjust the size of the cards

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    // Use the first column as the card title
    const cardTitle = document.createElement('h3');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = rowData[0];
    cardBody.appendChild(cardTitle);

    // Display the rest of the data as card text
    for (let i = 1; i < headers.length; i++) {
        const field = document.createElement('p');
        field.classList.add('card-text');
        field.innerHTML = `<strong>${headers[i]}:</strong> ${rowData[i]}`;
        cardBody.appendChild(field);
    }

    card.appendChild(cardBody);
    return card;
}

// Example usage for lonAdd sheet
getData().then(data => {
    displayCardView(data);
    displayTableView(data);
});



