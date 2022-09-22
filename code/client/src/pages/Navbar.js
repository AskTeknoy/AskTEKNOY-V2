/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import '../styles/Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
        <nav>
            <div className="logo">Ask<span><Link to="/">TEKNOY</Link></span></div>
            <ul>
            <li><Link to="/">Home</Link></li>
            <li><a href="#">About</a></li>
            <li><Link to="/contacts">Contact</Link></li>
            <li><a href="#">Features</a></li>
            <li><a href="https://cit.edu/" className="home-cit">CIT-U Home</a></li>
            </ul>
        </nav>
    </div>
      
  )
}

export default Navbar