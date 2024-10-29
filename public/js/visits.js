let raw_data = [];

// Function to create the HTML table for visits
function createTable() {
    let str = "";
    for (let visit of raw_data) {
        str += "<tr>";
        str += `<td>${visit.guardname}</td>`;
        str += `<td>${visit.pointId}</td>`;
        str += `<td>${visit.notes}</td>`;
        str += `<td>${new Date(visit.visit_time).toLocaleString()}</td>`;
        str += "</tr>";
    }
    document.getElementById("mainTable").innerHTML = str;
}


async function getList() {
    let response = await fetch('/visits/Visit');  // Change to '/points'
    let data = await response.json();
    raw_data = data;
    createTable();
}

async function AddvisitToServer() {
    let guardName = document.getElementById("guardname").value;
    let pointId = document.getElementById("pointId").value;
    let notes = document.getElementById("notes").value;

    let response = await fetch('/visits/Visit', {  
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ guardname: guardName, pointId: pointId, notes: notes,})
    });

    if (response.ok) {
        getList();
    } else {
        console.error('Error adding point:', response.statusText);
    }
}

async function EditVisit() {
    let updatedGuardName = document.getElementById("updatedGuardName").value;
    let updatepointId = document.getElementById("updatepointId").value;
    let updatedNotes = document.getElementById("updatedNotes").value;

    if (!updatepointId || (!updatedGuardName && !updatedNotes)) {
        return;
    }

    let response = await fetch(`/visits/Visit`, {  // Change to '/points'
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ guardname: updatedGuardName, pointId: updatepointId, notes: updatedNotes })  // Include 'idx' for identifying the point
    });

    if (response.ok) {
        getList();
    } else {
        console.error('Error updating point:', response.statusText);
    }
}

async function DeletevisitFromServer() {
    let pointID = document.getElementById("deletePointID").value;

    try {
        let response = await fetch(`/visits/Visit`, {  // Change to '/points'
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
