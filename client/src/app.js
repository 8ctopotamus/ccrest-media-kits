import React from 'react'
import AppContext from './context'
import AppProvider from './context/provider'
import TopBar from './components/topbar'
import Cart from './components/cart'
import Search from './components/search'

const App = () => {
  const wp_data = window.wp_data 
    ? window.wp_data
    : null
  if (!wp_data) {
    return <p>This is not the app you are looking for. You're probably looking for the dev React app in the WordPress plugin: <a href="http://localhost/plugin-dev/media-repository">http://localhost/plugin-dev/media-repository</a></p>
  } else {
    const { assets, categories } = wp_data.data
    return (
      <AppProvider>
        <div id="app">
          <TopBar />
          <AppContext.Consumer>
            {({state, dispatch}) => (
              state.view === 'CART'
                ? <Cart items={state.cart} dispatch={dispatch} />
                : <Search 
                    state={state} 
                    dispatch={dispatch}
                    categories={categories}
                    assets={assets}
                  />
            )}
          </AppContext.Consumer>
        </div>
      </AppProvider>
    )
  }
}

export default App
