// Input
import * as fs from "node:fs"
import Map2D from "./Helpers/Map2D.js"
let input = fs.readFileSync("Input/Day21.txt", 'utf8').trimEnd().split(/\r\n|\n/)
let numberKeypad = new Map2D(["789","456","123","X0A"])
let directionalKeypad = new Map2D(["X^A","<v>"])

// Solver
let moveNumCache = new Map
let moveDirCache = new Map
function moveNum(start, end) {
    let movements = []
    let horMovements = []
    let verMovements = []
    let startPos = numberKeypad.find(start)
    let endPos = numberKeypad.find(end)
    if (startPos[1] < endPos[1]) {
        for (let i = 0; i < endPos[1] - startPos[1]; i++) {
            horMovements.push(">")
        }
    } else {
        for (let i = 0; i < startPos[1] - endPos[1]; i++) {
            horMovements.push("<")
        }
    }
    if (startPos[0] < endPos[0]) {
        for (let i = 0; i < endPos[0] - startPos[0]; i++) {
            verMovements.push("v")
        }
    } else {
        for (let i = 0; i < startPos[0] - endPos[0]; i++) {
            verMovements.push("^")
        }
    }
    if (verMovements.length === 0 || horMovements.length === 0) { // Case for straight line path
        movements.push([...verMovements, ...horMovements, "A"])
    } else if (startPos[0] === 3 && endPos[1] === 0) { // Case for preventing L path that would cross the gap upwards
        movements.push([...verMovements, ...horMovements, "A"])
    } else if (startPos[1] === 0 && endPos[0] === 3) { // Case for preventing L path that would cross the gap downwards
        movements.push([...horMovements, ...verMovements, "A"])
    } else { // Case for two possible paths
        movements.push([...horMovements, ...verMovements, "A"], [...verMovements, ...horMovements, "A"])
    }
    return movements
}
function moveDir(start, end) {
    let movements = []
    let horMovements = []
    let verMovements = []
    let startPos = directionalKeypad.find(start)
    let endPos = directionalKeypad.find(end)
    if (startPos[1] < endPos[1]) {
        for (let i = 0; i < endPos[1] - startPos[1]; i++) {
            horMovements.push(">")
        }
    } else {
        for (let i = 0; i < startPos[1] - endPos[1]; i++) {
            horMovements.push("<")
        }
    }
    if (startPos[0] < endPos[0]) {
        for (let i = 0; i < endPos[0] - startPos[0]; i++) {
            verMovements.push("v")
        }
    } else {
        for (let i = 0; i < startPos[0] - endPos[0]; i++) {
            verMovements.push("^")
        }
    }
    if (verMovements.length === 0 || horMovements.length === 0) { // Case for straight line path
        movements.push([...verMovements, ...horMovements, "A"])
    } else if (startPos[0] === 0 && endPos[1] === 0) { // Case for preventing L path that would cross the gap downwards
        movements.push([...verMovements, ...horMovements, "A"])
    } else if (startPos[1] === 0 && endPos[0] === 0) { // Case for preventing L path that would cross the gap upwards
        movements.push([...horMovements, ...verMovements, "A"])
    } else { // Case for two possible paths
        movements.push([...horMovements, ...verMovements, "A"], [...verMovements, ...horMovements, "A"])
    }
    return movements
}
function numToDir(code, depth) {
    let codeString = code.split('')
    let previousButton = "A"
    let totalMoves = 0
    for (let codeIndex = 0; codeIndex < codeString.length; codeIndex++) {
        let currentButton = codeString[codeIndex]
        let currentMoves = undefined
        if (moveNumCache.has([previousButton, currentButton].toString())) {
            currentMoves = moveNumCache.get([previousButton, currentButton].toString())
        } else {
            let movementOptions = moveNum(previousButton, currentButton)
            if (movementOptions.length === 1) {
                currentMoves = dirToDir(movementOptions[0], 1, depth)
            } else {
                let firstOption = dirToDir(movementOptions[0], 1, depth)
                let secondOption = dirToDir(movementOptions[1], 1, depth)
                if (firstOption < secondOption) {
                    currentMoves = firstOption
                } else {
                    currentMoves = secondOption
                }
            }
            moveNumCache.set([previousButton, currentButton].toString(), currentMoves)
        }
        totalMoves += currentMoves
        previousButton = currentButton
    }
    return totalMoves
}
function dirToDir(moves, robotNumber, depth) {
    let totalMoves = 0
    let previousButton = "A"
    for (let moveIndex = 0; moveIndex < moves.length; moveIndex++) {
        let currentButton = moves[moveIndex]
        let currentMoves = 0
        if (moveDirCache.has([previousButton, currentButton, robotNumber].toString())) {
            currentMoves = moveDirCache.get([previousButton, currentButton, robotNumber].toString())
        } else {
            let movementOptions = moveDir(previousButton, currentButton)
            if (robotNumber === depth) {
                if (movementOptions.length === 1) {
                    currentMoves = movementOptions[0].length
                } else {
                    let firstOption = movementOptions[0].length
                    let secondOption = movementOptions[1].length
                    if (firstOption < secondOption) {
                        currentMoves = firstOption
                    } else {
                        currentMoves = secondOption
                    }
                }
            } else {
                if (movementOptions.length === 1) {
                    currentMoves = dirToDir(movementOptions[0], robotNumber + 1, depth)
                } else {
                    let firstOption = dirToDir(movementOptions[0], robotNumber + 1, depth)
                    let secondOption = dirToDir(movementOptions[1], robotNumber + 1, depth)
                    if (firstOption < secondOption) {
                        currentMoves = firstOption
                    } else {
                        currentMoves = secondOption
                    }
                }
            }
            moveDirCache.set([previousButton, currentButton, robotNumber].toString(), currentMoves)
        }
        totalMoves += currentMoves
        previousButton = currentButton
    }
    return totalMoves
}

let part1solution = 0
for (let code of input) {
    let numberPart = parseInt(code)
    let sequenceLengthPart1 = numToDir(code, 2)
    let complexityScorePart1 = numberPart * sequenceLengthPart1
    part1solution += complexityScorePart1
}
moveNumCache.clear()
moveDirCache.clear()
let part2solution = 0
for (let code of input) {
    let numberPart = parseInt(code)
    let sequenceLengthPart2 = numToDir(code, 25)
    let complexityScorePart2 = numberPart * sequenceLengthPart2
    part2solution += complexityScorePart2
}

// Output
console.log("The solution to part 1 is", part1solution)
console.log("The solution to part 2 is", part2solution)