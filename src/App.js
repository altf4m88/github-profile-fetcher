import React, {Component} from 'react';
import './App.css';
import Nav from './Components/Nav/Nav';
import Main from './Components/GitHub/Main';
import Data from './Components/GitHub/Data';
import Profile from './Components/GitHub/Profile';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';

//store
import {createStore} from 'redux';
import rootReducer from './Store/Reducers';


class App extends Component{
  constructor(props){
    super(props);
    this.state = {

    };

    this.store = createStore(
      rootReducer,
      window.__REDUX_DEVTOOLS_EXTENSION__&&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    );
  }

  render(){
    return(
      <React.Fragment>
        <Provider store={this.store}>
        
        <Router>
        <Nav store={this.store}/>
          <Route exact path='/' component={Main} /> 
          <Route exact path='/search/:id' component={Data}/>
          <Route exact path='/profile/:login' component={Profile}/>
        </Router>
        </Provider>
      </React.Fragment>
    );
  }
}

export default App;