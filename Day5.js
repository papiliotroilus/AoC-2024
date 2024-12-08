// Input
import * as fs from "node:fs";
let input = fs.readFileSync("Input/Day5.txt", 'utf8')
input = input.trimEnd().split(/\r\n\r\n|\n\n/)
let rules = input[0].split(/\r\n|\n/)
let updates = input[1].split(/\r\n|\n/)

// Solver
const ruleMap = new Map()
for (let rule of rules) {
    let currentRule = rule.split("|").map(Number)
    if (ruleMap.has(currentRule[1])) {
        let newValue = ruleMap.get(currentRule[1])
        newValue.push(currentRule[0])
        ruleMap.set(currentRule[1], newValue)
    } else {
        ruleMap.set(currentRule[1], [currentRule[0]])
    }
}
let correctlySorted = 0
let incorrectlySorted = 0
for (let update of updates) {
    let updatePages = update.split(",").map(Number)
    let newOrder = updatePages.map((x)=>x)
    newOrder.sort(function(a, b) {
        if (ruleMap.has(a) && ruleMap.get(a).includes(b)) {
            return 1
        } else if (ruleMap.has(b) && ruleMap.get(b).includes(a)) {
            return -1
        }
    })
    if (newOrder.toString() === updatePages.toString()) {
        correctlySorted += newOrder[(newOrder.length - 1) / 2]
    } else {
        incorrectlySorted += newOrder[(newOrder.length - 1) / 2]
    }
}

// Output
console.log("The solution to part 1 is", correctlySorted)
console.log("The solution to part 2 is", incorrectlySorted)