import React from 'react';
import { Field, Form, Formik } from 'formik';
import s from './FormProfileInfo.module.css';
import { Textarea } from '../../common/FormControls/FormControl';


const FormProfileInfo = (props) => {
    let ErrorBlock = () => {
        let jj = '';
        if (props.messageError != '') {
            return props.messageError.map((el) => {
                jj = jj + 1;
                return <p key={jj}>{el}</p>
            })
        }
        return null;
    }

    return (
        <Formik
            initialValues={
                {
                    AboutMe: props.profile.aboutMe,
                    lookingForAJob: props.profile.lookingForAJob,
                    lookingForAJobDescription: props.profile.lookingForAJobDescription,
                    fullName: props.profile.fullName,
                    contacts: {
                        github: props.profile.contacts.github,
                        vk: props.profile.contacts.vk,
                        facebook: props.profile.contacts.facebook,
                        instagram: props.profile.contacts.instagram,
                        twitter: props.profile.contacts.twitter,
                        website: props.profile.contacts.website,
                        youtube: props.profile.contacts.youtube,
                        mainLink: props.profile.contacts.mainLink
                    }
                }
            }
            onSubmit={(values, { setSubmitting }) => {
                let profile = {
                    userId: props.meUserId,
                    ...values
                }
                props.putProfileInfoParam(profile)
                    .then((response) => {
                        if (response == 0) {
                            props.offEditModeProfile();
                        }
                    })
                setSubmitting(false);
            }}
        >
            {(p) => (
                <Form>
                    <div className={s.element_box}>
                        <div className={s.element_box__nameProporty}>Your full name</div>
                        <Field type="text" name="fullName" />
                    </div>
                    <div className={s.element_box}>
                        <div className={s.element_box__nameProporty}>About me</div>
                        <Field component={Textarea} placeholder='About me' name="AboutMe" />
                    </div>
                    <div className={s.element_box}>
                        <div className={s.element_box__checkbox}>Are you find a job?</div>
                        <Field type="checkbox" name="lookingForAJob" />
                    </div>
                    {p.values.lookingForAJob ?
                        <div className={s.element_box}>
                            <div className={s.element_box__nameProporty}>Description for job:</div>
                            <Field component={Textarea} placeholder=' ' name="lookingForAJobDescription" />
                        </div>
                        : null}
                    <div className={s.element_box}>
                        <div className={s.element_box__nameProporty}>Your github:</div>
                        <Field type="text" name="contacts.github" placeholder="https://github.com/" />
                    </div>
                    <div className={s.element_box}>
                        <div className={s.element_box__nameProporty}>Your vk:</div>
                        <Field type="text" name="contacts.vk" placeholder="https://vk.com/" />
                    </div>
                    <div className={s.element_box}>
                        <div className={s.element_box__nameProporty}>Your facebook:</div>
                        <Field type="text" name="contacts.facebook" placeholder="https://facebook.com" />
                    </div>
                    <div className={s.element_box}>
                        <div className={s.element_box__nameProporty}>Your instagram:</div>
                        <Field type="text" name="contacts.instagram" placeholder="https://www.instagram.com" />
                    </div>
                    <div className={s.element_box}>
                        <div className={s.element_box__nameProporty}>Your twitter:</div>
                        <Field type="text" name="contacts.twitter" placeholder="https://twitter.com" />
                    </div>
                    <div className={s.element_box}>
                        <div className={s.element_box__nameProporty}>Your website:</div>
                        <Field type="text" name="contacts.website" placeholder="your website" />
                    </div>
                    <div className={s.element_box}>
                        <div className={s.element_box__nameProporty}>Your youtube:</div>
                        <Field type="text" name="contacts.youtube" placeholder="https://www.youtube.com" />
                    </div>
                    <div className={s.element_box}>
                        <div className={s.element_box__nameProporty}>Your mainLink:</div>
                        <Field type="text" name="contacts.mainLink" placeholder="https://www.mainLink.ru" />
                    </div>
                    <button type="submit" disabled={p.isSubmitting}>
                        Submit
                    </button>
                    <div >
                        <div className={props.messageError == '' ? null : s.entry_field__errors}>
                            {ErrorBlock()}
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
}


export default FormProfileInfo;