import React from 'react';
import classes from './NavLeft.module.css';

import SearchType from './SearchType/SearchType';

const navLeft = (props) => {
    return (
        <nav className={classes.navLeft}>
            <ul>
                <SearchType 
                    setSearchTypeAndSearch={props.setSearchTypeAndSearch} 
                    activeType={props.activeType} 
                    title='Movies' 
                    icon='fas fa-video'
                />
                <SearchType 
                    setSearchTypeAndSearch={props.setSearchTypeAndSearch} 
                    activeType={props.activeType} title='TV Shows' 
                    icon='fas fa-tv'
                />
            </ul>
        </nav>
    )
};

export default navLeft;