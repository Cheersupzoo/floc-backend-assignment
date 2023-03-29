"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "inputValidation", {
    enumerable: true,
    get: function() {
        return inputValidation;
    }
});
function inputValidation(score, k) {
    var m = score.length;
    if (!(1 <= m && m <= 250)) throw Error("m is out of range \x1b[33m1 <= m, n <= 250\x1b[0m");
    var n = score[0].length;
    if (!(1 <= n && n <= 250)) throw Error("n is out of range \x1b[33m1 <= m, n <= 250\x1b[0m");
    score.map(function(exams, sIndex) {
        return exams.map(function(exam, eIndex) {
            if (!(1 <= exam && exam <= 105)) throw Error("exam score[".concat(sIndex, "][").concat(eIndex, "] is out of range \x1b[33m1 <= score[i][j] <= 105\x1b[0m"));
        });
    });
}
