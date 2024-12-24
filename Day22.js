// Input
import * as fs from "node:fs"
let input = fs.readFileSync("Input/Day22.txt", 'utf8').trimEnd().split(/\r\n|\n/).map(Number)

// Solver
function mix(x, y) {
    return Number(BigInt(x) ^ BigInt(y))
}
function prune(x) {
    return x % 16777216
}

function evolve(secretNumber) {
    secretNumber = prune(mix(secretNumber * 64, secretNumber))
    secretNumber = prune(mix(Math.floor(secretNumber / 32), secretNumber))
    secretNumber = prune(mix(secretNumber * 2048, secretNumber))
    return secretNumber
}

let part1solution = 0
let sequenceMap = new Map
for (let startingNumber of input) {
    let secretNumber = startingNumber
    let buffer = []
    let occurrences = new Set
    let previousPrice = Number(secretNumber.toString().slice(-1))

    for (let i = 0; i < 2000; i++) {
        secretNumber = evolve(secretNumber)
        let price = Number(secretNumber.toString().slice(-1))
        let difference = price - previousPrice
        buffer.push(difference)
        if (buffer.length > 4) {
            buffer.shift()
            if (!occurrences.has(buffer.toString())) {
                if (sequenceMap.has(buffer.toString())) {
                    let total = sequenceMap.get(buffer.toString()) + price
                    sequenceMap.set(buffer.toString(), total)
                    occurrences.add(buffer.toString())
                } else {
                    sequenceMap.set(buffer.toString(), price)
                    occurrences.add(buffer.toString())
                }
            }
        }
        previousPrice = price
    }
    part1solution += secretNumber
}
let part2solution = Math.max(...sequenceMap.values())

// Output
console.log("The solution to part 1 is", part1solution)
console.log("The solution to part 2 is", part2solution)