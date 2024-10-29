let raw_data = [];

function createTable() {
    let str = "";
    for (let line of raw_data) {
        str += "<tr>";
        str += `<td>${line.name}</td>`;
        str += `<td>${line.id}</td>`;
        str += `<td>${line.location}</td>`;
        str += "</tr>";
    }
    document.getElementById("mainTable").innerHTML = str;
}

async function getList() {
    let response = await fetch('/points');  // Change to '/points'
    let data = await response.json();
    raw_data = data;
    createTable();
}

async function AddpointToServer() {
    let name = document.getElementById("pointName").value;
    let location = document.getElementById("pointLocation").value;

    let response = await fetch('/points', {  // Change to '/points'
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, location: location })
    });

    if (response.ok) {
        getList();
    } else {
        console.error('Error adding point:', response.statusText);
    }
}

async function EditPoint() {
    let pointID = document.getElementById("updatePointID").value;
    let updatedName = document.getElementById("updatedPointName").value;
    let updatedLocation = document.getElementById("updatedPointLocation").value;

    if (!pointID || (!updatedName && !updatedLocation)) {
        return;
    }

    let response = await fetch(`/points`, {  // Change to '/points'
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idx: pointID, full_name: updatedName, location: updatedLocation })  // Include 'idx' for identifying the point
    });

    if (response.ok) {
        getList();
    } else {
        console.error('Error updating point:', response.statusText);
    }
}

async function DeletepointFromServer() {
    let pointID = document.getElementById("deletePointID").value;

    try {
        let response = await fetch(`/points`, {  // Change to '/points'
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idx: pointID })  // Include 'idx' for identifying the point
        });

        if (response.ok) {
            getList();
        } else {
            console.error('Error deleting point:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
