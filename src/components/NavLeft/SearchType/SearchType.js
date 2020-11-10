import React from 'react';
import './SearchType.css';
import { Link } from 'react-router-dom';

const searchType = (props) => {
    

    
    let active = '';
   
    
    if(props.title === props.activeType)  {
        active = 'active'
    }

    return (
      
     <li className={'searchType ' + active } onClick={() => { return props.setSearchTypeAndSearch(props.title)}}>
        <Link to="/">
       
            <div>
                <i className={props.icon}></i>
            </div>
            
            <div>
                <span>{props.title}</span>
            </div>
    
        </Link>
       
    </li>
       
    
    );
};

export default searchType;
