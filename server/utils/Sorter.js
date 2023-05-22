function processInput(optionsPerArea) {
    const results = {};
    for (const area in optionsPerArea) {
        const options = optionsPerArea[area];
        const sortedOptions = options.slice().sort();
        const selectedOption = sortedOptions[0];
        results[area] = {
            options: sortedOptions,
            selectedOption
        };
    };
    return results;
}

module.ecports = { processInput }; 