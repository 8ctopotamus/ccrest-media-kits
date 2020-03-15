import React from 'react'

export default ({ items }) => (
  <>
    <h2>My Cart</h2>
    <pre>{JSON.stringify(items, null, 2)}</pre>
  </>
)