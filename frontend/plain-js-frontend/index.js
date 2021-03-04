
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
                    table += `<td><input type="text" size="2" id="${i}_${j}_${k}" name="alloc_${i}_${k}" onkeyup="autoMoveToNextField('${i}_${j}_${k}', ${procNum}, ${resNum})"></td>`;
                } else if (j === 1) {
                    // the name of the form is maxm_processNum_resourceTypeNum
                    table += `<td><input type="text" size="2" id="${i}_${j}_${k}" name="maxm_${i}_${k}" onkeyup="autoMoveToNextField('${i}_${j}_${k}', ${procNum}, ${resNum})"></td>`;
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
function autoMoveToNextField(given, procs, resNum) {
    // will need some implementation of focus() apparently
    let split_id = given.split('_'); // first elem -> processNum, second -> j value (max or alloc), third -> resNum value
    let nextProc = split_id[0];
    let nextCol = split_id[1];
    let nextRes = split_id[2];

    if (nextCol == 1) {
        if (nextRes == resNum - 1) {
            // move to first field of the row
            nextCol = 0;
            nextProc++;
            nextRes = 0;
        } else {
            nextRes++;
        }
    } else {
        if (nextRes == resNum - 1) {
            // move to first field of the row
            nextCol = 1;
            nextRes = 0;
        } else {
            nextRes++;
        }
    }

    if (nextProc >= procs) {
        return; // do nothing
    }

    console.log(nextProc + "_" + nextCol + "_" + nextRes);
    document.getElementById(nextProc + "_" + nextCol + "_" + nextRes).focus();
}

// @return the form to get the data field
function renderAvailable(procNum, resNum) {

}

// send data to server and render the response 
function onCalcClicked() {

}