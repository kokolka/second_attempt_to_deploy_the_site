import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';

import Dialog from './Dialog/Dialog';
import Message from './Message/Message';
import s from './Dialogs.module.css';
import { Field, Formik, Form } from 'formik';
import { Textarea } from '../common/FormControls/FormControl';
import { maxLengthCreator } from '../../Utils/Validations/validators';

import dialogIcon from '../../assets/imeges/dialogIcon.png';
import setNamePage from '../common/SetNamePage/setNamePage';

const Dialogs = (props) => {

    let [actionName, setActionName] = useState('');
    let paramPage = useParams(); //hoc для получения параметров из url

    useEffect(() => {
        if (paramPage.id != null) {
            setActionName(props.dialogsData[+paramPage.id - 1].name);
        }
    }, [paramPage.id])

    //список диалогов
    let dialogsElements = props.dialogsData
        .map(el => <Dialog id={el.id} name={el.name} key={el.id} foto={el.foto} setIsButtonDialog={props.setIsButtonDialog} />);

    //список сообщений
    let messagesElements = props.messagesData
        .map(message => <Message message={message.message} key={message.id} who={message.who} />)

    let sendMessage = (text) => {
        props.onSendMessage(text);
    }

    let maxLength20 = maxLengthCreator(20);

    let FormSendMessage = () => (
        <div>
            <Formik
                initialValues={{ message: '' }}
                onSubmit={(values, { setSubmitting }) => {
                    sendMessage(values.message);
                    setSubmitting(false);
                }}>
                {(p) => (
                    <Form className={s.send}>
                        <Field
                            className={s.send_textarea}
                            name="message"
                            component={Textarea}
                            placeholder='Enter your post'
                            validate={maxLength20}
                            onKeyDown={(e) => {
                                if (e.keyCode === 13 && e.ctrlKey) {
                                    let a = `${p.values.message}\n`;
                                    p.setFieldValue('message', a, true);
                                } else if (e.key === 'Enter') {
                                    p.handleSubmit();
                                }
                            }}
                        />
                        <button type="submit" disabled={p.isSubmitting} className={s.send_button}>
                            Send
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );

    let result = '';
    if (actionName != '') {
        result = `Dialog with ${actionName}`;
    } else {
        result = 'Dialogs';
    }
    setNamePage(result);

    return (
        <div className={s.dialogs}>
            {/* <div className={s.dialogsItem}> */}
            <div className={cn(s.dialogs_item, { [s.dialogs_item__module]: props.isButtonDialog && props.sizeApp <= 767 })}>
                {dialogsElements}
            </div>
            <div className={cn(s.messages, { [s.dialogs_item__module]: !props.isButtonDialog && props.sizeApp <= 767, [s.messages__module]: props.sizeApp <= 767 })}>
                <div className={s.action_dialog_icon}>
                    {props.sizeApp <= 767
                        ? <img
                            onClick={props.changeIsButtonDialog}
                            className={s.dialogs_icon}
                            src={dialogIcon} />
                        : null}
                    <div className={s.action_dialog}>
                        {actionName}
                    </div>
                </div>
                <div className={s.message_area}>
                    {messagesElements}
                </div>
                <FormSendMessage />
            </div>
        </div>
    )
}

export default Dialogs;