let rd = [];

function createTable() {
    let str = "";
    for (let line of rd) {
        str += "<tr>";
        str += `<td>${line.name}</td>`;
        str += `<td>${line.location}</td>`;
        str += "</tr>";
    }
    document.getElementById("mainTable").innerHTML = str;
}

async function getList() {
    let response = await fetch('/points/Point'); 
    let data = await response.json();
    rd = data;
    createTable();
}

async function AddpointToServer() {
    let name = document.getElementById("pointName").value;
    let location = document.getElementById("pointLocation").value;

    let response = await fetch('/points/Point', {  
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
    let updatedName = document.getElementById("updatedPointName").value;
    let updatedLocation = document.getElementById("updatedPointLocation").value;
    let pointID = document.getElementById("updatePointID").value;

    if (!pointID || (!updatedName && !updatedLocation)) {
        return;
    }

    let response = await fetch(`/points/Point`, {  
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({full_name: updatedName, location: updatedLocation, idx: pointID})  
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
        let response = await fetch(`/points/Point`, {  
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idx: pointID })  
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
