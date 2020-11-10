import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Genre.module.css';



const genre = (props) => {
    
    let active = '';
    if(props.id === props.activeCategory) {
        active =  ' ' + classes.activeCategory;
    }

    return (
        <li className={classes.genre + active} onClick={() => props.setActiveCategoryAndSearch(props.id)}>
            <Link to='/'>
                {props.name}
            </Link >
           
        </li>
    );
};

export default genre;