import React from 'react';
import s from './FormControl.module.css';

export const Textarea = ({ field, form, ...props }) => {

    const hasError = form.errors.message && form.touched.message;

    return (
        <div className={`${s.formControl} ${hasError ? s.error : ""}`}>
            {/* s.formControl + " " + s.error}> */}
            <div>
                <textarea  {...field} {...props} />
            </div>
            <div>
                {hasError && <span>{form.errors.message}</span>}
            </div>
        </div>
    )
}