// Input
import * as fs from "node:fs"
let input = fs.readFileSync("Input/Day14.txt", 'utf8')
input = input.trimEnd().split(/\r\n|\n/)
let cols = 101
let rows = 103

// Solver
// Function for simulating position of all robots at given time
function simulateRobots(time) {
    let positions = []
    for (let robotNo = 0; robotNo < input.length; robotNo++) {
        let line = input[robotNo]
        let robotPos = line.slice(line.indexOf("p=") + 2, line.indexOf(' ')).split(',').map(Number)
        let robotVel = line.slice(line.indexOf("v=") + 2).split(',').map(Number)
        let colDelta = robotPos[0] + robotVel[0] * time
        let rowDelta = robotPos[1] + robotVel[1] * time
        let colOffset = 0
        let rowOffset = 0
        if (robotVel[0] < 0) {
            colOffset = Math.floor((-colDelta / cols) + 1)
        }
        if (robotVel[1] < 0) {
            rowOffset = Math.floor((-rowDelta / rows) + 1)
        }
        let finalCol = (colDelta + cols * colOffset) % cols
        let finalRow = (rowDelta + rows * rowOffset) % rows
        positions.push([finalCol, finalRow])
    }
    return positions
}
// Part 1
let quadrants = [0, 0, 0, 0]
let part1position = simulateRobots(100)
for (let position of part1position) {
    if (position[0] < Math.floor(cols / 2) && position[1] < Math.floor(rows / 2)) {
        quadrants[0]++
    } else if (position[0] > Math.floor(cols / 2) && position[1] < Math.floor(rows / 2)) {
        quadrants[1]++
    } else if (position[0] < Math.floor(cols / 2) && position[1] > Math.floor(rows / 2)) {
        quadrants[2]++
    } else if (position[0] > Math.floor(cols / 2) && position[1] > Math.floor(rows / 2)) {
        quadrants[3]++
    }
}
let part1solution = quadrants[0] * quadrants[1] * quadrants[2] * quadrants[3]
// Part 2
let colAlign = undefined
let rowAlign = undefined
let time = 1
let colStandard = undefined
let rowStandard = undefined
// Search for times when either axis reaches unusually low variance, stop when both are found
while (colAlign === undefined || rowAlign === undefined) {
    let currentPositions = simulateRobots(time)
    let population = currentPositions.length
    let colPositions = []
    let rowPositions = []
    let colTotal = 0
    let rowTotal = 0
    for (let position of currentPositions) {
        colPositions.push(position[0])
        colTotal += position[0]
        rowPositions.push(position[1])
        rowTotal += position[1]
    }
    let colDeviation = 0
    for (let colPosition of colPositions) {
        colDeviation += Math.pow(colPosition - colTotal / population, 2)
    }
    let rowDeviation = 0
    for (let rowPosition of rowPositions) {
        rowDeviation += Math.pow(rowPosition - rowTotal / population, 2)
    }
    let colVariance = colDeviation / population
    let rowVariance = rowDeviation / population
    if (colVariance < colStandard / 2) {
        colAlign = time
    } else {
        colStandard = colVariance
    }
    if (rowVariance < rowStandard / 2) {
        rowAlign = time
    } else {
        rowStandard = rowVariance
    }
    time++
}
// Calculated Bezout coefficient of 101 and 103 externally because there's no point writing a calculator for that here
let bezout = 51
// Calculate alignment using the coefficients and Chinese remainder theorem
let part2solution = (colAlign * bezout * rows + rowAlign * bezout * cols) % (rows * cols)

// Output
console.log("The solution to part 1 is", part1solution)
console.log("The solution to part 2 is", part2solution)