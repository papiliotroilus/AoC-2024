// Input
import * as fs from "node:fs"

let input = fs.readFileSync("Input/Day24.txt", 'utf8').trimEnd().split(/\r\n\r\n|\n\n/)
let wiresHalf = input[0].split(/\r\n|\n/)
let gatesHalf = input[1].split(/\r\n|\n/)
let wireMap = new Map
for (let wire of wiresHalf) {
    let wireParts = wire.split(": ")
    wireMap.set(wireParts[0], Boolean(Number(wireParts[1])))
}
let waitWireToGate = new Map
let waitGateToWire = new Map
class Gate {
    constructor(input1, input2, operation, output) {
        this.input1 = input1
        this.input2 = input2
        this.operation = operation
        this.output = output
    }
    activate() {
        let unavailable = []
        let input1Value = undefined
        let input2Value = undefined
        if (wireMap.has(this.input1)) {
            input1Value = wireMap.get(this.input1)
        } else {
            unavailable.push(this.input1)
        }
        if (wireMap.has(this.input2)) {
            input2Value = wireMap.get(this.input2)
        } else {
            unavailable.push(this.input2)
        }
        if (unavailable.length > 0) {
            waitGateToWire.set(this, unavailable)
            for (let wire of unavailable) {
                if (!waitWireToGate.has(wire)) {
                    waitWireToGate.set(wire, [this])
                } else {
                    let existingGates = waitWireToGate.get(wire)
                    existingGates.push(this)
                    waitWireToGate.set(wire, existingGates)
                }
            }
            return null
        }
        switch (this.operation) {
            case "AND" : return input1Value && input2Value
            case "OR" : return input1Value || input2Value
            case "XOR" : return input1Value !== input2Value
        }
    }
}
let gatesList = []
for (let gate of gatesHalf) {
    let gateParts = gate.split(" -> ")
    let gateDefinition = gateParts[0].split(" ")
    let gateInput1 = gateDefinition[0]
    let gateInput2 = gateDefinition[2]
    let gateOperation = gateDefinition[1]
    gatesList.push(new Gate(gateInput1, gateInput2, gateOperation, gateParts[1]))
}

// Solver
// Part 1
function simulateGates() {
    let queue = [...gatesList]
    while (queue.length > 0) {
        let gate = queue.shift()
        let activationResult = gate.activate()
        if (activationResult !== null) {
            wireMap.set(gate.output, activationResult)
            if (waitWireToGate.has(gate.output)) {
                let waitingGates = waitWireToGate.get(gate.output)
                for (let waitingGate of waitingGates) {
                    let waitingGateWires = waitGateToWire.get(waitingGate)
                    waitingGateWires.splice(gate.output, 1)
                    if (waitingGateWires.length === 0) {
                        waitGateToWire.delete(waitingGate)
                        queue.unshift(waitingGate)
                    } else {
                        waitGateToWire.set(waitingGate, waitingGateWires)
                    }
                }
                waitWireToGate.delete(gate.output)
            }
        }
    }
    let binarySolution = ""
    let output = [...wireMap.entries()].filter(function(wireLabel) {if (wireLabel[0].slice(0,1) === "z") {return true}}).toSorted()
    output.forEach(function(currentWire) { binarySolution = String(Number(currentWire[1])).concat(binarySolution)})
    return parseInt(binarySolution, 2)
}
let part1solution = simulateGates()
// Part 2
let XORinputs = []
let ORinputs = []
for (let gate of gatesList) {
    if (gate.operation === "XOR") {
        XORinputs.push(gate.input1, gate.input2)
    }
    if (gate.operation === "OR") {
        ORinputs.push(gate.input1, gate.input2)
    }
}
let incorrectWires = []
for (let gate of gatesList) {
    if (gate.output !== "z00" && gate.input1.concat(gate.input2) !== "x00y00") {
        if (gate.operation === "XOR") {
            let outputsZ = gate.output.slice(0,1) === "z"
            let inputsXY = [gate.input1.slice(0,1), gate.input2.slice(0,1)].toSorted().join('') === "xy"
            let outputsToXOR = XORinputs.includes(gate.output)
            if (outputsZ === inputsXY) {
                incorrectWires.push(gate.output)
            } else if (inputsXY && !outputsToXOR) {
                incorrectWires.push(gate.output)
            }
        } else if (gate.operation === "AND" && !ORinputs.includes(gate.output)) {
            incorrectWires.push(gate.output)
        } else {
            if (gate.output.slice(0,1) === "z" && gate.output.slice(1) !== "45") {
                incorrectWires.push(gate.output)
            }
        }
    }
}
let part2solution = incorrectWires.toSorted().join(',')

// Output
console.log("The solution to part 1 is", part1solution)
console.log("The solution to part 2 is", part2solution)