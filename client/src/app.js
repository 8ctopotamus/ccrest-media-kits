import React from 'react'
import styled from 'styled-components'
import AppContext from './context'
import AppProvider from './context/provider'
import Nav from './components/nav'
import Cart from './components/cart'
import Search from './components/search'

const App = styled.div`
  background: #eee;
  overflow: hidden;
  position: relative;
`

export default () => {
  const wp_data = window.wp_data 
    ? window.wp_data
    : null
  if (!wp_data) {
    return <p>This is not the app you are looking for. You're probably looking for the dev React app in the WordPress plugin: <a href="http://localhost/plugin-dev/media-repository">http://localhost/plugin-dev/media-repository</a></p>
  } else {
    const { assets, categories } = wp_data.data
    return (
      <App id="app">
        <AppProvider>
          <Nav />
          <AppContext.Consumer>
            {({state, dispatch}) => (
              state && state.view && state.view === 'ZIP'
                ? <Cart toZip={state.zips} dispatch={dispatch} />
                : <Search 
                    state={state} 
                    dispatch={dispatch}
                    categories={categories}
                    assets={assets}
                  />
            )}
          </AppContext.Consumer>
      </AppProvider>
    </App>
    )
  }
}