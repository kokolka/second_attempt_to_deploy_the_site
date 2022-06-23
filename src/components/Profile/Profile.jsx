import React from 'react';
import MyPost from './MyPost/MyPost';
import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile = (props) => {
    return ( 
        <div className={s.profile}> 
            {/* Блок с информацие о пользователе */}
            <ProfileInfo
                profile={props.profile}
                getParamsWithUrl={props.getParamsWithUrl}
                param={props.param}
                status={props.status}
                putUserStatus={props.putUserStatus}
                meUserId={props.meUserId}
                savePhoto={props.savePhoto}
                putProfileInfoParam={props.putProfileInfoParam}
                messageError={props.messageError}
            />
            {/* Блок с постами пользователя */}
            <MyPost
                addPostActionCreator={props.addPostActionCreator}
                profile={props.profile}
                pd={props.pd} 
                newPostText={props.newPostText}
            />
        </div>
    );
}

export default Profile;