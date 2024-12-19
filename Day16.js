// Input
import * as fs from "node:fs"
import Map2D from "./Helpers/Map2D.js"
let input = fs.readFileSync("Input/Day16.txt", 'utf8').trimEnd().split(/\r\n|\n/)

// Solver
let mazeMap = new Map2D(input)
let startTile = mazeMap.find("S")
let endTile = mazeMap.find("E")
Map2D.prototype.pathFind = function(source, target) {
    let distanceToSource = new Map()
    let pathToSource = new Map()
    let alternatePaths = new Map()
    let queue = []
    let visited = new Set()
    distanceToSource.set([source, "E"].toString(), 0)
    queue.push([source, "E"])
    while (queue.length > 0) {
        let currentPoint = queue.shift()
        visited.add(currentPoint)
        let currentDistance = distanceToSource.get(currentPoint.toString())
        let neighbours = []
        for (let direction of ["N", "E", "S", "W"]) {
            let neighbourCoords = this.neighbour(currentPoint[0][0], currentPoint[0][1], direction)
            let neighbourContent = this.check(neighbourCoords[0], neighbourCoords[1])
            if (neighbourCoords && neighbourContent !== "#") {
                neighbours.push([neighbourCoords, direction])
            }
        }
        for (let neighbour of neighbours) {
            let neighbourDistance = 1001
            if (currentPoint[1] === neighbour[1]) {
                neighbourDistance = 1
            } else if (["NS", "SN", "EW", "WE"].includes(currentPoint[1].concat(neighbour[1]))) {
                neighbourDistance = 2001
            }
            let newDistance = currentDistance + neighbourDistance
            if (distanceToSource.has(neighbour.toString()) && newDistance === distanceToSource.get(neighbour.toString())) {
                alternatePaths.set(neighbour.toString(), currentPoint.toString())
            }
            if (!distanceToSource.has(neighbour.toString()) || newDistance < distanceToSource.get(neighbour.toString())) {
                pathToSource.set(neighbour.toString(), currentPoint.toString())
                distanceToSource.set(neighbour.toString(), newDistance)
                queue.push(neighbour)
                queue.sort((a, b) => distanceToSource.get(a.toString()) - distanceToSource.get(b.toString()))
            }
            if (neighbour[0].toString() === target.toString()) {
                let trace = []
                let traceForks = [neighbour.toString()]
                while (traceForks.length !== 0) {
                    let traceStep = traceForks.shift()
                    while (traceStep && traceStep !== source.toString()) {
                        if (alternatePaths.has(traceStep)) {
                            traceForks.push(alternatePaths.get(traceStep))
                        }
                        let tracePoint = traceStep.slice(0, traceStep.length - 2)
                        if (!trace.includes(tracePoint)) {
                            trace.push(tracePoint)
                        }
                        traceStep = pathToSource.get(traceStep)
                    }
                }
                return [newDistance, trace.length]
            }
        }
    }
    return -1
}
let output = mazeMap.pathFind(startTile, endTile)

// Output
console.log("The solution to part 1 is", output[0])
console.log("The solution to part 2 is", output[1])