// Converter
class Map2D {
    // Constructor
    constructor(input, numbers = false) {
        this.contents = []
        for (let i = 0; i < input.length; i++) {
            if (numbers) {
                this.contents.push(input[i].split("").map(Number))
            } else {
                this.contents.push(input[i].split(""))
            }
        }
    }

    // Find
    find(target, all = false) {
        let hits = []
        for (let i = 0; i < this.contents.length; i++) {
            for (let j = 0; j < this.contents[i].length; j++) {
                if (this.contents[i][j] === target) {
                    hits.push([i, j])
                    if (!all) {
                        return hits
                    }
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
}

export default Map2D;