import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import cn from 'classnames';
import s from './News.module.css';
import es from './NewsElement.module.css';

const News = (props) => {

    let [validTheme, setValidTheme] = useState(props.theme); //нужно для сравнения новых и старых значений
    let [validDate, setValidDate] = useState(props.date);

    useEffect(() => {
        if (((props.theme != validTheme) && (props.theme != '')) || ((props.date != validDate) && (props.date != ''))) {
            props.getNewsEverything(props.theme, props.date);

            //перезаписываем старые значения
            setValidTheme(props.theme);
            setValidDate(props.date);
        }
    }, [props.theme, props.date])
    useEffect(() => { }, [props.news]) //отслеживание изменения news

    let newsElements = null; //иницирование переменной для массива, чтобы проверять её состояние для отрисовки

    if (props.news != null) { //проверка, так как на старте news равен null
        let i = 0;
        newsElements = props.news.map((el) => {
            i = i + 1;
            return (
                <div key={i} className={es.element_box}>
                    <div className={es.element_box__ava}>
                        <img src={el.urlToImage} />
                    </div>
                    <div className={es.element_box__source}>
                        <a href={el.url} target='_blank'>To source</a>
                    </div>
                    <div className={es.element_box__date}>
                        {`date: ${el.publishedAt}`}
                    </div>
                    <div className={es.element_box__author}><b>Author:</b>{` ${el.author}`}</div>
                    <div className={es.element_box__title}><b>{el.title}</b></div>
                    <div className={es.element_box__content}><p>{el.content}</p></div>
                    <div className={es.element_box__source_info}>
                        <div className={es.source_info__label}>Source:</div>
                        <div className={es.source_info__source}><b>id:</b>{el.source.id != null ? ` ${el.source.id}` : null}</div>
                        <div className={es.source_info__name}><b>Name:</b>{el.source.name != null ? ` ${el.source.name}` : null}</div>
                    </div>
                </div>
            );
        })
    }

    return (
        <div className={s.page}>
            <div className={s.page_name}>
                <h1>News</h1>
            </div>
            <div className={s.page_formik}>
                <Formik
                    initialValues={{ theme: '', date: '' }}
                    validate={values => {
                        const errors = {};
                        if (!values.theme) {
                            errors.theme = 'Required';
                        } else if (/[' ']/i.test(values.theme)) {
                            errors.theme = 'Dad request';
                        }

                        if (!values.date) {
                            errors.date = 'Required';
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        props.setTheme(values.theme, values.date);
                        setTimeout(() => {
                            setSubmitting(false);
                        }, 400);
                    }}
                >
                    {(p) => (
                        <Form className={s.page_form}>
                            <div className={s.page_form__date}>
                                <Field className={cn(s.page_form__dateArea, { [s.page_form__error]: p.errors.date })} type="date" name="date" min="2022-05-01" />
                                <ErrorMessage className={s.page_form__errorMessage} name="date" component="div" />
                            </div>
                            <div className={s.page_form__theme}>
                                <Field
                                    className={cn(s.page_form__themeArea, { [s.page_form__error]: p.errors.theme })}
                                    type="text"
                                    name="theme" />
                                <ErrorMessage className={s.page_form__errorMessage} name="theme" component="div" />
                            </div>
                            <button className={s.page_form__button} type="submit" disabled={p.isSubmitting}>
                                Submit
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
            <div className={s.page_elements_news}>
                {newsElements != null ? newsElements : null}
            </div>
        </div>
    );
}

export default News;