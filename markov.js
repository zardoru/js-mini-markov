var fs = require('fs');
let ArgumentParser = require('argparse').ArgumentParser;

function pickRandomKey(data) 
{
    var keys = Object.keys(data);
    return keys[keys.length * Math.random() << 0];
}

function pickRandomFromArray(arr)
{
    return arr[arr.length * Math.random() << 0];
}

function generate(data, count) {
    var last = pickRandomKey(data);
    var order = last.length;

    for (var i = order; i < count; i++) {
        var slice = last.substr(last.length - order);
        var resultChar = pickRandomFromArray(data[slice]);
        last += (resultChar);
    }

    return last;
}

var parser = new ArgumentParser({
    addHelp: true,
    description: "Generator for markov cache generated with precache.js"
});

parser.addArgument(
    ["-i", "--input"],
    {
        help: "Json file containing markov data",
        required: true
    }
);

parser.addArgument(
    ["-c", "--count"],
    {
        help: "Amount of characters to generate",
        required: true
    }
);

var args = parser.parseArgs();
console.log("Loading...");
var textdata = fs.readFileSync(args["input"], {encoding: "utf-8"});
var data = JSON.parse(textdata);
var count = parseInt(args["count"]);
console.log("Result: ");
console.log("==================================");
console.log(generate(data, count));