// Input
import * as fs from "node:fs"
let input = fs.readFileSync("Input/Day13.txt", 'utf8')
input = input.trimEnd().split(/\r\n\r\n|\n\n/).map(x => x.split(/\r\n|\n/))

// Solver
let part1total = 0
let part2total = 0
for (let machine of input) {
    let buttonA = machine[0]
    let Ax = Number(buttonA.slice(buttonA.indexOf('X') + 2, buttonA.indexOf(',')))
    let Ay = Number(buttonA.slice(buttonA.indexOf('Y') + 2))
    let buttonB = machine[1]
    let Bx = Number(buttonB.slice(buttonB.indexOf('X') + 2, buttonB.indexOf(',')))
    let By = Number(buttonB.slice(buttonB.indexOf('Y') + 2))
    let prize = machine[2]
    let Px = Number(prize.slice(prize.indexOf('X') + 2, prize.indexOf(',')))
    let Py = Number(prize.slice(prize.indexOf('Y') + 2))
    let buttonApresses = Number(((By/Bx * Px - Py) / (By/Bx * Ax - Ay)).toFixed(2))
    let buttonBpresses = Number(((Px - Ax * buttonApresses) / Bx).toFixed(2))
    if ([buttonApresses, buttonBpresses].every(Number.isInteger)) {
        part1total += buttonApresses * 3 + buttonBpresses
    }
    let Px2 = Px + 10000000000000
    let Py2 = Py + 10000000000000
    let buttonApresses2 = Number(((By/Bx * Px2 - Py2) / (By/Bx * Ax - Ay)).toFixed(2))
    let buttonBpresses2 = Number(((Px2 - Ax * buttonApresses2) / Bx).toFixed(2))
    if ([buttonApresses2, buttonBpresses2].every(Number.isInteger)) {
        part2total += buttonApresses2 * 3 + buttonBpresses2
    }
}

// Output
console.log("The solution to part 1 is", part1total)
console.log("The solution to part 2 is", part2total)