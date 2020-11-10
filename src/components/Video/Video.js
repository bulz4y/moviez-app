import React from 'react';

import classes from './Video.module.css';

const video = (props) => {
    return (
        <div className={classes['video-player']}>
            <div className={classes.title}>
                <p>{props.title}</p>
                <span className={classes.close}><i onClick={() => {props.setShowVideo(false)}} className="far fa-window-close"></i></span>
            </div>
            {props.video ? (
                <iframe style={{width: '100%', height: '300px'}} src={`https://www.youtube.com/embed/${props.video.key}`} frameBorder="0" allowFullScreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />
            ) : (
                <h1 style={{background: '#000', height: '300px'}}>No Video Found.</h1>
            ) }
            
            
        </div>
    )
};

export default video;