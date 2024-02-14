const apiKey = 'AIzaSyAb1O4dItYxNjvBXqbDyGlNag2mI0CRtFE';
const spreadsheetId = '1-qngs3tCge2ulWuPodfBifWOl-uZ94tgf5I7XIf1wMg';
const sheetName = 'Dashboard';

// Function to get data from the Google Sheet
async function getData() {
    try {
        const response = await axios.get(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}?key=${apiKey}`);
        return response.data.values || [];
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

// Function to display data on the webpage
function displayData(data) {
    const container = document.getElementById('dashboardData');
    container.innerHTML = '';

    if (data.length === 0) {
        container.innerHTML = 'No data available.';
        return;
    }

    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');

    for (let i = 1; i < data.length; i++) {
        const card = document.createElement('div');
        card.classList.add('card', 'border-primary', 'mb-3');

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        data[0].forEach((header, index) => {
            const field = document.createElement('p');
            field.classList.add('card-text');
            field.innerHTML = `<strong>${data[i][index]}</strong>`;
            cardBody.appendChild(field);
        });
        
        card.appendChild(cardBody);
        cardContainer.appendChild(card);
    }

    container.appendChild(cardContainer);
}


// Example usage for Dashboard sheet
getData().then(data => displayData(data));
