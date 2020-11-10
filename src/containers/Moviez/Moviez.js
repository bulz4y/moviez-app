import React from 'react';

import { connect } from 'react-redux';

import * as actions from '../../store/actions/actions';



class Moviez extends React.Component {

      componentDidMount() {


        this.props.setFavs();

        let options = {
          type: this.props.activeType,
          genre: this.props.activeCategory,
        }
  
        this.props.fetchData(options)

      }

    render() {       
        return this.props.children;
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
      setFavs: () => { return dispatch(actions.setFavs()) },
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Moviez);