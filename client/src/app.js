import React from 'react'
import AppContext from './context'
import AppProvider from './context/provider'
import Sidebar from './components/sidebar'
import TopBar from './components/topbar'
import ResultsGrid from './components/results-grid'
import DetailView from './components/detail-view'

const App = () => {
  if (!window.data)
    return <p>This is not the app you are looking for. You're probably looking for the dev React app in the WordPress plugin: <a href="http://localhost/plugin-dev/asset-repository">http://localhost/plugin-dev/asset-repository</a></p>

  const { assets, categories } = window.data
  
  return (
    <AppProvider>
      <div id="app">
        <Sidebar cats={categories} />
        <div id="content-wrap">
          <TopBar/>

          <AppContext.Consumer>
            {({state}) => (
              state.current 
                ? <DetailView />
                : <ResultsGrid items={assets} />  
            )}
          </AppContext.Consumer>
        </div>
      </div>
    </AppProvider>
  )
}

export default App
