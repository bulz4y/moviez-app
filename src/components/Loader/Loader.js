import React from 'react';
import classes from './Loader.module.css';

const loader = () => {
    return (
        <div className={classes['loader-container']}>
            <div className={classes.loader}></div>
        </div>
        
        
    );   
};

export default loader;