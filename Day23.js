// Input
import * as fs from "node:fs"
let input = fs.readFileSync("Input/Day23.txt", 'utf8').trimEnd().split(/\r\n|\n/)
let networkMap = new Map
for (let connection of input) {
    let nodes = connection.split("-")
    if (networkMap.has(nodes[0])) {
        let nodeConnections = networkMap.get(nodes[0])
        nodeConnections.push(nodes[1])
        networkMap.set(nodes[0], nodeConnections)
    } else {
        networkMap.set(nodes[0], [nodes[1]])
    }
    if (networkMap.has(nodes[1])) {
        let nodeConnections = networkMap.get(nodes[1])
        nodeConnections.push(nodes[0])
        networkMap.set(nodes[1], nodeConnections)
    } else {
        networkMap.set(nodes[1], [nodes[0]])
    }
}

// Solver
// Part 1
function findLoopsOf3(node, path) {
    let updatedPath = [...path]
    updatedPath.push(node)
    let nodeConnections = networkMap.get(node)
    if (updatedPath.length === 3) {
        if (nodeConnections.includes(updatedPath[0])) {
            updatedPath.sort()
            loopsOf3.add(updatedPath.toString())
        }
    } else {
        for (let connection of nodeConnections) {
            if (connection !== node) {
                findLoopsOf3(connection, updatedPath)
            }
        }
    }
}
let nodesWithT = []
for (let node of networkMap.keys()) {
    if (node.slice(0, 1) === "t") {
        nodesWithT.push(node)
    }
}
let loopsOf3 = new Set
for (let node of nodesWithT) {
    findLoopsOf3(node, [])
}
let part1solution = loopsOf3.size
// Part 2
let biggestLoop = []
function findSubnetworkAround(node) {
    let connections = networkMap.get(node)
    let subnetwork = [node]
    for (let connection of connections) {
        let connectionConnections = networkMap.get(connection)
        if (subnetwork.every(function(subnetworkNode) {if (connectionConnections.includes(subnetworkNode)) {return true}})) {
            subnetwork.push(connection)
        }
    }
    return subnetwork
}
let biggestSubnetwork = []
for (let node of networkMap.keys()) {
    let subnetwork = findSubnetworkAround(node)
    if (subnetwork.length > biggestSubnetwork.length) {
        biggestSubnetwork = subnetwork
        biggestSubnetwork.sort()
    }
}
let part2solution = biggestSubnetwork.join(',')

// Output
console.log("The solution to part 1 is", part1solution)
console.log("The solution to part 2 is", part2solution)