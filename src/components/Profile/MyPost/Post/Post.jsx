import React from 'react';
import s from './Post.module.css';
import noPhoto from '../../../../assets/imeges/noPhoto.png';
import Preloader from '../../../common/Preloader/Preloader';

const Post = (props) => {

    if (props.profile == null || Object.keys(props.profile).length < 2) {
        return <Preloader />
    }

    return (
        <div className={s.item}>
             <img src={props.profile.photos.small != null ? props.profile.photos.small : noPhoto } ></img>
            <p>{props.message}</p>
            <div>
                <span>Like:</span>
                <span className={s.likeCounts}>{props.likeCounts}</span>
            </div> 
        </div>
    );
}

export default Post;