import React, { Fragment } from 'react'
import './Navbar.css';
import Navitem from './NavItem';
// import { NavLink } from 'react-router-dom';

const Navbar = (props) => {
    return (
        <div className="Navbar">
            <Navitem link="/" exact>Home</Navitem>
            {props.authenticated 
                ? <Navitem link="/logout" exact>Logout</Navitem>
                : <Fragment> 
                    <Navitem link="/login" exact>Login</Navitem>
                    <Navitem link="/signup" exact>SignUp</Navitem>
                 </Fragment>
            }
        </div>
    )
}

export default Navbar;
