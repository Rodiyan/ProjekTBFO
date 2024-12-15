let bin1, bin2, carry, result, stepIndex, steps;

function startSimulation() {
    bin1 = document.getElementById("input1").value;
    bin2 = document.getElementById("input2").value;

    if (!/^[01]+$/.test(bin1) || !/^[01]+$/.test(bin2)) {
        alert("Masukkan hanya angka biner (0 atau 1).");
        return;
    }

    const maxLength = Math.max(bin1.length, bin2.length);
    bin1 = bin1.padStart(maxLength, "0");
    bin2 = bin2.padStart(maxLength, "0");

    carry = 0;
    result = [];
    stepIndex = 0;
    steps = [];

    for (let i = maxLength - 1; i >= 0; i--) {
        const bit1 = parseInt(bin1[i]);
        const bit2 = parseInt(bin2[i]);
        const sum = bit1 + bit2 + carry;
        const newBit = sum % 2;
        carry = Math.floor(sum / 2);

        steps.push({ index: i, bit1, bit2, carry, newBit });
        result.unshift(newBit);
    }

    if (carry) result.unshift(carry);

    document.getElementById("processTape").innerHTML = "";
    document.getElementById("outputTape").innerHTML = "";
    document.getElementById("nextStep").style.display = "inline-block";
    nextStep();
}

function nextStep() {
    const processTape = document.getElementById("processTape");
    if (stepIndex < steps.length) {
        const { bit1, bit2, carry, newBit } = steps[stepIndex];
        const stepDiv = document.createElement("div");
        stepDiv.className = "step";
        stepDiv.innerHTML = `
            <p><strong>Langkah ${stepIndex + 1}:</strong></p>
            <p>Bit 1: ${bit1}, Bit 2: ${bit2}, Carry: ${carry}</p>
            <p>Hasil sementara: ${newBit} (carry baru: ${carry})</p>
        `;
        processTape.appendChild(stepDiv);
        stepIndex++;
    } else {
        document.getElementById("nextStep").style.display = "none";
        displayFinalResult();
    }
}

function displayFinalResult() {
    const outputTape = document.getElementById("outputTape");
    result.forEach(bit => {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.textContent = bit;
        outputTape.appendChild(cell);
    });
    displayFormula();
    alert("Penambahan selesai! Hasil ditampilkan.");
}

function displayFormula() {
    const formulaDiv = document.getElementById("formula");
    formulaDiv.innerHTML = `
        <p><strong>Langkah perhitungan:</strong></p>
        ${steps.map((step, index) => `
            <p>Langkah ${index + 1}: (${step.bit1} + ${step.bit2} + carry ${step.carry}) 
            &rarr; Hasil bit: ${step.newBit}, Carry: ${step.carry}</p>
        `).join("")}
        <p>Hasil akhir: ${result.join("")}</p>
    `;
}
