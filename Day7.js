// Input
import * as fs from "node:fs"
let input = fs.readFileSync("Input/Day7.txt", 'utf8')
input = input.trimEnd().split(/\r\n|\n/)

// Solver
let totalCalibrationPart1 = 0
let totalCalibrationPart2 = 0
for (let line of input) {
    let halves = line.split(": ")
    let testValue = Number(halves[0])
    let numbers = halves[1].split(" ").map(Number)
    let partialValue = numbers[0]
    numbers = numbers.slice(1)
    // Define depth first search function
    function DFS(testValue, partialValue, index, concatOn) {
        if (index === numbers.length - 1) {
            if (concatOn && Number(partialValue.toString() + numbers[index].toString()) === testValue) {
                return true
            }
            return partialValue * numbers[index] === testValue || partialValue + numbers[index] === testValue
        }
        if (partialValue * numbers[index] <= testValue) {
            if (DFS(testValue, partialValue * numbers[index], index + 1, concatOn) === true) {
                return true
            }
        }
        if (partialValue + numbers[index] <= testValue) {
            if (DFS(testValue, partialValue + numbers[index], index + 1, concatOn) === true) {
                return true
            }
        }
        if (concatOn && Number(partialValue.toString() + numbers[index].toString()) <= testValue) {
            if (DFS(testValue, Number(partialValue.toString() + numbers[index].toString()), index + 1, concatOn) === true) {
                return true
            }
        }
        return false
    }
    // Run function for part 1
    if (DFS(testValue, partialValue, 0, false) === true) {
        totalCalibrationPart1 += testValue
        totalCalibrationPart2 += testValue
    } else if (DFS(testValue, partialValue, 0, true) === true) {
        totalCalibrationPart2 += testValue
    }
}

// Output
console.log("The solution to part 1 is", totalCalibrationPart1)
console.log("The solution to part 2 is", totalCalibrationPart2)