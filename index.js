document.body.onload = init;

function updateCounter(count) {
    var p = document.getElementById("counter");
    p.textContent = `Records: ${count}`;
}

function init() {
    addRow();
    addRow();
    addRow();
    addRow();
    addRow();
}

const minRecords = 2;
const maxRecords = 1000;  // Default 1000
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
        <button class="rmBtn" id="rmBtn` + count + `" type="button" title="Remove row." onClick="removeRow()">X</button>
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

// TODO: Can still remove last record. Problem with indexing I think.
function removeRow() {

    // Get all remove buttons
    var removeButtons = document.querySelectorAll(".rmBtn");

    // Add click event listener to each remove button
    removeButtons.forEach(function(button) {
        //
        // THIS CODE DOESN'T WORK ON THE FIRST CLICK!!!
        //
        button.addEventListener("click", function() {
            // Get the parent div of the clicked button
            var parentDiv = this.parentNode.parentNode.parentNode;

            // Remove the parent div from the DOM
            parentDiv.remove();

            count -= 1;
            updateCounter(count);
        });
    });



    // if (count > minRecords) {
    //
    //     // Get all remove buttons
    //     var removeButtons = document.querySelectorAll('.rmBtn');
    //
    //     // Add click event listener to each remove button
    //     removeButtons.forEach(function(button) {
    //         button.addEventListener('click', function() {
    //             // Get the parent div of the clicked button
    //             var parentDiv = this.parentNode.parentNode.parentNode;
    //
    //             // Remove the parent div from the DOM
    //             parentDiv.remove();
    //         });
    //     });
    //
    //     count -= 1;
    //     updateCounter(count);
    // } else {
    //     alert(`There must be at least ${minRecords} records!`);
    //     return;
    // }

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

