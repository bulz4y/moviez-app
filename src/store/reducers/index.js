import * as actionTypes from '../actions/actionTypes';
import { setFavorite } from '../../shared/favorite';

const initialState = {
    data: [],
    categories: [],
    searchTerm: '',
    activeCategory: null,
    activeType: 'Movies',
    sortBy: '1',
    loading: true,
    favs: [],
    showMobileNav: false,
    showDetails: null,
    showVideo: false
  }

  const updateObject = (state, action) => {
     
      return {
          ...state,
          ...action.data
      }
  };



  const toggleFav = (state, action) => {
    let id = action.show.id;
      
    let exist = false;

     let favs = [...state.favs];

     for(let i = 0; i < favs.length; i++) {
         if(favs[i].id === id) {
             favs.splice(i, 1);
             exist = true;
             break;
         }
     }

   
     if(!exist) {
        favs.push(action.show);
        // for(let i = 0; i < state.data.length; i++) {
        //     if(state.data[i].id === id) {
                
        //         break;
        //     }
        // }
     }


    setFavorite(favs);

    return {data: {favs: favs}};
  }


const reducer = (state = initialState, action) => {
      switch(action.type) {
          case actionTypes.SET_INITIAL_DATA : return updateObject(state, action)
          case actionTypes.SET_ACTIVE_CATEGORY_AND_SEARCH_DATA : return updateObject(state, action)
          case actionTypes.SET_SEARCH_TYPE_AND_SEARCH_DATA : return updateObject(state, action);
          case actionTypes.SORT_BY : return updateObject(state, action);
          case actionTypes.SEARCH_MOVIES : return updateObject(state, action);
          case actionTypes.SET_SEARCH_TERM : return updateObject(state, action);
          case actionTypes.SET_LOADING : return updateObject(state, action);
          case actionTypes.SEARCH_INFINITE_SCROLL_DATA : return updateObject(state, action);
          case actionTypes.SET_FAVS : return updateObject(state, action);
          case actionTypes.TOGGLE_FAV : return updateObject(state, toggleFav(state,action));
          case actionTypes.SHOW_MOBILE_NAV : return updateObject(state, action)
          case actionTypes.CLOSE_MOBILE_NAV : return updateObject(state, action)
          case actionTypes.SET_SHOW_DETAILS: return updateObject(state, action)
          case actionTypes.SET_SHOW_VIDEO : return updateObject(state, action);
         
            
  };

  return state;
}

export default reducer;