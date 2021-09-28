import * as React from 'react'
import styled from 'styled-components'

const Header = styled.th`
text-align: center;
`

const CenterHeader = ({ children, ...restProps }) => {
  return (
    <Header {...restProps}>{children}</Header>
  )
}

export default CenterHeader
