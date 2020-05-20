import React from 'react'
import { Animated } from 'react-animated-css'
import AppContext from '../../context'
import Result from './result'

export default ({ items }) => (
  <div id="results-wrap">
    <AppContext.Consumer>
      {({state}) => (
        <div className="grid gap col-4">
          { /* search */
            items && items.length > 0 ? (
              items
                // categories
                .filter(item => {
                  if (state.filters.length === 0)
                    return true
                  if (item.categories.length === 0)
                    return false
                  return item.categories
                    .find(cat => state.filters.includes(cat))
                })
                // keywords: titles & tags
                .filter(
                  item => {
                    const searchTerm = state.search.toLowerCase()
                    return searchTerm === ''
                    ? true
                    : ( 
                        item.post_title 
                          .toLowerCase()
                          .includes(searchTerm) ||
                        item.tags
                          .find(tag => tag.toLowerCase().includes(searchTerm))
                      )
                  }
                )
                .map((item, i) => (
                  <Animated
                    animationIn="fadeInUp"
                    animationInDelay={260 + (i * 100)}
                    key={item.post_name}
                  >
                    {item? <Result item={item} /> : <div></div>}
                  </Animated>
                ))
          ) : (
            <p>No items found</p>
          ) }
        </div>
      )}
    </AppContext.Consumer>
  </div>
)