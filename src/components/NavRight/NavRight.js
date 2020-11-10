import React from 'react';
import classes from './NavRight.module.css';

const navRight = (props) => {
    return (
        <nav>
                        
            <ul className={classes.navRight}>
                {props.children}
                
            </ul>
        </nav>
    )
};

export default navRight;