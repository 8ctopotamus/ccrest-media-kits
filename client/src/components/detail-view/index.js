import React from 'react'
import AppContext from '../../context'
import File from './file'

export default () => (
  <AppContext.Consumer>
    {({state, dispatch}) => {
      const {
        post_title,
        files,
        post_content,
        categories,
        tags,
      } = state.current
      console.log(state.current)
      return (
        <>
          <button 
            onClick={() => dispatch({
              type: 'SET_CURRENT',
              payload: null,
            })}
          >
            X
          </button>

          <h1>{post_title}</h1>
          {categories && (
            <>
              <h6>Categories</h6>
              {categories.map(cat => <span>{cat}</span>)}
            </>
          )}
          
          {tags && (
            <>
              <h6>Tags</h6>
              {tags.map(tag => <span>{tag.name}</span>)}
            </>
          )}
          
          <div dangerouslySetInnerHTML={{__html: post_content}} />
          
          {files && files.map(file => <File file={file} />)}          
        </>
      )
    }}
  </AppContext.Consumer>
)