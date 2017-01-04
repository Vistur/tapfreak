import React from 'react'
import { connect } from 'react-redux'
import { tapCell } from '../redux/modules/grid'

export const Cell = ({ marked, row, column, setCell }) => (
  <div
    style={{
      backgroundColor: marked ? 'black' : 'white',
      width: 30,
      height: 30,
      borderStyle: 'solid',
      borderColor: 'red',
      borderWidth: 3,
    }}
    onClick={() => setCell({ row, column })}
  >
  </div>
)
const CellContainer = connect(null, dispatch => ({ setCell: position => dispatch(tapCell(position)) }))(Cell)

export const Row = ({ cells, row }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-arround',
    }}
  >
    {cells.map((marked, column) => <CellContainer key={`cell${row}${column}`} marked={marked} row={row} column={column} />)}
  </div>
)

export const Grid = ({ grid }) => (
  <div>
    {grid.map((cells, row) => {
      console.log(grid)
      return <Row key={`row${row}`} cells={cells} row={row} />})}
  </div>
)

export default connect(({ grid }) => ({ grid }))(Grid)
