// Input
import * as fs from "node:fs";
let input = fs.readFileSync("Input/Day2.txt", 'utf8')
input = input.trimEnd().split(/\r\n|\n/)

// Solver
// Report evaluator
function evaluateReport(report) {
    let direction
    if (report[0] === report[1]) {
        return "FAIL"
    } else if (report[0] < report[1]) {
        direction = "Ascending"
    } else {
        direction = "Descending"
    }
    for (let j = 1; j < report.length; j++) {
        let difference = report[j] - (report[j - 1])
        if ((direction === "Ascending" && difference < 0) || (direction === "Descending" && difference > 0)) {
            return "FAIL"
        }
        if (difference === 0 || Math.abs(difference) < 1 || Math.abs(difference) > 3) {
            return "FAIL"
        }
    }
    return "PASS"
}
let safeReportTotal = 0
let almostSafeReportTotal = 0
for (let i = 0; i < input.length; i++) {
    let currentReport = input[i].split(" ").map(Number)
    // Part 1 solver
    if (evaluateReport(currentReport) === "PASS") {
        safeReportTotal += 1
        almostSafeReportTotal += 1
    // Part 2 solver
    } else {
        for (let j = 0; j < currentReport.length; j++) {
            let newReport = currentReport.toSpliced(j, 1)
            if (evaluateReport(newReport) === "PASS") {
                almostSafeReportTotal += 1
                break
            }
        }
    }
}

// Output
console.log("The solution to part 1 is",safeReportTotal)
console.log("The solution to part 2 is",almostSafeReportTotal)