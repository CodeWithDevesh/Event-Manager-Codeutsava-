
let admins;

fetch("/getAdmins", { method: "POST" }).then((response) => {
    resp(response);
})
    .catch((error) => {

    });


async function resp(res){
    text = await res.text();

    admins = JSON.parse(text);
    console.log(admins);
    update();
}

function update(){
    let table = document.getElementById('table');
    table.innerHTML = '<tr> <th>Admin Name</th> <th>Branch</th> <th>Year</th> <th>role</th> <th>club/committee</th> <th><button onclick="add()">Add</button></th> <th></th></tr>';

    for(i=0; i<admins.length; i++){
        let row = table.insertRow(i+1);
        row.innerHTML = `<td>${admins[i].username}</td>
        <td>${admins[i].branch}</td>
        <td>${admins[i].year}</td>
        <td>${admins[i].type}</td>
        <td>${admins[i].club}</td>
        <td><button id='addbtn'>Remove</button></td>`
    }
}

function add(){
    window.location.href = "/addAdmin.html";
}