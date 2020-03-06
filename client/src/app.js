import React from 'react'
import AppProvider from './context/provider'
import Sidebar from './components/sidebar'
import TopBar from './components/topbar'
import ResultsGrid from './components/results-grid'

function App() {
  if (!window.data)
    return <p>This is not the app you are looking for. You're probably looking for the dev React app in the WordPress plugin: <a href="http://localhost/plugin-dev/asset-repository">http://localhost/plugin-dev/asset-repository</a></p>

  const { assets, categories } = window.data
  return (
    <AppProvider>
      <div id="app">
        <Sidebar cats={categories} />
        <div id="content-wrap">
          <div className="container">
            <TopBar/>
            {assets && assets.length > 0 ? (
              <ResultsGrid items={assets} />
            ) : (
              <p>No assets found.</p>
            )}
          </div>
        </div>
      </div>
    </AppProvider>
  )
}

export default App
