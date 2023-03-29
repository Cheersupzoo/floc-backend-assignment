"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    exampleInput1: function() {
        return exampleInput1;
    },
    exampleInput2: function() {
        return exampleInput2;
    },
    inputGenerator: function() {
        return inputGenerator;
    }
});
var _crypto = require("crypto");
function exampleInput1() {
    var score = [
        [
            10,
            6,
            9,
            1
        ],
        [
            7,
            5,
            11,
            2
        ],
        [
            4,
            8,
            3,
            15
        ]
    ];
    var k = 2;
    return {
        score: score,
        k: k
    };
}
function exampleInput2() {
    var score = [
        [
            3,
            4
        ],
        [
            5,
            6
        ]
    ];
    var k = 0;
    return {
        score: score,
        k: k
    };
}
function inputGenerator(student, exam) {
    var numberTracker = new Set();
    var score = Array.from(Array(student), function() {
        return new Array(exam);
    });
    for(var m = 0; m < student; m++){
        for(var n = 0; n < exam; n++){
            var randomScore = (0, _crypto.randomInt)(1, 106);
            while(numberTracker.has(randomScore)){
                randomScore = (0, _crypto.randomInt)(1, 106);
            }
            numberTracker.add(randomScore);
            score[m][n] = randomScore;
        }
    }
    var k = (0, _crypto.randomInt)(1, exam);
    return {
        score: score,
        k: k
    };
}
