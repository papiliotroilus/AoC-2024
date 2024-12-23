// Input
import * as fs from "node:fs"
let input = fs.readFileSync("Input/Day17.txt", 'utf8').trimEnd().split(/\r\n\r\n|\n\n/)

// Solver
let registers = input[0].split(/\r\n|\n/)
let registerA = BigInt(registers[0].slice(registers[0].indexOf(':') + 2))
let registerB = BigInt(registers[1].slice(registers[1].indexOf(':') + 2))
let registerC = BigInt(registers[2].slice(registers[2].indexOf(':') + 2))
let program = input[1].slice(input[1].indexOf(' ') + 1).split(',').map(x => parseInt(x))
let programString = program.toString()
function runProgram (A = registerA) {
    let output = []
    for (let i = 0; i < program.length - 1; i = i + 2) {
        let operation = program[i]
        let literalOperand = program[i + 1]
        let comboOperand = BigInt(literalOperand)
        switch (literalOperand) {
            case 4 : comboOperand = A; break
            case 5 : comboOperand = registerB; break
            case 6 : comboOperand = registerC
        }
        switch (operation) {
            case 0 : A = BigInt(A / 2n ** comboOperand); break // adv
            case 1 : registerB = registerB ^ BigInt(literalOperand); break // bxl
            case 2 : registerB = comboOperand % 8n; break // bst
            case 3 : if (A !== 0n) {i = literalOperand - 2} break // jnz
            case 4 : registerB = registerB ^ registerC; break // bxc
            case 5 :
                let outputNumber = comboOperand % 8n
                output.push(outputNumber); break // out
            case 6 : registerB = BigInt(A / 2n ** comboOperand); break // bdv
            case 7 : registerC = BigInt(A / 2n ** comboOperand) // cdv
        }
    }
    return output.toString()
}
let part1solution = runProgram()
function iterate(index, value) {
    for (let iterator = 0; iterator < 10000; iterator++) {
        let testValue = value * 8n * BigInt(Math.sign(index)) + BigInt(iterator)
        let testOutput = runProgram(testValue)
        let controlString = programString.slice(programString.length - index - 1)
        if (testOutput === controlString) {
            if (index < programString.length - 1) {
                let nextLevel = iterate(index + 2, testValue)
                if (nextLevel) {
                    return nextLevel
                }
            } else {
                return testValue
            }
        }
    }
    return undefined
}
let part2solution = iterate(0, 0n)

// Output
console.log("The solution to part 1 is", part1solution)
console.log("The solution to part 2 is", part2solution)