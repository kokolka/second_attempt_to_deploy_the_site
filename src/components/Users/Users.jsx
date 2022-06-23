import React, { useEffect, useState } from "react";
import Preloader from "../common/Preloader/Preloader";
import Paginetion from "../common/Paginator/Paginetion";
import User from "./User";

let getSizePaginetion = (size, lastSize) => {
    let a;
    
    if(size <= 300){
        a = 2;
    }else if(size <= 767){
        a = 3;
    }

    if(size !== lastSize){
        return a;
    }
}

let Users = (props) => {
    let [sizePaginetion, setSizePaginetion] = useState(10);

    useEffect(() => {
        setSizePaginetion(getSizePaginetion(props.sizeApp, sizePaginetion));
    }, [props.sizeApp])

    return (
        <div>
            <Paginetion
                pageTotalCount={props.pageTotalCount}
                pageSize={props.pageSize}
                currentPage={props.currentPage}
                onPageChanged={props.onPageChanged}
                portionSize={sizePaginetion}
            />
            {props.isFetching ?
                <Preloader /> : //если данные с сервера не пришли, то запускаем анимацию загрузки
                props.users.map(u => { //отображение пользователь по одному
                    return (
                        <User
                            user={u}
                            unfollow={props.unfollow}
                            follow={props.follow}
                            followingIsProgress={props.followingIsProgress}
                            key={u.id}
                        />
                    )
                })
            }
        </div>
    );
}

export default Users;