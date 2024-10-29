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
     await getList();
    createTable(); 
}
