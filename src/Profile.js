import react, { useContext, useEffect } from 'react';
import {context} from './newsContext';
import './style/profile.css'

export default function Profile({loggedUser}) {

    
    const {setLoggedIn} = useContext(context);

    const handleSignOut = (e) => {
        e.preventDefault();
        localStorage.setItem('x-auth-token', 'none');
        localStorage.setItem('loggedUsername', null);
        window.location.href = '/';
        setLoggedIn(false);
    }

    return (
        <div className = "profile">
            <div className = "profile-element">
                <div className = "profile-element-description">Korisničko ime</div>
                <div className = "profile-element-username data">{localStorage.getItem('loggedUsername')}</div>
            </div>
            <div className = "profile-element">
                <div className = "profile-element-description">Ime</div>
                <div className = "profile-element-firstname data">{localStorage.getItem('loggedFirstName')}</div>
            </div>
            <div className = "profile-element">
                <div className = "profile-element-description">Prezime</div>
                <div className = "profile-element-lastname data">{localStorage.getItem('loggedLastName')}</div>
            </div>
            <div className = "profile-element">
                <div className = "profile-element-description">email</div>
                <div className = "profile-element-email data">{localStorage.getItem('loggedEmail')}</div>
            </div>
            <button 
                className = "profile-signOut"
                onClick = {(e) => handleSignOut(e)}
            >Odjavi se</button>
        </div>
    )
}