// Edge class
class Edge {
    constructor(row, col, dir) {
        this.row = row;
        this.col = col;
        this.dir = dir;
    }
}
// Function for assembling map of plots and the cells they are composed of
function explore(row, col, type) {
    currentExplored.add(String([row, col]))
    if (!currentExplored.has(String([row - 1, col])) && plotMap.check(row, col, "N") === type) {
        explore(row - 1, col, type)
    }
    if (!currentExplored.has(String([row, col + 1])) && plotMap.check(row, col, "E") === type) {
        explore(row, col + 1, type)
    }
    if (!currentExplored.has(String([row + 1, col])) && plotMap.check(row, col, "S") === type) {
        explore(row + 1, col, type)
    }
    if (!currentExplored.has(String([row, col - 1])) && plotMap.check(row, col, "W") === type) {
        explore(row, col - 1, type)
    }
}

// Input
import * as fs from "node:fs"
import Map2D from "./Helpers/Map2D.js"
let input = fs.readFileSync("Input/Day12.txt", 'utf8')
input = input.trimEnd().split(/\r\n|\n/)

// Solver
let plotMap = new Map2D(input)
let plots = new Map()
let currentExplored = new Set()
let totalExplored = new Set()
// Assemble map
for (let row = 0; row < plotMap.contents.length; row++) {
    for (let col = 0; col < plotMap.contents[row].length; col++) {
        if (!totalExplored.has(String([row, col]))) {
            let type = plotMap.check(row, col)
            explore(row, col, type)
            let typeCounter = 0
            let label = String([type, typeCounter])
            while (plots.has(label)) {
                typeCounter++
                label = String([type, typeCounter])
            }
            plots.set(label, new Set(currentExplored))
            currentExplored.forEach(totalExplored.add, totalExplored)
            currentExplored.clear()
        }
    }
}
let part1solution = 0
let part2solution = 0
// Go through each plot to determine fence prices
for (let plot of plots.keys()) {
    let type = plot.split(",")[0]
    let regions = plots.get(plot)
    let area = regions.size
    let edges = []
    let sides = 0
    // Check neighbours of each cell to find edges of region
    for (let region of regions) {
        let regionCoords = region.split(",")
        let row = Number(regionCoords[0])
        let col = Number(regionCoords[1])
        for (let direction of ["N", "E", "S", "W"]) {
            if (plotMap.check(row, col, direction) !== type) {
                edges.push(new Edge(row, col, direction))
            }
        }
    }
    part1solution += edges.length * area
    // Sort edges and find discontinuities to determine number of sides
    let horizontalEdges = edges.filter(edge => edge.dir === "N" || edge.dir === "S")
    horizontalEdges.sort((a, b) => a.dir.localeCompare(b.dir) || a.row - b.row || a.col - b.col)
    let verticalEdges = edges.filter(edge => edge.dir === "W" || edge.dir === "E")
    verticalEdges.sort((a, b) => a.dir.localeCompare(b.dir) || a.col - b.col || a.row - b.row)
    let previousRow = undefined
    let previousCol = undefined
    let previousDir = undefined
    for (let edge of horizontalEdges) {
        if (previousDir !== edge.dir || previousRow !== edge.row || previousCol !== edge.col - 1) {
            sides++
        }
        previousRow = edge.row
        previousCol = edge.col
        previousDir = edge.dir
    }
    for (let edge of verticalEdges) {
        if (previousDir !== edge.dir || previousCol !== edge.col || previousRow !== edge.row - 1) {
            sides++
        }
        previousRow = edge.row
        previousCol = edge.col
        previousDir = edge.dir
    }
    part2solution += sides * area
}

// Output
console.log("The solution to part 1 is", part1solution)
console.log("The solution to part 2 is", part2solution)