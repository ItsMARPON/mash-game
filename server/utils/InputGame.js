const readline = require('readline'); 

const areas = ['Area 1', 'Area 2','Area 3', 'Area 4','Area 5', 'Area 6'];
const optionsPerArea = {};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function getInput(area) {
    return new Promise((resolve) => {
        rl.question(`Enter three options for ${area}:`, (input) => {
            const options = input.trim().split(' ').slice(0, 3);
            resolve(options);
        });
    });
}

async function getUserInput() {
    for (const area of areas) {
        const options = await getInput(area);
        optionsPerArea[area] = options;
    }

    rl.close();
}

function getOptionsPerArea(){
    return optionsPerArea;
}

module.exportss = { getUserInput, getOptionsPerArea };