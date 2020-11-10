import React from 'react';


const close = (props) => {
    return (
        <li onClick={props.close}>
                <i style={{fontSize: '2.5rem'}} className="far fa-window-close"></i>
        
        </li>
    );
};

export default close;