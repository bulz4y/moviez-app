import React from 'react';
import classes from './Modal.module.css';

import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => {
    return (
        <React.Fragment>
            <Backdrop setShowVideo={props.setShowVideo}/>
            <div className={classes.modal}>
               
                {props.children}
            </div>
            

        </React.Fragment>
    )
}

export default modal;