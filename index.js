document.body.onload = init;

function updateCounter(count) {
    var p = document.getElementById("counter");
    p.textContent = `Records: ${count}`;
}

function init() {
    addRow();
    addRow();

    updateCounter(count);
}

const minRecords = 2;
const maxRecords = 5;  // Default 1000
let count = 0;
function addRow() {

    const table = document.getElementById("table");

    let rowId = count+1;

    if (count < maxRecords) {
        table.insertAdjacentHTML("beforeend", `
        <tr id="row` + count + `">
        <td>` + rowId + `</td>
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
    } else {
        alert(`Max records is ${maxRecords}!`);
        return;
    }

    count += 1;
    updateCounter(count);
}

// TODO: Can still remove last record. Problem with indexing I think
function removeRow() {
    if (count > minRecords) {
        const buttons = document.getElementsByTagName("button");

        const buttonPressed = e => { 
            const child = document.getElementById(e.target.id);
            child?.parentElement.parentElement.parentElement?.remove();
        }

        for (let button of buttons) {
            button.addEventListener("click", buttonPressed);
        }

        count -= 1;
        updateCounter(count);
    } else {
        alert(`There must be at least ${minRecords} records!`);
        return;
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

