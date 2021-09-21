import react, {useContext, useState} from 'react';
import './style/save.css';
import {context} from './newsContext';

export default function Save({handleSave, title, text, displaySave }) {

    const [url, setURL] = useState('');
    const {checkStorageToken} = useContext(context);

    return (
        <div className={`save-article ${displaySave}`}>
        {title !== '' && text !== '' ?
            <button 
                className="save-button" 
                onClick={() => {
                    handleSave();
                    checkStorageToken();
                }}
            >Save
            </button>
            :
            ''}
        </div>
    )
}