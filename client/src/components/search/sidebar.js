import React, { useState } from 'react'
import styled from 'styled-components'
import { MdFilterList, MdClose, MdRestore } from 'react-icons/md'
import AppContext from '../../context'

const navWidth = '220px'
const mediumBreakpoint = '860px'

const Sidebar = styled.div`
  height: 100%;
  width: auto;
  position: absolute;
  top: 0;
  left: 0;
  width: ${navWidth};
  background: #44acdf;
  color: white;
  height: 100%;
  z-index: 100;
  padding: 82px 15px;
  ul {
    list-style-type: none;
    margin-left: 0;
  }
  input[type="checkbox"] {
    margin: 0 10px 0 0;
  }
  @media (max-width: ${mediumBreakpoint}) {
    display: ${props => props.open ? 'block' : 'none'};
  }
`

const SidebarToggle = styled.div`
  display: none;
  position: absolute;
  top: 22px;
  left: 30px;
  z-index: 1000;
  cursor: pointer;
  svg { fill: white; }
  @media (max-width: ${mediumBreakpoint}) {
    display: block;
  }
`

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

        <button onClick={() => dispatch({ type: 'RESET_SEARCH' })}>
          <MdRestore /> Reset
        </button>

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
    <>
      <SidebarToggle>
        <div onClick={toggleOpen}>
          { open 
            ? <MdClose size="30" />
            : <MdFilterList size="30" />
          }
        </div>
      </SidebarToggle>
      <Sidebar open={open} className="animated slideInLeft">
        <Controls cats={cats} />
      </Sidebar>
    </>
  )
}