import {searchWithCategoryAndSort, getGenres, searchWithQuery, getShowDetails} from  '../../services/api/index';
import * as actionTypes from './actionTypes';
import { resetScrollPage } from '../../shared/infiniteScroll/index';
import { getFavorite } from '../../shared/favorite/index';



export const setShowDetailsData = (data) => {
    return {
        type: actionTypes.SET_SHOW_DETAILS,
        data: data
    }
}

export const setShowVideo = (bool) => {
    return {
        type: actionTypes.SET_SHOW_VIDEO,
        data: {showVideo: bool}
    };
}

export const setShowDetails = (options) => {
    return (dispatch) => {
        dispatch(setLoading(true));
        return getShowDetails(options)
            .then((details) => {
                


           

                if(details instanceof Error) {
                    dispatch(setLoading(false));
                    return details;
                }
               

                let d = {
                    showDetails: details,
                    loading: false
                }
               dispatch(setShowDetailsData(d));

             
            }) 
            .catch((err) => {
                
               
                dispatch(setLoading(false));
                console.log("Error: ", err);
                return err            
            })
    }
}



export const setFavs = () => {
    let favs = getFavorite();
    return {
        type: actionTypes.SET_FAVS,
        data: {favs: favs}
    };
}

export const toggleFav = (show) => {

    return {
        type: actionTypes.TOGGLE_FAV,
        show: show
    };
}


export const setInitialData = (initialData) => {
    return {
        type: actionTypes.SET_INITIAL_DATA,
        data: initialData
    }
}

export const setLoading = (bool) => {
    return {
        type: actionTypes.SET_LOADING,
        data: {loading: bool}
    }
}



export const showMobileNavCreator = () => {
    return {
        type: actionTypes.SHOW_MOBILE_NAV,
        data: {showMobileNav: true}
    }
}

export const closeMobileNavCreator = () => {
    return {
        type: actionTypes.CLOSE_MOBILE_NAV,
        data: {showMobileNav: false}
    }
}

export const fetchData = (options) => {

    
    return (dispatch) => {
        dispatch(setLoading(true));
      
        
        searchWithCategoryAndSort(options)
        .then((data) => {
            getGenres(options)
              .then((genres) => {    
                
              let initialData = {
                categories: genres,
                activeCategory: options.genre || genres[0].id,
                activeType: options.type,
                data: data,
                loading: false,
                searchTerm: '',
                showMobileNav: false
              };

              dispatch(setInitialData(initialData));

              })
              .catch((err) => {
                dispatch(setLoading(false));
                  console.log("Error: ", err);                 
              })
         })
         .catch((err) => {
            console.log("Error: ", err);           
         })
    }
   
};

export const setActiveCategoryAndSearchData= (data) => {
    return {
        type: actionTypes.SET_ACTIVE_CATEGORY_AND_SEARCH_DATA,
        data: data
    };
};


export const setActiveCategoryAndSearch = (options) => {
    
    return (dispatch) => {
        dispatch(setLoading(true));
        return searchWithCategoryAndSort(options)
        .then((res) => {  

          resetScrollPage();

          let data = [...res]; 


          let d = {
              data: data,
              activeCategory: options.genre,
              searchTerm: '',
              loading: false,
              showMobileNav: false
          };

          dispatch(setActiveCategoryAndSearchData(d));

        })
        .catch((err) => {
            dispatch(setLoading(false));
          console.log("Error: ", err);               
        })
    }
}


export const setSearchTypeAndSearchData = (data) => {
    return {
        type: actionTypes.SET_SEARCH_TYPE_AND_SEARCH_DATA,
        data: data
    };
}

export const setSearchTypeAndSearch = (options) => {
    return (dispatch) => {
        dispatch(setLoading(true));
        return getGenres(options)
        .then((genres) => {
            let o = {
              type: options.type,
              sortBy: '1',
            };

          return searchWithCategoryAndSort(o)
            .then((res) => {          
              resetScrollPage();
              let data = [...res];   

              let d = {
                data: data,
                categories: genres,
                activeCategory: genres[0].id,
                sortBy: '1',
                activeType: options.type,
                searchTerm: '',
                loading: false,
                showMobileNav: false
              };

              
            
             dispatch(setSearchTypeAndSearchData(d));

            
        
            })
            .catch((err) => {
                dispatch(setLoading(false));
              console.log("Error: ", err);               
            })
        })
        .catch((err) => {
            dispatch(setLoading(false));
          console.log("Error: ", err);
          
        })
    }
}

export const setSearchTerm = (term) => {
    return {
        type: actionTypes.SET_SEARCH_TERM,
        data: {searchTerm: term}
    };
}

export const sortByCreator = (data) => {
    return {
        type: actionTypes.SORT_BY,
        data: data
    };
}


export const sortBy = (options) => {
    return (dispatch) => {
        dispatch(setLoading(true));
       return searchWithCategoryAndSort(options)
        .then((res) => {
          resetScrollPage();
          let data = [...res];  
       
        
          let d = {
            data: data,
            sortBy: options.sortBy,
            searchTerm: '',
            loading: false
          };

          dispatch(sortByCreator(d));

        })
        .catch((err) => {
            dispatch(setLoading(false));
          console.log("Error: ", err);               
    })
        
    }
}

export const searchShowCreator = (data) => {
    return {
        type: actionTypes.SEARCH_MOVIES,
        data: data
    };
}


export const searchInfiniteScrollData = (data) => {
    return {
        type: actionTypes.SEARCH_INFINITE_SCROLL_DATA,
        data: data
    };
}

export const searchInfiniteScrollInput = (options) => {
    return (dispatch, getState) => {
        searchWithQuery(options)
            .then((res) => {
          
               
              let data = [...(getState().data) ,...res];   

              let o = {
                  data: data,
              };
              dispatch(searchInfiniteScrollData(o));
            })
            .catch((err) => {
            
              console.log("Error: ", err);
              
            })
    }
}

export const searchInfiniteScroll = (options) => {
    return (dispatch, getState) => {
        
        searchWithCategoryAndSort(options)
            .then((res) => {
          
                
              let data = [...(getState().data) ,...res];   
            
              let o = {
                  data: data,
                  
              };
              dispatch(searchInfiniteScrollData(o));
            })
            .catch((err) => {
                
              console.log("Error: ", err);
              
            })
    }
}

export const searchShow = (options) => {
    return (dispatch) => {
        
      return searchWithQuery(options)
        .then((res) => {
          
          resetScrollPage();
          let data = [...res];   

          let o = {
              data: data,
          };
          
          dispatch(searchShowCreator(o));

        })
        .catch((err) => {
          console.log("Error: ", err);         
        })
    }
}

