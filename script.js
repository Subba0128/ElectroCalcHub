$(document).ready(function() {
    $('.calculator-link').click(function(event) {
        event.preventDefault();
        const target = $(this).attr('href');
        $('.calculator-section').hide();
        $(target).show();
        $('html, body').animate({
            scrollTop: $(target).offset().top
        }, 1000); 
    });
});

function calculateOhmsLaw() {
    const voltage = parseFloat(document.getElementById('ohms-voltage').value);
    const current = parseFloat(document.getElementById('ohms-current').value);
    const resistance = parseFloat(document.getElementById('ohms-resistance').value);
    let result = '';

    if (isNaN(voltage)) {
        if (!isNaN(current) && !isNaN(resistance)) {
            result = `Voltage (V) = ${current * resistance} V`;
        } else {
            result = 'Please enter at least two values.';
        }
    } else if (isNaN(current)) {
        if (!isNaN(voltage) && !isNaN(resistance)) {
            result = `Current (I) = ${voltage / resistance} A`;
        } else {
            result = 'Please enter at least two values.';
        }
    } else if (isNaN(resistance)) {
        if (!isNaN(voltage) && !isNaN(current)) {
            result = `Resistance (R) = ${voltage / current} Ω`;
        } else {
            result = 'Please enter at least two values.';
        }
    } else {
        result = 'Please leave one field blank to calculate its value.';
    }

    document.getElementById('ohms-law-result').innerText = result;
}

function calculatePower() {
    const voltage = parseFloat(document.getElementById('power-voltage').value);
    const current = parseFloat(document.getElementById('power-current').value);
    const result = `Power (P) = ${voltage * current} W`;

    document.getElementById('power-result').innerText = result;
}

function calculateVoltageDivider() {
    const vin = parseFloat(document.getElementById('divider-voltage').value);
    const r1 = parseFloat(document.getElementById('resistor1').value);
    const r2 = parseFloat(document.getElementById('resistor2').value);
    const vout = (vin * r2) / (r1 + r2);
    const result = `Output Voltage (V_out) = ${vout} V`;

    document.getElementById('voltage-divider-result').innerText = result;
}

function calculateInductorEnergy() {
    const current = parseFloat(document.getElementById('inductor-current').value);
    const inductance = parseFloat(document.getElementById('inductor-inductance').value);
    const energy = 0.5 * inductance * Math.pow(current, 2);
    const result = `Energy (E) = ${energy} J`;

    document.getElementById('inductor-energy-result').innerText = result;
}

function calculateCapacitorCharge() {
    const vmax = parseFloat(document.getElementById('capacitor-voltage').value);
    const time = parseFloat(document.getElementById('capacitor-time').value);
    const capacitance = parseFloat(document.getElementById('capacitor-capacitance').value);
    const resistance = parseFloat(document.getElementById('capacitor-resistance').value);
    const action = document.querySelector('input[name="cap-action"]:checked').value;
    let vout;

    if (action === 'charging') {
        vout = vmax * (1 - Math.exp(-time / (resistance * capacitance)));
    } else {
        vout = vmax * Math.exp(-time / (resistance * capacitance));
    }

    const result = `Output Voltage (V_out) = ${vout.toFixed(2)} V`;
    document.getElementById('capacitor-charge-result').innerText = result;
}

function calculateRCTimeConstant() {
    const resistance = parseFloat(document.getElementById('rc-resistance').value);
    const capacitance = parseFloat(document.getElementById('rc-capacitance').value);
    const timeConstant = resistance * capacitance;
    const result = `Time Constant (τ) = ${timeConstant} seconds`;

    document.getElementById('rc-time-constant-result').innerText = result;
}

function calculateTransformer() {
    const v1 = parseFloat(document.getElementById('primary-voltage').value);
    const v2 = parseFloat(document.getElementById('secondary-voltage').value);
    const n1 = parseFloat(document.getElementById('primary-turns').value);
    const n2 = parseFloat(document.getElementById('secondary-turns').value);
    let result = '';

    if (!isNaN(v1) && !isNaN(n1) && !isNaN(n2)) {
        result = `Secondary Voltage (V2) = ${(v1 * n2) / n1} V`;
    } else if (!isNaN(v2) && !isNaN(n1) && !isNaN(n2)) {
        result = `Primary Voltage (V1) = ${(v2 * n1) / n2} V`;
    } else if (!isNaN(v1) && !isNaN(v2) && !isNaN(n1)) {
        result = `Secondary Turns (N2) = ${(v2 * n1) / v1}`;
    } else if (!isNaN(v1) && !isNaN(v2) && !isNaN(n2)) {
        result = `Primary Turns (N1) = ${(v1 * n2) / v2}`;
    } else {
        result = 'Please enter three values to calculate the fourth.';
    }

    document.getElementById('transformer-result').innerText = result;
}

function calculateOpAmp() {
    const vin = parseFloat(document.getElementById('op-amp-input-voltage').value);
    const rf = parseFloat(document.getElementById('op-amp-feedback-resistor').value);
    const rin = parseFloat(document.getElementById('op-amp-input-resistor').value);
    const type = document.querySelector('input[name="op-amp-type"]:checked').value;
    let vout;

    if (type === 'inverting') {
        vout = -(rf / rin) * vin;
    } else {
        vout = (1 + (rf / rin)) * vin;
    }

    const result = `Output Voltage (V_out) = ${vout.toFixed(2)} V`;
    document.getElementById('op-amp-result').innerText = result;
}

function calculateRLC() {
    const resistance = parseFloat(document.getElementById('rlc-resistance').value);
    const inductance = parseFloat(document.getElementById('rlc-inductance').value);
    const capacitance = parseFloat(document.getElementById('rlc-capacitance').value);
    const frequency = parseFloat(document.getElementById('rlc-frequency').value);

    if (isNaN(resistance) || isNaN(inductance) || isNaN(capacitance) || isNaN(frequency)) {
        document.getElementById('rlc-result').innerText = 'Please enter all values.';
        return;
    }

    const angularFrequency = 2 * Math.PI * frequency;
    const inductiveReactance = angularFrequency * inductance;
    const capacitiveReactance = 1 / (angularFrequency * capacitance);
    const impedance = Math.sqrt(Math.pow(resistance, 2) + Math.pow((inductiveReactance - capacitiveReactance), 2));
    
    const result = `
        Inductive Reactance (X_L): ${inductiveReactance.toFixed(2)} ohms<br>
        Capacitive Reactance (X_C): ${capacitiveReactance.toFixed(2)} ohms<br>
        Impedance (Z): ${impedance.toFixed(2)} ohms
    `;

    document.getElementById('rlc-result').innerHTML = result;
}
function calculateResistance() {
    var band1 = parseInt($('#band1').val());
    var band2 = parseInt($('#band2').val());
    var multiplier = parseFloat($('#band3').val());
    var tolerance = parseFloat($('#tolerance').val());

    var resistanceValue = ((band1 * 10) + band2) * multiplier;
    var result = 'Resistance: ' + resistanceValue + ' Ω ± ' + tolerance + '%';
    $('#resistor-code-result').text(result);
}
function calculateComplexImpedance() {
    var resistance = parseFloat($('#impedance-resistance').val());
    var reactance = parseFloat($('#impedance-reactance').val());
    var result = '';

    if (!isNaN(resistance) && !isNaN(reactance)) {
        var impedance = Math.sqrt(Math.pow(resistance, 2) + Math.pow(reactance, 2));
        var phase = Math.atan(reactance / resistance) * (180 / Math.PI);
        result = 'Impedance (Z) = ' + impedance.toFixed(2) + ' Ω, Phase Angle = ' + phase.toFixed(2) + '°';
    } else {
        result = 'Please enter both resistance and reactance values.';
    }

    $('#complex-impedance-result').text(result);
}
function calculateThreePhasePower() {
    var voltage = parseFloat($('#three-phase-voltage').val());
    var current = parseFloat($('#three-phase-current').val());
    var powerFactor = parseFloat($('#power-factor').val());
    var result = '';

    if (!isNaN(voltage) && !isNaN(current) && !isNaN(powerFactor)) {
        var power = voltage * current * Math.sqrt(3) * powerFactor;
        result = 'Three-Phase Power (P) = ' + power.toFixed(2) + ' W';
    } else {
        result = 'Please enter voltage, current, and power factor values.';
    }

    $('#three-phase-power-result').text(result);
}
function calculateFilterDesign() {
    var resistance = parseFloat($('#filter-resistance').val());
    var capacitance = parseFloat($('#filter-capacitance').val());
    var result = '';

    if (!isNaN(resistance) && !isNaN(capacitance)) {
        var cutoffFrequency = 1 / (2 * Math.PI * resistance * capacitance);
        result = 'Cutoff Frequency (f_c) = ' + cutoffFrequency.toFixed(5) + ' Hz';
    } else {
        result = 'Please enter resistance and capacitance values.';
    }

    $('#filter-design-result').text(result);
}
function calculateDecibel() {
    var calcType = $('#calc-type').val();
    var inputValue = parseFloat($('#input-value').val());
    var outputValue = parseFloat($('#output-value').val());
    var result = '';

    if (!isNaN(inputValue) && !isNaN(outputValue)) {
        var decibels;
        if (calcType === 'power') {
            decibels = 10 * Math.log10(outputValue / inputValue);
            result = 'Power Gain (dB) = ' + decibels.toFixed(2) + ' dB';
        } else if (calcType === 'voltage') {
            decibels = 20 * Math.log10(outputValue / inputValue);
            result = 'Voltage Gain (dB) = ' + decibels.toFixed(2) + ' dB';
        }
    } else {
        result = 'Please enter valid input and output values.';
    }

    $('#decibel-result').text(result);
}
function calculateLEDResistor() {
    const ledVoltage = parseFloat(document.getElementById('led-voltage').value);
    const ledCurrent = parseFloat(document.getElementById('led-current').value);
    const supplyVoltage = parseFloat(document.getElementById('supply-voltage').value);
    let resistorValue;

    if (!isNaN(ledVoltage) && !isNaN(ledCurrent) && !isNaN(supplyVoltage)) {
        resistorValue = (supplyVoltage - ledVoltage) / (ledCurrent / 1000);
        document.getElementById('led-resistor-result').innerText = `Resistor Value (Ω) = ${resistorValue.toFixed(2)}`;
    } else {
        document.getElementById('led-resistor-result').innerText = 'Please enter valid values.';
    }
}
