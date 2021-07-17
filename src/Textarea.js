import React from 'react';

export default function Textarea({text, setText}) {

    const handleChangeText = (e) => {
        const value = e.target.value;
        setText(value);
    }
    
    return (
        <textarea
            name = "textarea"
            className = "textarea"
            value = {text}
            onChange = {handleChangeText}
            placeholder = {'Enter paragraf'}
        >
        </textarea>
    )
}