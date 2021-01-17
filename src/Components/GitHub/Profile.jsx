import React, { Component } from 'react'

class Profile extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return (
            <React.Fragment>
            <center>
                <section className="Specific">
                <div className="container">
                <div className="main" id="main">
                <div className="row">
                <div className="col-lg-12 col-md-12">
                    <div className="SUsersData">
                    <i className="fas fa-heart  NotFave"></i><h4>Name :<i class="bl">fahem ahemd</i>   </h4>
                    <img src="https://avatars3.githubusercontent.com/u/10535083?v=4" alt="" />
                    <h4>followers :<i className="bl"> 3 </i>  </h4> 
                    <h4>location :<i className="bl"> dhaka,bangladesh </i> </h4>
                    <div>
                    <div>
                        <h3>here Last 5 repo</h3>
                        <div className="lastfiveRepo">
                        <div>
                            <a href="https://github.com/f4h3m/CRUD_angular">
                                CRUD_angular </a>
                        </div>
                        <div>
                            <a href="https://github.com/f4h3m/cssOnly-preloader"> 
                                cssOnly-preloader </a>
                        </div>
                        <div>
                            <a href="https://github.com/f4h3m/devsonket.github.io"> 
                                devsonket.github.io 
                            </a>
                        </div>
                        <div>
                            <a href="https://github.com/f4h3m/DigiCraft-EDD-Marketplace-WP-Theme">
                                DigiCraft-EDD-Marketplace-WP-Theme
                            </a>
                        </div>
                        <div>
                            <a href="https://github.com/f4h3m/dope"> dope </a>
                        </div>
                        </div>
                        </div>

                    </div>
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


export default Profile;