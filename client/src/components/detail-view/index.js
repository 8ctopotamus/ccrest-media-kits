import React from 'react'
import { MdArrowBack } from 'react-icons/md'
import { Animated } from 'react-animated-css'
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
    <Animated 
      animationIn="fadeIn"
      className="container"
    >
      <span 
        onClick={() => dispatch({
          type: 'SET_CURRENT',
          payload: null,
        })}
        style={{
          display: 'flex',
          textDecoration: 'none',
          cursor: 'pointer',
        }}
      >
        <MdArrowBack size="25" /> Back
      </span>

      <h1>{post_title}</h1>

      <CartButton text="Collection" slug={slug} size="25" />

      {categories.length > 0 && (
        <p>Categories: {categories.map(cat => <span key={cat}>{cat}</span>)}</p>
      )}
      
      {tags.length > 0 && (
        <p>Tags: {tags.map(tag => <span key={tag}>{tag}</span>)}</p>
      )}
      
      <div dangerouslySetInnerHTML={{__html: post_content}} />
      
      {files && files.map(file => <File file={file} />)}          
    </Animated>
  )
}