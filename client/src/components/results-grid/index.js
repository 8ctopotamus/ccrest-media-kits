import React from 'react'
import Result from './result'

export default ({ items }) => (
  <div className="grid gap col-3">
    { items && items.length > 0 ? (
      items && items.map(item => (
        <Result item={item} key={item.post_name} />
      ))
    ) : (
      <p>No items found</p>
    ) }
  </div>
)