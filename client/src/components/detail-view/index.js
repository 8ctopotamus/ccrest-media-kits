import React from 'react'
import { MdClose } from 'react-icons/md'
import File from './file'
import CartButton from '../cart-button'

export default ({state, dispatch}) => {
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
        style={{
          background: 'black',
          textDecoration: 'none',
        }}
      >
        <MdClose color="white" size="25" />
      </button>

      <h1>{post_title}</h1>

      <CartButton text="Collection" slug={slug} size="25" />

      {categories.length > 0 && (
        <p>Categories: {categories.map(cat => <span>{cat}</span>)}</p>
      )}
      
      {tags.length > 0 && (
        <p>Tags: {tags.map(tag => <span>{tag}</span>)}</p>
      )}
      
      <div dangerouslySetInnerHTML={{__html: post_content}} />
      
      {files && files.map(file => <File file={file} />)}          
    </>
  )
}