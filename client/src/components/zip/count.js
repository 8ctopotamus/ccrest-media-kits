import React from 'react'
import { MdClose } from 'react-icons/md'
import { AiFillFileZip, AiOutlineFileZip } from 'react-icons/ai'
import AppContext from '../../context'

export default () => (
  <AppContext.Consumer>
      {({state, dispatch}) => {
        const isCartView = state.view === 'ZIP'
        const targetView = isCartView
          ? null
          : 'ZIP'
        const zipsAmt = Object.values(state.zips)
          .reduce((prev, curr) => (prev + curr.length), 0)
        return (
          <div className="topbar">
            <div
              className="zips-count" 
              onClick={() => dispatch({
                type: 'SET_VIEW',
                payload: targetView
              })}
            >
              {isCartView
                ? (
                  <>  
                    <span>Keep browsing</span>
                    <MdClose size="25" /> 
                  </>
                ) : (
                  <>
                    { zipsAmt > 0 ? (
                      <AiFillFileZip size="25" style={{marginRight: 6}} />
                    ) : (
                      <AiOutlineFileZip size="25" style={{marginRight: 6}} />
                    ) }
                    <strong>{zipsAmt} file{zipsAmt===1?'':'s'} ZIP'ed</strong>
                  </>
                )}
            </div>
          </div>
        )
      }}
  </AppContext.Consumer>
)