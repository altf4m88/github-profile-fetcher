import React, { Component } from 'react'
import Repositories from './Repositories';
import PropType from 'prop-types';
import {connect} from 'react-redux';
import {addToFavourites, deleteFromFavourites, getFavouriteState} from '../../Store/Actions';


class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            user : [],
            isFavourite : false
        };

        //get fav state
        this.props.getFavouriteState();

        const fetchProfile = async (user) => {
            const apiRequest = await fetch(`https://api.github.com/users/${user}`);
            const dataResult = await apiRequest.json();
            return dataResult;
        }
        //init fetch method
        fetchProfile(props.match.params.login).then((res) => {
            if(res){
                this.setState({user: res});
            }
        });

        
    }

    async componentDidMount(){
        console.log('profile', this.props.Favourite.favouriteData);
        let data = this.props.Favourite.favouriteData;
        let user = this.props.match.params.login;

        for(let index = 0; index < data.length; index++){
            const element = data[index];
            if(element === user){
                this.setState({isFavourite: true});
            }
        }
    }

    AddToFav = () => {
        this.props.addToFavourites(this.state.user.login);
        this.setState({isFavourite : true})
    }
    RemoveFromFav = () => {
        this.props.deleteFromFavourites(this.state.user.login);
        this.setState({isFavourite : false})
    }

    Profile(){
        if(this.state.user.login === 0){
            return(
            <p>No user found with username : {this.props.match.params.login}</p>
            );
        } else{
            return(
                <center>
                <section className="Specific">
                <div className="container">
                <div className="main" id="main">
                <div className="row">
                <div className="col-lg-12 col-md-12">
                    <div className="SUsersData">
                    {
                        this.state.isFavourite === false ?
                        <i onClick={this.AddToFav} className='fas fa-heart NotFave'></i> 
                        :
                        <i onClick={this.RemoveFromFav} className='fas fa-heart Fave'></i>
                    }
                    <h4>Name :
                    <i className="bl">{this.state.user.name}</i>   
                    </h4>
                    <img src={this.state.user.avatar_url} alt="" />
            <h4>Followers :<i className="bl">{this.state.user.followers}</i>  </h4> 
            <h4>Location :<i className="bl">{this.state.user.location}</i> </h4>

                <Repositories user={this.props.match.params.login} />

                </div>
                </div>
                </div>
                </div>
                </div>
                </section>
                </center>


            )
        }



    }


    render(){
        return (
            <React.Fragment>
                {this.Profile()}       
            </React.Fragment>
        );
    }
}

Profile.propTypes = {
    addToFavourites : PropType.func.isRequired,
    deleteFromFavourites : PropType.func.isRequired,
    getFavouriteState : PropType.func.isRequired,
    Favourite: PropType.object.isRequired
}

const mapStateToProps = (state) => ({
    Favourite: state.Favourite
})



export default connect(mapStateToProps, {addToFavourites, deleteFromFavourites, getFavouriteState})(Profile);