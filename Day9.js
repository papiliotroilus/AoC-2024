// Input
import * as fs from "node:fs"
let input = fs.readFileSync("Input/Day9.txt", 'utf8')
input = input.trimEnd().split("").map(Number)

// Solver
// Part 1
let forwardsIndex = 0
let backwardsIndex = input.length + 1
let unpackedIndex = 0
let checksumPart1 = 0
let leftover = 0
while (forwardsIndex < backwardsIndex) {
    // Block at forwards index contains data
    if (forwardsIndex % 2 === 0) {
        for (let i = 0; i < input[forwardsIndex]; i++) {
            let blockNumber = forwardsIndex / 2
            checksumPart1 += unpackedIndex * blockNumber
            unpackedIndex++
        }
        forwardsIndex++
    // Block at forwards index is empty
    } else {
        for (let i = 0; i < input[forwardsIndex]; i++) {
            // Block at backwards index is empty
            if (leftover === 0) {
                backwardsIndex-= 2
                leftover = input[backwardsIndex]
                i--
                continue
            }
            // Block at backwards index contains data
            if (forwardsIndex < backwardsIndex) {
                let blockNumber = backwardsIndex / 2
                checksumPart1 += unpackedIndex * blockNumber
                unpackedIndex++
                leftover--
            // Indices have crossed over
            } else {
                leftover = 0
                break
            }
        }
        forwardsIndex++
    }
}
// Deal with leftovers from unfinished block
for (let i = 0; i < leftover; i++) {
    let blockNumber = backwardsIndex / 2
    checksumPart1 += unpackedIndex * blockNumber
    unpackedIndex++
}

// Part 2
let blockMap = []
let blockCounter = 0
for (let i = 0; i < input.length; i++) {
    let digit = input[i]
    if (i % 2 === 0) {
        blockMap.push([blockCounter, digit])
        blockCounter++
    } else {
        blockMap.push([-1, digit])
    }
}
for (let i = blockMap.length - 1; i > 0; i--) {
    if (blockMap[i][0] !== -1) {
        let movedBlock = [blockMap[i][0], blockMap[i][1]]
        for (let j = 0; j < i; j++) {
            if (blockMap[j][0] === -1 && blockMap[j][1] >= blockMap[i][1]) {
                if (blockMap[j][1] === blockMap[i][1]) {
                    blockMap[j][0] = movedBlock[0]
                } else if (blockMap[j][1] > blockMap[i][1]) {
                    blockMap[j][1] = blockMap[j][1] - movedBlock[1]
                    blockMap.splice(j, 0, movedBlock)
                    i++
                }
                blockMap[i][0] = -1
                break
            }
        }
    }
}
let part2Index = 0
let checksumPart2 = 0
for (let block of blockMap) {
    if (block[0] !== -1) {
        for (let i = 0; i < block[1]; i++) {
            checksumPart2 += part2Index * block[0]
            part2Index++
        }
    } else {
        part2Index += block[1]
    }
}

// Output
console.log("The solution to part 1 is", checksumPart1)
console.log("The solution to part 2 is", checksumPart2)