document.body.onload = addRow;

let count = 0;
function addRow() {

    const table = document.getElementById("table");

    table.insertAdjacentHTML("beforeend", `
        <tr id="row` + count + `">
        <td class="content">
        <textarea class="input" style="resize:none; text-align:center; text-valign:center"></textarea>
        </td>
        <td class="content">
        <textarea class="input" style="resize:none; text-align:center; text-valign:center"></textarea>
        </td>
        <td>
        <button id="rmBtn` + count + `" type="button" title="Remove row." onClick="removeRow()">X</button>
        </td>
        </tr>
    `);

    count += 1;
}

// For now it remove rows from start
// TODO: Make the button remove a row it belongs to
function removeRow() {
    const buttons = document.getElementsByTagName("button");

    const buttonPressed = e => { 
        const child = document.getElementById(e.target.id);
        child?.parentElement.parentElement.parentElement?.remove();
    }

    for (let button of buttons) {
        button.addEventListener("click", buttonPressed);
    }
}

function parseData() {
    var csv_data = [];

    var rows = document.getElementsByTagName('tr');
    for (var i = 1; i < rows.length; i++) {

        var cols = rows[i].querySelectorAll('td textarea');

        var strLengthLimit = 25
        var csvrow = [];
        for (var j = 0; j < cols.length; j++) {

            text = cols[j].value.trim()

            if (text.length > strLengthLimit) {
                alert(`The string at row ${i} is too long!`)
                return
            } else if (text.length == 0) {
                alert(`Cells cannot be empty!`)
                return
            }
            else {
                csvrow.push(text);
            }

        }
        csv_data.push(csvrow.join("|"));
    }
    csv_data = csv_data.join('\n');

    download(csv_data);

}

function download(csv_data) {
    CSVFile = new Blob([csv_data], {
        type: "text/csv"
    });

    var temp_link = document.createElement('a');

    temp_link.download = "test.csv";
    var url = window.URL.createObjectURL(CSVFile);
    temp_link.href = url;

    temp_link.style.display = "none";
    document.body.appendChild(temp_link);

    temp_link.click();
    document.body.removeChild(temp_link);
}

