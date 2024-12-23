// Converter
class Map2D {
    // Constructor
    constructor(input, numbers = false) {
        this.contents = []
        if (typeof input === "number") {
            for (let row = 0; row <= input; row++) {
                let emptyRow = []
                for (let col = 0; col <= input; col++) {
                    emptyRow.push(".")
                }
                this.contents.push(emptyRow)
            }
        } else {
            for (let i = 0; i < input.length; i++) {
                if (numbers) {
                    this.contents.push(input[i].split("").map(Number))
                } else {
                    this.contents.push(input[i].split(""))
                }
            }
        }
    }

    // Printer
    print() {
        for (let row of this.contents) {
            console.log(row.join(""))
        }
    }

    // Find
    find(target, all = false) {
        let hits = []
        for (let i = 0; i < this.contents.length; i++) {
            for (let j = 0; j < this.contents[i].length; j++) {
                if (this.contents[i][j] === target) {
                    if (!all) {
                        return [i, j]
                    }
                    hits.push([i, j])
                }
            }
        }
        return hits
    }

    // Check
    check(row, col, neighbour = "X") {
        if (neighbour === "X" && row >= 0 && row < this.contents.length && col >= 0 && col < this.contents[row].length) {
            return this.contents[row][col]
        } else if (neighbour === "N" && row !== 0)  {
            return this.contents[row - 1][col]
        } else if (neighbour === "S" && row !== this.contents.length - 1)  {
            return this.contents[row + 1][col]
        } else if (neighbour === "W" && col !== 0)  {
            return this.contents[row][col - 1]
        } else if (neighbour === "E" && col !== this.contents.length - 1)  {
            return this.contents[row][col + 1]
        } else if (neighbour === "NW" && row !== 0 && col !== 0) {
            return this.contents[row - 1][col - 1]
        } else if (neighbour === "NE" && row !== 0 && col !== this.contents[0].length - 1) {
            return this.contents[row - 1][col + 1]
        } else if (neighbour === "SW" && row !== this.contents.length - 1 && col !== 0) {
            return this.contents[row + 1][col - 1]
        } else if (neighbour === "SE" && row !== this.contents.length - 1 && col !== this.contents[0].length - 1) {
            return this.contents[row + 1][col + 1]
        }
    }

    // Get neighbour coordinates
    neighbour(row, col, neighbour) {
        if (neighbour === "N" && row !== 0)  {
            return [row - 1, col]
        } else if (neighbour === "S" && row !== this.contents.length - 1)  {
            return [row + 1, col]
        } else if (neighbour === "W" && col !== 0)  {
            return [row, col - 1]
        } else if (neighbour === "E" && col !== this.contents[0].length - 1)  {
            return [row, col + 1]
        } else if (neighbour === "NW" && row !== 0 && col !== 0) {
            return [row - 1, col - 1]
        } else if (neighbour === "NE" && row !== 0 && col !== this.contents[0].length - 1) {
            return [row - 1, col + 1]
        } else if (neighbour === "SW" && row !== this.contents.length - 1 && col !== 0) {
            return [row + 1, col - 1]
        } else if (neighbour === "SE" && row !== this.contents.length - 1 && col !== this.contents[0].length - 1) {
            return [row + 1, col + 1]
        } else {
            return undefined
        }
    }
}

export default Map2D;