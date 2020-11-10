export const setFavorite = (favs = []) => {
    
    localStorage.setItem('favs', JSON.stringify(favs));  
    
}


export const getFavorite = () => {
    let favs = [];
    if(localStorage.getItem('favs')) {
        favs = JSON.parse(localStorage.getItem('favs'));
    }

    return favs;
}