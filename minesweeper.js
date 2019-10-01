document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {}
board.cells = []
for (var i = 0; i < 3; i++) {
  for (var j = 0; j < 3; j++) {
    board.cells.push({
      row: i,
      col: j,
      isMine: false,
      hidden: true
    })
  }
}
board.cells[2].isMine = true
board.cells[3].isMine = true

for (var i = 0; i < board.cells.length; i++) {
  board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
}

function startGame () {
  // Don't remove this function call: it makes the game work!
  lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {

  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  //   lib.displayMessage('You win!')
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

