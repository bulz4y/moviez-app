import React from 'react';
import classes from './ShowDetail.module.css';

import imgDefault from '../../assets/default.jpg';

import Show from '../Show/Show';

import Modal from '../../components/Modal/Modal';
import Video from '../Video/Video';

const showDetail = (props) => {
    let genres = props.data.genres;

    let runtime;

    
    if(props.data.show_type === 'Movies') {
        runtime = props.data.runtime;
    } else {
        if(props.data.episode_run_time.length > 0) {
            runtime = props.data.episode_run_time[0];
        } else {
            runtime = 0;
        }
    }
    
    let cast = props.data.credits.cast;
    let similar = props.data.similar.results;

    let videos = props.data.videos.results;
    let video = null;

    for(let i = 0; i < videos.length; i++) {
        
        if(videos[i].type === 'Trailer') {
            video = videos[i];
            break;
        }
    }


    if(!video) {
        video = videos[0];
    }
    
    let img = `https://image.tmdb.org/t/p/original/`;

    return (
        <React.Fragment>
            {props.showVideo ? (
                <Modal setShowVideo={props.setShowVideo}>
                    <Video setShowVideo={props.setShowVideo} title={props.data.title || props.data.name} video={video}/>
                   
                </Modal>
            ) : null}
            <div className="container">
                <div className={classes.details}>
                    <div className="row">
                        <div className="col-12">
                            <section className={classes.background}>
                                <img src={props.data.backdrop_path ? img+props.data.backdrop_path : imgDefault} alt={props.data.title} />
                                <div className={classes['bg-overlay']}></div>
                                <div className={classes.video}>
                                    <i onClick={() => props.setShowVideo(true)} className="fas fa-play-circle"></i>
                                </div>
                                <div className={classes['background-title']}>
                                    {props.data.title || props.data.name}
                                </div>          
                            </section>
                        </div>
                    </div>
              

                <div className="row">
                    <div className={classes['show-info'] + " col-12"}>
                            <p className={classes['show-rating']}>
                                <i className="fas fa-star"></i> {props.data.vote_average ? props.data.vote_average : 0}<span>/10</span>
                            </p>

                        <section className={classes['show-genre']}>
                            <p>
                                
                                {runtime >= 0 ? runtime + "min  |  " : ''}
                                {genres.map((genre, i) => {
                                    
                                    
                                    if(i !== genres.length - 1) {
                                        return genre.name + ', ';
                                    } else {
                                        return genre.name;
                                    }
                                        
                                })}

                                {"  |  " + ((props.data.release_date || props.data.first_air_date) ? props.data.release_date || props.data.first_air_date : '') }
                            </p>
                        
            
                        

                        
                        </section>
                    </div>
                </div>
             

                <div className="row">
                    <div className="col-12">
                        <section className={classes['show-overview']}>
                            <h1 className={classes.heading}>Overview</h1>
                            <p className={classes.unknown}>{props.data.overview ? props.data.overview : 'No overview'}</p>
                        </section>     
                    </div>
                </div>
              


                
                        
                        <div className={classes['show-cast'] + " row"}>
                            <div className="col-12">
                                <h1 className={classes.heading}>Cast</h1>
                            </div>
                                
                                {cast.length === 0 ? (
                                    <div className="col-12">
                                        <p className={classes.unknwon}>Unknown Cast</p>
                                    </div>
                                    
                                ) : 
                                <div className={classes.scrollbar}>
                                    {
                                         cast.map((c,index) => {
                                            return (
                                                
                                            
                                                  
                                                    <div  key={index} className={classes['scrollbar-item'] + ' col-lg-2 col-md-4 col-xs-4 col-xss-6'}>
                                                           
                                                            
                                                            <div>
                                                            <img style={{width: '100%'}} src={c.profile_path ? (`https://image.tmdb.org/t/p/w300/`) + c.profile_path : imgDefault} alt={c.name}/>                                                             
                                                                    <p className={classes['cast-name']}>{c.name}</p>     
                                                                    <p className={classes.character}>{c.character}</p>
                                                            </div>
                                                    </div>
    
                                                        
                                                 
                                   
                                                   

                                                    
                                                         
                                              
                                            );
                                        })
                                    }
                                </div>
                                   
                                }
                               
                                
                            </div>

                            <div className='row'>
                                <div className="col-12">
                                    <h1 className={classes.heading}>Similar Shows</h1>
                                </div>

                                {similar.length === 0 ? (
                                    <div className="col-12">
                                        <p className={classes.unknown}>Unknown Similar Shows</p>
                                    </div>
                                ) :
                                <div className={classes.scrollbar}>
                                    {
                                        similar.map((item, index) => {
                                            let poster_path = item.poster_path ? `https://image.tmdb.org/t/p/w500/${item.poster_path}` : imgDefault;
                                            let year = item.release_date || item.first_air_date || "";
                                    
                                            let favorite = false;
                    
                                            for(let i = 0; i < props.favs.length; i++) {
                                                if(props.favs[i].id === item.id) {
                                                    favorite = true;
                                                    break;
                                                }
                                            }
                                            return (
                                                
                                                <div key={item.id} className={classes['scrollbar-item'] + ' col-lg-2 col-md-4 col-xs-4 col-xss-6'}>
                                                    
                                                        <Show
                                                            id={item.id}
                                                            toggleFav={props.toggleFav} 
                                                            show={item}
                                                            // type={props.data.show_type}
                                                            type={props.data.show_type}
                                                            favorite={favorite}
                                                            poster_path={poster_path}
                                                            title={item.title || item.name}
                                                            year={year && new Date(item.release_date || item.first_air_date).getFullYear().toString()}
                                                            vote_average={item.vote_average}
                                                        />
                                                  
                                                </div>
                                                
                                            );
                                        })
                                    }
                                    
                                </div>
                                
                                }
                              
                                
                                
                            </div>
                
                </div>
              
            </div>
            
        </React.Fragment>
    )
};

export default showDetail;