import { authAPI, securityAPI } from "../api/api";
import { getErrorLogin, resetErrorLogin } from "./app-reducer";

const SET_USER_DATA = 'SET_USER_DATA/AUTH';
const SET_OUTPUT = 'SET_OUTPUT/AUTH';
const SET_URL_CAPTCHA = 'SET_URL_CAPTCHA/AUTH';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    urlCaptcha: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload //устанавливаем userId, email, login, isAuth
            };
        case SET_OUTPUT:
            return {
                ...state,
                userId: null,
                email: null,
                login: null,
                isAuth: false
            };
        case SET_URL_CAPTCHA:
            return {
                ...state,
                urlCaptcha: action.urlCaptcha
            };

        default:
            return state; 
    }
};

export const setAuthUserData = (userId, email, login, isAuth) => {
    return { type: SET_USER_DATA, payload: { userId, email, login, isAuth } };
};
export const setOutput = () => {
    return { type: SET_OUTPUT };
};
export const setUrlCaptcha = (urlCaptcha) => {
    return { type: SET_URL_CAPTCHA, urlCaptcha};
};
export const resetUrlCaptcha = () => {
    return { type: SET_URL_CAPTCHA, urlCaptcha: null};
};

export const meUser = () => async (dispatch) => {
    let response = await authAPI.meGetUser();
    if (response.data.resultCode === 0) {
        let { email, id, login } = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export let postLogin = (email, password, rememberMe, captcha) => async (dispatch) => {
    let response = await authAPI.postLogin(email, password, rememberMe, captcha);
    if (response.data.resultCode === 0) {
        //get data successes 
        dispatch(meUser());
        dispatch(resetErrorLogin());
    } else if (response.data.resultCode === 10){ 
        //get captcha when get error 10
        dispatch(getErrorLogin(response.data.resultCode, response.data.messages));
        dispatch(getUrlCaptcha());
    } else {
        // if get another errors
        dispatch(getErrorLogin(response.data.resultCode, response.data.messages));
    }
}
export const deleteLogOut = () => { 
    return async(dispatch) => {
        let response = await authAPI.deleteLogOut();
        // .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false));
            }
        // })
    }
}

export const getUrlCaptcha = () => { 
    return async(dispatch) => {
        let response = await securityAPI.getUrlCaptcha();
        debugger
        dispatch(setUrlCaptcha(response.data.url));
    }
}


export default authReducer;