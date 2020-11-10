import React from 'react';
import classes from './Logo.module.css';
import logoImg from '../../assets/logo.svg';
import { NavLink } from 'react-router-dom';


const logo = (props) => {
    return (
            <NavLink to='/' className={classes.logo} onClick={(e) => { e.preventDefault(); props.resetSearchTerm('') }}>
                <img src={logoImg} className={classes.logo_img} alt={props.alt}/> 
                <span>{props.title}</span>
            </NavLink>            
    );
}

export default logo;