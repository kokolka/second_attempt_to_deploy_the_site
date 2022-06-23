import React from "react";
import setNamePage from "../common/SetNamePage/setNamePage";
import s from './NoFoundPage.module.css';

const NoFoundPage = () => {
    setNamePage('Error 404');
    return(
        <div className={s.page}>
            404 not found
        </div>
    )
}

export default NoFoundPage;