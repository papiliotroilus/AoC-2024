// Input
import * as fs from "node:fs"
import Map2D from "./Helpers/Map2D.js"
let input = fs.readFileSync("Input/Day10.txt", 'utf8')
input = input.trimEnd().split(/\r\n|\n/)

// Solver
let topoMap = new Map2D(input, true);
let trailheads = topoMap.find(0, true)
function walk(row, col, currentHeight, peaks) {
    let newPeaks = peaks.map(i => i)
    if (topoMap.check(row, col) === 9) {
        newPeaks.push([row, col].toString())
    } else {
        if (topoMap.check(row, col, "N") === currentHeight + 1) {
            newPeaks.push(...walk(row - 1, col, currentHeight + 1, peaks))
        }
        if (topoMap.check(row, col, "S") === currentHeight + 1) {
            newPeaks.push(...walk(row + 1, col, currentHeight + 1, peaks))
        }
        if (topoMap.check(row, col, "W") === currentHeight + 1) {
            newPeaks.push(...walk(row, col - 1, currentHeight + 1, peaks))
        }
        if (topoMap.check(row, col, "E") === currentHeight + 1) {
            newPeaks.push(...walk(row, col + 1, currentHeight + 1, peaks))
        }
    }
    return newPeaks
}
let part1score = 0
let part2score = 0
for (let trailhead of trailheads) {
    let peaksReached = walk(trailhead[0], trailhead[1], 0, [])
    part1score += new Set(peaksReached).size
    part2score += peaksReached.length
}

// Output
console.log("The solution to part 1 is", part1score)
console.log("The solution to part 2 is", part2score)