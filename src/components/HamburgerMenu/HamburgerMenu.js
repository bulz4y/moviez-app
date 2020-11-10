import React from 'react';

import classes from "./HamburgerMenu.module.css";

const hamburgerMenu = (props) => {
    
    
    return (
        <div onClick={props.show} className={classes['hamburger-menu']}>
            <span></span>
            <span></span>
        </div>
    );
};

export default hamburgerMenu;