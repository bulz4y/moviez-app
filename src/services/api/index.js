
import axios from 'axios';

let url = `https://api.themoviedb.org/3`;
const API_KEY = `955c44d53268e005b4dfb1b5399d3f3b`;


let searchMovieUrl = `${url}/search/movie`;
let searchTvUrl = `${url}/search/tv`;
let genresMoviesUrl = `${url}/genre/movie/list`;
let genresTvUrl = `${url}/genre/tv/list`;
let movieByGenreUrl = `${url}/discover/movie`;
let tvByGenreUrl = `${url}/discover/tv`;

let movieDetails = `${url}/movie/`;
let tvDetails = `${url}/tv/`;



export const getShowDetails = (options) => {
    const params = {
        api_key: API_KEY,
        language: 'en_US',
        append_to_response: 'credits,videos,similar'
    };

    let show_type;
   
    switch(options.type) {
        case 'Movies':
            show_type = 'Movies';
            url = movieDetails + options.id;
            break;
        case 'TV Shows': 
            show_type = 'TV Shows';
            url = tvDetails + options.id;
            break;
      
    }

    let request = axios.get(url, {
        params: params
    });

    return (
        request
            .then((showDetails) => {

              
                
                showDetails.data.show_type = show_type;
                let details = showDetails.data;
                


                return details;
            
            })
             .catch((err) => {
                 console.log("Error: ", err);    
                 return err;          
             })
    )


    
}


export const searchWithCategoryAndSort = (options) => {

    
    const params = {
        api_key: API_KEY,
        language: 'en_US'
    };


    if(options.page) {
        params.page = options.page;
    }

    if(options.genre && options.genre !== -100) {
        params.with_genres = options.genre;
    }
    

    switch(options.sortBy) {
        case '1':
            params.sort_by = 'popularity.desc';
            break;
        case '2':
            params.sort_by = 'release_date.desc';
            break;
        case '3':
            params.sort_by = 'original_title.desc';
            break;
    }

    
   
    switch(options.type) {
        
        case 'Movies':
            return searchMoviesWithParams(params);
        case 'TV Shows': 
            return searchTvWithParams(params);
    }

  

}


export const searchWithQuery = (options) => {
    const params = {
        api_key: API_KEY,
        language: 'en_US'
    };



    if(options.page) {
        params.page = options.page;
    }

    
    

    switch(options.type) {
        case 'Movies':
            if(options.query === '') {
                const { query, ...params } = options;
                return searchWithCategoryAndSort(params);
            } else {
                params.query = options.query;
                return searchMovie(params);
            }
        case 'TV Shows':
            if(options.query === '') {
                const { query, ...params } = options;
                return searchWithCategoryAndSort(params);
            } else {
                params.query = options.query;
                return searchTv(params);
            }
        
       

    }
}


export const searchMovie = (params) => {
     
    let request = axios.get(searchMovieUrl, {
        params: params
    });
 
  return (
      request
          .then((res) => {
           
            for(let i = 0; i < res.data.results.length; i++) {
                res.data.results[i].show_type='Movies';
            }
              let movies = [...res.data.results];
              
              return movies;           
          })
          .catch((err) => {
            console.log("Error: ", err);           
          })
  )
     
}


export const searchTv = (params) => {
  let request = axios.get(searchTvUrl, {
      params: params
     
  })

  return (
      request
          .then((res) => {
            for(let i = 0; i < res.data.results.length; i++) {
                res.data.results[i].show_type='TV Shows';
            }
            
              let tv = [...res.data.results];
              
              return tv;           
          })
          .catch((err) => {
            console.log("Error: ", err);           
          })
  )
  
}




       
export const getGenres = (options) => {
    const params = {
        api_key: API_KEY,
        language: 'en_US'
    };

    switch(options.type) {
        case 'Movies':
            return getMoviesGenres(params)
        case 'TV Shows':
            return getTvGenres(params);
        
    }
}

export const getMoviesGenres = (params) => {
    let genres = [];
    let request = axios.get(genresMoviesUrl, {
        params: params      
    })

    return (
        request
            .then((res) => {
            
                genres = [...res.data.genres];
                genres.unshift({id: -100, name: 'Popular'})

                return genres;
            })
            .catch((err) => {
                console.log("Error: ", err);
            })
    )
}
    


export const getTvGenres = (params) => {
    let genres = [];
    let request = axios.get(genresTvUrl, {
        params: params

    })

    return (
        request
            .then((res) => {
                genres = [...res.data.genres];
                genres.unshift({id: -100, name: 'Popular'})
                return genres;
            })
            .catch((err) => {
                console.log("Error: ", err);
            })
    )
 
}



export const searchMoviesWithParams = (params) => {
   
    let request = axios.get(movieByGenreUrl, {
       params: params

    })

    return (
        request
            .then((res) => {
                
                for(let i = 0; i < res.data.results.length; i++) {
                    res.data.results[i].show_type='Movies';
                }
                let movies = [...res.data.results];
                return movies;           
            })
            .catch((err) => {
            console.log("Error: ", err);           
            })
    )
     
}


export const searchTvWithParams = (params) => {
    let request = axios.get(tvByGenreUrl, {
        params: params
    })

    return (
        request
            .then((res) => {
               
                
                for(let i = 0; i < res.data.results.length; i++) {
                    res.data.results[i].show_type='TV Shows';
                }
                let tv = [...res.data.results];
                return tv;           
            })
            .catch((err) => {
            console.log("Error: ", err);           
            })
        )
  
}



