import React from 'react'
import Sidebar from './sidebar'
import ResultsGrid from './results'
import DetailView from '../detail-view'

export default ({
  state,
  dispatch,
  assets,
  categories
}) => (
  <>
    {state.current 
      ? <DetailView state={state} dispatch={dispatch} />
      : (
        <>
          <Sidebar cats={categories} />
          <ResultsGrid items={assets} />
        </>
      ) }
  </>
)