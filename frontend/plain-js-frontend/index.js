
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
    table += "</table><br /><br /><br />";
    let button = `<button onClick="onCalcClicked(${procNum}, ${resNum})">Calculate</button>`;
    table += button;

    let toRenderFinal = renderAvailable(procNum, resNum);
    toRenderFinal += table;
    document.getElementById("main-pg").innerHTML = toRenderFinal;
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

// @return the form to get the available data field
function renderAvailable(procNum, resNum) {
    return(
        `<label for="avail">Available values initial (separated by space):</label>
         <input type="text" name="avail" id="avail"><br /><br /><br />`
    )
}

// send data to server and render the response 
function onCalcClicked(procNum, resNum) {
    let allocation = [];
    let maxm = [];
    let available = document.getElementById("avail").value.split(' ');
    available = available.map(x => parseInt(x))

    for (let i = 0; i < procNum; i++) {
        let alloc_sub = [];
        let maxm_sub = [];
        for (let j = 0; j < resNum; j++) {
            let alloc_val = parseInt(document.getElementById(`${i}_0_${j}`).value);
            let maxm_val = parseInt(document.getElementById(`${i}_1_${j}`).value);
            alloc_sub.push(alloc_val);
            maxm_sub.push(maxm_val);
        }
        allocation.push(alloc_sub);
        maxm.push(maxm_sub);
    }

    console.log(allocation);
    console.log(maxm);
    console.log(available);
}