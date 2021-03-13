import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Nav extends Component{
    constructor(props){
        super(props);
        this.state = { isAuthenticated : false };
    }

    async componentDidMount(){
        await this.props.store.subscribe(() => {
            this.setState({
                isAuthenticated: this.props.store.getState()['Users']['isAuthenticated'],
            })
        })
    }

    logout = () => {
        this.props.Logout()
    }

    render(){
        return(
            <React.Fragment>
                <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
                    <h5 className="my-0 mr-md-auto font-weight-normal">GitHub Profile Fetcher</h5>
                    <nav className="my-2 my-md-0 mr-md-3">
                        <Link to='/favourite' className='p-2 text-dark'>
                            <i className="fas fa-heart"></i> Favorites
                        </Link>
                    </nav>
                    {this.state.isAuthenticated ?
                    <Link to='/user-profile' className='p-2 text-dark'>
                        <i className="fas fas-user"></i> Profile
                    </Link> : ''}
                    {this.state.isAuthenticated ?
                    <button onClick={this.logout} className="btn btn-outline-danger">Logout</button> :
                    <Link to='/login' className="p-2 text-dark">
                        <button className="btn btn-outline-primary">Sign Up</button>
                    </Link>
                    }
                </div>
            </React.Fragment>
        );
    }
}

export default Nav;