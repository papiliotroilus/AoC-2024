// Input
import * as fs from "node:fs"
let input = fs.readFileSync("Input/Day11.txt", 'utf8')
input = input.trimEnd().split(" ").map(Number)

// Solver
let stoneMap = new Map()
for (let stone of input) {
    if (stoneMap.has(stone)) {
        stoneMap.set(stone, stoneMap.get(stone) + 1)
    } else {
        stoneMap.set(stone, 1)
    }
}
let part1Count = 0
for (let blinks = 1; blinks < 76; blinks++) {
    let updateMap = new Map()
    if (stoneMap.has(0)) {
        updateMap.set(1, stoneMap.get(0))
        updateMap.set(0, 0)
    }
    stoneMap.delete(0)
    for (let number of stoneMap.keys()) {
        let numberString = number.toString()
        if (numberString.length % 2 === 0) {
            let leftHalf = numberString.slice(0, numberString.length / 2)
            let rightHalf = numberString.slice(numberString.length / 2)
            for (let half of [leftHalf, rightHalf]) {
                let halfNumber = Number(half)
                if (updateMap.has(halfNumber)) {
                    updateMap.set(halfNumber, updateMap.get(halfNumber) + stoneMap.get(number))
                } else {
                    updateMap.set(halfNumber, stoneMap.get(number))
                }
            }
        } else {
            if (updateMap.has(number * 2024)) {
                updateMap.set(number * 2024, updateMap.get(number * 2024) + stoneMap.get(number))
            } else {
                updateMap.set(number * 2024, stoneMap.get(number))
            }
        }
    }
    stoneMap = updateMap
    if (blinks === 25) {
        for (let number of stoneMap.keys()) {
            part1Count += stoneMap.get(number)
        }
    }
}
let part2Count = 0
for (let number of stoneMap.keys()) {
    part2Count += stoneMap.get(number)
}

// Output
console.log("The solution to part 1 is", part1Count)
console.log("The solution to part 2 is", part2Count)