import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div>
            <Link to="/" style={{ textDecoration: 'none' }}>
                <h1 className = "font-weight-light display-1 text-center">P2P Books</h1>
            </Link>
        </div>
    )
}

export default Header
