import react, {useContext, useState} from 'react';
import './style/save.css';
import {context} from './newsContext';

export default function Save({handleSave, title, text, displaySave }) {

    const [url, setURL] = useState('');
    const {checkStorageToken, setIsLoggedIn} = useContext(context);

    return (
        <div className={`save-article ${displaySave}`}>
        {title !== '' && text !== '' ?
            <button 
                className="save-button" 
                onClick={() => {
                    const storageHasToken = checkStorageToken();
                    setIsLoggedIn(storageHasToken);
                    if(!storageHasToken) return;
                    handleSave();
                }}
            >Save
            </button>
            :
            ''}
        </div>
    )
}