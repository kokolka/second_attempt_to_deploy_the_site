import React, { useEffect, useState } from 'react';
import s from './OnlyCatPage.module.css';

let arrowImg = []; //массив с изображениями

let initArrow = []; //массив с колонками, он будет отображаться 

const ElementFotoBox = (props) => { //элемент фото с рамкой 
    return <div className={props.size <= 1
        ? s.foto_block__1
        : props.size <= 2 && props.size > 1
            ? s.foto_block__2
            : props.size <= 3 && props.size > 2
                ? s.foto_block__3
                : s.foto_block__1
    }>
        <div className={props.size <= 1
            ? s.foto_block__element__1
            : props.size <= 2 && props.size > 1
                ? s.foto_block__element__2
                : props.size <= 3 && props.size > 2
                    ? s.foto_block__element__3
                    : s.foto_block__element__1
        }>
            <img src='https://cdn.mos.cms.futurecdn.net/5FmFtc974AjN255w6iELLj.jpg'
                className={props.size <= 1
                    ? s.foto_block__cat__1
                    : props.size <= 2 && props.size > 1
                        ? s.foto_block__cat__2
                        : props.size <= 3 && props.size > 2
                            ? s.foto_block__cat__3
                            : s.foto_block__cat__1
                }
            />
        </div>
    </div>
}

const GetRandomSizeImg = (number) => { //заполнение массива изображений рандомными размерами изображений
    for (let i = 0; i < number; i++) {
        arrowImg.push(Math.ceil(Math.random() * (3 - 1) + 1));
    }
}

const getColumnNumber = (size, func, lastColumn) =>{ //нужно изменить в соответствии с будстрап сеткой
    let a;

    if(size <= 279){a = 1}
    else if(size <= 374){a = 2}
    else if(size <= 420){a = 3}
    else if(size <= 520){a = 3}
    else if(size <= 660){a = 4}
    else if(size <= 765){a = 5} //уберается боковая менюшка
    else if(size <= 1020){a = 4}
    else if(size <= 1200){a = 5}
    else if(size <= 1400){a = 7}
    else if(size <= 1900){a = 8}
    else {a = 8}

    if(a !== lastColumn){
        func(a);
    }
}

const OnlyCatPage = (props) => {

    let [columns, setColumns] = useState(() => {
        return 7;
    }); //локальный state колличества колонок
    let [lengthArrow, setLengthArrow] = useState(arrowImg.length); //локальный state колличества изображений в массиве

    useEffect(() => {
        getColumnNumber(props.sizeApp, setColumns, columns)//изменение колличества колонок
    }, [lengthArrow, columns, props.sizeApp]);

    let SetArrowColumns = () => { //добавление необходимого колличества колонок в массив
        initArrow = [];
        for (let i = 0; i < columns; i++) {
            initArrow.push([]); //добавление пустого массива
        }
    }

    let CreateArrowContent = () => {
        SetArrowColumns();//обновление колличества коллонок
        let countBox = 0;
        for (let j = 0; j < arrowImg.length; j++) {
            initArrow[countBox].push(arrowImg[j]);

            countBox = countBox + 1;
            if (countBox >= columns) {
                countBox = 0;
            }
        }

        let counterKey = 0;
        let arrowBoxElem = initArrow.map(el => {
            counterKey = counterKey + 1;
            return <div key={counterKey}  className={s.columns_element}>
                {el.map(yt => {
                    return <ElementFotoBox size={yt} />
                })}
            </div>
        })

        return arrowBoxElem;
    }

    if (arrowImg.length === 0) { //инициализация массива с изображениями 
        GetRandomSizeImg(10);
    }

    return (
        <div className={s.main_box}>
            <div className={s.foto_main_block}>
                {CreateArrowContent()}
            </div>
            <div className={s.button_block}>
                <button
                    className={s.button_block__element}
                    onClick={() => {
                        GetRandomSizeImg(10);
                        setLengthArrow(arrowImg.length)
                    }}
                >
                    Add cat
                </button>
            </div>
        </div>
    );
}

export default OnlyCatPage;