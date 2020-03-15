import React from 'react'
import { Animated } from 'react-animated-css'

export default ({ items }) => (
  <Animated 
    animationIn="fadeIn"
    className="container"
  >
    <h2>My Cart</h2>
    <pre>{JSON.stringify(items, null, 2)}</pre>
  </Animated>
)