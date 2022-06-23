import React from 'react';
import s from './MyPost.module.css';
import Post from './Post/Post';
import { Field, Formik, Form } from 'formik';
import { maxLengthCreator } from '../../../Utils/Validations/validators';
import { Textarea } from '../../common/FormControls/FormControl';

const MyPost = (props) => {

    let postsElements = props.pd
        .map(p => <Post message={p.message} key={p.id} likeCounts={p.likeCounts} profile={props.profile} />);

    let messageAlert = (text) => {
        props.addPostActionCreator(text);
    }

    let maxLength20 = maxLengthCreator(20);

    let FormSendMessage = () => (
        <div>
            <Formik
                initialValues={{ message: '' }}
                onSubmit={(values, { setSubmitting }) => {
                    messageAlert(values.message);
                    setSubmitting(false);
                }}
            >
                {(p) => (
                    <Form>
                        <Field
                            // type="text"
                            name="message"
                            validate={maxLength20}
                            component={Textarea}
                            placeholder='Enter your post'
                            onKeyDown={(e) => {
                                if (e.keyCode === 13 && e.ctrlKey) {
                                    let a = `${p.values.message}\n`;
                                    p.setFieldValue('message', a, true);
                                } else if (e.key === 'Enter') {
                                    p.handleSubmit();
                                } 
                            }}
                        />
                        <button type="submit" disabled={p.isSubmitting}>
                            Send
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );

    return (
        <div className={s.postsBlok}>
            My post
            <div>
                <FormSendMessage />
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    );
}

export default React.memo(MyPost);