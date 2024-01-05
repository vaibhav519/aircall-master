import React from 'react';
import { NavLink } from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <NavLink to="/" className={({isActive}) => {return isActive ? 'selected' : undefined}}>
                <span className="material-icons">home</span>
            </NavLink>
            <span className="material-icons">dialpad</span>
            <NavLink to="archives" className={({isActive}) => {return isActive ? 'selected' : undefined}}>
                <span className="material-icons">archive</span>
            </NavLink>
        </footer>
    );
};

export default Footer;
