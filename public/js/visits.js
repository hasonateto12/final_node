let raw_data = [];

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
    let response = await fetch('/visits/Visit');
    let data = await response.json();
    raw_data = data;
    createTable();
}

async function AddvisitToServer() {
    let guardName = document.getElementById("guardName").value;
    let pointId = document.getElementById("pointId").value;
    let notes = document.getElementById("notes").value;

    let url = "/visits/Visit";
    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ guardName, pointId, notes })
    });
    let data = await response.json();
    console.log(data);
    getList();
    createTable(); 
}

async function EditVisit() {
    let visitID = document.getElementById("updateVisitID").value;
    let updatedGuardName = document.getElementById("updatedGuardName").value;
    let updatedNotes = document.getElementById("updatedNotes").value;

    if (!visitID || (!updatedGuardName && !updatedNotes)) {
        return;
    }

    let response = await fetch(`/visits/Visit/${visitID}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ guardName: updatedGuardName, notes: updatedNotes })
    });

    if (response.ok) {
        getList();
    } else {
        console.error('Error updating visit:', response.statusText);
    }
    getList();
    createTable();
}

async function DeletevisitFromServer() {
    let visit_pointId = document.getElementById("deleteVisitID").value;
    let url = `/visits/Visit?id=${visit_pointId}`;
    let response = await fetch(url, {
        method: 'DELETE',
    });
    let data = await response.json();
    console.log(data);
    getList(); 
}
getList();
