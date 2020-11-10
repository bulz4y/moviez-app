import React from 'react';
import classes from './Search.module.css';


const search = (props) => {
    return (
            <div className={classes.search}>
                <span>Search: </span>
                <input type="text" value={props.searchTerm} onChange={(e) => {props.search(e.target.value)}}/>
            </div>
    )
};

export default search;