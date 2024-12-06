// Input
import Map2D from "./Helpers/Map2D.js";
import * as fs from "node:fs";
let input = fs.readFileSync("Input/Day6.txt", 'utf8')
input = input.split(/\r\n|\n/)
input.pop()

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
    if (nextTile === "." || nextTile === "^") {
        switch (guardOri) {
            case "N": newPos = [guardPos[0] - 1, guardPos[1]]; break;
            case "E": newPos = [guardPos[0], guardPos[1] + 1]; break;
            case "S": newPos = [guardPos[0] + 1, guardPos[1]]; break;
            case "W": newPos = [guardPos[0], guardPos[1] - 1]; break
        }
    } else if (nextTile === "#") {
        newOri = orientations[(orientations.indexOf(guardOri) + 1) % orientations.length]
    } else {
        newPos = undefined
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
        guardMap.contents[i][j] = "#"
        let guardPos = originalGuardPos
        let guardOri = "N"
        const part2path = new Set()
        let initialSize = 0
        while (guardPos) {
            part2path.add(guardPos.toString().concat(" ", guardOri.toString()))
            let patrolRes = guardMap.patrol(guardPos, guardOri)
            guardPos = patrolRes[0]
            guardOri = patrolRes[1]
            let newSize = part2path.size
            if (initialSize === newSize) {
                loopsFound += 1
                guardPos = undefined
            }
            initialSize = part2path.size
        }
        guardMap.contents[i][j] = "."
    }
}


// Output
console.log("The solution to part 1 is ", part1path.size)
console.log("The solution to part 2 is ", loopsFound)