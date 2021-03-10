import React, {Component} from 'react';
import './App.css';
import Nav from './Components/Nav/Nav';
import Main from './Components/GitHub/Main';
import Data from './Components/GitHub/Data';
import Profile from './Components/GitHub/Profile';
import Favourite from './Components/Favourite/Favourite';
import MainPage from './Components/LoginRegister/MainPage';

import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';

import {registerUserState} from './Store/Actions'

//store
import {createStore} from 'redux';
import rootReducer from './Store/Reducers';


class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      isAuthenticated : false
    };

    this.store = createStore(
      rootReducer,
      window.__REDUX_DEVTOOLS_EXTENSION__&&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    );
  }

  logout = () => {
    localStorage.removeItem('Token');
    this.store.dispatch(registerUserState(false));
    this.setState({isAuthenticated: false});
  }

  render(){
    return(
      <React.Fragment>
        <Provider store={this.store}>
          <Router>
            <Nav Logout={this.logout} store={this.store}/>
            <Route exact path='/' component={Main} /> 
            <Route exact path='/search/:id' component={Data}/>
            <Route exact path='/profile/:login' component={Profile}/>
            <Route exact path='/favourite' component={Favourite}/>
            <Route exact path='/login' component={MainPage}/>
          </Router>
        </Provider>
      </React.Fragment>
    );
  }
}

export default App;