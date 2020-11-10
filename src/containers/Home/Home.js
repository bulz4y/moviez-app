import React, { Component } from 'react';

import imgDefault from '../../assets/default.jpg';

import { scrollPage, maxScrollPage, incrementScrollPage, setScrollPostiion, getScrollPosition } from '../../shared/infiniteScroll/index';

import Navigation from '../Navigation/Navigation';
import Loader from '../../components/Loader/Loader';
import Show from '../../components/Show/Show';


import { connect } from 'react-redux';

import * as actions from '../../store/actions/actions';



class Home extends Component {

    constructor(props) {
        super(props);
        this.infiniteScroll = this.infiniteScroll.bind(this);
        this.scrollEventListener = this.scrollEventListener.bind(this);
        
      }
    

      scrollEventListener(e) {
        
        // let el = e.target.scrollingElement || e.target;
        let el = e.target.documentElement;
        

        if(el.scrollHeight - el.scrollTop <= el.clientHeight + 200 && scrollPage <= maxScrollPage && el.scrollTop > getScrollPosition()) {
          
          
          let options = {
            type: this.props.activeType,
            genre: this.props.activeCategory,
            sortBy: this.props.sortBy,
            page: incrementScrollPage()
          };

          if(this.props.searchTerm !== '') {
            options = {
              type: this.props.activeType,
              query: this.props.searchTerm,
              page: incrementScrollPage()
            };

            
            this.props.searchInfiniteScrollInput(options);
          
          } else {
            this.props.searchInfiniteScroll(options);
   
          }
                      
        }

        setScrollPostiion(el.scrollTop);
        
      }


      infiniteScroll() {
          // Add scroll listener for infinite scrolling
          window.addEventListener('scroll', this.scrollEventListener); 
      }

      componentWillUnmount() {
          // Remove scroll listener
          window.removeEventListener('scroll', this.scrollEventListener);
      }

    
      componentDidMount() {
    
        this.infiniteScroll()

      }



   

    render() {
        
          let data = <Loader />
         
     
        
          if(!this.props.loading) {
            if(this.props.data.length > 0) {
              data = this.props.data.map((item, index) => {

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
                                key={index}
                                show={item}
                                type={item.show_type}
                                favorite={favorite}
                                poster_path={poster_path}
                                title={item.title || item.name}
                                year={year && new Date(item.release_date || item.first_air_date).getFullYear().toString()}
                                vote_average={item.vote_average}
                              />  

                          </div>
                                 
                        )
                      });
                  data = (
                      <div className="row clearfix">
                          {data}
                      </div>
                  )
            } else {
              data = (
                   <h1 style={{textAlign: 'center', marginTop: '2rem'}}>No Results Found.</h1>    
                 
              )
            }
        }
        
        
        return (
           
            
            <React.Fragment>
                    <Navigation />
                          
                    {data}
                      
                     
              </React.Fragment>

        );
    }
}

const mapStateToProps = (state) => {
  return {
    ...state
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
      fetchData: (options) => { return dispatch(actions.fetchData(options))},
      searchInfiniteScroll: (options) => { return dispatch(actions.searchInfiniteScroll(options))},
      searchInfiniteScrollInput: (options) => { return dispatch(actions.searchInfiniteScrollInput(options))},
      setFavs: () => { return dispatch(actions.setFavs()) },
      toggleFav: (id) => {return dispatch(actions.toggleFav(id))},
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Home);