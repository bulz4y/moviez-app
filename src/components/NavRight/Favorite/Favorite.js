import React from 'react';
import classes from './Favorite.module.css';
import { Link } from 'react-router-dom';

const favorite = () => {
    return (
        <li className={classes.favorite}>
             <Link to='/favorite'>
                <span> <i className="fas fa-heart"></i> Favorite</span>
            </Link>
        </li>
           
            
    )
};

export default favorite;