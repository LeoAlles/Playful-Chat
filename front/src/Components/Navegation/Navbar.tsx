import React from 'react'
import { NavbarContainter, Link } from './styles'

export default function Navbar(){
    return (
        <NavbarContainter>
            <Link to="">Home</Link>
            <Link to="rooms/search">Search Rooms</Link>
        </NavbarContainter>
    )
}