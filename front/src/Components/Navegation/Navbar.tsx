import React from 'react'
import { NavbarContainter, Link } from './styles'

export default function Navbar(){
    return (
        <NavbarContainter>
            <Link to="">Home</Link>
            <Link to="rooms/search">Rooms</Link>
            <Link to="coupons/search">Coupons</Link>
            <Link to="games/search">Games</Link>
        </NavbarContainter>
    )
}