import React from 'react'
import AppContext from '../../context'
import File from './file'
import CartButton from '../cart-button'

export default () => (
  <AppContext.Consumer>
    {({state, dispatch}) => {
      const {
        post_name: slug,
        post_title,
        files,
        post_content,
        categories,
        tags,
      } = state.current

      return (
        <>
          <button 
            onClick={() => dispatch({
              type: 'SET_CURRENT',
              payload: null,
            })}
          >&times;</button>

          <h1>{post_title}</h1>

          <CartButton slug={slug} size="25" />

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