import React from 'react';
import axios from 'axios';
import s from './Users.module.css';
import noPhoto from '../../assets/imeges/noPhoto.png';

let Users = (props) => {
    let getUsers = () => {
        if (props.users.length === 0) {
            debugger;
            axios.get('https://social-network.samuraijs.com/api/1.0/users')
                .then(response => {
                    debugger;

                    return props.setUsers(response.data.items);
                }
                );
        }
    }
    // debugger;
    // if (props.users.length === 0) {
    //     props.setUsers(
    //         [
    //             { id: 1, firstName: 'Kirill', lastName: 'Balachoncev', location: { country: 'Russia', city: 'Tomsk' }, userStatus: 'Live is good', statusFriend: true, foto: 'https://aroundpet.ru/wp-content/uploads/kot-shartrez.jpg' },
    //             { id: 2, firstName: 'Kata', lastName: 'Mda', location: { country: 'Russia', city: 'Moskov' }, userStatus: 'Live is shop', statusFriend: false, foto: 'https://catnames.ru/sites/default/files/inline/images/medn_7.jpg' },
    //             { id: 3, firstName: 'Dima', lastName: 'Luzgin', location: { country: 'Russia', city: 'Tomsk' }, userStatus: 'Live is work', statusFriend: true, foto: 'https://lookw.ru/9/957/1566942074-72.jpg' }
    //         ]
    //     );
    // }
    return (
        <div>
            <button onClick={getUsers} className={s.buttonGetUsers}>Get users</button>
            {
                props.users.map(u => {
                    return (
                        <div className={s.userBox} key={u.id}>
                            <div className={s.userBox_foto}>
                                <div>
                                    <img src={u.photos.small != null ? u.photos.small : noPhoto} className={s.foto} />
                                </div>
                                <div>
                                    {u.statusFriend
                                        ? <button className={s.followButton} onClick={() => { 
                                            props.unfollow(u.id); 
                                        }}>Unfollow</button>
                                        : <button className={s.followButton} onClick={() => {
                                            props.follow(u.id);
                                        }}>Follow</button>}
                                </div>
                            </div>
                            <div className={s.userBox_userData}>
                                <div className={s.userData_profile}>
                                    <div className={s.userName}>
                                        {`${u.name}`}
                                    </div>
                                    <div className={s.userStatus}>
                                        {`Status: ${u.status != null ? u.status : ''}`}
                                    </div>
                                </div>
                                <div className={s.userLocation}>
                                    <div className={s.userLocation_city}>
                                        {'u.location.city'}
                                    </div>
                                    <div className={s.userLocation_country}>
                                        {'u.location.country'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
};

export default Users;