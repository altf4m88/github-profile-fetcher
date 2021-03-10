import React, {Component} from 'react';
import Login from './Login';
import Register from './Register';

const PORT = process.env.PORT || 3000;
const URL = `http://localhost:${PORT}/api/users`


class MainPage extends Component{
    constructor(props){
        super(props);
        this.state = {

        };
    }

    render(){
        return (
            <React.Fragment>
                <center>
                    <section className="Specific">
                        <div className="main" id="main">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12 col-md-12">  
                                        <Login props={this.props} URL={URL}/>
                                        <Register props={this.props} URL={URL}/>       
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </center>
            </React.Fragment>
        );
    }
}

export default MainPage;