import React from 'react'
import styled from 'styled-components'
import { MdClose, MdArrowBack } from 'react-icons/md'
import { FaCartArrowDown } from 'react-icons/fa'
import { GrCart } from 'react-icons/gr'
import AppContext from '../context'

const Nav = styled.div`
  background: #3d9ac8;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 25px;
  margin-bottom: 25px;
  color: white;
  z-index: 100;
`

const Button = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
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
                onClick={() => {
                  dispatch({
                    type: 'SET_CURRENT',
                    payload: null,
                  })
                  dispatch({
                    type: 'SET_VIEW',
                    payload: 'SEARCH',
                  })
                }}
                style={{
                  fontSize: 22,
                  display: 'flex',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  marginRight: 'auto',
                }}
              >
                <MdArrowBack /> <span>Back to search</span>
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
                      <FaCartArrowDown size="25" style={{marginRight: 6}} color="white" />
                    ) : (
                      <GrCart size="25" style={{marginRight: 6}} color="white" />
                    ) }
                    <strong>{zipsAmt} file{zipsAmt===1?'':'s'}</strong>
                  </>
                )}
            </Button>
          </Nav>
        )
      }}
  </AppContext.Consumer>
)