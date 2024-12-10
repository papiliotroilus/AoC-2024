// Input
import * as fs from "node:fs"
let input = fs.readFileSync("Input/Day1.txt", 'utf8')
input = input.trimEnd().split(/ {3}|\n/)

// Solver
// Build lists
const list1 = []
const list2 = []
for (let i = 0; i < input.length; i++) {
    if (i % 2 === 0) {
        list1.push(Number(input[i]))
    } else {
        list2.push(Number(input[i]))
    }
}
list1.sort()
list2.sort()
//Determine total distance and similarity
let totalDistance = 0
const similarityMap = new Map()
let totalSimilarity = 0
for (let i = 0; i < list1.length; i++) {
    let distance = Math.abs(list1[i] - list2[i])
    totalDistance += distance
    if (similarityMap.has(list1[i])) {
        similarityMap.set(list1[i], similarityMap.get(list1[i]) + 1)
    } else {
        similarityMap.set(list1[i],1)
    }
}
for (let j = 0; j < list2.length; j++) {
    if (similarityMap.has(list2[j])) {
        totalSimilarity += list2[j] * similarityMap.get(list2[j])
    }
}

// Output
console.log("The solution to part 1 is",totalDistance)
console.log("The solution to part 2 is",totalSimilarity)