import React, { Component } from 'react'
import Grid from './Grid'
import './App.css'

const App = ({ score }) => (
  <div>
    <h1>Score: {score}</h1>
    <Grid />
  </div>
)

export default App;
