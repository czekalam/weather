import React, { Component } from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import '../style/reset.css';
import '../style/App.css';
import Search from './Search';
import Main from './Main';
import {DetailsContainer} from './Details';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

library.add(faSearch);

class App extends Component {
  render() {
    return (
      <div className="app container">
        <Router>
          <div>
            <Route path='/' component={Search}/>
            <Route exact path='/' component={Main}/>
            <Route exact path='/:city' component={DetailsContainer}/> 
          </div>
        </Router>
      </div>
    );
  }
}
export default App;