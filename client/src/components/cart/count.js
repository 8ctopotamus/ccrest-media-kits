import React from 'react'
import styled from 'styled-components'
import { MdClose, MdSearch, MdArrowBack } from 'react-icons/md'
import { AiFillFileZip, AiOutlineFileZip } from 'react-icons/ai'
import AppContext from '../../context'
import mixins from '../../utils/mixins'

const Nav = styled.div`
  display: flex;
  justify-content: flex-end;  
  align-items: flex-end;
  ${mixins.container}
  padding-top: 30px;
  padding-bottom: 30px;
`

const Button = styled.div`
  display: flex;
  justify-content: space-between;  
  align-items: center;
`

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
          <Nav>
            {state.current && (
              <Button 
                onClick={() => dispatch({
                  type: 'SET_CURRENT',
                  payload: null,
                })}
                style={{
                  fontSize: 22,
                  display: 'flex',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  marginRight: 'auto',
                }}
              >
                <MdArrowBack /> <span>Back to search</span> 
                {/* <MdSearch /> */}
              </Button>
            )}

            <Button
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
            </Button>
          </Nav>
        )
      }}
  </AppContext.Consumer>
)