import React from 'react';

import classes from './Show.module.css';
import { useState } from 'react';

import { Link } from 'react-router-dom';

const Show = (props) => {
    
    const [border, setBorder] = useState('');
    const [loaded, setLoaded] = useState(false);
    let reference = React.createRef();

    let favorite=classes.icon;
    let icon = 'far fa-heart';

    if(props.favorite) {
        favorite +=  ' ' + classes.active;
        icon = 'fas fa-heart';
    }


    
    return (

            <Link 
                to={props.type === 'Movies' ?  `/movie/${props.show.id}` : `/tv/${props.show.id}`} 
                onClick={(e) => {
                    
                if(e.target === reference) {
                     e.preventDefault() ;
                }}}
                
            >
                 <div className={classes.showPoster} style={{border: border}}>
                
                    <img src={props.poster_path}  alt={props.title} onLoad={() => { setBorder('1px solid rgba(255,255,255, .8)'); setLoaded(true);}}/>
                        {loaded && (
                            <React.Fragment>
                                <div className={classes['show-overlay']}></div>
                                <div className={classes.content}>
                                    <div className={classes.title}>
                                            <h1>{props.title}</h1>
                                            <div>
                                                <span className={favorite}><i  ref={(el) => {reference = el;} }  onClick={() => props.toggleFav(props.show)} className={icon}></i></span>
                                                <span>{props.year}</span>
                                            </div>
                                    </div>
                                    <div className={classes.rating_overlay}>
                                    <div className={classes.rating}>
                                        <h1><i className="fas fa-star"></i> {props.vote_average}<span>/10</span></h1>
                                        
                                    </div>
                                    </div>
                                    
                                </div>
                            </React.Fragment>
                            )
                        }
                    
                </div>
            </Link>
           

    );
};


export default Show;