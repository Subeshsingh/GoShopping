import React from 'react'
import {NavLink} from 'react-router-dom';
import './Navitem.css';

const NavItem = (props) => {
    return (
            <NavLink className="navitem"
                    to={props.link}
                    exact={props.exact}>
                {props.children}
            </NavLink>
    )
}

export default NavItem
