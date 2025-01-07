const allBtn = document.querySelectorAll('.btn');
const allDrop = document.querySelectorAll('.dropdown');
const input = document.getElementById('input');
const convert = document.getElementById('convert');
const result = document.querySelector('.result');
const conversionFormulas = {
    Fahrenheit: {
        Fahrenheit: (value) => value,
        Celsius: (value) =>((value - 32)*(5/9)),
        Kelvin: (value) => ((value - 32)*(5/9) + 273.15)
    },
    Celsius: {
        Fahrenheit: (value) => ((value*(9/5)) + 32),
        Celsius: (value) => value,
        Kelvin: (value) => (value + 273.15)
    },
    Kelvin: {
        Fahrenheit: (value) => ((value - 273.15)*(9/5) + 32),
        Celsius: (value) => (value - 273.15),
        Kelvin: (value) => value
    }
}

function formulas(fromUnit, toUnit) {
    return conversionFormulas[fromUnit][toUnit](Number(input.value));
}

function changeName(drop, scale) {
    drop.parentElement.firstElementChild.innerHTML = scale;
    drop.style.display = drop.style.display === 'block' ? 'none' : 'block';
}

document.addEventListener('click', (e) => {
    allBtn.forEach(btn => {
        if([btn, btn.children[0], btn.children[1]].includes(e.target)) {
            const dropdown = btn.children[2];
            btn.children[2].style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        }
    });

    allDrop.forEach(drop => {
        const fahrenheit = drop.children[0];
        const celseus = drop.children[1];
        const kelvin = drop.children[2];
        if([fahrenheit, celseus, kelvin].includes(e.target)) {
            changeName(drop, e.target.innerHTML)
        }
    })

    if(e.target === convert) {
        const fromUnit = allBtn[0].firstElementChild.innerHTML;
        const toUnit = allBtn[1].firstElementChild.innerHTML;
        if(['Fahrenheit', 'Celsius', 'Kelvin'].includes(fromUnit)) {
            if(['Fahrenheit', 'Celsius', 'Kelvin'].includes(toUnit)) {
                const value = formulas(fromUnit, toUnit);
                result.innerHTML = `${input.value} ${fromUnit} is ${parseFloat(value.toFixed(2))} ${toUnit}`;
            }
        }
    }
})