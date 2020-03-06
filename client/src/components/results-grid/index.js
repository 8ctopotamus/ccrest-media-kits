import React from 'react'
import Result from './result'

export default ({ items }) => (
  <div className="grid gap col-3">
    { items.map(item => (
      <Result {...item} key={item.post_name} />
    ))}
  </div>
)