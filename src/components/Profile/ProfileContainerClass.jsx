import React from 'react';
import Profile from './Profile';
import {
    setUserProfile,
    setCurrentIdUser,
    getUserPageFunction,
    getUserStatus,
    putUserStatus,
    addPostActionCreator,
    savePhoto,
    putProfileInfoParam
} from '../../redux/profile-reducer'; 
import { connect } from 'react-redux';
import { compose } from 'redux';

class ProfileContainer extends React.Component { 
    constructor(props, costil, lastIdParam) {
        super(props);
        this.costil = costil;
        this.lastIdParam = lastIdParam;
        this.getParamsWithUrl = this.getParamsWithUrl.bind(this);
    }

    getParamsWithUrl = (data) => { //callback функция для получения номера профиля из url 
        if (data !== this.props.currentPageUser) {
            this.props.setCurrentIdUser(data); //dispatch для нициализации перерисовки через componentDidUpdate
        }
    }

    componentDidUpdate(prevProps) { 
        if (prevProps.currentPageUser !== this.props.currentPageUser) {
            this.props.getUserPageFunction(this.props.currentPageUser); //thunk
            this.props.getUserStatus(this.props.currentPageUser);
        }
    }

    componentDidMount() { //метод жизненного цикла, запускается после отрисовки компоненты
        this.props.getUserPageFunction(this.props.currentPageUser); //thunk
        this.props.getUserStatus(this.props.currentPageUser); //thunk
    }

    render() {
        return (
            <Profile
                {...this.props}
                getParamsWithUrl={this.getParamsWithUrl} 
                param={this.props.currentPageUser}
            />
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    currentPageUser: state.profilePage.currentPageUser,
    meUserId: state.auth.userId,
    pd: state.profilePage.postsData,
    newPostText: state.profilePage.newPostText,
    messageError: state.profilePage.errorMessageProfile
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
)(ProfileContainer);