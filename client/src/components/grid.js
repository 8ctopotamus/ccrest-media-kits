import React from 'react'
import styled from 'styled-components'
import mixins from '../utils/mixins'

const Grid = styled.div`
  ${props => mixins.grid(props)}
`

export default ({ children, columns = false }) => (
  <Grid columns={columns}>
    { children }
  </Grid>
)