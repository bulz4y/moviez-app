import React from 'react';

import Show from '../../components/Show/Show';

import imgDefault from '../../assets/default.jpg';


import { connect } from 'react-redux';

import * as actions from '../../store/actions/actions';
import Navigation from '../Navigation/Navigation';


class FavoritePage extends React.Component {

    render() {
     
        
        let favs = <h1 style={{textAlign: 'center', marginTop: '4rem'}}>No Favorites Found...</h1>  

        if(this.props.favs.length > 0) {
            favs = this.props.favs.map((item, index) => {

                let poster_path = item.poster_path ? `https://image.tmdb.org/t/p/w500/${item.poster_path}` : imgDefault;
                let year = item.release_date || item.first_air_date || "";

                let favorite = false;

                for(let i = 0; i < this.props.favs.length; i++) {
                  if(this.props.favs[i].id === item.id) {
                    favorite = true;
                    break;
                  }
                }

  
                

                return (
                  <div key={index} className='col-lg-2 col-md-3 col-xs-4 col-xss-6'>
                      <Show 
                        id={item.id}
                        toggleFav={this.props.toggleFav} 
                        poster_path={poster_path}
                        show={item}
                        type={item.show_type}
                        favorite={favorite}
                        title={item.title || item.name}
                        year={year && new Date(item.release_date || item.first_air_date).getFullYear().toString()}
                        vote_average={item.vote_average}
                      /> 
                  </div>    
                )
              });
          favs = (
              <div className="row clearfix">
                  {favs}
              </div>
          )
        }

        return (
            <React.Fragment>
     
                <Navigation />
                
                {favs}

      
            </React.Fragment>
        )
    }
};


const mapStateToProps = (state) => {
    return {
      ...state
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      toggleFav: (id) => {return dispatch(actions.toggleFav(id))},
    }

};

export default connect(mapStateToProps, mapDispatchToProps)(FavoritePage);