// Input
import Map2D from "./Helpers/Map2D.js";
import * as fs from "node:fs";
let input = fs.readFileSync("Input/Day4.txt", 'utf8')
input = input.split(/\r\n|\n/)
input.pop()

// Solver

const wordSearch = new Map2D(input)
let XMASoccurences = 0
let X_MASoccurrences = 0
for (let currentRow = 0; currentRow < input.length; currentRow += 1) {
    for (let currentCol = 0; currentCol < input[0].length; currentCol += 1) {
        if (wordSearch.contents[currentRow][currentCol] === "X") {
            // Seek North
            if (wordSearch.checkNorth(currentRow, currentCol) === "M") {
                if (wordSearch.checkNorth(currentRow - 1, currentCol) === "A") {
                    if (wordSearch.checkNorth(currentRow - 2, currentCol) === "S") {
                        XMASoccurences += 1
                    }
                }
            }
            // Seek South
            if (wordSearch.checkSouth(currentRow, currentCol) === "M") {
                if (wordSearch.checkSouth(currentRow + 1, currentCol) === "A") {
                    if (wordSearch.checkSouth(currentRow + 2, currentCol) === "S") {
                        XMASoccurences += 1
                    }
                }
            }
            // Seek West
            if (wordSearch.checkWest(currentRow, currentCol) === "M") {
                if (wordSearch.checkWest(currentRow, currentCol - 1) === "A") {
                    if (wordSearch.checkWest(currentRow, currentCol - 2) === "S") {
                        XMASoccurences += 1
                    }
                }
            }
            // Seek East
            if (wordSearch.checkEast(currentRow, currentCol) === "M") {
                if (wordSearch.checkEast(currentRow, currentCol + 1) === "A") {
                    if (wordSearch.checkEast(currentRow, currentCol + 2) === "S") {
                        XMASoccurences += 1
                    }
                }
            }
            // Seek North-West
            if (wordSearch.checkNorthWest(currentRow, currentCol) === "M") {
                if (wordSearch.checkNorthWest(currentRow - 1, currentCol - 1) === "A") {
                    if (wordSearch.checkNorthWest(currentRow - 2, currentCol - 2) === "S") {
                        XMASoccurences += 1
                    }
                }
            }
            // Seek North-East
            if (wordSearch.checkNorthEast(currentRow, currentCol) === "M") {
                if (wordSearch.checkNorthEast(currentRow - 1, currentCol + 1) === "A") {
                    if (wordSearch.checkNorthEast(currentRow - 2, currentCol + 2) === "S") {
                        XMASoccurences += 1
                    }
                }
            }
            // Seek South-West
            if (wordSearch.checkSouthWest(currentRow, currentCol) === "M") {
                if (wordSearch.checkSouthWest(currentRow + 1, currentCol - 1) === "A") {
                    if (wordSearch.checkSouthWest(currentRow + 2, currentCol - 2) === "S") {
                        XMASoccurences += 1
                    }
                }
            }
            // Seek South-East
            if (wordSearch.checkSouthEast(currentRow, currentCol) === "M") {
                if (wordSearch.checkSouthEast(currentRow + 1, currentCol + 1) === "A") {
                    if (wordSearch.checkSouthEast(currentRow + 2, currentCol + 2) === "S") {
                        XMASoccurences += 1
                    }
                }
            }
        } else if (wordSearch.contents[currentRow][currentCol] === "A") {
            let northWest = wordSearch.checkNorthWest(currentRow, currentCol)
            let northEast = wordSearch.checkNorthEast(currentRow, currentCol)
            let southWest = wordSearch.checkSouthWest(currentRow, currentCol)
            let southEast = wordSearch.checkSouthEast(currentRow, currentCol)
            if ((northWest === "M" && southEast === "S") || (northWest === "S" && southEast === "M")) {
                if ((northEast === "M" && southWest === "S") || (northEast === "S" && southWest === "M")) {
                    X_MASoccurrences += 1
                }
            }
        }
    }
}

// Output
console.log("The solution to part 1 is ", XMASoccurences)
console.log("The solution to part 2 is ", X_MASoccurrences)