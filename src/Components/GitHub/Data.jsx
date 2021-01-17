import React, { Component } from 'react'

class Data extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return (
            <React.Fragment>
            <main role="main">
            <div className="album py-5 bg-light">
            <div className="container">
                <div className="row">                   
                <div className="col-md-3 cp">
                    <div className="card mb-4 shadow-sm">
                    <img className="bd-placeholder-img card-img-top" width="100%" height="225" src="https://avatars0.githubusercontent.com/u/59670?v=4" alt=''/>
                    <div className="card-body">
                        <p className="card-text text-center">
                        Name : Ahmed
                        </p>
                    </div>
                    </div>
                </div>
                <div className="col-md-3 cp">
                <div className="card mb-4 shadow-sm">
                    <img className="bd-placeholder-img card-img-top"
                    width="100%" height="225" src="https://avatars0.githubusercontent.com/u/59670?v=4" 
                    alt=''/>
                    <div className="card-body">
                    <p className="card-text text-center">
                    Name : Ahmed
                    </p>
                    </div>
                </div>
                </div>
                <div className="col-md-3 cp">
                <div className="card mb-4 shadow-sm">
                    <img className="bd-placeholder-img card-img-top" 
                    width="100%" height="225" 
                    src="https://avatars0.githubusercontent.com/u/59670?v=4" 
                    alt=''/>
                    <div className="card-body">
                    <p className="card-text text-center">
                    Name : Ahmed
                    </p>
                    </div>
                </div>
                </div>
                <div className="col-md-3 cp">
                <div className="card mb-4 shadow-sm">
                    <img 
                    className="bd-placeholder-img card-img-top"
                    width="100%" height="225" 
                    src="https://avatars0.githubusercontent.com/u/59670?v=4" 
                    alt=''/>
                    <div className="card-body">
                    <p className="card-text text-center">
                    Name : Ahmed
                    </p>
                    </div>
                </div>
            </div>
            <div className="col-md-3 cp">
                <div className="card mb-4 shadow-sm">
                    <img 
                    className="bd-placeholder-img card-img-top" 
                    width="100%" height="225" 
                    src="https://avatars0.githubusercontent.com/u/59670?v=4" 
                    alt=''/>
                    <div className="card-body">
                    <p className="card-text text-center">
                    Name : Ahmed
                    </p>
                    </div>
                </div>
            </div>  
            </div>
            </div>
            </div>
            </main>
            </React.Fragment>
        );
    }
}


export default Data;