document.addEventListener('DOMContentLoaded', startGame)

var board;

function createBoard() {
  board = { cells: [] }
  // Set up board of 16 cells, initialise all as non-mines and hidden
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      board.cells.push({
        row: i,
        col: j,
        isMine: false,
        hidden: true
      })
    }
  }
  // Set five cells to be mines
  var mineCells = chooseRandomCells()
  for (var i = 0; i < mineCells.length; i++) {
    board.cells[mineCells[i]].isMine = true
  }
  // For each cell, count how many mines surround it
  for (var i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
  }
}

function resetBoard() {
  // Clear all cells
  document.querySelector('.board').innerHTML = ''
  // Reinitialise global board object
  createBoard()
  // Create new board
  lib.initBoard()
  // Hide restart button and change display message
  document.getElementById('restart').style.display = "none"
  lib.displayMessage('Let\'s play!')
}

// Picks 5 random cells
function chooseRandomCells() {
  // Initialise array of cells to be chosen
  var chosenCells = []
  // Initialise array of cell numbers
  var cellNumbers = []
  for (var i = 0; i < 16; i++) {
    cellNumbers.push(i)
  }
  // For five times...
  for (var i = 0; i < 5; i++) {
    // Choose a randomly indexed cell number in current array of cell numbers
    var randomCellIndex = Math.floor((Math.random() * cellNumbers.length));
    // Remove cell number at random index, add it to chosen cells
    chosenCells.push(cellNumbers.splice(randomCellIndex, 1)[0]);
  }
  return chosenCells
}

function startGame () {
  createBoard()
  // Don't remove this function call: it makes the game work!
  lib.initBoard()
  document.addEventListener("click", checkForWin)
  document.addEventListener("contextmenu", checkForWin)
  document.getElementById('restart').addEventListener("click", resetBoard)
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {

  // If all the mines have exploded, show restart button and return
  if (document.querySelector('#message p').innerHTML == 'BOOM!') {
    document.getElementById('restart').style.display = "block"
    return
  }

  for (var i = 0; i < board.cells.length; i++) {
    // If current cell is a mine
      // If current cell is not marked, return
    // If current cell is not a mine
      // If current cell is hidden, return
    if (board.cells[i].isMine) {
      if (!board.cells[i].isMarked) {
        return
      }
    } else {
      if (board.cells[i].hidden) {
        return
      }
    }
  }
  lib.displayMessage('You win!')
  document.getElementById('restart').style.display = "block"
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 

  // var surrounding = lib.getSurroundingCells(cell.row, cell.col)

// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
  var count = 0;
  var surrounding = lib.getSurroundingCells(cell.row, cell.col)
  for (var i = 0; i < surrounding.length; i++) {
    if (surrounding[i].isMine) {
      count++
    }
  }
  return count;
}

