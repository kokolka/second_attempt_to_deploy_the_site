import { connect } from 'react-redux';
import Login from './Login';
import {postLogin, getUrlCaptcha} from '../../redux/auth-reducer';
import { getIsAuth, getUrlCaptchaSelector } from '../../redux/auth-selectors';
import { getMessageError, getNumberError } from '../../redux/app-selectors';

let mapStateToProps = (state) =>{
    return{
        isAuth: getIsAuth(state), 
        numberError: getNumberError(state),
        messageError: getMessageError(state),
        urlCaptcha: getUrlCaptchaSelector(state)
    }
}

  
let LoginContainer = connect(mapStateToProps, {
    postLogin,
    getUrlCaptcha
})(Login);

export default LoginContainer;