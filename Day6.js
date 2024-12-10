// Input
import Map2D from "./Helpers/Map2D.js"
import * as fs from "node:fs"
let input = fs.readFileSync("Input/Day6.txt", 'utf8')
input = input.trimEnd().split(/\r\n|\n/)

// Solver
const guardMap = new Map2D(input);
const originalGuardPos = guardMap.find("^")[0]
let guardPos = originalGuardPos
let guardOri = "N"
// Patrol method
Map2D.prototype.patrol = function(guardPos, guardOri) {
    let orientations = ["N", "E", "S", "W"]
    let newOri = guardOri
    let newPos = guardPos
    let nextTile = this.check(guardPos[0], guardPos[1], guardOri)
    if (nextTile === undefined) {
        newPos = undefined
    } else if (nextTile === "#") {
        newOri = orientations[(orientations.indexOf(guardOri) + 1) % orientations.length]
    } else {
        switch (guardOri) {
            case "N": newPos = [guardPos[0] - 1, guardPos[1]]; break;
            case "E": newPos = [guardPos[0], guardPos[1] + 1]; break;
            case "S": newPos = [guardPos[0] + 1, guardPos[1]]; break;
            case "W": newPos = [guardPos[0], guardPos[1] - 1]; break
        }
    }
    return [newPos, newOri]
}
// Part 1
const part1path = new Set()
while (guardPos) {
    part1path.add(guardPos.toString())
    let patrolRes = guardMap.patrol(guardPos, guardOri)
    guardPos = patrolRes[0]
    guardOri = patrolRes[1]
}
// Part 2
let loopsFound = 0
for (let tile of part1path) {
    let tileCoords = tile.split(",").map(Number)
    let i = tileCoords[0]
    let j = tileCoords[1]
    if (guardMap.contents[i][j] === ".") {
        let testMap = new Map2D(input)
        testMap.contents[i][j] = "#"
        let guardPos = originalGuardPos
        let guardOri = "N"
        while (guardPos) {
            if (testMap.contents[guardPos[0]][guardPos[1]] === guardOri) {
                loopsFound += 1
                break
            } else if (testMap.contents[guardPos[0]][guardPos[1]] === "." || testMap.contents[guardPos[0]][guardPos[1]] === "^") {
                testMap.contents[guardPos[0]][guardPos[1]] = guardOri
            }
            let patrolRes = testMap.patrol(guardPos, guardOri)
            guardPos = patrolRes[0]
            guardOri = patrolRes[1]
        }
    }
}

// Output
console.log("The solution to part 1 is", part1path.size)
console.log("The solution to part 2 is", loopsFound)