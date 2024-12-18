// Input
import * as fs from "node:fs"
import Map2D from "./Helpers/Map2D.js"
let input = fs.readFileSync("Input/Day15.txt", 'utf8')
input = input.trimEnd().split(/\r\n\r\n|\n\n/)
let warehouseMap = new Map2D(input[0].split(/\r\n|\n/))
let wideInput = input[0].replaceAll("#", "##")
    .replaceAll(".", "..")
    .replaceAll("O", "[]")
    .replaceAll("@", "@.")
let wideMap = new Map2D(wideInput.split(/\r\n|\n/))
let movements = input[1]

// Solver
function simulate(map) {
    // Function for pushing consecutive boxes in part 1
    function findEnd(boxRow, boxCol, direction) {
        let nextBox = map.neighbour(boxRow, boxCol, direction)
        switch (map.check(nextBox[0], nextBox[1])) {
            case "." : return nextBox
            case "#" : return undefined
            case "O" : return findEnd(nextBox[0], nextBox[1], direction)
        }
    }
    // Function for pushing horizontally in part 2
    function pushHorizontally(boxRow, boxCol, direction, map) {
        let nextBox = map.neighbour(boxRow, boxCol, direction)
        let currentContent = map.check(boxRow, boxCol)
        switch (map.check(nextBox[0], nextBox[1])) {
            case "#" : return false
            case "." :
                map.contents[nextBox[0]][nextBox[1]] = currentContent
                map.contents[boxRow][boxCol] = "."
                return true
            default :
                let nextNextBox = pushHorizontally(nextBox[0], nextBox[1], direction, map)
                if (nextNextBox) {
                    map.contents[nextBox[0]][nextBox[1]] = currentContent
                    map.contents[boxRow][boxCol] = "."
                    return true
                } else {
                    return false
                }
        }
    }
    // Function for pushing vertically in part 2
    function pushVertically(boxRow, boxCol, direction, map) {
        let nextBox = map.neighbour(boxRow, boxCol, direction)
        let newBoxes = new Set()
        let leftHalf = undefined
        let rightHalf = undefined
        switch(map.check(nextBox[0], nextBox[1])) {
            case "#" :
                return undefined
            case "." :
                return newBoxes
            case "[" :
                leftHalf = [nextBox[0], nextBox[1]]
                rightHalf = [nextBox[0], nextBox[1] + 1]
                break
            case "]" :
                leftHalf = [nextBox[0], nextBox[1] - 1]
                rightHalf = [nextBox[0], nextBox[1]]
                break
        }
        let leftBranch = pushVertically(leftHalf[0], leftHalf[1], direction, map)
        let rightBranch = pushVertically(rightHalf[0], rightHalf[1], direction, map)
        if (leftBranch && rightBranch) {
            newBoxes = new Set([leftHalf.toString(), rightHalf.toString(), ...leftBranch, ...rightBranch])
            return newBoxes
        } else {
            return undefined
        }
    }
    let currentPos = map.find("@")
    let direction = undefined
    for (let i = 0; i < movements.length; i++) {
        switch (movements.charAt(i)) {
            case '^' : direction = "N"; break;
            case 'v' : direction = "S"; break;
            case '<' : direction = "W"; break;
            case '>' : direction = "E"; break;
            default: direction = undefined
        }
        if (direction === undefined) {continue}
        let nextTile = map.neighbour(currentPos[0], currentPos[1], direction)
        switch (map.check(nextTile[0], nextTile[1])) {
            case "#" :
                break
            case "." :
                map.contents[nextTile[0]][nextTile[1]] = "@"
                map.contents[currentPos[0]][currentPos[1]] = "."
                currentPos = [nextTile[0], nextTile[1]]
                break
            case "O" :
                let boxEnd = findEnd(nextTile[0], nextTile[1], direction);
                if (boxEnd) {
                    map.contents[nextTile[0]][nextTile[1]] = "@"
                    map.contents[currentPos[0]][currentPos[1]] = "."
                    map.contents[boxEnd[0]][boxEnd[1]] = "O"
                    currentPos = [nextTile[0], nextTile[1]]
                }
                break
            default :
                if (direction === "W" || direction === "E") {
                    if (pushHorizontally(currentPos[0], currentPos[1], direction, map)) {
                        map.contents[nextTile[0]][nextTile[1]] = "@"
                        map.contents[currentPos[0]][currentPos[1]] = "."
                        currentPos = [nextTile[0], nextTile[1]]
                    }
                } else {
                    let pushedBoxes = pushVertically(currentPos[0], currentPos[1], direction, map)
                    if (pushedBoxes) {
                        pushedBoxes = [...new Set(pushedBoxes)].map(x => x.split(",").map(Number))
                        pushedBoxes.push(currentPos)
                        if (direction === "N") {
                            pushedBoxes.sort((a, b) => a[0] - b[0])
                        } else {
                            pushedBoxes.sort((a, b) => b[0] - a[0])
                        }
                        for (let box of pushedBoxes) {
                            let boxContent = map.check(box[0], box[1])
                            let newLocation = map.neighbour(box[0], box[1], direction)
                            map.contents[newLocation[0]][newLocation[1]] = boxContent
                            map.contents[box[0]][box[1]] = "."
                        }
                        currentPos = [nextTile[0], nextTile[1]]
                    }
                }
                break
        }
    }
    let boxValues = 0
    let smallBoxPositions = map.find("O", true)
    let bigBoxPositions = map.find("[", true)
    let boxPositions = smallBoxPositions.concat(bigBoxPositions)
    for (let box of boxPositions) {
        boxValues += box[0] * 100 + box[1]
    }
    return boxValues
}

// Output
console.log("The solution to part 1 is", simulate(warehouseMap))
console.log("The solution to part 2 is", simulate(wideMap))