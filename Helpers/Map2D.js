// Converter
class Map2D {
    // Constructor
    constructor(input) {
        this.contents = []
        for (let i = 0; i < input.length; i++) {
            this.contents.push(input[i].split(""))
        }
    }

    // Check North
    checkNorth(row, col) {
        if (row !== 0)  {
            return this.contents[row - 1][col]
        }
    }

    // Check South
    checkSouth(row, col) {
        if (row !== this.contents.length - 1)  {
            return this.contents[row + 1][col]
        }
    }

    // Check West
    checkWest(row, col) {
        if (col !== 0)  {
            return this.contents[row][col - 1]
        }
    }

    // Check East
    checkEast(row, col) {
        if (col !== this.contents[0].length - 1)  {
            return this.contents[row][col + 1]
        }
    }

    // Check North-West
    checkNorthWest(row, col) {
        if (row !== 0 && col !== 0) {
            return this.contents[row - 1][col - 1]
        }
    }

    // Check North-East
    checkNorthEast(row, col) {
        if (row !== 0 && col !== this.contents[0].length - 1) {
            return this.contents[row - 1][col + 1]
        }
    }

    // Check South-West
    checkSouthWest(row, col) {
        if (row !== this.contents.length - 1 && col !== 0) {
            return this.contents[row + 1][col - 1]
        }
    }

    // Check South-East
    checkSouthEast(row, col) {
        if (row !== this.contents.length - 1 && col !== this.contents[0].length - 1) {
            let toReturn = this.contents[row + 1][col + 1]
            return toReturn
        }
    }
}

export default Map2D;