import React from 'react';
import { connect } from 'react-redux';
import {Navigate} from 'react-router-dom';

export const withAuthRedirect = (Component) => {

    let RedirectComponent = (props) => {
        
        if(!props.isAuth) return <Navigate to={'/login'}/>;
        
        return <Component {...props}/>;
    }

    let mapStateToProps = (state) => {
        return{
            isAuth: state.auth.isAuth 
        }
    }

    let ConnectRedirectComponent = connect(mapStateToProps)(RedirectComponent);

    return ConnectRedirectComponent;
} 