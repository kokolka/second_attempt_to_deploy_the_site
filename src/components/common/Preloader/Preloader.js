import React from 'react';
import preloader from '../../../assets/imeges/Rolling-1s-200px.svg'
import s from './Users.module.css';

let Preloader = () => {
    return (
        <div className={s.preloader}>
            <img src={preloader} className={s.animation}/>
        </div>
    );
}

export default Preloader;