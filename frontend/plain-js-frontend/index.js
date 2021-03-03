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
    let firstRow = true;
    for (let i = 0; i <= procs; i++) {
        let proc_id = i - 1;
        for (let j = 0; j < 2; j++) {
            // j for MAX and ALLOC columns
            table += "<tr>";
            for (let k = 0; k < resNum; k++) {
                // k for each resource type
                if (firstRow) {
                    if (j === 0) {
                        table += "<td></td>";
                    } else {
                        table += `<td>${alphabets[k]}</td>`
                    }
                } else {
                    if (j === 1) {
                        table += `<td><input type="text" name="" onkeyup="moveToNextRow()"></td>`
                    } else if (j === 2) {

                    }
                }
            }
            table += "</tr>";
        }
        firstRow = false;
    }
}

// move cursor to the next form field (handling onkeyup event)
function moveToNextRow(given, maxm) {
    // will need some implecmentation of focus() apparently
}

// returns the form to get the data field
function renderAvailable(procNum, resNum) {

}