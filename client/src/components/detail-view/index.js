import React from 'react'
import styled from 'styled-components'
import { MdSearch } from 'react-icons/md'
import { Animated } from 'react-animated-css'
import File from './file'
import CartButton from '../zip/toggle-button'

const ThumbGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
  @media (max-width: 767px) {
    display: block;
  }
`

const Tag = styled.li`
  list-style: none;
  margin-left: 0;
  padding-left: 0;
`

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
      className="container detail-view"
    >
      <div className="detail-header">
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
          <MdSearch /> <span>Back to search</span>
        </span>
        <CartButton 
          text="Add all"
          alternativeText="Remove all"
          slug={slug}
          files={files}
          size="50"
          style={{ paddingLeft: 20, paddingRight: 20}}
        />
      </div>

      <br/>
      
      <h1>{post_title}</h1>
      <div className="grid gap col-3-1">
        <div>
          <div dangerouslySetInnerHTML={{__html: post_content}} />
          <ThumbGrid>
            {files && files.map(file => (
              <File
                file={file}
                slug={slug}
                key={file.ID}
              />
            ))}
          </ThumbGrid>
        </div>
        <div>
          <h4>Categories</h4>
          {categories.length > 0 ? (
            <ul className="cats">
            {categories.map(cat => (
              <Tag key={cat}>{cat}</Tag>
            ))}
            </ul>
          ) : <em>This kit is not categorized</em>}
          <h4>Tags</h4>
          {tags.length > 0 ? (
            <ul className="tag-cloud">
              {tags.map(tag => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          ) : <em>This kit is not categorized</em>}
        </div>
      </div>
    </Animated>
  )
}