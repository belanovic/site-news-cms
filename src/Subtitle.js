import React from 'react';

export default function Subtitle({ subtitle, setSubtitle }) {

    function handleChangeSubtitle(e) {
        const value = e.target.value;
        setSubtitle(value);
    }

    return (
        <div className="article-text-subtitle">
            <textarea
                type='text'
                name="subtitle"
                className="subtitle-textarea"
                value={subtitle}
                onChange={handleChangeSubtitle}
                placeholder={'Enter subtitle'}
            >
            </textarea>
        </div>
    )
}