import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Dialog.module.css'
import noPhoto from '../../../assets/imeges/noPhoto.png'

const Dialog = (props) => {
    let path = '/dialogs/' + props.id;

    return (
        <div className={s.dialog}>
            <img src={props.foto != null ? props.foto: noPhoto} ></img>
            <NavLink to={path} className={(sa) => {
                    if(sa.isActive){
                        return s.active;
                    }else{
                        return s.dialog;
                    }
                }
            }
            onClick={props.setIsButtonDialog}
            >{props.name}</NavLink>
        </div>
    )
}

export default Dialog;