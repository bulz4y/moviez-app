import React from 'react';
import classes from './Sort.module.css';

const sort = (props) => {
    
    
    return (

        <li className={classes.sort}>
            <div>
                        Sort By: 
                        <select onChange={props.sortByHandler} value={props.sortBy}>
                            <option value='1'>Popularity</option>
                            <option value='2'>Year</option>
                            <option value='3'>Title</option>
                        </select>
            </div> 
        </li>
    )
};


export default sort;