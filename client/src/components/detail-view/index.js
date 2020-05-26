import React from 'react'
import styled from 'styled-components'
import { Animated } from 'react-animated-css'
import File from './file'
import CartButton from '../cart/toggle-button'
import Grid from '../grid'

const Header = styled.div`
  display: flex;
`

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

export default ({ state }) => {
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
      <Header>
        <h1>{post_title}</h1>
        <CartButton 
          text="Add all"
          alternativeText="Remove all"
          slug={slug}
          files={files}
          size="50"
          style={{ paddingLeft: 20, paddingRight: 20}}
        />
      </Header>

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

      <Grid>
        <div>
          <h4>Categories</h4>
          {categories.length > 0 ? (
            <ul className="cats">
            {categories.map(cat => (
              <Tag key={cat}>{cat}</Tag>
            ))}
            </ul>
          ) : <em>This kit is not categorized</em>}
        </div>
        <div>
          <h4>Tags</h4>
          {tags.length > 0 ? (
            <ul className="tag-cloud">
              {tags.map(tag => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          ) : <em>This kit is not categorized</em>}
        </div>
      </Grid>
    </Animated>
  )
}