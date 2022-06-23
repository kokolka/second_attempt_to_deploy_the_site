import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import {deleteLogOut} from '../../redux/auth-reducer';
import {changeIsButtonMenu} from '../../redux/app-reducer';
import { getIsAuth, getLogin } from '../../redux/auth-selectors';
import { getSizeApp } from '../../redux/app-selectors';

class HeaderContainer extends React.Component{
    
    render(){
        return <Header {...this.props}/>
    }
}

let matStateToProps = (state) => {
    return{
        isAuth: getIsAuth(state),
        login: getLogin(state),
        sizeApp: getSizeApp(state)
    }
}

export default connect(matStateToProps, {deleteLogOut, changeIsButtonMenu})(HeaderContainer);