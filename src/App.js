import React, { Component } from 'react';
import './App.css';
import { Switch, Route, Redirect  } from 'react-router-dom';

import Moviez from './containers/Moviez/Moviez';
import Home from './containers/Home/Home';
import Favorite from './containers/Favorite/Favorite';
import ShowDetails from './containers/ShowDetails/ShowDetails';


class App extends Component {

  render() {
    let routes = (
      <Moviez>
         <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/favorite' exact component={Favorite} />  
          <Route path='/movie/:id' exact component={ShowDetails}/>
          <Route path='/tv/:id' exact component={ShowDetails}/>
          <Redirect to='/' />
        </Switch>
      </Moviez>
     
    );

    return routes;

  }
 
}

export default App;
