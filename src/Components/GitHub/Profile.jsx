import React, { Component } from 'react'

class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {
            user : []
        };

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
                    <i className="fas fa-heart  NotFave"></i>
                    <h4>Name :
                    <i className="bl">{this.state.user.name}</i>   
                    </h4>
                    <img src={this.state.user.avatar_url} alt="" />
            <h4>Followers :<i className="bl">{this.state.user.followers}</i>  </h4> 
            <h4>Location :<i className="bl">{this.state.user.location}</i> </h4>

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


export default Profile;