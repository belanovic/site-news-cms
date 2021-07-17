import React from 'react';

export default function Title({ title, setTitle }) {

    const handleChangeTitle = (e) => {
        const value = e.target.value;
        setTitle(value);
    }

    return (
        <div className="article-text-title">
            <input
                type='text'
                name="title"
                className="title-input"
                value={title}
                onChange={handleChangeTitle}
                placeholder={'Enter title'}
            >
            </input>
        </div>
    )
}