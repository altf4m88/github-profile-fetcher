import React, {Component} from 'react';
import './App.css';
import Nav from './Components/Nav/Nav';
import Main from './Components/GitHub/Main';

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
        <Main />
      </React.Fragment>
    );
  }
}

export default App;