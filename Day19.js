// Input
import * as fs from "node:fs"
let input = fs.readFileSync("Input/Day19.txt", 'utf8').trimEnd().split(/\r\n\r\n|\n\n/)
let towels = input[0].split(", ")
let designs = input[1].split(/\r\n|\n/)

// Solver
let cache = new Map
function splitDesign(string, beforeSplit = [], splitResults = []){
    splitResults.push(beforeSplit.concat(string));
    if (string.length > 1){
        for(let i = 1; i < string.length; i++){
            splitDesign(string.substring(i), beforeSplit.concat(string.substring(0, i)), splitResults)
        }
    }
    return splitResults
}
function checkDesign(design) {
    if (cache.has(design)) {
        return cache.get(design)
    } else {
        let combinationCount = 0
        if (design.length > 1) {
            for (let splitDelimiter = 1; splitDelimiter < design.length; splitDelimiter++) {
                let firstHalf = design.slice(0, splitDelimiter)
                let secondHalf = design.slice(splitDelimiter)
                if (towels.includes(firstHalf)) {
                    let secondHalfCombinations = checkDesign(secondHalf)
                    if (secondHalfCombinations > 0) {
                        combinationCount+= secondHalfCombinations
                    }
                }
            }
        }
        cache.set(design, combinationCount)
        return combinationCount
    }
}
towels.sort((a, b) => a.length - b.length)
for (let towel of towels) {
    let combinationCount = checkDesign(towel)
    cache.set(towel, combinationCount + 1)
}
let part1solution = 0
let part2solution = 0
for (let design of designs) {
    // console.log("checking", design)
    let combinations = checkDesign(design)
    if (combinations > 0) {
        // console.log(design, "is valid with", combinations, "combinations")
        part1solution++
    } else {
        // console.log(design, "is invalid")
    }
    part2solution += combinations
}

// Output
console.log("The solution to part 1 is", part1solution)
console.log("The solution to part 2 is", part2solution)