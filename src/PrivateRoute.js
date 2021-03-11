import React from 'react';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({component : Component, Auth, logout, ...rest}) => {
    return (
        <Route {...rest} render={props => Auth ?
        <Component {...props} Logout={logout} /> :
        <Redirect to='/login'/>
        } />
    )
}

export default PrivateRoute;

