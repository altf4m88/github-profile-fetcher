import React, {Component} from 'react';
import axios from 'axios';
import {confirm} from './Confirm';

const PORT = process.env.PORT || 3000;
const URL = `http://localhost:${PORT}/api/users`


class UserProfile extends Component{
    _isMounted = false;

    constructor(props){
        super(props);
        this.state = {
            id:'',
            name:'', 
            address: '',
            email:'',
            picture:'',
            mailDomain:'',
            isEdited: false,
            file:'',
            password:'',
            errors:''
        };
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    componentDidMount(){
        this._isMounted = true;
        const Token = localStorage.getItem('token');
        console.log(Token)
        if(Token){
            axios.get(`${URL}/get-user`, {
                headers:{Authorization:Token}
            }).then((res)=>{
                console.log(res.data);
                if(this._isMounted){
                    const data = res.data.result[0];
                    this.setState({
                        id : data.id,
                        name : data.name,
                        address : data.address,
                        email: data.email,
                        picture : data.picture
                    });
                }
            })
        }
    }

    editUserData = () => {
        this.setState({
            isEdited: true,
        });
    }

    onChange = (e) => {
        this.setState({[e.target.name] : e.target.value});
    }

    _handleImageChange = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onload = () => {
            this.setState({
                file: file,
                picture: reader.result
            });
        }

        reader.readAsDataURL(file);
    }

    saveUserData = (e) => {
        this.setState({[e.target.name] : e.target.value});
        this.setState({
            isEdited: false,
        })

        const file = this.state.file;
        const postData = new FormData();

        postData.append("name", this.state.name);
        postData.append("address", this.state.address);
        postData.append("picture", this.state.picture);
        postData.append("image", file);

        axios.put(`${URL}/update/${this.state.id}`, postData)
        .then(res => {
            console.log(res);
        })
        .catch( err => console.log(err));
    }

    userPicture = () => {
        if(!this.state.picture){
            return false;
        } else {
            return true;
        }
    }

    handleRemove = () => {
        confirm({password: 'Enter your password..'})
        .then(({input}) => {
            this.setState({password : input});
            this.remove();
        }, 
        () => {
            this.setState({password: 'Canceled'})
        })
    }

    remove = () => {
        const password = this.state.password;

        axios.delete(`${URL}/delete/${this.state.id}/${password}`)
        .then(res => {
            this.props.Logout();
        })
        .catch((err) => {this.wrongPasswordFeedback(err)} )
    }

    wrongPasswordFeedback = (err) => {
        console.log(err); 
        this.setState({errors:'incorrect password please try again'})
    }

    render(){
        return (
        <React.Fragment>
        <center>
            { this.state.errors ?
            <i className="alert alert-danger" role="alert">
                {this.state.errors}</i> : '' 
            } 
            <hr></hr>
            <section className="Specific">
                <div className="main" id="main">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12">
                                { this.state.isEdited ? 
                                <div className="SUsersData">
                                    <button className="edit btn btn-danger">
                                        <i className="fas fa-edit"></i> Edit
                                    </button>
                                    <h4><i className="bl">Profile</i></h4>
                                    { this.userPicture() ? 
                                    <img src={this.state.picture} alt='' />  : 
                                    <img src="https://university.cpanel.net/assets/img/user-profile-picture-default.png" alt=""/>            
                                    }
                                    <div className='clear'></div>
                                    <div>                   
                                        <label htmlFor="file-upload" className="custom-file-upload"> Upload </label>
                                        <input id="file-upload" type="file" onChange={this._handleImageChange} />
                                    </div>                 
                                    <input type="text" name="name" className="form-control m-2"  placeholder="name" value={this.state.name ? this.state.name :''} onChange={this.onChange}/>
                                    <input type="text" name="email"className="form-control m-2 bl" placeholder="email"value={this.state.email}onChange={this.onChange}disabled/>
                                    <input type="text" name="address"className="form-control m-2 " placeholder="address"value={this.state.address   ? this.state.address :''}onChange={this.onChange}/>
                                    <button onClick={ this.saveUserData } className='edit btn btn-primary'>
                                        <i className='fas fa-edit'></i> Save
                                    </button>
                                </div>
                                //end of Edit user data
                                :
                                // show user data 
                                <div className="SUsersData">
                                    <button onClick={ this.editUserData } className="edit btn btn-danger">
                                        <i className="fas fa-edit" ></i> Edit
                                    </button>
                                    <h4><i className="bl">Your Profile Data</i></h4>
                                    { this.userPicture() ? 
                                    <img src={this.state.picture} alt='' />  : 
                                    <img src="https://university.cpanel.net/assets/img/user-profile-picture-default.png" alt=""/>            
                                    }
                                    <h4> Name  : <i className="bl"> {this.state.name ? this.state.name : ''} </i></h4> 
                                    <h4> Email  : <i className="bl"> {this.state.email} </i></h4>
                                    <h4> Address  : <i className="bl">{this.state.address ? this.state.address : ''} </i></h4>
                                </div>
                                // end of show user data
                                }
                                <div className="remove-user" >
                                    <button className='btn btn-danger m-2' onClick={this.handleRemove}>Delete Account</button>
                                </div>
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

export default UserProfile;