import React, { Component } from 'react'

class Data extends Component{
    constructor(props){
        super(props);
        this.state = { user: [] };
        const fetchUser = async (user) => {
            const apiRequest = await fetch(`https://api.github.com/search/users?q=${user}`)
            const dataResult = await apiRequest.json();
            return {dataResult};
        }
        fetchUser(props.match.params.id).then(res => {
            this.setState({user: res.dataResult.items});
            console.log('data response', res.dataResult.items)
        })
    }

    onProfileCardClick(data) {
        this.props.history.push({
            pathname: `/profile/${data}`
        });
    }

    render(){
        return (
            <React.Fragment>
            <main role="main">
            <div className="album py-5 bg-light">
            <div className="container">
                <div className="row">
                    {this.state.user.map(user => (
                        <div className="col-md-3 cp" key={user.login} onClick={() => this.onProfileCardClick(user.login)}>
                        <div className="card mb-4 shadow-sm">
                        <img className="bd-placeholder-img card-img-top" width="50%" height="50%" src={user.avatar_url} alt=''/>
                        <div className="card-body">
                            <p className="card-text text-center">
                            Name : {user.login}
                            </p>
                        </div>
                        </div>
                    </div>
                    ))}
                </div>  
            </div>
            </div>
            </main>
            </React.Fragment>
        );
    }
}


export default Data;