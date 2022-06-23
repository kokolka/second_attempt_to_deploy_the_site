import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import s from './LoginForm.module.css';

let LoginForm = (props) => {

    let ErrorBlock = () => {
        if (props.numberError >= 1) {
            return props.messageError;
        }
        return null;
    }

    return (
        <div>
            <Formik
                initialValues={{ email: '', password: '', rememberMy: false, captcha: null }}
                validate={values => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }

                    if (!values.password) {
                        errors.password = 'Required';
                    }

                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    props.postLogin(values.email, values.password, values.rememberMy, values.captcha);
                    setSubmitting(false);
                }}
            >
                {(p) => (
                    <Form>
                        <div>
                            <Field
                                className={(p.errors.email && p.touched.email ) || (props.numberError >= 1)
                                    ? s.entry_field__errors
                                    : ''}
                                placeholder="Email"
                                type="email"
                                name="email"
                            />
                            <ErrorMessage
                                className={p.errors.email && p.touched.email ? s.errors : ''}
                                name="email"
                                component="div"
                            />
                        </div>
                        <div>
                            <Field
                                className={(p.errors.password && p.touched.password) || (props.numberError >= 1)
                                    ? s.entry_field__errors
                                    : ''}
                                placeholder="Password"
                                type="password"
                                name="password"
                            />
                            <ErrorMessage
                                className={p.errors.password && p.touched.password ? s.errors : ''}
                                name="password"
                                component="div"
                            />
                        </div>
                        <div>
                            <Field type='checkbox' name='rememberMy' />
                            {'Remember my'}
                        </div>
                        <div>
                            <button type="submit" disabled={p.isSubmitting}>
                                Sing In
                            </button>
                        </div>
                        <div className={s.entry_field__errors}>
                            <div>
                                {ErrorBlock()}
                            </div>
                            <div>
                                {props.urlCaptcha != null
                                    ? <div>
                                        <img src={props.urlCaptcha} />
                                        <div>
                                            <Field
                                                className={''}
                                                placeholder="Captcha"
                                                type="text"
                                                name="captcha"
                                            />
                                        </div>
                                    </div>
                                    : null}
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default LoginForm;