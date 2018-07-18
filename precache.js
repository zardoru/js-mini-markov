let fs = require("fs");
let ArgumentParser = require('argparse').ArgumentParser;

function generateMarkov(text, order)
{
    var output = {};
    for (var i = 0; i < text.length - order; i++) {
        let slice = text.slice(i, i + order);
        let arr = output[slice];
        if (!arr) {
            output[slice] = [];
            arr = output[slice];
        }

        arr.push(text.charAt(i + order));
    }

    return output;
}

var parser = new ArgumentParser({
    addHelp: true,
    description: "Cache generator for mon zukan"
});

parser.addArgument(
    ["-i", "--input"],
    {
        help: "File to read the text from.",
        required: true
    }
);

parser.addArgument(
    ["-n", "--order"],
    {
        help: "Order of the markov chain",
        required: true,
        defaultValue: 6
    }
);

parser.addArgument(
    ["-o", "--output"],
    {
        help: "Output file for the markov cache",
        required: true,
        defaultValue: "cache.json"
    }
);

var args = parser.parseArgs();

console.log("Reading from the text file...");
var inputText = fs.readFileSync(args["input"], {encoding: "utf-8"});

console.log("Generating the markov chain data...");
var order = parseInt(args["order"]);
var outTable = generateMarkov(inputText, order);

console.log("Writing output...");
fs.writeFileSync(args["output"], JSON.stringify(outTable));

console.log("Done.");