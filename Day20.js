// Input
import * as fs from "node:fs"
import Map2D from "./Helpers/Map2D.js"
let input = fs.readFileSync("Input/Day20.txt", 'utf8')
input = input.trimEnd().split(/\r\n|\n/)
let racetrack = new Map2D(input)
let startTile = racetrack.find("S")
let finishTile = racetrack.find("E")

// Solver
let directions = ["N", "E", "S", "W"]
racetrack.contents[finishTile[0]][finishTile[1]] = "."
racetrack.contents[startTile[0]][startTile[1]] = 0
let currentTile = startTile
let stepCounter = 1
let path = [startTile]
while (currentTile.toString() !== finishTile.toString()) {
    for (let direction of directions) {
        let neighbour = racetrack.neighbour(currentTile[0], currentTile[1], direction)
        if (neighbour && racetrack.check(neighbour[0], neighbour[1]) === ".") {
            path.push(neighbour)
            currentTile = neighbour
            racetrack.contents[currentTile[0]][currentTile[1]] = stepCounter
            stepCounter++
            break
        }
    }
}
function findCheats(maxDistance, minSave) {
    let cheats = 0
    for (let enterTile of path) {
        let pathVer = enterTile[0]
        let pathHor = enterTile[1]
        let enterValue = racetrack.check(enterTile[0], enterTile[1])
        for (let currentDistance = 2; currentDistance <= maxDistance; currentDistance++) {
            for (let verDistance = 0; verDistance <= currentDistance; verDistance++) {
                let horDistance = currentDistance - verDistance
                let possibleExits = []
                let posVerPosHor = [pathVer + verDistance, pathHor + horDistance]
                let negVerNegHor = [pathVer - verDistance, pathHor - horDistance]
                possibleExits.push(posVerPosHor, negVerNegHor)
                if (verDistance > 0 && horDistance > 0) {
                    let negVerPosHor = [pathVer - verDistance, pathHor + horDistance]
                    let posVerNegHor = [pathVer + verDistance, pathHor - horDistance]
                    possibleExits.push(negVerPosHor, posVerNegHor)
                }
                for (let exitTile of possibleExits) {
                    let exitValue = racetrack.check(exitTile[0], exitTile[1])
                    if (exitValue && exitValue !== "#") {
                        if (exitValue - enterValue - currentDistance >= minSave) {
                            cheats++
                        }
                    }
                }
            }
        }
    }
    return cheats
}
let part1solution = findCheats(2, 100)
let part2solution = findCheats(20, 100)

// Output
console.log("The solution to part 1 is", part1solution)
console.log("The solution to part 2 is", part2solution)