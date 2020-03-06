import React, { useState } from 'react'
import AppContext from '../../context'

export default ({ cats }) => {
  const [open, setOpen] = useState(false)

  const toggleOpen = () => setOpen(!open)
  
  return (
    <AppContext.Consumer>
      {({state, dispatch}) => (
        <div className={`${open ? 'open' : ''}`}> 
          <div className="sidebar-toggle hidden-lg">
            <button size="30" onClick={toggleOpen}>
              { open ? 'X' : 'Filter' }
            </button>
          </div>
          <div className="sidebar">
            <input 
              type="search" 
              style={{marginBottom: 25}}
              onChange={e => dispatch({
                type: 'UPDATE_SEARCH',
                payload: e.target.value,
              })}
              placeholder="search" 
            />
            {cats.map(cat => (
              <div key={cat.slug}>
                <strong>{cat.cat_name}</strong>
                <ul>
                {cat.children.map(child => (
                  <li key={child.slug}>
                    <label htmlFor={child.cat_name}>
                      <input
                        name={child.cat_name}
                        type="checkbox"
                        value={child.slug}
                        onChange={() => dispatch({
                          type: 'TOGGLE_FILTER',
                          payload: child.slug,
                        })}
                      />
                      {child.cat_name}
                    </label>
                  </li>
                ))}
                </ul>
              </div>
            ))}
            <pre>{JSON.stringify(state, null, 2)}</pre>
          </div>
        </div>
      )}
    </AppContext.Consumer>
  )
}