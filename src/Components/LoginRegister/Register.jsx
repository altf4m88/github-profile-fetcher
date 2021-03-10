import React, {Component} from 'react';
import axios from 'axios';

class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            errors: '',
        };
    }

    onChange = (e) => {
        this.setState({[e.target.name] : e.target.value});
    };

    register = (e) => {
        e.preventDefault();
        this.setState({[e.target.name] : e.target.value});
        const data = {
            name: this.state.name,
            password: this.state.password,
            email: this.state.email,
        }

        axios.post(`${this.props.URL}/register`, {data})
        .then(res => {
            const err = res.data.message;
            this.setState({errors : err})
            if(!err){
                alert('New User registered');
                const email = this.state.email;
                const password = this.state.password;
                this.setState({email : email, password: password});
            }
        })
        .catch( err => console.error(err));

    }

    render(){
        return (
            <React.Fragment>
                { this.state.errors ?
                <div className="p-3 alert alert-danger" role="alert">
                {this.state.errors}</div> : '' 
                }
                <hr></hr>                                                                   
                <form className="form-register">
                    <h4 className="h3 mb-3 font-weight-normal grey">Register</h4>
                    <input value={this.state.name} onChange={this.onChange} name="name" type="text" className="form-control" placeholder="Name" />
                    <input value={this.state.email} onChange={this.onChange} type="email" name="email" className="form-control" placeholder="Email Address"/>
                    <input value={this.state.password} onChange={this.onChange}  type="password"  name="password" className="form-control"  placeholder="Password" />
                    <button  onClick={ this.register }  className="btn btn-md btn-success btn-block" type="submit">Register</button>
                </form>
            </React.Fragment>
        );
    }
}

export default Register;