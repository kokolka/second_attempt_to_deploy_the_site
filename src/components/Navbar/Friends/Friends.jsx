import React from 'react';
import s from './Friends.module.css';

const Friends = (props) => {
    return (
        <div className={s.foto}>
            <img src={props.foto}></img>
        </div>
    );
}

export default Friends;