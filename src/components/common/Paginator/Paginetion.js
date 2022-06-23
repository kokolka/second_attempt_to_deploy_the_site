import React, { useState } from "react";
import s from './Paginator.module.css';

let Paginetion = ({ pageTotalCount, pageSize, currentPage, portionSize = 10, ...props }) => {

    let pagesCount = Math.ceil(pageTotalCount / pageSize);

    //логика для отображения номеров страниц 
    let arrPages = [];
    for (let i = 1; i <= pagesCount; i++) {
        arrPages.push(i);
    }

    let positionCount = Math.ceil(pagesCount / portionSize);

    let [numberOfPortion, setNumberOfPortion] = useState(1);
    let lastLeftPage = (numberOfPortion - 1) * portionSize + 1;
    let firstRightPage = numberOfPortion * portionSize;

    return (
        <div className={s.numberPage}>
            {numberOfPortion > 1 &&
                <button
                    className={s.numberPage__button}
                    onClick={() => { setNumberOfPortion(1) }}
                >{'|<'}</button>}
            {numberOfPortion > 1 &&
                <button
                    className={s.numberPage__button}
                    onClick={() => { setNumberOfPortion(numberOfPortion - 1) }}
                >PREV</button>}
            {arrPages.filter(p => p >= lastLeftPage && p <= firstRightPage)
                .map((p) => {
                    return (<span
                        key={p}
                        className={p === currentPage ? s.activePage : s.pasivPage}
                        onClick={() => { props.onPageChanged(p) }}
                    >
                        {p}
                    </span>)
                })
            }
            {positionCount > numberOfPortion &&
                <button
                    className={s.numberPage__button}
                    onClick={() => { setNumberOfPortion(numberOfPortion + 1) }}
                >PREV</button>}
            {positionCount > numberOfPortion &&
                <button
                    className={s.numberPage__button}
                    onClick={() => { setNumberOfPortion(positionCount) }}
                >{'>|'}</button>}
        </div>
    );
}

export default Paginetion;