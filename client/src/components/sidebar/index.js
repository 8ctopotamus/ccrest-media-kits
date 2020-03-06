import React, { useState } from 'react'
import AppContext from '../../context'

const Controls = ({ cats }) => (
  <AppContext.Consumer>
    {({state, dispatch}) => (
      <>
        <input 
          onChange={e => dispatch({
            type: 'UPDATE_SEARCH',
            payload: e.target.value,
          })}
          placeholder="search" 
          type="search" 
          style={{marginBottom: 25}}
        />
        {cats.map(cat => (
          <div key={cat.slug}>
            <strong>{cat.cat_name}</strong>
            <ul>
              {cat.children.map(child => {
                const { cat_name, slug } = child
                const checked = state.filters.includes(slug)
                return (
                  <li key={slug}>
                    <label htmlFor={cat_name}>
                      <input
                        name={cat_name}
                        type="checkbox"
                        checked={checked}
                        value={slug}
                        onChange={() => dispatch({
                          type: 'TOGGLE_FILTER',
                          payload: slug,
                        })}
                      />
                      {cat_name}
                    </label>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </>
    )}
  </AppContext.Consumer>
)

export default ({ cats }) => {
  const [open, setOpen] = useState(false)

  const toggleOpen = () => setOpen(!open)
  
  return (
    <div className={`${open ? 'open' : ''}`}> 
      <div className="sidebar-toggle hidden-lg">
        <button size="30" onClick={toggleOpen}>
          { open ? 'X' : 'Filter' }
        </button>
      </div>
      <div className="sidebar">
        <Controls cats={cats} />
      </div>
    </div>
  )
}