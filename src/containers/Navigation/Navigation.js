import React from 'react';

import Header from '../../components/Header/Header';
import NavLeft from '../../components/NavLeft/NavLeft';
import Logo from '../../components/Logo/Logo';
import NavRight from '../../components/NavRight/NavRight';
import HamburgerMenu from '../../components/HamburgerMenu/HamburgerMenu';
import MobileNav from '../../components/MobileNav/MobileNav';
import Favorite from '../../components/NavRight/Favorite/Favorite';
import Search from '../../components/NavRight/Search/Search';
import { withRouter } from 'react-router-dom';
import classes from '../../components/MobileNav/MobileNav.module.css';

import { connect } from 'react-redux';

import * as actions from '../../store/actions/actions';



class Navigation extends React.Component {

    constructor(props) {
        super(props);
        this.showMobileNav = this.showMobileNav.bind(this);
        this.closeMobileNav = this.closeMobileNav.bind(this);
        this.searchShow = this.searchShow.bind(this);
        this.setActiveCategoryAndSearch = this.setActiveCategoryAndSearch.bind(this);
        this.setSearchTypeAndSearch = this.setSearchTypeAndSearch.bind(this);
        this.sortByHandler = this.sortByHandler.bind(this);
        this.navigateHome = this.navigateHome.bind(this);
        this.resetSearchTerm = this.resetSearchTerm.bind(this);
    }

    navigateHome() {
        if(this.props.match.url !== '/') {
            this.props.history.push('/');
        }
    }

    resetSearchTerm(term) {
        this.searchShow(term)
            .then(() => {
                this.navigateHome();
            })
            .catch((err) => {
                console.log("Error: ", err);
                
            })
        

    }

    setActiveCategoryAndSearch(id) {
           
        let options = {
          type: this.props.activeType,
          genre: id,
          sortBy: this.props.sortBy,
       };

       this.props.setActiveCategoryAndSearch(options)
            .then(() => {
                this.navigateHome(); 
            })
            .catch((err) => {
                console.log("Error: ", err);
                
            })


  
      }

      setSearchTypeAndSearch(type) {

        let options = {
          type: type,
        };

        this.props.setSearchTypeAndSearch(options)
            .then(() => {
                this.navigateHome(); 
            })
            .catch((err) => {
                console.log("Error: ", err);
                
            })

      }

      showMobileNav(e) {
        e.stopPropagation();
        
      
       
       this.props.showMobileNavHandler();
        
      }

      closeMobileNav() {
          this.props.closeMobileNavHandler();
     
      }


      searchShow(term) {        


        this.props.setSearchTerm(term);


        let options = {
          type: this.props.activeType,
          query: term.trim(),
          sortBy: this.props.sortBy,
          genre: this.props.activeCategory
        };

      
        

        return this.props.searchShow(options);

      }


      sortByHandler(e) {
        let sort = e.target.value;
        
        let options = {
          type: this.props.activeType,
          sortBy: sort,
          genre: this.props.activeCategory
        };

        
        this.props.sortByHandler(options)
            .then(() => {
                this.navigateHome(); 
            })
            .catch((err) => {
                console.log("Error: ", err);
                
            })


      }

      componentDidMount() {
        window.addEventListener('click', (e) => {
          
          
          let nav = document.querySelector('.' + classes.mobileNav);
          if(nav && e.target !== nav && !nav.contains(e.target)) {
            // Doesnt work in mozila
            // let mobile = e.path.indexOf(document.querySelector('.mobileNav'));
            
            if(this.props.showMobileNav /*&& mobile == -1*/) {
              this.closeMobileNav();
            }
            
          }
          
           
            
  
           
            
          });
  
      }



    render() {
        return (
            <React.Fragment>
                  <HamburgerMenu 
                    show={this.showMobileNav}
                  /> 

                <Header>
                    <NavLeft 
                        activeType={this.props.activeType} 
                        setSearchTypeAndSearch={this.setSearchTypeAndSearch}
                    />
                    <Logo title='Moviez' alt='Logo' resetSearchTerm={this.resetSearchTerm}/>
                    
                    {this.props.match.url !==  '/' ? (
                         <NavRight>
                            
                            <Favorite />
                        </NavRight>
                    ) 
                    
                        : (
                            <NavRight>
                              <li>
                                <Search searchTerm={this.props.searchTerm} search={this.searchShow}/>
                              </li>
                    
                              <Favorite />
                            </NavRight>
       
                        )
                    }
                    
                </Header>

                
                <MobileNav 
                    activeType={this.props.activeType} 
                    setSearchTypeAndSearch={this.setSearchTypeAndSearch}
                    setActiveCategoryAndSearch={this.setActiveCategoryAndSearch} 
                    activeCategory={this.props.activeCategory} 
                    genres={this.props.categories} 
                    close={this.closeMobileNav} 
                    show={this.props.showMobileNav}
                    sortByHandler={this.sortByHandler}
                    sortBy={this.props.sortBy}

                />
            </React.Fragment>
          
        )
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
      setActiveCategoryAndSearch: (options) => { return dispatch(actions.setActiveCategoryAndSearch(options)) },
      setSearchTypeAndSearch: (options) => { return dispatch(actions.setSearchTypeAndSearch(options))},
      sortByHandler: (options, f) => { return dispatch(actions.sortBy(options, f))},
      searchShow: (options) => { return dispatch(actions.searchShow(options)) },
      setSearchTerm: (term) => { return dispatch(actions.setSearchTerm(term)) },
      closeMobileNavHandler: () => { dispatch(actions.closeMobileNavCreator()) },
      showMobileNavHandler: () => { dispatch(actions.showMobileNavCreator()) },
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navigation));