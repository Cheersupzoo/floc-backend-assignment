"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
var _input = require("./input");
var _inputValidation = require("./inputValidation");
var _printTable = require("./printTable");
var _sortScore = require("./sortScore");
function main() {
    var _exampleInput1 = (0, _input.exampleInput1)(), score = _exampleInput1.score, k = _exampleInput1.k;
    (0, _inputValidation.inputValidation)(score, k);
    var sortedScore = (0, _sortScore.sortScore)(score, k);
    console.log("Input:");
    (0, _printTable.printTable)(score);
    console.log("k = ", k);
    (0, _printTable.printTable)(sortedScore);
}
main();
