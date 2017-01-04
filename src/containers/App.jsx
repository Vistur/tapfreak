import React, { Component } from 'react'
import { connect } from 'react-redux'
import { startGame, markRandCell as markRandCellAction, checkFullGrid } from '../redux/modules/grid'
import App from '../components/App'

export class AppContainer extends Component {
  constructor(props) {
    super(props)
    props.startGame()
  }
  render() {
    const { grid, startGame, score } = this.props
    return checkFullGrid(grid) ? <h1 onClick={() => startGame()}>GAME OVER SCORE {score}</h1> : <App score={score} />
  }
}

export default connect(
  ({ grid, config: { score } }) => ({ grid, score }),
  dispatch => ({
    startGame: () => dispatch(startGame()),
    markRandCell: () => dispatch(markRandCellAction())
  })
)(AppContainer)
