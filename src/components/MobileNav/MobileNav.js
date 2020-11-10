import React from 'react';
import classes from './MobileNav.module.css';

import SearchType from '../NavLeft/SearchType/SearchType';
import Favorite from '../NavRight/Favorite/Favorite';
import Sort from '../MobileNav/Sort/Sort';
import Genre from '../Genre/Genre';
import Close from './Close/Close';

const mobileNav = (props) => {
    let genres = props.genres;

    
    
    let genreEls = genres.map((category) => {
        return (
            <Genre 
                id={category.id} 
                setActiveCategoryAndSearch={props.setActiveCategoryAndSearch} 
                activeCategory={props.activeCategory} 
                key={category.id} 
                name={category.name}
            />
        );
    });

    let style = {};

    if(props.show) {
        style = {
            left: '0',
            opacity: 1
        };
    }

    return (
        <React.Fragment>
            
            <ul className={classes.mobileNav} style={style}>

                <Close close={props.close} />

                <SearchType  
                    setSearchTypeAndSearch={props.setSearchTypeAndSearch} 
                    activeType={props.activeType} 
                    title='Movies' 
                    icon='fas fa-video' 
                />

                <SearchType  
                    setSearchTypeAndSearch={props.setSearchTypeAndSearch} 
                    activeType={props.activeType} 
                    title='TV Shows' 
                    icon='fas fa-tv'
                />
               
                <Favorite />
                

                <div style={{marginBottom: '1.5rem', width: '100%', height: '1px' ,background: "#fff"}}/>
                
                {genreEls}

                <div style={{marginBottom: '1.5rem', width: '100%', height: '1px' ,background: "#fff"}}/>

                <Sort 
                    sortByHandler={props.sortByHandler}
                    sortBy={props.sortBy}
                />
            
            </ul>
        </React.Fragment>
        
          
    );
}

export default mobileNav;
