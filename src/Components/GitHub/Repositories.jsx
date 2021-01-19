import React, { Component } from 'react';

class Repositories extends Component{
    constructor(props) {
        super(props);
        this.state = { repos : []};

        const fetchRepositories = async (user) => {
            const apiRequest = await fetch(`https://api.github.com/users/${user}/repos`);
            const dataResult = await apiRequest.json();
            return dataResult;
        }

        fetchRepositories(props.user).then(res => {
            if(res.length > 0 && !res.message){
                this.setState({repos: res})
            }
        });
    }
    render(){
        return(
            <React.Fragment>
            <h3>Repositories: </h3>
                <div className="lastfiveRepo">
                    {
                        this.state.repos.map(res => (
                            <div key={res.id}>
                                <a href={res.html_url} key={res.id}>{res.name}</a>
                            </div>
                        ))
                    }
                </div>
                </React.Fragment>
        );
    }
}

export default Repositories;