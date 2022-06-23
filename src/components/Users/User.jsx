import React from 'react';
import s from './Users.module.css';
import noPhoto from '../../assets/imeges/noPhoto.png';
import { NavLink } from "react-router-dom";

const User = (props) => {
    return (
        <div className={s.userBox}>
            <div className={s.userBox_foto}>
                <div>
                    <NavLink to={'/profile/' + props.user.id}>
                        <img src={props.user.photos.small != null ? props.user.photos.small : noPhoto} className={s.foto} />
                    </NavLink>
                </div>
                <div>
                    {props.user.followed
                        ? <button
                            disabled={props.followingIsProgress.some(id => id === props.user.id)}
                            className={s.followButton}
                            onClick={() => { props.unfollow(props.user.id); }}
                        >Unfollow</button>
                        : <button
                            disabled={props.followingIsProgress.some(id => id === props.user.id)}
                            className={s.followButton}
                            onClick={() => { props.follow(props.user.id); }}
                        >Follow</button>
                    }
                </div>
            </div>
            <div className={s.userData_profile}>
                <div className={s.userName}>
                    {`${props.user.name}`}
                </div>
                <div className={s.userStatus}>
                    {`Status: ${props.user.status != null ? props.user.status : ''}`}
                </div>
            </div>
            <div className={s.userLocation}>
                <p className={s.userLocation_city}>
                    {'u.location.city'}
                </p>
                <p className={s.userLocation_country}>
                    {'u.location.country'}
                </p>
            </div>
            {/* <div className={s.userBox_userData}>
                
            </div> */}
        </div>
    );
}

export default User;