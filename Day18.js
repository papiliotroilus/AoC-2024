// Input
import * as fs from "node:fs"
import Map2D from "./Helpers/Map2D.js"
let input = fs.readFileSync("Input/Day18.txt", 'utf8')
input = input.trimEnd().split(/\r\n|\n/)
let gridSize = 70
let memorySpace = new Map2D(gridSize)
let startTile = [0, 0]
let finishTile = [gridSize, gridSize]

// Solver
for (let byteNumber = 0; byteNumber < 1024; byteNumber++) {
    let byte = input[byteNumber].split(",").map(Number)
    memorySpace.contents[byte[1]][byte[0]] = "#"
}
function bfs(start, finish) {
    let queue = []
    let nextStep = [start]
    let stepCounter = 0
    let visited = new Set(start.toString())
    while (nextStep.length + queue.length > 0) {
        while (nextStep.length > 0) {
            let currentTile = nextStep.shift()
            if (currentTile.toString() === finish.toString()) {
                return stepCounter
            }
            for (let direction of ["N", "E", "S", "W"]) {
                let neighbour = memorySpace.neighbour(currentTile[0], currentTile[1], direction)
                if (neighbour && memorySpace.check(neighbour[0], neighbour[1]) !== "#" && !visited.has(neighbour.toString())) {
                    queue.push(neighbour)
                    visited.add(neighbour.toString())
                    // memorySpace.contents[neighbour[0]][neighbour[1]] = "O"
                }
            }
        }
        nextStep = [...queue]
        queue = []
        stepCounter++
        // console.log(stepCounter)
        // memorySpace.print()
    }
    return undefined
}
let part1solution = bfs(startTile, finishTile)
let part2solution = undefined
for (let byteNumber = 1024; byteNumber < input.length; byteNumber++) {
    let byte = input[byteNumber]
    let byteCoords = byte.split(",").map(Number)
    memorySpace.contents[byteCoords[1]][byteCoords[0]] = "#"
    let solution = bfs(startTile, finishTile)
    if (!solution) {
        part2solution = byte
        break
    }
}

// Output
console.log("The solution to part 1 is", part1solution)
console.log("The solution to part 2 is", part2solution)