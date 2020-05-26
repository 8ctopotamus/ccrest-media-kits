import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { MdAddShoppingCart, MdRemoveShoppingCart } from 'react-icons/md'
import AppContext from '../../context'

const ToggleButton = styled.div`
  display: flex;
  align-items: center;
  border-radius: 50px;
  padding: 10px;
  margin: 30px;
  cursor: pointer;
  &:hover {
    background: #3d9ac8;
    color: white;
  }
`

const CartButton = ({
  alternativeText,
  color,
  className,
  file,
  files,
  size,
  slug,
  style,
  text,
  type,
}) => (
  <AppContext.Consumer>
    {({state, dispatch}) => {
      let Icon = null
      let isFolderZipped = state.zips.hasOwnProperty(slug)
      let isFileZipped = null
      let isIncluded = false
      if (type === 'TOGGLE_ZIP_ITEM') {
        isFileZipped = isFolderZipped && state.zips[slug].includes(file)
        isIncluded = isFileZipped
        Icon = isFileZipped
          ? MdRemoveShoppingCart
          : MdAddShoppingCart
      } else {
        isIncluded = isFolderZipped
        Icon = isFolderZipped
        ? MdRemoveShoppingCart
        : MdAddShoppingCart
      }

      const handleClick = () => {
        if (type === 'TOGGLE_ZIP_ITEM') {
          dispatch({
            type: 'TOGGLE_ZIP_ITEM',
            payload: {
              slug: slug,
              files: file,
            }
          })
          return
        }
        dispatch({
          type: 'TOGGLE_ZIP_FOLDER',
          payload: {
            slug: slug,
            files: files.map(file => file.url),
          }
        })
      }

      return (
        <ToggleButton 
          onClick={handleClick}
          style={style}
        >
          <Icon size={size} color={color} className={className} />
          {alternativeText && isIncluded ? <span style={{marginLeft: 10}}>{alternativeText}</span> : text}
        </ToggleButton>
      )
    }}
  </AppContext.Consumer>
)

export default CartButton

CartButton.protoTypes = {
  slug: PropTypes.string,
  files: PropTypes.array,
}

