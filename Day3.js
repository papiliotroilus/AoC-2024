// Input
import * as fs from "node:fs";
let input = fs.readFileSync("Input/Day3.txt", 'utf8')
input = input.trimEnd().split(/\r\n|\n/).toString()

// Solver
let part1sum = 0
let part2sum = 0
let codeActive = true
let operations = input.match(/mul\([0-9]+,[0-9]+\)|do\(\)|don't\(\)/g)
for (let i = 0; i < operations.length; i++) {
    if (operations[i].slice(0,3) === "mul") {
        let numbers = operations[i].match(/[0-9]+/g)
        part1sum += numbers[0] * numbers[1]
        if (codeActive) {
            part2sum += numbers[0] * numbers[1]
        }
    } else codeActive = operations[i].slice(0, 3) === "do("
}


// Output
console.log("The solution to part 1 is", part1sum)
console.log("The solution to part 2 is", part2sum)