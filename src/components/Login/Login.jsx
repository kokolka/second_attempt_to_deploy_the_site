import React from "react";
import LoginForm from "./LoginForm/LoginForm";
import s from './Login.module.css';
import { Navigate } from "react-router-dom";
import setNamePage from "../common/SetNamePage/setNamePage";

const Login = ({postLogin, isAuth, numberError, messageError, getUrlCaptcha, urlCaptcha}) => {

    if (isAuth === true) {
        return <Navigate to={'/profile'} />
    }

    setNamePage('Login');

    return (
        <div className={s.Login_box}>
            <h1>Login</h1>
            <LoginForm
                postLogin={postLogin}
                numberError={numberError}
                messageError={messageError} 
                getUrlCaptcha={getUrlCaptcha}
                urlCaptcha={urlCaptcha}
            />
        </div>
    );
}

export default Login;