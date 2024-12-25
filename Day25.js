// Input
import * as fs from "node:fs"
import Map2D from "./Helpers/Map2D.js"
let input = fs.readFileSync("Input/Day25.txt", 'utf8').trimEnd().split(/\r\n\r\n|\n\n/).map(x => x.split(/\r\n|\n/))
let locks = []
let keys = []
for (let grid of input) {
    if (grid[0].includes("#")) {
        locks.push(new Map2D(grid))
    } else {
        keys.push(new Map2D(grid))
    }
}

// Solver
function countHeights(grids) {
    let output = []
    for (let grid of grids) {
        let combination = []
        for (let col = 0; col < grid.contents[0].length; col++) {
            let colCount = 0
            for (let row = 0; row < grid.contents.length; row++) {
                if (grid.contents[row][col] === "#") {
                    colCount++
                }
            }
            combination.push(colCount)
        }
        output.push(combination)
    }
    return output
}
let solution = 0
let lockCombinations = countHeights(locks)
let keyCombinations = countHeights(keys)
let maxHeight = locks[0].contents.length
for (let lockCombination of lockCombinations) {
    lockpick:for (let keyCombination of keyCombinations) {
        for (let digit = 0; digit < lockCombination.length; digit++) {
            if (lockCombination[digit] + keyCombination[digit] > maxHeight) {
                continue lockpick
            }
        }
        solution++
    }
}

// Output
console.log("The solution is", solution)