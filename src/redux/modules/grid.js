import Chance from 'chance'
import { setConfig } from './config'

const chance = new Chance()

export const INIT_GRID = 'INIT_GRID'
export const MARK_RAND_CELL = 'MARK_RAND_CELL'
export const TAP_CELL = 'TAP_CELL'

const generateGrid = (rows, columns) => {
  const grid = []
  for(let i = 0; i < rows; i++) {
    for(let j = 0; j < columns; j++) {
      if (j === 0) grid[i] = []
      grid[i][j] = false
    }
  }
  return grid
}

export const initGrid = (rows, columns) => ({
  type: INIT_GRID,
  grid: generateGrid(rows, columns),
})

export const markRandCell = () => ({
  type: MARK_RAND_CELL,
})

export const tapCell = position => ({
  type: TAP_CELL,
  position,
})

export const checkFullGrid = (grid) => {
  for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === false) return false
    }
  }
  return true
}

const invertCell = (grid, position) => {
  return grid.map((row, i) => row.map((col, j) => {
    if (position.row === i && position.column === j) return !grid[i][j]
    return grid[i][j]
  }))
}

const invertRandCell = (grid) => {
  const row = chance.integer({min: 0, max: grid.length - 1})
  const column = chance.integer({min: 0, max: grid[0].length - 1})
  if (checkFullGrid(grid)) return grid
  if (grid[row][column] === true) return invertRandCell(grid)
  return invertCell(grid, { row, column })
}

export const startGame = () => (dispatch, getState) => {
  dispatch(initGrid(5, 5))
  dispatch(setConfig({ score: 0 }))
  const startTime = new Date().getTime()
  var counter = 500
  var myFunction = function(){
    setTimeout(() => {
      const { grid } = getState()
      dispatch(setConfig({ score: new Date().getTime() - startTime }))
      if (checkFullGrid(grid) === true) return;
      counter -= 5
      dispatch(markRandCell())
      myFunction()
    }, counter)
  }
  myFunction()
}

const initialState = generateGrid(5, 5)

export default (state = initialState, { type, grid, position }) => {
  switch(type) {
    case INIT_GRID:
      return grid
    case MARK_RAND_CELL:
      return invertRandCell(state)
    case TAP_CELL:
      return invertCell(state, position)
    default:
      return state
  }
}
