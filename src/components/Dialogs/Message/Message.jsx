import React from 'react';
import s from './Message.module.css'

const Message = (props) => {
    return (
        <div className={(props.who === 1) ? s.message_1 : s.message_2}>
            <p className={(props.who === 1) ? s.message_element_1 : s.message_element_2}>
                {props.message}
            </p>
        </div>
    )
}

export default Message;