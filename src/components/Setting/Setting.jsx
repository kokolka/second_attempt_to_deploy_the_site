import React from 'react';
import setNamePage from '../common/SetNamePage/setNamePage';
// import s from './Setting.module.css';

const Setting = () => {
    setNamePage('Setting');
    return (
        <div>
            Setting
            <div>
                <a href='https://social-network.samuraijs.com/docs' target='_blank'>
                    Server doc
                </a>
            </div>
            <div>
                <a href='https://social-network.samuraijs.com/' target='_blank'>
                    Server Login
                </a>
            </div>
        </div>
    );
}

export default Setting;