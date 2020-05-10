import React from 'react'
import PropTypes from 'prop-types'
import {
  AiFillFileZip,
  AiOutlineFileZip
} from 'react-icons/ai'

import AppContext from '../../context'

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
          ? AiFillFileZip
          : AiOutlineFileZip
      } else {
        isIncluded = isFolderZipped
        Icon = isFolderZipped
        ? AiFillFileZip
        : AiOutlineFileZip
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
        <div 
          className="zips-button"
          onClick={handleClick}
          style={style}
        >
          <Icon size={size} color={color} className={className} />
          {' '}
          {alternativeText && isIncluded ? alternativeText : text}
        </div>
      )
    }}
  </AppContext.Consumer>
)

export default CartButton

CartButton.protoTypes = {
  slug: PropTypes.string,
  files: PropTypes.array,
}

