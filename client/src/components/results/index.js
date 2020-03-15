import React from 'react'
import AppContext from '../../context'
import Result from './result'

export default ({ items }) => (
  <AppContext.Consumer>
    {({state}) => (
      <div className="grid gap col-4">
        { items && items.length > 0 ? (
          items
            .filter(item => {
              if (state.filters.length === 0)
                return true
              if (item.categories.length === 0)
                return false
              return item.categories
                .find(cat => state.filters.includes(cat))
            })
            .filter(
              item => state.search === ''
                ? true
                : ( item.post_title 
                      .toLowerCase()
                      .includes(state.search) ||
                    item.tags
                      .find(tag => tag.toLowerCase().includes(state.search)) )
            )
            .map(item => (
              <Result item={item} key={item.post_name} />
            ))
        ) : (
          <p>No items found</p>
        ) }
      </div>
    )}
  </AppContext.Consumer>
)