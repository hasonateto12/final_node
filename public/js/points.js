// points.js

// Fetches points data from the server and populates the table
function loadPoints() {
    fetch('http://localhost:4225/api/points')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('mainTable');
            tableBody.innerHTML = ''; // Clear table before adding new rows

            data.forEach(point => {
                const row = document.createElement('tr');

                // Create and add cells for Name, ID, and Location
                const nameCell = document.createElement('td');
                nameCell.textContent = point.name;
                const idCell = document.createElement('td');
                idCell.textContent = point.id;
                const locationCell = document.createElement('td');
                locationCell.textContent = point.location;

                // Append cells to row
                row.appendChild(nameCell);
                row.appendChild(idCell);
                row.appendChild(locationCell);

                // Append row to table body
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error loading points:', error));
}

function AddpointToServer() {
    const name = document.getElementById('pointName').value;
    const location = document.getElementById('pointLocation').value;

    const newPoint = { name, location };

    fetch('http://localhost:4225/api/points', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPoint)
    })
    .then(response => response.json())
    .then(() => {
        loadPoints();  // Refresh table after adding a new point
    })
    .catch(error => console.error('Error adding point:', error));
}

// Function to edit an existing point by ID and update the table
function EditPoint() {
    const id = document.getElementById('updatePointID').value;
    const name = document.getElementById('updatedPointName').value;
    const location = document.getElementById('updatedPointLocation').value;

    if (!id || !name || !location) {
        alert('Please fill out all fields');
        return;
    }

    const updatedPoint = {
        name: name,
        location: location
    };

    fetch(`/api/points/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedPoint)
    })
    .then(response => response.json())
    .then(() => {
        loadPoints();  // Refresh the table after editing
    })
    .catch(error => console.error('Error editing point:', error));
}

// Function to delete a point by ID and update the table
function DeletepointFromServer() {
    const id = document.getElementById('deletePointID').value;

    if (!id) {
        alert('Please enter the ID of the point to delete');
        return;
    }

    fetch(`/api/points/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(() => {
        loadPoints();  // Refresh the table after deletion
    })
    .catch(error => console.error('Error deleting point:', error));
}

// Initial load of points when the page loads
window.onload = loadPoints;
