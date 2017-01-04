export const SET_CONFIG = 'SET_CONFIG'

export const setConfig = (config) => ({
  type: SET_CONFIG,
  config,
})

const initialState = {
  rows: 10,
  columns: 10,
  score: 0,
}

export default (state = initialState, { type, config }) => {
  switch(type) {
    case SET_CONFIG:
      return { ...state, ...config }
    default:
      return state
  }
}
