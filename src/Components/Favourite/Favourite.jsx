import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {addToFavourites, deleteFromFavourites, getFavouriteState} from '../../Store/Actions'

class Favourite extends Component {
    constructor(props){
        super(props);
        this.state = { 
            users : [],
        };
        this.props.getFavouriteState();
        this.data();
    }

    async data(){
        let data = await this.props.Favourite.favouriteData;
        let userArray = [];

        const fetchUsers = async(user) => {
            const API = await fetch(`https://api.github.com/users/${user}`)
            const data = await API.json();
            return {data};
        }

        for(let i = 0; i < data.length; i++){
            const user = data[i];
            fetchUsers(user).then((res) => {
                res.data.isUserInFavourite = true;
                userArray.push(res.data);
                this.setState({users: userArray});
            })
        }

        
    }

    removeFromFavourite(user){
        this.props.deleteFromFavourites(user);

        let array = this.state.users;
        let newArray = [];

        for( let i= 0; i < array.length; i++){
            const el = array[i];
            if(el.login === user){
                el.isUserInFavourite = false;
            }
            newArray.push(el);
        }
        this.setState({users: newArray});
    }

    addToFavourite(user){
        this.props.addToFavourites(user);

        let array = this.state.users;
        let newArray = [];

        for( let i= 0; i < array.length; i++){
            const el = array[i];
            if(el.login === user){
                el.isUserInFavourite = true;
            }
            newArray.push(el);
        }
        this.setState({users: newArray});
    }

    getUser(data){
        this.props.history.push({
            pathname: `/profile/${data}`,
        })
    }

    render(){
        return(
            <React.Fragment>
                <div className="album py-5 bg-light">
                    <div className="container">
                        <div className="row">
                            {this.state.users.map(user => ( 
                                <div key={user.id} className="col-md-3 cp">
                                    <div key={user.id} className="card mb-4 shadow-sm">
                                        <img className="bd-placeholder-img card-img-top" width="50%" height="50%" src={user.avatar_url} alt=''  />
                                        <div className="card-body">
                                            <p className="card-text text-center">
                                                {user.login}
                                            </p>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="btn-group">
                                                <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => {this.getUser(user.login)}} key={user.id}>View</button>
                                                </div>
                                                {user.isUserInFavourite 
                                                    ? <button type="button" className="btn btn-sm " onClick={() => {this.removeFromFavourite(user.login)}}><i className="fas fa-heart Fave"></i></button>
                                                    :<button type="button" className="btn btn-sm " onClick={() => {this.addToFavourite(user.login)}}><i className="fas fa-heart Fave"></i></button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

Favourite.propTypes = {
    addToFavourites : PropTypes.func.isRequired,
    deleteFromFavourites : PropTypes.func.isRequired,
    getFavouriteState : PropTypes.func.isRequired,
    Favourite: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    Favourite: state.Favourite
})


export default connect(mapStateToProps, {addToFavourites, deleteFromFavourites, getFavouriteState}) (Favourite);