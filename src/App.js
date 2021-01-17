import React, {Component} from 'react';
import './App.css';
import Nav from './Components/Nav/Nav';
import Main from './Components/GitHub/Main';
import Data from './Components/GitHub/Data';
import Profile from './Components/GitHub/Profile';
import {BrowserRouter as Router, Route} from 'react-router-dom';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {

    };
  }

  render(){
    return(
      <React.Fragment>
        <Nav />
        <Router>
          <Route exact path='/' component={Main} /> 
          <Route exact path='/search/:id' component={Data}/>
          <Route exact path='/profile/:login' component={Profile}/>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;