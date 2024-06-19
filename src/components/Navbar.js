import React from 'react';
import './Navbar.css'; 
import CartImg from './images/basket.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">MyApp</div>
            <ul className="navbar-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
            <div className="navbar-cart">
                <Link to="/cart"><img src={CartImg} alt="Cart" /></Link>
            </div>
        </nav>
    );
};

export default Navbar;
