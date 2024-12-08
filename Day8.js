// Input
import * as fs from "node:fs";
import Map2D from "./Helpers/Map2D.js";
let input = fs.readFileSync("Input/Day8.txt", 'utf8')
input = input.trimEnd().split(/\r\n|\n/)

// Solver
let signalMap = new Map2D(input)
let antennaCoords = new Map()
for (let i = 0; i < signalMap.contents.length; i++) {
    for (let j = 0; j < signalMap.contents[0].length; j++) {
        if (signalMap.contents[i][j] !== ".") {
            if (antennaCoords.has(signalMap.contents[i][j])) {
                let newVal = antennaCoords.get(signalMap.contents[i][j])
                newVal.push([i, j])
                antennaCoords.set(signalMap.contents[i][j], newVal);
            } else {
                antennaCoords.set(signalMap.contents[i][j], [[i, j]])
            }
        }
    }
}
let antinodesPart1 = new Set()
let antinodesPart2 = new Set()
for (let frequency of antennaCoords.keys()) {
    for (let antenna1 of antennaCoords.get(frequency)) {
        for (let antenna2 of antennaCoords.get(frequency).filter(x => x!== antenna1)) {
            let multiplier = 0
            let deltaX = antenna2[0] - antenna1[0]
            let deltaY = antenna2[1] - antenna1[1]
            for (;;) {
                let newAntinode = [antenna2[0] + multiplier * deltaX, antenna2[1] + multiplier * deltaY]
                if (signalMap.check(newAntinode[0], newAntinode[1])) {
                    if (multiplier === 1) {
                        antinodesPart1.add(newAntinode.toString())
                    }
                    antinodesPart2.add(newAntinode.toString())
                } else {
                    break
                }
                multiplier++
            }
        }
    }
}

// Output
console.log("The solution to part 1 is", antinodesPart1.size)
console.log("The solution to part 2 is", antinodesPart2.size)