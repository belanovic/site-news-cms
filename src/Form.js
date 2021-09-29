import react, { useState, useEffect, useContext, useRef } from 'react';
import { context } from './newsContext';
import './style/form.css';
import {registerUser} from './getUser.js';
import {loginUser} from './getUser.js';
import Profile from './Profile.js';
import './style/form.css';

export default function Form() {

    const { alphabet, isLoggedIn, setIsLoggedIn, showCmsOverlay,
            loggedUser, setLoggedUser, setLoggedUsername,
            setNewArticleBtn, setActiveLink, setShowCmsOverlay,
            setShowFrontend, setShowMenu, isNewArticle
        } = useContext(context);

    const cmsOverlay = useRef(null);

    const [requestSent, setRequestSent] = useState(false);

    const [signInisActive, setSignInIsActive] = useState(true);
    const [signUpisActive, setSignUpIsActive] = useState(false);



    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('');
    const [usernameSignIn, setUsernameSignIn] = useState('');
    const [usernameSignUp, setUsernameSignUp] = useState('');
    const [passwordSignUp, setPasswordSignUp] = useState('');
    const [passwordSignIn, setPasswordSignIn] = useState('');
    const [email, setEmail] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const [buttonLabel, setButtonLabel] = useState('');

    const changeButtonLabel = () => {
        if(signInisActive) {
            setButtonLabel(requestSent? 'Prijavljivanje ...' : 'Prijavi se')
        } else if(signUpisActive) {
            setButtonLabel(requestSent? 'Registrovanje...' : 'Registruj se')
        }
    }
  
    const clearFields = () => {
        setFirstName('')
        setLastName('');
        setUsernameSignIn('');
        setUsernameSignUp('');
        setPasswordSignUp('');
        setPasswordSignIn('');
        setEmail('');
    }


    const handleChange = (e, setFunc, limit) => {
        const value = e.target.value;
        setFunc(value);
        setErrorMsg('');
       /*  if(value.length === limit) {
            e.target.style.visibility = "hidden"
        } */
    }

    const handleClickTab = (tab) => {
        if (tab === 'sign-up') {
            setSignUpIsActive(true);
            setSignInIsActive(false);
        } else if (tab === 'sign-in') {
            setSignUpIsActive(false);
            setSignInIsActive(true);
            
        }        
    }
    const handleClickSignIn = async (e) => {
        e.preventDefault();
        setShowCmsOverlay('block');
        setRequestSent(true);
        const userAndToken = await loginUser(usernameSignIn, passwordSignIn);
        if(userAndToken[0] === false) {
            console.log(userAndToken);
            setErrorMsg(userAndToken[2])
            setRequestSent(false);
            setShowCmsOverlay('none');
            return;
        };
        const token = userAndToken[3];
        localStorage.setItem('x-auth-token', token);
         
        setIsLoggedIn((prev) => {
             console.log(localStorage.getItem('x-auth-token'))
             const v = localStorage.getItem('x-auth-token') === 'none'? false : true;
             return v
        })
        setLoggedUser((prom) => {
            const v = localStorage.getItem('x-auth-token') === 'none'? '' : userAndToken[2];
            if(v !== 'none') {
                localStorage.setItem('loggedUsername', userAndToken[2].username); 
                localStorage.setItem('loggedFirstName', userAndToken[2].firstName); 
                localStorage.setItem('loggedLastName', userAndToken[2].lastName);
                localStorage.setItem('loggedEmail', userAndToken[2].email);
            }
            return v
        })
        setRequestSent(false);
        setShowCmsOverlay('none')
    }

    const handleClickSignUp = async (e) => {
        e.preventDefault();
        setRequestSent(true);
        setShowCmsOverlay('block')
        const {newUser} = await registerUser(firstName, lastName, usernameSignUp, passwordSignUp, email);
        setRequestSent(false);
        setShowCmsOverlay('none');
        if(newUser[0] === false) {
            alert(newUser[2]);
            return
        } else if(newUser[0] === true) {
            alert(newUser[1]);
            setSignInIsActive(true);
            setSignUpIsActive(false);
            clearFields();
        }
        /* console.log(newUser); */
    }

    useEffect(() => {
        setNewArticleBtn('inline-block');
        setShowMenu('block');
        setShowFrontend('none');
        setActiveLink('none') 
    }) 

    useEffect(changeButtonLabel, [signInisActive, signUpisActive, requestSent])

    return (
        <>
            <div className="form-container">
                <div className="cmsOverlay" ref={cmsOverlay} style={{ display: showCmsOverlay }}></div>
                        {isLoggedIn?
                        <Profile loggedUser = {loggedUser}/>
                        :
                        <form className="form">
                            <div className="form-title">
                                <span 
                                    className= {`sign-in ${signInisActive? 'isActive' : 'notActive'}`}
                                    onClick = {() => handleClickTab('sign-in')}
                                >Prijava</span>
                                <span 
                                    className= {`sign-up ${signUpisActive? 'isActive' : 'notActive'}`}
                                    onClick = {() => handleClickTab('sign-up')}
                                >{'Registracija'}</span>
                            </div>

                            <div 
                                className="form-element"
                                style = {{display: signUpisActive? 'block' : 'none'}}
                            >
                                <label htmlFor="firstName" className="firstName-label">Ime</label>
                                <input 
                                    id="firstName" 
                                    className="firstName-input" 
                                    type="text"
                                    value = {firstName}
                                    onChange = {(e) => handleChange(e, setFirstName, 3)}
                                ></input>
                                <div className = "form-element-condition firstname">
                                    <span 
                                        style = {{
                                            visibility: firstName.length >= 3 || firstName.length === 0 ? 
                                                'hidden' : 'visible'
                                            }}
                                    >Ime mora imati najmanje 3 karaktera</span>
                                </div>
                            </div>

                            <div 
                                className="form-element lastName"
                                style = {{display: signUpisActive? 'block' : 'none'}}
                            >
                                <label htmlFor="lastName" className="lastName-label">Prezime</label>
                                <input 
                                    id="lastName" 
                                    className="lastName-input" 
                                    type="text" 
                                    value = {lastName}
                                    onChange = {(e) => handleChange(e, setLastName, 3)}
                                ></input>
                                <div className = "form-element-condition lastname">
                                    <span 
                                        style = {{
                                            visibility: lastName.length >= 3 || lastName.length === 0 ? 
                                                'hidden' : 'visible'
                                            }}
                                    >Prezime mora imati najmanje 3 karaktera</span>
                                </div>
                            </div>

                            <div 
                                className="form-element usernameSignIn"
                                style = {{display: signInisActive? 'block' : 'none'}}
                            >
                                <label htmlFor="usernameSignIn" className="usernameSignIn-label">Korisničko ime</label>
                                <input 
                                    id="usernameSignIn" 
                                    className="usernameSignIn-input" 
                                    type="text"
                                    value = {usernameSignIn}
                                    onChange = {(e) => handleChange(e, setUsernameSignIn, 3)}
                                ></input>
    
                                <div className = "form-element-condition usernameSignIn">
                                {/*     <span 
                                        style = {{
                                            visibility: usernameSignIn.length >= 3 || usernameSignIn.length === 0 ? 
                                                'hidden' : 'visible'
                                            }}
                                    >Korisničko ime mora imati najmanje 3 karaktera</span> */}
                                </div>
                            </div>
                            <div 
                                className="form-element usernameSignUp"
                                style = {{display: signUpisActive? 'block' : 'none'}}
                            >
                                <label htmlFor="usernameSignUp" className="usernameSignUp-label">Korisničko ime</label>
                                <input 
                                    id="usernameSignUp" 
                                    className="usernameSignUp-input" 
                                    type="text"
                                    value = {usernameSignUp}
                                    onChange = {(e) => handleChange(e, setUsernameSignUp, 3)}
                                ></input>
                
                                <div className = "form-element-condition usernameSignUp">
                                    <span 
                                        style = {{
                                            visibility: usernameSignUp.length >= 3 || usernameSignUp.length === 0 ? 
                                                'hidden' : 'visible'
                                            }}
                                    >Korisničko ime mora imati najmanje 3 karaktera</span>
                                </div>
                            </div>

                            <div 
                                className="form-element paswordSignIn"
                                style = {{display: signInisActive? 'block' : 'none'}}
                            >
                                <label htmlFor="passwordSignIn" className="pasword-label">Šifra</label>
                                <input 
                                    id="passwordSignIn" 
                                    className="paswordSignIn-input" 
                                    type="text" 
                                    value = {passwordSignIn}
                                    onChange = {(e) => handleChange(e, setPasswordSignIn, 6)}
                                ></input>
                
                                <div className = "form-element-condition passwordSignIn">
                                    {/* <span 
                                        style = {{
                                            visibility: passwordSignIn.length >= 6 || passwordSignIn.length === 0 ? 
                                                'hidden' : 'visible'
                                            }}
                                    >Šifra mora imati najmanje 6 karaktera</span> */}
                                </div>
                            </div>
                            <div 
                                className="form-element paswordSignUp"
                                style = {{display: signUpisActive? 'block' : 'none'}}
                            >
                                <label htmlFor="passwordSignUp" className="paswordSignUp-label">Šifra</label>
                                <input 
                                    id="passwordSignUp" 
                                    className="paswordSignUp-input" 
                                    type="text" 
                                    value = {passwordSignUp}
                                    onChange = {(e) => handleChange(e, setPasswordSignUp, 6)}
                                ></input>

                                <div className = "form-element-condition passwordSignUp">
                                    <span 
                                        style = {{
                                            visibility: passwordSignUp.length >= 6 || passwordSignUp.length === 0 ? 
                                                'hidden' : 'visible'
                                            }}
                                    >Šifra mora imati najmanje 6 karaktera</span>
                                </div>
                            </div>

                            <div 
                                className="form-element email"
                                style = {{display: signUpisActive? 'block' : 'none'}}
                            >
                                <label htmlFor="username" className="email-label">e-mail</label>
                                <input 
                                    id="username" 
                                    className="email-input" 
                                    type="email"
                                    value = {email}
                                    onChange = {(e) => handleChange(e, setEmail, 10)}
                                ></input>
         
                                <div className = "form-element-condition email">
                                    <span 
                                        style = {{
                                            visibility: email.length >= 10 || email.length === 0 ? 
                                                'hidden' : 'visible'
                                            }}
                                    >Email mora imati najmanje 10 karaktera</span>
                                </div>
                            </div>
                            <div
                               className="form-error" 
                            >{errorMsg}
                            </div>
                            <div className="form-send">
                                <button 
                                    className={`form-send-button ${requestSent && 'sending'}`}
                                    onClick = {signInisActive? handleClickSignIn : handleClickSignUp}
                                    disabled = {requestSent? true : false}
                                >{buttonLabel}</button>
                            </div>
                        </form>}
            </div>
        </>
    )
}