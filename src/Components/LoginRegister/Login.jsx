import React, {Component} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import { registerUserState } from '../../Store/Actions';


class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email : '',
            password : '',
            errors: ''
        };
    }

    onChange = (e) => {
        this.setState({[e.target.name] : e.target.value});
    };

    login = (e) => {
        e.preventDefault();
        this.setState({[e.target.name] : e.target.value});
        const data = {
            password: this.state.password,
            email: this.state.email,
        }

        axios.post(`${this.props.URL}/login`, {data})
        .then((res) => {
            if(res['data']){
                localStorage.setItem('Token', res.data.token);
                this.props.registerUserState(true);
                this.props.props.history.push('/profile')
            } else if(!res) {
                const err = res.data.message;
                this.setState({error: err});
            }
        })
        .catch(err => this.setState({error: 'Check your email and password'}));
    }

    render(){
        return (
            <React.Fragment>   
                { this.state.error ?
                <div className="p-3 alert alert-danger" role="alert">
                    {this.state.error}</div> : '' 
                } 
                <hr></hr>                         
                <form className="form-signin">
                    <h4 className="h3 mb-3 font-weight-normal grey">Sign In</h4>
                    <input value={this.state.email} onChange={this.onChange} type="email" name="email" className="form-control" placeholder="Email address"/>
                    <input value={this.state.password} onChange={this.onChange} type="password" name="password"className="form-control" placeholder="Password"/>
                    <button onClick={this.login}  className="btn btn-md btn-primary btn-block" type="submit">Sign in</button>
                </form>
            </React.Fragment>
        );
    }
}


Login.propTypes = {
    registerUserState: PropTypes.func.isRequired,
    Users: PropTypes.object.isRequired
}
  
const mapStateToProps = ( state ) => ({
    Users: state.Users
});
  
export default connect(mapStateToProps, { registerUserState })(Login);

