
// TODO: Get starting index of the processes (Like 0 or 1 for P0, P1 respectively)

function onGoClicked() {
    const procNum = document.getElementById("procNum").value;
    const resNum = document.getElementById("resNum").value;
    
    if (!procNum || !resNum) {
        alert('Please enter all the values');
        return;
    }

    renderInputMatrix(procNum, resNum);
}

function renderInputMatrix(procNum, resNum) {
    let alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
    const procs = parseInt(procNum);
    const res = parseInt(resNum);
    let table = `<table><th>Process</th><th colspan=${res}>Allocation</th><th colspan=${res}>Maximum</th>`;
    table += "<tr><td></td>";
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < resNum; j++) {
            table += `<td style="text-align:right">${alphabets[j]}</td>`;
        }
    }
    table += "</tr>";
    
    for (let i = 0; i < procs; i++) {
        table += `<tr><td>P${i}</td>`;
        for (let j = 0; j < 2; j++) {
            // j for MAX and ALLOC columns
            for (let k = 0; k < resNum; k++) {
                // k for each resource type
                if (j === 0) {
                    // the name of the form is alloc_processNum_resourceTypeNum
                    table += `<td><input type="text" size="2" name="alloc_${i}_${k}" onkeyup="moveToNextRow()"></td>`;
                } else if (j === 1) {
                    // the name of the form is maxm_processNum_resourceTypeNum
                    table += `<td><input type="text" size="2" name="maxm_${i}_${k}" onkeyup="moveToNextRow()"></td>`;
                }
            }
        }
        table += "</tr>";
    }
    table += "</table>\n\n\n";
    let button = `<button onClick="onCalcClicked()">Calculate</button>`;
    table += button;
    document.getElementById("main-pg").innerHTML = table;
}

// move cursor to the next form field (handling onkeyup event)
function moveToNextRow(given, maxm) {
    // will need some implecmentation of focus() apparently
}

// returns the form to get the data field
function renderAvailable(procNum, resNum) {

}

// send data to server and render the response 
function onCalcClicked() {

}