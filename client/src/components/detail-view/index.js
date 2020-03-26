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

  const firstFile = files[0]
  const isImage = firstFile.type === 'image'
  const featuredImage = isImage
    ? firstFile.url
    : firstFile.icon

  return (
    <Animated 
      animationIn="fadeIn"
      className="container detail-view"
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
        <MdArrowBack size="25" /> <span>Back</span>
      </span>
      <br/>
      <div className="grid gap col-2">    
        <div>
          <img src={featuredImage} alt={firstFile.alt} /> 
        </div>
        <div>
          <h1>{post_title}</h1>
          <CartButton text={files.length} slug={slug} size="35" />
        </div>
      </div>
      <br/>
      <div className="grid gap col-2-1-1">
        <div dangerouslySetInnerHTML={{__html: post_content}} />
        <div>
          <h4>Tags</h4>
          {tags.length > 0 && (
            <ul className="tag-cloud">
              {tags.map(tag => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <h4>Categories</h4>
          {categories.length > 0 && (
            <ul className="cats">
            {categories.map(cat => (
              <li key={cat}>{cat}</li>
            ))}
            </ul>
          )}
        </div>
      </div>

      <hr/>
      <h2>Files</h2>
      {files && files.map(file => <File file={file} key={file.ID} />)}
    </Animated>
  )
}