import React from 'react';
import Navigation from '../Navigation/Navigation';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/actions';
import Loader from '../../components/Loader/Loader';
import ShowDetail from '../../components/ShowDetail/ShowDetail';


class ShowDetails extends React.Component {

    constructor(props) {
        super(props);
        this.unlisten = null;
    }

    componentWillUnmount() {
        this.unlisten();
    }
    componentDidMount() {
        this.unlisten = this.props.history.listen((location) => {
           
           
            
            if(location.pathname.split('/')[2] && location.pathname.split('/')[2] !== this.props.match.params.id) {
                let id = location.pathname.split('/')[2];
                let type = location.pathname.split('/')[1] === 'movie'  ? 'Movies' : 'TV Shows';
               
                
                const options = {
                    type: type,
                    id: id
                };
        
                this.props.setShowDetails(options)
                    .then((err) => {
                        if(err) {
                            this.props.history.push('/');
                        }
                        
                    })
                
                    .catch((err) => {
                        this.props.history.push('/');
                        console.log("Error: ", err);
                        
                    })
             

                document.documentElement.scrollTop = 0;
            }
            
        })
        
     
        
        let id = this.props.match.params.id;
        let type = this.props.match.url.split('/')[1] === 'movie' ? 'Movies' : 'TV Shows';

     
        
        

        
        const options = {
            type: type,
            id: id
        };

        this.props.setShowDetails(options)
        .then((err) => {
            if(err) {
                this.props.history.push('/');
            }
            
        })
    
        .catch((err) => {
            this.props.history.push('/');
            console.log("Error: ", err);
            
        })

        document.documentElement.scrollTop = 0;
       
    }

    render() {
        let  data = <Loader />;
       
        
        if(!this.props.loading) {
            if(this.props.showDetails) {
                data = (
                    <ShowDetail  showVideo = {this.props.showVideo} setShowVideo={this.props.setShowVideo} type={this.props.activeType} toggleFav={this.props.toggleFav} favs={this.props.favs} data={this.props.showDetails} />
                )
            }
          
        }

        return (
            <React.Fragment>
                <Navigation />

                {data}
    
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
        setShowDetails: (options) => { return dispatch(actions.setShowDetails(options)) },
        setShowVideo: (bool) => {return dispatch(actions.setShowVideo(bool))},
        toggleFav: (id) => {return dispatch(actions.toggleFav(id))},
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ShowDetails);