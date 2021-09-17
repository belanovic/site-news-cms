import react, {useState} from 'react';
import HOST_BACKEND from './hostBackend.js';

export default function Proba() {
    const [odgovor, setOdgovor] = useState('');

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
    }

    return (
        <div className = "proba">
            <button 
                className = "button-proba"
                onClick = {() => handleClick()}

            >Posalji zahtev
            </button>
            <span>{odgovor}</span>
        </div>
    )
}