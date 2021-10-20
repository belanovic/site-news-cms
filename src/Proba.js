import react, {useContext, useEffect, useState} from 'react';
import HOST_BACKEND from './hostBackend.js';

export default function Proba() {
    const [odgovor, setOdgovor] = useState('');

    const [counter, setCounter] = useState(0);

    const handleClickCounter = () => {
        setCounter(prev => prev + 1);
    }
    useEffect(() => console.log(counter));

    const handleClick = async () => {
        const res = await fetch(`${HOST_BACKEND}/proba`, {
            credentials: 'include',
            headers: {
                
                /* 'Content-Type': 'application/json',
                'x-auth-token' : localStorage.getItem('x-auth-token') */
                /* 'Authorization' : 'Bearer ' + localStorage.getItem('x-auth-token') */
            }
        });
        const data = await res.json();
        console.log(data);
        console.log(document.cookie);
        setOdgovor(document.cookie)
    }

    return (
        <div className = "proba">
            <button 
                className = "button-proba"
                onClick = {() => handleClick()}

            >Posalji zahtev
            </button>
            <button 
                onClick = {() => handleClickCounter()}

            >dodaj 1
            </button>
            <span>{odgovor}</span>
        </div>
    )
}