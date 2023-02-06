import styled from 'styled-components'
import { Link as RouterLink } from 'react-router-dom'

export const NavbarContainter = styled.header`
    width: 100%;
    background-color: #aaa;
    display: flex;
    box-shadow: 0px 0px 2em #222;
`

export const Link = styled(RouterLink)`
    color: #333;
    text-decoration: none;
    padding: 1.5em;
    font-weight: bold;
    :hover{
        color: #777;
    }
`