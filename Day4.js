// Input
import Map2D from "./Helpers/Map2D.js";
import * as fs from "node:fs";
let input = fs.readFileSync("Input/Day4.txt", 'utf8')
input = input.trimEnd().split(/\r\n|\n/)

// Solver

const wordSearch = new Map2D(input)
let XMASoccurences = 0
let X_MASoccurrences = 0
for (let currentRow = 0; currentRow < input.length; currentRow += 1) {
    for (let currentCol = 0; currentCol < input[0].length; currentCol += 1) {
        if (wordSearch.contents[currentRow][currentCol] === "X") {
            // Seek North
            if (wordSearch.check(currentRow, currentCol, "N") === "M") {
                if (wordSearch.check(currentRow - 1, currentCol, "N") === "A") {
                    if (wordSearch.check(currentRow - 2, currentCol, "N") === "S") {
                        XMASoccurences += 1
                    }
                }
            }
            // Seek South
            if (wordSearch.check(currentRow, currentCol, "S") === "M") {
                if (wordSearch.check(currentRow + 1, currentCol, "S") === "A") {
                    if (wordSearch.check(currentRow + 2, currentCol, "S") === "S") {
                        XMASoccurences += 1
                    }
                }
            }
            // Seek West
            if (wordSearch.check(currentRow, currentCol, "W") === "M") {
                if (wordSearch.check(currentRow, currentCol - 1, "W") === "A") {
                    if (wordSearch.check(currentRow, currentCol - 2, "W") === "S") {
                        XMASoccurences += 1
                    }
                }
            }
            // Seek East
            if (wordSearch.check(currentRow, currentCol, "E") === "M") {
                if (wordSearch.check(currentRow, currentCol + 1, "E") === "A") {
                    if (wordSearch.check(currentRow, currentCol + 2, "E") === "S") {
                        XMASoccurences += 1
                    }
                }
            }
            // Seek North-West
            if (wordSearch.check(currentRow, currentCol, "NW") === "M") {
                if (wordSearch.check(currentRow - 1, currentCol - 1, "NW") === "A") {
                    if (wordSearch.check(currentRow - 2, currentCol - 2, "NW") === "S") {
                        XMASoccurences += 1
                    }
                }
            }
            // Seek North-East
            if (wordSearch.check(currentRow, currentCol, "NE") === "M") {
                if (wordSearch.check(currentRow - 1, currentCol + 1, "NE") === "A") {
                    if (wordSearch.check(currentRow - 2, currentCol + 2, "NE") === "S") {
                        XMASoccurences += 1
                    }
                }
            }
            // Seek South-West
            if (wordSearch.check(currentRow, currentCol, "SW") === "M") {
                if (wordSearch.check(currentRow + 1, currentCol - 1, "SW") === "A") {
                    if (wordSearch.check(currentRow + 2, currentCol - 2, "SW") === "S") {
                        XMASoccurences += 1
                    }
                }
            }
            // Seek South-East
            if (wordSearch.check(currentRow, currentCol, "SE") === "M") {
                if (wordSearch.check(currentRow + 1, currentCol + 1, "SE") === "A") {
                    if (wordSearch.check(currentRow + 2, currentCol + 2, "SE") === "S") {
                        XMASoccurences += 1
                    }
                }
            }
        } else if (wordSearch.contents[currentRow][currentCol] === "A") {
            let northWest = wordSearch.check(currentRow, currentCol, "NW")
            let northEast = wordSearch.check(currentRow, currentCol, "NE")
            let southWest = wordSearch.check(currentRow, currentCol, "SW")
            let southEast = wordSearch.check(currentRow, currentCol, "SE")
            if ((northWest === "M" && southEast === "S") || (northWest === "S" && southEast === "M")) {
                if ((northEast === "M" && southWest === "S") || (northEast === "S" && southWest === "M")) {
                    X_MASoccurrences += 1
                }
            }
        }
    }
}

// Output
console.log("The solution to part 1 is", XMASoccurences)
console.log("The solution to part 2 is", X_MASoccurrences)