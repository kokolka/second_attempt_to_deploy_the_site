import React, { useEffect} from 'react';
import Profile from './Profile';
import { setUserProfile, setCurrentIdUser, getUserPageFunction,
    getUserStatus, putUserStatus, addPostActionCreator,
    savePhoto, putProfileInfoParam} from '../../redux/profile-reducer';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getCurrentPageUser, getErrorMessageProfile, getNewPostText, 
    getPostData, getProfile, getStatus } from '../../redux/profile-selectors';
import { getUserId } from '../../redux/auth-selectors';
import setNamePage from '../common/SetNamePage/setNamePage';

const ProfileContainerHook = (props) => {

    useEffect(() => {
        props.getUserPageFunction(props.currentPageUser); //thunk
        props.getUserStatus(props.currentPageUser);
    }, [props.currentPageUser])

    let getParamsWithUrl = (data) => { //callback функция для получения номера профиля из url 
        if (data !== props.currentPageUser) { //сравнение старого url и нового url
            props.setCurrentIdUser(data); //dispatch для нициализации перерисовки через componentDidUpdate
        }
    }
    
    setNamePage('Profile');

    return (
        <Profile
            {...props}
            getParamsWithUrl={getParamsWithUrl}
            param={props.currentPageUser}
        />
    )
}

let mapStateToProps = (state) => ({
    profile: getProfile(state),
    status: getStatus(state),
    currentPageUser: getCurrentPageUser(state),
    meUserId: getUserId(state),
    pd: getPostData(state),
    newPostText: getNewPostText(state),
    messageError: getErrorMessageProfile(state)
})

export default compose(
    connect(mapStateToProps, {
        setUserProfile,
        setCurrentIdUser,
        getUserPageFunction,
        getUserStatus,
        putUserStatus,
        addPostActionCreator,
        savePhoto,
        putProfileInfoParam
    })
)(ProfileContainerHook);