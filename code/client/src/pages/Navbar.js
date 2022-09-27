/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import '../styles/Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
        <nav>
            <div className="logo">Ask<span className='span-logo'><Link to="/">TEKNOY</Link></span></div>
            <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contacts">Contact</Link></li>
            <li><a href="https://cit.edu/" className="home-cit">CIT-U Home</a></li>
            </ul>
        </nav>
    </div>
      
  )
}

export default Navbar