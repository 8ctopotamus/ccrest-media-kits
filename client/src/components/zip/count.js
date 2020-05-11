import React from 'react'
import { MdClose } from 'react-icons/md'
import { AiFillFileZip, AiOutlineFileZip } from 'react-icons/ai'
import AppContext from '../../context'

export default () => (
  <AppContext.Consumer>
      {({state, dispatch}) => {
        const isZIPView = state && state.view && state.view === 'ZIP'
        const targetView = isZIPView
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
              {isZIPView
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
                    <strong>{zipsAmt} file{zipsAmt===1?'':'s'} ZIP'd for download</strong>
                  </>
                )}
            </div>
          </div>
        )
      }}
  </AppContext.Consumer>
)