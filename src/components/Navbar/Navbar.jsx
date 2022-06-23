import React from 'react';
import { NavLink } from 'react-router-dom';
import Friends from './Friends/Friends';
import s from './Navbar.module.css';

const Navbar = (props) => {
    let friendFotoElement = props.ff.map(
        (el) => {
            if (el.id <= 3) {
                return <Friends foto={el.foto} key={el.id}/>;
            }
        }
    );


    return (
        <nav>
            <div className={s.item}>
                <NavLink to="/profile" className={navData => navData.isActive ? s.active : s.item} onClick={props.setIsButtonMenu}>Profile</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/dialogs' className={navData => navData.isActive ? s.active : s.item} onClick={props.setIsButtonMenu}>Messages</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/users' className={navData => navData.isActive ? s.active : s.item} onClick={props.setIsButtonMenu}>Users</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/news' className={navData => navData.isActive ? s.active : s.item} onClick={props.setIsButtonMenu}>News</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/music' className={navData => navData.isActive ? s.active : s.item} onClick={props.setIsButtonMenu}>Music</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/setting' className={navData => navData.isActive ? s.active : s.item} onClick={props.setIsButtonMenu}>Setting</NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/infinityCat' className={navData => navData.isActive ? s.active : s.item} onClick={props.setIsButtonMenu}>Infinity cat</NavLink>
            </div>
            <div className={s.friends}>
                <h3>Friends</h3>
                <div className={s.block_foto}>
                    {friendFotoElement}
                </div>
            </div>
        </nav>
    );
}


export default Navbar;