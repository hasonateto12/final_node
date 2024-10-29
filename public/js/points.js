let raw_data = [];

function createTable() {
    let str = "";
    for (let point of raw_data) {
        str += "<tr>";
        str += `<td>${point.name}</td>`;
        str += `<td>${point.id}</td>`;
        str += `<td>${point.location}</td>`;
        str += "</tr>";
    }
    document.getElementById("mainTable").innerHTML = str;
}

async function getList() {
    let response = await fetch("/points/Point");
    if (response.ok) {
        raw_data = await response.json();
        createTable();
    } else {
        console.error("Error fetching points list:", response.statusText);
    }
}

async function AddpointToServer() {
    let point = {
        name: document.getElementById("pointName").value,
        location: document.getElementById("pointLocation").value
    };

    let response = await fetch("/points/Point", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(point)
    });

    if (response.ok) {
        console.log(await response.json());
        getList(); 
    } else {
        console.error("Error adding point:", response.statusText);
    }
    getList();
    createTable();
}

async function EditPoint() {
    
    let updatedName = document.getElementById("updatedPointName").value;
    let pointID = document.getElementById("updatePointID").value;
    let updatedLocation = document.getElementById("updatedPointLocation").value;

    if (updatedName  || (!pointID && !updatedLocation)) return;

    let response = await fetch(`/points/Point/${pointID}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: updatedName, location: updatedLocation })
    });

    if (response.ok) {
        getList();
    } else {
        console.error("Error updating point:", response.statusText);
    }
    createTable();
    getList();
}

async function DeletepointFromServer() {
    let point_id = document.getElementById("deletePointID").value;
    let response = await fetch(`/points/Point=${point_id}`, { method: 'DELETE' });

    if (response.ok) {
        console.log(await response.json());
        getList(); // Refresh list after deleting
    } else {
        console.error("Error deleting point:", response.statusText);
    }
}

 getList(); 

